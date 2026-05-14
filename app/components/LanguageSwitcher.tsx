'use client';

const siteUrl = 'https://bossaasado.com';

const languages = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸', href: '/' },
  { code: 'pap', label: 'Papiamentu', short: 'PAP', flag: '🇨🇼', href: `https://translate.google.com/translate?sl=en&tl=pap&u=${encodeURIComponent(siteUrl)}` },
  { code: 'nl', label: 'Nederlands', short: 'NL', flag: '🇳🇱', href: `https://translate.google.com/translate?sl=en&tl=nl&u=${encodeURIComponent(siteUrl)}` },
  { code: 'es', label: 'Español', short: 'ES', flag: '🇪🇸', href: `https://translate.google.com/translate?sl=en&tl=es&u=${encodeURIComponent(siteUrl)}` },
  { code: 'pt', label: 'Português / Brazil', short: 'PT', flag: '🇧🇷', href: `https://translate.google.com/translate?sl=en&tl=pt&u=${encodeURIComponent(siteUrl)}` },
  { code: 'de', label: 'Deutsch', short: 'DE', flag: '🇩🇪', href: `https://translate.google.com/translate?sl=en&tl=de&u=${encodeURIComponent(siteUrl)}` },
  { code: 'fr', label: 'Français', short: 'FR', flag: '🇫🇷', href: `https://translate.google.com/translate?sl=en&tl=fr&u=${encodeURIComponent(siteUrl)}` },
  { code: 'it', label: 'Italiano', short: 'IT', flag: '🇮🇹', href: `https://translate.google.com/translate?sl=en&tl=it&u=${encodeURIComponent(siteUrl)}` },
  { code: 'ar', label: 'العربية', short: 'AR', flag: '🇦🇪', href: `https://translate.google.com/translate?sl=en&tl=ar&u=${encodeURIComponent(siteUrl)}` },
];

export default function LanguageSwitcher() {
  return (
    <details className="language-switcher">
      <summary aria-label="Choose website language">
        <span className="language-globe">🌐</span>
        <span className="language-current">Language</span>
      </summary>
      <div className="language-menu" role="menu" aria-label="Website language options">
        {languages.map((language) => (
          <a
            key={language.code}
            href={language.href}
            target={language.code === 'en' ? undefined : '_blank'}
            rel={language.code === 'en' ? undefined : 'noreferrer'}
            role="menuitem"
            className="language-option"
          >
            <span>{language.flag}</span>
            <strong>{language.short}</strong>
            <small>{language.label}</small>
          </a>
        ))}
      </div>
    </details>
  );
}
