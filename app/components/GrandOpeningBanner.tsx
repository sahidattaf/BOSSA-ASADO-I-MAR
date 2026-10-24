import { GRAND_OPENING_PENDING } from '../data/opening-status';

export default function GrandOpeningBanner() {
  if (!GRAND_OPENING_PENDING) return null;

  return (
    <div className="grand-opening-banner" role="status">
      <a href="/reserve">🌟 Grand Opening Coming Soon — Reserve your table now.</a>
    </div>
  );
}
