# AGENTS.md — BOSSA Asado i Mar

Governance and operating guide for AI agents (Claude Code, Codex, and similar tools) working in this repository.

**Repo:** `sahidattaf/BOSSA-ASADO-I-MAR`
**Production domain:** <https://bossaasado.com>
**Stack:** Next.js (App Router) + TypeScript + React, deployed on Vercel

---

## 1. Mission

BOSSA Asado i Mar is a Curaçao fire-grill restaurant concept in Pietermaai, Willemstad, built around fire, smoke, sea, rooftop energy, and WhatsApp-first ordering and reservations.

This repository is the public website and the foundation of BOSSA's "AI Hospitality OS" — a codebase that supports:

- A customer-facing marketing and ordering website (`bossaasado.com`)
- A controlled, validated content pipeline (Notion → JSON → generated data → pages)
- A lead-capture layer (Notion + Supabase)
- Documentation that lets AI agents and human operators work safely without breaking production

Every change an agent makes should move the site toward being **simple for customers, controlled for operators, and safe for the business.**

---

## 2. Source-of-Truth Files

| Area | Source of truth | Notes |
| --- | --- | --- |
| Public content (menu, site config, media, payments) | `content/notion/bossa-website-content.template.json` | Edit here, then regenerate |
| Generated site config | `app/data/site.ts` | Auto-generated — do not hand-edit |
| Generated media data | `app/data/media.ts` | Auto-generated — do not hand-edit |
| Generated payment links | `app/data/payments.ts` | Auto-generated — do not hand-edit |
| Generated menu data | `app/data/menu.ts`, `app/data/menu.generated.ts` | Auto-generated — do not hand-edit |
| Party/event packages | `app/data/party-packages.ts` | See `docs/pr-43-party-event-generated-packages.md`, `docs/pr-44-party-package-validation.md` |
| Content validation | `scripts/validate-bossa-content.mjs` | Run via `npm run validate:content` |
| Content generation | `scripts/generate-bossa-data-from-content.mjs` | Run via `npm run generate:data` |
| Original business plan | `bossa_codex_plan.md` | Historical/strategic reference, not a build input |
| Database schema | `supabase/migrations/20260531_create_bossa_leads.sql` | `public.bossa_leads` table |
| Operating docs | `docs/` | Production checklist, QA checklist, content workflow, payment safety policy, Supabase schema, analytics/leads plan, agent directory, etc. |

If a doc in `docs/` conflicts with the actual code, treat the code as current truth, flag the discrepancy, and ask before "fixing" the doc or the code.

---

## 3. BOSSA Business Priorities

1. **WhatsApp is the primary conversion channel.** Every ordering/reservation/quote flow must end in a WhatsApp handoff (`wa.me/<number>` with a pre-filled message). WhatsApp number: `+5999 523 0683` (`59995230683`).
2. **Weekend Fire Boxes are the flagship product.** Routes: `/weekend-fire` and `/weekend-fire/customize`. Boxes are numbered (#1–#8) and ordered "by number."
3. **Party/Event quotes are the upsell path.** Route: `/party-menu`. These are quote requests, not instant bookings.
4. **Payments are secondary and confirmation-gated.** Per `docs/payment-safety-policy.md`: no customer should pay a deposit before BOSSA confirms availability on WhatsApp.
5. **Brand voice:** fire-grill, Caribbean, premium-but-simple, local + tourist friendly. Avoid the word "gourmet."
6. **Site config facts** (from `app/data/site.ts`, generated):
   - Brand name: BOSSA Asado i Mar
   - Address: Oranjestraat 116, Pietermaai, Willemstad, Curaçao
   - Hours: Thursday–Sunday · 12:00 PM–10:00 PM
   - Primary routes: `/`, `/weekend-fire`, `/weekend-fire/customize`, `/party-menu`

Do not change prices, hours, address, partners, or WhatsApp number unless explicitly instructed — these are business facts, not code defaults.

---

## 4. Repository Rules

- **Inspect before editing.** Read the relevant file, related doc in `docs/`, and any generated-data warning headers before changing anything.
- **Do not invent** files, integrations, prices, opening hours, partner names, menu items, or deployment status. If information isn't in the repo, ask or mark it as "to be confirmed."
- **Do not hand-edit generated files.** Files with an `// AUTO-GENERATED from content/notion/bossa-website-content.template.json` header must be edited via the JSON source + `npm run generate:data`.
- **No secrets in the repo.** Never commit `.env`, `.env.local`, API keys, Stripe secret keys (`sk_*`), Supabase service role keys, or Notion tokens. `.gitignore` already excludes `.env*` — keep it that way.
- **Image/media rules** (per `docs/content-workflow.md`): store under `public/images/bossa/`, lowercase filenames with hyphens, no spaces, validate paths exist before referencing them.
- **Public copy rules:** avoid internal/developer language on customer-facing pages — no "prototype," "JSON," "PR," "Notion source," "generated data," "editable block." Use customer language: "Weekend Fire Boxes," "Order on WhatsApp," "Confirm availability first," etc.
- **Keep changes scoped.** One PR/branch = one clear purpose (matches `docs/production-checklist.md` Gate 1).

---

## 5. Deployment Rules

- **Platform:** Vercel, connected to this GitHub repo. Pushes to `main` trigger production deploys.
- **Root rewrite:** `next.config.mjs` currently rewrites `/` → `/weekend-fire.html` (a static file in `public/`). Verify this is still the intended behavior before changing the homepage — `app/page.tsx` is also an active, expanding route (BOSSA V2 revenue pages).
- **No secrets in `next.config.mjs` or any committed config.** Environment variables (e.g. `NOTION_API_KEY`, `NOTION_LEADS_DATABASE_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Stripe payment link envs) live only in Vercel project settings.
- **Before declaring a change deploy-ready**, confirm:
  - `npm install` succeeds
  - `npm run validate:content` passes
  - `npm run generate:data` runs cleanly (if content changed)
  - `npm run build` succeeds
- Do not claim a feature is "live in production" unless you have evidence (build success + the actual push/merge happened). Status like "connected to Vercel" or "domain mapped" should not be asserted unless confirmed in the repo or by the user.

---

## 6. Testing Rules

This repo has **no automated test suite** (only `node_modules` ships with `next`'s internal tests, which are not project tests).

"Testing" here means:

1. **Content validation:** `npm run validate:content`
2. **Data generation:** `npm run generate:data` (or both via `npm run content:check`)
3. **Build check:** `npm run build`
4. **Manual QA against the checklists:**
   - `docs/production-checklist.md` — pre/post-deploy gates (content, build, WhatsApp, payments, mobile, security, Vercel preview, production verification)
   - `docs/qa-checklist.md` — page-by-page customer-facing QA (homepage, Weekend Fire, customizer, party menu, WhatsApp, payments, mobile, SEO, accessibility)

If you add new logic (API routes, validation scripts, generators), prefer adding focused checks to these scripts/checklists over introducing a new test framework without discussion.

---

## 7. Notion Integration Rules

- **Content source:** `content/notion/bossa-website-content.template.json` represents content that originated from (or is destined for) Notion-managed tables. It is the only approved input to `scripts/generate-bossa-data-from-content.mjs`.
- **Lead capture:** `app/api/leads/route.ts` and `app/api/admin/leads/*` integrate with Notion via:
  - `NOTION_API_KEY`
  - `NOTION_LEADS_DATABASE_ID`
  
  These must only exist as environment variables (Vercel), never hardcoded. If they're missing, the API must keep working (graceful fallback to server-side logging) — do not make Notion a hard dependency for lead submission.
- **Roadmap reference:** `docs/notion-to-website-automation-plan.md` describes the staged plan (manual export → JSON export → full Notion API sync via GitHub Actions). Do not implement live Notion API sync beyond what already exists unless the plan stage explicitly allows it and validation/preview flow is stable.
- **Validation requirement** before content reaches the site (per the automation plan): every active item has name, category, price (or `TBD`), description, and a valid image path under `public/images/bossa/`; draft items never publish; coming-soon items are labeled.
- **Decision logging:** per `docs/bossa-v2.1-analytics-leads.md`, business/process decisions tied to analytics and lead capture are recorded in Notion (`01 — Command Center → Decision Log`) and in the external `sahid-ai-clone-pack` memory system (see Section 11). Do not invent new Notion database names or IDs.

---

## 8. Claude Code and Codex Instructions

When operating in this repository:

1. **Inspect first.** Read `README.md`, the relevant `docs/*.md`, `package.json`, and the target files before making changes. Use `git status` / `git log` to understand current state — do not assume.
2. **Stay in scope.** If asked for governance docs, content changes, or a specific fix, do not refactor unrelated code, rename files, or "clean up" beyond the request.
3. **Respect the content pipeline.** Menu, pricing, payment, and site-config changes go through `content/notion/bossa-website-content.template.json` → `validate:content` → `generate:data`, not direct edits to `app/data/*.ts`.
4. **Respect payment safety.** Any change touching payments must follow `docs/payment-safety-policy.md` — WhatsApp confirmation first, disclaimer visible, no secret keys, test links clearly marked.
5. **No secrets, ever.** Do not write API keys, tokens, or credentials into source files, configs, or commit messages — including "example" values that look real.
6. **Branching and pushes:**
   - Do not push directly to `main`.
   - Use a descriptively named branch (see Section 10 for conventions).
   - Open a PR for review rather than merging directly, unless the user explicitly instructs otherwise for a specific change.
7. **Show your work before committing.** For documentation or config changes with business impact, show the full file content to the user before committing.
8. **Run available validation** (`npm run validate:content`, `npm run generate:data`, `npm run build`, markdown lint if configured) before reporting a task as complete, and report actual results — not assumed success.
9. **Don't claim unverified state.** Don't say something is "deployed," "live," "connected to Vercel," or "tested in browser" unless you've actually verified it in this session.

---

## 9. Supabase Governance

- **Schema:** `supabase/migrations/20260531_create_bossa_leads.sql` defines `public.bossa_leads` — the lead-tracking table for safe, non-sensitive WhatsApp/order/quote CTA events.
- **Project reference (from migration comment):** `zgfncoexiqnqeqaxpqdy` — treat as informational only; do not assume live connection without confirmation.
- **Row Level Security (RLS):**
  - Enabled on `bossa_leads`.
  - `anon` role: insert-only, restricted to the allowed `lead_type` values, and `metadata` must be a JSON object.
  - `authenticated` role: full access (for future internal dashboards).
- **No PII in `metadata`.** The migration comment explicitly warns: do not store private customer contact or payment data in `metadata` from the browser.
- **Secrets boundary** (per `docs/bossa-v2.1-analytics-leads.md` and `docs/payment-safety-policy.md`):
  - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` may live in Vercel env vars (public, insert-only via RLS).
  - `SUPABASE_SERVICE_ROLE_KEY` must **never** appear in Vercel, `next.config.mjs`, or any repo file — only in Supabase Edge Function secrets, if/when those are built.
- **Future tables** (`whatsapp_events`, `payments`, `leads`) are documented as planning-only in `docs/supabase-leads-schema.md` — do not create them in the repo without confirming the Supabase project is provisioned and env vars are set in Vercel.
- Any new migration must follow the same pattern: RLS enabled, anon scope minimized, comments documenting intent and PII boundaries.

---

## 10. GitHub Workflow Standards

- **Branch naming** (observed convention in this repo):
  - `feature/<short-description>`
  - `fix/<short-description>`
  - `refactor/<short-description>`
  - `docs/<short-description>`
  - `polish/<short-description>`
  - `hotfix/<short-description>`
  - `update/<short-description>`
  - `validation/<short-description>`
  - `seo/<short-description>`
- **Commit message style:** conventional, e.g. `feat: ...`, `fix: ...`, `docs: ...`, `content: ...`, `refactor: ...`, `chore: ...`. Match the style visible in `git log`.
- **No direct pushes to `main`.** All changes land via PRs from a feature/docs/fix branch.
- **PR documentation:** significant PRs are documented under `docs/pr-NN-*.md` (see `docs/pr-35-*.md` through `docs/pr-44-*.md`). For governance or architecture-level PRs, consider adding a similar doc if it helps future agents/operators.
- **Pre-PR checklist:** run the relevant gates from `docs/production-checklist.md` (install, validate:content, generate:data, build, no-secrets grep) before opening a PR that touches content, data, or config.

---

## 11. Relationship to `sahid-ai-clone-pack`

`sahid-ai-clone-pack` is referenced in this repo's documentation (`docs/bossa-v2.1-analytics-leads.md`) as an **external** location for recording business/process decisions:

> "Record decisions in `sahid-ai-clone-pack/memory/decisions.md` and Notion → 01 — Command Center → Decision Log."

It is **not part of this repository** — there is no `sahid-ai-clone-pack` directory here, and no further structure for it is defined in this codebase. Treat it as:

- An external memory/decision-log system maintained outside this repo.
- A pointer only — do not create, simulate, or assume the contents of `sahid-ai-clone-pack` from within this repo.
- If a task seems to require writing to `sahid-ai-clone-pack`, flag this to the user rather than inventing a path or file structure inside `BOSSA-ASADO-I-MAR`.

---

## 12. Completion Checklist

Before marking any task in this repo "done," confirm:

```text
[ ] Read the relevant docs/*.md and existing code before editing
[ ] No secrets (.env, sk_*, Notion tokens, Supabase service role keys) added
[ ] Content changes went through content/notion/bossa-website-content.template.json
    + npm run validate:content + npm run generate:data (if applicable)
[ ] npm run build passes (if code/config changed)
[ ] Generated files (app/data/*.ts) were not hand-edited directly
[ ] Public-facing copy avoids internal/developer language
[ ] Payment-related changes follow docs/payment-safety-policy.md
    (WhatsApp confirmation first, disclaimer visible, no live-link promotion without review)
[ ] Work is on a non-main branch with a conventional name
[ ] No direct push to main — PR opened instead
[ ] Full file shown to the user for governance/config/business-facing changes before commit
[ ] Nothing claimed as "deployed," "live," or "verified" without actual evidence
```

---

*This file governs AI agent behavior in this repository. If it conflicts with a more specific doc in `docs/`, follow the more specific doc and flag the conflict for human review.*
