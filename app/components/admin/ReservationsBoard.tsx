'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ACTIVE_RESERVATION_STATUSES,
  SLOT_CAPACITY,
  SLOT_TIMES,
  formatReservationDate,
  formatReservationDateLong,
  formatSlotLabel,
  getRange,
  toSlotTime,
  toWhatsAppNumber,
  type RangeKey,
  type Reservation,
  type ReservationStatus,
} from '../../lib/reservations';

type Summary = { total: number; pending: number; upcoming_pending: number };

export type ReservationsBoardInitial = {
  range: RangeKey;
  from: string;
  to: string;
  reservations: Reservation[];
  summary: Summary;
  error: string | null;
  fetchedAt: string | null;
};

const REFRESH_MS = 30_000;

const RANGE_LABELS: Record<RangeKey, string> = { today: 'Today', tomorrow: 'Tomorrow', week: 'This Week' };

const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  seated: 'Seated',
  cancelled: 'Cancelled',
  no_show: 'No-show',
};

const ACTIONS: Record<ReservationStatus, { status: ReservationStatus; label: string; tone: 'primary' | 'neutral' | 'danger' }[]> = {
  pending: [
    { status: 'confirmed', label: 'Confirm', tone: 'primary' },
    { status: 'cancelled', label: 'Cancel', tone: 'danger' },
  ],
  confirmed: [
    { status: 'seated', label: 'Mark as Seated', tone: 'primary' },
    { status: 'no_show', label: 'No-show', tone: 'neutral' },
    { status: 'cancelled', label: 'Cancel', tone: 'danger' },
  ],
  seated: [],
  cancelled: [],
  no_show: [],
};

const ERROR_MESSAGES: Record<string, string> = {
  reservations_unavailable: 'The reservations database is not reachable. Check that the reservations migration is applied and Supabase is configured.',
  server_error: 'The server could not load reservations. Try again in a moment.',
  network: 'Network error — showing the last loaded data.',
};

function isActive(status: ReservationStatus) {
  return (ACTIVE_RESERVATION_STATUSES as readonly string[]).includes(status);
}

function guestMessage(reservation: Reservation) {
  const time = formatSlotLabel(reservation.reservation_time);
  const people = reservation.party_size;
  const name = reservation.guest_name.split(' ')[0];
  if (reservation.status === 'confirmed') {
    return [
      `Hi ${name}! BOSSA Asado i Mar here. Your table for ${people} on ${formatReservationDateLong(reservation.reservation_date)} at ${time} is confirmed. See you at the fire!`,
      `Bon dia ${name}! Bo reservashon pa ${people} persona riba ${formatReservationDateLong(reservation.reservation_date, 'pap')} na ${time} ta konfirmá. Te pronto!`,
    ].join('\n\n');
  }
  return `Hi ${name}, this is BOSSA Asado i Mar about your reservation request for ${formatReservationDateLong(reservation.reservation_date)} at ${time}.`;
}

function formatFetchedAt(value: string | null) {
  if (!value) return 'never';
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', timeZone: 'America/Curacao' }).format(new Date(value));
}

export default function ReservationsBoard({ initial }: { initial: ReservationsBoardInitial }) {
  const [range, setRange] = useState<RangeKey>(initial.range);
  const [reservations, setReservations] = useState<Reservation[]>(initial.reservations);
  const [summary, setSummary] = useState<Summary>(initial.summary);
  const [error, setError] = useState<string | null>(initial.error);
  const [fetchedAt, setFetchedAt] = useState<string | null>(initial.fetchedAt);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<{ id: string; message: string } | null>(null);
  const requestId = useRef(0);

  const load = useCallback(async (nextRange: RangeKey) => {
    const { from, to } = getRange(nextRange);
    const current = ++requestId.current;
    setLoading(true);
    try {
      const response = await fetch(`/api/reservations?from=${from}&to=${to}`, { cache: 'no-store', credentials: 'same-origin' });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        reservations?: Reservation[];
        summary?: Summary;
        fetched_at?: string;
      };
      if (current !== requestId.current) return;
      if (!response.ok || !data.ok) {
        setError(data.error ?? (response.status === 401 ? 'Your admin session expired. Reload the page to sign in again.' : 'server_error'));
        return;
      }
      setReservations(data.reservations ?? []);
      setSummary(data.summary ?? { total: 0, pending: 0, upcoming_pending: 0 });
      setFetchedAt(data.fetched_at ?? new Date().toISOString());
      setError(null);
    } catch {
      if (current === requestId.current) setError('network');
    } finally {
      if (current === requestId.current) setLoading(false);
    }
  }, []);

  // Auto-refresh while the tab is visible.
  useEffect(() => {
    if (!autoRefresh) return undefined;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void load(range);
    }, REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') void load(range);
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [autoRefresh, load, range]);

  function changeRange(nextRange: RangeKey) {
    setRange(nextRange);
    void load(nextRange);
  }

  async function updateStatus(reservation: Reservation, status: ReservationStatus) {
    if (status === 'cancelled' && !window.confirm(`Cancel the reservation for ${reservation.guest_name} (${reservation.party_size} guests)?`)) return;
    setBusyId(reservation.id);
    setRowError(null);
    try {
      const response = await fetch(`/api/admin/reservations/${reservation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ status }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; reservation?: Reservation };
      if (!response.ok || !data.ok || !data.reservation) throw new Error(data.error ?? 'Status update failed.');
      const updated = data.reservation;
      setReservations((rows) => rows.map((row) => (row.id === updated.id ? updated : row)));
      setSummary((current) => {
        const pendingDelta = (updated.status === 'pending' ? 1 : 0) - (reservation.status === 'pending' ? 1 : 0);
        return { ...current, pending: current.pending + pendingDelta, upcoming_pending: Math.max(current.upcoming_pending + pendingDelta, 0) };
      });
    } catch (updateError) {
      setRowError({ id: reservation.id, message: updateError instanceof Error ? updateError.message : 'Status update failed.' });
    } finally {
      setBusyId(null);
    }
  }

  const { from, to } = getRange(range);
  const singleDay = from === to;
  const expectedGuests = reservations.filter((row) => isActive(row.status)).reduce((total, row) => total + row.party_size, 0);
  const slotLoad = SLOT_TIMES.map((time) => ({
    time,
    seats: reservations
      .filter((row) => toSlotTime(row.reservation_time) === time && isActive(row.status))
      .reduce((total, row) => total + row.party_size, 0),
  }));

  return (
    <div className="board">
      <section className="stats" aria-label="Reservation summary">
        <div className={`stat-card ${summary.upcoming_pending > 0 ? 'stat-card--alert' : ''}`}>
          <p>Pending — needs confirmation</p>
          <strong>{summary.upcoming_pending}</strong>
          <span>All upcoming dates</span>
        </div>
        <div className="stat-card">
          <p>Pending · {RANGE_LABELS[range]}</p>
          <strong>{summary.pending}</strong>
          <span>In the selected range</span>
        </div>
        <div className="stat-card">
          <p>Reservations · {RANGE_LABELS[range]}</p>
          <strong>{summary.total}</strong>
          <span>All statuses</span>
        </div>
        <div className="stat-card">
          <p>Guests expected</p>
          <strong>{expectedGuests}</strong>
          <span>Pending + confirmed + seated</span>
        </div>
      </section>

      <section className="toolbar" aria-label="Filters">
        <div className="filter-row" role="group" aria-label="Date range">
          {(Object.keys(RANGE_LABELS) as RangeKey[]).map((key) => (
            <button key={key} type="button" className="chip" aria-pressed={range === key} onClick={() => changeRange(key)}>
              {RANGE_LABELS[key]}
            </button>
          ))}
        </div>
        <div className="refresh-row">
          <span className="muted" aria-live="polite">
            {loading ? 'Refreshing…' : `Updated ${formatFetchedAt(fetchedAt)}`}
          </span>
          <label className="auto-refresh">
            <input type="checkbox" checked={autoRefresh} onChange={(event) => setAutoRefresh(event.target.checked)} /> Auto-refresh (30s)
          </label>
          <button type="button" className="button" onClick={() => void load(range)} disabled={loading}>
            Refresh
          </button>
        </div>
      </section>

      <p className="range-label">
        {singleDay ? formatReservationDateLong(from) : `${formatReservationDate(from)} – ${formatReservationDate(to)}`} · Curaçao time
      </p>

      {error ? (
        <div className="alert" role="alert">
          {ERROR_MESSAGES[error] ?? error}
        </div>
      ) : null}

      {singleDay && reservations.length > 0 ? (
        <section className="slot-card" aria-label="Seats booked per slot">
          <h2>Seats per slot (max {SLOT_CAPACITY})</h2>
          <div className="slot-grid">
            {slotLoad.map(({ time, seats }) => (
              <div key={time} className={`slot ${seats >= SLOT_CAPACITY ? 'slot--full' : seats >= SLOT_CAPACITY * 0.75 ? 'slot--busy' : ''}`}>
                <span>{formatSlotLabel(time)}</span>
                <strong>
                  {seats}/{SLOT_CAPACITY}
                </strong>
                <div className="slot-bar" aria-hidden="true">
                  <div style={{ width: `${Math.min((seats / SLOT_CAPACITY) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {reservations.length === 0 && !error ? (
        <div className="empty">
          <p className="eyebrow">No reservations</p>
          <h2>Nothing booked for {RANGE_LABELS[range].toLowerCase()} yet.</h2>
          <p className="intro">New requests from bossaasado.com/reserve appear here as pending. This page refreshes every 30 seconds.</p>
        </div>
      ) : null}

      {reservations.length > 0 ? (
        <section className="table-card">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Phone</th>
                  <th>Party Size</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => {
                  const whatsappNumber = toWhatsAppNumber(reservation.guest_phone);
                  return (
                    <tr key={reservation.id} className={reservation.status === 'pending' ? 'row-pending' : undefined}>
                      <td>
                        <div className="lead-title">{reservation.guest_name}</div>
                        {reservation.guest_email ? <div className="muted">{reservation.guest_email}</div> : null}
                      </td>
                      <td>
                        <a href={`tel:${reservation.guest_phone.replace(/[^\d+]/g, '')}`}>{reservation.guest_phone}</a>
                      </td>
                      <td>{reservation.party_size}</td>
                      <td>{formatReservationDate(reservation.reservation_date)}</td>
                      <td>{formatSlotLabel(reservation.reservation_time)}</td>
                      <td>
                        <span className={`badge status-${reservation.status}`}>{STATUS_LABELS[reservation.status]}</span>
                      </td>
                      <td className="notes">{reservation.notes ?? '—'}</td>
                      <td>
                        <div className="row-actions">
                          {ACTIONS[reservation.status].map((action) => (
                            <button
                              key={action.status}
                              type="button"
                              className={`action action--${action.tone}`}
                              disabled={busyId === reservation.id}
                              onClick={() => void updateStatus(reservation, action.status)}
                            >
                              {action.label}
                            </button>
                          ))}
                          {whatsappNumber.length >= 8 ? (
                            <a
                              className={`action ${reservation.status === 'confirmed' ? 'action--whatsapp' : 'action--neutral'}`}
                              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(guestMessage(reservation))}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {reservation.status === 'confirmed' ? 'Send confirmation' : 'WhatsApp'}
                            </a>
                          ) : null}
                        </div>
                        {rowError?.id === reservation.id ? <div className="row-error" role="alert">{rowError.message}</div> : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
