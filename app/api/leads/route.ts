import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { insertSupabaseRow, isSupabaseConfigured } from '../../lib/supabase-server';

const ALLOWED_LEAD_TYPES = [
  'weekend_fire_order',
  'reservation',
  'party_event_quote',
  'general_inquiry',
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

function cleanString(value: unknown, maxLength = 160) {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  return trimmed.slice(0, maxLength);
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

  const metadata: Record<string, string | number | boolean | null> = {};

  Object.entries(value as Record<string, unknown>).forEach(([key, item]) => {
    if (isPrivateField(key)) return;

    if (
      typeof item === 'string' ||
      typeof item === 'number' ||
      typeof item === 'boolean' ||
      item === null
    ) {
      metadata[key] = item;
    }
  });

  return metadata;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.lead_type) {
      return NextResponse.json(
        {
          ok: false,
          error: 'lead_type is required.',
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_LEAD_TYPES.includes(body.lead_type)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid lead_type.',
        },
        { status: 400 },
      );
    }

    if (body.intent && !ALLOWED_INTENTS.includes(body.intent)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid intent.',
        },
        { status: 400 },
      );
    }

    if (body.currency && !ALLOWED_CURRENCIES.includes(body.currency)) {
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
      lead_type: body.lead_type,
      intent: body.intent ?? null,
      offer: cleanString(body.offer, 120),
      item_name: cleanString(body.item_name, 160),
      box_number: cleanString(body.box_number, 20),
      estimated_value: cleanNumber(body.estimated_value),
      currency: body.currency ?? 'XCG',
      lead_status: 'WhatsApp Clicked',
      order_status: body.intent === 'order' ? 'Requested' : 'Not Started',
      payment_status: body.intent === 'deposit' ? 'Pending' : 'Not Required',
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
