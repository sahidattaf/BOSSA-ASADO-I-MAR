import { siteRoutes } from '../data/revenue-pages';
import { siteConfig } from '../data/site';

export default function PublicHeader() {
  return (
    <header className="container nav">
      <a className="brand brand-lockup" href="/" aria-label={`${siteConfig.brandName} home`}>
        <img src="/images/bossa/bossa-logo-fire-gold.svg" alt="" className="brand-logo" />
        <span>BOSSA ASADO I MAR</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {siteRoutes.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
