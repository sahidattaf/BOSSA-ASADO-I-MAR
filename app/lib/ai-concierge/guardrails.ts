import type { ConciergeLanguage } from './knowledge';

export type ConciergeIntent = 'menu' | 'hours' | 'location' | 'reservation' | 'catering' | 'private_event' | 'events' | 'allergen' | 'human' | 'general';

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;

export function detectLanguage(text: string): ConciergeLanguage {
  const value = text.toLowerCase();
  if (/\b(unda|hende|awe|keda|bon dia|mi ta|bo ta|nos ta)\b/.test(value)) return 'pap';
  if (/\b(waar|jullie|tafel|reserveren|kun je|zondag|maandag|zijn|gesloten)\b/.test(value)) return 'nl';
  if (/\b(dónde|estan|están|tienen|mesa|esta noche|reservar|hola|ubicados|ubicadas|horario)\b/.test(value)) return 'es';
  return 'en';
}

export function detectIntent(text: string): ConciergeIntent {
  const value = text.toLowerCase();
  if (/allerg|gluten|peanut|pinda|alerg/.test(value)) return 'allergen';
  if (/cater|villa|buffet/.test(value)) return 'catering';
  if (/private|privé|priva|event|party|fiesta/.test(value)) return 'private_event';
  if (/reserve|reservation|book|table|tafel|reserva|mesa/.test(value)) return 'reservation';
  if (/rooftop|event|tonight.*happen|evento/.test(value)) return 'events';
  if (/menu|price|cost|box|food|menu|prijs|precio/.test(value)) return 'menu';
  if (/hour|open|close|ora|abri|sluit|horario/.test(value)) return 'hours';
  if (/where|location|address|unda|waar|dónde|ubicad/.test(value)) return 'location';
  if (/human|person|staff|team|whatsapp|hende/.test(value)) return 'human';
  return 'general';
}

export function needsHumanHandoff(intent: ConciergeIntent, text: string) {
  if (['reservation', 'catering', 'private_event', 'events', 'allergen', 'human'].includes(intent)) return true;
  return /available|availability|disponib|confirm|refund|deposit|parking|lost|wallet/.test(text.toLowerCase());
}

export function checkRateLimit(key: string) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function buildWhatsAppText(intent: ConciergeIntent) {
  if (intent === 'reservation') return 'Bon dia BOSSA, I want to reserve. Name: ___ Date: ___ Time: ___ Party size: ___ Special notes: ___';
  if (intent === 'catering' || intent === 'private_event') return 'Bon dia BOSSA, I want a catering/private event quote. Name: ___ Event date: ___ Guest count: ___ Location: ___ Food/request: ___ Budget (optional): ___';
  if (intent === 'allergen') return 'Bon dia BOSSA, I need staff confirmation about an allergy or dietary restriction. Question: ___';
  return 'Bon dia BOSSA, I have a question for the concierge. Topic: ___ Message: ___';
}
