# BOSSA Supabase runtime architecture and reconciliation

Gate: BOSSA-SUPABASE-RUNTIME-REMEDIATION-1
Scope: one isolated security-repair PR; no production database, live data, Supabase secret, Vercel setting, deployment, or merge change.

## Verified read-only facts

- Active Supabase project: bossa-ai-os
- Active project ref: oqmftkttkfktyzefswpz
- The active project is healthy.
- The active project exposes public.whatsapp_leads and other operational tables, but not the repository table public.bossa_leads.
- The active project currently has no Edge Functions.
- The repository migration 20260531_create_bossa_leads.sql belongs to the older public.bossa_leads contract and must not be treated as an active-project migration.
- The adapter in app/lib/bossa-leads-adapter.ts now targets public.whatsapp_leads without changing the live schema.

## Runtime boundary in this PR

- /admin/leads and /api/admin/leads/* are protected by fail-closed Basic Authentication using BOSSA_ADMIN_USERNAME and BOSSA_ADMIN_PASSWORD.
- Privileged Supabase REST calls use only SUPABASE_SERVICE_ROLE_KEY from server-side code. Public, anonymous, and publishable fallbacks are prohibited.
- No browser bundle, public environment variable, or client component may receive the service-role key.
- The server helper is an interim boundary only. The preferred production boundary is a Supabase Edge Function with its secret stored in Supabase. This PR does not create or deploy that function.
- Because the active schema and repository contract differ, production use of the admin lead dashboard remains blocked until an owner-approved adapter or schema migration is designed and separately reviewed.

## Adapter contract

| Repository concept | Active whatsapp_leads mapping | Behavior |
| --- | --- | --- |
| id | id | Preserved |
| source_page | source | Preserved |
| lead_type, intent, offer, item_name, box_number, value, currency, metadata | message JSON | Stored as safe click context |
| lead_status | status | Read and update supported |
| order/payment/follow-up/revenue fields | No active column | Returned as null/default; writes rejected with 409 |
| customer name and phone | name and phone | Admin metadata flags only; values are not exposed in the dashboard response |

The adapter is intentionally conservative. It prevents the application from sending legacy bossa_leads columns to the active project. A later owner-approved schema expansion can add the missing operational fields.

## RLS and grant proof

The repository migration proves RLS is enabled and anonymous access is limited to validated insert-only lead metadata. The live project review confirmed RLS is enabled across the inspected public tables and that broad table grants are constrained by policies. The active project's whatsapp_leads contract is not interchangeable with bossa_leads; no live write was performed.

## Required follow-up before release

1. Approve the canonical active-project lead table and field mapping.
2. Choose the Edge Function migration or an explicitly approved server-only runtime.
3. Add preview QA for authenticated admin access and unauthenticated 401/503 behavior.
4. Re-run CI, secret scan, RLS/grant proof, and build checks.
5. Preview-test public lead capture, protected dashboard reads, and status-only updates against the adapter.