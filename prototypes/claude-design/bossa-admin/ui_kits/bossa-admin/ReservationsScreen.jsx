function ReservationsScreen() {
  const { RecordsScreen, Icon, DataTag, useToast, useStore, canEdit } = window.BossaUI;
  const toast = useToast();
  const state = useStore();
  const editable = canEdit(state.role);
  const [view, setView] = React.useState('table');
  const upcoming = state.reservations.filter(r => !r.archived).slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const byDate = {};
  upcoming.forEach(r => { (byDate[r.date] = byDate[r.date] || []).push(r); });

  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'adm-toolbar', style: { marginBottom: -6 } },
      React.createElement('button', { className: 'adm-chip' + (view === 'table' ? ' active' : ''), onClick: () => setView('table') }, 'Table view'),
      React.createElement('button', { className: 'adm-chip' + (view === 'calendar' ? ' active' : ''), onClick: () => setView('calendar') }, 'Calendar view')),
    view === 'calendar'
      ? React.createElement('div', { className: 'adm-grid', style: { gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' } },
          Object.keys(byDate).sort().map(d => React.createElement('div', { key: d, className: 'adm-card' },
            React.createElement('div', { className: 'adm-section-title' }, new Date(d).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })),
            React.createElement('div', { style: { marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 } },
              byDate[d].map(r => React.createElement('div', { key: r.id, style: { display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: '1px solid var(--adm-line)', paddingBottom: 6 } },
                React.createElement('span', null, r.time + ' · ' + r.guest + ' (' + r.partySize + ')'),
                React.createElement(window.BossaUI.StatusBadge, { status: r.status }))))))
        )
      : React.createElement(RecordsScreen, {
          collection: 'reservations', title: 'Reservations', breadcrumb: ['BOSSA Admin', 'Reservations'], primaryLabel: 'Add reservation',
          statusField: 'status', emptyIcon: 'reservations', emptySub: 'Reservations from WhatsApp, phone or the website will appear here.',
          searchKeys: ['id', 'guest', 'phone'],
          filterDefs: [{ key: 'status', options: ['New', 'Confirmed', 'Seated', 'No-show', 'Cancelled'] }, { key: 'source', options: ['WhatsApp', 'Phone', 'Website', 'Tour operator', 'Walk-in'] }],
          columns: [
            { key: 'guest', label: 'Guest' }, { key: 'phone', label: 'Phone' }, { key: 'date', label: 'Date' }, { key: 'time', label: 'Time' },
            { key: 'partySize', label: 'Party size' }, { key: 'seating', label: 'Seating' }, { key: 'occasion', label: 'Occasion' },
            { key: 'dietary', label: 'Dietary notes', wrap: true }, { key: 'source', label: 'Source' }, { key: 'status', label: 'Status' },
            { key: 'dataTag', label: 'Source data', render: r => React.createElement(DataTag, { tag: r.dataTag }) }
          ],
          formFields: [
            { key: 'guest', label: 'Guest name', required: true }, { key: 'phone', label: 'Phone' },
            { key: 'date', label: 'Date', type: 'date', required: true }, { key: 'time', label: 'Time', type: 'time', required: true },
            { key: 'partySize', label: 'Party size', type: 'number', required: true }, { key: 'seating', label: 'Seating preference', type: 'select', options: ['Patio', 'Terrace', 'Indoor', 'Group table'] },
            { key: 'occasion', label: 'Occasion' }, { key: 'dietary', label: 'Dietary notes' },
            { key: 'source', label: 'Source', type: 'select', options: ['WhatsApp', 'Phone', 'Website', 'Tour operator', 'Walk-in'], default: 'WhatsApp' },
            { key: 'status', label: 'Status', type: 'select', options: ['New', 'Confirmed', 'Seated', 'No-show', 'Cancelled'], default: 'New' },
            { key: 'notes', label: 'Internal notes', type: 'textarea' }
          ],
          extraActions: (r) => [
            r.status !== 'Seated' ? React.createElement('button', { key: 'seat', className: 'adm-mini-btn', disabled: !editable, onClick: () => { window.BossaAdminStore.updateRecord('reservations', r.id, { status: 'Seated' }); toast('Guest seated.', 'success'); } }, 'Seat') : null,
            React.createElement('a', { key: 'wa', className: 'adm-mini-btn', href: 'https://wa.me/' + String(r.phone || '').replace(/[^\d]/g, ''), target: '_blank', rel: 'noreferrer', style: { textDecoration: 'none' } }, React.createElement(Icon, { name: 'whatsapp', size: 13 }), 'WhatsApp')
          ]
        }));
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Reservations: ReservationsScreen });
