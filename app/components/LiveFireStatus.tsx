'use client';

import { useEffect, useState } from 'react';

interface FireStatus {
  live: boolean;
  label: string;
  sub: string;
}

/**
 * Derives fire status from Curaçao time (AST = UTC−4, no DST).
 * Fire is Live: Thursday–Sunday 12:00–22:00 AST.
 */
function getCuracaoFireStatus(): FireStatus {
  const now = new Date();
  // Shift to AST (UTC−4) without relying on the visitor's local timezone
  const astDate = new Date(now.getTime() - 4 * 60 * 60 * 1000);
  const day = astDate.getUTCDay(); // 0 Sun · 4 Thu · 5 Fri · 6 Sat
  const hour = astDate.getUTCHours();
  const minute = astDate.getUTCMinutes();
  const timeDecimal = hour + minute / 60;

  const isFireDay = day === 0 || day === 4 || day === 5 || day === 6;
  const isFireTime = timeDecimal >= 12 && timeDecimal < 22;
  const live = isFireDay && isFireTime;

  return {
    live,
    label: live ? '🔥 Fire is Live' : '💤 Smoke is Resting',
    sub: live ? 'Open now · Order on WhatsApp' : 'Thu–Sun · 12:00–22:00',
  };
}

/**
 * Lightweight client component showing live open/closed status based on
 * BOSSA operating hours in Curaçao (AST, UTC−4). No external packages.
 * Renders null during SSR to prevent hydration mismatch.
 */
export default function LiveFireStatus() {
  const [status, setStatus] = useState<FireStatus | null>(null);

  useEffect(() => {
    setStatus(getCuracaoFireStatus());
    const timer = setInterval(() => setStatus(getCuracaoFireStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!status) return null;

  return (
    <div
      className={`fire-status${status.live ? ' fire-status--live' : ' fire-status--resting'}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="fire-status-label">{status.label}</span>
      <span className="fire-status-sub">{status.sub}</span>
    </div>
  );
}
