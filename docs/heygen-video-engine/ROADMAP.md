# BOSSA HeyGen Video Engine Roadmap

## Objective
Build a multilingual, measurable video-production system that converts BOSSA offers and experiences into bookings, catering leads, event inquiries, restaurant visits, and reusable staff training.

## Phase 0 — Governance and setup
**Status:** Ready to execute

- Select the approved founder avatar and voice.
- Record avatar source footage in a quiet, well-lit environment.
- Define approved pronunciation for BOSSA, Curaçao, menu items, and Papiamentu phrases.
- Create secure environment-variable placeholders for future automation.
- Define who can approve scripts and videos.
- Never commit API keys or private avatar identifiers to GitHub.

### Exit criteria
- Avatar approved.
- Four languages tested.
- Brand template selected.
- Approval owner assigned.

## Phase 1 — Manual pilot
**Target:** First 5 videos

1. Weekend Fire Box promotion
2. Welcome to BOSSA Curaçao
3. Catering and private-events offer
4. Tourist fire-grill experience
5. BOSSA AI Concierge explainer

### Workflow
Notion brief → generated script → owner approval → HeyGen production → quality review → publish → metrics update.

### Exit criteria
- Five videos published.
- No factual or language errors.
- Every video has one clear CTA.
- Baseline reach, retention, clicks, inquiries, and conversions recorded.

## Phase 2 — Weekly content engine
**Target cadence:** 3 videos per week

- Monday: offer or event
- Wednesday: food story or menu education
- Friday: tourist, founder, or social-proof video

### Deliverables
- Reusable script templates.
- Channel-specific aspect ratios.
- Translation and subtitle workflow.
- Content calendar linked to campaign records.

### Exit criteria
- Four consecutive weeks delivered on schedule.
- At least 80% of videos approved in one revision cycle.
- Clear winning hooks and CTAs identified.

## Phase 3 — Lead-generation integration

- Create landing-page versions of winning videos.
- Add WhatsApp tracking links.
- Route catering and private-event responses to the BOSSA Leads CRM.
- Tag each lead with source video and campaign.
- Build follow-up scripts for warm prospects.

### Exit criteria
- Video-to-lead attribution works.
- Leads receive a response within the agreed service window.
- Cost and revenue per campaign are visible.

## Phase 4 — API automation

- Add an approved HeyGen API integration.
- Pull approved jobs from Notion or a secure backend.
- Generate draft videos automatically.
- Write returned video status and URL back to the operating system.
- Require human approval before publication.

### Exit criteria
- One-click draft generation works.
- Failed jobs are logged and recoverable.
- Secrets are stored only in the deployment platform.
- Human approval cannot be bypassed.

## Phase 5 — Multi-brand expansion

Reuse the engine for:

- GPT Innovation by Attaf client campaigns
- Kai Kòrsou stakeholder and investor updates
- Hospitality OS demonstrations
- Training and onboarding products

Each brand must have separate templates, voice rules, CTAs, data, and approval permissions.

## 30-day execution sequence

### Week 1
- Complete avatar capture.
- Test EN, PAP, NL, and ES.
- Produce two private test videos.
- Correct pronunciation and pacing.

### Week 2
- Publish Weekend Fire Box and BOSSA Welcome videos.
- Capture baseline metrics.
- Build the first reusable brand template.

### Week 3
- Publish Catering, Tourist Experience, and AI Concierge videos.
- Connect inquiries to the Leads CRM.
- Review hooks and CTA quality.

### Week 4
- Standardize the weekly calendar.
- Choose automation scope.
- Approve the next 12-video campaign backlog.

## Decision log

| Decision | Default | Change only when |
|---|---|---|
| Source of truth | GitHub | Governance platform changes |
| Operating cockpit | Notion | Team adopts another workflow system |
| Publication control | Human approval | A formally approved low-risk automation policy exists |
| Default languages | EN, PAP, NL, ES | Audience data supports adding another language |
| Primary CTA | WhatsApp or reservation | Campaign objective requires another destination |
