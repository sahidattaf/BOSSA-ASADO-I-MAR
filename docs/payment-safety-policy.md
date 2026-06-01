# BOSSA Payment Safety Policy

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Website: `bossaasado.com`
Purpose: Define safe payment, deposit, refund, cancellation, and Stripe usage rules for BOSSA Asado i Mar.

---

## Purpose

This policy protects BOSSA from payment confusion, accidental test-link use, wrong deposits, refund disputes, customer misunderstanding, and unsafe Stripe implementation.

The website can support payment links, but the business flow remains:

```text
WhatsApp confirmation first
        ↓
BOSSA confirms availability
        ↓
Customer receives deposit/payment instructions
        ↓
Customer pays only after confirmation
        ↓
BOSSA confirms order or booking
```

---

## Core Payment Rule

BOSSA is a WhatsApp-first restaurant operation.

```text
No customer should pay a deposit before BOSSA confirms availability on WhatsApp.
```

This applies to:

- Weekend Fire orders
- Party/event bookings
- Catering requests
- Private events
- Hotel guest packages
- Custom orders

---

## Public Disclaimer

This disclaimer should appear near every payment or deposit button:

```text
Confirm on WhatsApp first. Pay deposit only after BOSSA confirms availability.
```

Longer version:

```text
Please confirm availability with BOSSA on WhatsApp before paying a deposit. Deposits secure your requested date or order window only after BOSSA confirms. Final menu details, pickup time, event timing, and balance are confirmed directly with BOSSA.
```

---

## Payment Priority

Website buttons should follow this priority:

```text
1. WhatsApp confirmation CTA
2. Order / quote details
3. Deposit payment link
```

Payment buttons should never be more prominent than WhatsApp confirmation.

---

## Approved Payment Methods

Allowed:

```text
Stripe Payment Links
Manual invoice after confirmation
Cash or local payment method if confirmed by BOSSA
```

Not allowed in repo:

```text
Stripe secret keys
Supabase service role keys
Raw card collection code
Unreviewed checkout APIs
Private customer payment data
Bank account credentials
```

---

## Stripe Usage Rules

### Allowed

- Public Stripe Payment Links.
- Test Payment Links in development or preview when clearly marked.
- Live Payment Links only after production readiness review.
- Static public payment URLs in generated content data.

### Not Allowed

- Committing `sk_live_` keys.
- Committing `sk_test_` keys.
- Committing webhook signing secrets.
- Creating live products/prices without review.
- Using test links publicly without clear labeling.
- Allowing payment before WhatsApp confirmation.

---

## Test vs Live Payment Links

### Test Links

Test links may be used only for preview and QA.

Rules:

```text
[ ] Label as test
[ ] Do not promote publicly
[ ] Do not treat test checkout as real revenue
[ ] Do not use in live campaign posts
```

### Live Links

Live links may be used only when:

```text
[ ] Stripe account is production-ready
[ ] Product is correct
[ ] Price is correct
[ ] Currency is correct
[ ] Payment description is correct
[ ] Refund/cancellation policy exists
[ ] Staff knows the payment process
[ ] WhatsApp-first rule remains visible
```

---

## Current Deposit Types

Recommended deposit categories:

| Deposit | Purpose | Notes |
| --- | --- | --- |
| Weekend Fire Deposit | Secure order window after confirmation | Only after WhatsApp confirmation |
| Party/Event Deposit | Secure event date after quote approval | Quote must be confirmed first |
| Catering Deposit | Secure private catering date | Menu and logistics must be confirmed first |

---

## Suggested Deposit Copy

### Weekend Fire

```text
Weekend Fire deposits are accepted only after BOSSA confirms your order and pickup window on WhatsApp.
```

### Party / Event

```text
Event deposits secure your requested date after BOSSA confirms the quote, guest count, menu direction, and timing on WhatsApp.
```

### Catering

```text
Catering deposits secure your date only after BOSSA confirms availability, menu scope, location, and logistics.
```

---

## Staff Payment SOP

When a customer asks to pay:

```text
1. Confirm the order or event request on WhatsApp.
2. Confirm date, time, quantity, and price.
3. Confirm the deposit amount.
4. Send payment link only after confirmation.
5. Ask customer to send payment confirmation screenshot if needed.
6. Mark order/event as deposit pending.
7. Confirm once payment is received.
8. Mark order/event as deposit paid.
```

---

## WhatsApp Confirmation Template

### Weekend Fire Confirmation

```text
Hi, thank you for your BOSSA order.

We confirm:
Order:
Quantity:
Pickup date/time:
Deposit amount:
Balance due:

Please only pay the deposit after this confirmation.
Payment link:

After payment, send us the confirmation screenshot here on WhatsApp.
```

### Party/Event Confirmation

```text
Hi, thank you for your BOSSA party/event request.

We confirm:
Date:
Guest count:
Menu direction:
Location:
Deposit amount:
Balance due:

Please only pay the deposit after this confirmation.
Payment link:

After payment, send us the confirmation screenshot here on WhatsApp.
```

---

## Refund Policy Draft

Recommended public policy:

```text
Deposits are used to reserve preparation time, ingredients, staff planning, and event/order capacity. Refunds are reviewed case by case. If BOSSA cannot fulfill a confirmed order or event, the customer may receive a refund or reschedule option. Customer cancellations may be non-refundable depending on timing, preparation, and ingredient commitments.
```

Short version:

```text
Deposits may be non-refundable once BOSSA has confirmed and started preparation or reserved capacity. Rescheduling may be offered when possible.
```

---

## Cancellation Policy Draft

### Weekend Fire Orders

```text
Weekend Fire cancellations should be requested as early as possible. Once preparation has started or ingredients have been reserved, deposits may be non-refundable.
```

### Party / Event Orders

```text
Party and event cancellations depend on timing, guest count, ingredients, staffing, and preparation already committed. Deposits may be partially or fully non-refundable after confirmation.
```

---

## Dispute Prevention Rules

To reduce payment disputes:

```text
[ ] Keep WhatsApp confirmation proof
[ ] Confirm order details before payment
[ ] Confirm customer name and date
[ ] Confirm deposit amount
[ ] Keep payment link purpose clear
[ ] Keep refund/cancellation policy visible
[ ] Save screenshots or order notes when needed
```

---

## Payment Link Naming Rules

Use clear names.

Good:

```text
BOSSA Weekend Fire Deposit
BOSSA Party Event Deposit
BOSSA Private Catering Deposit
```

Avoid:

```text
Payment 1
Test product
Deposit random
Customer pay now
```

---

## Payment Link Metadata Recommendation

When creating Stripe products or links, use metadata when possible:

```text
business: BOSSA Asado i Mar
flow: whatsapp_first
type: deposit
category: weekend_fire / party_event / catering
confirmation_required: true
```

---

## Website Payment Copy Rules

Do not say:

```text
Pay now to confirm your order
Guaranteed after payment
Automatic booking
No confirmation needed
```

Use:

```text
Confirm on WhatsApp first
Pay deposit after BOSSA confirms
Secure your confirmed order window
Secure your confirmed event date
```

---

## Payment File Rules

Payment links currently belong in:

```text
app/data/payments.ts
```

Or generated from:

```text
content/notion/bossa-website-content.template.json
```

Rules:

```text
[ ] Payment links are public URLs only
[ ] No secret keys in payment files
[ ] Test links are marked clearly
[ ] Live links require review
[ ] Payment disclaimer is exported with links
```

---

## Environment Variables

If future payment code requires environment variables, use Vercel or GitHub secrets.

Allowed examples:

```text
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

Rules:

```text
[ ] Public keys may be exposed only when intended
[ ] Secret keys stay only in environment variables
[ ] Webhook secrets stay only in environment variables
[ ] Never commit `.env` files
```

---

## Pre-Launch Payment Checklist

Before activating live payment links:

```text
[ ] Stripe account is live-ready
[ ] Business name is correct
[ ] Products are correct
[ ] Prices are correct
[ ] Currency is correct
[ ] Payment links are live, not test
[ ] Refund policy is visible
[ ] Cancellation policy is visible
[ ] WhatsApp-first disclaimer is visible
[ ] Staff payment SOP is reviewed
[ ] Test transaction or small live test completed if appropriate
[ ] Production website QA completed
```

---

## Emergency Payment Fix Flow

Use if a wrong link, wrong price, or test link is discovered in production.

```text
1. Remove or hide the payment button if needed.
2. Correct the payment source data.
3. Run content validation.
4. Generate data.
5. Build the site.
6. Deploy fix.
7. Verify production.
8. Notify staff.
9. Review any customer who clicked the wrong link.
10. Log the incident.
```

---

## Payment Incident Log Template

```text
Incident date:
Detected by:
Page:
Issue type:
Wrong link / wrong amount / test link / broken link / dispute / other
Customer affected:
Immediate action taken:
Refund needed:
Staff notified:
Final resolution:
Prevention step added:
```

---

## Good / Better / Best Payment Setup

### Good

Use WhatsApp-first ordering with manual payment links after confirmation.

Best for: immediate safe operations.

### Better

Use clearly labeled Stripe Payment Links with public deposit policy and staff SOP.

Best for: controlled deposits and simple online payment.

### Best

Use Stripe + Supabase/Notion lead tracking + payment status dashboard + weekly payment review.

Best for: professional digital restaurant operations.

---

## Not Allowed Without Review

Do not add these without a separate technical review:

```text
Custom Stripe Checkout API routes
Stripe webhooks
Saved customer cards
Subscriptions
Automatic refunds
Connect accounts
Embedded payment elements
Server-side payment logic
```

These may be useful later, but they require proper environment variables, backend security, webhook validation, logging, and test coverage.

---

## Production Payment Rule

Before payment links are promoted publicly, the answer must be yes to all:

```text
Is WhatsApp confirmation first?
Is the deposit policy visible?
Is the link live or clearly marked test?
Is the price correct?
Is staff ready to handle paid orders?
Is there no secret key in the repo?
```

If any answer is no:

```text
Do not promote payment publicly.
```

---

## Final Rule

Payment should make BOSSA more professional, not more risky.

```text
Confirm first.
Pay second.
Prepare third.
Track everything.
```
