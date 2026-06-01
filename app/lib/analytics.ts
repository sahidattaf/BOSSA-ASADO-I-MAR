export type BossaEventName =
  | 'page_view_home'
  | 'page_view_weekend_fire'
  | 'page_view_party_menu'
  | 'page_view_customizer'
  | 'whatsapp_home_click'
  | 'whatsapp_weekend_fire_click'
  | 'whatsapp_party_quote_click'
  | 'whatsapp_customizer_click'
  | 'weekend_fire_cta_click'
  | 'party_menu_cta_click'
  | 'stripe_deposit_click'
  | 'stripe_weekend_deposit_click'
  | 'stripe_event_deposit_click'
  | 'stripe_catering_deposit_click'
  | 'menu_item_interest_click'
  | 'party_package_interest_click'
  | 'customizer_start'
  | 'customizer_option_select'
  | 'customizer_submit'
  | 'video_play_click'
  | 'audio_play_click'
  | 'maps_click'
  | 'call_click';

export type BossaEventIntent =
  | 'order'
  | 'reserve'
  | 'party_quote'
  | 'deposit'
  | 'menu_view'
  | 'customizer'
  | 'location'
  | 'contact'
  | 'engagement';

export type BossaEventProperties = Record<
  string,
  string | number | boolean | null | undefined
> & {
  page?: string;
  section?: string;
  cta_label?: string;
  intent?: BossaEventIntent;
  offer?: string;
  item_name?: string;
  box_number?: string;
  price?: string;
  source?: string;
  campaign?: string;
  medium?: string;
  language?: 'en' | 'pap' | 'nl' | 'es';
};

type VercelAnalyticsWindow = Window & {
  va?: (eventName: string, properties?: Record<string, string | number | boolean>) => void;
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

function sanitizeProperties(properties: BossaEventProperties = {}) {
  const safeProperties: Record<string, string | number | boolean> = {};

  Object.entries(properties).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (isPrivateProperty(key)) return;

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      safeProperties[key] = value;
    }
  });

  return safeProperties;
}

export function getUtmProperties() {
  if (!isBrowser()) return {};

  const params = new URLSearchParams(window.location.search);

  return {
    source: params.get('utm_source') ?? undefined,
    medium: params.get('utm_medium') ?? undefined,
    campaign: params.get('utm_campaign') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
    utm_term: params.get('utm_term') ?? undefined,
  } satisfies BossaEventProperties;
}

export function trackBossaEvent(
  eventName: BossaEventName,
  properties: BossaEventProperties = {},
) {
  const safeProperties = sanitizeProperties({
    ...getUtmProperties(),
    ...properties,
  });

  if (!isBrowser()) return;

  const analyticsWindow = window as VercelAnalyticsWindow;

  if (typeof analyticsWindow.va === 'function') {
    analyticsWindow.va(eventName, safeProperties);
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[BOSSA analytics]', eventName, safeProperties);
  }
}

export function buildWhatsAppUrl(message: string, phoneNumber = '59995230683') {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
