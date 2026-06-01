import Link from 'next/link';
import { selectSupabaseRows } from '../../lib/supabase-server';

type BossaLead = {
  id: string;
  created_at: string;
  updated_at: string;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  lead_type: 'weekend_fire_order' | 'reservation' | 'party_event_quote' | 'general_inquiry';
  intent: string | null;
  offer: string | null;
  item_name: string | null;
  box_number: string | null;
  estimated_value: number | null;
  actual_value: number | null;
  currency: 'XCG' | 'USD';
  lead_status: string;
  order_status: string;
  payment_status: string;
  follow_up_owner: string | null;
  follow_up_due: string | null;
  last_follow_up_at: string | null;
  staff_notes: string | null;
  metadata: Record<string, unknown>;
};

type LeadTypeLabel = {
  label: string;
  tone: string;
};

const leadTypeLabels: Record<BossaLead['lead_type'], LeadTypeLabel> = {
  weekend_fire_order: {
    label: 'Weekend Fire',
    tone: 'bg-orange-500/15 text-orange-200 ring-orange-300/30',
  },
  party_event_quote: {
    label: 'Party/Event',
    tone: 'bg-purple-500/15 text-purple-200 ring-purple-300/30',
  },
  reservation: {
    label: 'Reservation',
    tone: 'bg-emerald-500/15 text-emerald-200 ring-emerald-300/30',
  },
  general_inquiry: {
    label: 'General',
    tone: 'bg-stone-500/20 text-stone-200 ring-stone-300/20',
  },
};

const activeStatuses = new Set([
  'New',
  'WhatsApp Clicked',
  'Conversation Started',
  'Awaiting Details',
  'Confirmed',
  'Deposit Pending',
  'Deposit Paid',
]);

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatMoney(value: number | null, currency: string) {
  if (!value) return '—';

  return `${currency} ${value.toFixed(2)}`;
}

function getLeadTypeCount(leads: BossaLead[], leadType: BossaLead['lead_type']) {
  return leads.filter((lead) => lead.lead_type === leadType).length;
}

function getStatusCount(leads: BossaLead[], status: string) {
  return leads.filter((lead) => lead.lead_status === status).length;
}

function getActiveFollowUps(leads: BossaLead[]) {
  return leads.filter((lead) => activeStatuses.has(lead.lead_status)).length;
}

function getCompletedRevenue(leads: BossaLead[]) {
  return leads.reduce((total, lead) => {
    if (lead.lead_status !== 'Completed') return total;
    return total + (lead.actual_value ?? 0);
  }, 0);
}

function getLeadTitle(lead: BossaLead) {
  return (
    lead.item_name ??
    lead.offer ??
    lead.box_number ??
    lead.intent ??
    leadTypeLabels[lead.lead_type].label
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-amber-200/20 bg-stone-950/60 p-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200/70">
        No leads yet
      </p>
      <h2 className="mt-4 text-2xl font-black text-white">Your CRM is ready.</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-300">
        Click a WhatsApp CTA on the live BOSSA website to create the first lead row in Supabase.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-stone-950 transition hover:bg-amber-200"
      >
        Open website
      </Link>
    </div>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper: string;
}) {
  return (
    <div className="rounded-3xl border border-amber-100/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-200/70">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm text-stone-400">{helper}</p>
    </div>
  );
}

function LeadBadge({ leadType }: { leadType: BossaLead['lead_type'] }) {
  const config = leadTypeLabels[leadType];

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${config.tone}`}>
      {config.label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === 'Completed'
    ? 'bg-emerald-500/15 text-emerald-200 ring-emerald-300/30'
    : status === 'Lost' || status === 'Cancelled'
      ? 'bg-red-500/15 text-red-200 ring-red-300/30'
      : 'bg-amber-500/15 text-amber-100 ring-amber-300/30';

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${tone}`}>{status}</span>;
}

async function getLeads() {
  try {
    return await selectSupabaseRows<BossaLead>(
      'bossa_leads',
      'select=*&order=created_at.desc&limit=100',
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[BOSSA admin leads]', error);
    }

    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  const totalLeads = leads.length;
  const weekendFireLeads = getLeadTypeCount(leads, 'weekend_fire_order');
  const partyEventLeads = getLeadTypeCount(leads, 'party_event_quote');
  const activeFollowUps = getActiveFollowUps(leads);
  const completedOrders = getStatusCount(leads, 'Completed');
  const completedRevenue = getCompletedRevenue(leads);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_30%),linear-gradient(135deg,_#1c0f08,_#080605_48%,_#130c08)] px-5 py-8 text-stone-100 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-amber-100/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-200/70">
              BOSSA AI Ops
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Lead Ops Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300">
              Track WhatsApp click leads, Weekend Fire demand, party/event quotes, follow-ups, and completed revenue from Supabase.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-amber-100/15 px-5 py-3 text-sm font-bold text-amber-100 transition hover:border-amber-200/40 hover:bg-amber-200/10"
            >
              Website
            </Link>
            <Link
              href="/weekend-fire"
              className="rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-stone-950 transition hover:bg-amber-200"
            >
              Test Weekend Fire CTA
            </Link>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total Leads" value={totalLeads} helper="Latest 100 captured rows" />
          <StatCard label="Active Follow-Ups" value={activeFollowUps} helper="Needs owner attention" />
          <StatCard label="Weekend Fire" value={weekendFireLeads} helper="Box/order intent" />
          <StatCard label="Party/Event" value={partyEventLeads} helper="Higher-value quotes" />
          <StatCard label="Completed" value={completedOrders} helper={`Revenue ${completedRevenue ? `XCG ${completedRevenue.toFixed(2)}` : 'not logged yet'}`} />
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-4">
          <div className="rounded-3xl border border-amber-100/10 bg-white/[0.04] p-5 lg:col-span-1">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-200/70">
              Daily SOP
            </p>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
              <li>1. Check new WhatsApp Clicked leads.</li>
              <li>2. Confirm the matching WhatsApp conversation.</li>
              <li>3. Update lead status in Supabase.</li>
              <li>4. Record actual value after completion.</li>
            </ol>
          </div>

          <div className="rounded-3xl border border-amber-100/10 bg-white/[0.04] p-5 lg:col-span-3">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-200/70">
              Filter Links
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold">
              <span className="rounded-full bg-white/10 px-4 py-2 text-white">All</span>
              <span className="rounded-full bg-orange-500/15 px-4 py-2 text-orange-200">Weekend Fire</span>
              <span className="rounded-full bg-purple-500/15 px-4 py-2 text-purple-200">Party/Event</span>
              <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-emerald-200">Completed</span>
              <span className="rounded-full bg-red-500/15 px-4 py-2 text-red-200">Lost</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-400">
              Version 1 is read-only. Status editing comes next through a secure API route and protected admin controls.
            </p>
          </div>
        </section>

        <section className="mt-8">
          {leads.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-hidden rounded-3xl border border-amber-100/10 bg-stone-950/70 shadow-2xl shadow-black/30">
              <div className="border-b border-amber-100/10 px-5 py-4">
                <h2 className="text-lg font-black text-white">Latest Leads</h2>
                <p className="mt-1 text-sm text-stone-400">Read-only operational view from Supabase.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-amber-100/10 text-left text-sm">
                  <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.18em] text-stone-400">
                    <tr>
                      <th className="px-5 py-4">Created</th>
                      <th className="px-5 py-4">Lead</th>
                      <th className="px-5 py-4">Type</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Source</th>
                      <th className="px-5 py-4">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100/10">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="transition hover:bg-white/[0.04]">
                        <td className="whitespace-nowrap px-5 py-4 text-stone-300">
                          {formatDate(lead.created_at)}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-white">{getLeadTitle(lead)}</p>
                          <p className="mt-1 text-xs text-stone-500">{lead.id.slice(0, 8)}</p>
                        </td>
                        <td className="px-5 py-4">
                          <LeadBadge leadType={lead.lead_type} />
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={lead.lead_status} />
                        </td>
                        <td className="px-5 py-4 text-stone-300">
                          <p>{lead.source_page ?? '—'}</p>
                          <p className="mt-1 text-xs text-stone-500">{lead.utm_campaign ?? 'no campaign'}</p>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-stone-300">
                          {formatMoney(lead.actual_value ?? lead.estimated_value, lead.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
