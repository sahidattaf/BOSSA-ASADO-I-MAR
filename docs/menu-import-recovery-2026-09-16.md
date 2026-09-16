# BOSSA menu recovery — local QA

Status at original QA: local draft complete. The owner subsequently approved commit and push under BOSSA-MENU-RECOVERY-3; pre-commit evidence is recorded below. Remote results must be verified against the resulting commit.

## Sources

- PR #61 baseline: `5504db733c2c37880b4acbbcfccbe46d3db427f3`.
- Local branch: `content/bossa-fire-box-photos`.
- Owner-supplied `menu-import-preview-draft-2026-09-15.md` and earlier comparison review. The later report supersedes the earlier unresolved comparison.
- Notion collection `391a269f-c947-8018-99d3-000bcd5cef1e`: 34 faithful rows, no more rows; 32 dishes and two invalid audit rows. All 32 descriptions and prices match the pinned website baseline exactly.
- Community Fire Box and Chicken Classic pages fetched September 16: Photo Approved checked, Photo Status Published, Website Status Published, WhatsApp Enabled Yes. Newly attached photos and release notes are present. Publication fields in Notion are operational labels, not proof of production deployment.
- Images used are the two standalone images generated in this conversation, selected by the owner for the 4-piece Community Fire Box and 8-piece Chicken Classic. They are AI-assisted edits, not pixel-identical crops. Notion image bytes were not downloaded or hash-compared.

## Changes

- Restored six menu sections and 32 dishes to the canonical source JSON.
- Restored four existing party packages from the pinned generated baseline; generated packages remain unchanged.
- Retained all prices, descriptions, box numbers, and existing non-target photos. Applied Notion Fire Box ordering, with Community Fire Box first.
- Added explicit WhatsApp eligibility: 29 active dishes true; SEA BOX, Seafood Skewer and Sunset Cocktail false. Weekend Fire renders seven order buttons across eight box cards.
- Validator now rejects an empty menu, missing boolean eligibility, and enabled ordering for non-active items.
- Replaced the existing Community Fire Box and Chicken Classic asset paths with the approved standalone images.
- Regenerated data from source. The existing source email now appears in generated site config; its value was not changed.
- Restored homepage, global styles, hero styles, MobileHomeSections and building hero asset byte-for-byte from PR #66 commit `9d9feb2eda19090da8c3b9141208b37ea2ad76c6`, matching the recovered report. PR #66 overlap remains a review consideration. No concierge implementation files were imported from that branch.

## Verification

- Dependency installation: PASS in this workspace.
- `npm run deploy:check`: PASS after recovery (content validation, generation, automated concierge checks, TypeScript, production build).
- Compiled HTML: eight box cards; Community Fire Box first at XCG 19.50; seven order buttons; SEA BOX has no order button; six homepage collapsible menu categories.
- Negative validation: empty menu rejected; Coming Soon ordering rejected. Source restored after each check.
- `git diff --check`: PASS.
- React review: restored disclosure uses functional state updates, button semantics, aria-expanded and hidden content; no new network or state logic introduced by the menu-ordering change.

## Remaining work

- Review the complete source JSON and this diff before committing, as required by repository AGENTS.md for business-facing configuration changes.
- Commit/push the reviewed changes to the intended PR branch, then verify the exact Vercel Preview commit and perform browser QA.
- E01–E28 live acceptance was not executed. Automated mocked tests do not establish live acceptance.
- No credentials, environment settings, deployment protection, Supabase, PR #62, or production data changed.

The full canonical JSON for review is `content/notion/bossa-website-content.template.json`.

## BOSSA-MENU-RECOVERY-3 pre-commit evidence

- Complete business-facing source JSON was presented for review; the owner explicitly approved execution of this gate.
- Fetched remote PR branch remained at `5504db733c2c37880b4acbbcfccbe46d3db427f3`. Switched the existing working tree to `feat/bossa-ai-concierge-mvp-v1` and reconciled with `git merge --ff-only`; already up to date, no conflicts, no existing commits discarded.
- Reran `npm run validate:content`, `npm run generate:data`, `npm run build`, `npm run validate:ai-concierge`, and `npm run typecheck`: all PASS.
- Repeated compiled menu checks and negative validation checks: PASS. Restored source after negative checks.
- Confirmed 32 items, four packages, 29 orderable items and three non-orderable Coming Soon items. Prices, descriptions, statuses and image paths match the original menu baseline; only the two selected image bytes changed.
- Both photo hashes match the owner-selected conversation images. The five documented layout files match the pinned PR #66 commit exactly.
- Changed-file secret-pattern scan passed. Environment files, dependencies, credentials and temporary build artifacts are excluded from the commit.
- Authorized destination: existing PR #61 branch only. No merge or production deployment authorized by this gate.
