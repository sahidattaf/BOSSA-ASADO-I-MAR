import LiveFireStatus from './components/LiveFireStatus';
import PublicHeader from './components/PublicHeader';
import SiteFooter from './components/SiteFooter';
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

const orderCards = [
  {
    title: 'Order Weekend Fire',
    text: 'Choose a numbered box, send pickup time and quantity, then BOSSA confirms what is still available from the fire.',
    cta: 'Order boxes',
    href: weekendUrl,
    trackLabel: 'order-card-weekend',
    offerId: '',
  },
  {
    title: 'Reserve a table',
    text: 'For dine-in or terrace energy, send name, date, time, party size, and special notes through WhatsApp.',
    cta: 'Reserve now',
    href: reservationUrl,
    trackLabel: 'order-card-reservation',
    offerId: '',
  },
  {
    title: 'Plan catering or private event',
    text: 'For villas, birthdays, office orders, rooftop nights, tourist groups, and private fire moments, request a quote ahead of time.',
    cta: 'Request quote',
    href: '/catering',
    trackLabel: 'order-card-party',
    offerId: '',
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
      <PublicHeader />

      <section id="top" className="container hero brand-hero premium-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <LiveFireStatus />
            <span className="badge">Pietermaai · Opposite Avila Hotel · Curaçao</span>
            <h1>Fire. Flavor. Ocean.</h1>
            <p className="lead">
              Wood-fire dining with Caribbean soul in Pietermaai, Curaçao. Order Weekend Fire Boxes,
              reserve a table, or plan your private fire-grill event.
            </p>
            <div className="cta-row">
              <a className="button primary" href={orderUrl} target="_blank" rel="noreferrer"
                data-track="whatsapp-click" data-cta-source="home" data-cta-label="hero-order" data-offer-id="">
                Order on WhatsApp
              </a>
              <a className="button" href="/weekend-fire">Weekend Fire Boxes</a>
              <a className="button" href="/catering">Catering</a>
              <a className="button" href="/menu">View menu</a>
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
          <h2>One website. Clear revenue paths.</h2>
          <p>Guests should never wonder what to do next: order boxes, reserve, request catering, plan private events, or book tourist experiences.</p>
          <div className="grid" style={{ marginTop: '24px' }}>
            {orderCards.map((card) => (
              <article className="card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <a
                  className="button primary"
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                  data-track="whatsapp-click"
                  data-cta-source="home"
                  data-cta-label={card.trackLabel}
                  data-offer-id={card.offerId}
                >
                  {card.cta}
                </a>
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
              BOSSA Weekend Fire is the fast order path: numbered boxes, clear pickup timing,
              and WhatsApp confirmation before the batch sells out.
            </p>
            <div className="cta-row">
              <a className="button primary" href="/weekend-fire">Open Weekend Fire page</a>
              <a className="button" href={weekendUrl} target="_blank" rel="noreferrer"
                data-track="whatsapp-click" data-cta-source="home" data-cta-label="promo-weekend-order" data-offer-id="">
                Order boxes
              </a>
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
          <h2>Signature menu direction.</h2>
          <p>
            Ribs, skewers, sandwiches, sides, sauces, fire boxes, and Caribbean grill favorites.
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
                  {section.items.map((item: (typeof menuSections)[number]['items'][number]) => (
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
            <span className="badge">Catering · Private Events · Tourist Experiences</span>
            <h2>More than food orders: BOSSA is a hospitality platform.</h2>
            <p>
              Turn villas, birthdays, offices, hotels, yacht groups, and tourist nights into clear
              fire-grill revenue paths with simple WhatsApp quote flows.
            </p>
            <div className="cta-row">
              <a className="button primary" href="/catering">Catering</a>
              <a className="button" href="/private-events">Private Events</a>
              <a className="button" href="/tourist-experiences">Tourist Experiences</a>
              <a className="button" href={partyUrl} target="_blank" rel="noreferrer"
                data-track="whatsapp-click" data-cta-source="home" data-cta-label="promo-party-quote" data-offer-id="">
                Request quote
              </a>
            </div>
          </div>
          <img
            src="/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png"
            alt="BOSSA Seafood Coming Soon event visual"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </section>

      <section className="section premium-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="badge">BOSSA V2</span>
              <h2>Choose the intent. BOSSA handles the flow.</h2>
            </div>
            <p>Every major customer path now has a dedicated page, SEO metadata, and WhatsApp CTA.</p>
          </div>
          <div className="grid signature-grid">
            {[
              ['Rooftop Lounge', '/rooftop-lounge', 'Sunset, fire, music, and private group energy.'],
              ['Gallery', '/gallery', 'Food, fire, rooftop, events, and behind-the-scenes visuals.'],
              ['Partners', '/partners', 'Hotels, Airbnb hosts, villa managers, tour operators, and yacht charters.'],
            ].map(([title, href, text]) => (
              <article className="card signature-card" key={href}>
                <h3>{title}</h3>
                <p>{text}</p>
                <a className="button" href={href}>Open page</a>
              </article>
            ))}
          </div>
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
              <a className="button primary" href={orderUrl} target="_blank" rel="noreferrer"
                data-track="whatsapp-click" data-cta-source="home" data-cta-label="location-order" data-offer-id="">
                WhatsApp BOSSA
              </a>
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

      <SiteFooter />
    </main>
  );
}
