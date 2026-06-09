import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Rooftop Lounge',
  description:
    'Discover the BOSSA rooftop lounge direction in Pietermaai, Curacao: fire-grill dining, terrace energy, private events, and sunset hospitality moments.',
  alternates: { canonical: 'https://www.bossaasado.com/rooftop-lounge' },
};

export default function RooftopLoungePage() {
  return (
    <main>
      <PublicHeader />
      <section className="container hero brand-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="badge">Rooftop Lounge · Pietermaai Energy</span>
            <h1>Fire, flavor, music, and terrace nights.</h1>
            <p className="lead">
              BOSSA is building toward a rooftop-style hospitality experience for sunset food, private groups, tourist nights, and content-ready fire moments.
            </p>
            <div className="cta-row">
              <a className="button primary" href="/private-events">Plan an event</a>
              <a className="button" href="/tourist-experiences">Tourist experiences</a>
            </div>
          </div>
          <div className="hero-visual-card">
            <img src="/images/bossa/restaurant-design.jpg" alt="BOSSA rooftop lounge visual direction" />
            <div className="hero-visual-caption">
              <strong>Rooftop direction</strong>
              <span>Sunset · fire · groups · Pietermaai</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section premium-section">
        <div className="container grid">
          {['Sunset food moments', 'Private group nights', 'Tourist-friendly experiences'].map((item) => (
            <article className="card tall-card" key={item}>
              <h3>{item}</h3>
              <p>BOSSA keeps the offer clear: fire-grill food, island energy, and a simple WhatsApp planning path.</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter label="BOSSA Rooftop Lounge" />
    </main>
  );
}
