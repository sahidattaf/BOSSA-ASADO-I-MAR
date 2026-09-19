function DashboardScreen({ goTo }) {
  const { PageHeader, Icon, DataTag, StatusBadge, useStore, Banner } = window.BossaUI;
  const state = useStore();
  const todayStr = new Date().toISOString().slice(0, 10);
  const orders = state.orders.filter(o => !o.archived);
  const ordersToday = orders.filter(o => o.dateTime.slice(0, 10) === todayStr);
  const revenueToday = ordersToday.reduce((s, o) => s + Number(o.total || 0), 0);
  const avgOrder = ordersToday.length ? revenueToday / ordersToday.length : 0;
  const reservationsToday = state.reservations.filter(r => !r.archived && r.date === todayStr).length;
  const pendingWhatsApp = orders.filter(o => o.channel === 'WhatsApp' && ['New', 'Confirmed'].includes(o.prepStatus)).length;
  const batches = state.productionBatches.filter(b => !b.archived && b.status !== 'Closed');
  const req = batches.reduce((s, b) => s + b.requiredQty, 0), prep = batches.reduce((s, b) => s + b.preparedQty, 0);
  const capacityPct = req ? Math.round((prep / req) * 100) : 0;
  const lowStock = state.inventory.filter(i => i.stockStatus !== 'OK');
  const openTasks = state.tasks.filter(t => !t.archived && ['Open', 'In progress'].includes(t.status));

  const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d.toISOString().slice(0, 10); });
  const revByDay = days.map(d => orders.filter(o => o.dateTime.slice(0, 10) === d).reduce((s, o) => s + Number(o.total || 0), 0));
  const maxRev = Math.max(1, ...revByDay);
  const statuses = ['New', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
  const byStatus = statuses.map(s => orders.filter(o => o.prepStatus === s).length);
  const maxStatus = Math.max(1, ...byStatus);
  const upcomingRes = state.reservations.filter(r => !r.archived && r.status !== 'Cancelled' && r.date >= todayStr).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).slice(0, 5);

  function Kpi(label, value, sub, tag, kind) {
    return React.createElement('div', { className: 'adm-card' },
      React.createElement('div', { className: 'adm-kpi-label' }, label, React.createElement(DataTag, { tag: tag || 'demo' })),
      React.createElement('div', { className: 'adm-kpi-value' + (kind === 'gold' ? ' gold' : '') }, value),
      sub ? React.createElement('div', { className: 'adm-kpi-sub' }, sub) : null);
  }

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, { breadcrumb: ['BOSSA Admin', 'Overview'], title: 'Overview' }),
    React.createElement(Banner, { kind: 'offline', icon: 'wifi' }, 'This prototype runs on demo/local data — no production backend is connected yet. KPIs below are tagged Demo, Verified, or Needs confirmation.'),
    React.createElement('div', { className: 'adm-grid adm-kpi-grid' },
      Kpi("Today's revenue", 'XCG ' + revenueToday.toFixed(2), ordersToday.length + ' orders today', 'demo', 'gold'),
      Kpi('Orders today', ordersToday.length, 'across all channels', 'demo'),
      Kpi('Reservations today', reservationsToday, 'confirmed + new', 'demo'),
      Kpi('Average order value', 'XCG ' + avgOrder.toFixed(2), 'today', 'demo', 'gold'),
      Kpi('Pending WhatsApp orders', pendingWhatsApp, 'awaiting confirmation', 'demo'),
      Kpi('Fire Box batch capacity', capacityPct + '%', prep + ' of ' + req + ' units prepared', 'demo'),
      Kpi('Low-stock alerts', lowStock.length, lowStock.map(i => i.ingredient).slice(0, 2).join(', ') || 'all stocked', 'demo'),
      Kpi('Open management tasks', openTasks.length, 'across all domains', 'demo')),
    React.createElement('div', { className: 'adm-grid', style: { gridTemplateColumns: '1.4fr 1fr' } },
      React.createElement('div', { className: 'adm-card' },
        React.createElement('div', { className: 'adm-panel-head' }, React.createElement('h3', { className: 'adm-section-title' }, 'Weekly revenue'), React.createElement(DataTag, { tag: 'demo' })),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 } },
          revByDay.map((v, i) => React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
            React.createElement('div', { style: { width: '100%', maxWidth: 30, height: Math.max(4, (v / maxRev) * 110), background: 'var(--fire)', borderRadius: '6px 6px 0 0' } }),
            React.createElement('div', { style: { fontSize: 10.5, color: 'var(--adm-ink-muted)' } }, new Date(days[i]).toLocaleDateString([], { weekday: 'short' }))))))
      ,
      React.createElement('div', { className: 'adm-card' },
        React.createElement('div', { className: 'adm-panel-head' }, React.createElement('h3', { className: 'adm-section-title' }, 'Orders by status'), React.createElement(DataTag, { tag: 'demo' })),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          statuses.map((s, i) => React.createElement('div', { key: s, style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('div', { style: { width: 74, fontSize: 12, color: 'var(--adm-ink-muted)' } }, s),
            React.createElement('div', { style: { flex: 1, background: 'var(--adm-line)', borderRadius: 6, height: 8 } },
              React.createElement('div', { style: { width: (byStatus[i] / maxStatus * 100) + '%', height: '100%', borderRadius: 6, background: 'var(--gold)' } })),
            React.createElement('div', { style: { width: 20, fontSize: 12, fontWeight: 700, textAlign: 'right' } }, byStatus[i])))))),
    React.createElement('div', { className: 'adm-grid', style: { gridTemplateColumns: '1fr 1fr 1fr' } },
      React.createElement('div', { className: 'adm-card' },
        React.createElement('h3', { className: 'adm-section-title' }, 'Upcoming reservations'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 } },
          upcomingRes.length ? upcomingRes.map(r => React.createElement('div', { key: r.id, style: { display: 'flex', justifyContent: 'space-between', fontSize: 12.5, borderBottom: '1px solid var(--adm-line)', paddingBottom: 6 } },
            React.createElement('span', null, r.date.slice(5) + ' ' + r.time + ' · ' + r.guest), React.createElement(StatusBadge, { status: r.status })))
            : React.createElement('div', { style: { fontSize: 12, color: 'var(--adm-ink-muted)' } }, 'No upcoming reservations.'))),
      React.createElement('div', { className: 'adm-card' },
        React.createElement('h3', { className: 'adm-section-title' }, 'Recent activity'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 } },
          state.activity.slice(0, 6).map(a => React.createElement('div', { key: a.id, style: { fontSize: 12.5, color: 'var(--adm-ink-muted)' } },
            new Date(a.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' — ' + a.text)))),
      React.createElement('div', { className: 'adm-card' },
        React.createElement('h3', { className: 'adm-section-title' }, 'Quick actions'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 } },
          [['orders', 'Add order', 'orders'], ['reservations', 'Add reservation', 'reservations'], ['production', 'Open production board', 'production'], ['inventory', 'Review low stock', 'inventory']].map(([icon, label, screen]) =>
            React.createElement('button', { key: screen, className: 'adm-mini-btn', style: { justifyContent: 'flex-start' }, onClick: () => goTo(screen) }, React.createElement(Icon, { name: icon, size: 14 }), label))))));
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Dashboard: DashboardScreen });
