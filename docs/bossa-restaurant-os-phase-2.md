# BOSSA Restaurant OS — Phase 2 Plan

This document turns the BOSSA Notion menu workspace into an operating system for menu, kitchen, stock, content, promotions, and website publishing.

## Notion Source

Primary Notion build sheet:

- [BOSSA One Clean Menu + Restaurant OS Build Sheet](https://app.notion.com/p/BOSSA-One-Clean-Menu-Restaurant-OS-Build-Sheet-391a269fc947816d9bb7c940fbf5b503?source=copy_link)

GitHub tracking issue:

- [Phase 2 BOSSA Restaurant OS](https://github.com/sahidattaf/BOSSA-ASADO-I-MAR/issues/53)

## 1. System Goal

BOSSA should have one clean source of truth:

```text
Notion Menu Items database
→ Recipes
→ Ingredients
→ Inventory
→ SOPs
→ Marketing
→ Promotions
→ Website / QR menu
```

The public website should only use approved menu data from Notion.

## 2. Active Notion Modules

| Module | Purpose | Next Action |
| --- | --- | --- |
| Menu Items | Source of truth for public menu and website | Add photos, Website Status, Featured, Chef Recommendation |
| Ingredients | Master ingredient list | Link each top menu item to ingredients |
| Inventory | Stock, cost, supplier, reorder alerts | Add current stock, minimum stock, supplier, last purchase |
| Recipes | Kitchen recipe cards | Create top 6 recipes first |
| SOP | Prep, grill, packaging, handoff standards | Create top service flow SOPs |
| Marketing | Reels, posts, flyers, QR campaigns | Link every campaign to menu items or promotions |
| Promotions | Weekend Fire Box, hotel guest offers, family packs | Connect active promotions to real menu items |

## 3. Relation Map

| From | Relation | To | Priority |
| --- | --- | --- | --- |
| Menu Items | Ingredients | Ingredients | Critical |
| Menu Items | Inventory Items | Inventory | Critical |
| Menu Items | Recipe | Recipes | Critical |
| Menu Items | SOP | SOP | High |
| Menu Items | Marketing Assets | Marketing | High |
| Menu Items | Promotions | Promotions | High |
| Recipes | Ingredients | Ingredients | Critical |
| Inventory | Menu Impact | Menu Items | High |
| Marketing | Menu Item | Menu Items | High |
| Promotions | Menu Items | Menu Items | High |

## 4. Dashboard Layout

Create a Notion dashboard with these sections:

```text
BOSSA Restaurant OS

Today's Operations
- Orders
- Reservations
- Kitchen
- Inventory Alerts

Core Databases
- Menu
- Ingredients
- Inventory
- Recipes
- SOP
- Marketing
- Promotions

KPIs
- Sales
- Food Cost
- Low Inventory
- Reviews
- Reservations

AI Tools
- Generate Menu Copy
- Generate Recipe
- Generate SOP
- Generate Social Post
- Generate Shopping List
- Generate Weekly Report

Website
- Live Menu
- Website Sync Rules
- QR Menu
- WhatsApp
- Social Channels
```

## 5. Menu Item Media Fields

Add these properties to the Menu Items database:

| Property | Type | Use |
| --- | --- | --- |
| Hero Photo | Files | Public menu image |
| Kitchen Photo | Files | Staff cooking reference |
| Packaging Photo | Files | Box and pickup standard |
| Video Link | URL | Reel, short, or prep video |
| QR Code | Files | QR menu / ordering QR |
| Website Status | Select | Draft, Review, Published |

## 6. Sprint Plan

### Sprint 1 — Clean and connect

- Use Menu Items as the only active menu source.
- Add relation properties between the 7 core databases.
- Add media fields to Menu Items.
- Add Website Status.
- Keep starter databases as backup/import references only.

### Sprint 2 — Build the kitchen brain

Create complete connected records for:

- BOSSA Box Mix
- Community Fire Box
- Chicken Classic
- Ribs Classic
- Skewer Box
- Fire Bread Sandwich Box

Each top item should have:

- Ingredients
- Inventory impact
- Recipe
- SOP
- Hero photo
- Marketing link
- Promotion link where relevant

### Sprint 3 — Website and marketing sync

- Mark only approved items as Website Published.
- Keep coming-soon items visible but not orderable.
- Generate social campaigns for Weekend Fire Box, SEA BOX, Hotel Guest Special, and QR Menu.
- Build website data files from approved Notion fields.

## 7. Website Sync Rules

```json
{
  "source": "Notion Menu Items database",
  "publish_rule": "Website Published is checked and Website Status is Published",
  "order_button_rule": "WhatsApp Enabled is checked and Status is Active",
  "coming_soon_rule": "Show Coming Soon items without an order button",
  "image_rule": "Use Hero Photo as public menu image",
  "sort_rule": "Sort by Category and Sort Order",
  "currency": "XCG"
}
```

## 8. Suggested Repo Structure

```text
bossa/
├── data/
│   ├── menu.json
│   ├── promotions.json
│   └── website-sync-rules.json
├── docs/
│   ├── bossa-restaurant-os-phase-2.md
│   ├── notion-database-map.md
│   └── menu-sync-plan.md
└── scripts/
    └── export-notion-menu.ts
```

## 9. Definition of Done

Phase 2 is complete when:

- One dashboard links to all active databases.
- Menu Items has clean views and media fields.
- Top 6 menu items are connected to ingredients, inventory, recipes, SOPs, marketing, and promotions.
- Inventory can show low-stock and out-of-stock impact.
- Marketing campaigns are linked to menu items.
- Promotions are linked to active menu items.
- Website sync rules are documented in Notion and GitHub.
- Website menu only uses approved Notion menu data.
