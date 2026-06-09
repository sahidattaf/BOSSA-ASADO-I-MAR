import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';
import { siteConfig } from '../data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact BOSSA Asado i Mar in Pietermaai, Willemstad, Curacao for orders, reservations, catering, private events, tourist experiences, and partnerships.',
  alternates: { canonical: 'https://www.bossaasado.com/contact' },
};

const contactUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  'Bon dia BOSSA, I want to contact you. Name: ___ Topic: ___ Message: ___'
)}`;

export default function ContactPage() {
  return (
    <main>
      <PublicHeader />
      <section className="container hero">
        <span className="badge">Contact · Pietermaai · WhatsApp First</span>
        <h1>Order, reserve, quote, partner, or ask.</h1>
        <p className="lead">{siteConfig.address}. Open {siteConfig.hours}.</p>
        <div className="cta-row">
          <a className="button primary" href={contactUrl} target="_blank" rel="noreferrer" data-track="whatsapp-click" data-cta-source="contact" data-cta-label="hero-contact" data-offer-id="">
            WhatsApp BOSSA
          </a>
          <a className="button" href="https://www.google.com/maps/search/?api=1&query=Oranjestraat%20116%20Pietermaai%20Willemstad%20Curacao" target="_blank" rel="noreferrer">
            Open Google Maps
          </a>
        </div>
      </section>
      <section className="section premium-section">
        <div className="container split">
          <div className="info-card">
            <h3>Quick Info</h3>
            <p>Address: {siteConfig.address}</p>
            <p>WhatsApp: +5999 523 0683</p>
            <p>Hours: {siteConfig.hours}</p>
          </div>
          <div className="info-card">
            <h3>Contact Topics</h3>
            <p>Orders, reservations, catering, private events, tourist packages, partnerships, and general questions.</p>
          </div>
        </div>
      </section>
      <SiteFooter label="Contact BOSSA" />
    </main>
  );
}
