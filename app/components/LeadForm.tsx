'use client';

import { FormEvent, useState } from 'react';

type LeadFormProps = {
  leadType: 'catering' | 'private_event' | 'tourist_experience' | 'partner' | 'contact';
  sourcePage: string;
  title?: string;
  intro?: string;
};

type FormStatus =
  | { state: 'idle'; message: '' }
  | { state: 'submitting'; message: 'Sending your request...' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

const leadTypeLabels: Record<LeadFormProps['leadType'], string> = {
  catering: 'Catering',
  private_event: 'Private Event',
  tourist_experience: 'Tourist Experience',
  partner: 'Partner',
  contact: 'Contact',
};

export default function LeadForm({
  leadType,
  sourcePage,
  title = 'Send BOSSA your details',
  intro = 'Share the basics here, then use WhatsApp if you want the fastest follow-up.',
}: LeadFormProps) {
  const [status, setStatus] = useState<FormStatus>({ state: 'idle', message: '' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: 'submitting', message: 'Sending your request...' });

    const payload = {
      form_kind: 'lead_form',
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      email: String(formData.get('email') ?? ''),
      leadType,
      eventDate: String(formData.get('eventDate') ?? ''),
      guestCount: String(formData.get('guestCount') ?? ''),
      budget: String(formData.get('budget') ?? ''),
      message: String(formData.get('message') ?? ''),
      sourcePage,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string; lead_id?: string };

      if (!response.ok || !data.ok) {
        setStatus({
          state: 'error',
          message: data.error ?? 'Something went wrong. Please try again or message BOSSA on WhatsApp.',
        });
        return;
      }

      form.reset();
      setStatus({
        state: 'success',
        message: 'Request received. WhatsApp is still available below if you want the fastest confirmation.',
      });
    } catch {
      setStatus({
        state: 'error',
        message: 'Could not send the request. Please try again or message BOSSA on WhatsApp.',
      });
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div>
        <span className="badge">{leadTypeLabels[leadType]} Lead</span>
        <h3>{title}</h3>
        <p>{intro}</p>
      </div>

      <div className="lead-form-grid">
        <label>
          <span>Name *</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Phone / WhatsApp *</span>
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          <span>Event Date</span>
          <input name="eventDate" type="text" placeholder="Date or preferred window" />
        </label>
        <label>
          <span>Guest Count</span>
          <input name="guestCount" type="text" inputMode="numeric" />
        </label>
        <label>
          <span>Budget</span>
          <input name="budget" type="text" placeholder="XCG / USD" />
        </label>
      </div>

      <label>
        <span>Message *</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell BOSSA what you need, where, when, and what kind of fire-grill moment you want."
        />
      </label>

      <div className="lead-form-footer">
        <button className="button primary" type="submit" disabled={status.state === 'submitting'}>
          {status.state === 'submitting' ? 'Sending...' : 'Send Request'}
        </button>
        {status.message ? (
          <p className={`lead-form-status lead-form-status--${status.state}`} role={status.state === 'error' ? 'alert' : 'status'}>
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
