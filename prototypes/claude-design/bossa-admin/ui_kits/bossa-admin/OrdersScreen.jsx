function OrdersScreen() {
  const { RecordsScreen, Icon, DataTag, useToast, useStore, canEdit } = window.BossaUI;
  const toast = useToast();
  const state = useStore();
  const editable = canEdit(state.role);
  const fmt = iso => { try { return new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return iso; } };
  return React.createElement(RecordsScreen, {
    collection: 'orders', title: 'Orders', breadcrumb: ['BOSSA Admin', 'Orders'], primaryLabel: 'Add order',
    statusField: 'prepStatus', emptyIcon: 'orders', emptySub: 'Orders placed via WhatsApp, phone or partner portal will appear here.',
    searchKeys: ['id', 'customer', 'phone', 'items'],
    filterDefs: [
      { key: 'prepStatus', options: ['New', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'] },
      { key: 'channel', options: ['WhatsApp', 'Phone', 'Walk-in', 'Partner Portal'] }
    ],
    columns: [
      { key: 'id', label: 'Order ID' }, { key: 'customer', label: 'Customer' }, { key: 'phone', label: 'Phone' },
      { key: 'channel', label: 'Channel' }, { key: 'items', label: 'Items', wrap: true }, { key: 'fulfillment', label: 'Fulfillment' },
      { key: 'dateTime', label: 'Date / time', render: r => fmt(r.dateTime) }, { key: 'total', label: 'Total', render: r => 'XCG ' + Number(r.total).toFixed(2) },
      { key: 'paymentStatus', label: 'Payment' }, { key: 'prepStatus', label: 'Prep status' }, { key: 'assignee', label: 'Assigned to' },
      { key: 'dataTag', label: 'Source', render: r => React.createElement(DataTag, { tag: r.dataTag }) }
    ],
    formFields: [
      { key: 'customer', label: 'Customer', required: true }, { key: 'phone', label: 'Phone' },
      { key: 'channel', label: 'Order channel', type: 'select', options: ['WhatsApp', 'Phone', 'Walk-in', 'Partner Portal'], default: 'WhatsApp' },
      { key: 'items', label: 'Items', type: 'textarea', required: true },
      { key: 'fulfillment', label: 'Pickup / delivery', type: 'select', options: ['Pickup', 'Delivery'], default: 'Pickup' },
      { key: 'total', label: 'Total (XCG)', type: 'number', required: true },
      { key: 'paymentStatus', label: 'Payment status', type: 'select', options: ['Unpaid', 'Paid', 'Invoiced'], default: 'Unpaid' },
      { key: 'prepStatus', label: 'Preparation status', type: 'select', options: ['New', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'], default: 'New' },
      { key: 'assignee', label: 'Assigned team member' }, { key: 'notes', label: 'Notes', type: 'textarea' }
    ],
    extraActions: (r) => [
      React.createElement('button', { key: 'dup', className: 'adm-mini-btn', disabled: !editable, onClick: () => { window.BossaAdminStore.addRecord('orders', Object.assign({}, r, { id: undefined, prepStatus: 'New' })); toast('Order duplicated.', 'success'); } }, 'Duplicate'),
      r.paymentStatus !== 'Paid' ? React.createElement('button', { key: 'pay', className: 'adm-mini-btn', disabled: !editable, onClick: () => { window.BossaAdminStore.updateRecord('orders', r.id, { paymentStatus: 'Paid' }); toast('Marked as paid.', 'success'); } }, React.createElement(Icon, { name: 'tasks', size: 13 }), 'Mark paid') : null,
      React.createElement('a', { key: 'wa', className: 'adm-mini-btn', href: 'https://wa.me/' + String(r.phone || '').replace(/[^\d]/g, ''), target: '_blank', rel: 'noreferrer', style: { textDecoration: 'none' } }, React.createElement(Icon, { name: 'whatsapp', size: 13 }), 'WhatsApp'),
      React.createElement('button', { key: 'print', className: 'adm-mini-btn', onClick: () => toast('Print summary — prototype placeholder.', 'default') }, React.createElement(Icon, { name: 'download', size: 13 }), 'Print')
    ]
  });
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Orders: OrdersScreen });
