import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about BOSSA Asado i Mar, a Curacao fire-grill restaurant concept built around smoke, sea, rooftop energy, WhatsApp-first reservations, and AI-powered hospitality.',
  alternates: { canonical: 'https://www.bossaasado.com/about' },
};

export default function AboutPage() {
  return (
    <main>
      <PublicHeader />
      <section className="container hero brand-hero">
        <span className="badge">About BOSSA</span>
        <h1>Fire. Flavor. Ocean.</h1>
        <p className="lead">
          BOSSA Asado i Mar is a Curacao fire-grill hospitality brand built around wood fire, Caribbean soul, Pietermaai energy, Weekend Fire boxes, private events, and WhatsApp-first service.
        </p>
      </section>
      <section className="section premium-section">
        <div className="container grid">
          {['Wood-fire dining', 'WhatsApp-first hospitality', 'AI-powered operations'].map((item) => (
            <article className="card tall-card" key={item}>
              <h3>{item}</h3>
              <p>BOSSA keeps the guest experience simple while the operating system behind it gets smarter over time.</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter label="About BOSSA" />
    </main>
  );
}
