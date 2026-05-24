# PR #42 — Move Weekend Fire Box Cards to Generated Menu Data

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-23

## Purpose

Move the `/weekend-fire` public box cards from a hardcoded `fireBoxes` array into generated menu data from `app/data/menu.ts`.

This continues the BOSSA Notion → JSON → generated website data architecture.

---

## Files changed

```text
app/weekend-fire/page.tsx
docs/pr-42-weekend-fire-generated-boxes.md
```

---

## What changed

- Imports `menuSections` from `app/data/menu.ts`
- Finds the generated `weekend-boxes` section
- Uses the generated Box #1–#8 records for the Weekend Fire card grid
- Extracts the box number from names like `Box #1 — BOSSA Box Mix`
- Cleans the public display name by removing the `Box #` prefix
- Keeps WhatsApp order links working per box
- Keeps images, tags, prices, and descriptions controlled by generated menu data

---

## Source-of-truth flow

```text
content/notion/bossa-website-content.template.json
        ↓
npm run generate:data
        ↓
app/data/menu.ts
        ↓
/weekend-fire box cards
```

---

## Safety rules

- No packages added
- No secrets added
- No Stripe changes
- No Notion token added
- No CSS redesign
- No customizer change
- WhatsApp order flow preserved
- Stripe deposit section preserved

---

## QA checklist

1. Run `npm run validate:content`
2. Run `npm run generate:data`
3. Run `npm run build`
4. Open `/weekend-fire`
5. Confirm Box #1–#8 all display
6. Confirm images load for all boxes
7. Confirm names are clean without duplicate `Box #` text
8. Confirm each `Order Box #` button opens WhatsApp
9. Confirm deposit button still opens Stripe test checkout
10. Confirm audio and videos still load
11. Confirm `/weekend-fire/customize` still works
12. Confirm homepage and party page still build

---

## Next PR

Recommended:

```text
PR #43 — Move Party/Event packages to generated menu/content data
```

That will remove the hardcoded `partyPackages` array from `/party-menu` and connect it to the same generated content system.
