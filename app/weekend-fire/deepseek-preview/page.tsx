const WHATSAPP_NUMBER = '59995230683';

type FireBox = {
  number: string;
  name: string;
  description: string;
  price: string;
  image: string;
  status: 'active' | 'coming_soon';
  note: string;
};

const fireBoxes: FireBox[] = [
  {
    number: '#1',
    name: 'BOSSA Box Mix',
    description: '1 pc chicken, 1 pc porkchop, half ribs, 1 chorizo, and a little chimichurri.',
    price: 'ANG 49.50',
    image: '/images/bossa/weekend-fire/box-1-bossa-box-mix.png',
    status: 'active',
    note: 'Classic boxes. Simple boxes. Fast flow.',
  },
  {
    number: '#2',
    name: 'Skewer Box',
    description: 'Tenderloin skewer, chicken skewer, side, and small bread.',
    price: 'ANG 49.50',
    image: '/images/bossa/weekend-fire/box-2-skewer-box.png',
    status: 'active',
    note: 'High-margin fire skewers.',
  },
  {
    number: '#3',
    name: 'Fire Bread Sandwich Box',
    description: 'Chicken, pork, chorizo, and stew beef sandwiches.',
    price: 'ANG 49.50',
    image: '/images/bossa/weekend-fire/box-3-fire-bread-sandwich-box.png',
    status: 'active',
    note: 'Fire Bread variety.',
  },
  {
    number: '#4',
    name: 'Community Fire Box',
    description: '4 pc chicken, side, fire bread, and BOSSA JUS.',
    price: 'ANG 20.00',
    image: '/images/bossa/weekend-fire/box-4-community-fire-box.png',
    status: 'active',
    note: 'Built for speed and volume.',
  },
  {
    number: '#5',
    name: 'Chicken Classic',
    description: '8 pc chicken, 2 sides, fire bread, and BOSSA JUS.',
    price: 'ANG 49.50',
    image: '/images/bossa/weekend-fire/box-5-chicken-classic.png',
    status: 'active',
    note: 'Family-style fire meal.',
  },
  {
    number: '#6',
    name: 'Ribs Classic',
    description: '2 whole ribs portions, 2 sides, fire glaze, and fire bread.',
    price: 'ANG 49.50',
    image: '/images/bossa/weekend-fire/box-6-ribs-classic.png',
    status: 'active',
    note: 'Slow smoke. Fast handoff.',
  },
  {
    number: '#7',
    name: 'Sea Box — Coming Soon',
    description: 'Fresh seafood from Curaçao waters. Fire-grilled shrimp, fish, and more.',
    price: 'TBD',
    image: '/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png',
    status: 'coming_soon',
    note: 'Coming to the fire.',
  },
  {
    number: '#8',
    name: 'Local Fire Box',
    description: 'Pork chop, fillet galina, whole leg chicken, chorizo, bread, and potato.',
    price: 'ANG 39.50',
    image: '/images/bossa/weekend-fire/box-8-local-fire-box.png',
    status: 'active',
    note: 'Local pickup favorite.',
  },
];

function whatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const metadata = {
  title: 'BOSSA Weekend Fire Preview | BOSSA Asado i Mar',
  description: 'DeepSeek-inspired Weekend Fire preview route for BOSSA Asado i Mar.',
};

export default function DeepSeekWeekendFirePreviewPage() {
  return (
    <main className="preview-page">
      <a
        className="floating-wa"
        href={whatsAppUrl('Hi BOSSA! I want to order a Weekend Fire box.')}
        data-track="whatsapp-click"
        data-cta-source="deepseek-preview"
        data-cta-label="floating-whatsapp"
        aria-label="Order BOSSA Weekend Fire on WhatsApp"
      >
        💬 Order on WhatsApp
      </a>

      <header className="preview-header">
        <div className="brand">🔥 BOSSA <span>ASADO</span> i MAR</div>
        <nav>
          <a href="#menu">Weekend Fire</a>
          <a href="#rules">Rules</a>
          <a href="#location">Location</a>
        </nav>
        <a
          className="header-cta"
          href={whatsAppUrl('Hi BOSSA! I want to order Weekend Fire now.')}
          data-track="whatsapp-click"
          data-cta-source="deepseek-preview"
          data-cta-label="header-order"
          aria-label="Order BOSSA Weekend Fire on WhatsApp"
        >
          Order on WhatsApp
        </a>
      </header>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="eyebrow">Wood Fire & Caribbean Soul</p>
          <h1>BOSSA Weekend Fire</h1>
          <p className="hero-subtitle">Thursday – Sunday · 12:00 PM – 10:00 PM · Take-out only</p>
          <p className="hero-copy">
            Limited fire boxes. Smoked ribs, whole chicken, skewers, and sandwiches. Order by number.
            When the fire rests, we close.
          </p>
          <div className="hero-actions">
            <a
              className="primary-btn"
              href={whatsAppUrl('Hi BOSSA! I want to order a Weekend Fire box.')}
              data-track="whatsapp-click"
              data-cta-source="deepseek-preview"
              data-cta-label="hero-order"
              aria-label="Order BOSSA Weekend Fire on WhatsApp"
            >
              Reserve Weekend Fire
            </a>
            <a className="secondary-btn" href="#menu">View Fire Boxes</a>
          </div>
        </div>
      </section>

      <section id="menu" className="section menu-section">
        <div className="section-heading">
          <h2>Weekend Fire Boxes</h2>
          <p>Order by box number. No modifications. Limited batches.</p>
        </div>

        <div className="box-grid">
          {fireBoxes.map((box) => {
            const message = `Hi BOSSA! I want to order ${box.number} ${box.name}.`;

            return (
              <article className="fire-card" key={box.number}>
                <div className="box-number">{box.number}</div>
                <div className="image-wrap">
                  <img src={box.image} alt={box.name} />
                </div>
                <h3>{box.name}</h3>
                <p>{box.description}</p>
                <div className="card-footer">
                  <span className={box.status === 'coming_soon' ? 'price muted-price' : 'price'}>{box.price}</span>
                  {box.status === 'active' ? (
                    <a
                      href={whatsAppUrl(message)}
                      data-track="whatsapp-click"
                      data-cta-source="deepseek-preview"
                      data-cta-label="box-order"
                      data-offer-id={box.number.replace('#', 'box-')}
                      aria-label={`Order ${box.name} on WhatsApp`}
                    >
                      Order on WhatsApp
                    </a>
                  ) : (
                    <span className="soon">Soon</span>
                  )}
                </div>
                <small>{box.note}</small>
              </article>
            );
          })}
        </div>
      </section>

      <section id="rules" className="section rules-grid">
        <div className="info-card">
          <h2>Weekend Fire Rules</h2>
          <ul>
            <li>Take-out only</li>
            <li>No modifications</li>
            <li>Order by box number</li>
            <li>Limited batches</li>
            <li>WhatsApp-first ordering</li>
          </ul>
        </div>
        <div className="info-card wide">
          <h2>Operational Flow</h2>
          <div className="flow">
            <span>Click CTA</span>
            <span>WhatsApp order</span>
            <span>Confirm box</span>
            <span>Prepare fire</span>
            <span>Pickup</span>
          </div>
          <p>
            Tap WhatsApp, confirm your box, and we&apos;ll prepare it fresh for pickup.
          </p>
        </div>
      </section>

      <section id="location" className="section location-card">
        <p className="eyebrow">Pietermaai · Opposite Avila Beach Hotel</p>
        <h2>Fire, flavor, and the sea.</h2>
        <p>
          BOSSA Asado i Mar serves fire boxes for locals, tourists, hotel guests, and Pietermaai traffic.
        </p>
        <a
          className="primary-btn"
          href={whatsAppUrl('Hi BOSSA! I want directions and Weekend Fire availability.')}
          data-track="whatsapp-click"
          data-cta-source="deepseek-preview"
          data-cta-label="location-whatsapp"
          aria-label="Ask about BOSSA Weekend Fire availability on WhatsApp"
        >
          Ask Availability
        </a>
      </section>

      <style>{`
        .preview-page {
          min-height: 100vh;
          background: #0a0a0c;
          color: #fff7ed;
          font-family: Arial, sans-serif;
        }

        .preview-header {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 18px 32px;
          background: rgba(10, 10, 12, .9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(230, 126, 34, .35);
        }

        .brand {
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .brand span,
        .eyebrow,
        .box-number,
        .section-heading h2,
        .info-card h2,
        .location-card h2 {
          color: #e67e22;
        }

        nav {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        nav a,
        .header-cta,
        .secondary-btn {
          color: #fff7ed;
          text-decoration: none;
          font-weight: 800;
          font-size: 14px;
        }

        .header-cta,
        .primary-btn {
          background: #e67e22;
          color: #160b04;
          padding: 12px 18px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .floating-wa {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 30;
          background: #22c55e;
          color: white;
          padding: 14px 18px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 900;
          box-shadow: 0 18px 40px rgba(0,0,0,.4);
        }

        .hero {
          position: relative;
          min-height: 620px;
          display: grid;
          place-items: center;
          text-align: center;
          overflow: hidden;
          padding: 80px 24px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(10,10,12,.45), rgba(10,10,12,.86)),
            url('/images/bossa/hero-grill-area.png') center/cover;
          opacity: .95;
        }

        .hero-content {
          position: relative;
          max-width: 880px;
        }

        .eyebrow {
          display: inline-block;
          background: rgba(0,0,0,.5);
          border: 1px solid rgba(230, 126, 34, .35);
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        h1 {
          font-size: clamp(56px, 9vw, 118px);
          line-height: .9;
          margin: 22px 0;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .hero-subtitle {
          font-size: clamp(18px, 3vw, 28px);
          color: #ffedd5;
        }

        .hero-copy {
          color: #d6d3d1;
          font-size: 18px;
          max-width: 720px;
          margin: 22px auto 0;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 36px;
        }

        .secondary-btn {
          border: 1px solid rgba(230, 126, 34, .6);
          border-radius: 999px;
          padding: 12px 18px;
        }

        .section {
          padding: 80px 32px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .menu-section {
          max-width: none;
          background: rgba(18, 20, 26, .68);
        }

        .section-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-heading h2,
        .info-card h2,
        .location-card h2 {
          text-transform: uppercase;
          font-size: clamp(34px, 5vw, 64px);
          margin: 0 0 8px;
          letter-spacing: 1px;
        }

        .section-heading p,
        .info-card p,
        .location-card p {
          color: #d6d3d1;
          line-height: 1.7;
        }

        .box-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .fire-card,
        .info-card,
        .location-card {
          background: #0a0a0c;
          border: 1px solid rgba(230, 126, 34, .5);
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 0 18px rgba(230, 126, 34, .16);
        }

        .fire-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 26px rgba(230, 126, 34, .32);
        }

        .box-number {
          font-size: 34px;
          font-weight: 900;
        }

        .image-wrap {
          height: 160px;
          background: #1f2937;
          border-radius: 16px;
          overflow: hidden;
          margin: 14px 0;
        }

        .image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .fire-card h3 {
          margin: 0 0 8px;
          text-transform: uppercase;
          font-size: 20px;
        }

        .fire-card p {
          color: #d6d3d1;
          min-height: 64px;
          line-height: 1.5;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 12px;
        }

        .price,
        .soon {
          background: #e67e22;
          color: #160b04;
          border-radius: 999px;
          padding: 8px 12px;
          font-weight: 900;
        }

        .muted-price,
        .soon {
          background: #525252;
          color: white;
        }

        .card-footer a {
          color: #e67e22;
          text-decoration: none;
          font-weight: 900;
        }

        small {
          display: block;
          color: rgba(253, 230, 138, .75);
          margin-top: 12px;
        }

        .rules-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 24px;
        }

        .info-card ul {
          padding-left: 20px;
          line-height: 2;
        }

        .flow {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          margin: 26px 0;
        }

        .flow span {
          border: 1px solid rgba(230, 126, 34, .4);
          border-radius: 16px;
          padding: 16px;
          text-align: center;
          font-weight: 900;
        }

        .location-card {
          text-align: center;
          margin-bottom: 80px;
        }

        .location-card .primary-btn {
          margin-top: 18px;
        }

        @media (max-width: 1000px) {
          .box-grid,
          .rules-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .flow {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .preview-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .box-grid,
          .rules-grid {
            grid-template-columns: 1fr;
          }

          .image-wrap {
            height: 200px;
          }

          .section {
            padding: 52px 16px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .floating-wa {
            bottom: 16px;
            right: 16px;
            font-size: 14px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </main>
  );
}
