import { paymentDisclaimer, paymentLinks } from '../data/payments';

const whatsappNumber = '59995230683';
const baseWhatsappUrl = `https://wa.me/${whatsappNumber}`;

const buildBoxOrderUrl = (boxNumber: string, boxName: string) => {
  const message = encodeURIComponent(
    `Bon dia BOSSA, I want to order ${boxNumber} — ${boxName}. Name: ___ Pickup time: ___ Quantity: ___`
  );
  return `${baseWhatsappUrl}?text=${message}`;
};

const generalOrderMessage = encodeURIComponent(
  'Bon dia BOSSA, Weekend Fire! Please confirm what boxes are available today. Name: ___ Pickup time: ___ Box number: ___ Quantity: ___'
);
const whatsappUrl = `${baseWhatsappUrl}?text=${generalOrderMessage}`;

const fireBoxes = [
  ['#1', 'BOSSA Box Mix', 'XCG 49.50', 'Featured sharing box', '/images/bossa/weekend-fire/box-1-bossa-box-mix.png', 'Fire-roasted 1 pc chicken whole legs + 1/2 ribs + 1 chorizo + 1 porkchop + garlic bread + garlic sauce.'],
  ['#2', 'Skewer Box', 'XCG 49.50', 'High-margin fire skewers', '/images/bossa/weekend-fire/box-2-skewer-box.png', 'Tenderloin skewer + chicken skewer + garlic sauce + garlic bread.'],
  ['#3', 'Fire Bread Sandwich Box', 'XCG 49.50', 'Fire Bread variety', '/images/bossa/weekend-fire/box-3-fire-bread-sandwich-box.png', '#9 chicken salad 12 · #10 whole legs 12 · #11 chicken boneless 12 · #12 porkchop 12 · #13 chorizo 12 · #14 grilled steak / stew 15 · #15 tenderloin 20.'],
  ['#4', 'Community Fire Box', 'XCG 19.50', 'Built for speed & volume', '/images/bossa/weekend-fire/box-4-community-fire-box.png', '4 chicken pieces + bread + garlic sauce + baked potato.'],
  ['#5', 'Chicken Classic', 'XCG 49.50', 'Family-style fire meal', '/images/bossa/weekend-fire/box-5-chicken-classic.png', 'Whole fire-roasted chicken or 8 pc roast/grill chicken with 2 sides.'],
  ['#6', 'Ribs Classic', 'XCG 49.50', 'Slow smoke · fast handoff', '/images/bossa/weekend-fire/box-6-ribs-classic.png', 'Slow-smoked ribs: 2 full ribs + garlic sauce + bread.'],
  ['#7', 'SEA BOX Coming Soon', 'XCG 99.50', 'Heavy appetite special', '/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png', 'Mixed grill and seafood platter with catch-of-the-day skewer, tenderloin skewer, and 2 sides.'],
  ['#8', 'Local Fire Box', 'XCG 6+', 'Local pickup favorite', '/images/bossa/weekend-fire/box-8-local-fire-box.png', 'Fresh salad, seaweed, hummus, garlic bread/pita, baked potato, cassava, chorizo, boiled peanuts, and beer options.'],
];

const pickupSteps = [
  'Choose your box number from #1 to #8.',
  'Send WhatsApp with your name, pickup time, box number, and quantity.',
  'BOSSA confirms what is still available from the fire batch.',
  'Pickup fast. Eat hot. Come early before sold out.',
];

const youtubeVideos = [
  { title: 'BOSSA Asado i Mar — Fire & Flavor Video', embedUrl: 'https://www.youtube.com/embed/fin2x52-A6Y' },
  { title: 'BOSSA Asado i Mar — Weekend Fire Video', embedUrl: 'https://www.youtube.com/embed/wxO63r9nkHs' },
];

export default function WeekendFirePage() {
  return (
    <main className="weekend-fire-page">
      <header className="container nav">
        <a className="brand brand-lockup" href="/" aria-label="BOSSA Asado i Mar home">
          <img src="/images/bossa/bossa-logo-fire-gold.svg" alt="" className="brand-logo" />
          <span>BOSSA ASADO I MAR</span>
        </a>
        <nav className="nav-links" aria-label="Weekend Fire navigation">
          <a href="/">Home</a>
          <a href="#boxes">Boxes</a>
          <a href="#audio">Audio</a>
          <a href="#videos">Videos</a>
          <a href="#pickup">Pickup Flow</a>
          <a href="/weekend-fire/customize">Customizer</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Order</a>
        </nav>
      </header>

      <section className="container hero weekend-hero">
        <span className="badge">Weekend Fire · Take-out only</span>
        <h1>Order by box number. Pickup fast. Eat hot.</h1>
        <p className="lead">
          Weekend Fire is BOSSA’s take-out ritual: numbered boxes, final flyer assets, audio, video,
          WhatsApp ordering, PNG/PDF/offline HTML export, and limited batches from Thursday to Sunday.
        </p>
        <div className="cta-row">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Confirm on WhatsApp</a>
          <a className="button" href={paymentLinks.weekendDeposit.href} target="_blank" rel="noreferrer">{paymentLinks.weekendDeposit.label}</a>
          <a className="button" href="#boxes">View Box #1–#8</a>
          <a className="button" href="/weekend-fire/customize">Open flyer customizer</a>
        </div>
        <p className="payment-note">{paymentDisclaimer} Test link: {paymentLinks.weekendDeposit.amount}.</p>
      </section>

      <section id="audio" className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Weekend Fire Sound</span>
            <h2>Let guests hear the BOSSA mood before they order.</h2>
            <p>This audio block gives Weekend Fire its own Papiamentu fire, smoke, and island rhythm.</p>
          </div>
          <div className="info-card audio-card">
            <h3>Sabor di BOSSA — Papiamentu</h3>
            <audio controls preload="metadata">
              <source src="/audio/bossa/sabor-di-bossa-papiamentu.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </section>

      <section className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Final Weekend Flyer</span>
            <h2>Edit once. Export PNG, PDF, or offline HTML.</h2>
            <p>The customizer keeps the flyer editable and exportable for WhatsApp, Instagram, Canva, and print.</p>
            <div className="cta-row">
              <a className="button primary" href="/weekend-fire/customize">Open customizer</a>
              <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Order before sold out</a>
            </div>
          </div>
          <img src="/images/bossa/weekend-fire/box-1-bossa-box-mix.png" alt="BOSSA Weekend Fire final box visual" style={{ width: '100%', borderRadius: '12px' }} />
        </div>
      </section>

      <section id="boxes" className="section">
        <div className="container">
          <span className="badge">Active Weekend Menu</span>
          <h2>Fire box menu.</h2>
          <p>Simple boxes. Fast flow. Fire decides the rhythm.</p>
          <div className="grid weekend-grid box-card-grid">
            {fireBoxes.map(([number, name, price, tag, image, description]) => (
              <article className="card tall-card box-card" key={number}>
                <img src={image} alt={`${name} visual`} style={{ width: '100%', borderRadius: '14px', marginBottom: '14px' }} />
                <div className="box-card-top">
                  <span className="box-number">Box {number}</span>
                  <span className="box-tag">{tag}</span>
                </div>
                <h3>{name}</h3>
                <strong className="price-line">{price}</strong>
                <p>{description}</p>
                <a className="button primary box-order-button" href={buildBoxOrderUrl(number, name)} target="_blank" rel="noreferrer">Order Box {number}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container info-card" style={{ textAlign: 'center' }}>
          <span className="badge">Deposit option</span>
          <h2>Reserve Weekend Fire capacity after confirmation.</h2>
          <p>{paymentLinks.weekendDeposit.note}</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Confirm availability first</a>
            <a className="button" href={paymentLinks.weekendDeposit.href} target="_blank" rel="noreferrer">{paymentLinks.weekendDeposit.label}</a>
          </div>
          <p className="payment-note">{paymentLinks.weekendDeposit.amount}. Test-mode Stripe link for preview only.</p>
        </div>
      </section>

      <section id="videos" className="section media-section">
        <div className="container">
          <span className="badge">BOSSA YouTube Channel</span>
          <h2>Watch the fire before you order.</h2>
          <div className="grid video-grid">
            {youtubeVideos.map((video) => (
              <article className="video-card" key={video.embedUrl}>
                <div className="video-frame">
                  <iframe src={video.embedUrl} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                </div>
                <h3>{video.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pickup" className="section media-section final-weekend-fire-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Pickup flow</span>
            <h2>Order by number. Pickup fast. Eat hot.</h2>
            <p>Weekend Fire works best when the order is clear before the rush starts.</p>
            <div className="cta-row">
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Order before sold out</a>
            </div>
          </div>
          <div className="info-card">
            <h3>How pickup works</h3>
            <ol>{pickupSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </div>
      </section>

      <footer className="footer weekend-fire-footer">
        <div className="container footer-grid">
          <div>
            <strong>BOSSA Weekend Fire</strong>
            <p>Oranjestraat 116 · Pietermaai · Willemstad, Curaçao</p>
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
