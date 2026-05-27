import type { Metadata } from 'next';
import LanguageSwitcher from './components/LanguageSwitcher';
import './globals.css';
import './home-polish.css';

const whatsappNumber = '59995230683';
const displayPhone = '+5999 523 0683';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'BOSSA Asado i Mar',
  description:
    'BOSSA Asado i Mar is a wood-fire and charcoal restaurant concept in Pietermaai, Curaçao, focused on Weekend Fire boxes, skewers, ribs, sandwiches, party orders, and Caribbean fire-grill hospitality.',
  url: 'https://bossaasado.com',
  telephone: displayPhone,
  priceRange: 'XCG 6–99.50',
  servesCuisine: ['Caribbean', 'Wood-fire grill', 'BBQ', 'Seafood', 'Sandwiches'],
  image: 'https://bossaasado.com/images/bossa/bossa-hero-pietermaai-business-hub.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Oranjestraat 116, Pietermaai',
    addressLocality: 'Willemstad',
    addressRegion: 'Curaçao',
    addressCountry: 'CW',
  },
  areaServed: ['Pietermaai', 'Willemstad', 'Curaçao'],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '12:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '12:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '12:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '12:00', closes: '22:00' },
  ],
  sameAs: ['https://bossaasado.com/weekend-fire', 'https://bossaasado.com/party-menu'],
  potentialAction: {
    '@type': 'ReserveAction',
    target: whatsappUrl,
  },
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
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
