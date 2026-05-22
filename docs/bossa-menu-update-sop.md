# BOSSA Menu Update SOP

**Owner:** Sahid Attaf  
**Status:** Draft SOP  
**Last updated:** 2026-05-21  
**System:** BOSSA Website OS

---

## Purpose

This SOP explains how to update the BOSSA menu safely from Notion into the public website without breaking the live pages.

---

## Golden rule

```text
Do not edit random website copy in multiple places.
Update the correct source file, test locally, then create a focused PR.
```

---

## Current website menu source

The public menu blocks are controlled here:

```text
app/data/menu.ts
```

This file feeds the homepage menu section.

Weekend Fire box cards are also shown directly in:

```text
app/weekend-fire/page.tsx
```

The editable flyer customizer has its own internal copy here:

```text
app/weekend-fire/customize/EditableWeekendFlyer.tsx
```

---

## When to update which file

| Change type | Update file |
| --- | --- |
| Homepage menu category, price, description | `app/data/menu.ts` |
| Weekend Fire public page box cards | `app/weekend-fire/page.tsx` |
| Editable flyer default copy/images | `app/weekend-fire/customize/EditableWeekendFlyer.tsx` |
| Party/event package cards | `app/party-menu/page.tsx` |
| Image asset | `public/images/bossa/` |
| Audio asset | `public/audio/bossa/` |
| General website copy | `app/page.tsx` |

---

## Menu update workflow

### Step 1 — Update Notion first

Use the BOSSA Notion menu as the working draft.

For each item confirm:

- Name
- Category
- Price
- Description
- Status: Active / Coming Soon / Draft
- Image if needed
- Order type: Dine-in / Take-out / Party / Weekend Fire

---

### Step 2 — Clean the text for website

Website copy should be shorter than Notion copy.

Use this format:

```ts
{
  name: 'Item Name',
  price: 'XCG 49.50',
  description: 'One clean sentence explaining what the guest gets.',
}
```

---

### Step 3 — Edit the correct source file

For homepage menu:

```text
app/data/menu.ts
```

For Weekend Fire public page:

```text
app/weekend-fire/page.tsx
```

For flyer default copy:

```text
app/weekend-fire/customize/EditableWeekendFlyer.tsx
```

---

### Step 4 — Test locally

Run:

```powershell
cd C:\Users\sahid\Documents\GitHub\BOSSA-ASADO-I-MAR
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/weekend-fire
http://localhost:3000/weekend-fire/customize
http://localhost:3000/party-menu
```

---

### Step 5 — Commit safely

Use a focused branch:

```powershell
git switch main
git pull origin main
git checkout -b menu/update-bossa-menu
```

Add only intended files:

```powershell
git add app/data/menu.ts app/weekend-fire/page.tsx app/weekend-fire/customize/EditableWeekendFlyer.tsx app/party-menu/page.tsx
```

Commit:

```powershell
git commit -m "Update BOSSA menu content"
git push origin menu/update-bossa-menu
```

---

## QA checklist

- [ ] Prices use the same currency format
- [ ] No old ANG/XCG mismatch unless intentionally approved
- [ ] Menu cards do not overflow on mobile
- [ ] WhatsApp links still work
- [ ] Box numbers match flyer
- [ ] Images load
- [ ] Audio still plays
- [ ] Videos still load
- [ ] Customizer still exports PNG
- [ ] Customizer still exports offline HTML
- [ ] Vercel preview is Ready before merge

---

## Current menu categories

- Weekend Fire Boxes
- Skewers / Pinchos
- Fire Bread Sandwiches
- Sides & Add-ons
- Soups & Stews
- Drinks / Bebidas
- Party / Event Packages
- Weekend Fire & Sea Specials — Coming Soon

---

## Content quality rules

### Good menu copy

```text
Fire-roasted chicken with garlic sauce, fire bread, and baked potato.
```

### Bad menu copy

```text
Very delicious amazing chicken that everyone will love with a lot of flavor and many things.
```

### Rules

- Keep descriptions short
- Say what is included
- Avoid overpromising
- Use Coming Soon when not ready
- Do not add payment language until Stripe is approved

---

## Decision log

| Decision | Status |
| --- | --- |
| Use Notion as menu planning source | Active |
| Use `app/data/menu.ts` as website menu source | Active |
| Keep flyer customizer separate from public menu | Active |
| Add Stripe only after payment rules are approved | Pending PR #37 |
