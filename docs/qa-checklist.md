# BOSSA Website QA Checklist

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Website: `bossaasado.com`
Purpose: Practical QA checklist for reviewing BOSSA website changes before preview, production deployment, or campaign launch.

---

## Purpose

This checklist is the final human review layer before BOSSA website updates go live.

Use it to confirm:

```text
The site works.
The offer is clear.
The customer can order.
The staff can respond.
The payment flow is safe.
The mobile experience is clean.
```

---

## QA Rule

No public deployment should be promoted until these flows work:

```text
Homepage
Weekend Fire
Party / Events
WhatsApp
Payment disclaimer
Mobile layout
Production domain
```

---

## QA Roles

| Role | Responsibility |
| --- | --- |
| Coach Sahid | Final business approval |
| AI Operator | Checklist, copy, structure, and repo review |
| Developer | Build, preview, route, and technical fixes |
| Staff / Operator | Confirm WhatsApp messages and order handling |

---

## QA Environments

Check in this order:

```text
1. Localhost
2. Vercel preview
3. Production domain
```

Example URLs:

```text
http://localhost:3000
https://[preview].vercel.app
https://bossaasado.com
https://www.bossaasado.com
```

---

## 1. Pre-QA Technical Checks

Run:

```bash
npm run validate:content
npm run generate:data
npm run build
```

Checklist:

- [ ] Content validation passes.
- [ ] Data generation completes.
- [ ] Build passes.
- [ ] No TypeScript errors.
- [ ] No missing imports.
- [ ] No missing assets.
- [ ] No secret keys are present.
- [ ] No `.env` file is committed.

Stop if any of these fail.

---

## 2. Homepage QA

Route:

```text
/
```

Checklist:

- [ ] Page loads without error.
- [ ] BOSSA name is visible immediately.
- [ ] The customer understands the offer within 5 seconds.
- [ ] Hero copy feels like a restaurant, not a developer demo.
- [ ] Main CTA is visible above the fold.
- [ ] WhatsApp CTA is easy to find.
- [ ] Weekend Fire CTA is visible.
- [ ] Party/Event CTA is visible.
- [ ] Location is visible or easy to find.
- [ ] Opening hours are visible or easy to find.
- [ ] Food/menu content is current.
- [ ] Images load.
- [ ] Audio/video elements do not break the page.
- [ ] No internal words appear publicly.

Avoid public words:

```text
prototype
generated data
JSON
PR
Notion source
editable block
internal workflow
```

---

## 3. Weekend Fire Page QA

Route:

```text
/weekend-fire
```

Checklist:

- [ ] Page loads without error.
- [ ] Weekend Fire concept is clear.
- [ ] Box #1 through Box #8 display if active.
- [ ] Box names are clean and customer-friendly.
- [ ] Prices are correct.
- [ ] Descriptions are short and clear.
- [ ] Images load for every box.
- [ ] Coming Soon items are clearly labeled.
- [ ] Order buttons are visible.
- [ ] WhatsApp opens with correct message.
- [ ] Deposit button is secondary to WhatsApp.
- [ ] Payment disclaimer is visible.
- [ ] Customizer link works.
- [ ] Mobile layout is clean.

Customer question test:

```text
Can a tourist understand what to order without asking staff first?
```

If no, improve copy.

---

## 4. Weekend Fire Customizer QA

Route:

```text
/weekend-fire/customize
```

Checklist:

- [ ] Page loads.
- [ ] Customizer purpose is clear.
- [ ] Customer can select or understand options.
- [ ] Any generated message is readable.
- [ ] WhatsApp handoff works.
- [ ] No broken buttons.
- [ ] Mobile layout works.
- [ ] No confusing internal text.

---

## 5. Party / Event Page QA

Route:

```text
/party-menu
```

Checklist:

- [ ] Page loads without error.
- [ ] Party/event offer is clear.
- [ ] Customer understands how to request a quote.
- [ ] Guest count guidance is clear.
- [ ] Package names are customer-friendly.
- [ ] Images load.
- [ ] WhatsApp quote CTA works.
- [ ] Deposit policy is clear if payment buttons appear.
- [ ] No promise is made without confirmation.
- [ ] Mobile layout is clean.

Quote flow test:

```text
Can a customer send date, guest count, location, and food preference in one WhatsApp message?
```

If no, improve the CTA message.

---

## 6. Menu QA

Checklist:

- [ ] Menu categories are clear.
- [ ] Active items are available.
- [ ] Draft items are not public.
- [ ] Hidden items are not public.
- [ ] Coming Soon items are clearly labeled.
- [ ] Prices are correct.
- [ ] Currency is consistent.
- [ ] Descriptions are not too long.
- [ ] No duplicate items.
- [ ] No conflicting prices.

Recommended price style:

```text
XCG 49.50
```

---

## 7. WhatsApp QA

Primary number:

```text
+5999 523 0683
```

Checklist:

- [ ] Homepage WhatsApp CTA works.
- [ ] Weekend Fire box buttons work.
- [ ] Party quote CTA works.
- [ ] Customizer WhatsApp handoff works.
- [ ] Messages are short and clear.
- [ ] Messages include enough order/quote details.
- [ ] Messages do not overpromise availability.
- [ ] WhatsApp opens correctly on mobile.
- [ ] WhatsApp opens correctly on desktop.

Recommended order message:

```text
Hi BOSSA, I want to order [item].
Name:
Pickup date/time:
Quantity:
Extra notes:
```

Recommended event message:

```text
Hi BOSSA, I want to request a party/event quote.
Name:
Date:
Guest count:
Location:
Preferred food style:
Extra notes:
```

---

## 8. Payment QA

Payment rule:

```text
Confirm on WhatsApp first. Pay deposit only after BOSSA confirms availability.
```

Checklist:

- [ ] WhatsApp confirmation appears before payment.
- [ ] Payment buttons are not the primary CTA.
- [ ] Disclaimer is visible.
- [ ] Test links are clearly marked if present.
- [ ] Live links are only used after review.
- [ ] Links open the expected Stripe page.
- [ ] Amounts are correct.
- [ ] Currency is correct.
- [ ] No secret keys are exposed.
- [ ] Staff knows how to handle a paid deposit.

Stop condition:

```text
If a wrong payment link is found, do not deploy.
```

---

## 9. Mobile QA

Check at least:

```text
Small phone
Standard phone
Large phone
Tablet
Desktop
```

Checklist:

- [ ] No horizontal scrolling.
- [ ] Buttons are easy to tap.
- [ ] Text is readable.
- [ ] Cards stack cleanly.
- [ ] Images do not overflow.
- [ ] Navigation works.
- [ ] WhatsApp buttons are visible.
- [ ] Payment disclaimer is readable.
- [ ] Audio/video sections do not break layout.
- [ ] Footer is readable.

Mobile-first question:

```text
Can someone from Instagram order in under 30 seconds?
```

If no, simplify.

---

## 10. Visual QA

Checklist:

- [ ] Images look appetizing.
- [ ] Hero image supports the BOSSA brand.
- [ ] Food images match the offer.
- [ ] No stretched or distorted images.
- [ ] No pixelated main images.
- [ ] Color contrast is readable.
- [ ] Buttons look consistent.
- [ ] Layout spacing feels professional.
- [ ] No random placeholder visuals.

---

## 11. Copy QA

Checklist:

- [ ] Copy is customer-facing.
- [ ] The offer is simple.
- [ ] Menu descriptions are not too technical.
- [ ] No internal development wording.
- [ ] No overpromises.
- [ ] No confusing deposit language.
- [ ] Spelling is checked.
- [ ] Address is correct.
- [ ] Phone number is correct.
- [ ] Hours are correct.

BOSSA tone:

```text
Fire-grill
Caribbean
Premium but simple
Local and tourist friendly
WhatsApp-first
```

---

## 12. SEO QA

Checklist:

- [ ] Homepage title is useful.
- [ ] Homepage description is useful.
- [ ] Important pages have clear headings.
- [ ] BOSSA name appears correctly.
- [ ] Pietermaai and Curaçao are mentioned where useful.
- [ ] Images have useful alt text when practical.
- [ ] Open Graph image is set or planned.

Recommended title:

```text
BOSSA Asado i Mar — Fire Grill Restaurant in Pietermaai, Curaçao
```

Recommended description:

```text
BOSSA Asado i Mar serves fire-grilled Weekend Fire Boxes, party menus, and private event food in Pietermaai, Curaçao. Order and reserve through WhatsApp.
```

---

## 13. Link QA

Checklist:

- [ ] Internal navigation links work.
- [ ] Weekend Fire link works.
- [ ] Customizer link works.
- [ ] Party Menu link works.
- [ ] WhatsApp links work.
- [ ] Stripe links work if shown.
- [ ] YouTube embeds work.
- [ ] Google Maps link works if present.
- [ ] No 404 links.

---

## 14. Performance QA

Checklist:

- [ ] Homepage loads reasonably fast.
- [ ] Images are not unnecessarily huge.
- [ ] Videos are embedded responsibly.
- [ ] Audio does not autoplay aggressively.
- [ ] No page feels frozen.
- [ ] Mobile loading is acceptable.

Simple test:

```text
Open the site on mobile data and see if it feels usable.
```

---

## 15. Accessibility QA

Checklist:

- [ ] Buttons have readable labels.
- [ ] Links describe where they go.
- [ ] Text contrast is readable.
- [ ] Main headings are logical.
- [ ] Page can be understood without audio.
- [ ] Important info is not image-only.
- [ ] CTA text is descriptive.

Good button copy:

```text
Order on WhatsApp
Request Party Quote
View Weekend Fire Boxes
Confirm Availability
```

Bad button copy:

```text
Click here
Submit
Go
More
```

---

## 16. Vercel Preview QA

Checklist:

- [ ] Preview deployment is Ready.
- [ ] Preview URL opens.
- [ ] Homepage works.
- [ ] Weekend Fire works.
- [ ] Party Menu works.
- [ ] WhatsApp links work.
- [ ] Payment links work if shown.
- [ ] No preview-only errors.
- [ ] Preview matches expected changes.

If preview fails:

```text
Do not merge or promote.
Fix preview first.
```

---

## 17. Production QA

Check:

```text
https://bossaasado.com
https://www.bossaasado.com
```

Checklist:

- [ ] Domain loads.
- [ ] Redirect behavior is acceptable.
- [ ] Homepage works.
- [ ] Weekend Fire works.
- [ ] Party Menu works.
- [ ] WhatsApp buttons work.
- [ ] Payment buttons are safe.
- [ ] Mobile works.
- [ ] No broken images.
- [ ] No internal copy is visible.
- [ ] Latest release is live.

---

## 18. Campaign QA

Before posting a campaign:

Checklist:

- [ ] Offer is approved.
- [ ] Price is correct.
- [ ] Date range is clear.
- [ ] Food capacity is confirmed.
- [ ] Staff knows the campaign is live.
- [ ] WhatsApp response script is ready.
- [ ] Landing page works.
- [ ] UTM link works if used.

Campaign test link:

```text
https://bossaasado.com/weekend-fire?utm_source=instagram&utm_campaign=weekend_fire
```

---

## QA Sign-Off Template

```text
QA Date:
Reviewer:
Branch:
Commit SHA:
Preview URL:
Production URL:

Technical checks: Pass / Fail
Homepage QA: Pass / Fail
Weekend Fire QA: Pass / Fail
Customizer QA: Pass / Fail
Party Menu QA: Pass / Fail
WhatsApp QA: Pass / Fail
Payment QA: Pass / Fail
Mobile QA: Pass / Fail
SEO QA: Pass / Fail
Production QA: Pass / Fail

Approved for production: Yes / No
Notes:
```

---

## Stop-Launch Conditions

Do not launch if:

- [ ] Build fails.
- [ ] Homepage does not load.
- [ ] WhatsApp links are broken.
- [ ] Payment link is wrong.
- [ ] Test payment link is promoted as live.
- [ ] Main images are broken.
- [ ] Menu prices are wrong.
- [ ] Mobile layout is broken.
- [ ] Public copy contains internal/developer wording.
- [ ] Staff is not ready for campaign traffic.

---

## QA Severity Levels

| Level | Meaning | Action |
| --- | --- | --- |
| Critical | Blocks orders, payments, or site access | Stop launch |
| High | Confuses customers or creates payment risk | Fix before launch |
| Medium | Visual/copy issue but flow still works | Fix soon |
| Low | Nice-to-have polish | Backlog |

---

## Minimum Launch Standard

Minimum pass required:

```text
[ ] Build passes
[ ] Homepage works
[ ] Weekend Fire works
[ ] Party Menu works
[ ] WhatsApp works
[ ] Payment flow is safe
[ ] Mobile works
[ ] No secrets exposed
```

---

## Final Rule

BOSSA QA is not only technical.

It must confirm the real business question:

```text
Can a customer understand, trust, and order from BOSSA without confusion?
```
