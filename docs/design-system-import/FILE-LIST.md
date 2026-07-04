# GPT Innovation Design System — Export File List

This list was generated from the uploaded Claude export archive. Use it to decide what should be converted into the BOSSA Next.js app.

| Path | Size |
|---|---:|
| `SKILL.md` | 2,052 |
| `_adherence.oxlintrc.json` | 20,902 |
| `_ds_bundle.js` | 178,456 |
| `_ds_manifest.json` | 22,980 |
| `assets/logo-full-white.svg` | 1,317 |
| `assets/logo-full.svg` | 1,317 |
| `assets/logo-mark.svg` | 1,043 |
| `assets/print/business-card.html` | 3,469 |
| `assets/print/invoice.html` | 5,922 |
| `assets/print/letterhead.html` | 3,965 |
| `assets/social/facebook.html` | 3,430 |
| `assets/social/instagram-square.html` | 3,385 |
| `assets/social/instagram-story.html` | 3,414 |
| `assets/social/linkedin.html` | 3,418 |
| `bossa/app.js` | 12,261 |
| `bossa/data.js` | 9,573 |
| `bossa/docs/0002_multitenant.sql` | 8,159 |
| `bossa/docs/README.md` | 6,712 |
| `bossa/docs/schema.prisma` | 9,105 |
| `bossa/docs/supabase.sql` | 6,778 |
| `bossa/index-print-lepi03.html` | 45,400 |
| `bossa/index.html` | 27,106 |
| `bossa/pages.js` | 21,017 |
| `bossa/tenants.js` | 5,738 |
| `components/ai/AutomationFlow.jsx` | 3,164 |
| `components/ai/ChatWidget.jsx` | 5,096 |
| `components/brand/AgentCard.jsx` | 3,497 |
| `components/brand/IndustryCard.jsx` | 1,648 |
| `components/brand/KPIWidget.jsx` | 2,019 |
| `components/brand/PricingCard.jsx` | 3,824 |
| `components/brand/ServiceCard.jsx` | 2,845 |
| `components/brand/StatCard.jsx` | 1,749 |
| `components/brand/TestimonialCard.jsx` | 1,984 |
| `components/core/Badge.jsx` | 1,356 |
| `components/core/Button.jsx` | 2,657 |
| `components/core/Card.jsx` | 1,696 |
| `components/feedback/FAQAccordion.jsx` | 1,893 |
| `components/forms/ContactForm.jsx` | 2,486 |
| `components/forms/FormField.jsx` | 1,033 |
| `components/forms/Input.jsx` | 1,638 |
| `components/forms/Toggle.jsx` | 1,752 |
| `components/layout/CTASection.jsx` | 2,374 |
| `components/layout/SectionHeader.jsx` | 1,410 |
| `components/layout/Timeline.jsx` | 1,690 |
| `components/navigation/Footer.jsx` | 2,555 |
| `components/navigation/NavBar.jsx` | 2,182 |
| `export/EXPORTS.md` | 4,399 |
| `export/design-tokens.json` | 4,183 |
| `export/tailwind.gpt-innovation.js` | 2,873 |
| `layouts/about/About.jsx` | 10,889 |
| `layouts/blog/Blog.jsx` | 8,281 |
| `layouts/crm/CRMDashboard.jsx` | 10,571 |
| `layouts/landing-page/LandingPage.jsx` | 12,991 |
| `layouts/dashboard.html` | 9,687 |
| `layouts/website-hero.html` | 9,378 |
| `readme.md` | 9,907 |
| `styles.css` | 544 |
| `tokens/base.css` | 830 |
| `tokens/colors.css` | 2,505 |
| `tokens/fonts.css` | 417 |
| `tokens/motion.css` | 608 |
| `tokens/radii.css` | 279 |
| `tokens/shadows.css` | 605 |
| `tokens/spacing.css` | 533 |
| `tokens/typography.css` | 1,224 |
| `uploads/pasted-1782951231148-0.png` | 2,350,571 |

## High-priority files to integrate first

1. `bossa/index.html`
2. `bossa/app.js`
3. `bossa/pages.js`
4. `bossa/tenants.js`
5. `bossa/docs/0002_multitenant.sql`
6. `bossa/docs/schema.prisma`
7. `export/design-tokens.json`
8. `export/tailwind.gpt-innovation.js`
9. `components/brand/KPIWidget.jsx`
10. `components/ai/ChatWidget.jsx`
11. `layouts/crm/CRMDashboard.jsx`
12. `layouts/landing-page/LandingPage.jsx`

## Import note

The archive also contains many generated design-system cards, HTML previews, and component prompt files. Those are useful for reference, but they should not all be copied into the production app. The best move is to create a clean BOSSA-native implementation inside the existing Next.js structure.
