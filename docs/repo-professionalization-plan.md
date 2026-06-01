# BOSSA-ASADO-I-MAR — Repo Professionalization Plan

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Website: `bossaasado.com`
Status: Active production improvement plan

---

## Purpose

Make the BOSSA Asado i Mar website repository usable, professional, maintainable, and ready for real restaurant operations.

The current repo already has strong foundations:

- Next.js app structure
- Public BOSSA website routes
- Weekend Fire ordering flow
- Party / event quote flow
- WhatsApp-first sales logic
- Stripe test deposit link plan
- Notion-to-website content architecture
- Generated website data direction
- Documentation for prior PR milestones

The next goal is to convert the repo from a strong working prototype into a clean production-grade restaurant website and operations asset.

---

## Strategic Outcome

The website should become a simple commercial machine:

```text
Visitor lands on BOSSA
        ↓
Understands the food and location fast
        ↓
Chooses Weekend Fire / Party / Reservation
        ↓
Clicks WhatsApp
        ↓
BOSSA confirms availability
        ↓
Optional deposit payment
        ↓
Order or booking is logged
```

---

## Current Strengths

### Business Strengths

- Clear BOSSA identity: fire, grill, sea, Pietermaai, Curaçao.
- WhatsApp-first flow fits the local market.
- Weekend Fire Boxes are strong conversion products.
- Party / event quote flow gives higher-ticket upsell potential.
- Website already has a public domain.

### Repo Strengths

- App routes exist for homepage, Weekend Fire, and Party Menu.
- Documentation already describes PR flows and safe automation.
- Content validation and generated data architecture are already planned.
- Stripe deposit logic is documented with safety rules.
- No secret-key strategy is respected in docs.

---

## Current Weaknesses

### Public Website Weaknesses

- Homepage needs stronger commercial hierarchy.
- Some public copy still feels like an internal prototype.
- Menu presentation needs cleaner customer-facing sections.
- Trust layer is still light: reviews, policy, FAQ, location proof, deposit rules.
- Stripe payment links are still test-mode and should not be treated as live sales links.
- Conversion tracking needs a stronger analytics and lead pipeline.

### Repo Weaknesses

- README should be upgraded for developer and operator use.
- Production checklist should be explicit.
- Content workflow should be documented as source-of-truth.
- Generated data architecture should be finished and enforced.
- Party page should eventually use generated content data.
- Website QA should be standardized before every deployment.
- Deployment environment variables should be documented without exposing secrets.

---

## Professionalization Principles

1. Public pages must speak to customers, not developers.
2. WhatsApp remains the primary conversion flow.
3. Stripe deposits remain secondary and only after BOSSA confirmation.
4. No secret keys are committed to the repo.
5. Menu content should be controlled from one approved source.
6. Every deploy should pass validation and build checks.
7. Every public CTA should have a clear business purpose.
8. The site should support locals, tourists, hotel guests, and party/event leads.

---

## Target Website Structure

Recommended public routes:

```text
/
/weekend-fire
/weekend-fire/customize
/party-menu
/menu
/gallery
/location
/faq
```

Optional later routes:

```text
/catering
/hotel-partners
/private-events
/press
```

---

## Target Repo Structure

Recommended professional structure:

```text
app/
  page.tsx
  layout.tsx
  globals.css
  data/
    site.ts
    menu.ts
    media.ts
    payments.ts
  components/
    WhatsAppClickTracker.tsx
    MenuSection.tsx
    CTAButton.tsx
    TrustBar.tsx
    FAQ.tsx
  weekend-fire/
    page.tsx
    customize/
      page.tsx
  party-menu/
    page.tsx
content/
  notion/
    bossa-website-content.template.json
scripts/
  validate-bossa-content.mjs
  generate-bossa-data-from-content.mjs
docs/
  repo-professionalization-plan.md
  production-checklist.md
  content-workflow.md
  deployment-checklist.md
  payment-safety-policy.md
  qa-checklist.md
public/
  images/
    bossa/
  audio/
```

---

## Release Roadmap

## v1.0 — Production Clean-Up Layer

Goal: Make the current public website clean, trustworthy, and customer-ready.

### Scope

- Clean homepage copy.
- Remove internal/prototype language from public-facing pages.
- Improve hero section with clear promise and CTA.
- Make Weekend Fire the primary conversion path.
- Add trust section.
- Add FAQ section.
- Add location and opening status clearly.
- Add basic production checklist.

### Files

```text
README.md
docs/production-checklist.md
docs/qa-checklist.md
app/page.tsx
app/weekend-fire/page.tsx
app/party-menu/page.tsx
```

### Acceptance Criteria

- Homepage communicates what BOSSA is within 5 seconds.
- WhatsApp CTA is visible above the fold.
- Weekend Fire boxes are easy to order.
- Party/event quote path is clear.
- Public copy contains no internal developer language.
- Mobile layout remains clean.

---

## v1.1 — Content Source-of-Truth Layer

Goal: Finish the controlled Notion/JSON/generated-data architecture.

### Scope

- Ensure `content/notion/bossa-website-content.template.json` is the approved content source.
- Validate content before generation.
- Generate site, media, payments, and menu data.
- Refactor pages to consume generated data.
- Prevent draft menu items from appearing publicly.

### Files

```text
content/notion/bossa-website-content.template.json
scripts/validate-bossa-content.mjs
scripts/generate-bossa-data-from-content.mjs
app/data/site.ts
app/data/media.ts
app/data/payments.ts
app/data/menu.ts
app/data/menu.generated.ts
docs/content-workflow.md
```

### Commands

```bash
npm run validate:content
npm run generate:data
npm run content:check
npm run build
```

### Acceptance Criteria

- Content validation passes.
- Generated files update predictably.
- Homepage menu uses generated data.
- Weekend Fire cards use generated data.
- Party/event packages are moved to generated content.

---

## v1.2 — Conversion & Analytics Layer

Goal: Turn the website into a measurable sales funnel.

### Scope

- Add WhatsApp click tracking.
- Add UTM tracking rules.
- Add lead capture strategy.
- Add Vercel Analytics or Google Analytics.
- Add Supabase lead log if confirmed.
- Define KPI dashboard fields.

### Suggested Events

```text
whatsapp_home_click
whatsapp_weekend_fire_click
whatsapp_party_quote_click
stripe_deposit_click
menu_item_interest_click
customizer_start
customizer_submit
```

### Lead Fields

```text
lead_id
created_at
source_page
utm_source
utm_campaign
intent
selected_box
party_size
preferred_date
message
whatsapp_clicked
payment_clicked
status
```

### Acceptance Criteria

- Every major CTA has tracking.
- Weekly marketing review can see which page creates leads.
- Campaign links can be measured.

---

## v1.3 — Payment Readiness Layer

Goal: Move from test deposit links to controlled payment readiness.

### Scope

- Keep WhatsApp confirmation first.
- Replace test Stripe links only after live product/prices are confirmed.
- Add public deposit policy.
- Add refund/cancellation policy.
- Add staff SOP for confirming before payment.

### Required Policy Copy

```text
Please confirm availability with BOSSA on WhatsApp before paying a deposit.
Deposits secure your requested date or order window only after BOSSA confirms.
Final balance, menu details, and pickup/event timing are confirmed directly with BOSSA.
```

### Acceptance Criteria

- No test payment links on public production site unless clearly marked.
- No secret keys in repo.
- Payment links are public Stripe Payment Links only.
- Staff has clear payment confirmation SOP.

---

## v1.4 — Trust & Brand Layer

Goal: Make the website feel premium, local, and real.

### Scope

- Add real food/gallery photos.
- Add Google Maps link.
- Add review/testimonial section.
- Add hotel/partner positioning near Avila/Pietermaai.
- Add short brand story.
- Add bilingual snippets where useful.

### Customer Trust Blocks

```text
Fire-grilled in Pietermaai
WhatsApp-first ordering
Weekend limited batches
Party and private event options
Located near Avila / Pietermaai
```

---

## v1.5 — Operations Layer

Goal: Connect website actions to restaurant operations.

### Scope

- Build staff order intake SOP.
- Build party inquiry SOP.
- Build menu update SOP.
- Build weekly website review checklist.
- Connect data to Notion command center if approved.

### Recommended Docs

```text
docs/staff-order-intake-sop.md
docs/party-inquiry-sop.md
docs/menu-update-sop.md
docs/weekly-website-review.md
```

---

## Good / Better / Best Options

## Good

Clean public copy, add professional README, add production checklist, keep WhatsApp as primary CTA.

Best for: making the current website usable fast.

## Better

Finish generated data architecture and refactor pages so the menu and public content come from one approved JSON source.

Best for: reducing mistakes and making menu updates easier.

## Best

Add analytics, Supabase lead tracking, Notion content workflow, Stripe live deposit readiness, and weekly conversion review.

Best for: turning the site into a real BOSSA sales and operations system.

---

## Immediate Next Commits

Recommended order:

```text
1. docs: add production checklist
2. docs: add content workflow
3. docs: add deployment checklist
4. docs: add payment safety policy
5. docs: upgrade README for operator/developer use
6. feat: clean homepage customer copy
7. feat: add FAQ and trust blocks
8. feat: refactor party packages to generated content
9. feat: add analytics event map
10. feat: add lead capture design
```

---

## Production Checklist Preview

Before every production deploy:

```text
[ ] npm install passes
[ ] npm run validate:content passes
[ ] npm run generate:data passes
[ ] npm run build passes
[ ] Homepage CTA works
[ ] Weekend Fire CTA works
[ ] Party quote CTA works
[ ] WhatsApp links open correctly
[ ] Stripe links are either live or clearly marked test
[ ] Mobile layout checked
[ ] No secrets committed
[ ] Vercel deployment ready
```

---

## Website Copy Rule

Avoid public phrases like:

```text
editable menu
prototype
generated data
internal block
Notion source
PR flow
```

Use customer-facing phrases like:

```text
Weekend Fire Boxes
Order on WhatsApp
Limited fire batches
Party and private events
Confirm availability first
Fresh from the grill
```

---

## Decision Log

| Decision | Status | Notes |
| --- | --- | --- |
| WhatsApp remains primary conversion flow | Confirmed | Fits local restaurant operations |
| Stripe deposits are secondary | Confirmed | Only after confirmation |
| No secrets in repo | Confirmed | Use Vercel/GitHub environment variables |
| Content source should be controlled | Confirmed | JSON now, Notion API later |
| Site should become bilingual-ready | Open | English first, Papiamentu layer later |
| Supabase lead log | Open | Requires confirmed Supabase project |
| Live Stripe links | Open | Requires production readiness review |

---

## Success Metrics

| Metric | Target |
| --- | --- |
| WhatsApp clicks | Increase weekly |
| Weekend Fire orders | Track per campaign |
| Party quote requests | Track monthly |
| Menu update time | Under 15 minutes |
| Deployment confidence | Build passes every release |
| Customer confusion | Reduced through FAQ and cleaner copy |

---

## Final Target

BOSSA website should operate as:

```text
Restaurant landing page
+ Weekend Fire ordering funnel
+ Party/event quote funnel
+ Content-controlled menu system
+ WhatsApp-first CRM entry
+ Optional deposit payment layer
+ Analytics and lead tracking foundation
```

This repo should become the clean production base for BOSSA Asado i Mar digital operations.
