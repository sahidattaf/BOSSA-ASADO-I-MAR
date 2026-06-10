import type { Metadata } from 'next';
import RevenuePage from '../components/RevenuePage';
import { revenuePages } from '../data/revenue-pages';

export const metadata: Metadata = {
  title: 'Tourist Experiences in Curacao',
  description:
    'Book BOSSA sunset fire dinners, Caribbean grill experiences, rum and fire nights, chef table moments, and tourist food packages in Curacao.',
  alternates: { canonical: 'https://www.bossaasado.com/tourist-experiences' },
};

export default function TouristExperiencesPage() {
  return (
    <RevenuePage
      content={revenuePages.touristExperiences}
      ctaSource="tourist-experiences"
      leadType="tourist_experience"
      sourcePage="/tourist-experiences"
    />
  );
}
