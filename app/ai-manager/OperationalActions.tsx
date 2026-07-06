'use client';

import { useMemo, useState } from 'react';

type LeadType = 'weekend_fire_order' | 'reservation' | 'catering' | 'private_event' | 'partner' | 'general_inquiry';
type TaskStatus = 'Open' | 'Done' | 'Urgent' | 'Watch';

type Task = { id: number; title: string; owner: string; status: TaskStatus };

const whatsappNumber = '59995230683';
const whatsappBase = `https://wa.me/${whatsappNumber}`;

const quickMessages = {
  order: 'Bon dia BOSSA, I want to place an order. Name: ___ Pickup time: ___ Items / box number: ___ Quantity: ___',
  reserve: 'Bon dia BOSSA, I want to reserve. Name: ___ Date: ___ Time: ___ Party size: ___ Special notes: ___',
  catering: 'Bon dia BOSSA, I want a catering quote. Date: ___ Location: ___ Guests: ___ Budget: ___ Notes: ___',
  partner: 'Bon dia BOSSA, I want to discuss a hotel, Airbnb, concierge, or tour partnership. Name: ___ Business: ___ Notes: ___',
};

const initialTasks: Task[] = [
  { id: 1, title: 'Confirm WhatsApp orders', owner: 'Front Desk', status: 'Urgent' },
  { id: 2, title: 'Check Weekend Fire batch count', owner: 'Kitchen', status: 'Open' },
  { id: 3, title: 'Post Weekend Fire story', owner: 'Marketing', status: 'Open' },
];

function openWhatsApp(message: string) {
  window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

export default function OperationalActions() {
  const [tasks, setTasks] = useState(initialTasks);
  const [leadType, setLeadType] = useState<LeadType>('weekend_fire_order');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('Ready.');
  const [saving, setSaving] = useState(false);

  const openCount = useMemo(() => tasks.filter((task) => task.status !== 'Done').length, [tasks]);

  function toggleTask(id: number) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status: task.status === 'Done' ? 'Open' : 'Done' } : task));
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus('Saving lead...');

    const payload = { form_kind: 'lead_form', leadType, name, phone, guestCount, eventDate, message, sourcePage: '/ai-manager' };

    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Lead save failed');
      setStatus(`Saved lead ${result.lead_id}.`);
      setTasks((current) => [{ id: Date.now(), title: `Follow up ${name}`, owner: 'Sales Operator', status: 'Open' }, ...current]);
      setName(''); setPhone(''); setGuestCount(''); setEventDate(''); setMessage('');
    } catch (error) {
      setStatus('Save failed. Opening WhatsApp fallback.');
      openWhatsApp(`Bon dia BOSSA, new ${leadType.replaceAll('_', ' ')} lead. Name: ${name}. Phone: ${phone}. Guests: ${guestCount || 'n/a'}. Date: ${eventDate || 'n/a'}. Notes: ${message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="ops-live" id="live-ops">
      <style>{styles}</style>
      <article className="ops-panel">
        <div className="ops-head"><div><span>Operational Controls</span><h2>WhatsApp quick actions</h2></div><strong>{openCount} open tasks</strong></div>
        <div className="ops-actions">
          <button onClick={() => openWhatsApp(quickMessages.order)}>Weekend Fire Order</button>
          <button onClick={() => openWhatsApp(quickMessages.reserve)}>Reservation</button>
          <button onClick={() => openWhatsApp(quickMessages.catering)}>Catering Quote</button>
          <button onClick={() => openWhatsApp(quickMessages.partner)}>Partner Outreach</button>
        </div>
      </article>

      <article className="ops-panel lead-panel">
        <div className="ops-head"><div><span>Lead Capture</span><h2>Save to Notion/Supabase</h2></div><em>{status}</em></div>
        <form onSubmit={submitLead} className="lead-form">
          <label>Type<select value={leadType} onChange={(event) => setLeadType(event.target.value as LeadType)}><option value="weekend_fire_order">Weekend Fire Order</option><option value="reservation">Reservation</option><option value="catering">Catering</option><option value="private_event">Private Event</option><option value="partner">Partner</option><option value="general_inquiry">General Inquiry</option></select></label>
          <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
          <label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} required /></label>
          <label>Guests<input value={guestCount} onChange={(event) => setGuestCount(event.target.value)} /></label>
          <label>Date<input value={eventDate} onChange={(event) => setEventDate(event.target.value)} type="date" /></label>
          <label className="wide">Message<textarea value={message} onChange={(event) => setMessage(event.target.value)} required /></label>
          <button disabled={saving}>{saving ? 'Saving...' : 'Save Lead'}</button>
        </form>
      </article>

      <article className="ops-panel">
        <div className="ops-head"><div><span>Command Queue</span><h2>Click to mark done</h2></div></div>
        <div className="task-stack">{tasks.map((task) => <button className={task.status.toLowerCase()} onClick={() => toggleTask(task.id)} key={task.id}><span><b>{task.title}</b><small>{task.owner}</small></span><em>{task.status}</em></button>)}</div>
      </article>
    </section>
  );
}

const styles = `.ops-live{display:grid;grid-template-columns:1fr 1.35fr;gap:20px;margin:20px 0}.ops-panel{border:1px solid rgba(255,255,255,.08);background:rgba(18,18,20,.86);border-radius:24px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)}.lead-panel{grid-row:span 2}.ops-head{display:flex;justify-content:space-between;gap:16px;margin-bottom:18px}.ops-head span{color:#fb923c;text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:900}.ops-head h2{margin:6px 0 0}.ops-head strong,.ops-head em{color:#18e39b;font-style:normal}.ops-actions,.task-stack{display:grid;gap:12px}.ops-actions{grid-template-columns:repeat(2,1fr)}.ops-actions button,.lead-form button,.task-stack button{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.05);color:#fff7ed;border-radius:14px;padding:13px 14px;font-weight:900;cursor:pointer}.ops-actions button:first-child,.lead-form button{background:linear-gradient(135deg,#ff6b00,#f97316);border-color:transparent}.lead-form{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.lead-form label{color:#d6d3d1;font-size:13px;font-weight:800}.lead-form input,.lead-form select,.lead-form textarea{width:100%;margin-top:6px;background:rgba(0,0,0,.32);border:1px solid rgba(255,255,255,.08);color:#fff7ed;border-radius:13px;padding:11px;font:inherit}.lead-form textarea{min-height:95px}.wide{grid-column:1/-1}.task-stack button{display:flex;justify-content:space-between;text-align:left}.task-stack small{display:block;color:#a8a29e;margin-top:4px}.task-stack em{font-style:normal;color:#fb923c}@media(max-width:900px){.ops-live,.ops-actions,.lead-form{grid-template-columns:1fr}.lead-panel{grid-row:auto}}`;
