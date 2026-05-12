# BOSSA Asset Map — Notion to Website

Source page in Notion:

- `🔥 Menu Bossa Asado i Mar | Menu`
- Toggle/list: `🔥 ACTIVE WEEKEND MENU`
- Related website pages:
  - `/`
  - `/weekend-fire`
  - `/party-menu`

## Why this map exists

Notion images are returned as temporary signed URLs. They expire, so they should not be embedded directly in the public website.

Use this map to download/export the final images from Notion and upload them into this folder with permanent filenames.

---

## Required image and video files

```text
/public/images/bossa/
├── hero-fire-grill.jpg
├── hero-fire-grill.mp4
├── roast-box.jpg
├── classic-chicken-box.jpg
├── ribs-box.jpg
├── community-fire-box.jpg
├── weekend-fire-box.jpg
├── sandwiches.jpg
├── beef-tenderloin-sandwich.jpg
├── skewers.jpg
├── soups-stews.jpg
├── peanut-stew.jpg
├── boiled-peanuts.jpg
├── party-menu-platter.jpg
├── rooftop-event.jpg
├── marketing-video-poster.jpg
└── party-menu-video.mp4
```

---

## Homepage hero

| Website slot | File |
|---|---|
| Main hero image | `hero-fire-grill.jpg` |
| Optional hero video | `hero-fire-grill.mp4` |
| Poster / fallback | `marketing-video-poster.jpg` |

---

## Menu sections

| Section | File |
|---|---|
| Bossa Roast Boxes | `roast-box.jpg` |
| Community Fire Box | `community-fire-box.jpg` |
| Chicken Classic | `classic-chicken-box.jpg` |
| Ribs Box | `ribs-box.jpg` |
| Sandwiches | `sandwiches.jpg` |
| Beef Tenderloin Sandwich | `beef-tenderloin-sandwich.jpg` |
| Skewers | `skewers.jpg` |
| Soups & Stews | `soups-stews.jpg` |
| Peanut Stew Bowl | `peanut-stew.jpg` |
| Boiled Peanuts | `boiled-peanuts.jpg` |

---

## Weekend Fire page

| Website slot | File |
|---|---|
| Weekend Fire hero | `weekend-fire-box.jpg` |
| Community Fire Box card | `community-fire-box.jpg` |
| Chicken Classic card | `classic-chicken-box.jpg` |
| Ribs Classic card | `ribs-box.jpg` |
| Marketing video poster | `marketing-video-poster.jpg` |

---

## Party Menu page

| Website slot | File |
|---|---|
| Party hero / group platter | `party-menu-platter.jpg` |
| Weekend boxes | `weekend-fire-box.jpg` |
| Rooftop event / mood | `rooftop-event.jpg` |
| Party menu video | `party-menu-video.mp4` |
| Video poster | `marketing-video-poster.jpg` |

---

## Marketing video section

Expected public files:

```text
/images/bossa/marketing-video-poster.jpg
/images/bossa/party-menu-video.mp4
/images/bossa/hero-fire-grill.mp4
```

Recommended reel structure from Notion:

1. 0–2s: hook
2. 2–12s: visual proof / fire close-ups
3. 12–20s: menu highlight
4. 20–25s: WhatsApp CTA

Core line:

```text
Fire decides the rhythm.
```

---

## Upload rule

Do not upload random filenames. Rename files first using the exact names above so the website can reference them cleanly.

---

## Next implementation step

After these files are uploaded, update:

- `app/page.tsx`
- `app/weekend-fire/page.tsx`
- `app/party-menu/page.tsx`

and replace placeholders with real `<img>` / `<video>` blocks.
