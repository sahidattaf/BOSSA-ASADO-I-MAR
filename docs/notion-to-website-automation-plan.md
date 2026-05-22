# BOSSA Notion → Website Automation Plan

**Owner:** Sahid Attaf  
**Status:** Draft / planned for PR #38  
**Last updated:** 2026-05-21  
**System:** BOSSA Website OS

---

## Purpose

This plan defines how BOSSA can move from manual website edits to a structured Notion-to-website workflow.

Goal:

```text
Plan in Notion → validate content → export structured data → update website data file → PR → Vercel deploy
```

This is planned for:

```text
PR #38 — Notion → Website Automation
```

---

## Why this exists

Right now, BOSSA content exists across:

- Notion menu pages
- Website files
- Weekend Fire flyer customizer
- PNG/PDF/HTML exports
- WhatsApp scripts
- Future Stripe links

Without a control system, prices and copy can drift.

This plan prevents that.

---

## Recommended architecture

```text
Notion BOSSA Menu / Payment Tables
        ↓
Manual review / approval
        ↓
Structured JSON or TypeScript export
        ↓
app/data/menu.ts or app/data/payments.ts
        ↓
GitHub PR
        ↓
Vercel Preview
        ↓
Human QA
        ↓
Merge to production
```

---

## Data sources to create in Notion

### 1. BOSSA Menu Items

Fields:

| Field | Type | Example |
| --- | --- | --- |
| Name | Title | BOSSA Box Mix |
| Category | Select | Weekend Fire Boxes |
| Price | Text | XCG 49.50 |
| Description | Text | Fire-roasted chicken, ribs, chorizo... |
| Status | Select | Active / Coming Soon / Draft |
| Page | Multi-select | Home / Weekend Fire / Party |
| Image Path | Text | `/images/bossa/weekend-fire/box-1-bossa-box-mix.png` |
| Sort Order | Number | 1 |
| Needs Review | Checkbox | Yes/No |

### 2. BOSSA Payment Links

Fields:

| Field | Type | Example |
| --- | --- | --- |
| Payment Name | Title | Weekend Fire Deposit |
| Stripe Link | URL | `https://buy.stripe.com/...` |
| Amount | Text | XCG 25 |
| Status | Select | Draft / Approved / Live / Disabled |
| Page | Select | Weekend Fire / Party / Catering |
| Requires WhatsApp First | Checkbox | Yes |
| Disclaimer | Text | Confirm availability first. |

### 3. BOSSA Media Assets

Fields:

| Field | Type | Example |
| --- | --- | --- |
| Asset Name | Title | Sabor di BOSSA Audio |
| Type | Select | Audio / Video / Image |
| Public Path | Text | `/audio/bossa/sabor-di-bossa-papiamentu.mp3` |
| Website Usage | Multi-select | Home / Weekend / Party |
| Status | Select | Active / Draft / Replace |

---

## Good / Better / Best automation options

### Good — manual export

Use Notion as the planning source. Copy approved content into:

```text
app/data/menu.ts
app/data/payments.ts
```

Best for now because it avoids over-automation before the menu and payments stabilize.

### Better — JSON export

Create a Notion export prompt that outputs clean JSON:

```json
{
  "menuSections": [],
  "paymentLinks": [],
  "mediaAssets": []
}
```

Then paste into the repo and generate a PR.

### Best — API sync

Use Notion API + GitHub Actions to:

1. Pull approved rows from Notion
2. Validate schema
3. Generate data files
4. Open a GitHub PR automatically
5. Deploy via Vercel preview

Use this only after the content system is stable.

---

## Validation rules

Before content reaches the website:

- [ ] Every active item has a name
- [ ] Every active item has a category
- [ ] Every active item has a price or `TBD`
- [ ] Every active item has a short description
- [ ] Every image path exists in `public/images/bossa/`
- [ ] No secret keys are present
- [ ] Payment links are public Stripe Payment Links only
- [ ] Items marked Draft do not publish
- [ ] Coming Soon items are clearly labeled

---

## Future generated files

Recommended structure:

```text
app/data/
├── menu.ts
├── payments.ts
├── media.ts
└── site.ts
```

Optional scripts later:

```text
scripts/
├── export-notion-menu.ts
├── validate-menu-data.ts
├── generate-website-data.ts
└── open-content-pr.ts
```

---

## PR #38 implementation checklist

- [ ] Create `app/data/payments.ts`
- [ ] Create `app/data/media.ts`
- [ ] Create `app/data/site.ts`
- [ ] Move repeated WhatsApp and video config into data files
- [ ] Add validation docs
- [ ] Optional: add script plan only, no packages yet
- [ ] Keep no-secrets rule enforced
- [ ] Test Vercel preview

---

## Decision log

| Decision | Status |
| --- | --- |
| Use Notion as planning source | Active |
| Use GitHub as public website source | Active |
| Use Vercel as deployment layer | Active |
| Use WhatsApp as operational confirmation layer | Active |
| Use Stripe Payment Links before API checkout | Planned |
| Automate only after content stabilizes | Recommended |
