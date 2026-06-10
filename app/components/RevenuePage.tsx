import LeadForm from './LeadForm';
import PublicHeader from './PublicHeader';
import SiteFooter from './SiteFooter';
import { siteConfig } from '../data/site';

type RevenuePageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  primaryCta: string;
  whatsappMessage: string;
  sections: readonly {
    title: string;
    items: readonly string[];
  }[];
};

const whatsappUrl = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export default function RevenuePage({
  content,
  ctaSource,
  leadType,
  sourcePage,
}: {
  content: RevenuePageContent;
  ctaSource: string;
  leadType?: 'catering' | 'private_event' | 'tourist_experience' | 'partner';
  sourcePage?: string;
}) {
  const href = whatsappUrl(content.whatsappMessage);

  return (
    <main>
      <PublicHeader />

      <section className="container hero brand-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="badge">{content.eyebrow}</span>
            <h1>{content.title}</h1>
            <p className="lead">{content.subtitle}</p>
            <div className="cta-row">
              <a
                className="button primary"
                href={href}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp-click"
                data-cta-source={ctaSource}
                data-cta-label="hero-whatsapp"
                data-offer-id=""
              >
                {content.primaryCta}
              </a>
              <a className="button" href="/weekend-fire">
                Weekend Fire
              </a>
              <a className="button" href="/contact">
                Contact BOSSA
              </a>
            </div>
          </div>
          <div className="hero-visual-card">
            <img src={content.image} alt={`${content.title} visual`} />
            <div className="hero-visual-caption">
              <strong>{siteConfig.brandName}</strong>
              <span>{content.eyebrow}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section premium-section">
        <div className="container">
          <div className="grid">
            {content.sections.map((section) => (
              <article className="card tall-card" key={section.title}>
                <h3>{section.title}</h3>
                <ul className="revenue-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container lead-capture-grid">
          {leadType && sourcePage ? (
            <LeadForm
              leadType={leadType}
              sourcePage={sourcePage}
              title="Request a BOSSA quote"
              intro="Send the planning details now. WhatsApp stays open for the fastest confirmation."
            />
          ) : null}
          <div className="premium-final-cta">
            <span className="badge">WhatsApp Quote Flow</span>
            <h2>Send the details. BOSSA confirms the best fire format.</h2>
            <p>{content.whatsappMessage}</p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <a
                className="button primary"
                href={href}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp-click"
                data-cta-source={ctaSource}
                data-cta-label="closing-whatsapp"
                data-offer-id=""
              >
                {content.primaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter label={content.title} />
    </main>
  );
}
