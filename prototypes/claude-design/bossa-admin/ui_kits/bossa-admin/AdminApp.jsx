const NAV_ITEMS = [
  { key: 'dashboard', label: 'Overview', icon: 'home' },
  { key: 'orders', label: 'Orders', icon: 'orders' },
  { key: 'reservations', label: 'Reservations', icon: 'reservations' },
  { key: 'menu', label: 'Menu & Fire Boxes', icon: 'menu' },
  { key: 'production', label: 'Production', icon: 'production' },
  { key: 'inventory', label: 'Inventory & Costs', icon: 'inventory' },
  { key: 'customers', label: 'Customers & Partners', icon: 'customers' },
  { key: 'content', label: 'Content', icon: 'content' },
  { key: 'analytics', label: 'Analytics', icon: 'analytics' },
  { key: 'tasks', label: 'Tasks', icon: 'tasks' },
  { key: 'decisions', label: 'Decision Log', icon: 'decisions' },
  { key: 'settings', label: 'Settings', icon: 'settings' }
];
const SCREEN_COMPONENT = {
  dashboard: 'Dashboard', orders: 'Orders', reservations: 'Reservations', menu: 'Menu', production: 'Production',
  inventory: 'Inventory', customers: 'CustomersPartners', content: 'Content', analytics: 'Analytics',
  tasks: 'Tasks', decisions: 'DecisionLog', settings: 'Settings'
};

function AdminApp() {
  const { Icon, useStore, screensForRole, Banner } = window.BossaUI;
  const state = useStore();
  const [screen, setScreen] = React.useState('dashboard');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const [showNotif, setShowNotif] = React.useState(false);
  const [showUser, setShowUser] = React.useState(false);
  const [showAddNew, setShowAddNew] = React.useState(false);

  const allowed = screensForRole(state.role);
  React.useEffect(() => { if (allowed && !allowed.includes(screen)) setScreen(allowed[0] || 'dashboard'); }, [state.role]);

  function goTo(key) { setScreen(key); setMobileOpen(false); setShowAddNew(false); }

  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase(); const out = [];
    state.orders.forEach(o => { if (!o.archived && (o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q))) out.push({ label: 'Order ' + o.id + ' — ' + o.customer, go: 'orders' }); });
    state.reservations.forEach(r => { if (!r.archived && r.guest.toLowerCase().includes(q)) out.push({ label: 'Reservation — ' + r.guest, go: 'reservations' }); });
    state.customers.forEach(c => { if (c.contact.toLowerCase().includes(q) || (c.organization || '').toLowerCase().includes(q)) out.push({ label: c.contact + (c.organization ? ' (' + c.organization + ')' : ''), go: 'customers' }); });
    state.menuItems.forEach(m => { if (m.item.toLowerCase().includes(q)) out.push({ label: m.item, go: 'menu' }); });
    return out.slice(0, 6);
  }, [query, state]);

  const lowStockCount = state.inventory.filter(i => i.stockStatus !== 'OK').length;
  const openTaskCount = state.tasks.filter(t => !t.archived && ['Open', 'In progress'].includes(t.status)).length;
  const notifCount = lowStockCount + openTaskCount;

  const ScreenComp = window.BossaScreens[SCREEN_COMPONENT[screen]] || window.BossaScreens.Dashboard;
  const permitted = !allowed || allowed.includes(screen);

  return React.createElement('div', { className: 'adm-root' },
    mobileOpen ? React.createElement('div', { className: 'adm-scrim', onClick: () => setMobileOpen(false) }) : null,
    React.createElement('aside', { className: 'adm-sidebar' + (state.sidebarCollapsed ? ' collapsed' : '') + (mobileOpen ? ' mobile-open' : '') },
      React.createElement('div', { className: 'adm-brand' },
        React.createElement('div', { className: 'adm-brand-mark' }, 'B'),
        React.createElement('div', { className: 'adm-brand-text' },
          React.createElement('div', { className: 'adm-brand-name' }, 'BOSSA ADMIN'),
          React.createElement('div', { className: 'adm-brand-loc' }, 'Pietermaai, Curaçao'))),
      React.createElement('nav', { className: 'adm-nav' },
        NAV_ITEMS.filter(n => !allowed || allowed.includes(n.key)).map(n => React.createElement('button', {
          key: n.key, className: 'adm-nav-item' + (screen === n.key ? ' active' : ''), onClick: () => goTo(n.key)
        }, React.createElement(Icon, { name: n.icon, size: 17 }), React.createElement('span', { className: 'adm-nav-label' }, n.label)))),
      React.createElement('div', { className: 'adm-sidebar-foot' },
        React.createElement('button', { className: 'adm-collapse-btn', onClick: () => window.BossaAdminStore.setSidebarCollapsed(!state.sidebarCollapsed) },
          React.createElement(Icon, { name: state.sidebarCollapsed ? 'chevron' : 'chevronLeft', size: 14, style: { transform: state.sidebarCollapsed ? 'rotate(90deg)' : 'none' } }),
          !state.sidebarCollapsed ? 'Collapse' : null))),
    React.createElement('div', { className: 'adm-main' },
      React.createElement('header', { className: 'adm-header' },
        React.createElement('button', { className: 'adm-icon-btn adm-mobile-toggle', onClick: () => setMobileOpen(true), 'aria-label': 'Open menu' }, React.createElement(Icon, { name: 'hamburger', size: 17 })),
        React.createElement('div', { className: 'adm-search', style: { position: 'relative' } },
          React.createElement(Icon, { name: 'search', size: 15 }),
          React.createElement('input', { placeholder: 'Search orders, reservations, contacts…', value: query, onChange: e => { setQuery(e.target.value); setShowSearch(true); }, onFocus: () => setShowSearch(true), onBlur: () => setTimeout(() => setShowSearch(false), 150) }),
          showSearch && searchResults.length ? React.createElement('div', { style: { position: 'absolute', top: '110%', left: 0, right: 0, background: 'var(--adm-surface)', color: 'var(--adm-ink)', borderRadius: 12, boxShadow: 'var(--adm-shadow)', overflow: 'hidden', zIndex: 50 } },
            searchResults.map((r, i) => React.createElement('div', { key: i, style: { padding: '9px 14px', fontSize: 12.5, cursor: 'pointer', borderBottom: '1px solid var(--adm-line)' }, onMouseDown: () => { goTo(r.go); setQuery(''); } }, r.label))) : null),
        React.createElement('div', { className: 'adm-daterange' }, React.createElement(Icon, { name: 'reservations', size: 13 }), 'This week'),
        React.createElement('div', { className: 'adm-header-spacer' }),
        React.createElement('div', { className: 'adm-conn', title: 'Prototype: data stored locally, no production backend connected' }, React.createElement('span', { className: 'adm-conn-dot' }), 'Local data'),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('button', { className: 'adm-icon-btn', onClick: () => setShowNotif(s => !s), 'aria-label': 'Notifications' },
            React.createElement(Icon, { name: 'bell', size: 17 }), notifCount ? React.createElement('span', { className: 'adm-dot' }) : null),
          showNotif ? React.createElement('div', { style: { position: 'absolute', top: '120%', right: 0, width: 260, background: 'var(--adm-surface)', color: 'var(--adm-ink)', borderRadius: 12, boxShadow: 'var(--adm-shadow)', padding: 12, zIndex: 50 } },
            React.createElement('div', { style: { fontWeight: 800, fontSize: 12.5, marginBottom: 8 } }, 'Needs attention'),
            lowStockCount ? React.createElement('div', { style: { fontSize: 12.5, padding: '4px 0' } }, lowStockCount + ' ingredient(s) low or critical') : null,
            openTaskCount ? React.createElement('div', { style: { fontSize: 12.5, padding: '4px 0' } }, openTaskCount + ' open management task(s)') : null,
            !notifCount ? React.createElement('div', { style: { fontSize: 12.5, color: 'var(--adm-ink-muted)' } }, 'All clear.') : null) : null),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('button', { className: 'adm-btn-primary', onClick: () => setShowAddNew(s => !s) }, React.createElement(Icon, { name: 'plus', size: 15 }), 'Add New'),
          showAddNew ? React.createElement('div', { style: { position: 'absolute', top: '120%', right: 0, width: 190, background: 'var(--adm-surface)', color: 'var(--adm-ink)', borderRadius: 12, boxShadow: 'var(--adm-shadow)', padding: 6, zIndex: 50 } },
            [['orders', 'Order'], ['reservations', 'Reservation'], ['tasks', 'Task'], ['menu', 'Menu item']].map(([k, l]) => React.createElement('button', { key: k, className: 'adm-nav-item', style: { color: 'var(--adm-ink)', width: '100%' }, onClick: () => goTo(k) }, l))) : null),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('button', { className: 'adm-user', onClick: () => setShowUser(s => !s) }, React.createElement('span', { className: 'adm-user-avatar' }, state.role[0]), state.role),
          showUser ? React.createElement('div', { style: { position: 'absolute', top: '120%', right: 0, width: 200, background: 'var(--adm-surface)', color: 'var(--adm-ink)', borderRadius: 12, boxShadow: 'var(--adm-shadow)', padding: 10, zIndex: 50 } },
            React.createElement('div', { style: { fontSize: 11, fontWeight: 800, color: 'var(--adm-ink-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' } }, 'Switch role (prototype)'),
            state.settings.userRoles.map(r => React.createElement('button', { key: r, className: 'adm-nav-item', style: { color: r === state.role ? 'var(--fire)' : 'var(--adm-ink)', width: '100%', fontWeight: r === state.role ? 800 : 600 }, onClick: () => { window.BossaAdminStore.setRole(r); setShowUser(false); } }, r))) : null)),
      React.createElement('main', { className: 'adm-content' },
        !permitted ? React.createElement(Banner, { kind: 'denied', icon: 'settings' }, 'This section isn\'t available for the ' + state.role + ' role.') : React.createElement(ScreenComp, { goTo }))));
}
window.AdminApp = AdminApp;
