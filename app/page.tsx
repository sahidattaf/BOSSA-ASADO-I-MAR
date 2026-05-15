const whatsappNumber = '59995230683';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

const routes = [
  ['Menu', '#menu'],
  ['Weekend Fire', '/weekend-fire'],
  ['Party Menu', '/party-menu'],
  ['Reserve', '#reserve'],
  ['Hours', '#hours'],
  ['AI Concierge', '#concierge'],
];

const menuSections = [
  {
    title: 'Bossa Roast Boxes',
    note: 'Takeaway · family style · wood fire and charcoal only',
    items: [
      {
        name: 'Bossa Roast Box (4 pcs)',
        price: 'ANG 29',
        description:
          '4 pcs of fire-roasted chicken, marinated 24h. Light smoke, crispy edges. Served with roasted potatoes, corn, salad, and fire jus.',
      },
      {
        name: 'Bossa Roast Box (8 pcs)',
        price: 'ANG 49',
        description:
          '8 pcs of roast chicken, perfect for sharing. Deep smoky flavor, tender meat. Served with roasted potatoes, corn, salad, and fire jus.
      },
      {
        name: 'Bossa Box Mix',
        price: 'ANG 29',
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
        price: 'ANG 13',
        description: 'Wood-fired pork, crispy bread, tamarind BBQ sauce, and fresh slaw.',
      },
      {
        name: 'Beef Tenderloin Sandwich',
        price: 'ANG 20',
        description:
          'Tender flame-grilled beef tenderloin with toasted bread, herb butter, arugula, and caramelized onion.',
      },
      {
        name: 'Grilled Chicken Salad Sandwich',
        price: 'ANG 12.50',
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
        price: 'ANG 29',
        description:
          'Marinated chicken skewer, flame-grilled with bell pepper, onion, and lime. Served with roasted potatoes and fresh salad & bread & garlic sauce.',
      },
      {
        name: 'Beef Tenderloin Skewer',
        price: 'ANG 45',
        description: 'Tender beef skewer, lightly smoked/grill with bold and fire flavor.served with roast potatoes,and fresh salad, and bread and garlic sauce.',
      },
      {
        name: 'Shrimp Skewer',
        price: 'ANG 30',
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
        price: 'ANG 15',
        description:
          'Hearty beef soup, slow-simmered with large chunks of meat, potato, carrot, and herbs.',
      },
      {
        name: 'Bossa Chicken Soup',
        price: 'ANG 11',
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
          <a className="button" href="/weekend-fire">
            Weekend Fire Boxes
          </a>
          <a className="button" href="/party-menu">
            Party Menu
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
              Experience the authentic fire-grill visuals: from hero grill area to roasted ribs, fire breads to island drinks.
              Every image captures the smoke, heat, and Caribbean soul of BOSSA Asado i Mar.
            </p>
          </div>
          <img 
            src="/images/bossa/hero-grill-area.png" 
            alt="BOSSA fire-grill hero visual showing the grill area with fire and charcoal"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>
      </section>

      <section id="weekend-fire" className="section promo-section">
        <div className="container split">
          <div>
            <span className="badge">Weekend Fire Event</span>
            <h2>Take-out boxes built for Friday, Saturday, and Sunday.</h2>
            <p>
              A limited weekend ritual: Community Fire Box, Classic Chicken, Classic Ribs, skewers, fire sandwiches,
              soups, and fast WhatsApp ordering. Simple boxes. Fast flow. Fire decides the rhythm.
            </p>
            <div className="cta-row">
              <a className="button primary" href="/weekend-fire">Open Weekend Fire page</a>
              <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Order on WhatsApp</a>
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
              <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Request quote</a>
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