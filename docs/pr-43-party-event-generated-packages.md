# PR #43 — Move Party/Event Packages to Generated Content Data

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-24

## Purpose

Move `/party-menu` package cards from a hardcoded `partyPackages` array into generated content data.

This continues the BOSSA Notion → approved JSON → generated website data architecture.

---

## Files changed

```text
content/notion/bossa-website-content.template.json
scripts/generate-bossa-data-from-content.mjs
app/data/party-packages.ts
app/party-menu/page.tsx
docs/pr-43-party-event-generated-packages.md
```

---

## What changed

- Adds `partyPackages` to the approved BOSSA content JSON
- Updates the generator to output `app/data/party-packages.ts`
- Creates generated `party-packages.ts`
- Updates `/party-menu` to import and render generated party package data
- Removes the hardcoded `partyPackages` array from `/party-menu`
- Preserves WhatsApp quote flow
- Preserves Stripe deposit buttons
- Preserves audio and video sections

---

## Source-of-truth flow

```text
content/notion/bossa-website-content.template.json
        ↓
npm run generate:data
        ↓
app/data/party-packages.ts
        ↓
/party-menu package cards
```

---

## Safety rules

- No packages added
- No secrets added
- No Stripe link changes
- No Notion token added
- No CSS redesign
- No Weekend Fire customizer changes
- WhatsApp quote flow preserved
- Stripe deposit section preserved

---

## QA checklist

1. Run `npm run validate:content`
2. Run `npm run generate:data`
3. Run `npm run build`
4. Open `/party-menu`
5. Confirm all package cards display
6. Confirm all package images load
7. Confirm quote buttons open WhatsApp
8. Confirm Party/Event deposit buttons still open Stripe test checkout
9. Confirm audio and videos still load
10. Confirm `/weekend-fire` still works
11. Confirm homepage still works

---

## Next PR

Recommended:

```text
PR #44 — Add generated data validation for Party/Event package image paths
```

That PR should extend `scripts/validate-bossa-content.mjs` to validate `partyPackages` just like menu items.
