const whatsappNumber = '59995230683';
const orderMessage = encodeURIComponent(
  'Bon dia BOSSA, Weekend Fire! Please confirm what boxes are available today. Name: ___ Pickup time: ___ Box number: ___ Quantity: ___'
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${orderMessage}`;

const fireBoxes = [
  {
    name: 'Box #1 — Bossa Box Mix',
    price: 'ANG 49.50',
    description:
      '4 piece chicken, 1 full ribs, 1 chorizo, salad, baked potato, and bread. Built as the featured Weekend Fire sharing box.',
    bullets: ['4 piece chicken', '1 full ribs', '1 chorizo', 'Salad, baked potato, and bread'],
  },
  {
    name: 'Box #2 — Tenderloin & Chicken Skewer Box',
    price: 'ANG 49.50',
    description:
      '1 tenderloin skewer with onion and pepper, 1 chicken skewer with onion and pepper, 1 side, and small bread.',
    bullets: ['1 tenderloin skewer with onion and pepper', '1 chicken skewer with onion and pepper', 'Choice of 1 side', 'Small bread included'],
  },
  {
    name: 'Box #3 — Fire Bread Sandwich Box',
    price: 'ANG 49.50',
    description:
      'A sandwich box for sharing: choose chicken sandwich or chicken salad sandwich, plus pork, chorizo, and stew beef or tongue sandwich.',
    bullets: ['1 chicken sandwich or chicken salad sandwich', '1 pork sandwich', '1 chorizo sandwich', '1 stew beef sandwich or tongue sandwich'],
  },
  {
    name: 'Box #4 — Community Fire Box',
    price: 'ANG 20.00',
    description:
      '4 chicken pieces, one side, small fire bread, and BOSSA JUS. Built for speed, value, and weekend volume.',
    bullets: ['Choice of one side', 'No drink included', 'No modifications', 'Limited daily batches'],
  },
  {
    name: 'Box #5 — Chicken Classic',
    price: 'ANG 49.50',
    description:
      '8 chicken pieces, 2 sides, fire bread, and BOSSA JUS. Family-style and margin-friendly.',
    bullets: ['Take-out only', '2 sides included', 'Fire bread included', 'While stock lasts'],
  },
  {
    name: 'Box #6 — Ribs Classic',
    price: 'ANG 49.50',
    description:
      '2 whole ribs portions, 2 sides, fire glaze, and fire bread. Slow smoke, fast handoff.',
    bullets: ['Fire glaze', '2 sides included', 'Fire bread included', 'Limited daily batches'],
  },
  {
    name: 'Box #7 — Beach Box Daily Special',
    price: 'ANG 99.50',
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
    name: 'Box #8 — Local Fire Box',
    price: 'ANG 39.50',
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

const sides = [
  ['Oven baked potato', 'ANG 6.00'],
  ['Boiled cassava', 'ANG 6.00'],
  ['Fresh salad', 'ANG 10.00'],
  ['Fire bread', 'ANG 4.00'],
];

const pickupSteps = [
  'Send WhatsApp with your name, pickup time, box number, and quantity.',
  'BOSSA confirms what is still available from the fire batch.',
  'Your box is packed with sides, bread, sauces, and BOSSA fire flavor.',
  'Pickup fast. Eat hot. Come early before sold out.',
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
          <a href="#rules">Rules</a>
          <a href="#pickup">Pickup Flow</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Order
          </a>
        </nav>
      </header>

      <section className="container hero">
        <span className="badge">Weekend Fire · Take-out only</span>
        <h1>Limited fire boxes. Thursday through Sunday — until the fire rests.</h1>
        <p className="lead">
          Weekend Fire is BOSSA’s take-out ritual: numbered fire boxes, Bossa Box Mix, skewer boxes,
          sandwich boxes, Beach Box daily special, Local Fire Box, fast flow, limited batches, and no overpromising.
        </p>
        <div className="cta-row">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Order on WhatsApp
          </a>
          <a className="button" href="#boxes">
            View fire boxes
          </a>
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
            Order by box number. Box #1 is the Bossa Box Mix. Box #2 is the skewer box. Box #3 is the Fire Bread Sandwich Box.
            Box #7 is the Beach Box Daily Special for family-style sharing. Box #8 is the Local Fire Box. Simple boxes. Fast flow. Fire decides the rhythm.
          </p>

          <div className="grid weekend-grid">
            {fireBoxes.map((box) => (
              <article className="card tall-card" key={box.name}>
                <h3>{box.name}</h3>
                <strong className="price-line">{box.price}</strong>
                <p>{box.description}</p>
                <ul>
                  {box.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
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
