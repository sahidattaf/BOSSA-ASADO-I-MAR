# BOSSA Content Workflow

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Website: `bossaasado.com`
Purpose: Define the controlled content workflow for menu updates, media updates, payment links, campaign content, and public website copy.

---

## Purpose

This document explains how BOSSA website content should move from approved business content into the public website safely.

The goal is simple:

```text
Business idea
  ↓
Approved content source
  ↓
Validation
  ↓
Generated website data
  ↓
Website pages
  ↓
Preview QA
  ↓
Production deploy
```

This prevents random manual edits, outdated prices, broken images, unsafe payment links, and public prototype language.

---

## Core Rule

Public website content should not be edited in many places.

BOSSA needs one controlled source of truth for customer-facing content.

Current source-of-truth model:

```text
content/notion/bossa-website-content.template.json
```

Later source-of-truth model:

```text
Approved Notion control tables
  ↓
Exported JSON
  ↓
Validation
  ↓
Generated website data
```

---

## Current Content Architecture

```text
content/notion/bossa-website-content.template.json
        ↓
scripts/validate-bossa-content.mjs
        ↓
scripts/generate-bossa-data-from-content.mjs
        ↓
app/data/site.ts
app/data/media.ts
app/data/payments.ts
app/data/menu.ts or app/data/menu.generated.ts
        ↓
Public website pages
```

---

## Content Ownership

| Content Area | Owner | Approval Needed |
| --- | --- | --- |
| Menu items | Coach Sahid | Yes |
| Prices | Coach Sahid | Yes |
| Weekend Fire boxes | Coach Sahid | Yes |
| Party/event packages | Coach Sahid | Yes |
| Payment links | Coach Sahid + Stripe review | Yes |
| WhatsApp messages | Coach Sahid | Yes |
| Images/media | Coach Sahid | Yes |
| Public homepage copy | Coach Sahid | Yes |
| SEO metadata | AI Operator + Coach Sahid | Yes |

---

## Content File

Main source file:

```text
content/notion/bossa-website-content.template.json
```

This file should contain approved public content only.

It may include:

```text
site config
menu sections
menu items
media references
payment links
campaign routes
WhatsApp message templates
```

It must not include:

```text
secret keys
private customer data
staff notes
unapproved draft prices
internal planning notes
raw Notion tokens
Supabase service role keys
Stripe secret keys
```

---

## Generated Files

Generated files are created by script.

Examples:

```text
app/data/site.ts
app/data/media.ts
app/data/payments.ts
app/data/menu.ts
app/data/menu.generated.ts
```

Rule:

```text
Do not manually edit generated files.
Edit the JSON source first, then regenerate.
```

Generated files should include a warning header like:

```text
AUTO-GENERATED from content/notion/bossa-website-content.template.json
Edit the JSON source, then run npm run generate:data.
```

---

## Standard Content Update Flow

Use this flow for menu updates, Weekend Fire changes, party packages, and campaign copy.

```text
1. Edit approved JSON source
2. Validate content
3. Generate website data
4. Build site
5. Check preview
6. Commit source and generated files together
7. Deploy after QA
```

Commands:

```bash
npm run validate:content
npm run generate:data
npm run content:check
npm run build
```

---

## Menu Update Workflow

Use when changing:

- Item name
- Item price
- Description
- Image
- Availability status
- Coming Soon label
- Menu category

Steps:

```text
1. Update menu item in JSON source.
2. Confirm item status: active / coming-soon / hidden / draft.
3. Confirm price format.
4. Confirm image path exists in public folder.
5. Run validation.
6. Generate data.
7. Check homepage and related route.
8. Commit changes.
```

Recommended price format:

```text
XCG 49.50
```

Recommended menu item schema:

```json
{
  "name": "Box #1 — BOSSA Box Mix",
  "price": "XCG 49.50",
  "status": "active",
  "description": "Fire-roasted chicken, ribs, chorizo, porkchop, garlic bread, and garlic sauce.",
  "image": "/images/bossa/weekend-fire/box-1-bossa-box-mix.png"
}
```

---

## Weekend Fire Content Workflow

Weekend Fire is a primary conversion product.

Update carefully.

Required checks:

```text
[ ] Box number is correct
[ ] Box name is customer-friendly
[ ] Price is correct
[ ] Description is short and clear
[ ] Image path exists
[ ] WhatsApp order message still works
[ ] Coming Soon items are clearly marked
[ ] No draft items are published
```

Weekend Fire route:

```text
/weekend-fire
```

Customizer route:

```text
/weekend-fire/customize
```

---

## Party / Event Content Workflow

Use this for party packages, catering deposits, private events, hotel guests, and larger orders.

Required fields:

```text
Package name
Starting price or quote language
Guest count guidance
Description
WhatsApp quote CTA
Deposit policy if applicable
Image or visual block
```

Customer-facing wording should say:

```text
Request a quote on WhatsApp
Confirm date and menu first
Deposit only after BOSSA confirms availability
```

Avoid saying:

```text
Pay now without confirmation
Guaranteed booking without approval
Internal quote flow
Generated package data
```

---

## Media Workflow

Media includes:

```text
food images
hero images
gallery images
audio files
YouTube embeds
short-form videos
```

Rules:

```text
1. Store website images under public/images/bossa/.
2. Use clean filenames.
3. Avoid spaces in filenames.
4. Use lowercase and hyphens.
5. Keep image paths stable once public.
6. Validate paths before deploy.
```

Recommended image filename style:

```text
box-1-bossa-box-mix.png
bossa-hero-pietermaai.jpg
party-grill-table.jpg
seafood-coming-soon.png
```

---

## Payment Content Workflow

Payments must be controlled carefully.

Payment links are secondary to WhatsApp confirmation.

Rules:

```text
1. Never add Stripe secret keys to the repo.
2. Use public Stripe Payment Links only.
3. Keep WhatsApp confirmation first.
4. Mark test links clearly.
5. Replace test links only after live Stripe readiness review.
6. Add payment disclaimer near deposit buttons.
```

Required disclaimer:

```text
Confirm on WhatsApp first. Pay deposit only after BOSSA confirms availability.
```

Payment content file:

```text
app/data/payments.ts
```

Current safe payment flow:

```text
Customer clicks WhatsApp
  ↓
BOSSA confirms availability
  ↓
Customer receives deposit/payment link
  ↓
BOSSA confirms order or booking
```

---

## WhatsApp Message Workflow

Every CTA should open WhatsApp with a useful message.

Recommended order message:

```text
Hi BOSSA, I want to order [item name].
Name:
Pickup date/time:
Quantity:
Extra notes:
```

Recommended party quote message:

```text
Hi BOSSA, I want to request a party/event quote.
Name:
Date:
Guest count:
Location:
Preferred food style:
Extra notes:
```

Rules:

```text
[ ] Message is short enough for mobile
[ ] Message gives staff enough info
[ ] Message does not overpromise availability
[ ] Phone number is correct: +5999 523 0683
```

---

## SEO Content Workflow

Update SEO when changing the public offer or major pages.

Recommended homepage title:

```text
BOSSA Asado i Mar — Fire Grill Restaurant in Pietermaai, Curaçao
```

Recommended homepage description:

```text
BOSSA Asado i Mar serves fire-grilled Weekend Fire Boxes, party menus, and private event food in Pietermaai, Curaçao. Order and reserve through WhatsApp.
```

Important keywords:

```text
BOSSA Asado i Mar
Pietermaai restaurant
Curaçao fire grill
Weekend Fire Boxes
BBQ Curaçao
party menu Curaçao
private events Curaçao
near Avila Hotel
```

---

## Public Copy Rules

Public website language should feel like a restaurant, not a developer workspace.

Avoid:

```text
editable block
generated data
prototype
PR
Notion source
JSON
internal workflow
```

Use:

```text
Weekend Fire Boxes
Order on WhatsApp
Limited fire batches
Party and private events
Fire-grilled in Pietermaai
Confirm availability first
Fresh from the grill
```

---

## Status Rules

Recommended item statuses:

```text
active
coming-soon
hidden
draft
```

Meaning:

| Status | Public? | Meaning |
| --- | --- | --- |
| active | Yes | Available or actively promoted |
| coming-soon | Yes | Visible but clearly not available yet |
| hidden | No | Not shown publicly |
| draft | No | Internal draft only |

Validation should block `draft` from public templates.

---

## Campaign Content Workflow

Use this for special offers like:

```text
Friday Seafood Promo
Weekend Fire Box Campaign
Party Grill Package
Hotel Guest Special
Holiday Grill Menu
```

Checklist:

```text
[ ] Offer name approved
[ ] Price approved
[ ] Date range approved
[ ] Inventory/prep capacity confirmed
[ ] WhatsApp message ready
[ ] Landing page route confirmed
[ ] UTM campaign link created
[ ] Staff response script ready
```

Example campaign URL:

```text
https://bossaasado.com/weekend-fire?utm_source=instagram&utm_campaign=weekend_fire
```

---

## QA After Content Changes

After any content update, check:

```text
[ ] npm run validate:content
[ ] npm run generate:data
[ ] npm run build
[ ] Homepage content is correct
[ ] Weekend Fire page content is correct
[ ] Party page content is correct
[ ] WhatsApp messages work
[ ] Images load
[ ] Payment links are safe
[ ] Mobile layout still works
```

---

## Commit Rules

Commit source and generated output together.

Good commit:

```text
docs/content-workflow.md
content/notion/bossa-website-content.template.json
app/data/menu.ts
```

Bad commit:

```text
Only app/data/menu.ts changed manually
```

Recommended commit messages:

```text
content: update weekend fire menu data
docs: add content workflow guide
content: update party event package copy
content: refresh payment disclaimer copy
```

---

## Notion Integration Roadmap

Current stage:

```text
Manual approved JSON source
```

Next stage:

```text
Notion content tables
  ↓
Manual export to JSON
  ↓
Validation
  ↓
Generated website data
```

Future stage:

```text
Notion API export script
  ↓
GitHub PR
  ↓
Vercel preview
  ↓
Human QA
  ↓
Production deploy
```

Important:

```text
Do not connect live Notion API sync until validation, QA, and preview flow are stable.
```

---

## Recommended Notion Content Tables

### Website Site Config

```text
Brand Name
WhatsApp Number
Address
Hours
Primary Routes
SEO Title
SEO Description
```

### Menu Sections

```text
Section ID
Title
Note
Status
Sort Order
```

### Menu Items

```text
Item Name
Section
Price
Description
Image Path
Status
Sort Order
Tags
WhatsApp Message
```

### Payments

```text
Payment Key
Label
Amount
Stripe Payment Link
Status
Confirmation Required
Disclaimer
```

### Media Library

```text
Asset Name
Asset Type
Public Path
Alt Text
Usage
Status
```

---

## Human Approval Gates

Human approval is required before publishing:

```text
price changes
new payment links
new menu sections
large party/catering offers
campaign pricing
public policy copy
homepage hero copy
```

---

## Emergency Content Fix Flow

Use this if a price, image, or payment link is wrong on production.

```text
1. Identify the wrong public content.
2. Edit source JSON.
3. Run validate:content.
4. Run generate:data.
5. Run build.
6. Commit with message: fix: correct [issue].
7. Deploy.
8. Verify production page.
9. Log what happened.
```

Do not quick-fix generated files manually unless it is an emergency and is followed by source correction.

---

## Success Metrics

| Metric | Target |
| --- | --- |
| Menu update time | Under 15 minutes |
| Broken image rate | 0 |
| Wrong price incidents | 0 |
| Payment link mistakes | 0 |
| Public draft content | 0 |
| Build success before deploy | 100% |
| WhatsApp CTA accuracy | 100% |

---

## Final Rule

BOSSA content should be easy to update but hard to publish incorrectly.

```text
Fast for the operator.
Clear for the customer.
Safe for the business.
```
