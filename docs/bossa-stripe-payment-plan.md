# BOSSA Stripe Payment Plan

**Owner:** Sahid Attaf  
**Status:** Draft / not live  
**Last updated:** 2026-05-21  
**System:** BOSSA Website OS

---

## Purpose

This document defines how BOSSA should add Stripe payment and deposit buttons safely after the website control layer is approved.

This is planned for:

```text
PR #37 — Stripe Payment / Deposit Buttons
```

---

## Current status

```text
Stripe buttons are NOT live yet.
No Stripe secret keys are stored in the repo.
No payment link has been added to the website yet.
WhatsApp remains the active confirmation flow.
```

---

## Recommended payment strategy

Start with Stripe Payment Links, not a full custom checkout integration.

Why:

- Faster to launch
- Less code risk
- No backend needed
- No secrets required in the repo
- Easy to change prices from Stripe dashboard
- Works well for deposits and fixed packages

---

## Payment products to create in Stripe

### 1. Weekend Fire Preorder Deposit

| Field | Value |
| --- | --- |
| Product name | BOSSA Weekend Fire Preorder Deposit |
| Purpose | Reserve limited fire batch order |
| Suggested price | XCG 25 or equivalent supported Stripe currency |
| Page | `/weekend-fire` |
| Button label | Pay deposit |
| Operational rule | Customer must still confirm by WhatsApp |

### 2. Party / Event Deposit

| Field | Value |
| --- | --- |
| Product name | BOSSA Party / Event Deposit |
| Purpose | Lock group order/date after quote discussion |
| Suggested price | XCG 100 or equivalent supported Stripe currency |
| Page | `/party-menu` |
| Button label | Pay event deposit |
| Operational rule | Only pay after BOSSA confirms availability |

### 3. Private Catering Deposit

| Field | Value |
| --- | --- |
| Product name | BOSSA Private Catering Deposit |
| Purpose | Secure custom private fire experience |
| Suggested price | XCG 250 or equivalent supported Stripe currency |
| Page | `/party-menu` or future `/events` |
| Button label | Secure catering date |
| Operational rule | Human approval required before payment |

---

## Suggested website buttons

### Weekend Fire

```text
Confirm on WhatsApp
Pay Deposit with Stripe
```

### Party / Events

```text
Request Quote on WhatsApp
Pay Event Deposit
```

### Fire & Sea Coming Soon

```text
Ask About Sea Specials
Join Weekend Fire & Sea List
```

No payment button should go live for Sea Specials until the product, timing, and seafood supply are ready.

---

## Stripe link storage options

### Good — temporary direct links in a data file

```ts
export const stripeLinks = {
  weekendDeposit: 'https://buy.stripe.com/...',
  partyDeposit: 'https://buy.stripe.com/...',
  cateringDeposit: 'https://buy.stripe.com/...',
};
```

### Better — public environment variables

```text
NEXT_PUBLIC_STRIPE_WEEKEND_DEPOSIT_URL=
NEXT_PUBLIC_STRIPE_PARTY_DEPOSIT_URL=
NEXT_PUBLIC_STRIPE_CATERING_DEPOSIT_URL=
```

### Best — Notion/Website control automation later

```text
Notion Payment Links table → generated config → PR → Vercel deploy
```

For PR #37, use the Good option first unless Vercel environment variables are already configured.

---

## Safety rules

- Never commit Stripe secret keys
- Only public Payment Links may be added
- Do not add API checkout until the payment model is validated
- Deposit buttons must say that WhatsApp confirmation is required
- Payment does not replace operational confirmation
- Refund/cancellation wording must be clear before heavy promotion

---

## Customer-facing disclaimer

Use this near payment buttons:

```text
Please confirm availability with BOSSA on WhatsApp before paying a deposit. Deposits reserve preparation capacity only after staff confirmation.
```

Short version:

```text
Confirm on WhatsApp first. Pay deposit after BOSSA confirms availability.
```

---

## PR #37 implementation checklist

- [ ] Create Stripe Payment Links in Stripe dashboard
- [ ] Confirm currency support and display currency
- [ ] Add payment link data file or env variables
- [ ] Add deposit CTA to `/weekend-fire`
- [ ] Add deposit CTA to `/party-menu`
- [ ] Keep WhatsApp CTA as primary until process is proven
- [ ] Add small payment disclaimer
- [ ] Test all payment links open correctly
- [ ] Test mobile layout
- [ ] Wait for Vercel Ready before merge

---

## What Sahid must approve before PR #37

| Decision | Needed answer |
| --- | --- |
| Deposit amount for Weekend Fire | XCG 25? Other? |
| Deposit amount for Party/Event | XCG 100? Other? |
| Deposit amount for Catering | XCG 250? Other? |
| Currency shown on website | XCG, ANG, USD, or Stripe-supported equivalent? |
| Refund rule | Refundable, credit-only, or non-refundable after prep starts? |
| Confirmation rule | WhatsApp first or payment first? Recommended: WhatsApp first |

---

## Future PR #38 connection

After payment links are stable, PR #38 should create a structured automation plan:

```text
Notion menu/payment table → validated export → website config file → PR → Vercel deploy
```

This keeps BOSSA scalable without manually changing the same content in multiple places.
