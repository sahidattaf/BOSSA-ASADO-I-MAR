const whatsappNumber = '59995230683';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const orderMessage = encodeURIComponent(
  'Bon dia BOSSA, I want to place an order. Name: ___ Pickup time: ___ Items: ___ Quantity: ___'
);
const partyMessage = encodeURIComponent(
  'Bon dia BOSSA, I want a party quote. Date: ___ Group size: ___ Pickup/event time: ___ Package preference: ___'
);
const reservationMessage = encodeURIComponent(
  'Bon dia BOSSA, I want to reserve. Name: ___ Date: ___ Time: ___ Party size: ___ Special notes: ___'
);
const weekendMessage = encodeURIComponent(
  'Bon dia BOSSA, Weekend Fire! Please confirm what boxes are available today. Name: ___ Pickup time: ___ Quantity: ___'
);

const orderUrl = `${whatsappUrl}?text=${orderMessage}`;
const partyUrl = `${whatsappUrl}?text=${partyMessage}`;
const reservationUrl = `${whatsappUrl}?text=${reservationMessage}`;
const weekendUrl = `${whatsappUrl}?text=${weekendMessage}`;

const routes = [
  ['How it Works', '#how-it-works'],
  ['Menu', '#menu'],
  ['Weekend Fire', '/weekend-fire'],
  ['Party Menu', '/party-menu'],
  ['Location', '#location'],
  ['Hours', '#hours'],
];

const conversionCards = [
  {
    title: 'Order fast on WhatsApp',
    text: 'Send your name, pickup time, and items. BOSSA confirms availability before the fire line starts packing.',
    cta: 'Start order',
    href: orderUrl,
  },
  {
    title: 'Weekend boxes are limited',
    text: 'Thursday to Sunday is built around limited fire batches: ribs, roast chicken, sides, fire bread, and BOSSA JUS.',
    cta: 'View Weekend Fire',
    href: '/weekend-fire',
  },
  {
    title: 'Party orders by request',
    text: 'For birthdays, office orders, family gatherings, rooftop nights, and private fire moments, request a quote ahead.',
    cta: 'Request party quote',
    href: partyUrl,
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Choose your fire format',
    text: 'Pick roast boxes, ribs, fire breads, skewers, soups, or a party bundle depending on your group and timing.',
  },
  {
    step: '02',
    title: 'Send WhatsApp details',
    text: 'Send name, date, pickup or reservation time, quantity, and special notes. Keep the message clear and fast.',
  },
  {
    step: '03',
    title: 'BOSSA confirms capacity',
    text: 'The team confirms availability, pickup timing, and what the fire can still produce before the batch sells out.',
  },
  {
    step: '04',
    title: 'Pickup, dine, or celebrate',
    text: 'Come for lunch, dinner, take-out boxes, or group orders. Fire first. Sauce second. Island soul always.',
  },
];

const menuSections = [
  {
    title: 'Bossa Roast Boxes',
    note: 'Takeaway · family style · wood fire and charcoal only',
    items: [
      {
        name: 'Bossa Roast Box (4 pcs)',
        price: 'ANG 22',
        description:
          '4 pcs of fire-roasted chicken, marinated 24h. Light smoke, crispy edges. Served with roasted potatoes, corn, salad, and fire jus.',
      },
      {
        name: 'Bossa Roast Box (8 pcs)',
        price: 'ANG 38',
        description:
          '8 pcs of roast chicken, perfect for sharing. Deep smoky flavor, tender meat. Served with the same sides.',
      },
      {
        name: 'Bossa Box Mix',
        price: 'ANG 49.50',
        description:
          '4 piece chicken, 1 full ribs, 1 chorizo, salad, baked potato, and bread. Built as a complete fire box for sharing.',
      },
    ],
  },
  {
    title: 'Fire Ribs',
    note: 'Tamarind-rum glaze · slow smoke · fire comfort',
    items: [
      {
        name: 'Fire Ribs (half rack)',
        price: 'ANG 18',
        description:
          'Half rack of tamarind-rum glazed ribs, slow-smoked until tender. Served with roasted potatoes, corn, salad, and bread.',
      },
      {
        name: 'Fire Ribs (full rack)',
        price: 'ANG 32',
        description:
          'Full rack of ribs with deep Curaçao hardwood flavor. Built for the truly hungry.',
      },
    ],
  },
  {
    title: 'Fire Bread Sandwiches',
    note: 'Crispy bread · smoke · sauces · island bite',
    items: [
      {
        name: 'Pulled Roast Chicken Sandwich',
        price: 'ANG 12',
        description:
          'Fire-grilled pan bollo filled with pulled roast chicken, garlic mayo, and pickled onions. Smoky, crunchy, dushi.',
      },
      {
        name: 'Wood-Fired Pork Sandwich',
        price: 'ANG 14',
        description: 'Wood-fired pork, crispy bread, tamarind BBQ sauce, and fresh slaw.',
      },
      {
        name: 'Beef Tenderloin Sandwich',
        price: 'ANG 18',
        description:
          'Tender flame-grilled beef tenderloin with toasted bread, herb butter, arugula, and caramelized onion.',
      },
      {
        name: 'Grilled Chicken Salad Sandwich',
        price: 'ANG 19.50',
        description: 'Grilled chicken, fresh salad, garlic oil, and BOSSA fire flavor.',
      },
    ],
  },
  {
    title: 'Skewers / Pinchos',
    note: 'Flame-grilled · smoky · served with fire sides',
    items: [
      {
        name: 'Chicken Skewer',
        price: 'ANG 14',
        description:
          'Marinated chicken skewer, flame-grilled with bell pepper, onion, and lime. Served with roasted corn and garlic sauce.',
      },
      {
        name: 'Beef Skewer',
        price: 'ANG 16',
        description: 'Tender beef skewer, lightly smoked with bold and spicy fire flavor.',
      },
      {
        name: 'Shrimp Skewer',
        price: 'ANG 18',
        description: 'Large shrimp skewer, grilled until crisp with garlic butter and herbs.',
      },
    ],
  },
  {
    title: 'Soups & Stews',
    note: 'Soul in a bowl · slow fire comfort',
    items: [
      {
        name: 'Bossa Beef Soup',
        price: 'ANG 12',
        description:
          'Hearty beef soup, slow-simmered with large chunks of meat, potato, carrot, and herbs.',
      },
      {
        name: 'Bossa Chicken Soup',
        price: 'ANG 10',
        description: 'Homestyle chicken soup with light smoke and vegetables. A hug in a bowl.',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="container nav">
        <a className="brand" href="#top" aria-label="BOSSA Asado i Mar home">
          BOSSA ASADO I MAR
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {routes.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="top" className="container hero">
        <span className="badge">Opposite Avila Hotel · Pietermaai · Wood Fire & Caribbean Soul</span>
        <h1>Wood fire, Caribbean soul, and BOSSA boxes ordered fast on WhatsApp.</h1>
        <p className="lead">
          Fire-grilled chicken, tamarind-rum ribs, smoked skewers, Bossa sandwiches, soups, party orders,
          and weekend pickup energy in the Pietermaai area of Willemstad.
        </p>
        <div className="cta-row">
          <a className="button primary" href={orderUrl} target="_blank" rel="noreferrer">
            Order on WhatsApp
          </a>
          <a className="button" href={reservationUrl} target="_blank" rel="noreferrer">
            Reserve a table
          </a>
          <a className="button" href="/weekend-fire">
            Weekend Fire Boxes
          </a>
          <a className="button" href="/party-menu">
            Party Menu
          </a>
          <a className="button" href="tel:+59995230683">
            Call +5999 523 0683
          </a>
        </div>
      </section>

      <section className="section media-section">
        <div className="container grid">
          {conversionCards.map((card) => (
            <article className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <a className="button primary" href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel={card.href.startsWith('http') ? 'noreferrer' : undefined}>
                {card.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="media" className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Visual direction</span>
            <h2>Real fire, real food, real BOSSA energy.</h2>
            <p>
              Live the fire, taste the smoke. From the grill area to roasted ribs, fire breads, island drinks,
              and party boxes — every visual should feel like Curaçao hardwood smoke.
            </p>
          </div>
          <img
            src="/images/bossa/hero-grill-area.png"
            alt="BOSSA fire-grill hero visual showing the grill area with fire and charcoal"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <span className="badge">How BOSSA Works</span>
          <h2>Simple order flow. Clean fire execution.</h2>
          <p>
            BOSSA is designed around speed, clarity, and limited fire capacity. The easier the order flow,
            the better the food comes out of the pit.
          </p>
          <div className="grid weekend-grid">
            {howItWorks.map((item) => (
              <article className="card tall-card" key={item.step}>
                <span className="badge">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container info-card" style={{ textAlign: 'center' }}>
          <span className="badge">Weekend Fire & Party Grill</span>
          <h2>🔥 Live coals. Roast boxes. Ribs. Party skewers. 🔥</h2>
          <p>
            Thursday–Sunday from 12:00 PM to 10:00 PM. Limited batches, cold drinks, hardwood smoke,
            and the smell of kandela dushi. Order early — when the fire rests, we close.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a className="button primary" href={weekendUrl} target="_blank" rel="noreferrer">
              Ask what boxes are available
            </a>
            <a className="button" href="/party-menu">
              Plan a party order
            </a>
          </div>
        </div>
      </section>

      <section id="weekend-fire" className="section promo-section">
        <div className="container split">
          <div>
            <span className="badge">Weekend Fire Event</span>
            <h2>Take-out boxes built for Thursday through Sunday.</h2>
            <p>
              A limited weekend ritual: Community Fire Box, Classic Chicken, Classic Ribs, skewers, fire sandwiches,
              soups, and fast WhatsApp ordering. Simple boxes. Fast flow. Fire decides the rhythm.
            </p>
            <div className="cta-row">
              <a className="button primary" href="/weekend-fire">Open Weekend Fire page</a>
              <a className="button" href={orderUrl} target="_blank" rel="noreferrer">Order on WhatsApp</a>
            </div>
          </div>
          <img
            src="/images/bossa/fire-ribs-box.png"
            alt="BOSSA weekend fire ribs box presentation"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>
      </section>

      <section id="party" className="section">
        <div className="container split">
          <div>
            <span className="badge">Party Menu</span>
            <h2>Group orders, sharing platters, and private fire moments.</h2>
            <p>
              Built for birthdays, office orders, rooftop moments, family gatherings, and content shoots. The party menu uses the same fire system: boxes, classics, skewers, sandwiches, soups, and island energy.
            </p>
            <div className="cta-row">
              <a className="button primary" href="/party-menu">Open Party Menu</a>
              <a className="button" href={partyUrl} target="_blank" rel="noreferrer">Request quote</a>
            </div>
          </div>
          <img
            src="/images/bossa/bbq-party-del-rey.jpg"
            alt="BOSSA party BBQ platter for group dining"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>
      </section>

      <section id="menu" className="section">
        <div className="container">
          <span className="badge">Fire & Smoke Menu</span>
          <h2>Papiamentu · English · Dutch · Español — served with dushi and smoke.</h2>
          <p>
            Scan, choose, and let the fire decide the rhythm. Prices are listed in ANG and can be updated as
            the menu evolves.
          </p>
          <div className="menu-stack">
            {menuSections.map((section) => (
              <article className="menu-section" key={section.title}>
                <div className="menu-section-header">
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.note}</p>
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

      <section id="reserve" className="section">
        <div className="container split">
          <div>
            <span className="badge">Reservation flow</span>
            <h2>Fast reservations. Less back-and-forth.</h2>
            <p>
              Message BOSSA on WhatsApp with your name, date, time, party size, seating preference, and special notes.
              Staff confirms the final booking so your table and timing stay clean.
            </p>
          </div>
          <div className="info-card">
            <h3>Reserve now</h3>
            <p>WhatsApp: +5999 523 0683</p>
            <a className="button primary" href={reservationUrl} target="_blank" rel="noreferrer">
              Start WhatsApp reservation
            </a>
          </div>
        </div>
      </section>

      <section id="location" className="section media-section">
        <div className="container split">
          <div>
            <span className="badge">Come to the fire</span>
            <h2>New Nederland Nuyesweg 116 · Pietermaai Area · Willemstad</h2>
            <p>
              BOSSA is positioned for local lunch, dinner, weekend boxes, and visitors around Avila Hotel and Pietermaai.
              Follow the smoke, send a WhatsApp, and confirm what is fresh from the fire today.
            </p>
            <div className="cta-row">
              <a className="button primary" href={orderUrl} target="_blank" rel="noreferrer">
                WhatsApp BOSSA
              </a>
              <a className="button" href="https://www.google.com/maps/search/?api=1&query=New%20Nederland%20Nuyesweg%20116%20Willemstad%20Curacao" target="_blank" rel="noreferrer">
                Open Google Maps
              </a>
            </div>
          </div>
          <div className="info-card">
            <h3>Quick info</h3>
            <p>📍 Opposite Avila Hotel / Pietermaai area</p>
            <p>🔥 Wood fire & charcoal only</p>
            <p>📞 +5999 523 0683</p>
            <p>⏱️ Thursday–Sunday · 12:00 PM–10:00 PM</p>
          </div>
        </div>
      </section>

      <section id="hours" className="section">
        <div className="container split">
          <div>
            <span className="badge">Opening hours</span>
            <h2>Open Thursday through Sunday.</h2>
            <p>Lunch, smoke, dinner, and weekend fire energy in Pietermaai.</p>
          </div>
          <div className="hours-card">
            <div><strong>Thursday</strong><span>12:00 PM – 10:00 PM</span></div>
            <div><strong>Friday</strong><span>12:00 PM – 10:00 PM</span></div>
            <div><strong>Saturday</strong><span>12:00 PM – 10:00 PM</span></div>
            <div><strong>Sunday</strong><span>12:00 PM – 10:00 PM</span></div>
          </div>
        </div>
      </section>

      <section id="concierge" className="section">
        <div className="container split">
          <div>
            <span className="badge">AI concierge</span>
            <h2>Coming next: BOSSA AI Concierge.</h2>
            <p>
              The chatbot will answer menu, hours, location, events, private dining, and reservation questions, then hand
              off to WhatsApp when human confirmation is needed.
            </p>
          </div>
          <div className="info-card">
            <h3>Best first message</h3>
            <p>“Bon dia BOSSA, I want to order/reserve. My name is ___, for ___ people, on ___ at ___.”</p>
            <a className="button primary" href={orderUrl} target="_blank" rel="noreferrer">
              Send WhatsApp now
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>BOSSA Asado i Mar</strong>
            <p>New Nederland Nuyesweg 116 · Pietermaai Area · Willemstad, Curaçao</p>
            <p>#BossaAsado · #WeekendFireGrill · #KandelaDushi</p>
          </div>
          <div>
            <p>WhatsApp: +5999 523 0683</p>
            <p>Open Thursday–Sunday · 12:00 PM–10:00 PM</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
