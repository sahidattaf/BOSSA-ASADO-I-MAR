'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  MAX_PARTY_SIZE,
  SLOT_TIMES,
  formatReservationDateLong,
  formatSlotLabel,
  getCuracaoNow,
  isFutureSlot,
  isOpenDate,
  isValidDateString,
  validateReservationInput,
  type ReservationErrorCode,
  type ReservationField,
} from '../lib/reservations';

type Language = 'en' | 'pap';
type FieldErrors = Partial<Record<ReservationField, ReservationErrorCode>>;

type SubmitState =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; summary: { name: string; date: string; time: string; partySize: number } }
  | { state: 'error'; code: 'slot_full' | 'unavailable' | 'rate_limited' | 'generic' | 'fields'; seatsLeft?: number };

const WHATSAPP_NUMBER = '59995230683';

const copy = {
  en: {
    badge: 'Online reservation',
    title: 'Reserve a table',
    intro: 'Send your request in a minute. BOSSA confirms every table personally on WhatsApp.',
    hours: 'Open Thursday – Sunday · 12:00 PM – 10:00 PM. Closed Monday, Tuesday & Wednesday.',
    slots: 'Reservation times: 12:00 PM – 9:30 PM, every 30 minutes. Last seating 9:30 PM.',
    name: 'Name',
    phone: 'Phone (WhatsApp)',
    phoneHint: 'Include your country code if you are visiting, e.g. +1 or +31.',
    email: 'Email (optional)',
    partySize: 'Party size',
    guests: (count: number) => (count === 1 ? '1 guest' : `${count} guests`),
    date: 'Date',
    time: 'Time',
    chooseTime: 'Choose a time',
    notes: 'Notes (optional)',
    notesPlaceholder: 'Celebration, allergies, seating wishes…',
    required: 'Required',
    submit: 'Request reservation',
    submitting: 'Sending…',
    successTitle: 'Request received',
    successMessage: 'Your request has been received. We will confirm via WhatsApp shortly.',
    pending: 'Status: waiting for BOSSA confirmation',
    summary: (partySize: number, date: string, time: string) => `${copy.en.guests(partySize)} · ${date} · ${time}`,
    whatsappFollowUp: 'Message BOSSA on WhatsApp',
    another: 'Make another request',
    preferWhatsapp: 'Prefer WhatsApp?',
    reserveOnWhatsapp: 'Reserve on WhatsApp',
    whatsappRequest: 'Bon dia BOSSA, I want to reserve. Name: ___ Date: ___ Time: ___ Party size: ___ Special notes: ___',
    whatsappAfterSubmit: (name: string, date: string, time: string, partySize: number) =>
      `Bon dia BOSSA, I just sent a reservation request online. Name: ${name} · Date: ${date} · Time: ${time} · Party size: ${partySize}`,
    errors: {
      required: 'This field is required.',
      name_invalid: 'Please enter your name (max. 120 characters).',
      phone_invalid: 'Enter a valid phone / WhatsApp number.',
      email_invalid: 'Enter a valid email or leave it empty.',
      party_size_invalid: `Party size must be between 1 and ${MAX_PARTY_SIZE}.`,
      date_invalid: 'Choose a valid date.',
      date_past: 'Choose today or a later date.',
      closed_day: 'We are closed on Monday, Tuesday and Wednesday. Please choose Thursday to Sunday.',
      time_invalid: 'Choose a time between 12:00 PM and 9:30 PM.',
      time_past: 'That time has already passed. Please choose a later time.',
      notes_too_long: 'Notes can be up to 1,000 characters.',
    } satisfies Record<ReservationErrorCode, string>,
    fieldsError: 'Please check the highlighted fields.',
    slotFull: 'This time is fully booked. Please choose another time.',
    seatsLeft: (count: number) => (count > 0 ? `Only ${count} ${count === 1 ? 'seat is' : 'seats are'} left at this time.` : ''),
    unavailable: 'Online reservations are temporarily unavailable. Please reserve on WhatsApp.',
    rateLimited: 'Too many requests from this device. Please wait a few minutes or reserve on WhatsApp.',
    generic: 'Something went wrong. Please try again or reserve on WhatsApp.',
  },
  pap: {
    badge: 'Reservashon online',
    title: 'Reservá un mesa',
    intro: 'Manda bo petishon den un minüt. BOSSA ta konfirmá kada mesa personalmente via WhatsApp.',
    hours: 'Habri djaweps te djadumingu · 12:00 PM – 10:00 PM. Será djaluna, djamars i djarason.',
    slots: 'Ora pa reservá: 12:00 PM – 9:30 PM, kada 30 minüt. Último mesa: 9:30 PM.',
    name: 'Nòmber',
    phone: 'Telefòn (WhatsApp)',
    phoneHint: 'Si bo ta bishitando, pone bo kódigo di pais, por ehempel +1 òf +31.',
    email: 'E-mail (opshonal)',
    partySize: 'Kantidat di hende',
    guests: (count: number) => (count === 1 ? '1 persona' : `${count} persona`),
    date: 'Fecha',
    time: 'Ora',
    chooseTime: 'Skohe un ora',
    notes: 'Nota (opshonal)',
    notesPlaceholder: 'Selebrashon, alergia, preferensia di lugá…',
    required: 'Obligatorio',
    submit: 'Manda petishon',
    submitting: 'Ta manda…',
    successTitle: 'Nos a risibí bo petishon',
    successMessage: 'Nos a risibí bo petishon. Lo nos konfirmá via WhatsApp pronto.',
    pending: 'Status: ta warda konfirmashon di BOSSA',
    summary: (partySize: number, date: string, time: string) => `${copy.pap.guests(partySize)} · ${date} · ${time}`,
    whatsappFollowUp: 'Manda BOSSA un mensahe na WhatsApp',
    another: 'Manda un otro petishon',
    preferWhatsapp: 'Bo ta preferá WhatsApp?',
    reserveOnWhatsapp: 'Reservá via WhatsApp',
    whatsappRequest: 'Bon dia BOSSA, mi ke reserva. Nòmber: ___ Fecha: ___ Ora: ___ Kantidat di hende: ___ Nota spesial: ___',
    whatsappAfterSubmit: (name: string, date: string, time: string, partySize: number) =>
      `Bon dia BOSSA, mi a manda un petishon di reservashon online. Nòmber: ${name} · Fecha: ${date} · Ora: ${time} · Kantidat di hende: ${partySize}`,
    errors: {
      required: 'E kampo aki ta obligatorio.',
      name_invalid: 'Por fabor skirbi bo nòmber (máksimo 120 karakter).',
      phone_invalid: 'Skirbi un number di telefòn/WhatsApp válido.',
      email_invalid: 'Skirbi un e-mail válido òf laga e kampo bashí.',
      party_size_invalid: `Kantidat di hende mester ta entre 1 i ${MAX_PARTY_SIZE}.`,
      date_invalid: 'Skohe un fecha válido.',
      date_past: 'Skohe awe òf un fecha mas despues.',
      closed_day: 'Nos ta será djaluna, djamars i djarason. Por fabor skohe djaweps te djadumingu.',
      time_invalid: 'Skohe un ora entre 12:00 PM i 9:30 PM.',
      time_past: 'E ora ei a pasa kaba. Por fabor skohe un ora mas lat.',
      notes_too_long: 'Nota por tin máksimo 1.000 karakter.',
    } satisfies Record<ReservationErrorCode, string>,
    fieldsError: 'Por fabor kontrolá e kamponan marká.',
    slotFull: 'E ora aki ta kompletamente reservá. Por fabor skohe un otro ora.',
    seatsLeft: (count: number) => (count > 0 ? `Ta keda ${count} lugá so na e ora aki.` : ''),
    unavailable: 'Reservashon online no ta disponibel awor. Por fabor reservá via WhatsApp.',
    rateLimited: 'Hopi petishon for di e aparato aki. Warda un par di minüt òf reservá via WhatsApp.',
    generic: 'Algu a bai robes. Purba atrobe òf reservá via WhatsApp.',
  },
} as const;

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const emptyValues = {
  guest_name: '',
  guest_phone: '',
  guest_email: '',
  party_size: '2',
  reservation_date: '',
  reservation_time: '',
  notes: '',
  website: '',
};

export default function ReservationForm() {
  const [language, setLanguage] = useState<Language>('en');
  const [values, setValues] = useState(emptyValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submit, setSubmit] = useState<SubmitState>({ state: 'idle' });
  const t = copy[language];

  // Curaçao "now" is read in the browser only (the page HTML can be pre-rendered),
  // then refreshed every minute so past slots on today's date disable themselves.
  const [clock, setClock] = useState<ReturnType<typeof getCuracaoNow> | null>(null);
  useEffect(() => {
    setClock(getCuracaoNow());
    const timer = window.setInterval(() => setClock(getCuracaoNow()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const dateIsUsable =
    clock !== null && isValidDateString(values.reservation_date) && values.reservation_date >= clock.date && isOpenDate(values.reservation_date);
  const slotOptions = SLOT_TIMES.map((time) => ({
    time,
    disabled: dateIsUsable && clock ? !isFutureSlot(values.reservation_date, time, clock) : false,
  }));

  function update(field: keyof typeof emptyValues, value: string) {
    const now = getCuracaoNow();
    const next = { ...values, [field]: value };
    if (field === 'reservation_date') {
      const selectedSlotPassed =
        next.reservation_time && isValidDateString(value) && value === now.date && !isFutureSlot(value, next.reservation_time, now);
      if (selectedSlotPassed) next.reservation_time = '';
    }
    setValues(next);

    // Re-validate the edited field (and the time when the date changes) as the guest types.
    const result = validateReservationInput(next, now);
    const fresh = result.ok ? {} : result.errors;
    setFieldErrors((current) => {
      const merged = { ...current };
      const touched: ReservationField[] = field === 'reservation_date' ? ['reservation_date', 'reservation_time'] : field === 'website' ? [] : [field];
      for (const key of touched) {
        const shouldShow = key === 'reservation_date' ? Boolean(next.reservation_date) : key === 'reservation_time' ? Boolean(next.reservation_time) : Boolean(current[key]);
        if (fresh[key] && shouldShow) merged[key] = fresh[key];
        else delete merged[key];
      }
      return merged;
    });
    if (submit.state === 'error') setSubmit({ state: 'idle' });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateReservationInput(values, getCuracaoNow());
    if (!result.ok) {
      setFieldErrors(result.errors);
      setSubmit({ state: 'error', code: 'fields' });
      const firstField = Object.keys(result.errors)[0];
      if (firstField) document.getElementById(`reserve-${firstField}`)?.focus();
      return;
    }

    setFieldErrors({});
    setSubmit({ state: 'submitting' });

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.value, website: values.website }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
        seats_left?: number;
      };

      if (response.status === 201 && data.ok) {
        setSubmit({
          state: 'success',
          summary: {
            name: result.value.guest_name,
            date: result.value.reservation_date,
            time: result.value.reservation_time,
            partySize: result.value.party_size,
          },
        });
        setValues(emptyValues);
        return;
      }

      if (data.error === 'slot_full') {
        setFieldErrors({});
        setSubmit({ state: 'error', code: 'slot_full', seatsLeft: data.seats_left });
      } else if (data.error === 'validation_failed') {
        setFieldErrors(data.fields ?? {});
        setSubmit({ state: 'error', code: 'fields' });
      } else if (data.error === 'reservations_unavailable') {
        setSubmit({ state: 'error', code: 'unavailable' });
      } else if (data.error === 'rate_limited') {
        setSubmit({ state: 'error', code: 'rate_limited' });
      } else {
        setSubmit({ state: 'error', code: 'generic' });
      }
    } catch {
      setSubmit({ state: 'error', code: 'generic' });
    }
  }

  const languageToggle = (
    <div className="reserve-language" role="group" aria-label="Language / Idioma">
      {(['en', 'pap'] as const).map((code) => (
        <button key={code} type="button" aria-pressed={language === code} onClick={() => setLanguage(code)}>
          {code === 'en' ? 'English' : 'Papiamentu'}
        </button>
      ))}
    </div>
  );

  if (submit.state === 'success') {
    const { name, date, time, partySize } = submit.summary;
    const dateLabel = formatReservationDateLong(date, language);
    const timeLabel = formatSlotLabel(time);
    return (
      <section className="reserve-card reserve-success" lang={language} aria-live="polite">
        {languageToggle}
        <span className="reserve-badge">{t.badge}</span>
        <h2>{t.successTitle}</h2>
        <p className="reserve-success-message">{t.successMessage}</p>
        <div className="reserve-summary">
          <strong>{t.summary(partySize, dateLabel, timeLabel)}</strong>
          <span>{t.pending}</span>
        </div>
        <div className="reserve-actions">
          <a
            className="reserve-button reserve-button--whatsapp"
            href={whatsappLink(t.whatsappAfterSubmit(name, dateLabel, timeLabel, partySize))}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp-click"
            data-cta-source="reserve"
            data-cta-label="reservation-success-whatsapp"
            data-offer-id=""
          >
            {t.whatsappFollowUp}
          </a>
          <button type="button" className="reserve-button reserve-button--ghost" onClick={() => setSubmit({ state: 'idle' })}>
            {t.another}
          </button>
        </div>
      </section>
    );
  }

  const describe = (field: ReservationField, hint?: string) =>
    [fieldErrors[field] ? `reserve-${field}-error` : null, hint].filter(Boolean).join(' ') || undefined;

  const fieldError = (field: ReservationField) =>
    fieldErrors[field] ? (
      <span className="reserve-field-error" id={`reserve-${field}-error`}>
        {t.errors[fieldErrors[field]!]}
      </span>
    ) : null;

  const formMessage =
    submit.state === 'error'
      ? submit.code === 'fields'
        ? t.fieldsError
        : submit.code === 'slot_full'
          ? `${t.slotFull} ${t.seatsLeft(submit.seatsLeft ?? 0)}`.trim()
          : submit.code === 'unavailable'
            ? t.unavailable
            : submit.code === 'rate_limited'
              ? t.rateLimited
              : t.generic
      : '';

  return (
    <form className="reserve-card" onSubmit={handleSubmit} noValidate lang={language} aria-describedby="reserve-hours">
      {languageToggle}
      <span className="reserve-badge">{t.badge}</span>
      <h2>{t.title}</h2>
      <p className="reserve-intro">{t.intro}</p>
      <p className="reserve-hours" id="reserve-hours">
        {t.hours} <span>{t.slots}</span>
      </p>

      <div className="reserve-grid">
        <label className="reserve-field reserve-field--wide">
          <span>
            {t.name} <abbr title={t.required}>*</abbr>
          </span>
          <input
            id="reserve-guest_name"
            name="guest_name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            value={values.guest_name}
            onChange={(event) => update('guest_name', event.target.value)}
            aria-invalid={Boolean(fieldErrors.guest_name)}
            aria-describedby={describe('guest_name')}
          />
          {fieldError('guest_name')}
        </label>

        <label className="reserve-field">
          <span>
            {t.phone} <abbr title={t.required}>*</abbr>
          </span>
          <input
            id="reserve-guest_phone"
            name="guest_phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={24}
            placeholder="+5999 …"
            required
            value={values.guest_phone}
            onChange={(event) => update('guest_phone', event.target.value)}
            aria-invalid={Boolean(fieldErrors.guest_phone)}
            aria-describedby={describe('guest_phone', 'reserve-phone-hint')}
          />
          <small id="reserve-phone-hint">{t.phoneHint}</small>
          {fieldError('guest_phone')}
        </label>

        <label className="reserve-field">
          <span>{t.email}</span>
          <input
            id="reserve-guest_email"
            name="guest_email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={values.guest_email}
            onChange={(event) => update('guest_email', event.target.value)}
            aria-invalid={Boolean(fieldErrors.guest_email)}
            aria-describedby={describe('guest_email')}
          />
          {fieldError('guest_email')}
        </label>

        <label className="reserve-field">
          <span>
            {t.partySize} <abbr title={t.required}>*</abbr>
          </span>
          <select
            id="reserve-party_size"
            name="party_size"
            required
            value={values.party_size}
            onChange={(event) => update('party_size', event.target.value)}
            aria-invalid={Boolean(fieldErrors.party_size)}
            aria-describedby={describe('party_size')}
          >
            {Array.from({ length: MAX_PARTY_SIZE }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {t.guests(count)}
              </option>
            ))}
          </select>
          {fieldError('party_size')}
        </label>

        <label className="reserve-field">
          <span>
            {t.date} <abbr title={t.required}>*</abbr>
          </span>
          <input
            id="reserve-reservation_date"
            name="reservation_date"
            type="date"
            min={clock?.date}
            required
            value={values.reservation_date}
            onChange={(event) => update('reservation_date', event.target.value)}
            aria-invalid={Boolean(fieldErrors.reservation_date)}
            aria-describedby={describe('reservation_date', 'reserve-hours')}
          />
          {fieldError('reservation_date')}
        </label>

        <label className="reserve-field">
          <span>
            {t.time} <abbr title={t.required}>*</abbr>
          </span>
          <select
            id="reserve-reservation_time"
            name="reservation_time"
            required
            value={values.reservation_time}
            onChange={(event) => update('reservation_time', event.target.value)}
            aria-invalid={Boolean(fieldErrors.reservation_time) || (submit.state === 'error' && submit.code === 'slot_full')}
            aria-describedby={describe('reservation_time')}
          >
            <option value="">{t.chooseTime}</option>
            {slotOptions.map(({ time, disabled }) => (
              <option key={time} value={time} disabled={disabled}>
                {formatSlotLabel(time)}
              </option>
            ))}
          </select>
          {fieldError('reservation_time')}
        </label>

        <label className="reserve-field reserve-field--wide">
          <span>{t.notes}</span>
          <textarea
            id="reserve-notes"
            name="notes"
            rows={3}
            maxLength={1000}
            placeholder={t.notesPlaceholder}
            value={values.notes}
            onChange={(event) => update('notes', event.target.value)}
            aria-invalid={Boolean(fieldErrors.notes)}
            aria-describedby={describe('notes')}
          />
          {fieldError('notes')}
        </label>

        {/* Honeypot for bots — hidden from people and assistive technology. */}
        <div className="reserve-honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update('website', event.target.value)} />
          </label>
        </div>
      </div>

      {formMessage ? (
        <p className="reserve-form-error" role="alert">
          {formMessage}{' '}
          {submit.state === 'error' && (submit.code === 'unavailable' || submit.code === 'generic' || submit.code === 'rate_limited') ? (
            <a href={whatsappLink(t.whatsappRequest)} target="_blank" rel="noreferrer" data-track="whatsapp-click" data-cta-source="reserve" data-cta-label="reservation-error-whatsapp" data-offer-id="">
              {t.reserveOnWhatsapp}
            </a>
          ) : null}
        </p>
      ) : null}

      <div className="reserve-actions">
        <button className="reserve-button" type="submit" disabled={submit.state === 'submitting'}>
          {submit.state === 'submitting' ? t.submitting : t.submit}
        </button>
        <p className="reserve-alt">
          {t.preferWhatsapp}{' '}
          <a href={whatsappLink(t.whatsappRequest)} target="_blank" rel="noreferrer" data-track="whatsapp-click" data-cta-source="reserve" data-cta-label="reservation-form-whatsapp" data-offer-id="">
            {t.reserveOnWhatsapp}
          </a>
        </p>
      </div>
    </form>
  );
}
