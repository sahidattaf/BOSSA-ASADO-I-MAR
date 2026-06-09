import type { Metadata } from 'next';
import RevenuePage from '../components/RevenuePage';
import { revenuePages } from '../data/revenue-pages';

export const metadata: Metadata = {
  title: 'Catering in Curacao',
  description:
    'Request BOSSA fire-grill catering for villas, corporate events, weddings, private parties, hotels, Airbnb hosts, and yacht groups in Curacao.',
  alternates: { canonical: 'https://www.bossaasado.com/catering' },
};

export default function CateringPage() {
  return <RevenuePage content={revenuePages.catering} ctaSource="catering" />;
}
