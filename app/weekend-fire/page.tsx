const whatsappNumber = '59995230683';
const baseWhatsappUrl = `https://wa.me/${whatsappNumber}`;
const generalOrderMessage = encodeURIComponent(
  'Bon dia BOSSA, Weekend Fire! Please confirm what boxes are available today. Name: ___ Pickup time: ___ Box number: ___ Quantity: ___'
);
const whatsappUrl = `${baseWhatsappUrl}?text=${generalOrderMessage}`;

const buildBoxOrderUrl = (boxNumber: string, boxName: string) => {
  const message = encodeURIComponent(
    `Bon dia BOSSA, I want to order ${boxNumber} — ${boxName}. Name: ___ Pickup time: ___ Quantity: ___`
  );

  return `${baseWhatsappUrl}?text=${message}`;
};

const buildSeaSpecialUrl = (specialName: string) => {
  const message = encodeURIComponent(
    `Bon dia BOSSA, I want info about the Weekend Fire & Sea Special: ${specialName}. Name: ___ Date: ___ Pickup/time: ___ Quantity: ___`
  );

  return `${baseWhatsappUrl}?text=${message}`;
};

const stripePlaceholderUrl = '#stripe-links-coming-soon';

const fireBoxes = [
  {
    number: '#1',
    name: 'Bossa Box Mix',
    price: 'ANG 49.50',
    tag: 'Featured Box',
    description:
      '4 piece chicken, 1 full ribs, 1 chorizo, salad, baked potato, and bread. Built as the featured Weekend Fire sharing box.',
    bullets: ['4 piece chicken', '1 full ribs', '1 chorizo', 'Salad, baked potato, and bread'],
  },
  {
    number: '#2',
    name: 'Tenderloin & Chicken Skewer Box',
    price: 'ANG 49.50',
    tag: 'Skewer Box',
    description:
      '1 tenderloin skewer with onion and pepper, 1 chicken skewer with onion and pepper, 1 side, and small bread.',
    bullets: ['1 tenderloin skewer with onion and pepper', '1 chicken skewer with onion and pepper', 'Choice of 1 side', 'Small bread included'],
  },
  {
    number: '#3',
    name: 'Fire Bread Sandwich Box',
    price: 'ANG 49.50',
    tag: 'Sandwich Box',
    description:
      'A sandwich box for sharing: choose chicken sandwich or chicken salad sandwich, plus pork, chorizo, and stew beef or tongue sandwich.',
    bullets: ['1 chicken sandwich or chicken salad sandwich', '1 pork sandwich', '1 chorizo sandwich', '1 stew beef sandwich or tongue sandwich'],
  },
  {
    number: '#4',
    name: 'Community Fire Box',
    price: 'ANG 20.00',
    tag: 'Value Box',
    description:
      '4 chicken pieces, one side, small fire bread, and BOSSA JUS. Built for speed, value, and weekend volume.',
    bullets: ['Choice of one side', 'No drink included', 'No modifications', 'Limited daily batches'],
  },
  {
    number: '#5',
    name: 'Chicken Classic',
    price: 'ANG 49.50',
    tag: 'Family Chicken',
    description:
      '8 chicken pieces, 2 sides, fire bread, and BOSSA JUS. Family-style and margin-friendly.',
    bullets: ['Take-out only', '2 sides included', 'Fire bread included', 'While stock lasts'],
  },
  {
    number: '#6',
    name: 'Ribs Classic',
    price: 'ANG 49.50',
    tag: 'Ribs Box',
    description:
      '2 whole ribs portions, 2 sides, fire glaze, and fire bread. Slow smoke, fast handoff.',
    bullets: ['Fire glaze', '2 sides included', 'Fire bread included', 'Limited daily batches'],
  },
  {
    number: '#7',
    name: 'Beach Box Daily Special',
    price: 'ANG 99.50',
    tag: 'Daily Special Slot',
    isFeatured: true,
    description:
      'Family-style beach box with 1/2 whole chicken, 1 whole ribs, 1 chorizo, 1 tenderloin skewer with paprika and onion, 1 chicken skewer with pepper and onion, 2 baked potatoes, and 1 bread.',
    bullets: [
      '1/2 whole chicken',
      '1 whole ribs',
      '1 chorizo',
      '1 tenderloin skewer with paprika and onion',
      '1 chicken skewer with pepper and onion',
      '2 baked potatoes and 1 bread',
    ],
  },
  {
    number: '#8',
    name: 'Local Fire Box',
    price: 'ANG 39.50',
    tag: 'Local Value Box',
    isLocal: true,
    description:
      'Local-style fire box with 1 porkchop, 1 fillet galina, 1 whole leg chicken piece, 1 chorizo, 1 bread, and 1 baked potato.',
    bullets: [
      '1 porkchop',
      '1 fillet galina',
      '1 whole leg chicken piece: 1 drumstick and 1 thigh',
      '1 chorizo',
      '1 bread and 1 baked potato',
    ],
  },
];

const seaSpecials = [
  {
    name: 'Grilled Fish Fire Box',
    price: 'Coming soon',
    image: '/images/bossa/sea-specials/grilled-fish-fire-box.svg',
    description: 'Fresh fish from the fire with side, salad, bread, and BOSSA sauce. Final fish depends on daily catch.',
  },
  {
    name: 'Shrimp Fire Box',
    price: 'Coming soon',
    image: '/images/bossa/sea-specials/shrimp-fire-box.svg',
    description: 'Grilled shrimp or shrimp skewers with fire seasoning, sides, and garlic-style sauce.',
  },
  {
    name: 'Lobster Fire Special',
    price: 'Coming soon',
    image: '/images/bossa/sea-specials/lobster-fire-special.svg',
    description: 'Limited lobster from the fire. Built for sunset orders, premium guests, and special weekends.',
  },
  {
    name: 'Mixed Seafood Fire Platter',
    price: 'Coming soon',
    image: '/images/bossa/sea-specials/mixed-seafood-fire-platter.svg',
    description: 'A mixed seafood fire platter with fish, shrimp, lobster option, sides, and island sauces.',
  },
  {
    name: 'Sunset Cocktail Offer',
    price: 'Coming soon',
    image: '/images/bossa/sea-specials/sunset-cocktail-offer.svg',
    description: 'Limited sunset cocktail pairing for seafood specials. Built for weekend atmosphere and terrace energy.',
  },
];

const sides = [
  ['Oven baked potato', 'ANG 6.00'],
  ['Boiled cassava', 'ANG 6.00'],
  ['Fresh salad', 'ANG 10.00'],
  ['Fire bread', 'ANG 4.00'],
];

const pickupSteps = [
  'Choose your box number from #1 to #8.',
  'Tap the order button or send WhatsApp with your name, pickup time, box number, and quantity.',
  'BOSSA confirms what is still available from the fire batch.',
  'Pickup fast. Eat hot. Come early before sold out.',
];

const youtubeVideos = [
  {
    title: 'BOSSA Asado i Mar — Fire & Flavor Video',
    embedUrl: 'https://www.youtube.com/embed/fin2x52-A6Y',
  },
  {
    title: 'BOSSA Asado i Mar — Weekend Fire Video',
    embedUrl: 'https://www.youtube.com/embed/wxO63r9nkHs',
  },
];

export default function WeekendFirePage() {
  return (
    <main className="weekend-fire-page">
      <header className="container nav">
        <a className="brand" href="/" aria-label="BOSSA Asado i Mar home">
          BOSSA ASADO I MAR
        </a>
        <nav className="nav-links" aria-label="Weekend Fire navigation">
          <a href="/">Home</a>
          <a href="#boxes">Boxes</a>
          <a href="#sea-specials">Fire & Sea</a>
          <a href="#specials">Specials</a>
          <a href="#audio">Audio</a>
          <a href="#videos">Videos</a>
          <a href="#pickup">Pickup Flow</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Order
          </a>
        </nav>
      </header>

      <section className="container hero weekend-hero">
        <span className="badge">Weekend Fire · Take-out only</span>
        <h1>Order by box number. Pickup fast. Eat hot.</h1>
        <p className="lead">
          Weekend Fire is BOSSA’s take-out ritual: numbered fire boxes, Bossa Box Mix, skewer boxes,
          sandwich boxes, Beach Box daily special, Local Fire Box, fast flow, limited batches, and no overpromising.
        </p>
        <div className="cta-row">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Order on WhatsApp
          </a>
          <a className="button" href="#boxes">
            View Box #1–#8
          </a>
          <a className="button" href="#sea-specials">
            Fire & Sea Coming Soon
          </a>
        </div>
      </section>

      <section id="sea-specials" className="section media-section sea-specials-section">
        <div className="container">
          <span className="badge">Coming Soon</span>
          <h2>Weekend Fire & Sea Specials</h2>
          <p>
            Grilled fish, shrimp, lobster, and mixed seafood from the fire — paired with a limited sunset cocktail offer.
            Stripe payment links and final product photos will be added after the weekend setup is ready.
          </p>
          <div className="grid sea-specials-grid">
            {seaSpecials.map((special) => (
              <article className="card sea-special-card" key={special.name}>
                <img src={special.image} alt={`${special.name} coming soon`} />
                <div className="sea-special-content">
                  <span className="badge">Coming soon</span>
                  <h3>{special.name}</h3>
                  <strong className="price-line">{special.price}</strong>
                  <p>{special.description}</p>
                  <div className="sea-special-actions">
                    <a className="button primary" href={buildSeaSpecialUrl(special.name)} target="_blank" rel="noreferrer">
                      Confirm on WhatsApp
                    </a>
                    <a className="button disabled-payment" href={stripePlaceholderUrl} aria-disabled="true">
                      Stripe link coming soon
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div id="stripe-links-coming-soon" className="info-card stripe-coming-soon-card">
            <h3>Stripe payment links coming this weekend</h3>
            <p>
              Planned links: Weekend Fire & Sea Deposit, Seafood Grill Box, and Sunset Seafood Special. After the links are created,
              these cards will switch from “coming soon” to live Pay / Deposit buttons.
            </p>
          </div>
        </div>
      </section>

      <section id="audio" className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Weekend Fire Sound</span>
            <h2>Let guests hear the BOSSA mood before they order.</h2>
            <p>
              This audio block gives Weekend Fire its own brand feeling: Papiamentu, smoke, island energy, and box pickup rhythm.
            </p>
          </div>
          <div className="info-card audio-card">
            <h3>Sabor di BOSSA — Papiamentu</h3>
            <audio controls preload="metadata">
              <source src="/audio/bossa/sabor-di-bossa-papiamentu.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p>Play this while choosing Box #1–#8.</p>
          </div>
        </div>
      </section>

      <section id="specials" className="section media-section">
        <div className="container grid weekend-highlight-grid">
          <article className="info-card special-card">
            <span className="badge">Daily Special Slot</span>
            <h2>Box #7 — Beach Box</h2>
            <strong className="price-line">ANG 99.50</strong>
            <p>
              The family-style box for beach days, groups, and heavy appetite. This is the box we can rotate later as the daily special.
            </p>
            <a className="button primary" href={buildBoxOrderUrl('#7', 'Beach Box Daily Special')} target="_blank" rel="noreferrer">
              Order Box #7
            </a>
          </article>

          <article className="info-card local-card">
            <span className="badge">Local Value Box</span>
            <h2>Box #8 — Local Fire Box</h2>
            <strong className="price-line">ANG 39.50</strong>
            <p>
              Porkchop, fillet galina, whole leg chicken piece, chorizo, bread, and baked potato. Built for local value and fast pickup.
            </p>
            <a className="button primary" href={buildBoxOrderUrl('#8', 'Local Fire Box')} target="_blank" rel="noreferrer">
              Order Box #8
            </a>
          </article>
        </div>
      </section>

      <section className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Weekend Fire Visual</span>
            <h2>Smoke, ribs, skewers, sandwiches, Beach Box, Local Box, and fast pickup energy.</h2>
            <p>
              This campaign is built for limited numbered boxes, clear ordering, daily specials, and strong weekend food visuals.
            </p>
          </div>
          <img
            src="/images/bossa/bbq-party-del-rey.jpg"
            alt="BBQ Party Del Rey weekend fire menu"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </section>

      <section id="boxes" className="section">
        <div className="container">
          <span className="badge">Active Weekend Menu</span>
          <h2>Fire box menu.</h2>
          <p>
            Order by box number. Box #7 is the Beach Box Daily Special. Box #8 is the Local Fire Box.
            Simple boxes. Fast flow. Fire decides the rhythm.
          </p>

          <div className="grid weekend-grid box-card-grid">
            {fireBoxes.map((box) => (
              <article
                className={`card tall-card box-card ${box.isFeatured ? 'featured-box-card' : ''} ${box.isLocal ? 'local-box-card' : ''}`}
                key={box.number}
              >
                <div className="box-card-top">
                  <span className="box-number">Box {box.number}</span>
                  <span className="box-tag">{box.tag}</span>
                </div>
                <h3>{box.name}</h3>
                <strong className="price-line">{box.price}</strong>
                <p>{box.description}</p>
                <ul>
                  {box.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <a className="button primary box-order-button" href={buildBoxOrderUrl(box.number, box.name)} target="_blank" rel="noreferrer">
                  Order Box {box.number}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="videos" className="section media-section">
        <div className="container">
          <span className="badge">BOSSA YouTube Channel</span>
          <h2>Watch the fire before you order.</h2>
          <p>
            Use the videos as trust proof: food, smoke, island energy, and the real BOSSA story in motion.
          </p>
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

      <section className="section">
        <div className="container split">
          <div>
            <span className="badge">Signature Ribs</span>
            <h2>Weekend Fire ribs, ready for the box.</h2>
            <p>
              Slow-smoked, glazed, and packed with sides. This is the visual anchor for Weekend Fire.
            </p>
          </div>
          <img
            src="/images/bossa/ribs-bossa.png"
            alt="BOSSA fire ribs box"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="badge">Sides</span>
            <h2>Add-ons that keep the flow clean.</h2>
            <p>
              Keep the take-out system simple: one box number, one label, sealed BOSSA JUS, bread on top, fast handoff.
            </p>
          </div>
          <div className="hours-card">
            {sides.map(([name, price]) => (
              <div key={name}>
                <strong>{name}</strong>
                <span>{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="section">
        <div className="container split">
          <div>
            <span className="badge">Operational rules</span>
            <h2>No noise. Just heat.</h2>
            <p>These rules protect speed, consistency, and guest expectations during the weekend rush.</p>
          </div>
          <div className="info-card">
            <h3>Non-negotiables</h3>
            <ul>
              <li>Take-out only</li>
              <li>No delivery</li>
              <li>No modifications during rush</li>
              <li>Limited daily batches</li>
              <li>Order by box number before sold out</li>
              <li>Box #7 can rotate as the daily special</li>
              <li>Box #8 is the local-value box</li>
              <li>When the fire rests — we close</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="pickup" className="section media-section final-weekend-fire-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Pickup flow</span>
            <h2>Order by number. Pickup fast. Eat hot.</h2>
            <p>
              Weekend Fire works best when the order is clear before the rush starts. Send WhatsApp with the box number,
              confirm availability, and pick up while the box is still hot from the fire.
            </p>
            <div className="cta-row">
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                Order before sold out
              </a>
            </div>
          </div>
          <div className="info-card">
            <h3>How pickup works</h3>
            <ol>
              {pickupSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer className="footer weekend-fire-footer">
        <div className="container footer-grid">
          <div>
            <strong>BOSSA Weekend Fire</strong>
            <p>New Nederland Nuyesweg 116 · Pietermaai Area · Willemstad, Curaçao</p>
          </div>
          <div>
            <p>WhatsApp: +5999 523 0683</p>
            <p>Weekend Fire: Thursday–Sunday · 12:00 PM–10:00 PM</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
