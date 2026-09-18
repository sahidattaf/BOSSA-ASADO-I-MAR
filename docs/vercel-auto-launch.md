# BOSSA Vercel Automatic Launch Plan

This document makes the GitHub to Vercel launch process repeatable.

## Environment-variable boundary

Copy only approved public values into Vercel Project Settings.

- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_WHATSAPP_NUMBER

Never place SUPABASE_SERVICE_ROLE_KEY in Vercel, .env.example, next.config.mjs, or the repository. The service-role key is reserved for a separately approved server-only runtime or Supabase Edge Function secret. This PR changes no Vercel setting or Supabase secret.

## GitHub workflow

1. Work on a branch.
2. Open a pull request.
3. Run CI and secret/RLS checks.
4. Perform authenticated and unauthenticated preview QA.
5. Obtain merge approval before merging to main.
6. Handle production launch as a separate approved action.

## Manual checks

npm ci
npm run security:check
npm run typecheck
npm run build

Do not store real API keys in GitHub. Keep secrets only in the approved secret manager or explicitly approved server-only runtime.