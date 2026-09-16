'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

export function MobileSectionNav() {
  const links = [
    ['Order', '#order'],
    ['Menu', '#menu'],
    ['Weekend Fire', '#weekend-fire'],
    ['Catering', '#party'],
    ['Videos', '#videos'],
    ['Location', '#location'],
  ];

  return (
    <nav className="mobile-section-nav" aria-label="Homepage sections">
      {links.map(([label, href]) => (
        <a key={href} href={href}>{label}</a>
      ))}
    </nav>
  );
}

export function MobileDisclosure({ title, summary, children, defaultOpen = false }: { title: string; summary?: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`mobile-disclosure${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="mobile-disclosure-trigger"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>
          <strong>{title}</strong>
          {summary ? <small>{summary}</small> : null}
        </span>
        <span className="mobile-disclosure-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="mobile-disclosure-panel" hidden={!open}>{children}</div>
    </div>
  );
}
