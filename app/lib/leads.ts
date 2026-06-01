export type BossaLeadType =
  | 'weekend_fire_order'
  | 'reservation'
  | 'party_event_quote'
  | 'general_inquiry';

export type BossaLeadIntent =
  | 'order'
  | 'reserve'
  | 'party_quote'
  | 'deposit'
  | 'customizer'
  | 'contact';

export type BossaLeadStatus =
  | 'New'
  | 'WhatsApp Clicked'
  | 'Conversation Started'
  | 'Awaiting Details'
  | 'Confirmed'
  | 'Deposit Pending'
  | 'Deposit Paid'
  | 'Completed'
  | 'Lost'
  | 'Cancelled';

export type BossaPaymentStatus =
  | 'Not Required'
  | 'Pending'
  | 'Paid'
  | 'Failed'
  | 'Refunded'
  | 'Disputed';

export type BossaOrderStatus =
  | 'Not Started'
  | 'Requested'
  | 'Confirmed'
  | 'In Prep'
  | 'Ready'
  | 'Completed'
  | 'Cancelled';

export type BossaLeadInput = {
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  lead_type: BossaLeadType;
  intent?: BossaLeadIntent;
  offer?: string;
  item_name?: string;
  box_number?: string;
  estimated_value?: number;
  currency?: 'XCG' | 'USD';
  metadata?: Record<string, string | number | boolean | null>;
};

export type BossaLeadResponse = {
  ok: boolean;
  lead_id?: string;
  error?: string;
};

const PRIVATE_PROPERTY_PATTERNS = [
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

function isBrowser() {
  return typeof window !== 'undefined';
}

function isPrivateProperty(key: string) {
  return PRIVATE_PROPERTY_PATTERNS.some((pattern) => pattern.test(key));
}

function cleanString(value: string | undefined, maxLength = 120) {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  return trimmed.slice(0, maxLength);
}

function cleanMetadata(metadata: BossaLeadInput['metadata'] = {}) {
  const safeMetadata: Record<string, string | number | boolean | null> = {};

  Object.entries(metadata).forEach(([key, value]) => {
    if (isPrivateProperty(key)) return;
    if (value === undefined) return;

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null
    ) {
      safeMetadata[key] = value;
    }
  });

  return safeMetadata;
}

export function getLeadUtmProperties() {
  if (!isBrowser()) return {};

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: cleanString(params.get('utm_source') ?? undefined),
    utm_medium: cleanString(params.get('utm_medium') ?? undefined),
    utm_campaign: cleanString(params.get('utm_campaign') ?? undefined),
    utm_content: cleanString(params.get('utm_content') ?? undefined),
  };
}

export function prepareBossaLead(input: BossaLeadInput): BossaLeadInput {
  const utm = getLeadUtmProperties();

  return {
    ...utm,
    ...input,
    source_page: cleanString(input.source_page, 160),
    offer: cleanString(input.offer, 120),
    item_name: cleanString(input.item_name, 160),
    box_number: cleanString(input.box_number, 20),
    currency: input.currency ?? 'XCG',
    metadata: cleanMetadata(input.metadata),
  };
}

export async function createBossaLead(
  input: BossaLeadInput,
): Promise<BossaLeadResponse> {
  const payload = prepareBossaLead(input);

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    const data = (await response.json()) as BossaLeadResponse;

    if (!response.ok) {
      return {
        ok: false,
        error: data.error ?? 'Lead creation failed.',
      };
    }

    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[BOSSA leads] Lead creation failed', error);
    }

    return {
      ok: false,
      error: 'Lead creation failed.',
    };
  }
}
