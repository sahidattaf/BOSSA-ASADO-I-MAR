# PR #44 — Add Generated Data Validation for Party/Event Package Image Paths

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-24

## Purpose

Add validation for `partyPackages` inside `content/notion/bossa-website-content.template.json` so Party/Event package cards cannot ship with missing or broken image paths.

This protects the `/party-menu` page after PR #43 moved package cards to generated content data.

---

## Files changed

```text
scripts/validate-bossa-content.mjs
docs/pr-44-party-package-validation.md
```

---

## What changed

The validator now checks each `partyPackages` record for:

- `name`
- `price`
- `bestFor`
- `description`
- `status`
- `image`
- valid image path in `public/` or a valid external `https://` / `http://` URL
- no `draft` package in the publish template

---

## Why this matters

The Party/Event page now reads package cards from generated data. If a package image path is wrong, the website can still build but the visual card may break.

This PR catches that before deploy.

---

## Safety rules

- No packages added
- No secrets added
- No Stripe link changes
- No Notion token added
- No UI changes
- No generated data output changes

---

## QA checklist

1. Run `npm run validate:content`
2. Confirm it prints `BOSSA content validation passed.`
3. Temporarily break one `partyPackages.image` path locally
4. Run `npm run validate:content` again
5. Confirm validation fails with a clear Party package image error
6. Restore the correct image path
7. Run `npm run validate:content`
8. Run `npm run build`

---

## Next PR

Recommended:

```text
PR #45 — Add validation for generated website routes and payment route mapping
```

That PR should verify every payment route and primary route points to a known website path.
