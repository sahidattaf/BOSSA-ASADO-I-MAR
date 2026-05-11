import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BOSSA Asado i Mar | Fire, Flavor & Sea in Curaçao',
  description:
    'BOSSA Asado i Mar is a fire-grill restaurant concept in Pietermaai, Curaçao — built around smoke, sea, rooftop energy, reservations, and AI-powered hospitality.',
  metadataBase: new URL('https://bossaasado.com'),
  openGraph: {
    title: 'BOSSA Asado i Mar',
    description: 'Fire-grill dining, rooftop energy, and Curaçao hospitality.',
    url: 'https://bossaasado.com',
    siteName: 'BOSSA Asado i Mar',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
