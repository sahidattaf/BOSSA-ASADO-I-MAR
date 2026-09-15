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

export function needsHumanHandoff(intent: ConciergeIntent, text: string, reply = '') {
  if (['reservation', 'catering', 'private_event', 'events', 'allergen', 'human'].includes(intent)) return true;
  if (/available|availability|disponib|confirm|refund|deposit|parking|lost|wallet|christmas|holiday|special.?date|easter|new year|kerst|feestdag|navidad|feriado|pasco|partner|commission|payment|paid|charge.*card|reembolso|betaling|terugbetaling|comisi[oó]n/.test(text.toLowerCase())) return true;
  if (isLiveStatusRequest(text)) return true;
  return isMandatoryConfirmation(reply);
}

// A grounded answer (address, weekly hours, a priced menu item) may still add a
// courtesy line like "you can confirm with our team if needed" — that is an
// optional offer, not a signal the fact itself is unverified, so it must not
// force a handoff. Only phrasing that states the BOT cannot stand behind the
// fact on its own (an explicit obligation/inability to confirm, or "not
// verified"/"needs confirmation") counts as mandatory. Checked per language.
export function isMandatoryConfirmation(reply: string) {
  const value = reply.toLowerCase();
  return value.split(/[.!?\n]+/).some((sentence) =>
    /\b(?:must|cannot|can't|can’t|has to|needs? to)\s+(?:be\s+)?(?:confirm|verif|check)/.test(sentence) ||
    /\bneeds?\s+(?:\w+\s+){0,2}confirmation\b/.test(sentence) ||
    /\bnot\s+(?:yet\s+)?verified\b|\bunverified\b|\bno\s+verified\b/.test(sentence) ||
    /\bmoet[\s\S]{0,30}bevestig/.test(sentence) ||
    /\bdebe\s+confirmar\b|\bnecesita\s+confirmaci[oó]n\b|\bno\s+puedo\s+confirmar\b/.test(sentence) ||
    /\bmester\s+konfirm|\bno\s+por\s+konfirm/.test(sentence));
}

export function isLiveStatusRequest(text: string) {
  return /available|availability|disponib|reserve|reservation|book|table|tafel|reserva|mesa|right now|currently|tonight|today|esta noche|ahora|hoy|vandaag|vanavond|\bnu\b|\bawe\b|\bawor\b|next.*(day|night)|9:55/.test(text.toLowerCase());
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

const WHATSAPP_GREETING: Record<ConciergeLanguage, string> = {
  en: 'Hello BOSSA',
  pap: 'Bon dia BOSSA',
  nl: 'Hallo BOSSA',
  es: 'Hola BOSSA',
};

const WHATSAPP_TEMPLATES: Record<ConciergeLanguage, Record<'reservation' | 'catering' | 'allergen' | 'general', string>> = {
  en: {
    reservation: 'I want to reserve. Name: ___ Date: ___ Time: ___ Party size: ___ Special notes: ___',
    catering: 'I want a catering/private event quote. Name: ___ Event date: ___ Guest count: ___ Location: ___ Food/request: ___ Budget (optional): ___',
    allergen: 'I need staff confirmation about an allergy or dietary restriction. Question: ___',
    general: 'I have a question for the concierge. Topic: ___ Message: ___',
  },
  pap: {
    reservation: 'Mi ke reserva. Nòmber: ___ Fecha: ___ Ora: ___ Kantidat di hende: ___ Nota spesial: ___',
    catering: 'Mi ke un kotisashon pa catering/evento privá. Nòmber: ___ Fecha di evento: ___ Kantidat di hende: ___ Lugá: ___ Kuminda/petishon: ___ Presupuesto (opshonal): ___',
    allergen: 'Mi mester konfirmashon di personal tokante un alergia òf restrikshon dietético. Pregunta: ___',
    general: 'Mi tin un pregunta pa e concierge. Topiko: ___ Mensahe: ___',
  },
  nl: {
    reservation: 'Ik wil reserveren. Naam: ___ Datum: ___ Tijd: ___ Aantal personen: ___ Bijzonderheden: ___',
    catering: 'Ik wil een offerte voor catering/privé-evenement. Naam: ___ Datum evenement: ___ Aantal gasten: ___ Locatie: ___ Eten/verzoek: ___ Budget (optioneel): ___',
    allergen: 'Ik heb bevestiging van het personeel nodig over een allergie of dieetwens. Vraag: ___',
    general: 'Ik heb een vraag voor de concierge. Onderwerp: ___ Bericht: ___',
  },
  es: {
    reservation: 'Quiero reservar. Nombre: ___ Fecha: ___ Hora: ___ Número de personas: ___ Notas especiales: ___',
    catering: 'Quiero una cotización de catering/evento privado. Nombre: ___ Fecha del evento: ___ Número de invitados: ___ Ubicación: ___ Comida/solicitud: ___ Presupuesto (opcional): ___',
    allergen: 'Necesito confirmación del personal sobre una alergia o restricción alimentaria. Pregunta: ___',
    general: 'Tengo una pregunta para el concierge. Tema: ___ Mensaje: ___',
  },
};

export function buildWhatsAppText(intent: ConciergeIntent, language: ConciergeLanguage = 'en') {
  const templates = WHATSAPP_TEMPLATES[language] ?? WHATSAPP_TEMPLATES.en;
  const greeting = WHATSAPP_GREETING[language] ?? WHATSAPP_GREETING.en;
  const key = intent === 'reservation' ? 'reservation'
    : intent === 'catering' || intent === 'private_event' ? 'catering'
    : intent === 'allergen' ? 'allergen'
    : 'general';
  return `${greeting}, ${templates[key]}`;
}
