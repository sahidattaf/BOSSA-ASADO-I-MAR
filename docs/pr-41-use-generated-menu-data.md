# PR #41 — Refactor BOSSA Pages to Use Generated Menu Data

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-23

## Purpose

Refactor BOSSA menu content so the homepage uses generated menu data from the approved BOSSA content JSON.

This completes the next automation step after PR #40.

---

## Files changed

```text
content/notion/bossa-website-content.template.json
scripts/generate-bossa-data-from-content.mjs
app/data/menu.ts
app/data/menu.generated.ts
app/page.tsx
docs/pr-41-use-generated-menu-data.md
```

---

## What changed

- Expanded the approved BOSSA content JSON with the full menu structure
- Updated the generator so `app/data/menu.ts` is now generated from the JSON source
- Kept `app/data/menu.generated.ts` as a mirror/debug generated file
- Updated homepage copy from “editable menu” to “generated menu”
- Preserved the existing homepage menu UI and layout

---

## New source-of-truth flow

```text
content/notion/bossa-website-content.template.json
        ↓
npm run validate:content
        ↓
npm run generate:data
        ↓
app/data/menu.ts
        ↓
Homepage menu section
```

---

## Safety rules

- No Notion token added
- No Stripe secret key added
- No packages added
- No payment link changes
- No UI redesign
- Draft menu items are filtered out by the generator
- Coming Soon items stay visible as coming-soon menu records

---

## QA checklist

1. Run `npm run validate:content`
2. Run `npm run generate:data`
3. Run `npm run build`
4. Open `/`
5. Confirm all menu categories show
6. Confirm Weekend Fire Boxes #1–#8 show in homepage menu
7. Confirm Skewers, Sandwiches, Sides, Soups, and Drinks show
8. Confirm Coming Soon items are still clearly labeled in copy
9. Confirm `/weekend-fire` still works
10. Confirm `/party-menu` still works

---

## Next PR

Recommended:

```text
PR #42 — Move Weekend Fire box cards to generated menu data
```

That PR should make `/weekend-fire` consume Box #1–#8 directly from generated `menuSections` instead of maintaining a separate hardcoded `fireBoxes` array.
