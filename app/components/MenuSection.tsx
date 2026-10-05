'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

type MenuSectionProps = {
  id: string;
  title: string;
  note: string;
  itemCount: number;
  defaultOpen: boolean;
  children: ReactNode;
};

export default function MenuSection({ id, title, note, itemCount, defaultOpen, children }: MenuSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `${id}-content`;

  return (
    <div className={`menu-section${open ? ' is-open' : ''}`} id={id}>
      <button
        type="button"
        className="menu-section-summary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>
          <strong>{title}</strong>
          <small>{note}</small>
        </span>
        <span className="menu-section-count">{itemCount} items</span>
      </button>
      <div className="menu-section-content" id={panelId}>{children}</div>
    </div>
  );
}
