function MenuScreen() {
  const { RecordsScreen, Icon, DataTag, useToast, useStore, canEdit, Modal } = window.BossaUI;
  const toast = useToast();
  const state = useStore();
  const editable = canEdit(state.role);
  const [priceConfirm, setPriceConfirm] = React.useState(null);

  return React.createElement(React.Fragment, null,
    React.createElement(RecordsScreen, {
      collection: 'menuItems', title: 'Menu & Fire Boxes', breadcrumb: ['BOSSA Admin', 'Menu & Fire Boxes'], primaryLabel: 'Add item',
      emptyIcon: 'menu', emptySub: 'Menu items sync from the BOSSA site data set; add local-only items here.',
      searchKeys: ['item', 'category', 'description'],
      filterDefs: [{ key: 'category', options: ['Weekend Fire Boxes', 'Skewers / Pinchos', 'Fire Bread Sandwiches', 'Sides & Add-ons', 'Soups & Stews', 'Drinks / Bebidas'] }],
      columns: [
        { key: 'item', label: 'Menu item' }, { key: 'category', label: 'Category' }, { key: 'description', label: 'Description', wrap: true },
        { key: 'price', label: 'Selling price', render: r => React.createElement('span', null, r.price != null ? 'XCG ' + Number(r.price).toFixed(2) : '—', ' ', React.createElement(DataTag, { tag: r.priceDataTag || 'verified' })) },
        { key: 'foodCost', label: 'Est. food cost', render: r => React.createElement('span', null, r.foodCost != null ? 'XCG ' + Number(r.foodCost).toFixed(2) : 'Needs confirmation', ' ', React.createElement(DataTag, { tag: r.foodCostDataTag || 'needs-confirmation' })) },
        { key: 'margin', label: 'Margin', render: r => r.foodCost != null && r.price ? Math.round((1 - r.foodCost / r.price) * 100) + '%' : 'Needs confirmation' },
        { key: 'availability', label: 'Available', render: r => r.availability ? 'Yes' : 'No' },
        { key: 'featured', label: 'Featured', render: r => r.featured ? '★ Featured' : '' },
        { key: 'lastUpdated', label: 'Last updated' }
      ],
      formFields: [
        { key: 'item', label: 'Menu item', required: true }, { key: 'category', label: 'Category', type: 'select', options: ['Weekend Fire Boxes', 'Skewers / Pinchos', 'Fire Bread Sandwiches', 'Sides & Add-ons', 'Soups & Stews', 'Drinks / Bebidas'] },
        { key: 'description', label: 'Description', type: 'textarea' }, { key: 'price', label: 'Selling price (XCG)', type: 'number' },
        { key: 'foodCost', label: 'Estimated food cost (XCG)', type: 'number' }, { key: 'availability', label: 'Available now', type: 'toggle', default: true },
        { key: 'featured', label: 'Featured item', type: 'toggle' }, { key: 'image', label: 'Image URL / reference' }
      ],
      extraActions: (r, { toast: t }) => [
        React.createElement('button', { key: 'av', className: 'adm-mini-btn', disabled: !editable, onClick: () => { window.BossaAdminStore.updateRecord('menuItems', r.id, { availability: !r.availability }); t('Availability toggled.', 'success'); } }, r.availability ? 'Mark 86\'d' : 'Mark available'),
        React.createElement('button', { key: 'hist', className: 'adm-mini-btn', onClick: () => setPriceConfirm(r) }, React.createElement(Icon, { name: 'content', size: 13 }), 'History')
      ]
    }),
    priceConfirm ? React.createElement(Modal, { title: 'Change history — ' + priceConfirm.item, onClose: () => setPriceConfirm(null) },
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        (priceConfirm.changeHistory || []).map((h, i) => React.createElement('div', { key: i, style: { fontSize: 13, borderBottom: '1px solid var(--adm-line)', paddingBottom: 6 } },
          React.createElement('strong', null, h.at), ' — ', h.note)),
        React.createElement('p', { style: { fontSize: 12, color: 'var(--adm-ink-muted)' } }, 'Prices are sourced from the BOSSA site menu data set (verified). Food cost and margin are not published in that source and require confirmation before being presented as fact.'))) : null);
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Menu: MenuScreen });
