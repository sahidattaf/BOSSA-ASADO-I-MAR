import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '../../../lib/admin-auth';
import { selectBossaAdminLeads } from '../../../lib/bossa-leads-adapter';

export const dynamic = 'force-dynamic';

type SupabaseLead = { id: string; created_at: string; updated_at: string; source_page: string | null; utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; lead_type: string; intent: string | null; offer: string | null; item_name: string | null; box_number: string | null; estimated_value: number | null; actual_value: number | null; currency: string; lead_status: string; order_status: string; payment_status: string; follow_up_owner: string | null; follow_up_due: string | null; last_follow_up_at: string | null; staff_notes: string | null; };

function calculateStats(leads: SupabaseLead[]) {
  return {
    total: leads.length,
    newLeads: leads.filter((lead) => ['New', 'WhatsApp Clicked'].includes(lead.lead_status)).length,
    needsFollowUp: leads.filter((lead) => ['WhatsApp Clicked', 'Conversation Started', 'Awaiting Details'].includes(lead.lead_status)).length,
    weekendFire: leads.filter((lead) => lead.lead_type === 'weekend_fire_order').length,
    partyEvents: leads.filter((lead) => lead.lead_type === 'party_event_quote').length,
    completed: leads.filter((lead) => lead.lead_status === 'Completed').length,
    lost: leads.filter((lead) => lead.lead_status === 'Lost').length,
    actualRevenue: leads.reduce((total, lead) => total + Number(lead.actual_value ?? 0), 0),
  };
}

export async function GET(request: NextRequest) {
  const unauthorized = authorizeAdminRequest(request);
  if (unauthorized) return unauthorized;
  try {
    const leads = await selectBossaAdminLeads();
    return NextResponse.json({ ok: true, leads, stats: calculateStats(leads) }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('[BOSSA admin leads]', error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Lead read failed.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}