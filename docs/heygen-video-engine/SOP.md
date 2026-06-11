# BOSSA HeyGen Video Production SOP

## Purpose
Provide one controlled workflow from campaign idea to measured business result.

## Roles

| Role | Responsibility |
|---|---|
| Owner | Approves offers, claims, avatar use, and publication |
| MarketingGPT | Converts business priorities into campaign briefs |
| ContentStudioGPT | Produces scripts and publishing packages |
| Video Producer | Builds and exports the HeyGen video |
| Language Reviewer | Reviews localization and pronunciation |
| Sales Operator | Follows up on inquiries and records lead source |

## Status flow

```text
Backlog
→ Brief Ready
→ Script Draft
→ Awaiting Approval
→ In Production
→ Quality Review
→ Scheduled
→ Published
→ Measured
→ Archived
```

## Procedure

### 1. Create the campaign brief
Required fields:
- Campaign name
- Business objective
- Audience
- Offer or message
- Supporting facts
- Language
- Channel
- Duration and format
- CTA and destination
- Approval owner
- Due date

Stop the job when any required commercial fact is missing.

### 2. Generate the production package
Run `MASTER_PROMPT.md` with the approved brief.
Save the script version and note all assumptions.

### 3. Review the script
Confirm:
- The opening hook is clear within three seconds.
- No unsupported claim exists.
- The CTA matches the business objective.
- The script sounds natural when read aloud.
- The duration is realistic.

### 4. Approve the language
For translated or localized scripts:
- Review spelling and meaning.
- Confirm Curaçao place-name pronunciation.
- Confirm menu-item pronunciation.
- Remove literal translations that sound unnatural.

### 5. Produce in HeyGen
- Select the approved avatar.
- Paste only the approved script.
- Apply the correct language and voice.
- Use the requested aspect ratio.
- Add approved backgrounds or B-roll.
- Generate a draft, not a final publication.

### 6. Quality review
Watch the full video with sound and again muted.
Check:
- Lip sync
- Pronunciation
- Pacing
- Subtitle spelling and safe margins
- Product and brand accuracy
- Image quality
- Music level and licensing
- CTA visibility

A failed check returns the job to `In Production` with a revision note.

### 7. Publish
- Export the channel-specific version.
- Use the approved caption and CTA.
- Test the reservation or WhatsApp link.
- Record the published URL and date.
- Tag the campaign and lead source.

### 8. Measure
Capture after 24 hours, 7 days, and 30 days when applicable:
- Views or reach
- Three-second hold rate
- Average watch time or completion rate
- Link clicks
- WhatsApp or reservation inquiries
- Qualified leads
- Revenue attributed

### 9. Improve
Record:
- Winning hook
- Strongest audience
- Best language
- Best channel
- CTA performance
- Recommended next experiment

## Definition of done
A video is done only when:
- The final asset is approved.
- The destination link works.
- The publication URL is recorded.
- Initial metrics are scheduled or entered.
- Leads can be attributed to the campaign.

## Security rules
- Never commit HeyGen, Notion, OpenAI, or other API keys.
- Never store raw consent documents or sensitive identity footage in the public repository.
- Record explicit authorization for every real-person avatar.
- Do not generate deceptive testimonials or impersonate third parties.
- Human approval is mandatory before public release.
