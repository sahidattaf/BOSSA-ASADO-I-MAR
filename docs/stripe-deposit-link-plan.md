# BOSSA Stripe Deposit Link Plan — v2.1

**Owner:** Sahid Attaf
**Status:** Planning — live links not yet created
**Builds on:** `docs/bossa-stripe-payment-plan.md` (original strategy)
**Last updated:** 2026-05-28

---

## Purpose

Define the production Stripe Payment Link setup, env variable names, webhook integration plan, and test checklist for BOSSA deposit links. This document covers the implementation detail; the strategy rationale is in `docs/bossa-stripe-payment-plan.md`.

**Read that doc first** for: payment philosophy, product decisions, currency decisions, disclaimer wording, and what Sahid must approve before going live.

---

## Stripe Account Readiness

Before creating live Payment Links:

```text
[ ] Stripe account is in Live mode (not Test mode) for production
[ ] Business name matches: BOSSA Asado i Mar
[ ] Bank account connected and verified in Stripe
[ ] Currency supported and confirmed (ANG/XCG is not a native Stripe currency —
    use EUR or USD with a note explaining the local equivalent)
[ ] Payout schedule reviewed (Stripe default: 2-day rolling)
[ ] Refund policy decided and entered in Stripe settings
[ ] Support email and support phone added to Stripe account settings
```

---

## Payment Links to Create

Create these in Stripe Dashboard → Payment Links → New Payment Link.

### 1. Weekend Fire Pre-order Deposit

| Field | Value |
|---|---|
| Product name | BOSSA Weekend Fire Deposit |
| Description | Reserve a batch. Confirm availability with BOSSA on WhatsApp first. |
| Price | Decided by Coach Sahid — see `docs/bossa-stripe-payment-plan.md` |
| Currency | EUR or USD (Stripe-supported equivalent of ANG) |
| Quantity | Fixed at 1 |
| Customer email collection | Required |
| Confirmation page | Custom: "Your deposit is confirmed. Please send your pickup time and box number on WhatsApp: +5999 523 0683" |
| Env variable name | `NEXT_PUBLIC_STRIPE_WEEKEND_DEPOSIT_URL` |

### 2. Party / Event Deposit

| Field | Value |
|---|---|
| Product name | BOSSA Party & Event Deposit |
| Description | Lock your event date after BOSSA confirms availability. WhatsApp confirmation required before payment. |
| Price | Decided by Coach Sahid |
| Currency | EUR or USD |
| Quantity | Fixed at 1 |
| Customer email collection | Required |
| Confirmation page | Custom: "Deposit received. BOSSA will WhatsApp you within 24 hours to confirm your event details." |
| Env variable name | `NEXT_PUBLIC_STRIPE_PARTY_DEPOSIT_URL` |

### 3. Private Catering Deposit

| Field | Value |
|---|---|
| Product name | BOSSA Private Catering Deposit |
| Description | Secure your private fire experience date. Human approval required — contact BOSSA on WhatsApp before paying. |
| Price | Decided by Coach Sahid |
| Currency | EUR or USD |
| Quantity | Fixed at 1 |
| Customer email collection | Required |
| Confirmation page | Custom: "Catering deposit received. Sahid will contact you directly within 24 hours." |
| Env variable name | `NEXT_PUBLIC_STRIPE_CATERING_DEPOSIT_URL` |

---

## Env Variable Plan

### Vercel — add these after Payment Links are created

| Variable | Value | When to add |
|---|---|---|
| `NEXT_PUBLIC_STRIPE_WEEKEND_DEPOSIT_URL` | Live Stripe Payment Link URL | After link is created and tested |
| `NEXT_PUBLIC_STRIPE_PARTY_DEPOSIT_URL` | Live Stripe Payment Link URL | After link is created and tested |
| `NEXT_PUBLIC_STRIPE_CATERING_DEPOSIT_URL` | Live Stripe Payment Link URL | After link is created and tested |

**Never add these to Vercel:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`. These go only in Supabase Edge Function secrets (Phase 4).

### Code integration — `app/data/payments.ts`

After env variables are confirmed in Vercel, update `payments.ts` to read from env:

```ts
// Conceptual — not yet in production
export const paymentLinks = {
  weekendDeposit: {
    href: process.env.NEXT_PUBLIC_STRIPE_WEEKEND_DEPOSIT_URL ?? '#',
    label: 'Pay Weekend Deposit',
    amount: 'See confirmation',
    note: 'Confirm availability on WhatsApp before paying.',
  },
  partyDeposit: {
    href: process.env.NEXT_PUBLIC_STRIPE_PARTY_DEPOSIT_URL ?? '#',
    label: 'Pay Event Deposit',
    amount: 'See confirmation',
    note: 'WhatsApp confirmation required before payment.',
  },
  cateringDeposit: {
    href: process.env.NEXT_PUBLIC_STRIPE_CATERING_DEPOSIT_URL ?? '#',
    label: 'Secure Catering Date',
    amount: 'See confirmation',
    note: 'Human approval required. Contact BOSSA on WhatsApp first.',
  },
};
```

If env variable is missing (e.g., in local dev), `href: '#'` prevents broken links.

---

## Stripe Webhook Plan (Phase 4)

When Supabase is live and a Stripe webhook handler is ready:

### Webhook endpoint

```text
https://[supabase-project-ref].supabase.co/functions/v1/stripe-webhook
```

Do not use a Next.js API route for webhooks — Edge Functions on Supabase are better suited for long-running webhook processing and can hold the `STRIPE_WEBHOOK_SECRET` as a secret.

### Events to subscribe to

| Event | Why |
|---|---|
| `payment_intent.succeeded` | Primary deposit success signal |
| `checkout.session.completed` | Backup for checkout-flow completions |
| `payment_intent.payment_failed` | Log failed attempts |
| `charge.refunded` | Update payment status in Supabase |

### Webhook handler logic (Phase 4 pseudocode)

```text
1. Verify Stripe signature using STRIPE_WEBHOOK_SECRET
2. Parse event type
3. On payment_intent.succeeded:
   a. Extract: amount, currency, customer_email, customer_name, payment_intent_id
   b. INSERT into payments table (idempotent: ON CONFLICT DO NOTHING on stripe_payment_intent_id)
   c. UPSERT into leads table if email matches existing lead
   d. Call Notion API: create client setup page in 06 — Knowledge & Memory → Client Setup Tasks
   e. Return 200
4. On payment_intent.payment_failed:
   a. Log to payments with status = 'failed'
   b. Return 200
5. On charge.refunded:
   a. Update payments row: payment_status = 'refunded'
   b. Return 200
```

**Idempotency rule:** Every database write uses `ON CONFLICT DO NOTHING` or `ON CONFLICT DO UPDATE` on a unique key. Stripe may deliver the same webhook more than once.

---

## On-Site Disclaimer Requirements

Every page that shows a Stripe payment button must display this disclaimer:

> **Confirm availability on WhatsApp before paying a deposit.**
> Deposits reserve preparation capacity only after BOSSA staff confirmation.
> Payment does not guarantee availability.

Short version (below the button):

> Confirm on WhatsApp first. Pay deposit only after BOSSA confirms availability.

The disclaimer must be visible without scrolling on mobile (390px viewport). Do not hide it behind a toggle or modal.

---

## Payment Flow from Guest Perspective

```text
Guest visits /weekend-fire or /party-menu
  ↓
Guest reads menu / boxes / packages
  ↓
Guest clicks "Confirm on WhatsApp" (primary CTA)
  ↓
Guest sends WhatsApp message
  ↓
BOSSA team confirms availability
  ↓
BOSSA team shares deposit link (or guest clicks it on the website)
  ↓
Guest clicks Stripe Payment Link
  ↓
Guest completes checkout on Stripe hosted page (HTTPS, PCI-compliant)
  ↓
Stripe sends confirmation email to guest
  ↓
[Phase 4] Stripe webhook fires → Supabase payments row → Notion client page
  ↓
BOSSA team sees deposit in Stripe Dashboard + Notion
  ↓
BOSSA team prepares order / confirms event
```

---

## Test Checklist

### Before going live

```text
[ ] Stripe account is in Live mode
[ ] All three Payment Links created and tested in Stripe Test mode
[ ] Stripe Test mode: complete a payment for each link → confirm test payment appears
[ ] Payment Link confirmation page text is correct
[ ] Currency is correct and supported
[ ] Amount is correct and confirmed by Coach Sahid
```

### After adding to Vercel and website

```text
[ ] NEXT_PUBLIC_STRIPE_WEEKEND_DEPOSIT_URL is set in Vercel Production env
[ ] Stripe link loads correctly from the website (not a '#' fallback)
[ ] Stripe hosted checkout page loads over HTTPS
[ ] Payment disclaimer is visible above the Stripe button on mobile (390px viewport)
[ ] WhatsApp CTA remains visible alongside the Stripe button
[ ] Complete a real test payment (minimum amount) → Stripe Dashboard → Payments shows it
[ ] Customer receives Stripe confirmation email
[ ] BOSSA team sees the payment in Stripe Dashboard within 60 seconds
[ ] Refund test: issue a refund in Stripe → confirm refund appears in Stripe Dashboard
```

### Phase 4 — Webhook test

```text
[ ] Stripe CLI installed: stripe listen --forward-to [supabase-edge-function-url]
[ ] stripe trigger payment_intent.succeeded
[ ] Supabase: payments row inserted
[ ] Supabase: leads row upserted (if email matched)
[ ] Notion: client setup page created in 06 — Knowledge & Memory → Client Setup Tasks
[ ] Run the same trigger twice → confirm second run does not create duplicate rows
[ ] Run stripe trigger charge.refunded → confirm payments row status updated to 'refunded'
```

---

## Routing Destination

| Output | Destination |
|---|---|
| New payment (Stripe Dashboard) | Stripe Dashboard → Payments |
| New payment (Supabase) | `payments` table — created by webhook |
| New lead (Supabase) | `leads` table — upserted by webhook |
| Client setup task (Notion) | 06 — Knowledge & Memory → Client Setup Tasks |
| Weekly payment summary | 02 — BOSSA Domain → Payments |
| Refund or dispute | 01 — Command Center → Incident Log |

---

## Implementation Checklist — Summary

### Phase 2 (Stripe links, no backend)

```text
[ ] Decisions confirmed: amounts, currency, refund policy
[ ] Live Stripe Payment Links created (3 links)
[ ] Links tested in Stripe Test mode
[ ] Env variables added to Vercel
[ ] payments.ts updated to read from env
[ ] Website deployed and links tested in production
[ ] Disclaimer visible on mobile
[ ] WhatsApp CTA still primary
```

### Phase 4 (Webhook + automation)

```text
[ ] Supabase schema live (see docs/supabase-leads-schema.md)
[ ] STRIPE_WEBHOOK_SECRET added to Supabase Edge Function secrets
[ ] Stripe webhook endpoint registered in Stripe Dashboard
[ ] Edge Function deployed and returning 200 on test events
[ ] Full automation test: payment → Supabase → Notion
[ ] Idempotency confirmed: duplicate webhook does not create duplicate rows
```
