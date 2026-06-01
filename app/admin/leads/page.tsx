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

const leadTypeLabels: Record<BossaLead['lead_type'], string> = {
  weekend_fire_order: 'Weekend Fire',
  party_event_quote: 'Party/Event',
  reservation: 'Reservation',
  general_inquiry: 'General',
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
  return lead.item_name ?? lead.offer ?? lead.box_number ?? lead.intent ?? leadTypeLabels[lead.lead_type];
}

function leadClass(leadType: BossaLead['lead_type']) {
  if (leadType === 'weekend_fire_order') return 'badge fire';
  if (leadType === 'party_event_quote') return 'badge party';
  if (leadType === 'reservation') return 'badge reserve';
  return 'badge neutral';
}

function statusClass(status: string) {
  if (status === 'Completed') return 'badge reserve';
  if (status === 'Lost' || status === 'Cancelled') return 'badge danger';
  return 'badge active';
}

function StatCard({ label, value, helper }: { label: string; value: string | number; helper: string }) {
  return (
    <div className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{helper}</span>
    </div>
  );
}

async function getLeads() {
  try {
    return await selectSupabaseRows<BossaLead>('bossa_leads', 'select=*&order=created_at.desc&limit=100');
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
    <main className="admin-shell">
      <style>{`
        .admin-shell {
          min-height: 100vh;
          padding: 32px;
          color: #fff7ed;
          background: radial-gradient(circle at top left, rgba(245, 158, 11, 0.24), transparent 32%), linear-gradient(135deg, #1c0f08, #070605 48%, #130c08);
          font-family: Arial, Helvetica, sans-serif;
        }
        .admin-wrap { max-width: 1240px; margin: 0 auto; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; padding-bottom: 28px; border-bottom: 1px solid rgba(254, 243, 199, 0.14); }
        .eyebrow { color: rgba(253, 230, 138, 0.8); text-transform: uppercase; letter-spacing: 0.28em; font-size: 12px; font-weight: 900; margin: 0 0 12px; }
        h1 { font-size: clamp(36px, 5vw, 64px); line-height: 0.95; margin: 0; letter-spacing: -0.05em; }
        .intro { max-width: 720px; color: #d6d3d1; line-height: 1.7; margin-top: 18px; font-size: 16px; }
        .actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .button { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 12px 18px; font-weight: 900; font-size: 14px; text-decoration: none; border: 1px solid rgba(254, 243, 199, 0.18); color: #fde68a; }
        .button.primary { background: #fcd34d; color: #1c0f08; border-color: #fcd34d; }
        .stats { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; margin-top: 28px; }
        .stat-card, .panel, .table-card { border: 1px solid rgba(254, 243, 199, 0.12); background: rgba(255,255,255,0.045); border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.24); }
        .stat-card { padding: 20px; }
        .stat-card p { margin: 0; color: rgba(253, 230, 138, 0.78); text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; font-weight: 900; }
        .stat-card strong { display: block; font-size: 34px; margin-top: 12px; }
        .stat-card span { display: block; color: #a8a29e; margin-top: 8px; font-size: 14px; }
        .ops-grid { display: grid; grid-template-columns: 1fr 3fr; gap: 16px; margin-top: 24px; }
        .panel { padding: 20px; }
        .panel h2 { margin: 0 0 14px; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(253, 230, 138, 0.78); }
        .panel ol { margin: 0; padding-left: 20px; color: #d6d3d1; line-height: 1.8; }
        .filter-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .chip { border-radius: 999px; padding: 9px 13px; background: rgba(255,255,255,0.08); color: #fff; font-weight: 800; font-size: 13px; }
        .table-card { margin-top: 24px; overflow: hidden; background: rgba(10, 8, 6, 0.78); }
        .table-head { padding: 18px 20px; border-bottom: 1px solid rgba(254, 243, 199, 0.12); }
        .table-head h2 { margin: 0; font-size: 22px; }
        .table-head p { margin: 6px 0 0; color: #a8a29e; }
        table { width: 100%; border-collapse: collapse; min-width: 860px; }
        th { background: rgba(255,255,255,0.04); color: #a8a29e; text-transform: uppercase; letter-spacing: 0.14em; font-size: 12px; padding: 14px 18px; text-align: left; }
        td { padding: 16px 18px; border-top: 1px solid rgba(254, 243, 199, 0.1); color: #e7e5e4; vertical-align: top; }
        .lead-title { font-weight: 900; color: white; }
        .lead-id, .muted { color: #78716c; font-size: 12px; margin-top: 4px; }
        .badge { display: inline-flex; border-radius: 999px; padding: 7px 10px; font-size: 12px; font-weight: 900; border: 1px solid; white-space: nowrap; }
        .badge.fire { background: rgba(249, 115, 22, 0.14); color: #fed7aa; border-color: rgba(253, 186, 116, 0.35); }
        .badge.party { background: rgba(168, 85, 247, 0.14); color: #e9d5ff; border-color: rgba(216, 180, 254, 0.35); }
        .badge.reserve { background: rgba(16, 185, 129, 0.14); color: #bbf7d0; border-color: rgba(110, 231, 183, 0.35); }
        .badge.neutral { background: rgba(120, 113, 108, 0.18); color: #e7e5e4; border-color: rgba(214, 211, 209, 0.22); }
        .badge.active { background: rgba(245, 158, 11, 0.14); color: #fde68a; border-color: rgba(252, 211, 77, 0.35); }
        .badge.danger { background: rgba(239, 68, 68, 0.14); color: #fecaca; border-color: rgba(252, 165, 165, 0.35); }
        .empty { margin-top: 24px; padding: 48px; text-align: center; border: 1px dashed rgba(254, 243, 199, 0.22); border-radius: 24px; background: rgba(10, 8, 6, 0.62); }
        @media (max-width: 960px) { .admin-header, .ops-grid { grid-template-columns: 1fr; display: grid; } .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .admin-shell { padding: 22px 14px; } .stats { grid-template-columns: 1fr; } table { min-width: 760px; } }
      `}</style>

      <div className="admin-wrap">
        <header className="admin-header">
          <div>
            <p className="eyebrow">BOSSA AI Ops</p>
            <h1>Lead Ops Dashboard</h1>
            <p className="intro">Track WhatsApp click leads, Weekend Fire demand, party/event quotes, follow-ups, and completed revenue from Supabase.</p>
          </div>
          <div className="actions">
            <Link href="/" className="button">Website</Link>
            <Link href="/weekend-fire" className="button primary">Test Weekend Fire CTA</Link>
          </div>
        </header>

        <section className="stats">
          <StatCard label="Total Leads" value={totalLeads} helper="Latest 100 captured rows" />
          <StatCard label="Active Follow-Ups" value={activeFollowUps} helper="Needs owner attention" />
          <StatCard label="Weekend Fire" value={weekendFireLeads} helper="Box/order intent" />
          <StatCard label="Party/Event" value={partyEventLeads} helper="Higher-value quotes" />
          <StatCard label="Completed" value={completedOrders} helper={`Revenue ${completedRevenue ? `XCG ${completedRevenue.toFixed(2)}` : 'not logged yet'}`} />
        </section>

        <section className="ops-grid">
          <div className="panel">
            <h2>Daily SOP</h2>
            <ol>
              <li>Check new WhatsApp Clicked leads.</li>
              <li>Confirm the matching WhatsApp conversation.</li>
              <li>Update lead status in Supabase.</li>
              <li>Record actual value after completion.</li>
            </ol>
          </div>
          <div className="panel">
            <h2>Filter Links</h2>
            <div className="filter-row">
              <span className="chip">All</span>
              <span className="chip">Weekend Fire</span>
              <span className="chip">Party/Event</span>
              <span className="chip">Completed</span>
              <span className="chip">Lost</span>
            </div>
            <p className="intro">Version 1 is read-only. Status editing comes next through a secure API route and protected admin controls.</p>
          </div>
        </section>

        {leads.length === 0 ? (
          <div className="empty">
            <p className="eyebrow">No leads yet</p>
            <h2>Your CRM is ready.</h2>
            <p className="intro">Click a WhatsApp CTA on the live BOSSA website to create the first lead row in Supabase.</p>
            <Link href="/" className="button primary">Open website</Link>
          </div>
        ) : (
          <section className="table-card">
            <div className="table-head">
              <h2>Latest Leads</h2>
              <p>Read-only operational view from Supabase.</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Created</th>
                    <th>Lead</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{formatDate(lead.created_at)}</td>
                      <td>
                        <div className="lead-title">{getLeadTitle(lead)}</div>
                        <div className="lead-id">{lead.id.slice(0, 8)}</div>
                      </td>
                      <td><span className={leadClass(lead.lead_type)}>{leadTypeLabels[lead.lead_type]}</span></td>
                      <td><span className={statusClass(lead.lead_status)}>{lead.lead_status}</span></td>
                      <td>
                        <div>{lead.source_page ?? '—'}</div>
                        <div className="muted">{lead.utm_campaign ?? 'no campaign'}</div>
                      </td>
                      <td>{formatMoney(lead.actual_value ?? lead.estimated_value, lead.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
