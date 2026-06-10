import type { Metadata } from 'next';
import RevenuePage from '../components/RevenuePage';
import { revenuePages } from '../data/revenue-pages';

export const metadata: Metadata = {
  title: 'Private Events in Curacao',
  description:
    'Plan private dining, birthdays, corporate dinners, group bookings, and BOSSA fire-grill experiences in Pietermaai, Curacao.',
  alternates: { canonical: 'https://www.bossaasado.com/private-events' },
};

export default function PrivateEventsPage() {
  return (
    <RevenuePage
      content={revenuePages.privateEvents}
      ctaSource="private-events"
      leadType="private_event"
      sourcePage="/private-events"
    />
  );
}
