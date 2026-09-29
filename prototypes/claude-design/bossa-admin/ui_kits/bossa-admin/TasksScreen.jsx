function TasksScreen() {
  const { RecordsScreen, useStore } = window.BossaUI;
  const state = useStore();
  return React.createElement(RecordsScreen, {
    collection: 'tasks', title: 'Tasks', breadcrumb: ['BOSSA Admin', 'Tasks'], primaryLabel: 'Add task',
    emptyIcon: 'tasks', searchKeys: ['task', 'owner', 'relatedRecord'], statusField: 'status',
    filterDefs: [{ key: 'domain', options: Array.from(new Set(state.tasks.map(t => t.domain))) }, { key: 'priority', options: ['Low', 'Medium', 'High', 'Critical'] }, { key: 'status', options: ['Open', 'In progress', 'Scheduled', 'Done'] }],
    columns: [
      { key: 'task', label: 'Task', wrap: true }, { key: 'owner', label: 'Owner' }, { key: 'domain', label: 'Domain' },
      { key: 'priority', label: 'Priority' }, { key: 'dueDate', label: 'Due date' }, { key: 'status', label: 'Status' },
      { key: 'relatedRecord', label: 'Related record' }, { key: 'blocker', label: 'Blocker', wrap: true }, { key: 'nextAction', label: 'Next action', wrap: true }
    ],
    formFields: [
      { key: 'task', label: 'Task', required: true, type: 'textarea' }, { key: 'owner', label: 'Owner', type: 'select', options: ['Owner/Admin', 'Manager', 'Kitchen', 'Marketing', 'Finance'] },
      { key: 'domain', label: 'Domain', type: 'select', options: ['Orders', 'Menu', 'Production', 'Inventory', 'Partners', 'Content', 'Finance', 'General'] },
      { key: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
      { key: 'dueDate', label: 'Due date', type: 'date' }, { key: 'status', label: 'Status', type: 'select', options: ['Open', 'In progress', 'Scheduled', 'Done'], default: 'Open' },
      { key: 'relatedRecord', label: 'Related record' }, { key: 'blocker', label: 'Blocker' }, { key: 'nextAction', label: 'Next action' }
    ]
  });
}
window.BossaScreens = Object.assign(window.BossaScreens || {}, { Tasks: TasksScreen });
