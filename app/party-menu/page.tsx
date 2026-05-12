const whatsappNumber = '59995230683';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

const partyPackages = [
  {
    name: 'Community Fire Party Box',
    bestFor: 'Small gatherings and casual office orders',
    price: 'From ANG 20 per box',
    description:
      'Individual fire boxes with chicken, one side, fire bread, and BOSSA JUS. Fast, clean, and easy to distribute.',
  },
  {
    name: 'Classic Fire Box Bundle',
    bestFor: 'Family orders and group take-out',
    price: 'From ANG 49.50 per classic box',
    description:
      'Chicken Classic or Ribs Classic with sides, fire bread, and BOSSA sauce. Built for sharing without slowing the fire line.',
  },
  {
    name: 'Skewer Party Platter',
    bestFor: 'Rooftop nights, birthdays, and team gatherings',
    price: 'Custom quote',
    description:
      'Chicken, beef, lamb, pork tenderloin, or shrimp skewers with sides and fire sauces. Best ordered ahead.',
  },
  {
    name: 'Fire Sandwich Tray',
    bestFor: 'Quick bites, late-night events, and content shoots',
    price: 'Custom quote',
    description:
      'Fire roast chicken, pork, beef tenderloin, and beef stew sandwiches prepared for fast service and easy pickup.',
  },
];

const orderSteps = [
  'Send WhatsApp with date, pickup time, group size, and package preference.',
  'BOSSA confirms fire capacity and recommended quantity.',
  'Final order is locked before prep starts.',
  'Boxes are labeled by name and pickup time.',
  'Pickup happens fast — when the fire rests, we close.',
];

const visualGallery = [
  {
    src: '/images/bossa/bbq-party-del-rey.jpg',
    alt: 'BOSSA BBQ Party Del Rey menu flyer',
  },
  {
    src: '/images/bossa/fire-ribs-box.png',
    alt: 'Fire ribs box presentation',
  },
  {
    src: '/images/bossa/fire-breads.png',
    alt: 'BOSSA fire breads sandwiches',
  },
  {
    src: '/images/bossa/drinks-bebidas.png',
    alt: 'BOSSA tropical drinks and bebidas',
  },
  {
    src: '/images/bossa/peanuts.png',
    alt: 'BOSSA pinda snack and peanuts',
  },
  {
    src: '/images/bossa/restaurant-design.jpg',
    alt: 'BOSSA terrace and restaurant design',
  },
];

export default function PartyMenuPage() {
  return (
    <main>
      <header className="container nav">
        <a className="brand" href="/" aria-label="BOSSA Asado i Mar home">
          BOSSA ASADO I MAR
        </a>
        <nav className="nav-links" aria-label="Party menu navigation">
          <a href="/">Home</a>
          <a href="/weekend-fire">Weekend Fire</a>
          <a href="#packages">Packages</a>
          <a href="#gallery">Visuals</a>
          <a href="#audio">Audio</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </nav>
      </header>

      <section className="container hero">
        <span className="badge">Party Menu · Group Orders · Private Fire Moments</span>
        <h1>Fire boxes, skewers, and sharing platters for groups that want BOSSA energy.</h1>
        <p className="lead">
          The party menu is for birthdays, office orders, rooftop moments, family gatherings, content shoots,
          and private fire experiences. Order ahead so the fire line stays clean and the handoff stays fast.
        </p>
        <div className="cta-row">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Request party quote
          </a>
          <a className="button" href="/weekend-fire">
            View Weekend Fire
          </a>
        </div>
      </section>

      <section className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Party visual</span>
            <h2>BBQ party energy, built for groups.</h2>
            <p>
              Use this page for family boxes, office orders, birthdays, private dining, and weekend group pickup.
            </p>
          </div>
          <img
            src="/images/bossa/bbq-party-del-rey.jpg"
            alt="BOSSA BBQ Party Del Rey flyer"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </section>

      <section id="packages" className="section">
        <div className="container">
          <span className="badge">Party packages</span>
          <h2>Choose the format. Let the fire handle the flavor.</h2>
          <p>
            These packages are built from the same BOSSA fire system: boxes, classics, skewers, sandwiches,
            soups, sides, and sauces. Final quantity depends on fire capacity and pickup timing.
          </p>

          <div className="grid weekend-grid">
            {partyPackages.map((pkg) => (
              <article className="card tall-card" key={pkg.name}>
                <h3>{pkg.name}</h3>
                <strong className="price-line">{pkg.price}</strong>
                <p>{pkg.description}</p>
                <p>
                  <strong>Best for:</strong> {pkg.bestFor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="badge">How to order</span>
            <h2>Simple request. Clean confirmation. No chaos.</h2>
            <p>
              Group orders should be locked before production starts. This protects quality, speed, and guest expectations.
            </p>
          </div>
          <div className="info-card">
            <h3>Ordering steps</h3>
            <ol>
              {orderSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="gallery" className="section media-section">
        <div className="container">
          <span className="badge">BOSSA Party Visuals</span>
          <h2>Real food. Real fire. Real BOSSA.</h2>
          <p>
            Fire-roasted meats, island drinks, fresh fire breads, peanuts, and terrace energy for your party menu.
          </p>

          <div className="grid" style={{ marginTop: '30px' }}>
            {visualGallery.map((visual) => (
              <div className="photo-card" key={visual.src}>
                <img
                  src={visual.src}
                  alt={visual.alt}
                  style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audio" className="section">
        <div className="container media-grid">
          <div>
            <span className="badge">Party music & ambiance</span>
            <h2>Audio experience</h2>
            <p>
              Let the BOSSA Asado i Mar soundtrack set the mood. This is the flavor of fire, smoke, and island soul.
            </p>
          </div>
          <div className="info-card">
            <h3>BOSSA Anthem</h3>
            <audio controls style={{ width: '100%', marginTop: '12px' }}>
              <source src="/audio/bossa/sabor-di-bossa-papiamentu.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p style={{ marginTop: '12px', fontSize: '14px' }}>
              <em>Sabor di Bossa Papiamentu</em> — fire, smoke, and island flavor.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="badge">Ready to celebrate?</span>
          <h2>Let’s make your party unforgettable.</h2>
          <p>
            Contact BOSSA on WhatsApp with your event details. We’ll confirm availability, customize your order,
            and make sure your fire experience is built around the pit.
          </p>
          <div className="cta-row">
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Request Party Quote via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>BOSSA Party Menu</strong>
            <p>New Nederland Nuyesweg 116 · Pietermaai Area · Willemstad, Curaçao</p>
          </div>
          <div>
            <p>WhatsApp: +5999 523 0683</p>
            <p>Group orders by request · Thursday–Sunday</p>
          </div>
        </div>
      </footer>
    </main>
  );
}