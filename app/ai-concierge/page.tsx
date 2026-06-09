import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';
import { siteConfig } from '../data/site';

export const metadata: Metadata = {
  title: 'AI Concierge',
  description:
    'BOSSA AI Concierge placeholder for menu questions, reservations, catering, private events, tourist packages, partnerships, and WhatsApp handoff.',
  alternates: { canonical: 'https://www.bossaasado.com/ai-concierge' },
};

const conciergeUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  'Bon dia BOSSA, I have a question for the concierge. Topic: ___ Message: ___'
)}`;

export default function AiConciergePage() {
  return (
    <main>
      <PublicHeader />
      <section className="container hero brand-hero">
        <span className="badge">AI Concierge · Coming Soon</span>
        <h1>Ask about menu, reservations, catering, events, tourist packages, and partners.</h1>
        <p className="lead">
          Phase 1 keeps the concierge simple with WhatsApp handoff. Phase 2 can connect a chat UI to BOSSA knowledge, OpenAI, and the lead system.
        </p>
        <div className="cta-row">
          <a className="button primary" href={conciergeUrl} target="_blank" rel="noreferrer" data-track="whatsapp-click" data-cta-source="ai-concierge" data-cta-label="hero-question" data-offer-id="">
            Ask on WhatsApp
          </a>
          <a className="button" href="/contact">Contact</a>
        </div>
      </section>
      <section className="section premium-section">
        <div className="container grid">
          {['Website chat UI', 'BOSSA knowledge base', 'WhatsApp handoff'].map((item) => (
            <article className="card tall-card" key={item}>
              <h3>{item}</h3>
              <p>Prepared as the next layer after the static revenue pages are live and selling clearly.</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter label="BOSSA AI Concierge" />
    </main>
  );
}
