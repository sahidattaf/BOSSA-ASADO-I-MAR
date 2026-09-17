import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';
import { siteConfig } from '../data/site';
import AiConciergeChat from './AiConciergeChat';

export const metadata: Metadata = {
  title: 'AI Concierge',
  description: 'Ask BOSSA AI Concierge about the current menu, hours, location, reservation requests, catering and private events, with WhatsApp handoff when human confirmation is needed.',
  alternates: { canonical: 'https://www.bossaasado.com/ai-concierge' },
};

const conciergeUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Bon dia BOSSA, I have a question for the concierge. Topic: ___ Message: ___')}`;

export default function AiConciergePage() {
  return (
    <main>
      <PublicHeader />
      <section className="container hero brand-hero">
        <span className="badge">BOSSA AI Concierge · MVP Preview</span>
        <h1>Ask BOSSA before you order, reserve, or plan your event.</h1>
        <p className="lead">Grounded in BOSSA&apos;s current public menu, location and hours. Live availability, reservations, allergies and special arrangements still require BOSSA confirmation.</p>
        <div className="cta-row">
          <a className="button primary" href={conciergeUrl} target="_blank" rel="noreferrer" data-track="whatsapp-click" data-cta-source="ai-concierge" data-cta-label="hero-question" data-offer-id="">Ask on WhatsApp</a>
          <a className="button" href="/contact">Contact</a>
        </div>
      </section>
      <AiConciergeChat whatsappNumber={siteConfig.whatsappNumber} />
      <SiteFooter label="BOSSA AI Concierge" />
    </main>
  );
}
