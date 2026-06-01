'use client';

import { useEffect } from 'react';
import { createBossaLead, type BossaLeadInput } from '../lib/leads';

type WindowWithGtag = Window & {
  gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
};

type WhatsAppTrackingParams = {
  cta_source: string;
  cta_label: string;
  offer_id: string;
  page: string;
  timestamp: string;
};

/**
 * Sends a bossa_whatsapp_click event to GA4 if window.gtag is available.
 * Falls back to a clean dev-only console message when gtag is absent.
 * No external packages. No secrets. Browser-only.
 */
function sendEvent(params: WhatsAppTrackingParams) {
  if (typeof window === 'undefined') return;

  const { gtag } = window as WindowWithGtag;

  if (typeof gtag === 'function') {
    gtag('event', 'bossa_whatsapp_click', {
      event_category: 'whatsapp',
      cta_source: params.cta_source,
      cta_label: params.cta_label,
      ...(params.offer_id ? { offer_id: params.offer_id } : {}),
      page_path: params.page,
    });
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[BOSSA track] bossa_whatsapp_click', params);
  }
}

function inferLeadInput(params: WhatsAppTrackingParams): BossaLeadInput {
  const source = params.cta_source;
  const label = params.cta_label;
  const page = params.page;
  const offerId = params.offer_id;

  if (source === 'weekend-fire' || page.includes('/weekend-fire')) {
    return {
      source_page: page,
      lead_type: 'weekend_fire_order',
      intent: 'order',
      offer: 'weekend_fire',
      box_number: offerId || undefined,
      metadata: {
        cta_source: source,
        cta_label: label,
      },
    };
  }

  if (source === 'party-menu' || page.includes('/party-menu')) {
    return {
      source_page: page,
      lead_type: 'party_event_quote',
      intent: 'party_quote',
      offer: 'party_event',
      item_name: offerId || undefined,
      metadata: {
        cta_source: source,
        cta_label: label,
      },
    };
  }

  if (label.includes('reservation')) {
    return {
      source_page: page,
      lead_type: 'reservation',
      intent: 'reserve',
      offer: 'reservation',
      metadata: {
        cta_source: source,
        cta_label: label,
      },
    };
  }

  return {
    source_page: page,
    lead_type: 'general_inquiry',
    intent: 'contact',
    offer: offerId || undefined,
    metadata: {
      cta_source: source,
      cta_label: label,
    },
  };
}

function createLeadFromClick(params: WhatsAppTrackingParams) {
  const leadInput = inferLeadInput(params);

  createBossaLead(leadInput).catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('[BOSSA leads] WhatsApp lead capture failed', error);
    }
  });
}

/**
 * Mounted once in the root layout. Uses event delegation on document so it
 * works across all pages without per-page imports.
 *
 * Tracks any click on an element (or its ancestor) that carries:
 *   data-track="whatsapp-click"
 *   data-cta-source   — page / section origin
 *   data-cta-label    — action name
 *   data-offer-id     — box or package identifier (optional)
 */
export default function WhatsAppClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      let el = e.target as HTMLElement | null;

      while (el && el !== document.documentElement) {
        if (el.dataset.track === 'whatsapp-click') {
          const params = {
            cta_source: el.dataset.ctaSource ?? 'unknown',
            cta_label: el.dataset.ctaLabel ?? 'unknown',
            offer_id: el.dataset.offerId ?? '',
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
          };

          sendEvent(params);
          createLeadFromClick(params);
          break;
        }
        el = el.parentElement;
      }
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
