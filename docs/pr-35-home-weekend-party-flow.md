# PR #35 — BOSSA Homepage + Weekend + Party/Event Flow

**Owner:** Sahid Attaf  
**Status:** Draft PR  
**Last updated:** 2026-05-21

## Purpose

Clean the public BOSSA website flow after the Weekend Fire customizer, image, and offline export upgrades.

## Main outcome

The website now routes guests into three clear commercial actions:

1. Order Weekend Fire boxes
2. Reserve / contact BOSSA on WhatsApp
3. Request a party or event quote

## Source logic

The updated menu structure is based on the BOSSA Notion menu and Weekend Fire pages, then cleaned into website-ready data inside:

```text
app/data/menu.ts
```

## Pages updated

```text
app/page.tsx
app/weekend-fire/page.tsx
app/party-menu/page.tsx
app/data/menu.ts
docs/pr-35-home-weekend-party-flow.md
```

## Homepage cleanup

- Simplifies navigation
- Uses the real Pietermaai hero image
- Adds clear order/reserve/party cards
- Keeps audio and YouTube videos
- Routes Weekend Fire to the customizer and order flow
- Shows Notion-cleaned menu blocks
- Updates location to Oranjestraat 116 / Pietermaai

## Weekend Fire cleanup

- Syncs Box #1–#8 with final flyer copy and images
- Adds direct order buttons per box
- Keeps audio and YouTube videos
- Keeps the customizer link visible
- Uses final Weekend Fire assets from `public/images/bossa/weekend-fire/`

## Party / Event cleanup

- Converts party page into a cleaner Party / Events flow
- Adds event package cards
- Uses final BOSSA visual assets
- Keeps audio and video proof
- Routes quotes to WhatsApp

## Not touched

- No packages added
- No secrets added
- No Stripe payment links added yet
- No audio/video files changed
- No Weekend Fire customizer export logic changed

## QA checklist

1. Open homepage `/`
2. Confirm hero image loads
3. Confirm Order / Reserve / Party CTA links open WhatsApp
4. Confirm audio plays on homepage
5. Confirm videos load on homepage
6. Open `/weekend-fire`
7. Confirm all 8 box images show
8. Confirm box order buttons open WhatsApp
9. Confirm customizer link opens `/weekend-fire/customize`
10. Open `/party-menu`
11. Confirm package cards and quote buttons work
12. Confirm mobile layout is clean
