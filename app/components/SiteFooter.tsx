import { siteConfig } from '../data/site';

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
          <p>WhatsApp: +5999 523 0683</p>
          <p>Open {siteConfig.hours}</p>
        </div>
      </div>
    </footer>
  );
}
