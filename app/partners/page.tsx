import type { Metadata } from 'next';
import RevenuePage from '../components/RevenuePage';
import { revenuePages } from '../data/revenue-pages';

export const metadata: Metadata = {
  title: 'BOSSA Partners',
  description:
    'Partner with BOSSA for hotel, Airbnb, villa, tour, yacht, influencer, and corporate hospitality food experiences in Curacao.',
  alternates: { canonical: 'https://www.bossaasado.com/partners' },
};

export default function PartnersPage() {
  return <RevenuePage content={revenuePages.partners} ctaSource="partners" />;
}
