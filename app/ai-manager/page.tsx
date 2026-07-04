const tenants = [
  { initials: 'BA', name: 'BOSSA Asado i Mar', type: 'Restaurant · Fire-grill · Catering · Events', plan: 'Pro', active: true, accent: '#ff6b00' },
  { initials: 'BB', name: 'Blue Bay Hotel & Villas', type: 'Hotel · Pro', plan: 'Pro', active: false, accent: '#22d3ee' },
  { initials: 'PB', name: 'Punda Beach Club', type: 'Beach club · Starter', plan: 'Starter', active: false, accent: '#ec4899' },
  { initials: 'IT', name: 'Island Tours Curaçao', type: 'Tour operator · Starter', plan: 'Starter', active: false, accent: '#10b981' },
];

const kpis = [
  { label: "Today's Revenue", value: '$12,480', delta: '+9% vs last week', icon: '▣', tone: 'orange' },
  { label: 'Service Orders', value: '61', delta: 'room service + bar live', icon: '🛒', tone: 'orange' },
  { label: 'Reservations', value: '32', delta: '6 tonight 19:00–21:00', icon: '📅', tone: 'blue' },
  { label: 'WhatsApp Leads', value: '18', delta: '3 unanswered', icon: '💬', tone: 'blue', warning: true },
  { label: 'Review Score', value: '4.8', delta: '212 reviews', icon: '☆', tone: 'orange' },
  { label: 'Fire Boxes Sold', value: '26', delta: '14 left for Saturday', icon: '📦', tone: 'orange' },
  { label: 'Food Cost', value: '29%', delta: 'target 30%', icon: '%', tone: 'blue' },
  { label: 'Labor %', value: '24%', delta: 'on target', icon: '▤', tone: 'blue' },
];

const modules = [
  ['Operations', 'Daily ops, kitchen, staff, fire prep', '🔥'],
  ['Reservations', 'Calendar, table flow, guest notes', '📅'],
  ['Weekend Fire', 'Orders, batches, pickup status', '📦'],
  ['WhatsApp', 'Leads, replies, confirmations', '💬'],
  ['Content Studio', 'Reels, captions, campaigns', '📣'],
  ['Finance & KPI', 'Revenue, costs, targets', '📈'],
  ['Inventory', 'Stock, suppliers, 86 watch', '🧊'],
  ['AI Agents', 'Automation, logs, settings', '🤖'],
];

const agents = [
  ['Sales Operator', 'Weekend Fire, partner leads, quote follow-up', 'Live'],
  ['WhatsApp Agent', 'Order intake, reservation requests, confirmations', 'Live'],
  ['Kitchen Assistant', 'Fire station prep, batch rhythm, 86 alerts', 'Standby'],
  ['Content Producer', 'Instagram, TikTok, YouTube, hotel flyers', 'Live'],
  ['Review Manager', 'Guest feedback, Google reviews, recovery flows', 'Standby'],
  ['Revenue Optimizer', 'Menu mix, bundles, food cost signals', 'Live'],
];

const tasks = [
  ['Sync Notion leads', 'Operations', '09:41', 'Done'],
  ['Confirm 3 WhatsApp orders', 'Front Desk', 'Now', 'Urgent'],
  ['Check Fire Box batch count', 'Kitchen', '16:30', 'Open'],
  ['Post Weekend Fire story', 'Marketing', '17:00', 'Open'],
  ['Review low-stock garlic sauce', 'Inventory', '18:00', 'Watch'],
];

const links = [
  ['Website', 'https://www.bossaasado.com'],
  ['GitHub Repo', 'https://github.com/sahidattaf/BOSSA-ASADO-I-MAR'],
  ['WhatsApp', 'https://wa.me/59995230683'],
  ['Notion OS', 'https://app.notion.com/p/6efb81d0fd324131afc62a3dd53f52fe'],
];

export const metadata = {
  title: 'BOSSA AI Manager | Hospitality OS Dashboard',
  description: 'BOSSA Asado i Mar AI Manager dashboard prototype for restaurant operations, WhatsApp orders, content, finance, and multi-tenant Hospitality OS planning.',
};

export default function BossaAiManagerPage() {
  return (
    <main className="ai-shell">
      <style>{dashboardStyles}</style>

      <aside className="sidebar" aria-label="BOSSA AI Manager navigation">
        <div className="brand-mark">🔥</div>
        {['▦', '☑', '📅', '📦', '🛒', '💬', '👥', '☆', '👨‍🍳'].map((item) => (
          <span className="nav-dot" key={item}>{item}</span>
        ))}
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="tenant-switcher">
            <span className="tenant-badge">BA</span>
            <strong>BOSSA Asado i Mar</strong>
            <span className="chevron">⌄</span>
            <div className="tenant-menu">
              <span className="menu-title">Organizations</span>
              {tenants.map((tenant) => (
                <div className={`tenant-row ${tenant.active ? 'active' : ''}`} key={tenant.name}>
                  <span className="avatar" style={{ background: tenant.accent }}>{tenant.initials}</span>
                  <span>
                    <strong>{tenant.name}</strong>
                    <small>{tenant.type} · {tenant.plan}</small>
                  </span>
                </div>
              ))}
              <button className="ghost-action">＋ Create new tenant</button>
            </div>
          </div>

          <span className="status-pill"><i /> Open · service live</span>
          <span className="weather">☼ 31°C · light breeze</span>
          <label className="search"><span>⌕</span><input aria-label="Search" placeholder="Search guests, orders, docs" /></label>
          <button className="icon-btn" aria-label="AI suggestions">✦</button>
          <button className="icon-btn" aria-label="Notifications">🔔</button>
        </header>

        <section className="hero-panel">
          <div>
            <span className="eyebrow">AI Operations Commander</span>
            <h1>Good afternoon, Front Desk 🔥</h1>
            <p>24 arrivals today · pool bar opens 11:00 · Weekend Fire batches need confirmation before posting.</p>
          </div>
          <div className="hero-actions">
            <button>Edit layout</button>
            <button>Reset</button>
            <button className="primary">＋ Add widget</button>
          </div>
        </section>

        <section className="sync-card">
          <div>
            <strong>Notion sync</strong>
            <code>notion.so/bossa/dashboard-db</code>
          </div>
          <span className="sync-dot">● Synced</span>
          <button className="primary small">↻ Sync</button>
          <button className="small">⇣ Import</button>
          <button className="small">⇡ Export</button>
          <label className="auto"><input type="checkbox" defaultChecked /> Auto</label>
        </section>

        <section className="kpi-grid">
          {kpis.map((kpi) => (
            <article className={`kpi-card ${kpi.warning ? 'warning' : ''}`} key={kpi.label}>
              <div className="kpi-top"><span className={`kpi-icon ${kpi.tone}`}>{kpi.icon}</span><strong>{kpi.label}</strong></div>
              <h2>{kpi.value}</h2>
              <p>{kpi.warning ? '● ' : '▴ '}{kpi.delta}</p>
            </article>
          ))}
        </section>

        <section className="two-col">
          <article className="panel">
            <div className="section-title"><span>Dashboard Modules</span><button>Manage</button></div>
            <div className="module-grid">
              {modules.map(([title, text, icon]) => (
                <div className="module-card" key={title}>
                  <span>{icon}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="section-title"><span>Today’s Command Queue</span><button>Open tasks</button></div>
            <div className="task-list">
              {tasks.map(([task, owner, time, status]) => (
                <div className="task-row" key={task}>
                  <span>
                    <strong>{task}</strong>
                    <small>{owner} · {time}</small>
                  </span>
                  <em className={status.toLowerCase()}>{status}</em>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="two-col lower">
          <article className="panel">
            <div className="section-title"><span>AI Agent Control Room</span><button>Logs</button></div>
            <div className="agent-list">
              {agents.map(([name, description, status]) => (
                <div className="agent-row" key={name}>
                  <div>
                    <strong>{name}</strong>
                    <p>{description}</p>
                  </div>
                  <span className={status === 'Live' ? 'live' : 'standby'}>{status}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel stack-panel">
            <div className="section-title"><span>Connected Systems</span><button>Settings</button></div>
            <div className="link-grid">
              {links.map(([title, href]) => (
                <a href={href} target="_blank" rel="noreferrer" key={title}>{title}<span>↗</span></a>
              ))}
            </div>
            <div className="assistant-card">
              <span>🔥</span>
              <div>
                <strong>Floating AI Assistant</strong>
                <p>Ask for manager reports, content plans, lead follow-ups, menu checks, and partner outreach.</p>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

const dashboardStyles = `
  :root {
    --bg: #050505;
    --panel: rgba(22, 22, 24, .82);
    --panel-strong: rgba(31, 23, 18, .92);
    --line: rgba(255, 107, 0, .22);
    --line-soft: rgba(255, 255, 255, .08);
    --text: #fff7ed;
    --muted: #a8a29e;
    --ember: #ff6b00;
    --ember-2: #fb923c;
    --ocean: #22d3ee;
    --green: #18e39b;
    --danger: #f97316;
  }

  * { box-sizing: border-box; }

  .ai-shell {
    min-height: 100vh;
    color: var(--text);
    background:
      radial-gradient(circle at 85% 18%, rgba(255, 107, 0, .18), transparent 28%),
      radial-gradient(circle at 70% 4%, rgba(34, 211, 238, .12), transparent 24%),
      linear-gradient(135deg, #030303 0%, #090604 52%, #050505 100%);
    display: grid;
    grid-template-columns: 76px minmax(0, 1fr);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    border-right: 1px solid var(--line-soft);
    background: rgba(8, 8, 10, .82);
    backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 24px 12px;
  }

  .brand-mark,
  .nav-dot,
  .icon-btn,
  .kpi-icon {
    display: grid;
    place-items: center;
    border-radius: 18px;
  }

  .brand-mark {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, rgba(255, 107, 0, .25), rgba(255, 107, 0, .04));
    box-shadow: 0 0 34px rgba(255, 107, 0, .35);
    font-size: 22px;
  }

  .nav-dot {
    width: 42px;
    height: 42px;
    color: #d6d3d1;
    border: 1px solid transparent;
    background: transparent;
    font-size: 20px;
  }

  .nav-dot:nth-child(2) {
    border-color: var(--line);
    background: rgba(255, 107, 0, .14);
    color: var(--ember-2);
  }

  .workspace { padding: 28px 32px 44px; overflow: hidden; }

  .topbar {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }

  .tenant-switcher {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 255px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, .04);
    border: 1px solid var(--line-soft);
    border-radius: 16px;
  }

  .tenant-switcher:hover .tenant-menu { opacity: 1; transform: translateY(8px); pointer-events: auto; }
  .tenant-badge, .avatar { width: 34px; height: 34px; border-radius: 11px; display: grid; place-items: center; font-weight: 900; font-size: 12px; color: white; }
  .tenant-badge { background: var(--ember); }
  .chevron { margin-left: auto; color: var(--muted); }

  .tenant-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 360px;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 14px;
    background: rgba(14, 12, 11, .96);
    box-shadow: 0 24px 80px rgba(0, 0, 0, .55);
    opacity: 0;
    transform: translateY(-4px);
    pointer-events: none;
    transition: .2s ease;
    z-index: 10;
  }

  .menu-title {
    display: block;
    margin: 4px 8px 10px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: .16em;
    font-size: 11px;
  }

  .tenant-row {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 11px;
    border-radius: 14px;
  }

  .tenant-row.active { background: rgba(255, 107, 0, .14); }
  .tenant-row small, .task-row small { display: block; color: var(--muted); margin-top: 3px; }
  .ghost-action { width: 100%; margin-top: 8px; padding: 13px; border-radius: 13px; border: 1px solid var(--line-soft); background: transparent; color: var(--ocean); text-align: left; font-weight: 800; }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 13px 18px;
    border: 1px solid rgba(24, 227, 155, .28);
    color: var(--green);
    background: rgba(24, 227, 155, .08);
    border-radius: 999px;
    font-weight: 900;
  }

  .status-pill i { width: 10px; height: 10px; border-radius: 50%; background: var(--green); box-shadow: 0 0 16px var(--green); }
  .weather { color: #d6d3d1; white-space: nowrap; }

  .search { margin-left: auto; display: flex; align-items: center; gap: 8px; min-width: 290px; padding: 11px 16px; border-radius: 999px; background: rgba(255,255,255,.04); border: 1px solid var(--line-soft); color: var(--muted); }
  .search input { width: 100%; background: transparent; border: 0; outline: 0; color: var(--text); font: inherit; }
  .icon-btn { width: 46px; height: 46px; border: 1px solid var(--line-soft); background: rgba(255,255,255,.04); color: var(--text); cursor: pointer; }

  .hero-panel, .sync-card, .panel, .kpi-card {
    border: 1px solid var(--line-soft);
    background: var(--panel);
    backdrop-filter: blur(18px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 24px 80px rgba(0,0,0,.2);
  }

  .hero-panel {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding: 30px;
    border-radius: 26px 26px 0 0;
    background:
      linear-gradient(90deg, rgba(255, 107, 0, .12), rgba(255, 107, 0, .02)),
      var(--panel);
  }

  .eyebrow { color: var(--ember-2); text-transform: uppercase; letter-spacing: .18em; font-size: 12px; font-weight: 900; }
  h1 { font-size: clamp(34px, 5vw, 62px); line-height: 1; margin: 12px 0; letter-spacing: -.04em; }
  .hero-panel p { max-width: 710px; color: #d6d3d1; font-size: 18px; margin: 0; }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
  button, .link-grid a { font: inherit; }
  .hero-actions button, .sync-card button, .section-title button { border: 1px solid var(--line-soft); background: rgba(255,255,255,.06); color: var(--text); border-radius: 14px; padding: 12px 16px; font-weight: 800; cursor: pointer; }
  .primary { border-color: transparent !important; background: linear-gradient(135deg, var(--ember), #f97316) !important; color: white !important; box-shadow: 0 14px 42px rgba(255, 107, 0, .34); }
  .small { padding: 10px 14px !important; }

  .sync-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 24px;
    border-radius: 0 0 26px 26px;
    border-top: 0;
    margin-bottom: 24px;
  }

  .sync-card code { display: block; color: var(--muted); margin-top: 4px; }
  .sync-dot { margin-left: auto; color: var(--green); font-weight: 900; }
  .auto { color: var(--muted); display: flex; gap: 8px; align-items: center; }

  .kpi-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
  .kpi-card { min-height: 160px; padding: 23px; border-radius: 22px; position: relative; overflow: hidden; }
  .kpi-card:after { content: ''; position: absolute; inset: auto -20px -55px auto; width: 135px; height: 135px; border-radius: 50%; background: rgba(255, 107, 0, .08); }
  .kpi-card.warning { border-color: rgba(249, 115, 22, .45); }
  .kpi-top { display: flex; align-items: center; gap: 12px; color: #d6d3d1; }
  .kpi-icon { width: 40px; height: 40px; font-weight: 900; }
  .kpi-icon.orange { background: rgba(255, 107, 0, .16); color: var(--ember-2); }
  .kpi-icon.blue { background: rgba(34, 211, 238, .14); color: var(--ocean); }
  .kpi-card h2 { font-size: 43px; margin: 24px 0 6px; letter-spacing: -.05em; }
  .kpi-card p { color: var(--green); margin: 0; }
  .kpi-card.warning p { color: var(--danger); }

  .two-col { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(340px, .65fr); gap: 20px; margin-top: 20px; }
  .lower { grid-template-columns: minmax(0, 1fr) minmax(360px, .7fr); }
  .panel { border-radius: 24px; padding: 22px; }
  .section-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-weight: 900; font-size: 19px; }
  .section-title button { padding: 9px 12px; font-size: 13px; color: #d6d3d1; }

  .module-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; }
  .module-card { padding: 16px; border-radius: 18px; background: rgba(255,255,255,.04); border: 1px solid var(--line-soft); min-height: 135px; }
  .module-card span { font-size: 24px; }
  .module-card strong { display: block; margin-top: 13px; }
  .module-card p, .agent-row p, .assistant-card p { color: var(--muted); margin: 7px 0 0; line-height: 1.45; }

  .task-list, .agent-list { display: grid; gap: 10px; }
  .task-row, .agent-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px; border: 1px solid var(--line-soft); border-radius: 16px; background: rgba(255,255,255,.035); }
  .task-row em, .agent-row span { font-style: normal; font-weight: 900; font-size: 12px; border-radius: 999px; padding: 7px 10px; }
  .done, .live { color: var(--green); background: rgba(24, 227, 155, .09); }
  .urgent { color: var(--danger); background: rgba(249, 115, 22, .12); }
  .open, .watch, .standby { color: var(--ocean); background: rgba(34, 211, 238, .10); }

  .link-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .link-grid a { color: var(--text); text-decoration: none; padding: 15px; border-radius: 16px; background: rgba(255,255,255,.04); border: 1px solid var(--line-soft); display: flex; justify-content: space-between; font-weight: 900; }
  .assistant-card { margin-top: 16px; padding: 18px; border-radius: 18px; border: 1px solid var(--line); background: linear-gradient(135deg, rgba(255,107,0,.16), rgba(34,211,238,.06)); display: flex; gap: 14px; align-items: flex-start; }
  .assistant-card span { width: 48px; height: 48px; border-radius: 16px; display: grid; place-items: center; background: var(--ember); box-shadow: 0 0 36px rgba(255, 107, 0, .45); }

  @media (max-width: 1180px) {
    .kpi-grid, .module-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .two-col, .lower { grid-template-columns: 1fr; }
    .search { display: none; }
  }

  @media (max-width: 760px) {
    .ai-shell { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .workspace { padding: 18px; }
    .topbar { flex-wrap: wrap; }
    .tenant-switcher { width: 100%; }
    .tenant-menu { width: min(360px, calc(100vw - 36px)); }
    .hero-panel, .sync-card { align-items: flex-start; flex-direction: column; }
    .sync-dot { margin-left: 0; }
    .kpi-grid, .module-grid, .link-grid { grid-template-columns: 1fr; }
  }
`;
