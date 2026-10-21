import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import ReservationForm from '../components/ReservationForm';
import SiteFooter from '../components/SiteFooter';
import { siteConfig } from '../data/site';
import './reserve.css';

export const metadata: Metadata = {
  title: 'Reserve a Table',
  description:
    'Request a table at BOSSA Asado i Mar in Pietermaai, Curaçao. Open Wednesday to Sunday, 5:00 PM to 11:00 PM. Every reservation is confirmed personally on WhatsApp.',
  alternates: { canonical: 'https://www.bossaasado.com/reserve' },
};

const steps = [
  ['01', 'Send your request', 'Pick a date, time and party size.'],
  ['02', 'BOSSA confirms', 'The team checks the fire and the floor, then confirms on WhatsApp.'],
  ['03', 'Come hungry', 'Arrive at your time — the grill is ready. Bon apetit!'],
] as const;

export default function ReservePage() {
  return (
    <main className="reserve-page">
      <PublicHeader />

      <section className="container reserve-hero">
        <span className="badge">Reservations · Reservashon · Pietermaai</span>
        <h1>Reserve your table by the fire.</h1>
        <p className="lead">Fire-grill dining with Caribbean soul. Send your request online — BOSSA confirms every table personally on WhatsApp.</p>
      </section>

      <section className="container reserve-layout">
        <ReservationForm />

        <aside className="reserve-side" aria-label="Reservation information">
          <div className="reserve-info">
            <h2>Opening hours · Ora di habri</h2>
            <dl>
              <div>
                <dt>Wednesday – Sunday</dt>
                <dd>5:00 PM – 11:00 PM</dd>
              </div>
              <div>
                <dt>Monday – Tuesday</dt>
                <dd>Closed · Será</dd>
              </div>
              <div>
                <dt>Reservation times</dt>
                <dd>5:00 PM – 9:30 PM</dd>
              </div>
            </dl>
          </div>

          <div className="reserve-info">
            <h2>How it works</h2>
            <ol className="reserve-steps">
              {steps.map(([number, title, text]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="reserve-info">
            <h2>Find us</h2>
            <p>{siteConfig.address}</p>
            <p>WhatsApp: +5999 523 0683</p>
          </div>
        </aside>
      </section>

      <SiteFooter label="Reserve at BOSSA" />
    </main>
  );
}
