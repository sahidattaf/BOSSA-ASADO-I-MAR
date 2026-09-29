function ContentScreen() {
  const { RecordsScreen, DataTag, useStore } = window.BossaUI;
  const state = useStore();
  return React.createElement(RecordsScreen, {
    collection: 'content', title: 'Content', breadcrumb: ['BOSSA Admin', 'Content'], primaryLabel: 'Add content item',
    emptyIcon: 'content', searchKeys: ['campaign', 'contentItem', 'campaignId'],
    filterDefs: [{ key: 'platform', options: Array.from(new Set(state.content.map(c => c.platform))) }, { key: 'productionStatus', options: ['In production', 'Scheduled', 'Published'] }],
    statusField: 'productionStatus',
    columns: [
      { key: 'campaignId', label: 'Campaign ID' }, { key: 'campaign', label: 'Campaign' }, { key: 'contentItem', label: 'Content item' },
      { key: 'platform', label: 'Platform' }, { key: 'owner', label: 'Owner' }, { key: 'productionStatus', label: 'Status' },
      { key: 'publishDate', label: 'Publish date' }, { key: 'cta', label: 'CTA' }, { key: 'linkedOffer', label: 'Linked offer', wrap: true },
      { key: 'performance', label: 'Performance', render: r => r.performance === 'Needs confirmation' ? React.createElement(DataTag, { tag: 'needs-confirmation' }) : r.performance }
    ],
    formFields: [
      { key: 'campaignId', label: 'Campaign ID', required: true }, { key: 'campaign', label: 'Campaign', required: true },
      { key: 'contentItem', label: 'Content item', required: true }, { key: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'WhatsApp', 'Print / Email', 'TikTok', 'Website'] },
      { key: 'owner', label: 'Owner' }, { key: 'productionStatus', label: 'Production status', type: 'select', options: ['In production', 'Scheduled', 'Published'], default: 'In production' },
      { key: 'publishDate', label: 'Publish date', type: 'date' }, { key: 'cta', label: 'CTA' }, { key: 'linkedOffer', label: 'Linked offer' }, { key: 'performance', label: 'Performance note' }
    ]
  });
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Content: ContentScreen });
