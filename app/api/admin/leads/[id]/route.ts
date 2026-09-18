import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '../../../../lib/admin-auth';
import { updateBossaLeadStatus } from '../../../../lib/bossa-leads-adapter';

const ALLOWED_STATUSES = ['New', 'WhatsApp Clicked', 'Conversation Started', 'Awaiting Details', 'Confirmed', 'Deposit Pending', 'Deposit Paid', 'Completed', 'Lost', 'Cancelled'] as const;
type LeadStatus = (typeof ALLOWED_STATUSES)[number];

type RouteContext = { params: Promise<{ id: string }> };

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isAllowedStatus(value: unknown): value is LeadStatus {
  return typeof value === 'string' && ALLOWED_STATUSES.includes(value as LeadStatus);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const unauthorized = authorizeAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    if (!isUuid(id)) return NextResponse.json({ ok: false, error: 'Invalid lead id.' }, { status: 400 });

    const body = (await request.json()) as Record<string, unknown>;
    const unsupportedFields = Object.keys(body).filter((field) => field !== 'lead_status');
    if (unsupportedFields.length > 0) {
      return NextResponse.json({ ok: false, error: 'The active whatsapp_leads schema supports status updates only until the remaining field mapping is approved.' }, { status: 409 });
    }
    if (!isAllowedStatus(body.lead_status)) return NextResponse.json({ ok: false, error: 'Invalid lead status.' }, { status: 400 });

    const result = await updateBossaLeadStatus(id, body.lead_status);
    return NextResponse.json({ ok: true, lead: result }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('[BOSSA admin lead update]', error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Lead update failed.' }, { status: 500 });
  }
}