import { siteConfig } from '../data/site';
import PhoneLink from './PhoneLink';

export default function SiteFooter({ label = siteConfig.brandName }: { label?: string }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/bossa/bossa-logo-fire-gold.svg" alt={`${siteConfig.brandName} logo`} className="footer-logo" />
          <div>
            <strong>{label}</strong>
            <p>{siteConfig.address}</p>
            <p>#BossaAsado · #WeekendFireGrill · #KandelaDushi</p>
          </div>
        </div>
        <div>
          <p>WhatsApp: <PhoneLink /></p>
          <p>Open {siteConfig.hours}</p>
        </div>
      </div>
    </footer>
  );
}
