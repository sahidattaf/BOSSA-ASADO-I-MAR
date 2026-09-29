function AnalyticsScreen() {
  const { PageHeader, Icon, DataTag, useStore, useToast, Select } = window.BossaUI;
  const state = useStore();
  const toast = useToast();
  const [range, setRange] = React.useState('7');
  const days = [...Array(Number(range))].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (Number(range) - 1 - i)); return d.toISOString().slice(0, 10); });
  const orders = state.orders.filter(o => !o.archived);
  const inRange = orders.filter(o => days.includes(o.dateTime.slice(0, 10)));
  const revenue = inRange.reduce((s, o) => s + Number(o.total || 0), 0);
  const aov = inRange.length ? revenue / inRange.length : 0;
  const maxRev = Math.max(1, ...days.map(d => orders.filter(o => o.dateTime.slice(0, 10) === d).reduce((s, o) => s + Number(o.total || 0), 0)));

  const featured = state.menuItems.filter(m => m.featured);
  const bySegment = {};
  state.customers.forEach(c => { bySegment[c.segment] = (bySegment[c.segment] || 0) + 1; });
  const partnerRevenue = state.customers.filter(c => ['Hotel', 'Airbnb Host', 'Tour Operator'].includes(c.segment)).reduce((s, c) => s + Number(c.revenueAttributed || 0), 0);
  const seated = state.reservations.filter(r => r.status === 'Seated').length;
  const totalRes = state.reservations.filter(r => !r.archived).length || 1;

  function Panel(title, tag, children) {
    return React.createElement('div', { className: 'adm-card' },
      React.createElement('div', { className: 'adm-panel-head' }, React.createElement('h3', { className: 'adm-section-title' }, title), React.createElement(DataTag, { tag })),
      children);
  }

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, { breadcrumb: ['BOSSA Admin', 'Analytics'], title: 'Analytics',
      actions: [
        React.createElement(Select, { key: 'r', options: ['7', '30', '90'], value: range, onChange: e => setRange(e.target.value) }),
        React.createElement('button', { key: 'x', className: 'adm-btn-primary', onClick: () => toast('Export started — prototype generates a CSV placeholder.', 'success') }, React.createElement(Icon, { name: 'download', size: 15 }), 'Export')
      ] }),
    React.createElement('div', { className: 'adm-grid', style: { gridTemplateColumns: '1.4fr 1fr' } },
      Panel('Revenue trend (' + range + ' days)', 'demo', React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 6, height: 130, marginTop: 10 } },
        days.map(d => { const v = orders.filter(o => o.dateTime.slice(0, 10) === d).reduce((s, o) => s + Number(o.total || 0), 0); return React.createElement('div', { key: d, style: { flex: 1, height: Math.max(4, (v / maxRev) * 110), background: 'var(--fire)', borderRadius: '5px 5px 0 0' } }); }))),
      Panel('Order volume & AOV', 'demo', React.createElement('div', { style: { marginTop: 10 } },
        React.createElement('div', { className: 'adm-kpi-value' }, inRange.length + ' orders'),
        React.createElement('div', { className: 'adm-kpi-sub' }, 'XCG ' + aov.toFixed(2) + ' average order value')))),
    React.createElement('div', { className: 'adm-grid', style: { gridTemplateColumns: '1fr 1fr' } },
      Panel('Best-selling items', 'needs-confirmation', React.createElement('div', { style: { marginTop: 10, fontSize: 13 } },
        React.createElement('p', { style: { color: 'var(--adm-ink-muted)', fontSize: 12 } }, "Order records don't yet capture structured line items — ranking below is illustrative from featured menu items, not verified sales volume."),
        featured.map(f => React.createElement('div', { key: f.id, style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--adm-line)' } }, f.item, React.createElement('span', null, 'XCG ' + Number(f.price).toFixed(2)))))),
      Panel('Fire Box performance', 'needs-confirmation', React.createElement('p', { style: { fontSize: 12, color: 'var(--adm-ink-muted)', marginTop: 10 } }, 'Requires per-box sales attribution from a connected POS. Not available in this prototype.'))),
    React.createElement('div', { className: 'adm-grid', style: { gridTemplateColumns: '1fr 1fr 1fr' } },
      Panel('Reservation conversion', 'demo', React.createElement('div', { style: { marginTop: 10 } }, React.createElement('div', { className: 'adm-kpi-value gold' }, Math.round((seated / totalRes) * 100) + '%'), React.createElement('div', { className: 'adm-kpi-sub' }, seated + ' seated of ' + totalRes + ' reservations'))),
      Panel('Customer source', 'demo', React.createElement('div', { style: { marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 } }, Object.entries(bySegment).map(([k, v]) => React.createElement('div', { key: k, style: { display: 'flex', justifyContent: 'space-between', fontSize: 12.5 } }, k, React.createElement('strong', null, v))))),
      Panel('Hotel / partner contribution', 'demo', React.createElement('div', { style: { marginTop: 10 } }, React.createElement('div', { className: 'adm-kpi-value gold' }, 'XCG ' + partnerRevenue.toFixed(2)), React.createElement('div', { className: 'adm-kpi-sub' }, 'attributed revenue from hotel, Airbnb & tour partners')))),
    Panel('Content-to-order attribution', 'needs-confirmation', React.createElement('p', { style: { fontSize: 12, color: 'var(--adm-ink-muted)', marginTop: 10 } }, 'Linking a WhatsApp order to the campaign that drove it requires a tracked link or promo code — not implemented yet. Use the Campaign ID field in Content to prepare for this once tracking is added.')));
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Analytics: AnalyticsScreen });
