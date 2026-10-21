import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '../../lib/admin-auth';
import { addDays, getCuracaoNow, isValidDateString, validateReservationInput } from '../../lib/reservations';
import {
  classifyReservationError,
  countUpcomingPending,
  getSeatsLeft,
  insertReservation,
  selectReservations,
} from '../../lib/reservations-store';
import { isSupabaseConfigured } from '../../lib/supabase-server';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };
const ADMIN_HEADERS = { ...NO_STORE, 'X-Robots-Tag': 'noindex, nofollow' };
const MAX_RANGE_DAYS = 31;

// Best-effort per-instance limit on guest submissions (serverless instances do not share it).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionBuckets = new Map<string, { count: number; resetAt: number }>();

function checkSubmissionRate(key: string) {
  const now = Date.now();
  const bucket = submissionBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    submissionBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function clientKey(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function logError(scope: string, error: unknown) {
  // Log the message only; never log guest details.
  console.error(`[BOSSA reservations ${scope}]`, error instanceof Error ? error.message : 'Unknown error');
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Body must be an object.');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400, headers: NO_STORE });
  }

  // Honeypot: real guests never see or fill this field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true, reservation: null }, { status: 201, headers: NO_STORE });
  }

  const validation = validateReservationInput(body);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, error: 'validation_failed', fields: validation.errors }, { status: 400, headers: NO_STORE });
  }

  const rate = checkSubmissionRate(clientKey(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { ...NO_STORE, 'Retry-After': String(rate.retryAfter) } },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'reservations_unavailable' }, { status: 503, headers: NO_STORE });
  }

  const input = validation.value;

  try {
    const seatsLeft = await getSeatsLeft(input.reservation_date, input.reservation_time);
    if (input.party_size > seatsLeft) {
      return NextResponse.json({ ok: false, error: 'slot_full', seats_left: seatsLeft }, { status: 400, headers: NO_STORE });
    }

    // The database re-checks capacity under a per-slot lock, so a race between
    // two guests still cannot overbook the slot.
    const created = await insertReservation(input);

    return NextResponse.json(
      {
        ok: true,
        reservation: {
          id: created.id,
          status: created.status,
          party_size: created.party_size,
          reservation_date: created.reservation_date,
          reservation_time: created.reservation_time.slice(0, 5),
        },
      },
      { status: 201, headers: NO_STORE },
    );
  } catch (error) {
    const kind = classifyReservationError(error);

    if (kind === 'slot_full') {
      const seatsLeft = await getSeatsLeft(input.reservation_date, input.reservation_time).catch(() => 0);
      return NextResponse.json({ ok: false, error: 'slot_full', seats_left: seatsLeft }, { status: 400, headers: NO_STORE });
    }
    if (kind === 'slot_past') {
      return NextResponse.json({ ok: false, error: 'validation_failed', fields: { reservation_time: 'time_past' } }, { status: 400, headers: NO_STORE });
    }
    if (kind === 'invalid') {
      return NextResponse.json({ ok: false, error: 'validation_failed', fields: {} }, { status: 400, headers: NO_STORE });
    }

    logError('POST', error);
    if (kind === 'unavailable') {
      return NextResponse.json({ ok: false, error: 'reservations_unavailable' }, { status: 503, headers: NO_STORE });
    }
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500, headers: NO_STORE });
  }
}

// Staff only. ?date=YYYY-MM-DD for one day, or ?from=YYYY-MM-DD&to=YYYY-MM-DD (max 31 days).
export async function GET(request: NextRequest) {
  const unauthorized = authorizeAdminRequest(request);
  if (unauthorized) return unauthorized;

  const params = request.nextUrl.searchParams;
  const today = getCuracaoNow().date;
  const from = params.get('date') ?? params.get('from') ?? today;
  const to = params.get('date') ?? params.get('to') ?? from;

  if (!isValidDateString(from) || !isValidDateString(to) || to < from) {
    return NextResponse.json({ ok: false, error: 'invalid_date_range' }, { status: 400, headers: ADMIN_HEADERS });
  }
  if (to > addDays(from, MAX_RANGE_DAYS - 1)) {
    return NextResponse.json({ ok: false, error: 'date_range_too_long', max_days: MAX_RANGE_DAYS }, { status: 400, headers: ADMIN_HEADERS });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'reservations_unavailable' }, { status: 503, headers: ADMIN_HEADERS });
  }

  try {
    const [reservations, upcomingPending] = await Promise.all([selectReservations(from, to), countUpcomingPending(today)]);
    return NextResponse.json(
      {
        ok: true,
        from,
        to,
        reservations,
        summary: {
          total: reservations.length,
          pending: reservations.filter((reservation) => reservation.status === 'pending').length,
          upcoming_pending: upcomingPending,
        },
        fetched_at: new Date().toISOString(),
      },
      { headers: ADMIN_HEADERS },
    );
  } catch (error) {
    logError('GET', error);
    const unavailable = classifyReservationError(error) === 'unavailable';
    return NextResponse.json(
      { ok: false, error: unavailable ? 'reservations_unavailable' : 'server_error' },
      { status: unavailable ? 503 : 500, headers: ADMIN_HEADERS },
    );
  }
}
