import type { Metadata } from 'next';
import LanguageSwitcher from './components/LanguageSwitcher';
import WhatsAppClickTracker from './components/WhatsAppClickTracker';
import './globals.css';
import './home-polish.css';

const SITE_URL = 'https://www.bossaasado.com';
const WA_NUMBER = '59995230683';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BOSSA Asado i Mar | Fire-Grill Restaurant · Pietermaai, Curaçao',
    template: '%s | BOSSA Asado i Mar',
  },
  description:
    'BOSSA Asado i Mar — wood fire grill in Pietermaai, Curaçao, opposite Avila Beach Hotel. Fire boxes, ribs, skewers, seafood, sandwiches, and party catering. WhatsApp order, Thu–Sun 12:00–22:00.',
  keywords: [
    'fire grill Curaçao',
    'restaurant Pietermaai',
    'BBQ near Avila Beach Hotel',
    'fire boxes Curaçao',
    'skewers ribs Willemstad',
    'weekend fire boxes',
    'wood fire grill Caribbean',
    'seafood grill Curaçao',
    'takeout Pietermaai',
    'party catering Curaçao',
    'BOSSA Asado i Mar',
    'fire roasted chicken Curaçao',
    'WhatsApp restaurant order',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'BOSSA Asado i Mar | Fire-Grill · Pietermaai, Curaçao',
    description:
      'Wood fire grill opposite Avila Beach Hotel. Fire boxes, ribs, skewers, seafood, party catering. WhatsApp order · Thu–Sun.',
    url: SITE_URL,
    siteName: 'BOSSA Asado i Mar',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/bossa/bbq-party-del-rey.jpg',
        width: 1200,
        height: 630,
        alt: 'BOSSA Asado i Mar fire-grill restaurant Pietermaai Curaçao',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BOSSA Asado i Mar | Fire-Grill · Curaçao',
    description: 'Wood fire grill, skewers, ribs, seafood, weekend boxes. Pietermaai, Curaçao.',
    images: ['/images/bossa/bbq-party-del-rey.jpg'],
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'BOSSA Asado i Mar',
  description:
    'Fire-grill restaurant in Pietermaai, Curaçao. Wood fire, skewers, ribs, seafood, weekend take-out boxes, and private event catering.',
  url: SITE_URL,
  telephone: `+${WA_NUMBER}`,
  image: `${SITE_URL}/images/bossa/bbq-party-del-rey.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Oranjestraat 116',
    addressLocality: 'Pietermaai, Willemstad',
    addressRegion: 'Curaçao',
    addressCountry: 'CW',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.1068,
    longitude: -68.9268,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '12:00',
      closes: '22:00',
    },
  ],
  servesCuisine: ['Caribbean', 'Fire-grill', 'Grilled meats', 'Seafood', 'Barbecue'],
  priceRange: '$$',
  hasMenu: `${SITE_URL}/party-menu`,
  menu: `${SITE_URL}/party-menu`,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Takeout', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor seating', value: true },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <LanguageSwitcher />
        <WhatsAppClickTracker />
        {children}
        <a
          className="sticky-whatsapp"
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Order or reserve BOSSA on WhatsApp"
          data-track="whatsapp-click"
          data-cta-source="sticky"
          data-cta-label="sticky-whatsapp"
          data-offer-id=""
        >
          <span>WhatsApp</span>
          <strong>Order / Reserve</strong>
        </a>
      </body>
    </html>
  );
}
