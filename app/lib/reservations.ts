// Shared reservation rules for the guest form, the API and the staff dashboard.
// Owner-confirmed 2026-10-21: open Wednesday–Sunday 5:00 PM–11:00 PM, closed
// Monday & Tuesday, 40 guests per 30-minute slot, manual staff confirmation.
// The same rules are enforced in supabase/migrations/005_create_reservations.sql.

export const RESERVATION_TIMEZONE = 'America/Curacao';
export const SLOT_CAPACITY = 40;
export const MAX_PARTY_SIZE = 40;
export const SLOT_TIMES = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'] as const;
// ISO weekday numbers (Monday = 1 … Sunday = 7).
export const CLOSED_ISO_WEEKDAYS = [1, 2] as const;

export const RESERVATION_STATUSES = ['pending', 'confirmed', 'cancelled', 'seated', 'no_show'] as const;
export const ACTIVE_RESERVATION_STATUSES = ['pending', 'confirmed', 'seated'] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];
export type SlotTime = (typeof SLOT_TIMES)[number];

export type Reservation = {
  id: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string | null;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  status: ReservationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ReservationInput = {
  guest_name: string;
  guest_phone: string;
  guest_email: string | null;
  party_size: number;
  reservation_date: string;
  reservation_time: SlotTime;
  notes: string | null;
};

export type ReservationField = keyof ReservationInput;

export type ReservationErrorCode =
  | 'required'
  | 'name_invalid'
  | 'phone_invalid'
  | 'email_invalid'
  | 'party_size_invalid'
  | 'date_invalid'
  | 'date_past'
  | 'closed_day'
  | 'time_invalid'
  | 'time_past'
  | 'notes_too_long';

export type ReservationValidation =
  | { ok: true; value: ReservationInput; errors?: undefined }
  | { ok: false; errors: Partial<Record<ReservationField, ReservationErrorCode>>; value?: undefined };

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const PHONE_PATTERN = /^\+?[0-9 ()-]{7,24}$/;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isReservationStatus(value: unknown): value is ReservationStatus {
  return typeof value === 'string' && (RESERVATION_STATUSES as readonly string[]).includes(value);
}

export function isSlotTime(value: unknown): value is SlotTime {
  return typeof value === 'string' && (SLOT_TIMES as readonly string[]).includes(value);
}

/** Current date (YYYY-MM-DD) and time (HH:MM) in Curaçao. */
export function getCuracaoNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: RESERVATION_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '00';
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${get('hour')}:${get('minute')}` };
}

export function isValidDateString(value: string) {
  if (!DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

/** ISO weekday (Monday = 1 … Sunday = 7) of a YYYY-MM-DD date. */
export function getIsoWeekday(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return weekday === 0 ? 7 : weekday;
}

export function isOpenDate(value: string) {
  return isValidDateString(value) && !(CLOSED_ISO_WEEKDAYS as readonly number[]).includes(getIsoWeekday(value));
}

export function addDays(value: string, days: number) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

export type RangeKey = 'today' | 'tomorrow' | 'week';

/** Staff dashboard ranges in Curaçao dates. "This Week" = today plus the next 6 days. */
export function getRange(range: RangeKey, today = getCuracaoNow().date) {
  if (range === 'tomorrow') {
    const tomorrow = addDays(today, 1);
    return { from: tomorrow, to: tomorrow };
  }
  if (range === 'week') return { from: today, to: addDays(today, 6) };
  return { from: today, to: today };
}

/** True when the slot starts after the current Curaçao time. */
export function isFutureSlot(date: string, time: string, now = getCuracaoNow()) {
  if (date !== now.date) return date > now.date;
  return time > now.time;
}

/** Slots still bookable on a date (all slots for future dates, later slots today). */
export function getAvailableSlotTimes(date: string, now = getCuracaoNow()) {
  if (!isOpenDate(date) || date < now.date) return [];
  return SLOT_TIMES.filter((time) => isFutureSlot(date, time, now));
}

/** "19:30" or "19:30:00" -> "7:30 PM" */
export function formatSlotLabel(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

/** Normalise Postgres "19:30:00" to "19:30". */
export function toSlotTime(time: string) {
  return time.slice(0, 5);
}

export function formatReservationDate(date: string, locale = 'en-US') {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

const PAP_DAYS = ['djadumingu', 'djaluna', 'djamars', 'djarason', 'djuev', 'djabièrnè', 'djasabra'];
const PAP_MONTHS = ['yanüari', 'febrüari', 'mart', 'aprel', 'mei', 'yüni', 'yüli', 'ougùstùs', 'sèptèmber', 'òktober', 'novèmber', 'desèmber'];

/** "2026-10-22" -> "Thursday, October 22" (en) or "djuev 22 di òktober" (pap). */
export function formatReservationDateLong(date: string, language: 'en' | 'pap' = 'en') {
  const [year, month, day] = date.split('-').map(Number);
  const value = new Date(Date.UTC(year, month - 1, day));
  if (language === 'pap') return `${PAP_DAYS[value.getUTCDay()]} ${day} di ${PAP_MONTHS[month - 1]}`;
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(value);
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength + 1);
}

/** Validate raw form/API input. Used on both the client and the server. */
export function validateReservationInput(raw: Record<string, unknown>, now = getCuracaoNow()): ReservationValidation {
  const errors: Partial<Record<ReservationField, ReservationErrorCode>> = {};

  const guestName = cleanText(raw.guest_name, 120);
  if (!guestName) errors.guest_name = 'required';
  else if (guestName.length > 120) errors.guest_name = 'name_invalid';

  const guestPhone = cleanText(raw.guest_phone, 24);
  const phoneDigits = guestPhone.replace(/\D/g, '');
  if (!guestPhone) errors.guest_phone = 'required';
  else if (!PHONE_PATTERN.test(guestPhone) || phoneDigits.length < 7 || phoneDigits.length > 15) errors.guest_phone = 'phone_invalid';

  const guestEmail = cleanText(raw.guest_email, 254);
  if (guestEmail && (guestEmail.length > 254 || !EMAIL_PATTERN.test(guestEmail))) errors.guest_email = 'email_invalid';

  const partySize = typeof raw.party_size === 'number' || typeof raw.party_size === 'string' ? Number(raw.party_size) : Number.NaN;
  if (raw.party_size === undefined || raw.party_size === null || raw.party_size === '') errors.party_size = 'required';
  else if (!Number.isInteger(partySize) || partySize < 1 || partySize > MAX_PARTY_SIZE) errors.party_size = 'party_size_invalid';

  const reservationDate = typeof raw.reservation_date === 'string' ? raw.reservation_date.trim() : '';
  if (!reservationDate) errors.reservation_date = 'required';
  else if (!isValidDateString(reservationDate)) errors.reservation_date = 'date_invalid';
  else if (reservationDate < now.date) errors.reservation_date = 'date_past';
  else if (!isOpenDate(reservationDate)) errors.reservation_date = 'closed_day';

  const reservationTime = typeof raw.reservation_time === 'string' ? toSlotTime(raw.reservation_time.trim()) : '';
  if (!reservationTime) errors.reservation_time = 'required';
  else if (!isSlotTime(reservationTime)) errors.reservation_time = 'time_invalid';
  else if (!errors.reservation_date && !isFutureSlot(reservationDate, reservationTime, now)) errors.reservation_time = 'time_past';

  const notesRaw = typeof raw.notes === 'string' ? raw.notes.trim() : '';
  if (notesRaw.length > 1000) errors.notes = 'notes_too_long';

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      guest_name: guestName,
      guest_phone: guestPhone,
      guest_email: guestEmail || null,
      party_size: partySize,
      reservation_date: reservationDate,
      reservation_time: reservationTime as SlotTime,
      notes: notesRaw || null,
    },
  };
}

/**
 * Best-effort wa.me number from what a guest typed. Curaçao numbers entered
 * without a country code (7 digits, or 8 starting with 9) get +599 9 / +599.
 */
export function toWhatsAppNumber(phone: string) {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (!phone.trim().startsWith('+') && !phone.trim().startsWith('00')) {
    if (digits.length === 7) digits = `5999${digits}`;
    else if (digits.length === 8 && digits.startsWith('9')) digits = `599${digits}`;
  }
  return digits;
}
