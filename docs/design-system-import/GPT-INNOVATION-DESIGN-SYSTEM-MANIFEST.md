# GPT Innovation Design System Import Manifest

This document records the uploaded Claude Design export so the BOSSA repo can integrate it safely without filling the local PC.

## Source archive

- Uploaded file: `GPT Innovation Design System.zip`
- Import branch: `feature/design-system-import`
- Intended destination in repo: `docs/design-system-import/` first, then selected production files into `app/`, `components/`, `public/`, and `docs/` after review.

## What is inside the export

The archive contains a complete design system and prototype package:

- `SKILL.md`
- Design system bundle and manifest files
- Brand assets and logo SVGs
- Social/export-ready assets
- Print assets
- `bossa/` prototype app files
- Supabase SQL docs
- Prisma schema docs
- Reusable React component primitives
- UI cards and component prompts
- Layouts for about, dashboard, CRM, blog, landing page, contact, login, newsletter, and industry templates
- Export helpers for Tailwind, React, Next.js, Figma/Canva guidance

## Safe import rule

Do not overwrite the existing BOSSA Next.js app with the whole archive.

Correct workflow:

1. Keep the archive as source material.
2. Review visual assets and component patterns.
3. Copy selected files into the existing BOSSA app.
4. Convert static HTML prototypes into real Next.js routes.
5. Run CI and Vercel preview before merging.

## Recommended integration phases

### Phase 1 — Documentation and archive tracking

- Add this manifest.
- Add integration plan.
- Link GitHub issue and Notion operating page.

### Phase 2 — Design tokens

- Review `export/design-tokens.json`.
- Review `export/tailwind.gpt-innovation.js`.
- Merge useful BOSSA-compatible tokens into `app/globals.css` or a future `styles/tokens.css`.

### Phase 3 — BOSSA AI Manager dashboard

- Use `bossa/index.html`, `bossa/app.js`, `bossa/pages.js`, and `bossa/tenants.js` as prototype references.
- Rebuild as Next.js route: `app/ai-manager/page.tsx`.
- Keep BOSSA as first tenant.
- Prepare future multi-tenant Hospitality OS structure.

### Phase 4 — Database docs

- Review `bossa/docs/supabase.sql`.
- Review `bossa/docs/0002_multitenant.sql`.
- Review `bossa/docs/schema.prisma`.
- Convert into official repo migrations only after approval.

### Phase 5 — Brand/export assets

- Move selected logo SVGs into `public/brand/`.
- Move selected social/print HTML assets into `docs/marketing-assets/` or rebuild them as real templates.

## GitHub tracking

- Issue: https://github.com/sahidattaf/BOSSA-ASADO-I-MAR/issues/52
- Repo: https://github.com/sahidattaf/BOSSA-ASADO-I-MAR

## Notion tracking

- Operating page: https://app.notion.com/p/391a269fc94781289c13fee01a50d9b0

## Acceptance criteria

- No production files are overwritten blindly.
- Import happens on a feature branch.
- Vercel preview works.
- GitHub Actions pass.
- BOSSA homepage remains live.
- AI Manager dashboard is created as a proper Next.js route.
- Hospitality OS multi-tenant model remains documented and isolated until ready.
