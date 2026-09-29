# BOSSA Admin Command Center

An interactive administrative prototype for BOSSA Asado i Mar, built on the BOSSA Asado i Mar Design System. Covers Overview, Orders, Reservations, Menu & Fire Boxes, Production, Inventory & Costs, Customers & Partners, Content, Analytics, Tasks, Decision Log and Settings.

## Status: prototype, not a connected production backend
No production database or POS is connected. Every record is either:
- **Verified** — sourced from the public BOSSA Next.js repo (`app/data/menu.ts`, `app/data/site.ts`): menu item names, descriptions and selling prices.
- **Demo data** — clearly-labeled placeholder records (orders, reservations, inventory, customers, content, tasks, decisions) so the UI can be exercised realistically without inventing real business results.
- **Needs confirmation** — figures that would require a real data source before being shown as fact (food cost/margin, campaign performance, content-to-order attribution).

Every KPI and record carries a visible source tag. A "Prototype data" badge is pinned on screen at all times.

## What is functional
- Full navigation across all 12 sections; each renders its own screen.
- Create, edit, archive/restore (never permanent delete), search, filter and sort on Orders, Reservations, Menu & Fire Boxes, Inventory, Customers & Partners, Content, Tasks and Decision Log.
- Production board with controlled status movement (Planned → Preparing → Ready → Closed).
- Inventory stock adjustment with required reason, logged to Recent activity (audit trail).
- Role switcher (Owner/Admin, Manager, Kitchen, Marketing, Finance, View only) that hides nav sections and disables mutation controls per role.
- Global search, notifications panel, date-range control (cosmetic filter on Analytics/Dashboard), "Add New" shortcut, connection-status indicator.
- All data persists to `localStorage` (`bossaAdminV1`) — survives refresh. "Reset demo data" restores the seed after a confirmation dialog.
- Toasts on every mutation; empty/offline/permission-denied states are present.

## What is demonstration-only
- All order, reservation, inventory, customer, content, task and decision records are demo data, not live restaurant data.
- Revenue, capacity and analytics figures are computed from that demo data — they illustrate the UI, not real performance.
- "Print summary", "Reorder", and CSV "Export" buttons show confirmation toasts but do not produce real documents or hit a supplier system.
- Role switching is client-side only — there is no authentication.

## Current data sources
- Menu names/descriptions/prices: `sahidattaf/BOSSA-ASADO-I-MAR`, `app/data/menu.ts` (verified at time of writing).
- Restaurant profile (address, phone, hours): same repo, `app/data/site.ts`.
- Everything else: seeded demo records generated for this prototype.

## Proposed Supabase tables (for production)
`orders`, `order_items`, `reservations`, `menu_items`, `fire_box_configs`, `production_batches`, `inventory_items`, `inventory_adjustments` (audit), `customers_partners`, `content_items`, `campaigns`, `tasks`, `decisions`, `users`, `roles`, `settings`, `activity_log`. Each mutable table needs `created_at`, `updated_at`, `created_by`, and an `archived_at` (nullable) column instead of hard deletes.

## Authentication requirements
Real user accounts (Supabase Auth or equivalent) mapped 1:1 to the role list in Settings. No shared logins — the audit log and Decision Log depend on knowing who acted.

## Role-based access requirements
Server-side enforcement of the same role matrix the prototype fakes client-side: Kitchen limited to Production/Orders(status only)/Inventory; Marketing to Content/Customers/Analytics; Finance to Orders(payment)/Inventory(costs)/Analytics; View only fully read-only. Never trust a client-side role flag for write access.

## Audit-log requirements
Every create/update/archive/restore and every inventory adjustment should write an immutable `activity_log` row (actor, timestamp, entity, before/after). The prototype's "Recent activity" and stock-adjustment reason field are stand-ins for this.

## Recommended API boundaries
- `/api/orders`, `/api/reservations`, `/api/menu`, `/api/production`, `/api/inventory`, `/api/partners`, `/api/content`, `/api/tasks`, `/api/decisions` — each scoped by role on the server, not just hidden in the UI.
- A separate read-only `/api/menu/public` for the customer-facing Weekend Fire site, so admin edits to price/availability propagate without duplicating data.
- Webhook or polling bridge from WhatsApp Business API into `/api/orders` and `/api/reservations` intake, replacing manual entry.

## Steps to implement inside the BOSSA Next.js repository
1. Add a Supabase project; create the tables above; enable Row-Level Security keyed to the auth role.
2. Build the API routes under `app/api/admin/*` in the existing Next.js app, reusing `app/data/menu.ts` as the seed/migration source for `menu_items`.
3. Replace this prototype's `data.js` localStorage store with real fetch calls to those routes, keeping the same component props so `AdminApp.jsx` and the screens need minimal changes.
4. Wire WhatsApp Business API webhooks to create `orders`/`reservations` rows automatically, keeping manual entry as a fallback.
5. Add authentication (Supabase Auth) and replace the client-side role switcher with a real session-derived role.
6. Turn on Supabase's point-in-time recovery / scheduled backups before go-live.

## Security and backup considerations
- Never expose the Supabase service key to the browser — all writes go through server API routes.
- Rate-limit and validate all admin mutations server-side (the prototype's client-side validation is not a security boundary).
- Daily automated backups with a tested restore process before this replaces any manual/paper process.
- Log and alert on permission-denied attempts once real auth is in place.

## Files
`index.html` (shell + script loads), `data.js` (localStorage store + seed), `icons.jsx` (line-icon set), `ui.jsx` (shared table/modal/toast/CRUD-screen primitives), `AdminApp.jsx` (shell/nav/roles), `DashboardScreen.jsx`, `OrdersScreen.jsx`, `ReservationsScreen.jsx`, `MenuScreen.jsx`, `ProductionScreen.jsx`, `InventoryScreen.jsx`, `CustomersPartnersScreen.jsx`, `ContentScreen.jsx`, `AnalyticsScreen.jsx`, `TasksScreen.jsx`, `DecisionLogScreen.jsx`, `SettingsScreen.jsx`, `admin.css`.

## A note on registration in the Design System
This admin kit was built in a project that *consumes* the BOSSA Asado i Mar Design System (loaded read-only from `_ds/`). It could not be written back into the design-system project itself as a specimen card / Starting Point — that project is a separate resource. The kit follows the same tokens and component conventions and is ready to be copied into the design-system project's `ui_kits/` folder and registered there if you'd like that done from within that project.
