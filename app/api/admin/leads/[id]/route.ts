import { NextRequest, NextResponse } from 'next/server';
import { updateSupabaseRows } from '../../../../lib/supabase-server';

const ALLOWED_STATUSES = [
  'New',
  'WhatsApp Clicked',
  'Conversation Started',
  'Awaiting Details',
  'Confirmed',
  'Deposit Pending',
  'Deposit Paid',
  'Completed',
  'Lost',
  'Cancelled',
] as const;

const ALLOWED_CURRENCIES = ['XCG', 'USD'] as const;

const ALLOWED_OWNERS = [
  'Unassigned',
  'Coach Sahid',
  'Manager',
  'Kitchen',
  'Sales',
  'Events',
] as const;

type LeadStatus = (typeof ALLOWED_STATUSES)[number];
type Currency = (typeof ALLOWED_CURRENCIES)[number];
type LeadOwner = (typeof ALLOWED_OWNERS)[number];

function isAllowedStatus(value: unknown): value is LeadStatus {
  return typeof value === 'string' && ALLOWED_STATUSES.includes(value as LeadStatus);
}

function isAllowedCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && ALLOWED_CURRENCIES.includes(value as Currency);
}

function isAllowedOwner(value: unknown): value is LeadOwner {
  return typeof value === 'string' && ALLOWED_OWNERS.includes(value as LeadOwner);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function cleanMoney(value: unknown) {
  if (value === null || value === undefined || value === '') return null;

  const numberValue = typeof value === 'number' ? value : Number(value);

  if (!Number.isFinite(numberValue) || numberValue < 0) {
    throw new Error('Invalid actual value.');
  }

  return Math.round(numberValue * 100) / 100;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!isUuid(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid lead id.' }, { status: 400 });
    }

    const body = await request.json();

    const updateRecord: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if ('lead_status' in body) {
      if (!isAllowedStatus(body.lead_status)) {
        return NextResponse.json({ ok: false, error: 'Invalid lead status.' }, { status: 400 });
      }

      updateRecord.lead_status = body.lead_status;

      if (body.lead_status === 'Completed') {
        updateRecord.order_status = 'Completed';
        updateRecord.completed_at = new Date().toISOString();
      }

      if (body.lead_status === 'Lost') {
        updateRecord.lost_at = new Date().toISOString();
      }

      if (body.lead_status === 'Cancelled') {
        updateRecord.order_status = 'Cancelled';
      }
    }

    if ('actual_value' in body) {
      updateRecord.actual_value = cleanMoney(body.actual_value);
    }

    if ('currency' in body) {
      if (!isAllowedCurrency(body.currency)) {
        return NextResponse.json({ ok: false, error: 'Invalid currency.' }, { status: 400 });
      }

      updateRecord.currency = body.currency;
    }

    if ('follow_up_owner' in body) {
      if (!isAllowedOwner(body.follow_up_owner)) {
        return NextResponse.json({ ok: false, error: 'Invalid owner.' }, { status: 400 });
      }

      updateRecord.follow_up_owner = body.follow_up_owner === 'Unassigned' ? null : body.follow_up_owner;
    }

    if (Object.keys(updateRecord).length === 1) {
      return NextResponse.json({ ok: false, error: 'No valid update fields.' }, { status: 400 });
    }

    const result = await updateSupabaseRows(
      'bossa_leads',
      `id=eq.${encodeURIComponent(id)}`,
      updateRecord,
    );

    return NextResponse.json({ ok: true, lead: result });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[BOSSA admin lead update]', error);
    }

    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Lead update failed.' },
      { status: 500 },
    );
  }
}
