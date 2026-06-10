import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { insertSupabaseRow, isSupabaseConfigured } from '../../lib/supabase-server';

const NOTION_API_VERSION = '2022-06-28';

const ALLOWED_LEAD_TYPES = [
  'weekend_fire_order',
  'reservation',
  'party_event_quote',
  'general_inquiry',
  'catering',
  'private_event',
  'tourist_experience',
  'partner',
  'contact',
] as const;

const ALLOWED_INTENTS = [
  'order',
  'reserve',
  'party_quote',
  'deposit',
  'customizer',
  'contact',
] as const;

const ALLOWED_CURRENCIES = ['XCG', 'USD'] as const;

type SafeMetadataValue = string | number | boolean | null;

const PRIVATE_FIELD_PATTERNS = [
  /name/i,
  /phone/i,
  /email/i,
  /message/i,
  /address/i,
  /card/i,
  /payment_method/i,
  /secret/i,
  /token/i,
];

function isPrivateField(key: string) {
  return PRIVATE_FIELD_PATTERNS.some((pattern) => pattern.test(key));
}

function isSafeMetadataValue(value: unknown): value is SafeMetadataValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null
  );
}

function cleanString(value: unknown, maxLength = 160) {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  return trimmed.slice(0, maxLength);
}

function requireString(value: unknown, fieldName: string, maxLength = 160) {
  const cleaned = cleanString(value, maxLength);

  if (!cleaned) {
    return {
      value: null,
      error: `${fieldName} is required.`,
    };
  }

  return {
    value: cleaned,
    error: null,
  };
}

function cleanNumber(value: unknown) {
  if (typeof value !== 'number') return null;
  if (!Number.isFinite(value)) return null;
  if (value < 0) return null;

  return value;
}

function cleanMetadata(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const metadata: Record<string, SafeMetadataValue> = {};

  Object.entries(value as Record<string, unknown>).forEach(([key, item]) => {
    if (isPrivateField(key)) return;
    if (!isSafeMetadataValue(item)) return;

    metadata[key] = item;
  });

  return metadata;
}

function cleanLeadType(value: unknown) {
  const leadType = cleanString(value, 60);
  if (!leadType) return null;

  return leadType.toLowerCase().replace(/[\s-]+/g, '_');
}

function isLeadType(value: string): value is (typeof ALLOWED_LEAD_TYPES)[number] {
  return ALLOWED_LEAD_TYPES.includes(value as (typeof ALLOWED_LEAD_TYPES)[number]);
}

function isFormLead(body: Record<string, unknown>) {
  return (
    body.form_kind === 'lead_form' ||
    body.formKind === 'lead_form' ||
    body.leadType !== undefined ||
    body.sourcePage !== undefined
  );
}

function notionRichText(value: string | null) {
  return value ? { rich_text: [{ text: { content: value } }] } : { rich_text: [] };
}

function notionSelect(value: string | null) {
  return value ? { select: { name: value } } : { select: null };
}

function notionPhone(value: string | null) {
  return { phone_number: value || null };
}

function notionEmail(value: string | null) {
  return { email: value || null };
}

function notionDate(value: string | null) {
  return { date: value ? { start: value } : null };
}

function notionNumber(value: string | null) {
  if (!value) return { number: null };

  const number = Number(value);
  return { number: Number.isFinite(number) ? number : null };
}

function mapLeadTypeToNotion(value: string) {
  const labels: Record<string, string> = {
    catering: 'Catering',
    private_event: 'Private Event',
    tourist_experience: 'Tourist Experience',
    partner: 'Partner',
    contact: 'General Contact',
    reservation: 'Reservation',
    weekend_fire_order: 'Weekend Fire Order',
    general_inquiry: 'General Contact',
    party_event_quote: 'Private Event',
  };

  return labels[value] ?? 'General Contact';
}

function mapSourcePageToNotion(value: string) {
  const normalized = value.trim().toLowerCase().replace(/^\/+/, '').replace(/\/+$/, '') || '/';
  const labels: Record<string, string> = {
    '/': 'Home',
    catering: 'Catering',
    'private-events': 'Private Events',
    'tourist-experiences': 'Tourist Experiences',
    partners: 'Partners',
    contact: 'Contact',
    'ai-concierge': 'AI Concierge',
    'weekend-fire': 'Weekend Fire',
    menu: 'Menu',
  };

  return labels[normalized] ?? labels[value] ?? 'Home';
}

async function createNotionLead(lead: {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  leadType: string;
  eventDate: string | null;
  guestCount: string | null;
  budget: string | null;
  message: string;
  sourcePage: string;
}) {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;

  if (!apiKey || !databaseId) {
    return {
      configured: false,
      stored: false,
    };
  }

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_API_VERSION,
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: lead.name } }],
        },
        Phone: notionPhone(lead.phone),
        Email: notionEmail(lead.email),
        'Lead Type': notionSelect(mapLeadTypeToNotion(lead.leadType)),
        'Source Page': notionSelect(mapSourcePageToNotion(lead.sourcePage)),
        Status: notionSelect('New'),
        'Follow-Up Status': notionSelect('Needs Follow-Up'),
        'Event Date': notionDate(lead.eventDate),
        'Guest Count': notionNumber(lead.guestCount),
        Budget: notionRichText(lead.budget),
        Message: notionRichText(lead.message),
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('[BOSSA Notion lead API]', {
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
      leadType: lead.leadType,
      sourcePage: lead.sourcePage,
    });
    throw new Error(`Notion lead creation failed: ${response.status} ${errorBody}`);
  }

  return {
    configured: true,
    stored: true,
  };
}

async function handleFormLead(body: Record<string, unknown>) {
  const name = requireString(body.name, 'name', 120);
  const phone = requireString(body.phone, 'phone', 80);
  const message = requireString(body.message, 'message', 1200);
  const sourcePage = requireString(body.sourcePage, 'sourcePage', 160);
  const leadTypeInput = cleanLeadType(body.leadType);

  const validationError =
    name.error ||
    phone.error ||
    message.error ||
    sourcePage.error ||
    (!leadTypeInput ? 'leadType is required.' : null);

  if (validationError) {
    return NextResponse.json(
      {
        ok: false,
        error: validationError,
      },
      { status: 400 },
    );
  }

  if (!isLeadType(leadTypeInput)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid leadType.',
      },
      { status: 400 },
    );
  }

  const leadId = randomUUID();
  const leadRecord = {
    id: leadId,
    name: name.value,
    phone: phone.value,
    email: cleanString(body.email, 160),
    leadType: leadTypeInput,
    eventDate: cleanString(body.eventDate, 80),
    guestCount: cleanString(body.guestCount, 80),
    budget: cleanString(body.budget, 120),
    message: message.value,
    sourcePage: sourcePage.value,
    createdAt: new Date().toISOString(),
  };

  const notionResult = await createNotionLead(leadRecord);

  if (!notionResult.configured) {
    console.info('[BOSSA lead form fallback]', leadRecord);
  }

  return NextResponse.json({
    ok: true,
    lead_id: leadId,
    storage: notionResult.configured ? 'notion' : 'console_fallback',
    warning: notionResult.configured ? undefined : 'Notion environment variables are not configured.',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (isFormLead(body)) {
      return handleFormLead(body);
    }

    const leadType = cleanLeadType(body.lead_type);
    const intent = cleanString(body.intent, 60);
    const currency = cleanString(body.currency, 10);

    if (!leadType) {
      return NextResponse.json(
        {
          ok: false,
          error: 'lead_type is required.',
        },
        { status: 400 },
      );
    }

    if (!isLeadType(leadType)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid lead_type.',
        },
        { status: 400 },
      );
    }

    if (intent && !ALLOWED_INTENTS.includes(intent as (typeof ALLOWED_INTENTS)[number])) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid intent.',
        },
        { status: 400 },
      );
    }

    if (currency && !ALLOWED_CURRENCIES.includes(currency as (typeof ALLOWED_CURRENCIES)[number])) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid currency.',
        },
        { status: 400 },
      );
    }

    const leadId = randomUUID();

    const leadRecord = {
      id: leadId,
      source_page: cleanString(body.source_page),
      utm_source: cleanString(body.utm_source, 120),
      utm_medium: cleanString(body.utm_medium, 120),
      utm_campaign: cleanString(body.utm_campaign, 120),
      utm_content: cleanString(body.utm_content, 120),
      lead_type: leadType,
      intent: intent ?? null,
      offer: cleanString(body.offer, 120),
      item_name: cleanString(body.item_name, 160),
      box_number: cleanString(body.box_number, 20),
      estimated_value: cleanNumber(body.estimated_value),
      currency: currency ?? 'XCG',
      lead_status: 'WhatsApp Clicked',
      order_status: intent === 'order' ? 'Requested' : 'Not Started',
      payment_status: intent === 'deposit' ? 'Pending' : 'Not Required',
      metadata: cleanMetadata(body.metadata),
    };

    if (!isSupabaseConfigured()) {
      if (process.env.NODE_ENV !== 'production') {
        console.info('[BOSSA lead fallback]', leadRecord);
      }

      return NextResponse.json({
        ok: true,
        lead_id: leadId,
        warning: 'Supabase environment variables are not configured.',
      });
    }

    await insertSupabaseRow('bossa_leads', leadRecord);

    return NextResponse.json({
      ok: true,
      lead_id: leadId,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[BOSSA lead API]', error);
    }

    return NextResponse.json(
      {
        ok: false,
        error: 'Lead capture failed.',
      },
      { status: 500 },
    );
  }
}
