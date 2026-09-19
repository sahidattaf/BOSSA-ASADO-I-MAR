const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;
const { Icon } = window.BossaIcons;

/* ---------- Toast system ---------- */
const ToastCtx = createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, kind) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, message, kind: kind || 'default' }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3600);
  }, []);
  return React.createElement(ToastCtx.Provider, { value: push }, children,
    React.createElement('div', { className: 'adm-toast-host' },
      toasts.map(t => React.createElement('div', { key: t.id, className: 'adm-toast ' + t.kind },
        React.createElement(Icon, { name: t.kind === 'error' ? 'x' : 'tasks', size: 15 }), t.message))));
}
function useToast(){ return useContext(ToastCtx); }

/* ---------- Role permissions ---------- */
const ROLE_SCREENS = {
  'Owner/Admin': null,
  'Manager': null,
  'Kitchen': ['dashboard','orders','production','inventory','tasks'],
  'Marketing': ['dashboard','content','customers','analytics','tasks'],
  'Finance': ['dashboard','orders','inventory','analytics','settings'],
  'View only': null
};
function screensForRole(role){ return ROLE_SCREENS[role] || null; }
function canEdit(role){ return role !== 'View only'; }

/* ---------- Small building blocks ---------- */
function DataTag({ tag }) {
  const label = tag === 'verified' ? 'Verified' : tag === 'needs-confirmation' ? 'Needs confirmation' : 'Demo data';
  return React.createElement('span', { className: 'adm-tag ' + (tag || 'demo') }, label);
}
const STATUS_CLASS = {
  New:'s-info',Confirmed:'s-progress',Preparing:'s-warn',Ready:'s-success',Completed:'s-neutral',Cancelled:'s-danger',
  Paid:'s-success',Unpaid:'s-danger',Invoiced:'s-info',
  Planned:'s-info',Closed:'s-neutral',
  'No-show':'s-danger',Active:'s-success','Under review':'s-warn',
  Open:'s-info','In progress':'s-warn',Scheduled:'s-info',
  OK:'s-success',Low:'s-warn',Critical:'s-danger'
};
function StatusBadge({ status }) {
  const cls = STATUS_CLASS[status] || 's-neutral';
  return React.createElement('span', { className: 'adm-status ' + cls }, status);
}
function Field({ label, error, children }) {
  return React.createElement('div', { className: 'adm-field' },
    React.createElement('label', null, label), children,
    error ? React.createElement('div', { className: 'adm-field-error' }, error) : null);
}
function TextInput(props){ return React.createElement('input', Object.assign({ className: 'adm-input' }, props)); }
function TextArea(props){ return React.createElement('textarea', Object.assign({ className: 'adm-textarea', rows: 3 }, props)); }
function Select({ options, ...props }) {
  return React.createElement('select', Object.assign({ className: 'adm-select' }, props),
    options.map(o => React.createElement('option', { key: o, value: o }, o)));
}
function EmptyState({ icon, title, sub }) {
  return React.createElement('div', { className: 'adm-empty' },
    React.createElement(Icon, { name: icon || 'orders', size: 30 }),
    React.createElement('div', { style: { fontWeight: 700, marginTop: 6 } }, title),
    sub ? React.createElement('div', { style: { fontSize: 12, marginTop: 2 } }, sub) : null);
}
function Banner({ kind, icon, children }) {
  return React.createElement('div', { className: 'adm-banner ' + kind }, React.createElement(Icon, { name: icon, size: 15 }), children);
}

/* ---------- Modal ---------- */
function Modal({ title, onClose, children, footer, wide }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return React.createElement('div', { className: 'adm-modal-overlay', onMouseDown: e => { if (e.target === e.currentTarget) onClose(); } },
    React.createElement('div', { className: 'adm-modal', style: wide ? { maxWidth: 820 } : undefined },
      React.createElement('div', { className: 'adm-modal-head' },
        React.createElement('h3', { className: 'adm-modal-title' }, title),
        React.createElement('button', { className: 'adm-icon-btn', style: { color: 'var(--adm-ink)', border: '1px solid var(--adm-line-strong)' }, onClick: onClose, 'aria-label': 'Close' }, React.createElement(Icon, { name: 'x', size: 16 }))),
      React.createElement('div', { className: 'adm-modal-body' }, children),
      footer ? React.createElement('div', { className: 'adm-modal-foot' }, footer) : null));
}
function ConfirmDialog({ title, message, confirmLabel, danger, onConfirm, onClose }) {
  return React.createElement(Modal, { title, onClose,
    footer: React.createElement(React.Fragment, null,
      React.createElement('button', { className: 'adm-btn-ghost', onClick: onClose }, 'Cancel'),
      React.createElement('button', { className: danger ? 'adm-btn-danger' : 'adm-btn-primary', onClick: () => { onConfirm(); onClose(); } }, confirmLabel || 'Confirm')) },
    React.createElement('p', { style: { margin: 0, color: 'var(--adm-ink-muted)', fontSize: 14 } }, message));
}

/* ---------- Generic data table with search/filter/sort ---------- */
function useStore() {
  const [state, setState] = useState(() => window.BossaAdminStore.getState());
  useEffect(() => window.BossaAdminStore.subscribe(setState), []);
  return state;
}

function DataTable({ columns, rows, rowKey, renderActions, emptyIcon, emptyTitle, emptySub }) {
  if (!rows.length) return React.createElement(EmptyState, { icon: emptyIcon, title: emptyTitle || 'No records', sub: emptySub || 'Try adjusting filters or add a new record.' });
  return React.createElement('div', { className: 'adm-table-wrap' },
    React.createElement('table', { className: 'adm-table' },
      React.createElement('thead', null, React.createElement('tr', null,
        columns.map(c => React.createElement('th', { key: c.key, className: c.wrap ? 'wrap' : '' }, c.label)),
        renderActions ? React.createElement('th', null, 'Actions') : null)),
      React.createElement('tbody', null,
        rows.map(r => React.createElement('tr', { key: r[rowKey] },
          columns.map(c => React.createElement('td', { key: c.key, className: c.wrap ? 'wrap' : '' }, c.render ? c.render(r) : r[c.key])),
          renderActions ? React.createElement('td', null, React.createElement('div', { className: 'adm-row-actions' }, renderActions(r))) : null)))));
}

function PageHeader({ breadcrumb, title, actions }) {
  return React.createElement('div', { className: 'adm-subheader' },
    React.createElement('div', { className: 'adm-breadcrumb' }, breadcrumb.map((b, i) => React.createElement(React.Fragment, { key: i }, i > 0 ? React.createElement(Icon, { name: 'chevron', size: 11, style: { transform: 'rotate(-90deg)' } }) : null, React.createElement('span', null, b)))),
    React.createElement('div', { className: 'adm-titlebar' },
      React.createElement('h1', { className: 'adm-page-title' }, title),
      actions ? React.createElement('div', { className: 'adm-page-actions' }, actions) : null));
}

/* ---------- Generic CRUD records screen ---------- */
function RecordsScreen({ collection, title, breadcrumb, icon, columns, formFields, searchKeys, filterDefs, primaryLabel, emptyIcon, emptySub, extraActions, statusField }) {
  const state = useStore();
  const toast = useToast();
  const role = state.role;
  const editable = canEdit(role);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [showArchived, setShowArchived] = useState(false);
  const [modal, setModal] = useState(null); // {mode:'add'|'edit', record}
  const [confirmArchive, setConfirmArchive] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const all = state[collection] || [];
  let rows = all.filter(r => !!r.archived === showArchived);
  if (query.trim()) {
    const q = query.toLowerCase();
    rows = rows.filter(r => (searchKeys || columns.map(c => c.key)).some(k => String(r[k] || '').toLowerCase().includes(q)));
  }
  (filterDefs || []).forEach(f => {
    const v = filters[f.key];
    if (v && v !== 'All') rows = rows.filter(r => String(r[f.key]) === v);
  });

  function openAdd() {
    const init = {}; formFields.forEach(f => { init[f.key] = f.default !== undefined ? f.default : (f.type === 'toggle' ? false : ''); });
    setForm(init); setErrors({}); setModal({ mode: 'add' });
  }
  function openEdit(r) { setForm(Object.assign({}, r)); setErrors({}); setModal({ mode: 'edit', record: r }); }
  function validate() {
    const errs = {};
    formFields.forEach(f => { if (f.required && !String(form[f.key] || '').trim()) errs[f.key] = 'Required'; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  function save() {
    if (!validate()) return;
    if (modal.mode === 'add') {
      window.BossaAdminStore.addRecord(collection, Object.assign({ dataTag: 'demo' }, form));
      toast('Added new record.', 'success');
      window.BossaAdminStore.logActivity(title + ': added a new record');
    } else {
      window.BossaAdminStore.updateRecord(collection, modal.record.id, form);
      toast('Record updated.', 'success');
      window.BossaAdminStore.logActivity(title + ': updated ' + (form[columns[0].key] || modal.record.id));
    }
    setModal(null);
  }
  function doArchive(r) { window.BossaAdminStore.archiveRecord(collection, r.id); toast(showArchived ? '' : 'Archived — restore anytime from "Show archived".', 'default'); setConfirmArchive(null); }
  function doRestore(r) { window.BossaAdminStore.restoreRecord(collection, r.id); toast('Restored.', 'success'); }
  function quickStatus(r, val) { window.BossaAdminStore.updateRecord(collection, r.id, { [statusField]: val }); toast('Status updated to ' + val + '.', 'success'); }

  const cols = columns.map(c => c.key === statusField ? Object.assign({}, c, { render: r => React.createElement(StatusBadge, { status: r[statusField] }) }) : c);

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, {
      breadcrumb, title,
      actions: [
        editable ? React.createElement('button', { key: 'add', className: 'adm-btn-primary', onClick: openAdd }, React.createElement(Icon, { name: 'plus', size: 15 }), primaryLabel || 'Add New') : null
      ]
    }),
    React.createElement('div', { className: 'adm-toolbar' },
      React.createElement('div', { className: 'adm-search', style: { background: 'var(--adm-surface)', border: '1px solid var(--adm-line-strong)' } },
        React.createElement(Icon, { name: 'search', size: 15, style: { color: 'var(--adm-ink-muted)' } }),
        React.createElement('input', { placeholder: 'Search…', value: query, onChange: e => setQuery(e.target.value), style: { color: 'var(--adm-ink)' } })),
      (filterDefs || []).map(f => React.createElement(Select, { key: f.key, options: ['All'].concat(f.options), value: filters[f.key] || 'All', onChange: e => setFilters(Object.assign({}, filters, { [f.key]: e.target.value })) })),
      React.createElement('button', { className: 'adm-chip' + (showArchived ? ' active' : ''), onClick: () => setShowArchived(s => !s) }, showArchived ? 'Viewing archived' : 'Show archived')
    ),
    React.createElement('div', { className: 'adm-card', style: { padding: 0 } },
      React.createElement(DataTable, {
        columns: cols, rows, rowKey: 'id', emptyIcon, emptySub,
        emptyTitle: showArchived ? 'Nothing archived' : 'No records yet',
        renderActions: r => [
          statusField && editable && !showArchived ? React.createElement(Select, { key: 's', options: (filterDefs.find(f => f.key === statusField) || {}).options || [], value: r[statusField], onChange: e => quickStatus(r, e.target.value), style: { padding: '5px 8px', fontSize: 11 } }) : null,
          React.createElement('button', { key: 'e', className: 'adm-mini-btn', disabled: !editable, onClick: () => openEdit(r) }, React.createElement(Icon, { name: 'edit', size: 13 }), 'Edit'),
          extraActions ? extraActions(r, { editable, toast }) : null,
          !showArchived
            ? React.createElement('button', { key: 'a', className: 'adm-mini-btn', disabled: !editable, onClick: () => setConfirmArchive(r) }, React.createElement(Icon, { name: 'archive', size: 13 }), 'Archive')
            : React.createElement('button', { key: 'r', className: 'adm-mini-btn', disabled: !editable, onClick: () => doRestore(r) }, React.createElement(Icon, { name: 'archive', size: 13 }), 'Restore')
        ]
      })),
    modal ? React.createElement(Modal, {
      title: (modal.mode === 'add' ? 'Add — ' : 'Edit — ') + title, onClose: () => setModal(null), wide: true,
      footer: React.createElement(React.Fragment, null,
        React.createElement('button', { className: 'adm-btn-ghost', onClick: () => setModal(null) }, 'Cancel'),
        React.createElement('button', { className: 'adm-btn-primary', onClick: save }, modal.mode === 'add' ? 'Add record' : 'Save changes'))
    },
      React.createElement('div', { className: 'adm-form-grid' },
        formFields.map(f => React.createElement(Field, { key: f.key, label: f.label, error: errors[f.key] },
          f.type === 'select' ? React.createElement(Select, { options: f.options, value: form[f.key] || '', onChange: e => setForm(Object.assign({}, form, { [f.key]: e.target.value })) })
          : f.type === 'textarea' ? React.createElement(TextArea, { value: form[f.key] || '', onChange: e => setForm(Object.assign({}, form, { [f.key]: e.target.value })) })
          : f.type === 'toggle' ? React.createElement('label', { style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 } }, React.createElement('input', { type: 'checkbox', checked: !!form[f.key], onChange: e => setForm(Object.assign({}, form, { [f.key]: e.target.checked })) }), form[f.key] ? 'Yes' : 'No')
          : React.createElement(TextInput, { type: f.type || 'text', value: form[f.key] || '', onChange: e => setForm(Object.assign({}, form, { [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value })) })))))
    : null,
    confirmArchive ? React.createElement(ConfirmDialog, {
      title: 'Archive record?', message: 'This moves the record to Archived. You can restore it anytime — nothing is permanently deleted.',
      confirmLabel: 'Archive', onConfirm: () => doArchive(confirmArchive), onClose: () => setConfirmArchive(null)
    }) : null);
}

window.BossaUI = {
  React, ToastProvider, useToast, DataTag, StatusBadge, Field, TextInput, TextArea, Select,
  EmptyState, Banner, Modal, ConfirmDialog, DataTable, useStore, canEdit, screensForRole, Icon,
  PageHeader, RecordsScreen
};
