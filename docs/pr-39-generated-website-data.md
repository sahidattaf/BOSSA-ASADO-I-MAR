# PR #39 — Generate Website Data From Approved Notion JSON

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-23

## Purpose

Turn the approved BOSSA Notion-style JSON export into generated website data files.

This is the next step after PR #38. PR #38 created the safe content template and validator. PR #39 adds the generator and generated data outputs.

---

## Files added / changed

```text
scripts/generate-bossa-data-from-content.mjs
app/data/site.ts
app/data/media.ts
app/data/payments.ts
app/data/menu.generated.ts
package.json
docs/pr-39-generated-website-data.md
```

---

## Commands

Validate only:

```powershell
npm run validate:content
```

Generate data from JSON:

```powershell
npm run generate:data
```

Validate and generate:

```powershell
npm run content:check
```

---

## Data flow

```text
content/notion/bossa-website-content.template.json
        ↓
scripts/generate-bossa-data-from-content.mjs
        ↓
app/data/site.ts
app/data/media.ts
app/data/payments.ts
app/data/menu.generated.ts
```

---

## Safety rules

- No Notion token added
- No Stripe secret key added
- No packages added
- Payment links remain public Stripe Payment Links only
- WhatsApp confirmation remains first
- Generated files include a header warning not to edit directly

---

## Current integration level

This PR creates generated files but does not yet refactor all pages to consume them.

Reason:

```text
First stabilize generation.
Then refactor pages in a focused PR.
```

Recommended next PR:

```text
PR #40 — Refactor BOSSA pages to use generated site/media data
```

---

## QA checklist

1. Run `npm run validate:content`
2. Run `npm run generate:data`
3. Confirm generated files update
4. Run `npm run build`
5. Confirm no secrets were added
6. Confirm Vercel preview is Ready
