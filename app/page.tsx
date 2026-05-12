const whatsappNumber = '59995230683';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

const routes = [
  ['Menu', '#menu'],
  ['Reserve', '#reserve'],
  ['Hours', '#hours'],
  ['Events', '#events'],
  ['AI Concierge', '#concierge'],
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
        price: 'ANG 15',
        description:
          'Rice, beans, sweet plantain, and your choice of meat: chicken, ribs, beef, or shrimp. A complete meal.',
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
          'Fire-grilled pan bollo filled with pulled roast chicken, garlic mayo, and pickled onions.',
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
        <span className="badge">Pietermaai, Curaçao · Wood Fire & Caribbean Soul</span>
        <h1>Fire-grill dining with smoke, sea, rooftop energy, and island soul.</h1>
        <p className="lead">
          BOSSA Asado i Mar is where fire, smoke, and island flavor meet. Wood fire and charcoal only,
          built for roast boxes, ribs, sandwiches, skewers, soups, weekend energy, and WhatsApp-first reservations.
        </p>
        <div className="cta-row">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Reserve on WhatsApp
          </a>
          <a className="button" href="tel:+59995230683">
            Call +5999 523 0683
          </a>
          <a className="button" href="#menu">
            View menu
          </a>
        </div>
      </section>

      <section id="media" className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Visual direction</span>
            <h2>Real fire, real food, real BOSSA energy.</h2>
            <p>
              The next upgrade is to move the BOSSA images and video from Notion into the website asset folder,
              then replace this cinematic placeholder with the actual fire-grill visuals.
            </p>
          </div>
          <div className="media-placeholder" aria-label="BOSSA fire-grill visual placeholder">
            <span>🔥</span>
            <strong>Fire · Smoke · Charcoal · Curaçao</strong>
          </div>
        </div>
      </section>

      <section id="menu" className="section">
        <div className="container">
          <span className="badge">Final menu preview</span>
          <h2>Built around the pit.</h2>
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
              The AI concierge will later help structure these requests before staff confirmation.
            </p>
          </div>
          <div className="info-card">
            <h3>Reserve now</h3>
            <p>WhatsApp: +5999 523 0683</p>
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Start WhatsApp reservation
            </a>
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
            <strong>Thursday</strong>
            <span>12:00 PM – 10:00 PM</span>
            <strong>Friday</strong>
            <span>12:00 PM – 10:00 PM</span>
            <strong>Saturday</strong>
            <span>12:00 PM – 10:00 PM</span>
            <strong>Sunday</strong>
            <span>12:00 PM – 10:00 PM</span>
          </div>
        </div>
      </section>

      <section id="events" className="section">
        <div className="container">
          <span className="badge">Events</span>
          <h2>Weekend fire nights, rooftop specials, and creator moments.</h2>
          <p>
            BOSSA can become more than a restaurant: a content engine, tourist experience, and local gathering point
            for fire-roast collaborations, private dining, and rooftop events.
          </p>
        </div>
      </section>

      <section id="concierge" className="section">
        <div className="container">
          <span className="badge">AI concierge</span>
          <h2>Coming next: BOSSA AI Concierge.</h2>
          <p>
            The chatbot will answer menu, hours, location, events, private dining, and reservation questions, then hand
            off to WhatsApp when human confirmation is needed.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>BOSSA Asado i Mar</strong>
            <p>New Nederland Nuyesweg 116 · Pietermaai Area · Willemstad, Curaçao</p>
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
