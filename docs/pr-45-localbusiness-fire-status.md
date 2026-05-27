# PR #45 — Add LocalBusiness SEO Schema + Fire Rhythm Status Bar

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-26

## Purpose

Improve BOSSA’s search visibility and guest clarity by adding LocalBusiness / Restaurant structured data and a homepage Fire Rhythm status bar.

This moves BOSSA from a simple landing page toward a stronger local SEO and conversion interface.

---

## Files changed

```text
app/layout.tsx
app/page.tsx
app/globals.css
docs/pr-45-localbusiness-fire-status.md
```

---

## What changed

### 1. LocalBusiness / Restaurant JSON-LD

Adds structured data for:

- Business name
- Restaurant type
- Description
- Website URL
- Phone / WhatsApp number
- Price range
- Cuisine types
- Hero image
- Address
- Area served
- Thursday–Sunday opening hours
- WhatsApp reserve action

### 2. Fire Rhythm Status Bar

Adds a visual status bar to the homepage:

```text
🔥 Fire Rhythm
Live Thursday–Sunday · 12 PM–10 PM
When the fire rests, we close. WhatsApp first for today’s batch.
```

---

## Why this matters

- Helps Google understand BOSSA as a restaurant in Pietermaai / Willemstad / Curaçao
- Reinforces the Thursday–Sunday operating rhythm
- Reduces guest confusion about when orders are active
- Creates a clear “follow the smoke → confirm batch” conversion path

---

## Safety rules

- No packages added
- No secrets added
- No Stripe changes
- No Notion token added
- No generated data changes
- No payment flow changes
- Static status bar only; dynamic open/closed logic can come later

---

## QA checklist

1. Run `npm run validate:content`
2. Run `npm run build`
3. Open `/`
4. Confirm Fire Rhythm bar appears above the homepage header
5. Confirm layout is clean on mobile
6. Inspect page source / DOM and confirm JSON-LD script exists
7. Confirm WhatsApp sticky button still works
8. Confirm `/weekend-fire` still works
9. Confirm `/party-menu` still works

---

## Next PR

Recommended:

```text
PR #46 — Make Live Fire status dynamic by day/time
```

That PR can calculate whether BOSSA is inside the Thursday–Sunday 12 PM–10 PM fire window and change the status automatically.
