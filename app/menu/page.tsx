import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';
import MenuCatalog from '../components/MenuCatalog';
import { siteConfig } from '../data/site';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore the BOSSA Asado i Mar fire-grill menu: ribs, skewers, sandwiches, sides, sauces, Weekend Fire boxes, and Caribbean grill favorites in Pietermaai, Curacao.',
  alternates: { canonical: 'https://www.bossaasado.com/menu' },
};

const orderUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  'Bon dia BOSSA, I want to place an order. Name: ___ Pickup time: ___ Items / box number: ___ Quantity: ___'
)}`;

export default function MenuPage() {
  return (
    <main>
      <PublicHeader />
      <section className="container hero">
        <span className="badge">Fire & Smoke Menu</span>
        <h1>Wood-fire favorites, boxes, sides, and island flavor.</h1>
        <p className="lead">
          Choose your BOSSA format, send the order on WhatsApp, and the team confirms what is available from the fire.
        </p>
        <div className="cta-row">
          <a className="button primary" href={orderUrl} target="_blank" rel="noreferrer" data-track="whatsapp-click" data-cta-source="menu" data-cta-label="hero-order" data-offer-id="">
            Order on WhatsApp
          </a>
          <a className="button" href="/weekend-fire">Weekend Fire Boxes</a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <MenuCatalog sectionHeadingLevel="h2" showOrderActions />
        </div>
      </section>
      <SiteFooter label="BOSSA Menu" />
    </main>
  );
}
