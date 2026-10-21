import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '../../../../lib/admin-auth';
import { isReservationStatus } from '../../../../lib/reservations';
import { classifyReservationError, updateReservationStatus } from '../../../../lib/reservations-store';

type RouteContext = { params: Promise<{ id: string }> };

const NO_STORE = { 'Cache-Control': 'private, no-store' };

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

// Staff status updates: pending → confirmed / cancelled / seated / no_show.
export async function PATCH(request: NextRequest, context: RouteContext) {
  const unauthorized = authorizeAdminRequest(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  if (!isUuid(id)) return NextResponse.json({ ok: false, error: 'Invalid reservation id.' }, { status: 400, headers: NO_STORE });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400, headers: NO_STORE });
  }

  const unsupportedFields = Object.keys(body ?? {}).filter((field) => field !== 'status');
  if (unsupportedFields.length > 0) {
    return NextResponse.json({ ok: false, error: 'Only the status field can be updated.' }, { status: 400, headers: NO_STORE });
  }
  if (!isReservationStatus(body.status)) {
    return NextResponse.json({ ok: false, error: 'Invalid reservation status.' }, { status: 400, headers: NO_STORE });
  }

  try {
    const reservation = await updateReservationStatus(id, body.status);
    if (!reservation) return NextResponse.json({ ok: false, error: 'Reservation not found.' }, { status: 404, headers: NO_STORE });
    return NextResponse.json({ ok: true, reservation }, { headers: NO_STORE });
  } catch (error) {
    const kind = classifyReservationError(error);
    if (kind === 'slot_full') {
      return NextResponse.json({ ok: false, error: 'This slot is full (40 guests). Cancel or move another booking first.' }, { status: 409, headers: NO_STORE });
    }
    console.error('[BOSSA reservations PATCH]', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { ok: false, error: kind === 'unavailable' ? 'Reservations database is not available.' : 'Status update failed.' },
      { status: kind === 'unavailable' ? 503 : 500, headers: NO_STORE },
    );
  }
}
