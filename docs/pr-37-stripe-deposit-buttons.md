# PR #37 — Stripe Payment / Deposit Buttons

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-23

## Purpose

Add test-mode Stripe deposit buttons to the BOSSA website while keeping WhatsApp confirmation as the primary operating flow.

## Payment Links

| Payment | Amount | Status | Link type |
| --- | --- | --- | --- |
| Weekend Fire Deposit | USD 14 test / XCG 25 target | Test mode | Stripe Payment Link |
| Party / Event Deposit | USD 56 test / XCG 100 target | Test mode | Stripe Payment Link |
| Private Catering Deposit | USD 140 test / XCG 250 target | Test mode | Stripe Payment Link |

## Website files

```text
app/data/payments.ts
app/weekend-fire/page.tsx
app/party-menu/page.tsx
docs/pr-37-stripe-deposit-buttons.md
```

## Website behavior

### Weekend Fire

- Adds `Pay Weekend Deposit`
- Keeps `Confirm on WhatsApp` first
- Adds payment disclaimer
- Keeps order-by-box flow unchanged

### Party / Events

- Adds `Pay Event Deposit`
- Adds `Secure Catering Date`
- Keeps quote request via WhatsApp first
- Adds payment disclaimer

## Safety rules

- No Stripe secret keys committed
- Payment Links only
- Links are test-mode for preview
- WhatsApp confirmation comes before deposit
- Replace test links with live links before public launch

## QA checklist

1. Open `/weekend-fire`
2. Confirm WhatsApp CTA is still primary
3. Click `Pay Weekend Deposit`
4. Confirm it opens Stripe test checkout
5. Open `/party-menu`
6. Click `Pay Event Deposit`
7. Confirm it opens Stripe test checkout
8. Click `Secure Catering Date`
9. Confirm it opens Stripe test checkout
10. Confirm mobile layout does not break
11. Confirm no secret keys are present

## Next after merge

- Create live Stripe Payment Links
- Replace test links in `app/data/payments.ts`
- Update Notion payment rows from test to live
- Create a small payment SOP for staff
