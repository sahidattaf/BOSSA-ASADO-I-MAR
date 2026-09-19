const ICON_PATHS = {
  home: 'M3 11.5 12 4l9 7.5 M5.5 10v9.5h13V10',
  orders: 'M4 4h12l4 4v12H4z M4 4v16 M8 9h8 M8 13h8 M8 17h5',
  reservations: 'M4 5h16v15H4z M4 9h16 M8 3v4 M16 3v4 M8 14h2 M8 17h2 M14 14h2 M14 17h2',
  menu: 'M6 3v8a3 3 0 0 0 6 0V3 M9 11v10 M17 3c-2 2-2 5 0 7v10',
  production: 'M4 20h16 M6 20V9l4-3v3l4-3v3l4-3v14',
  inventory: 'M3 8l9-5 9 5-9 5-9-5z M3 8v9l9 5 9-5V8 M12 13v9',
  customers: 'M8 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M3 20c0-3 2.5-5 5-5s5 2 5 5 M16 8.5a3 3 0 1 0 0-6 M15 20c0-2.5 1.7-4.4 4-4.9',
  content: 'M6 3h9l3 3v15H6z M15 3v3h3 M9 12h6 M9 16h6',
  analytics: 'M4 20h16 M7 20v-6 M12 20v-11 M17 20v-8',
  tasks: 'M5 5h14v14H5z M8.5 12l2 2 4-4.5 M8 6.5h8',
  decisions: 'M7 3h10v18H7z M9 3v3h6V3 M9 11h6 M9 15h6',
  settings: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M19.4 13a7.5 7.5 0 0 0 0-2l1.8-1.4-1.7-2.9-2.1.6a7.6 7.6 0 0 0-1.8-1l-.3-2.2h-3.4l-.3 2.2a7.6 7.6 0 0 0-1.8 1l-2.1-.6-1.7 2.9L6.6 13a7.5 7.5 0 0 0 0 2l-1.8 1.4 1.7 2.9 2.1-.6a7.6 7.6 0 0 0 1.8 1l.3 2.2h3.4l.3-2.2a7.6 7.6 0 0 0 1.8-1l2.1.6 1.7-2.9z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-4.5-4.5',
  bell: 'M6 9a6 6 0 0 1 12 0v5l2 3H4l2-3z M10 20a2 2 0 0 0 4 0',
  chevron: 'M6 9l6 6 6-6',
  chevronLeft: 'M15 5l-7 7 7 7',
  plus: 'M12 5v14 M5 12h14',
  x: 'M6 6l12 12 M18 6 6 18',
  edit: 'M4 17.5 16.5 5a2 2 0 0 1 3 3L7 20.5 3 21z',
  archive: 'M3 6h18 M4 6v14h16V6 M9 10h6',
  whatsapp: 'M7 4a13 13 0 0 0 0 16 M17 4a13 13 0 0 1 0 16 M5 8h1.5 M17.5 8H19 M5 16h1.5 M17.5 16H19',
  filter: 'M4 5h16 M7 12h10 M10 19h4',
  download: 'M12 3v12 M7 11l5 5 5-5 M5 20h14',
  hamburger: 'M4 6h16 M4 12h16 M4 18h16',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 20c0-4 3.5-7 8-7s8 3 8 7',
  wifi: 'M5 12a10 10 0 0 1 14 0 M8 15a6 6 0 0 1 8 0 M11.5 18h1',
  boxLoc: 'M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  fire: 'M12 3c1 3-3 4-3 7a3 3 0 0 0 6 0c1.5 1 2 3 2 4.5a5 5 0 1 1-10 0C7 10 12 8 12 3z',
  trend: 'M4 17l5-6 4 3 6-8 M14 6h5v5'
};
function Icon({ name, size = 18, style, className }) {
  const d = ICON_PATHS[name] || ICON_PATHS.home;
  return React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', style, className },
    React.createElement('path', { d }));
}
window.BossaIcons = { Icon };
