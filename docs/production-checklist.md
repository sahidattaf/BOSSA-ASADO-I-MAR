# BOSSA Production Checklist

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Website: `bossaasado.com`
Purpose: Pre-deployment and post-deployment checklist for keeping the BOSSA website usable, professional, and safe.

---

## When To Use This Checklist

Use this checklist before every:

- Production deployment
- Weekend Fire menu update
- Party / event package update
- Stripe payment link update
- Public campaign launch
- Major design or content change

---

## Production Rule

No production deployment is ready until these four gates pass:

```text
1. Content is valid
2. Website builds successfully
3. Customer conversion flow works
4. No secrets or unsafe payment links are exposed
```

---

## Gate 1 — Repo Cleanliness

Before making changes:

```bash
git status
```

Checklist:

- [ ] Working tree is clean or changes are intentional.
- [ ] You know which branch you are working on.
- [ ] No random test files are being committed.
- [ ] No image/audio/video files are added unless intentionally used by the website.
- [ ] No `.env` or secret files are committed.

Professional rule:

```text
Every commit should have one clear purpose.
```

---

## Gate 2 — Dependency Check

Run:

```bash
npm install
```

Checklist:

- [ ] Install completes without errors.
- [ ] No unexpected package changes appear.
- [ ] `package-lock.json` changes are intentional.
- [ ] No package is added without a clear reason.

If dependencies fail:

```text
Do not deploy.
Fix install errors first.
```

---

## Gate 3 — Content Validation

Run:

```bash
npm run validate:content
```

Expected result:

```text
BOSSA content validation passed.
```

Checklist:

- [ ] Site brand data exists.
- [ ] WhatsApp number exists.
- [ ] Audio paths exist in `public/`.
- [ ] Image paths exist in `public/`.
- [ ] YouTube links use embed URLs when required.
- [ ] Payment links use public Stripe Payment Links only.
- [ ] No Stripe secret keys exist in content files.
- [ ] Menu items include name, price, and description.
- [ ] Draft menu items are not published.

If validation fails:

```text
Do not deploy.
Fix the content JSON or asset paths first.
```

---

## Gate 4 — Generate Website Data

Run:

```bash
npm run generate:data
```

Or run both validation and generation:

```bash
npm run content:check
```

Checklist:

- [ ] `app/data/site.ts` updates only when site config changes.
- [ ] `app/data/media.ts` updates only when media changes.
- [ ] `app/data/payments.ts` updates only when payment links change.
- [ ] `app/data/menu.ts` or generated menu files update only when menu data changes.
- [ ] Generated files include an auto-generated warning header.
- [ ] Generated files are committed only when source content was approved.

Professional rule:

```text
Do not manually edit generated data files.
Edit the approved source JSON, then regenerate.
```

---

## Gate 5 — Build Check

Run:

```bash
npm run build
```

Checklist:

- [ ] Build completes successfully.
- [ ] No TypeScript errors.
- [ ] No missing image errors.
- [ ] No missing import errors.
- [ ] No route build failures.
- [ ] No environment variable errors.

If build fails:

```text
Do not deploy.
Fix the build before pushing to production.
```

---

## Gate 6 — Public Page QA

Check these routes locally or in Vercel preview:

```text
/
/weekend-fire
/weekend-fire/customize
/party-menu
```

Checklist:

- [ ] Homepage loads.
- [ ] Hero section is clear within 5 seconds.
- [ ] Main WhatsApp CTA is visible above the fold.
- [ ] Weekend Fire CTA is visible.
- [ ] Party / event quote CTA is visible.
- [ ] Menu sections display correctly.
- [ ] Images load.
- [ ] Audio loads if present.
- [ ] Videos load if present.
- [ ] Footer information is correct.
- [ ] No public copy mentions internal words like prototype, generated data, PR, JSON, Notion source, or editable block.

---

## Gate 7 — WhatsApp Flow QA

Primary BOSSA flow is WhatsApp-first.

Checklist:

- [ ] Homepage WhatsApp button opens WhatsApp.
- [ ] Weekend Fire order buttons open WhatsApp.
- [ ] Each Weekend Fire box has the correct pre-filled message.
- [ ] Party quote button opens WhatsApp.
- [ ] Phone number is correct: `+5999 523 0683`.
- [ ] Messages are simple enough for customers.
- [ ] Messages include enough detail for staff to respond quickly.

Recommended customer message format:

```text
Hi BOSSA, I want to order [box/item].
Name:
Pickup date/time:
Quantity:
Extra notes:
```

---

## Gate 8 — Payment Link QA

Stripe is secondary. WhatsApp confirmation comes first.

Checklist:

- [ ] Payment buttons are not more prominent than WhatsApp confirmation.
- [ ] Payment disclaimer is visible.
- [ ] Test links are clearly marked if still in test mode.
- [ ] Live links are only used after Stripe readiness review.
- [ ] No Stripe secret keys are committed.
- [ ] No private API keys are in source files.
- [ ] Payment link opens the expected Stripe Checkout page.

Required public disclaimer:

```text
Confirm on WhatsApp first. Pay deposit only after BOSSA confirms availability.
```

If Stripe links are still test-mode:

```text
Do not promote payment buttons publicly as live payment options.
```

---

## Gate 9 — Mobile QA

Most customers will come from Instagram, Facebook, TikTok, hotel referrals, or WhatsApp.

Checklist:

- [ ] Homepage looks good on mobile.
- [ ] Weekend Fire page looks good on mobile.
- [ ] Party Menu page looks good on mobile.
- [ ] Buttons are easy to tap.
- [ ] Text is readable.
- [ ] Images do not overflow.
- [ ] No horizontal scrolling.
- [ ] Sticky or repeated CTA does not block content.

Recommended screen sizes:

```text
iPhone SE / small Android
Standard iPhone
Large Android / Samsung
Tablet
Desktop
```

---

## Gate 10 — Trust Layer QA

Checklist:

- [ ] Location is visible.
- [ ] Hours are visible.
- [ ] Contact method is visible.
- [ ] Confirmation-first policy is visible.
- [ ] Party/event process is clear.
- [ ] Food images look real and appetizing.
- [ ] Coming Soon items are clearly labeled.
- [ ] No outdated prices are visible.
- [ ] No duplicate or conflicting menu items.

---

## Gate 11 — SEO & Metadata QA

Checklist:

- [ ] Page title includes BOSSA Asado i Mar.
- [ ] Metadata describes fire-grill restaurant in Curaçao.
- [ ] Open Graph image is set or planned.
- [ ] Description includes Pietermaai / Curaçao where useful.
- [ ] Important routes have meaningful headings.
- [ ] Images have useful alt text where practical.

Recommended title pattern:

```text
BOSSA Asado i Mar — Fire Grill Restaurant in Pietermaai, Curaçao
```

Recommended description:

```text
BOSSA Asado i Mar serves fire-grilled Weekend Fire Boxes, party menus, and private event food in Pietermaai, Curaçao. Order and reserve through WhatsApp.
```

---

## Gate 12 — Security & Secrets QA

Run a manual search before deploy:

```bash
grep -R "sk_" .
grep -R "STRIPE_SECRET" .
grep -R "SUPABASE_SERVICE_ROLE" .
grep -R "NOTION_TOKEN" .
```

Checklist:

- [ ] No Stripe secret key in repo.
- [ ] No Supabase service role key in repo.
- [ ] No Notion token in repo.
- [ ] No private customer data in repo.
- [ ] No `.env` file committed.
- [ ] Only public publishable keys are used when required.

Professional rule:

```text
Secrets live in Vercel/GitHub environment variables, never in committed source files.
```

---

## Gate 13 — Vercel Preview QA

After pushing changes:

Checklist:

- [ ] Vercel preview deployment is Ready.
- [ ] Preview URL opens.
- [ ] Main pages load in preview.
- [ ] WhatsApp buttons work in preview.
- [ ] Payment buttons behave as expected.
- [ ] No console-breaking page errors are visible.
- [ ] Preview matches expected design/content.

If preview fails:

```text
Do not merge or promote to production.
Read build logs and fix the issue first.
```

---

## Gate 14 — Production Verification

After production deploy:

Check:

```text
https://bossaasado.com
https://www.bossaasado.com
```

Checklist:

- [ ] Domain loads.
- [ ] Redirect behavior is acceptable.
- [ ] Homepage loads fast enough.
- [ ] Main CTA works.
- [ ] Weekend Fire page works.
- [ ] Party Menu page works.
- [ ] Mobile view works.
- [ ] No test-only copy is visible unless intentional.
- [ ] No broken images are visible.
- [ ] No broken payment links are visible.

---

## Gate 15 — Campaign Launch QA

Before posting on Instagram, Facebook, TikTok, LinkedIn, hotel groups, or WhatsApp broadcast:

Checklist:

- [ ] Campaign URL is correct.
- [ ] Offer is still available.
- [ ] Price is correct.
- [ ] Pickup/date rules are clear.
- [ ] Staff knows the campaign is live.
- [ ] WhatsApp response script is ready.
- [ ] Inventory/prep capacity is confirmed.
- [ ] Payment/deposit rules are clear.

Campaign link format:

```text
https://bossaasado.com/weekend-fire?utm_source=instagram&utm_campaign=weekend_fire
```

---

## Minimum Production Approval

A deploy may go live when:

```text
[ ] validate:content passes
[ ] generate:data passes
[ ] build passes
[ ] homepage QA passes
[ ] WhatsApp QA passes
[ ] mobile QA passes
[ ] no secrets found
[ ] Vercel preview is Ready
```

---

## Stop-Deploy Conditions

Do not deploy if any of these are true:

- Build fails.
- Content validation fails.
- WhatsApp links are broken.
- Payment links are wrong or unsafe.
- Secret keys are present.
- Homepage has internal/developer copy.
- Menu prices are wrong.
- Main images are broken.
- Vercel preview is not ready.
- Staff is not ready for the campaign.

---

## Production Sign-Off

Before final release, record:

```text
Release name:
Date:
Reviewer:
Branch:
Commit SHA:
Vercel preview URL:
Production URL:
Validation status:
Build status:
WhatsApp QA:
Payment QA:
Mobile QA:
Approved for production: Yes / No
Notes:
```

---

## Current Known Risks

| Risk | Status | Action |
| --- | --- | --- |
| Stripe test links may still be present | Open | Confirm before public payment promotion |
| Supabase lead tracking not confirmed | Open | Add only after project confirmation |
| Content architecture not fully enforced | Open | Finish generated-data refactors |
| Public copy may include internal wording | Open | Clean homepage and routes |
| Analytics not fully implemented | Open | Add event map and tracking layer |

---

## Next Recommended Files

```text
docs/content-workflow.md
docs/deployment-checklist.md
docs/payment-safety-policy.md
docs/qa-checklist.md
```

---

## Final Rule

BOSSA production should feel simple to the customer and controlled behind the scenes.

```text
Customer sees: fire food, WhatsApp, order, party, location.
Operator sees: checklist, validation, data generation, QA, deployment proof.
```
