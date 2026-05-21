# BOSSA Weekend Fire — Offline HTML Export

**Owner:** Sahid Attaf  
**Status:** Draft / PR #34  
**Last updated:** 2026-05-21

## Purpose

Upgrade the internal `/weekend-fire/customize` tool so `Save Offline HTML` creates a self-contained HTML file with embedded images.

## Problem solved

The old HTML export saved the flyer markup, but images could break when opening the file from Downloads or another folder because the images still pointed to website-relative paths such as `/images/bossa/...`.

## What changed

- Converts flyer images into `data:` URLs before saving the HTML.
- Keeps edited text inside the exported HTML.
- Renames the button from `Save as HTML` to `Save Offline HTML`.
- Adds a small offline export banner in the saved file.
- Keeps PNG and Print/PDF export flows unchanged.

## Scope

Changed only:

```text
app/weekend-fire/customize/EditableWeekendFlyer.tsx
docs/weekend-fire-offline-html-export.md
```

## Not touched

- Customer `/weekend-fire` page
- Videos
- Audio
- Homepage
- Packages
- Secrets

## QA checklist

1. Open `/weekend-fire/customize`.
2. Confirm all 8 images load.
3. Edit one text field.
4. Click `Save Offline HTML`.
5. Open `bossa-weekend-box-offline.html` from Downloads.
6. Confirm images are visible offline.
7. Confirm text remains editable.
8. Confirm `Download PNG` still works.
9. Confirm `Print / PDF` still works.
10. Open `/weekend-fire` and confirm videos/audio are unchanged.

## Known limitation

If a remote image blocks browser fetch/CORS, the exporter keeps the original image URL and adds a `data-export-warning` attribute. Local BOSSA images should embed correctly.
