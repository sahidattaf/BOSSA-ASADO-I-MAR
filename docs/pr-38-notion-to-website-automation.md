# PR #38 — Notion → Website Automation

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-23

## Purpose

Create the first safe automation layer between BOSSA Notion control pages and the BOSSA website repo.

This PR does not connect to the Notion API yet. It creates the controlled structure needed before automated sync is allowed.

---

## What this PR adds

```text
content/notion/bossa-website-content.template.json
scripts/validate-bossa-content.mjs
package.json validate:content command
docs/pr-38-notion-to-website-automation.md
```

---

## Automation model

```text
Notion control tables
    ↓
Approved export JSON
    ↓
Validation script
    ↓
Website data files
    ↓
GitHub PR
    ↓
Vercel preview
    ↓
Human QA
    ↓
Merge to production
```

---

## Why this is safe

- No Notion token added
- No Stripe secret key added
- No packages added
- No live sync runs automatically
- Validation blocks unsafe data before publishing
- Humans still review the PR and Vercel preview

---

## Validation rules

The validator checks:

- Site brand and WhatsApp data exist
- Audio paths exist in `public/`
- YouTube videos use embed URLs
- Payment links use Stripe Payment Links
- Payment records require WhatsApp first
- Secret key patterns are not included
- Menu items have name, price, and description
- Image paths exist in `public/`
- Draft menu items are not in the publish template

---

## Command

```powershell
npm run validate:content
```

Expected result:

```text
BOSSA content validation passed.
```

---

## QA checklist

1. Run `npm run validate:content`
2. Confirm validator passes
3. Confirm no packages were added
4. Confirm no secrets were added
5. Confirm `content/notion/bossa-website-content.template.json` contains only public links
6. Confirm website still builds
7. Confirm Vercel preview is Ready

---

## Next step after PR #38

PR #39 can turn the template into generated website data files:

```text
content/notion JSON → app/data/menu.ts
content/notion JSON → app/data/payments.ts
content/notion JSON → app/data/media.ts
```

Later, after the system is stable, a Notion API export script can be added with environment variables stored only in Vercel/GitHub secrets, never in the repo.
