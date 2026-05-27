import { mediaAssets } from './data/media';
import { menuSections } from './data/menu';
import { siteConfig } from './data/site';

const whatsappNumber = siteConfig.whatsappNumber;
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const mainAudio = mediaAssets.audio[0];
const youtubeVideos = mediaAssets.videos.filter((video) => video.status === 'active');

const buildWhatsAppUrl = (message: string) => `${whatsappUrl}?text=${encodeURIComponent(message)}`;

const orderUrl = buildWhatsAppUrl(
  'Bon dia BOSSA, I want to place an order. Name: ___ Pickup time: ___ Items / box number: ___ Quantity: ___'
);
const reservationUrl = buildWhatsAppUrl(
  'Bon dia BOSSA, I want to reserve. Name: ___ Date: ___ Time: ___ Party size: ___ Special notes: ___'
);
const weekendUrl = buildWhatsAppUrl(
  'Bon dia BOSSA, Weekend Fire! Please confirm what boxes are available today. Name: ___ Pickup time: ___ Box number: ___ Quantity: ___'
);
const partyUrl = buildWhatsAppUrl(
  'Bon dia BOSSA, I want a party / event quote. Date: ___ Group size: ___ Pickup/event time: ___ Package preference: ___'
);

const routes = [
  ['Order', '#order'],
  ['Menu', '#menu'],
  ['Audio', '#audio'],
  ['Videos', '#videos'],
  ['Weekend Fire', '/weekend-fire'],
  ['Party / Events', '/party-menu'],
  ['Location', '#location'],
];

const orderCards = [
  {
    title: 'Order Weekend Fire',
    text: 'Choose a numbered box, send pickup time and quantity, then BOSSA confirms what is still available from the fire.',
    cta: 'Order boxes',
    href: weekendUrl,
  },
  {
    title: 'Reserve a table',
    text: 'For dine-in or terrace energy, send name, date, time, party size, and special notes through WhatsApp.',
    cta: 'Reserve now',
    href: reservationUrl,
  },
  {
    title: 'Plan party / event food',
    text: 'For birthdays, office orders, rooftop nights, and private fire moments, request a quote ahead of time.',
    cta: 'Request quote',
    href: partyUrl,
  },
];

const howItWorks = [
  ['01', 'Choose format', 'Weekend box, sandwich, skewer, side order, party tray, or event package.'],
  ['02', 'Send WhatsApp', 'Name, pickup time, item or box number, quantity, and special notes.'],
  ['03', 'BOSSA confirms', 'The team confirms availability before the fire batch sells out.'],
  ['04', 'Pickup or dine', 'Fast handoff, hot food, clean flow, no noise — just heat.'],
];

export default function HomePage() {
  return (
    <main>
      <div className="fire-rhythm-bar" role="status" aria-label="BOSSA Fire Rhythm opening status">
        <span>🔥 Fire Rhythm</span>
        <strong>Live Thursday–Sunday · 12 PM–10 PM</strong>
        <small>When the fire rests, we close. WhatsApp first for today’s batch.</small>
      </div>

      <header className="container nav">
        <a className="brand brand-lockup" href="#top" aria-label={`${siteConfig.brandName} home`}>
          <img src="/images/bossa/bossa-logo-fire-gold.svg" alt="" className="brand-logo" />
          <span>BOSSA ASADO I MAR</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {routes.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
      </header>

      <section id="top" className="container hero brand-hero premium-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="badge">Pietermaai · Opposite Avila Hotel · Curaçao</span>
            <h1>Wood fire dining with Caribbean soul.</h1>
            <p className="lead">
              {siteConfig.brandName} brings fire boxes, ribs, skewers, sandwiches, side-order bowls, party orders,
              audio, videos, and Weekend Fire energy into one clear WhatsApp-first restaurant flow.
            </p>
            <div className="cta-row">
              <a className="button primary" href={orderUrl} target="_blank" rel="noreferrer">Order on WhatsApp</a>
              <a className="button" href="/weekend-fire">Weekend Fire Boxes</a>
              <a className="button" href="/party-menu">Party / Events</a>
              <a className="button" href="#menu">View menu</a>
            </div>
          </div>
          <div className="hero-visual-card">
            <img
              src="/images/bossa/bossa-hero-pietermaai-business-hub.jpg"
              alt="BOSSA Pietermaai Business Hub rooftop sunset hero"
            />
            <div className="hero-visual-caption">
              <strong>Pietermaai Business Hub</strong>
              <span>Retail · Beauty · Rooftop Dining · BOSSA fire energy</span>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="section media-section">
        <div className="container">
          <span className="badge">Order Flow</span>
          <h2>One website. Three clean actions.</h2>
          <p>Guests should never wonder what to do next: order boxes, reserve, or request a party/event quote.</p>
          <div className="grid" style={{ marginTop: '24px' }}>
            {orderCards.map((card) => (
              <article className="card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <a className="button primary" href={card.href} target="_blank" rel="noreferrer">{card.cta}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <span className="badge">How BOSSA Works</span>
          <h2>Simple order flow. Clean fire execution.</h2>
          <div className="grid weekend-grid">
            {howItWorks.map(([step, title, text]) => (
              <article className="card tall-card" key={step}>
                <span className="badge">{step}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="audio" className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">BOSSA Sound</span>
            <h2>Play the BOSSA mood while guests choose.</h2>
            <p>
              The generated media data controls this audio asset across the homepage, Weekend Fire, and party/event flow.
            </p>
          </div>
          <div className="info-card audio-card">
            <h3>{mainAudio.name}</h3>
            <audio controls preload="metadata">
              <source src={mainAudio.path} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p>Fire, smoke, island soul, and BOSSA rhythm.</p>
          </div>
        </div>
      </section>

      <section id="weekend-fire" className="section promo-section">
        <div className="container split">
          <div>
            <span className="badge">Weekend Fire</span>
            <h2>Numbered boxes built for Thursday through Sunday.</h2>
            <p>
              BOSSA Weekend Fire now has the live customizer, final flyer images, offline HTML export, PNG export,
              PDF print flow, and WhatsApp order buttons. Box #7 is the SEA BOX Coming Soon slot.
            </p>
            <div className="cta-row">
              <a className="button primary" href="/weekend-fire">Open Weekend Fire page</a>
              <a className="button" href="/weekend-fire/customize">Open flyer customizer</a>
              <a className="button" href={weekendUrl} target="_blank" rel="noreferrer">Order boxes</a>
            </div>
          </div>
          <img
            src="/images/bossa/weekend-fire/box-1-bossa-box-mix.png"
            alt="BOSSA Box Mix Weekend Fire box"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </section>

      <section id="menu" className="section">
        <div className="container">
          <span className="badge">Fire & Smoke Menu</span>
          <h2>Menu blocks from approved BOSSA content JSON.</h2>
          <p>
            The website menu is generated into <code>app/data/menu.ts</code>. Update <code>content/notion/bossa-website-content.template.json</code>,
            then run <code>npm run generate:data</code> to refresh it.
          </p>
          <div className="menu-category-jump">
            {menuSections.map((section) => (
              <a href={`#menu-${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </div>
          <div className="menu-stack editable-menu-stack">
            {menuSections.map((section) => (
              <article className="menu-section editable-menu-section" id={`menu-${section.id}`} key={section.id}>
                <div className="menu-section-header">
                  <div>
                    <span className="badge">Generated block</span>
                    <h3>{section.title}</h3>
                    <p>{section.note}</p>
                    <small>{section.editableNote}</small>
                  </div>
                </div>
                <div className="menu-items">
                  {section.items.map((item) => (
                    <div className="menu-item" key={item.name}>
                      <div>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <strong>{item.price}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="videos" className="section media-section">
        <div className="container">
          <span className="badge">BOSSA YouTube Channel</span>
          <h2>Watch the fire before you order.</h2>
          <p>Use videos as trust proof for fire, smoke, island flavor, and the BOSSA story in motion.</p>
          <div className="grid video-grid">
            {youtubeVideos.map((video) => (
              <article className="video-card" key={video.embedUrl}>
                <div className="video-frame">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <h3>{video.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="party" className="section">
        <div className="container split">
          <div>
            <span className="badge">Party / Events</span>
            <h2>Group orders, private fire moments, and future rooftop events.</h2>
            <p>
              Party orders use the same BOSSA fire system: boxes, classics, skewers, sandwiches, sides,
              soups, and event-ready quote requests through WhatsApp.
            </p>
            <div className="cta-row">
              <a className="button primary" href="/party-menu">Open Party / Events page</a>
              <a className="button" href={partyUrl} target="_blank" rel="noreferrer">Request quote</a>
            </div>
          </div>
          <img
            src="/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png"
            alt="BOSSA Seafood Coming Soon event visual"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </section>

      <section id="location" className="section media-section">
        <div className="container split">
          <div>
            <span className="badge">Come to the fire</span>
            <h2>{siteConfig.address.replace(', Curaçao', '')}</h2>
            <p>
              BOSSA is positioned for local lunch, dinner, weekend boxes, and visitors around Avila Hotel and Pietermaai.
            </p>
            <div className="cta-row">
              <a className="button primary" href={orderUrl} target="_blank" rel="noreferrer">WhatsApp BOSSA</a>
              <a className="button" href="https://www.google.com/maps/search/?api=1&query=Oranjestraat%20116%20Pietermaai%20Willemstad%20Curacao" target="_blank" rel="noreferrer">Open Google Maps</a>
            </div>
          </div>
          <div className="info-card">
            <h3>Quick info</h3>
            <p>📍 Opposite Avila Hotel / Pietermaai area</p>
            <p>🔥 Wood fire & charcoal only</p>
            <p>📞 +5999 523 0683</p>
            <p>⏱️ {siteConfig.hours}</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/images/bossa/bossa-logo-fire-gold.svg" alt={`${siteConfig.brandName} logo`} className="footer-logo" />
            <div>
              <strong>{siteConfig.brandName}</strong>
              <p>{siteConfig.address}</p>
              <p>#BossaAsado · #WeekendFireGrill · #KandelaDushi</p>
            </div>
          </div>
          <div>
            <p>WhatsApp: +5999 523 0683</p>
            <p>Open {siteConfig.hours}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
