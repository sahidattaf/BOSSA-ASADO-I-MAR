import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY ??
  process.env.SUPABASE_SERVICE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY;

export const dynamic = 'force-dynamic';

type SupabaseLead = {
  id: string;
  created_at: string;
  updated_at: string;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  lead_type: string;
  intent: string | null;
  offer: string | null;
  item_name: string | null;
  box_number: string | null;
  estimated_value: number | null;
  actual_value: number | null;
  currency: string;
  lead_status: string;
  order_status: string;
  payment_status: string;
  follow_up_owner: string | null;
  follow_up_due: string | null;
  last_follow_up_at: string | null;
  staff_notes: string | null;
};

type DashboardStats = {
  total: number;
  newLeads: number;
  needsFollowUp: number;
  weekendFire: number;
  partyEvents: number;
  completed: number;
  lost: number;
  actualRevenue: number;
};

function calculateStats(leads: SupabaseLead[]): DashboardStats {
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

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Supabase environment variables are not configured.',
      },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/bossa_leads?select=*&order=created_at.desc&limit=100`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `Supabase read failed with status ${response.status}.`,
      },
      { status: 500 },
    );
  }

  const leads = (await response.json()) as SupabaseLead[];

  return NextResponse.json({
    ok: true,
    leads,
    stats: calculateStats(leads),
  });
}
