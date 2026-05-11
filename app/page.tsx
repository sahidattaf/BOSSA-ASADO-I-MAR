const menuHighlights = [
  {
    title: 'Fire-grilled chicken',
    copy: '24-hour marinade, crisp skin, clean smoke, and juicy Curaçao hardwood flavor.',
  },
  {
    title: 'Ribs from the pit',
    copy: 'Sticky char, slow fire energy, and comfort sides built for sharing.',
  },
  {
    title: 'Rooftop skewers',
    copy: 'Smoky bites, island herbs, drinks, music, and a night breeze above Pietermaai.',
  },
];

const routes = [
  ['Menu', '#menu'],
  ['Reserve', '#reserve'],
  ['Events', '#events'],
  ['AI Concierge', '#concierge'],
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
        <span className="badge">Pietermaai, Curaçao · Fire, Flavor & Sea</span>
        <h1>Fire-grill dining with smoke, sea, rooftop energy, and island soul.</h1>
        <p className="lead">
          BOSSA Asado i Mar is a Curaçao fire-grill restaurant concept built around hardwood smoke,
          bold comfort plates, rooftop nights, WhatsApp-first reservations, and AI-powered hospitality.
        </p>
        <div className="cta-row">
          <a className="button primary" href="https://wa.me/5990000000" target="_blank" rel="noreferrer">
            Reserve on WhatsApp
          </a>
          <a className="button" href="#menu">
            View menu direction
          </a>
        </div>
      </section>

      <section id="menu" className="section">
        <div className="container">
          <span className="badge">Menu direction</span>
          <h2>Built around the pit.</h2>
          <p>
            The first public website should make the food easy to understand: chicken, ribs, box meals,
            sandwiches, skewers, rooftop bites, and drinks. Keep it visual, smoky, and mobile-first.
          </p>
          <div className="grid">
            {menuHighlights.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reserve" className="section">
        <div className="container">
          <span className="badge">Reservation flow</span>
          <h2>Fast reservations. Less back-and-forth.</h2>
          <p>
            The first launch should route guests to WhatsApp with structured intake: name, date, time,
            guests, seating preference, and special notes. Later, Supabase can store reservations and
            chatbot conversations.
          </p>
          <div className="cta-row">
            <a className="button primary" href="https://wa.me/5990000000" target="_blank" rel="noreferrer">
              Start reservation
            </a>
            <a className="button" href="mailto:sahidattaf@gmail.com">
              Contact team
            </a>
          </div>
        </div>
      </section>

      <section id="events" className="section">
        <div className="container">
          <span className="badge">Events</span>
          <h2>Weekend fire nights, rooftop specials, and creator moments.</h2>
          <p>
            BOSSA can become more than a restaurant: a content engine, tourist experience, and local
            gathering point for fire-roast collaborations, private dining, and rooftop events.
          </p>
        </div>
      </section>

      <section id="concierge" className="section">
        <div className="container">
          <span className="badge">AI concierge</span>
          <h2>Coming next: BOSSA AI Concierge.</h2>
          <p>
            The chatbot should answer menu, hours, location, events, private dining, and reservation
            questions, then hand off to WhatsApp when human confirmation is needed.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <strong>BOSSA Asado i Mar</strong>
          <p>Oranjestraat / Nuyesweg · Pietermaai district · Willemstad, Curaçao</p>
        </div>
      </footer>
    </main>
  );
}
