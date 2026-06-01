'use client';

import Link, { LinkProps } from 'next/link';
import { MouseEvent, ReactNode } from 'react';
import {
  BossaEventName,
  BossaEventProperties,
  trackBossaEvent,
} from '../lib/analytics';

type TrackedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  eventName: BossaEventName;
  eventProperties?: BossaEventProperties;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function TrackedLink({
  children,
  eventName,
  eventProperties,
  onClick,
  ...linkProps
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackBossaEvent(eventName, eventProperties ?? {});

    onClick?.(event);
  };

  return (
    <Link
      {...linkProps}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
