function ProductionScreen() {
  const { PageHeader, Icon, useToast, useStore, canEdit, DataTag, Modal, Field, TextInput, TextArea, Select } = window.BossaUI;
  const state = useStore();
  const toast = useToast();
  const editable = canEdit(state.role);
  const STAGES = ['Planned', 'Preparing', 'Ready', 'Closed'];
  const NEXT = { Planned: 'Preparing', Preparing: 'Ready', Ready: 'Closed' };
  const PREV = { Preparing: 'Planned', Ready: 'Preparing', Closed: 'Ready' };
  const [modal, setModal] = React.useState(null);
  const [form, setForm] = React.useState({});

  const batches = state.productionBatches.filter(b => !b.archived);
  function move(b, status) { window.BossaAdminStore.updateRecord('productionBatches', b.id, { status }); toast('Batch moved to ' + status + '.', 'success'); }
  function openAdd() { setForm({ batch: '', requiredQty: 0, preparedQty: 0, remainingQty: 0, dueTime: '', assignedStaff: '', status: 'Planned', notes: '' }); setModal(true); }
  function save() {
    if (!form.batch.trim()) { toast('Batch name is required.', 'error'); return; }
    window.BossaAdminStore.addRecord('productionBatches', Object.assign({ dataTag: 'demo', remainingQty: Math.max(0, form.requiredQty - form.preparedQty) }, form));
    toast('Production batch added.', 'success');
    setModal(false);
  }

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, { breadcrumb: ['BOSSA Admin', 'Production'], title: 'Production',
      actions: [editable ? React.createElement('button', { key: 'add', className: 'adm-btn-primary', onClick: openAdd }, React.createElement(Icon, { name: 'plus', size: 15 }), 'Add batch') : null] }),
    React.createElement('div', { className: 'adm-grid', style: { gridTemplateColumns: 'repeat(4,1fr)', alignItems: 'start' } },
      STAGES.map(stage => React.createElement('div', { key: stage, className: 'adm-card', style: { background: 'var(--adm-surface-2)' } },
        React.createElement('div', { className: 'adm-panel-head' }, React.createElement('h3', { className: 'adm-section-title' }, stage), React.createElement('span', { style: { fontSize: 12, color: 'var(--adm-ink-muted)', fontWeight: 700 } }, batches.filter(b => b.status === stage).length)),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          batches.filter(b => b.status === stage).map(b => React.createElement('div', { key: b.id, className: 'adm-card', style: { padding: 12 } },
            React.createElement('div', { style: { fontWeight: 800, fontSize: 13.5 } }, b.batch),
            React.createElement('div', { style: { fontSize: 12, color: 'var(--adm-ink-muted)', margin: '6px 0' } }, 'Required ' + b.requiredQty + ' · Prepared ' + b.preparedQty + ' · Remaining ' + b.remainingQty),
            React.createElement('div', { style: { fontSize: 12, color: 'var(--adm-ink-muted)' } }, 'Due ' + (b.dueTime ? new Date(b.dueTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—') + ' · ' + b.assignedStaff),
            b.notes ? React.createElement('div', { style: { fontSize: 12, marginTop: 6, fontStyle: 'italic', color: 'var(--adm-ink-muted)' } }, b.notes) : null,
            React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 10 } },
              PREV[b.status] ? React.createElement('button', { className: 'adm-mini-btn', disabled: !editable, onClick: () => move(b, PREV[b.status]) }, '← ' + PREV[b.status]) : null,
              NEXT[b.status] ? React.createElement('button', { className: 'adm-mini-btn', disabled: !editable, onClick: () => move(b, NEXT[b.status]) }, NEXT[b.status] + ' →') : null),
            React.createElement('div', { style: { marginTop: 8 } }, React.createElement(DataTag, { tag: b.dataTag })))),
          batches.filter(b => b.status === stage).length === 0 ? React.createElement('div', { style: { fontSize: 12, color: 'var(--adm-ink-muted)', textAlign: 'center', padding: '10px 0' } }, 'No batches') : null)))),
    modal ? renderAddBatchModal() : null);

  function set(key, val) { setForm(Object.assign({}, form, { [key]: val })); }
  function renderAddBatchModal() {
    const footer = React.createElement(React.Fragment, null,
      React.createElement('button', { className: 'adm-btn-ghost', onClick: () => setModal(false) }, 'Cancel'),
      React.createElement('button', { className: 'adm-btn-primary', onClick: save }, 'Add batch'));
    const body = React.createElement('div', { className: 'adm-form-grid' },
      React.createElement(Field, { label: 'Batch' }, React.createElement(TextInput, { value: form.batch, onChange: e => set('batch', e.target.value) })),
      React.createElement(Field, { label: 'Assigned staff' }, React.createElement(TextInput, { value: form.assignedStaff, onChange: e => set('assignedStaff', e.target.value) })),
      React.createElement(Field, { label: 'Required qty' }, React.createElement(TextInput, { type: 'number', value: form.requiredQty, onChange: e => set('requiredQty', Number(e.target.value)) })),
      React.createElement(Field, { label: 'Prepared qty' }, React.createElement(TextInput, { type: 'number', value: form.preparedQty, onChange: e => set('preparedQty', Number(e.target.value)) })),
      React.createElement(Field, { label: 'Due time' }, React.createElement(TextInput, { type: 'datetime-local', onChange: e => set('dueTime', e.target.value) })),
      React.createElement(Field, { label: 'Status' }, React.createElement(Select, { options: STAGES, value: form.status, onChange: e => set('status', e.target.value) })),
      React.createElement(Field, { label: 'Notes' }, React.createElement(TextArea, { value: form.notes, onChange: e => set('notes', e.target.value) })));
    return React.createElement(Modal, { title: 'Add production batch', onClose: () => setModal(false), footer }, body);
  }
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Production: ProductionScreen });
