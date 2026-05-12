# BOSSA Website Image & Video Assets

This folder is the permanent website asset location for BOSSA Asado i Mar.

Use this folder for final public images and lightweight video assets that should not expire.

## Recommended filenames

```text
/public/images/bossa/
├── hero-fire-grill.jpg
├── hero-fire-grill.mp4
├── roast-box.jpg
├── ribs-box.jpg
├── sandwiches.jpg
├── skewers.jpg
├── soups-stews.jpg
├── weekend-fire-box.jpg
├── party-menu-platter.jpg
├── rooftop-event.jpg
└── marketing-video-poster.jpg
```

## Important
Do not embed temporary Notion signed file URLs directly in the website. Those links expire.

## How to use inside the site

```tsx
<img src="/images/bossa/hero-fire-grill.jpg" alt="BOSSA fire grill" />
```

For video:

```tsx
<video poster="/images/bossa/marketing-video-poster.jpg" controls>
  <source src="/images/bossa/hero-fire-grill.mp4" type="video/mp4" />
</video>
```
