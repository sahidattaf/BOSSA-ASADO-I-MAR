import { siteConfig } from '../data/site';

export default function PhoneLink({ className }: { className?: string }) {
  return (
    <a className={className} href={`tel:+${siteConfig.whatsappNumber}`}>
      {siteConfig.phoneDisplay}
    </a>
  );
}
