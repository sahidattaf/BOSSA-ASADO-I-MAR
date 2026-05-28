# BOSSA v2.1 — Analytics and Lead Capture Planning

**Owner:** Sahid Attaf
**Status:** Planning — no production changes yet
**Branch:** docs/bossa-v2.1-analytics-leads-plan
**Last updated:** 2026-05-28

---

## Purpose

Define the full analytics and lead capture strategy for BOSSA Asado i Mar. This document covers:

- What to measure and why
- How to track WhatsApp CTA clicks without a backend
- How to capture leads when a guest takes action
- How outputs route to Supabase and Notion
- The phased implementation path

BOSSA's primary conversion channel is WhatsApp. Every analytics and lead capture decision should support that reality — not replace it.

---

## Goals

| Goal | Metric | Phase |
|---|---|---|
| Know which pages drive the most orders | Page views by route | 1 |
| Know which box cards convert to WhatsApp clicks | WA click events by box | 1–2 |
| Know which traffic sources bring buyers | UTM source attribution | 1 |
| Capture lead name + interest before they message | Optional lead form or click capture | 2–3 |
| Auto-log each deposit payment in Supabase | Stripe webhook → Supabase | 3 |
| Auto-create Notion client page on payment | Supabase → Notion API | 4 |

---

## Lead Capture Flow

```text
Guest visits bossaasado.com
  ↓
Page view logged (Vercel Analytics)
  ↓
Guest clicks a WhatsApp CTA (box order, reservation, party quote)
  ↓
Click event fires (GA4 custom event or Vercel Analytics custom event)
  ↓
Event captured: { page, cta_label, box_id, timestamp }
  ↓
Guest lands in WhatsApp with pre-filled message
  ↓
Guest sends message → BOSSA team receives
  ↓
[Phase 2] Staff logs lead manually in Notion
[Phase 3] WhatsApp Business API webhook → auto-inserts lead row in Supabase
  ↓
[Phase 4] Supabase trigger → Notion API → creates client setup page
```

### What counts as a lead

| Signal | Strength | Captured when |
|---|---|---|
| WhatsApp CTA click | Strong intent | Click event fires in browser |
| WhatsApp message sent | Confirmed intent | Staff sees message OR WA webhook captures |
| Deposit paid (Stripe) | Committed buyer | Stripe payment_intent.succeeded event |
| Party quote requested | High intent | WhatsApp CTA click from /party-menu |

---

## WhatsApp Click Tracking Strategy

WhatsApp URL parameters are stripped by WhatsApp — UTMs inside the `wa.me` link do not reach any tracking system. Click tracking must happen **before** the browser navigates away.

### Phase 1 — GA4 custom events (no backend, no Supabase)

Add `onclick` handlers to every WhatsApp CTA that fire a GA4 event before navigation:

```ts
// Conceptual — not yet implemented
function trackWhatsAppClick(params: {
  cta: string;       // 'order_box' | 'reservation' | 'party_quote' | 'general'
  box?: string;      // '#1' | '#2' | ... | '#8' | undefined
  page: string;      // '/' | '/weekend-fire' | '/party-menu'
}) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'whatsapp_click', {
      event_category: 'conversion',
      event_label: params.cta,
      box_id: params.box ?? 'general',
      page_path: params.page,
    });
  }
}
```

No Supabase, no server, no new packages. GA4 receives the event and shows it in real time.

### Phase 2 — Server-side click capture (with Supabase)

Replace direct `href` with a Next.js API route that:
1. Logs the click to Supabase `whatsapp_events` table
2. Returns a redirect to the WhatsApp deep link

```text
/api/wa?cta=order_box&box=1&page=weekend-fire
  → INSERT INTO whatsapp_events (cta, box_id, page, created_at)
  → 302 redirect to https://wa.me/59995230683?text=...
```

Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (insert-only, RLS enforced). **Do not implement until env variables are in Vercel.**

### Phase 3 — WhatsApp Business API webhook

When BOSSA activates WhatsApp Business API:
- Incoming messages trigger a webhook to a Supabase Edge Function
- Edge Function inserts a `leads` row: phone, first message, timestamp
- Row-Level Security prevents anon reads

This phase requires a WhatsApp Business API account — not available on the free WhatsApp tier.

---

## UTM Attribution Strategy

Track where BOSSA traffic comes from by adding UTM parameters to all outbound links from social, WhatsApp broadcasts, and Google.

### UTM parameter plan

| Source | Campaign | Medium | Where added |
|---|---|---|---|
| Instagram bio link | `instagram_bio` | `social` | Linktree or direct URL |
| Instagram story | `ig_story_[date]` | `social` | Story link sticker |
| WhatsApp broadcast | `wa_broadcast_[date]` | `messaging` | Broadcast message |
| Google Business Profile | `google_business` | `organic` | Profile website field |
| Partner referral | `[partner_name]` | `referral` | Partner-provided link |

### Example tagged URL

```text
https://www.bossaasado.com/weekend-fire?utm_source=instagram&utm_medium=social&utm_campaign=weekend_fire_launch
```

GA4 automatically captures UTM parameters from the URL. No code changes needed.

---

## Analytics Stack

| Tool | Purpose | Status |
|---|---|---|
| Vercel Analytics | Page views, route performance, Core Web Vitals | Ready to enable |
| GA4 | Custom events (WA clicks, conversions), attribution, audience | Requires setup |
| Supabase (phase 3) | Lead rows, WA event log, deposit records | Not yet configured |
| Stripe Dashboard | Payment history, deposit amounts, refunds | Active (test mode) |
| Notion | Client setup tasks, weekly review, decision log | Active |

---

## Notion Routing Plan

All analytics outputs and lead records route to the correct Notion section.

| Output | Notion destination |
|---|---|
| Weekly analytics summary | 02 — BOSSA Domain → Website → Analytics |
| New lead from WhatsApp | 02 — BOSSA Domain → Leads |
| New deposit received | 02 — BOSSA Domain → Payments |
| WhatsApp click report | 02 — BOSSA Domain → Website → Click Tracking |
| Stripe webhook event | 02 — BOSSA Domain → Payments |
| Client setup task (post-deposit) | 06 — Knowledge & Memory → Client Setup Tasks |

Notion entries are created manually (phase 1–2) or automatically via Supabase Edge Function calling the Notion API (phase 4).

---

## Implementation Phases

### Phase 1 — Tracking only (ready now, no new dependencies)

**Goal:** Understand traffic and WA click volume.

- [ ] Enable Vercel Analytics in Vercel dashboard → Project → Analytics (one click, no code)
- [ ] Create GA4 property for bossaasado.com
- [ ] Add GA4 measurement ID as `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel env
- [ ] Add GA4 `<script>` to `app/layout.tsx` using the measurement ID
- [ ] Add `onclick` event handlers to all WhatsApp CTAs (homepage, /weekend-fire, /party-menu)
- [ ] Set up UTM tagged links for Instagram, WhatsApp broadcast, Google Business
- [ ] Create GA4 custom event report: `whatsapp_click` by page and box

**Effort:** 0.5 days. No Supabase. No backend. No new packages.

---

### Phase 2 — Live Stripe deposit links

**Goal:** Allow committed guests to pay a deposit after WhatsApp confirmation.

- [ ] Create live Stripe Payment Links (see `docs/stripe-deposit-link-plan.md`)
- [ ] Add `NEXT_PUBLIC_STRIPE_WEEKEND_DEPOSIT_URL` to Vercel env
- [ ] Add `NEXT_PUBLIC_STRIPE_PARTY_DEPOSIT_URL` to Vercel env
- [ ] Update `app/data/payments.ts` to read from env vars
- [ ] Test all links in production
- [ ] Staff monitors Stripe Dashboard for incoming deposits
- [ ] Staff manually logs each deposit in Notion

**Effort:** 1 day (mostly Stripe dashboard + Vercel env config).

---

### Phase 3 — Supabase lead capture

**Goal:** Auto-log WA clicks and lead data without manual staff entry.

**Prerequisite:** Supabase project created, tables live, env variables in Vercel.

- [ ] Create Supabase project
- [ ] Apply schema from `docs/supabase-leads-schema.md`
- [ ] Add env variables to Vercel (names: see Required Env Variables below)
- [ ] Add `/api/wa` Next.js API route for click capture + redirect
- [ ] Replace direct WhatsApp hrefs with `/api/wa?...` links
- [ ] Verify RLS blocks anon reads on all tables
- [ ] Test: click box CTA → row appears in Supabase → WhatsApp opens correctly

**Effort:** 1–2 days. Depends on Supabase schema validation.

---

### Phase 4 — Stripe webhook → Supabase → Notion automation

**Goal:** Zero manual steps from deposit received to client setup task created.

- [ ] Create Supabase Edge Function: receives Stripe `payment_intent.succeeded` webhook
- [ ] Edge Function inserts `payments` row + upserts `leads` row
- [ ] Edge Function calls Notion API: creates client setup page in 06 — Knowledge & Memory
- [ ] Add `STRIPE_WEBHOOK_SECRET` to Supabase Edge Function secrets (not Vercel)
- [ ] Add `NOTION_API_KEY` and `NOTION_CLIENT_SETUP_DB_ID` to Edge Function secrets
- [ ] Test with Stripe CLI: `stripe trigger payment_intent.succeeded`

**Effort:** 2–3 days. Full automation, no manual steps post-payment.

---

## Required Env Variables (names only — no secrets)

### Vercel environment variables

| Variable | Scope | Purpose | Phase |
|---|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | GA4 property tracking ID | 1 |
| `NEXT_PUBLIC_STRIPE_WEEKEND_DEPOSIT_URL` | Public | Stripe Payment Link URL for weekend deposit | 2 |
| `NEXT_PUBLIC_STRIPE_PARTY_DEPOSIT_URL` | Public | Stripe Payment Link URL for party deposit | 2 |
| `NEXT_PUBLIC_STRIPE_CATERING_DEPOSIT_URL` | Public | Stripe Payment Link URL for catering deposit | 2 |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL | 3 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anon key (insert-only rows via RLS) | 3 |

### Supabase Edge Function secrets (never in Vercel, never in repo)

| Variable | Purpose | Phase |
|---|---|---|
| `STRIPE_WEBHOOK_SECRET` | Verify Stripe webhook signatures | 4 |
| `NOTION_API_KEY` | Write to Notion via API | 4 |
| `NOTION_CLIENT_SETUP_DB_ID` | Target Notion database for client pages | 4 |
| `SUPABASE_SERVICE_ROLE_KEY` | Allow Edge Function to bypass RLS for inserts | 4 |

**Rule:** `SUPABASE_SERVICE_ROLE_KEY` must never appear in Vercel environment variables, `next.config.mjs`, or any file in the repo. It only lives in Supabase Edge Function secrets.

---

## Test Checklist

### Phase 1 — Tracking

```text
[ ] Vercel Analytics shows page views for /, /weekend-fire, /party-menu
[ ] GA4 real-time shows active user when browsing bossaasado.com
[ ] GA4 events log shows 'whatsapp_click' event when a CTA is clicked
[ ] GA4 event parameters show correct box_id and page_path
[ ] UTM tagged Instagram link shows source=instagram in GA4 acquisition report
[ ] Vercel Analytics shows no performance regression vs pre-v2.1 build
```

### Phase 2 — Stripe links

```text
[ ] NEXT_PUBLIC_STRIPE_WEEKEND_DEPOSIT_URL loads a Stripe checkout page in live mode
[ ] Deposit amount, product name, and currency are correct
[ ] Payment disclaimer appears on the BOSSA website before the Stripe link
[ ] WhatsApp CTA remains visible alongside the Stripe button
[ ] Mobile: both buttons are usable on 390px viewport
[ ] Test payment completes and shows in Stripe Dashboard → Payments
[ ] Stripe Dashboard → Payments shows correct amount and customer email
```

### Phase 3 — Supabase

```text
[ ] /api/wa?cta=order_box&box=1&page=weekend-fire returns a 302 redirect
[ ] WhatsApp opens with the correct pre-filled message after redirect
[ ] Supabase Table Editor → whatsapp_events shows the click row
[ ] Anon read of whatsapp_events returns 0 rows (RLS blocks read)
[ ] No PII (name, phone) is captured in whatsapp_events — only click metadata
[ ] Supabase logs show no RLS violations on insert
```

### Phase 4 — Automation

```text
[ ] stripe trigger payment_intent.succeeded (Stripe CLI) fires correctly
[ ] Supabase Edge Function logs show the webhook received and processed
[ ] payments row created in Supabase with correct amount and stripe_session_id
[ ] leads row created or updated in Supabase
[ ] Notion client setup page created in 06 — Knowledge & Memory → Client Setup Tasks
[ ] Notion page has correct client name, email, product, and status = 'Not started'
[ ] Full cycle test: pay real deposit → Supabase row → Notion page → no manual steps needed
```

---

## Decision Log

Record these decisions before moving to Phase 2:

| Decision | Options | Status |
|---|---|---|
| GA4 property created? | Yes / No | Pending |
| GA4 measurement ID added to Vercel | Yes / No | Pending |
| Weekend deposit amount confirmed | XCG 25 / Other | Pending |
| Party deposit amount confirmed | XCG 100 / Other | Pending |
| Currency for Stripe (ANG/USD/EUR) | TBD | Pending |
| Stripe live mode activated | Yes / No | Pending |
| Supabase project created | Yes / No | Pending |

Record decisions in `sahid-ai-clone-pack/memory/decisions.md` and Notion → 01 — Command Center → Decision Log.
