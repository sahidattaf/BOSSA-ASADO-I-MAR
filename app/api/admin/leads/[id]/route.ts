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

type LeadStatus = (typeof ALLOWED_STATUSES)[number];

function isAllowedStatus(value: unknown): value is LeadStatus {
  return typeof value === 'string' && ALLOWED_STATUSES.includes(value as LeadStatus);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
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

    if (!isAllowedStatus(body?.lead_status)) {
      return NextResponse.json({ ok: false, error: 'Invalid lead status.' }, { status: 400 });
    }

    const updateRecord: Record<string, unknown> = {
      lead_status: body.lead_status,
      updated_at: new Date().toISOString(),
    };

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
      { ok: false, error: 'Lead status update failed.' },
      { status: 500 },
    );
  }
}
