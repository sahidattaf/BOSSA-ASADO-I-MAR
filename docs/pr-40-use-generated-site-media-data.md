# PR #40 — Refactor BOSSA Pages to Use Generated Site / Media Data

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-23

## Purpose

Refactor the BOSSA public pages to consume generated website data from PR #39.

This moves repeated site and media values into generated data files so future Notion-driven updates can flow more cleanly.

---

## Files changed

```text
app/page.tsx
app/weekend-fire/page.tsx
app/party-menu/page.tsx
docs/pr-40-use-generated-site-media-data.md
```

---

## Generated data consumed

```text
app/data/site.ts
app/data/media.ts
app/data/payments.ts
```

### Homepage

Uses:

- `siteConfig.brandName`
- `siteConfig.whatsappNumber`
- `siteConfig.address`
- `siteConfig.hours`
- `mediaAssets.audio`
- `mediaAssets.videos`

### Weekend Fire

Uses:

- `siteConfig.brandName`
- `siteConfig.whatsappNumber`
- `siteConfig.address`
- `siteConfig.hours`
- `mediaAssets.audio`
- `mediaAssets.videos`
- `paymentLinks`
- `paymentDisclaimer`

### Party / Events

Uses:

- `siteConfig.brandName`
- `siteConfig.whatsappNumber`
- `siteConfig.address`
- `siteConfig.hours`
- `mediaAssets.audio`
- `mediaAssets.videos`
- `paymentLinks`
- `paymentDisclaimer`

---

## Not changed

- No packages added
- No secrets added
- No Notion token added
- No Stripe secret key added
- No payment link changes
- No CSS changes
- No generated script changes

---

## Why this matters

Before this PR, the website repeated values such as WhatsApp number, audio path, video links, address, and hours in multiple pages.

After this PR, those values are pulled from generated data files. This prepares BOSSA for the next automation step:

```text
Notion approved content JSON → generated data files → website pages
```

---

## QA checklist

1. Run `npm run validate:content`
2. Run `npm run generate:data`
3. Run `npm run build`
4. Open `/`
5. Confirm homepage audio plays
6. Confirm homepage YouTube videos load
7. Open `/weekend-fire`
8. Confirm Weekend Fire audio plays
9. Confirm Weekend Fire videos load
10. Confirm Stripe test deposit button still opens
11. Open `/party-menu`
12. Confirm Party/Event audio plays
13. Confirm Party/Event videos load
14. Confirm Party/Event Stripe test buttons still open
15. Confirm address and hours display correctly

---

## Next PR

Recommended:

```text
PR #41 — Refactor BOSSA pages to use generated menu data
```

That PR should carefully move menu/card content toward `app/data/menu.generated.ts` or improve the generator so it can fully replace manual menu structures.
