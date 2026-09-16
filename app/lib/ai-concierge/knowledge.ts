import { menuSections } from '../../data/menu';
import { siteConfig } from '../../data/site';

export type ConciergeLanguage = 'en' | 'pap' | 'nl' | 'es';

export function getPublicMenuKnowledge() {
  return menuSections
    .filter((section) => section.status === 'active')
    .map((section) => ({
      title: section.title,
      note: section.note,
      items: section.items
        .filter((item) => item.status === 'active')
        .map((item) => ({ name: item.name, price: item.price, description: item.description })),
    }));
}

export function getConciergeKnowledge() {
  return {
    brand: siteConfig.brandName,
    address: siteConfig.address,
    hours: siteConfig.hours,
    whatsappNumber: siteConfig.whatsappNumber,
    menu: getPublicMenuKnowledge(),
    unverified: [
      'real-time table availability',
      'same-day reservation availability',
      'holiday or special-event hours',
      'rooftop and event schedules',
      'parking guarantees',
      'allergen and cross-contact safety',
      'deposits, cancellation, refund and no-show terms',
      'private-event and catering final pricing unless present in approved menu data',
    ],
  } as const;
}

export function serializeConciergeKnowledge() {
  return JSON.stringify(getConciergeKnowledge());
}
