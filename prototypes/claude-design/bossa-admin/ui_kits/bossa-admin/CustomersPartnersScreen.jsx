function CustomersPartnersScreen() {
  const { RecordsScreen, DataTag, useStore } = window.BossaUI;
  const state = useStore();
  return React.createElement(RecordsScreen, {
    collection: 'customers', title: 'Customers & Partners', breadcrumb: ['BOSSA Admin', 'Customers & Partners'], primaryLabel: 'Add contact',
    emptyIcon: 'customers', searchKeys: ['contact', 'organization', 'phone', 'email'],
    filterDefs: [{ key: 'segment', options: ['Restaurant Customer', 'Hotel', 'Airbnb Host', 'Tour Operator', 'Event Client', 'Supplier'] }, { key: 'relationshipStage', options: Array.from(new Set(state.customers.map(c => c.relationshipStage))) }],
    columns: [
      { key: 'contact', label: 'Contact' }, { key: 'organization', label: 'Organization' }, { key: 'segment', label: 'Segment' },
      { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'relationshipStage', label: 'Relationship stage' },
      { key: 'lastContact', label: 'Last contact' }, { key: 'nextFollowUp', label: 'Next follow-up' },
      { key: 'revenueAttributed', label: 'Revenue attributed', render: r => 'XCG ' + Number(r.revenueAttributed || 0).toFixed(2) },
      { key: 'dataTag', label: 'Source', render: r => React.createElement(DataTag, { tag: r.dataTag }) }
    ],
    formFields: [
      { key: 'contact', label: 'Contact name', required: true }, { key: 'organization', label: 'Organization' },
      { key: 'segment', label: 'Segment', type: 'select', options: ['Restaurant Customer', 'Hotel', 'Airbnb Host', 'Tour Operator', 'Event Client', 'Supplier'] },
      { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' },
      { key: 'relationshipStage', label: 'Relationship stage', type: 'select', options: ['Prospect', 'Active partner', 'Active supplier', 'Repeat', 'Dormant'] },
      { key: 'lastContact', label: 'Last contact', type: 'date' }, { key: 'nextFollowUp', label: 'Next follow-up', type: 'date' },
      { key: 'revenueAttributed', label: 'Revenue attributed (XCG)', type: 'number' }, { key: 'notes', label: 'Notes', type: 'textarea' }
    ]
  });
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { CustomersPartners: CustomersPartnersScreen });
