'use client';

import { ReactNode } from 'react';
import TrackedLink from './TrackedLink';
import {
  BossaEventName,
  BossaEventProperties,
  buildWhatsAppUrl,
} from '../lib/analytics';

type WhatsAppButtonVariant = 'primary' | 'secondary' | 'ghost';

type WhatsAppButtonProps = {
  children: ReactNode;
  message: string;
  eventName: BossaEventName;
  eventProperties?: BossaEventProperties;
  phoneNumber?: string;
  className?: string;
  variant?: WhatsAppButtonVariant;
  openInNewTab?: boolean;
  ariaLabel?: string;
};

const variantClasses: Record<WhatsAppButtonVariant, string> = {
  primary:
    'inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-stone-950 shadow-lg shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-stone-950',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-amber-300/60 px-5 py-3 text-sm font-bold text-amber-100 transition hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-300/10 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-stone-950',
  ghost:
    'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-amber-100 underline-offset-4 transition hover:text-amber-200 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-stone-950',
};

function joinClassNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function WhatsAppButton({
  children,
  message,
  eventName,
  eventProperties,
  phoneNumber = '59995230683',
  className,
  variant = 'primary',
  openInNewTab = true,
  ariaLabel,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(message, phoneNumber);

  return (
    <TrackedLink
      href={href}
      eventName={eventName}
      eventProperties={{
        intent: 'order',
        cta_label: typeof children === 'string' ? children : ariaLabel,
        ...eventProperties,
      }}
      className={joinClassNames(variantClasses[variant], className)}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </TrackedLink>
  );
}
