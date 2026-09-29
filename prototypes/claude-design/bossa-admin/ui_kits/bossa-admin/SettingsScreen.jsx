function SettingsScreen() {
  const { PageHeader, Field, TextInput, Select, useStore, useToast, canEdit, DataTag } = window.BossaUI;
  const state = useStore();
  const toast = useToast();
  const editable = canEdit(state.role);
  const [profile, setProfile] = React.useState(state.settings.restaurantProfile);
  const [tax, setTax] = React.useState(state.settings.taxesCurrency);
  const [resRules, setResRules] = React.useState(state.settings.reservationRules);
  const [notif, setNotif] = React.useState(state.settings.notificationPrefs);

  function Section(title, children, onSave) {
    return React.createElement('div', { className: 'adm-card' },
      React.createElement('div', { className: 'adm-panel-head' }, React.createElement('h3', { className: 'adm-section-title' }, title),
        editable ? React.createElement('button', { className: 'adm-btn-ghost', onClick: onSave }, 'Save') : null),
      React.createElement('div', { className: 'adm-form-grid' }, children));
  }
  const dis = !editable;

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, { breadcrumb: ['BOSSA Admin', 'Settings'], title: 'Settings' }),
    Section('Restaurant profile', [
      React.createElement(Field, { key: 'n', label: 'Name' }, React.createElement(TextInput, { disabled: dis, value: profile.name, onChange: e => setProfile(Object.assign({}, profile, { name: e.target.value })) })),
      React.createElement(Field, { key: 'a', label: 'Address' }, React.createElement(TextInput, { disabled: dis, value: profile.address, onChange: e => setProfile(Object.assign({}, profile, { address: e.target.value })) })),
      React.createElement(Field, { key: 'p', label: 'Phone' }, React.createElement(TextInput, { disabled: dis, value: profile.phone, onChange: e => setProfile(Object.assign({}, profile, { phone: e.target.value })) })),
      React.createElement(Field, { key: 'w', label: 'WhatsApp' }, React.createElement(TextInput, { disabled: dis, value: profile.whatsapp, onChange: e => setProfile(Object.assign({}, profile, { whatsapp: e.target.value })) })),
      React.createElement(Field, { key: 'h', label: 'Opening hours' }, React.createElement(TextInput, { disabled: dis, value: profile.hours, onChange: e => setProfile(Object.assign({}, profile, { hours: e.target.value })) }))
    ], () => { window.BossaAdminStore.updateSettings({ restaurantProfile: profile }); toast('Restaurant profile saved.', 'success'); }),
    Section('Taxes & currency', [
      React.createElement(Field, { key: 'c', label: 'Currency' }, React.createElement(TextInput, { disabled: dis, value: tax.currency, onChange: e => setTax(Object.assign({}, tax, { currency: e.target.value })) })),
      React.createElement(Field, { key: 't', label: 'Tax rate (%)' }, React.createElement(TextInput, { type: 'number', disabled: dis, value: tax.taxRate, onChange: e => setTax(Object.assign({}, tax, { taxRate: Number(e.target.value) })) }))
    ], () => { window.BossaAdminStore.updateSettings({ taxesCurrency: tax }); toast('Tax settings saved.', 'success'); }),
    React.createElement('div', { className: 'adm-card' },
      React.createElement('h3', { className: 'adm-section-title' }, 'Order statuses'),
      React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 } }, state.settings.orderStatuses.map(s => React.createElement('span', { key: s, className: 'adm-chip' }, s)))),
    Section('Reservation rules', [
      React.createElement(Field, { key: 'm', label: 'Max party size' }, React.createElement(TextInput, { type: 'number', disabled: dis, value: resRules.maxPartySize, onChange: e => setResRules(Object.assign({}, resRules, { maxPartySize: Number(e.target.value) })) })),
      React.createElement(Field, { key: 'h', label: 'Hold time (minutes)' }, React.createElement(TextInput, { type: 'number', disabled: dis, value: resRules.holdMinutes, onChange: e => setResRules(Object.assign({}, resRules, { holdMinutes: Number(e.target.value) })) })),
      React.createElement(Field, { key: 'd', label: 'Require deposit above party size' }, React.createElement(TextInput, { type: 'number', disabled: dis, value: resRules.requireDepositAbove, onChange: e => setResRules(Object.assign({}, resRules, { requireDepositAbove: Number(e.target.value) })) }))
    ], () => { window.BossaAdminStore.updateSettings({ reservationRules: resRules }); toast('Reservation rules saved.', 'success'); }),
    React.createElement('div', { className: 'adm-card' },
      React.createElement('h3', { className: 'adm-section-title' }, 'User roles'),
      React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 } }, state.settings.userRoles.map(r => React.createElement('span', { key: r, className: 'adm-chip' + (r === state.role ? ' active' : '') }, r)))),
    Section('Notification preferences', [
      ['newOrderAlert', 'New order alerts'], ['lowStockAlert', 'Low stock alerts'], ['reservationReminders', 'Reservation reminders']
    ].map(([k, l]) => React.createElement('label', { key: k, style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 } },
      React.createElement('input', { type: 'checkbox', disabled: dis, checked: !!notif[k], onChange: e => setNotif(Object.assign({}, notif, { [k]: e.target.checked })) }), l)),
      () => { window.BossaAdminStore.updateSettings({ notificationPrefs: notif }); toast('Notification preferences saved.', 'success'); }),
    React.createElement('div', { className: 'adm-card' },
      React.createElement('h3', { className: 'adm-section-title' }, 'Data-source connections'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 } },
        state.settings.dataSourceConnections.map(c => React.createElement('div', { key: c.name, style: { display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: '1px solid var(--adm-line)', paddingBottom: 6 } }, c.name, React.createElement('span', { style: { color: 'var(--adm-ink-muted)', fontSize: 12 } }, c.status))))),
    React.createElement('div', { className: 'adm-card' },
      React.createElement('h3', { className: 'adm-section-title' }, 'Brand assets'),
      React.createElement('p', { style: { fontSize: 12.5, color: 'var(--adm-ink-muted)', marginTop: 8 } }, 'Managed centrally in the BOSSA Asado i Mar Design System — logo files live under its assets/ folder.')),
    React.createElement('div', { className: 'adm-card' },
      React.createElement('div', { className: 'adm-panel-head' }, React.createElement('h3', { className: 'adm-section-title' }, 'Reset demo data'), React.createElement(DataTag, { tag: 'demo' })),
      React.createElement('p', { style: { fontSize: 12.5, color: 'var(--adm-ink-muted)' } }, 'Restores all records to their original seeded demo state. Cannot be undone.'),
      React.createElement(ResetButton)));
}
function ResetButton() {
  const { ConfirmDialog, useToast } = window.BossaUI;
  const toast = useToast();
  const [open, setOpen] = React.useState(false);
  return React.createElement(React.Fragment, null,
    React.createElement('button', { className: 'adm-btn-danger', onClick: () => setOpen(true) }, 'Reset demo data'),
    open ? React.createElement(ConfirmDialog, { title: 'Reset all demo data?', message: 'This restores every screen to its original seeded state and discards local edits made in this prototype.', confirmLabel: 'Reset', danger: true, onClose: () => setOpen(false), onConfirm: () => { window.BossaAdminStore.resetDemoData(); toast('Demo data reset.', 'success'); } }) : null);
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Settings: SettingsScreen });
