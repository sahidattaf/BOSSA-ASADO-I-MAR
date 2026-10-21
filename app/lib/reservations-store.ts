import { insertSupabaseRow, selectSupabaseRows, updateSupabaseRows } from './supabase-server';
import {
  ACTIVE_RESERVATION_STATUSES,
  SLOT_CAPACITY,
  type Reservation,
  type ReservationInput,
  type ReservationStatus,
} from './reservations';

// Server-only access to public.reservations through the existing service-role
// boundary in supabase-server.ts. Never import this from a client component.

const TABLE = 'reservations';
const ADMIN_COLUMNS = 'id,guest_name,guest_phone,guest_email,party_size,reservation_date,reservation_time,status,notes,created_at,updated_at';

export type ReservationStoreErrorKind = 'slot_full' | 'slot_past' | 'invalid' | 'unavailable' | 'unknown';

export function classifyReservationError(error: unknown): ReservationStoreErrorKind {
  const message = error instanceof Error ? error.message : String(error);
  if (/BOSSA_SLOT_FULL/.test(message)) return 'slot_full';
  if (/BOSSA_SLOT_IN_PAST/.test(message)) return 'slot_past';
  if (/violates check constraint|invalid input syntax/i.test(message)) return 'invalid';
  if (/not configured|could not find the table|schema cache|does not exist|fetch failed/i.test(message)) return 'unavailable';
  return 'unknown';
}

export async function getBookedSeats(date: string, time: string) {
  const query = new URLSearchParams({
    select: 'party_size',
    reservation_date: `eq.${date}`,
    reservation_time: `eq.${time}:00`,
    status: `in.(${ACTIVE_RESERVATION_STATUSES.join(',')})`,
  });
  const rows = await selectSupabaseRows<{ party_size: number }>(TABLE, query.toString());
  return rows.reduce((total, row) => total + (row.party_size ?? 0), 0);
}

export async function getSeatsLeft(date: string, time: string) {
  return Math.max(SLOT_CAPACITY - (await getBookedSeats(date, time)), 0);
}

export async function insertReservation(input: ReservationInput) {
  const rows = (await insertSupabaseRow(TABLE, {
    ...input,
    reservation_time: `${input.reservation_time}:00`,
  })) as Reservation[];
  const created = Array.isArray(rows) ? rows[0] : undefined;
  if (!created) throw new Error('Reservation insert returned no row.');
  return created;
}

export async function selectReservations(from: string, to: string) {
  const query = new URLSearchParams({ select: ADMIN_COLUMNS, order: 'reservation_date.asc,reservation_time.asc,created_at.asc', limit: '1000' });
  query.append('reservation_date', `gte.${from}`);
  query.append('reservation_date', `lte.${to}`);
  return selectSupabaseRows<Reservation>(TABLE, query.toString());
}

export async function countUpcomingPending(fromDate: string) {
  const query = new URLSearchParams({ select: 'id', status: 'eq.pending', reservation_date: `gte.${fromDate}`, limit: '1000' });
  const rows = await selectSupabaseRows<{ id: string }>(TABLE, query.toString());
  return rows.length;
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const rows = (await updateSupabaseRows(TABLE, `id=eq.${encodeURIComponent(id)}&select=${ADMIN_COLUMNS}`, { status })) as Reservation[];
  return Array.isArray(rows) ? rows[0] ?? null : null;
}
