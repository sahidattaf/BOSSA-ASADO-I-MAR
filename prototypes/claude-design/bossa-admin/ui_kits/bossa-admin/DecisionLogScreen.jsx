function DecisionLogScreen() {
  const { RecordsScreen } = window.BossaUI;
  return React.createElement(RecordsScreen, {
    collection: 'decisions', title: 'Decision Log', breadcrumb: ['BOSSA Admin', 'Decision Log'], primaryLabel: 'Log decision',
    emptyIcon: 'decisions', searchKeys: ['decisionId', 'decision', 'domain'], statusField: 'status',
    filterDefs: [{ key: 'domain', options: ['Production', 'Partners', 'Menu', 'Finance', 'Marketing', 'General'] }, { key: 'status', options: ['Active', 'Under review', 'Superseded'] }],
    columns: [
      { key: 'decisionId', label: 'Decision ID' }, { key: 'decision', label: 'Decision', wrap: true }, { key: 'domain', label: 'Domain' },
      { key: 'owner', label: 'Owner' }, { key: 'date', label: 'Date' }, { key: 'reason', label: 'Reason', wrap: true },
      { key: 'alternatives', label: 'Alternatives considered', wrap: true }, { key: 'expectedResult', label: 'Expected result', wrap: true },
      { key: 'reviewDate', label: 'Review date' }, { key: 'status', label: 'Status' }
    ],
    formFields: [
      { key: 'decisionId', label: 'Decision ID', required: true }, { key: 'decision', label: 'Decision', required: true, type: 'textarea' },
      { key: 'domain', label: 'Domain', type: 'select', options: ['Production', 'Partners', 'Menu', 'Finance', 'Marketing', 'General'] },
      { key: 'owner', label: 'Owner' }, { key: 'date', label: 'Date', type: 'date' }, { key: 'reason', label: 'Reason', type: 'textarea' },
      { key: 'alternatives', label: 'Alternatives considered', type: 'textarea' }, { key: 'expectedResult', label: 'Expected result', type: 'textarea' },
      { key: 'reviewDate', label: 'Review date', type: 'date' }, { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Under review', 'Superseded'], default: 'Active' }
    ]
  });
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { DecisionLog: DecisionLogScreen });
