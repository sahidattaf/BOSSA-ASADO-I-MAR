import type { Metadata } from 'next';
import LanguageSwitcher from './components/LanguageSwitcher';
import './globals.css';

const whatsappNumber = '59995230683';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

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
    images: ['/images/bossa/bbq-party-del-rey.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageSwitcher />
        {children}
        <a className="sticky-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Order or reserve BOSSA on WhatsApp">
          <span>WhatsApp</span>
          <strong>Order / Reserve</strong>
        </a>
      </body>
    </html>
  );
}
