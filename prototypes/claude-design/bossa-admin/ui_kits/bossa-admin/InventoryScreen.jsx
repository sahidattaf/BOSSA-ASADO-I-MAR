function InventoryScreen() {
  const { RecordsScreen, Icon, DataTag, useToast, useStore, canEdit, Modal, Field, TextInput, TextArea, Select } = window.BossaUI;
  const toast = useToast();
  const state = useStore();
  const editable = canEdit(state.role);
  const [adjust, setAdjust] = React.useState(null);
  const [qty, setQty] = React.useState('');
  const [reason, setReason] = React.useState('');

  function submitAdjust() {
    if (!qty || !reason.trim()) { toast('Enter a quantity and reason.', 'error'); return; }
    const delta = Number(qty);
    const next = Math.max(0, adjust.currentStock + delta);
    window.BossaAdminStore.updateRecord('inventory', adjust.id, { currentStock: next });
    window.BossaAdminStore.logActivity('Inventory adjusted: ' + adjust.ingredient + ' ' + (delta >= 0 ? '+' : '') + delta + ' (' + reason + ')');
    toast('Stock adjusted and logged.', 'success');
    setAdjust(null); setQty(''); setReason('');
  }

  return React.createElement(React.Fragment, null,
    React.createElement(RecordsScreen, {
      collection: 'inventory', title: 'Inventory & Costs', breadcrumb: ['BOSSA Admin', 'Inventory & Costs'], primaryLabel: 'Add ingredient',
      emptyIcon: 'inventory', statusField: 'stockStatus',
      searchKeys: ['ingredient', 'supplier'],
      filterDefs: [{ key: 'stockStatus', options: ['OK', 'Low', 'Critical'] }, { key: 'supplier', options: Array.from(new Set(state.inventory.map(i => i.supplier))) }],
      columns: [
        { key: 'ingredient', label: 'Ingredient' }, { key: 'supplier', label: 'Supplier' }, { key: 'unit', label: 'Unit' },
        { key: 'currentStock', label: 'Current stock' }, { key: 'reorderLevel', label: 'Reorder level' },
        { key: 'unitCost', label: 'Unit cost', render: r => 'XCG ' + Number(r.unitCost).toFixed(2) },
        { key: 'lastPurchaseDate', label: 'Last purchase' }, { key: 'nextRequiredOrder', label: 'Next order due' }, { key: 'stockStatus', label: 'Status' }
      ],
      formFields: [
        { key: 'ingredient', label: 'Ingredient', required: true }, { key: 'supplier', label: 'Supplier' }, { key: 'unit', label: 'Unit' },
        { key: 'currentStock', label: 'Current stock', type: 'number' }, { key: 'reorderLevel', label: 'Reorder level', type: 'number' },
        { key: 'unitCost', label: 'Unit cost (XCG)', type: 'number' }, { key: 'lastPurchaseDate', label: 'Last purchase date', type: 'date' },
        { key: 'nextRequiredOrder', label: 'Next required order', type: 'date' }, { key: 'stockStatus', label: 'Stock status', type: 'select', options: ['OK', 'Low', 'Critical'] }
      ],
      extraActions: (r) => [
        React.createElement('button', { key: 'adj', className: 'adm-mini-btn', disabled: !editable, onClick: () => setAdjust(r) }, React.createElement(Icon, { name: 'inventory', size: 13 }), 'Adjust stock'),
        r.stockStatus !== 'OK' ? React.createElement('button', { key: 'reorder', className: 'adm-mini-btn', disabled: !editable, onClick: () => toast('Reorder request logged for ' + r.ingredient + ' (prototype).', 'success') }, 'Reorder') : null
      ]
    }),
    adjust ? React.createElement(Modal, {
      title: 'Adjust stock — ' + adjust.ingredient, onClose: () => setAdjust(null),
      footer: React.createElement(React.Fragment, null, React.createElement('button', { className: 'adm-btn-ghost', onClick: () => setAdjust(null) }, 'Cancel'), React.createElement('button', { className: 'adm-btn-primary', onClick: submitAdjust }, 'Save adjustment'))
    },
      React.createElement(Field, { label: 'Quantity change (use negative to remove, e.g. -3)' }, React.createElement(TextInput, { type: 'number', value: qty, onChange: e => setQty(e.target.value) })),
      React.createElement(Field, { label: 'Reason for adjustment' }, React.createElement(TextArea, { value: reason, onChange: e => setReason(e.target.value), placeholder: 'e.g. spoilage, supplier shortfall, recount' })),
      React.createElement('p', { style: { fontSize: 12, color: 'var(--adm-ink-muted)' } }, 'This creates an audit entry in Recent activity.')) : null);
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Inventory: InventoryScreen });
