import type { Metadata } from 'next';
import LiveFireStatus from '../components/LiveFireStatus';
import { mediaAssets } from '../data/media';
import { menuSections } from '../data/menu';
import { paymentDisclaimer, paymentLinks } from '../data/payments';
import { siteConfig } from '../data/site';

export const metadata: Metadata = {
  title: 'Weekend Fire Boxes | Fire-Grill Take-Out · Pietermaai, Curaçao',
  description:
    'Order BOSSA Weekend Fire boxes via WhatsApp. Fire-roasted ribs, chicken, skewers, porkchop, and chorizo — numbered take-out boxes Thu–Sun 12:00–22:00. Pickup near Avila Beach Hotel, Pietermaai, Curaçao.',
  alternates: {
    canonical: 'https://www.bossaasado.com/weekend-fire',
  },
  openGraph: {
    title: 'BOSSA Weekend Fire Boxes | Pietermaai, Curaçao',
    description:
      'Numbered fire boxes · ribs, skewers, chicken, seafood · Thu–Sun · WhatsApp order. Near Avila Beach Hotel.',
    url: 'https://www.bossaasado.com/weekend-fire',
    images: ['/images/bossa/weekend-fire/box-1-bossa-box-mix.png'],
  },
};

const whatsappNumber = siteConfig.whatsappNumber;
const baseWhatsappUrl = `https://wa.me/${whatsappNumber}`;
const mainAudio = mediaAssets.audio[0];
const youtubeVideos = mediaAssets.videos.filter((video) => video.status === 'active');
const weekendBoxSection = menuSections.find((section) => section.id === 'weekend-boxes');
const weekendBoxes = [...(weekendBoxSection?.items ?? [])];

const getBoxNumber = (name: string) => {
  const match = name.match(/Box #(\d+)/i);
  return match ? `#${match[1]}` : name;
};

const getCleanBoxName = (name: string) => name.replace(/^Box\s+#\d+\s+—\s+/i, '');

const buildBoxOrderUrl = (boxNumber: string, boxName: string, price: string) => {
  const message = encodeURIComponent(
    `Bon dia BOSSA! Weekend Fire 🔥\n\nBox: ${boxNumber} — ${boxName}\nPrice: ${price}\n\nName: ___\nPickup time: ___\nQuantity: ___`
  );
  return `${baseWhatsappUrl}?text=${message}`;
};

const generalOrderMessage = encodeURIComponent(
  'Bon dia BOSSA, Weekend Fire! Please confirm what boxes are available today. Name: ___ Pickup time: ___ Box number: ___ Quantity: ___'
);
const whatsappUrl = `${baseWhatsappUrl}?text=${generalOrderMessage}`;

const pickupSteps = [
  'Choose your box number from #1 to #8.',
  'Send WhatsApp with your name, pickup time, box number, and quantity.',
  'BOSSA confirms what is still available from the fire batch.',
  'Pickup fast. Eat hot. Come early before sold out.',
];

export default function WeekendFirePage() {
  return (
    <main className="weekend-fire-page">
      <header className="container nav">
        <a className="brand brand-lockup" href="/" aria-label={`${siteConfig.brandName} home`}>
          <img src="/images/bossa/bossa-logo-fire-gold.svg" alt="" className="brand-logo" />
          <span>BOSSA ASADO I MAR</span>
        </a>
        <nav className="nav-links" aria-label="Weekend Fire navigation">
          <a href="/">Home</a>
          <a href="#boxes">Boxes</a>
          <a href="#audio">Audio</a>
          <a href="#videos">Videos</a>
          <a href="#pickup">Pickup Flow</a>
          <a href="/weekend-fire/customize">Customizer</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Order</a>
        </nav>
      </header>

      <section className="container hero weekend-hero">
        <LiveFireStatus />
        <span className="badge">Weekend Fire · Take-out only</span>
        <h1>Order by box number. Pickup fast. Eat hot.</h1>
        <p className="lead">
          Weekend Fire is {siteConfig.brandName}'s take-out ritual: numbered boxes, final flyer assets, audio, video,
          WhatsApp ordering, PNG/PDF/offline HTML export, and limited batches from Thursday to Sunday.
          Near Avila Beach Hotel, Pietermaai, Curaçao.
        </p>
        <div className="cta-row">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer"
            data-track="whatsapp-click" data-cta-source="weekend-fire" data-cta-label="hero-confirm" data-offer-id="">
            Confirm on WhatsApp
          </a>
          <a className="button" href={paymentLinks.weekendDeposit.href} target="_blank" rel="noreferrer">{paymentLinks.weekendDeposit.label}</a>
          <a className="button" href="#boxes">View Box #1–#8</a>
          <a className="button" href="/weekend-fire/customize">Open flyer customizer</a>
        </div>
        <p className="payment-note">{paymentDisclaimer} Test link: {paymentLinks.weekendDeposit.amount}.</p>
      </section>

      <section id="audio" className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Weekend Fire Sound</span>
            <h2>Let guests hear the BOSSA mood before they order.</h2>
            <p>This audio block is controlled by generated media data and shared across homepage, Weekend Fire, and party/events.</p>
          </div>
          <div className="info-card audio-card">
            <h3>{mainAudio.name}</h3>
            <audio controls preload="metadata">
              <source src={mainAudio.path} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </section>

      <section className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Final Weekend Flyer</span>
            <h2>Edit once. Export PNG, PDF, or offline HTML.</h2>
            <p>The customizer keeps the flyer editable and exportable for WhatsApp, Instagram, Canva, and print.</p>
            <div className="cta-row">
              <a className="button primary" href="/weekend-fire/customize">Open customizer</a>
              <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer"
                data-track="whatsapp-click" data-cta-source="weekend-fire" data-cta-label="flyer-order" data-offer-id="">
                Order before sold out
              </a>
            </div>
          </div>
          <img src="/images/bossa/weekend-fire/box-1-bossa-box-mix.png" alt="BOSSA Weekend Fire final box visual" style={{ width: '100%', borderRadius: '12px' }} />
        </div>
      </section>

      <section id="boxes" className="section">
        <div className="container">
          <span className="badge">Active Weekend Menu</span>
          <h2>{weekendBoxSection?.title ?? 'Fire box menu'}.</h2>
          <p>{weekendBoxSection?.note ?? 'Simple boxes. Fast flow. Fire decides the rhythm.'}</p>
          <div className="grid weekend-grid box-card-grid">
            {weekendBoxes.map((item) => {
              const boxNumber = getBoxNumber(item.name);
              const cleanName = getCleanBoxName(item.name);
              const image = 'image' in item ? item.image : undefined;
              const tag = 'tag' in item ? item.tag : undefined;
              const orderUrl = buildBoxOrderUrl(boxNumber, cleanName, item.price);

              return (
                <article className="card tall-card box-card" key={item.name}>
                  {image ? (
                    <img src={image} alt={`BOSSA ${cleanName} fire box — Curaçao weekend fire`} style={{ width: '100%', borderRadius: '14px', marginBottom: '14px' }} />
                  ) : null}
                  <div className="box-card-top">
                    <span className="box-number">Box {boxNumber}</span>
                    <span className="box-tag">{tag ?? item.status}</span>
                  </div>
                  <h3>{cleanName}</h3>
                  <strong className="price-line">{item.price}</strong>
                  <p>{item.description}</p>
                  <a
                    className="button primary box-order-button"
                    href={orderUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Order Box ${boxNumber} — ${cleanName} via WhatsApp`}
                    data-track="whatsapp-click"
                    data-cta-source="weekend-fire"
                    data-cta-label="box-order"
                    data-offer-id={boxNumber}
                  >
                    📱 Order Box {boxNumber} via WhatsApp
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container info-card" style={{ textAlign: 'center' }}>
          <span className="badge">Deposit option</span>
          <h2>Reserve Weekend Fire capacity after confirmation.</h2>
          <p>{paymentLinks.weekendDeposit.note}</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer"
              data-track="whatsapp-click" data-cta-source="weekend-fire" data-cta-label="deposit-confirm" data-offer-id="">
              Confirm availability first
            </a>
            <a className="button" href={paymentLinks.weekendDeposit.href} target="_blank" rel="noreferrer">{paymentLinks.weekendDeposit.label}</a>
          </div>
          <p className="payment-note">{paymentLinks.weekendDeposit.amount}. Test-mode Stripe link for preview only.</p>
        </div>
      </section>

      <section id="videos" className="section media-section">
        <div className="container">
          <span className="badge">BOSSA YouTube Channel</span>
          <h2>Watch the fire before you order.</h2>
          <div className="grid video-grid">
            {youtubeVideos.map((video) => (
              <article className="video-card" key={video.embedUrl}>
                <div className="video-frame">
                  <iframe src={video.embedUrl} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                </div>
                <h3>{video.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pickup" className="section media-section final-weekend-fire-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Pickup flow</span>
            <h2>Order by number. Pickup fast. Eat hot.</h2>
            <p>Weekend Fire works best when the order is clear before the rush starts.</p>
            <div className="cta-row">
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer"
                data-track="whatsapp-click" data-cta-source="weekend-fire" data-cta-label="pickup-order" data-offer-id="">
                Order before sold out
              </a>
            </div>
          </div>
          <div className="info-card">
            <h3>How pickup works</h3>
            <ol>{pickupSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </div>
      </section>

      <footer className="footer weekend-fire-footer">
        <div className="container footer-grid">
          <div>
            <strong>BOSSA Weekend Fire</strong>
            <p>{siteConfig.address}</p>
          </div>
          <div>
            <p>WhatsApp: +5999 523 0683</p>
            <p>Weekend Fire: {siteConfig.hours}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
