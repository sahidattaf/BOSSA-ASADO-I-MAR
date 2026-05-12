const whatsappNumber = '59995230683';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

const fireBoxes = [
  {
    name: 'Community Fire Box',
    price: 'ANG 20.00',
    description: '4 chicken pieces, one side, small fire bread, and BOSSA JUS. Built for speed, value, and weekend volume.',
    bullets: ['Choice of one side', 'No drink included', 'No modifications', 'Limited daily batches'],
  },
  {
    name: 'Chicken Classic',
    price: 'ANG 49.50',
    description: '8 chicken pieces, 2 sides, fire bread, and BOSSA JUS. Family-style and margin-friendly.',
    bullets: ['Take-out only', '2 sides included', 'Fire bread included', 'While stock lasts'],
  },
  {
    name: 'Ribs Classic',
    price: 'ANG 49.50',
    description: '2 whole ribs portions, 2 sides, fire glaze, and fire bread. Slow smoke, fast handoff.',
    bullets: ['Fire glaze', '2 sides included', 'Fire bread included', 'Limited daily batches'],
  },
];

const sides = [
  ['Oven baked potato', 'ANG 6.00'],
  ['Boiled cassava', 'ANG 6.00'],
  ['Fresh salad', 'ANG 10.00'],
  ['Fire bread', 'ANG 4.00'],
];

const videoShots = [
  'Fire close-up: embers, smoke, grill sound',
  'Chicken skin crisping on the fire',
  'BOSSA JUS pour into the box',
  'Side scoop: potato, cassava, or salad',
  'Fire bread stack and box close',
  'Handoff / pickup moment',
  'End card: Fri–Sun, 11:00 AM until fire rests',
];

export default function WeekendFirePage() {
  return (
    <main>
      <header className="container nav">
        <a className="brand" href="/" aria-label="BOSSA Asado i Mar home">
          BOSSA ASADO I MAR
        </a>
        <nav className="nav-links" aria-label="Weekend Fire navigation">
          <a href="/">Home</a>
          <a href="#boxes">Boxes</a>
          <a href="#rules">Rules</a>
          <a href="#video">Marketing Video</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Order</a>
        </nav>
      </header>

      <section className="container hero">
        <span className="badge">Weekend Fire · Take-out only</span>
        <h1>Limited fire boxes. Friday, Saturday, Sunday — until the fire rests.</h1>
        <p className="lead">
          Weekend Fire is BOSSA’s take-out ritual: simple boxes, fast flow, limited batches, and no overpromising.
          Community first, fire-led, built for speed, consistency, and volume.
        </p>
        <div className="cta-row">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Order on WhatsApp
          </a>
          <a className="button" href="#boxes">View fire boxes</a>
        </div>
      </section>

      <section id="boxes" className="section">
        <div className="container">
          <span className="badge">Active Weekend Menu</span>
          <h2>Fire box menu.</h2>
          <p>Simple boxes. Fast flow. Fire decides the rhythm. No mods. Limited batches.</p>
          <div className="grid weekend-grid">
            {fireBoxes.map((box) => (
              <article className="card tall-card" key={box.name}>
                <h3>{box.name}</h3>
                <strong className="price-line">{box.price}</strong>
                <p>{box.description}</p>
                <ul>
                  {box.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="badge">Sides</span>
            <h2>Add-ons that keep the flow clean.</h2>
            <p>Keep the take-out system simple: one box, one label, sealed BOSSA JUS, fire bread on top, fast handoff.</p>
          </div>
          <div className="hours-card">
            {sides.map(([name, price]) => (
              <>
                <strong key={`${name}-name`}>{name}</strong>
                <span key={`${name}-price`}>{price}</span>
              </>
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
              <li>No reservations</li>
              <li>No delivery</li>
              <li>No modifications</li>
              <li>Limited daily batches</li>
              <li>When the fire rests — we close</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="video" className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Marketing video ready</span>
            <h2>15–25 second Weekend Fire Reel.</h2>
            <p>
              Use this video direction for Instagram, TikTok, and WhatsApp broadcast. Hook fast, show proof, highlight one box,
              and close with the ordering CTA.
            </p>
            <div className="cta-row">
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Order before sold out</a>
            </div>
          </div>
          <div className="info-card">
            <h3>Shot checklist</h3>
            <ul>
              {videoShots.map((shot) => <li key={shot}>{shot}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="badge">Public CTA copy</span>
          <h2>Weekend Fire is back.</h2>
          <p className="lead">
            Limited take-out boxes built around BOSSA’s fire experience. Order via WhatsApp and come early — when the fire rests, we close.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>BOSSA Weekend Fire</strong>
            <p>New Nederland Nuyesweg 116 · Pietermaai Area · Willemstad, Curaçao</p>
          </div>
          <div>
            <p>WhatsApp: +5999 523 0683</p>
            <p>Weekend Fire: Friday–Sunday · 11:00 AM until fire rests</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
