# BOSSA Vercel Automatic Launch Plan

This document makes the GitHub to Vercel launch process repeatable.

## Goal

Every accepted change to `main` should automatically deploy through Vercel.

## Production route

- Website: https://www.bossaasado.com
- AI Manager: https://www.bossaasado.com/ai-manager
- Vercel preview: https://bossa-asado-i-mar.vercel.app

## Required Vercel project settings

- Framework: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Development command: `npm run dev`
- Production branch: `main`

## Required environment variables

Copy values from `.env.example` into Vercel Project Settings.

Required now:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NOTION_API_KEY`
- `NOTION_LEADS_DATABASE_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional future variables:

- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `RESEND_API_KEY`
- `WHATSAPP_CLOUD_API_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `STRIPE_SECRET_KEY`

## GitHub workflow

1. Work on a branch.
2. Open a pull request.
3. Review Vercel preview.
4. Merge to `main`.
5. Vercel automatically launches production.
6. Update Notion with the live link and review notes.

## Manual checks before launch

Run locally or through GitHub/Vercel build logs:

```bash
npm install
npm run content:check
npm run typecheck
npm run build
```

## Immediate launch checklist

- [x] `/ai-manager` route exists.
- [x] Public floating chrome hidden from `/ai-manager`.
- [x] WhatsApp quick actions added.
- [x] Lead capture form added.
- [x] `.env.example` added.
- [x] `vercel.json` added.
- [ ] Confirm Vercel Git integration is connected to `sahidattaf/BOSSA-ASADO-I-MAR`.
- [ ] Confirm production branch is `main`.
- [ ] Add environment variables in Vercel.
- [ ] Confirm latest deployment passes.
- [ ] Test `/ai-manager` on desktop and mobile.

## Important note

Do not store real API keys in GitHub. Keep secrets only inside Vercel Environment Variables and GitHub Secrets.
