# BOSSA Video Content Pipeline

## Weekly operating cadence

| Day | Action | Owner | Output |
|---|---|---|---|
| Monday | Select the highest-value business message | Owner + MarketingGPT | Approved brief |
| Tuesday | Generate and review scripts | ContentStudioGPT | Production package |
| Wednesday | Produce and quality-check video | Video Producer | Approved asset |
| Thursday | Schedule and publish | Marketing | Live campaign |
| Friday | Review early metrics and leads | Owner + Sales Operator | Learning note |

## Campaign lanes

### Revenue lane
- Weekend Fire Box
- Catering
- Private events
- Group reservations
- Seasonal offers

### Brand lane
- Fire-grill story
- Chef and founder messages
- Ingredient and menu education
- Behind-the-scenes preparation
- Guest experience

### Tourist lane
- Welcome to BOSSA
- Pietermaai dining experience
- Multilingual menu guidance
- Curaçao food experience
- Hotel and tour partnerships

### Operations lane
- Staff onboarding
- Service standards
- Menu knowledge
- Fire and kitchen safety reminders
- AI Concierge training

## Channel rules

| Channel | Default format | Typical duration | Primary purpose |
|---|---:|---:|---|
| Instagram Reels | 9:16 | 15–45 sec | Reach and inquiries |
| TikTok | 9:16 | 15–45 sec | Discovery |
| WhatsApp | 9:16 or 1:1 | 15–30 sec | Direct conversion |
| Website | 16:9 | 30–90 sec | Trust and explanation |
| YouTube | 16:9 | 60 sec–5 min | Education and search |
| Staff training | 16:9 | 1–5 min | Consistent execution |

## Routing logic

```yaml
routing:
  sales_offer:
    owner: Sales Operator
    success_event: qualified_inquiry
  brand_story:
    owner: MarketingGPT
    success_event: completed_view
  tourist_content:
    owner: Tourist Experience Agent
    success_event: reservation_or_visit
  staff_training:
    owner: Delivery Manager
    success_event: training_acknowledged
```

## Quality gates

1. **Brief gate:** objective, audience, offer, language, CTA, destination, and owner exist.
2. **Fact gate:** all claims are verified.
3. **Language gate:** localized copy is reviewed.
4. **Production gate:** avatar, voice, framing, subtitles, and brand assets are correct.
5. **Publication gate:** link works and approval is recorded.
6. **Measurement gate:** campaign identifiers and KPI dates exist.
