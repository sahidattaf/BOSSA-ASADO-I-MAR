import Link from 'next/link';
import ReservationsBoard, { type ReservationsBoardInitial } from '../../components/admin/ReservationsBoard';
import { getCuracaoNow, getRange } from '../../lib/reservations';
import { classifyReservationError, countUpcomingPending, selectReservations } from '../../lib/reservations-store';
import { isSupabaseConfigured } from '../../lib/supabase-server';

// Protected by proxy.ts (fail-closed Basic Auth on /admin/:path*).
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'BOSSA Admin | Reservations',
  robots: { index: false, follow: false },
};

async function getInitialData(): Promise<ReservationsBoardInitial> {
  const today = getCuracaoNow().date;
  const { from, to } = getRange('today', today);
  const empty = { range: 'today' as const, from, to, reservations: [], summary: { total: 0, pending: 0, upcoming_pending: 0 }, fetchedAt: null };

  if (!isSupabaseConfigured()) return { ...empty, error: 'reservations_unavailable' };

  try {
    const [reservations, upcomingPending] = await Promise.all([selectReservations(from, to), countUpcomingPending(today)]);
    return {
      ...empty,
      reservations,
      summary: {
        total: reservations.length,
        pending: reservations.filter((reservation) => reservation.status === 'pending').length,
        upcoming_pending: upcomingPending,
      },
      error: null,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[BOSSA admin reservations]', error instanceof Error ? error.message : 'Unknown error');
    return { ...empty, error: classifyReservationError(error) === 'unavailable' ? 'reservations_unavailable' : 'server_error' };
  }
}

export default async function AdminReservationsPage() {
  const initial = await getInitialData();

  return (
    <main className="admin-shell">
      <style>{`
        .admin-shell {
          min-height: 100vh;
          padding: 32px;
          color: #fff7ed;
          background: radial-gradient(circle at top left, rgba(255, 107, 53, 0.2), transparent 32%), linear-gradient(135deg, #0a2342, #070605 52%, #130c08);
          font-family: Arial, Helvetica, sans-serif;
        }
        .admin-wrap { max-width: 1280px; margin: 0 auto; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(255, 215, 0, 0.16); }
        .eyebrow { color: #ffd700; text-transform: uppercase; letter-spacing: 0.28em; font-size: 12px; font-weight: 900; margin: 0 0 12px; }
        h1 { font-size: clamp(34px, 5vw, 58px); line-height: 0.95; margin: 0; letter-spacing: -0.05em; }
        .intro { max-width: 760px; color: #d6d3d1; line-height: 1.6; margin-top: 14px; font-size: 15px; }
        .actions { display: flex; flex-wrap: wrap; gap: 10px; }
        .button { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 11px 16px; font-weight: 900; font-size: 14px; text-decoration: none; border: 1px solid rgba(255, 215, 0, 0.3); color: #ffd700; background: transparent; cursor: pointer; font-family: inherit; }
        .button:disabled { opacity: 0.6; cursor: progress; }
        .button.primary { background: #ffd700; color: #0a2342; border-color: #ffd700; }
        .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 24px; }
        .stat-card, .table-card, .slot-card { border: 1px solid rgba(254, 243, 199, 0.12); background: rgba(255,255,255,0.045); border-radius: 22px; box-shadow: 0 20px 50px rgba(0,0,0,0.24); }
        .stat-card { padding: 18px; }
        .stat-card--alert { border-color: rgba(255, 107, 53, 0.7); background: rgba(255, 107, 53, 0.14); }
        .stat-card p { margin: 0; color: rgba(255, 215, 0, 0.85); text-transform: uppercase; letter-spacing: 0.14em; font-size: 11px; font-weight: 900; }
        .stat-card strong { display: block; font-size: 34px; margin-top: 10px; }
        .stat-card span { display: block; color: #a8a29e; margin-top: 6px; font-size: 13px; }
        .toolbar { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; margin-top: 22px; }
        .filter-row, .refresh-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
        .chip { border: 1px solid rgba(255,255,255,0.14); border-radius: 999px; padding: 9px 15px; background: rgba(255,255,255,0.08); color: #fff; font-weight: 800; font-size: 14px; cursor: pointer; font-family: inherit; }
        .chip[aria-pressed='true'] { background: #ffd700; color: #0a2342; border-color: #ffd700; }
        .chip:focus-visible, .button:focus-visible, .action:focus-visible { outline: 2px solid #ffd700; outline-offset: 2px; }
        .auto-refresh { display: inline-flex; gap: 6px; align-items: center; color: #d6d3d1; font-size: 13px; }
        .range-label { margin: 18px 0 0; color: #ffd700; font-weight: 800; }
        .alert { margin-top: 16px; padding: 14px 16px; border-radius: 16px; border: 1px solid rgba(252, 165, 165, 0.4); background: rgba(239, 68, 68, 0.14); color: #fecaca; font-weight: 700; line-height: 1.5; }
        .slot-card { margin-top: 16px; padding: 18px; }
        .slot-card h2 { margin: 0 0 12px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255, 215, 0, 0.85); }
        .slot-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
        .slot { padding: 10px 12px; border-radius: 14px; background: rgba(10, 8, 6, 0.4); border: 1px solid rgba(255,255,255,0.08); display: grid; gap: 4px; font-size: 13px; color: #d6d3d1; }
        .slot strong { color: #fff; font-size: 16px; }
        .slot-bar { height: 6px; border-radius: 999px; background: rgba(255,255,255,0.1); overflow: hidden; }
        .slot-bar div { height: 100%; background: #44c7c4; }
        .slot--busy .slot-bar div { background: #ffd700; }
        .slot--full .slot-bar div { background: #ff6b35; }
        .slot--full { border-color: rgba(255, 107, 53, 0.6); }
        .table-card { margin-top: 16px; overflow: hidden; background: rgba(10, 8, 6, 0.78); }
        table { width: 100%; border-collapse: collapse; min-width: 980px; }
        th { background: rgba(255,255,255,0.04); color: #a8a29e; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; padding: 13px 14px; text-align: left; }
        td { padding: 14px; border-top: 1px solid rgba(254, 243, 199, 0.1); color: #e7e5e4; vertical-align: top; font-size: 14px; }
        td a { color: #fde68a; }
        tr.row-pending td { background: rgba(255, 107, 53, 0.06); }
        .lead-title { font-weight: 900; color: white; }
        .muted { color: #a8a29e; font-size: 12px; margin-top: 4px; }
        .notes { max-width: 240px; white-space: pre-wrap; overflow-wrap: anywhere; color: #d6d3d1; }
        .badge { display: inline-flex; border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 900; border: 1px solid; white-space: nowrap; }
        .status-pending { background: rgba(255, 107, 53, 0.16); color: #ffd2c2; border-color: rgba(255, 107, 53, 0.5); }
        .status-confirmed { background: rgba(16, 185, 129, 0.14); color: #bbf7d0; border-color: rgba(110, 231, 183, 0.4); }
        .status-seated { background: rgba(68, 199, 196, 0.14); color: #c8f3f2; border-color: rgba(68, 199, 196, 0.4); }
        .status-cancelled { background: rgba(120, 113, 108, 0.18); color: #d6d3d1; border-color: rgba(214, 211, 209, 0.25); }
        .status-no_show { background: rgba(239, 68, 68, 0.14); color: #fecaca; border-color: rgba(252, 165, 165, 0.35); }
        .row-actions { display: flex; flex-wrap: wrap; gap: 6px; }
        .action { border-radius: 999px; padding: 7px 11px; font-size: 12px; font-weight: 900; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; text-decoration: none; font-family: inherit; white-space: nowrap; }
        .action:disabled { opacity: 0.5; cursor: progress; }
        .action--primary { background: #ffd700; color: #0a2342; border-color: #ffd700; }
        .action--danger { color: #fecaca; border-color: rgba(252, 165, 165, 0.45); background: rgba(239, 68, 68, 0.12); }
        .action--whatsapp { background: #25d366; color: #052e16; border-color: #25d366; }
        .row-error { margin-top: 6px; color: #fecaca; font-size: 12px; font-weight: 700; }
        .empty { margin-top: 16px; padding: 42px 24px; text-align: center; border: 1px dashed rgba(254, 243, 199, 0.22); border-radius: 22px; background: rgba(10, 8, 6, 0.62); }
        .empty h2 { margin: 0; }
        .empty .intro { margin-left: auto; margin-right: auto; }
        @media (max-width: 960px) { .admin-header { display: grid; } .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } .slot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 560px) { .admin-shell { padding: 20px 14px; } .stats { grid-template-columns: 1fr; } }
      `}</style>

      <div className="admin-wrap">
        <header className="admin-header">
          <div>
            <p className="eyebrow">BOSSA AI Ops</p>
            <h1>Reservations</h1>
            <p className="intro">
              Every online request arrives as <strong>pending</strong>. Confirm it, then send the guest a WhatsApp confirmation. Capacity: 40 guests per
              30-minute slot · Thursday – Sunday · 12:00 PM – 9:30 PM reservation times (open until 10:00 PM).
            </p>
          </div>
          <div className="actions">
            <Link href="/admin/leads" className="button">Lead Ops</Link>
            <Link href="/reserve" className="button primary">Open guest form</Link>
          </div>
        </header>

        <ReservationsBoard initial={initial} />
      </div>
    </main>
  );
}
