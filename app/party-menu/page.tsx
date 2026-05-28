import type { Metadata } from 'next';
import { mediaAssets } from '../data/media';
import { partyPackages } from '../data/party-packages';
import { paymentDisclaimer, paymentLinks } from '../data/payments';
import { siteConfig } from '../data/site';

export const metadata: Metadata = {
  title: 'Party & Events Catering | Fire-Grill · Pietermaai, Curaçao',
  description:
    'BOSSA Asado i Mar party catering in Curaçao — fire-roasted trays, skewers, ribs, seafood, and event packages for groups. Request a quote via WhatsApp. Pietermaai, near Avila Beach Hotel.',
  alternates: {
    canonical: 'https://www.bossaasado.com/party-menu',
  },
  openGraph: {
    title: 'BOSSA Party & Events | Fire Catering · Curaçao',
    description:
      'Group fire orders, event trays, skewers, ribs, seafood catering · WhatsApp quote. Pietermaai, Curaçao.',
    url: 'https://www.bossaasado.com/party-menu',
    images: ['/images/bossa/bbq-party-del-rey.jpg'],
  },
};

const whatsappNumber = siteConfig.whatsappNumber;
const partyMessage = encodeURIComponent(
  'Bon dia BOSSA, I want a party / event quote. Date: ___ Group size: ___ Pickup/event time: ___ Package preference: ___ Budget: ___'
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${partyMessage}`;
const mainAudio = mediaAssets.audio[0];
const youtubeVideos = mediaAssets.videos.filter((video) => video.status === 'active');

const orderSteps = [
  'Send WhatsApp with date, time, group size, budget, and package preference.',
  'BOSSA confirms fire capacity and the best format for your group.',
  'Final quantity and pickup/event time are locked before prep starts.',
  'Boxes or trays are labeled by name, time, and package type.',
  'Pickup or event handoff stays fast — when the fire rests, we close.',
];

export default function PartyMenuPage() {
  return (
    <main>
      <header className="container nav">
        <a className="brand brand-lockup" href="/" aria-label={`${siteConfig.brandName} home`}>
          <img src="/images/bossa/bossa-logo-fire-gold.svg" alt="" className="brand-logo" />
          <span>BOSSA ASADO I MAR</span>
        </a>
        <nav className="nav-links" aria-label="Party menu navigation">
          <a href="/">Home</a>
          <a href="/weekend-fire">Weekend Fire</a>
          <a href="#packages">Packages</a>
          <a href="#audio">Audio</a>
          <a href="#videos">Videos</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Quote</a>
        </nav>
      </header>

      <section className="container hero">
        <span className="badge">Party / Events · Group Orders · Private Fire Moments</span>
        <h1>Fire boxes, skewers, sandwiches, and sea specials for groups.</h1>
        <p className="lead">
          This page is for birthdays, office orders, rooftop moments, family gatherings, content shoots,
          private fire experiences, and future Weekend Fire & Sea Specials.
        </p>
        <div className="cta-row">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Request party quote</a>
          <a className="button" href={paymentLinks.partyDeposit.href} target="_blank" rel="noreferrer">{paymentLinks.partyDeposit.label}</a>
          <a className="button" href={paymentLinks.cateringDeposit.href} target="_blank" rel="noreferrer">{paymentLinks.cateringDeposit.label}</a>
          <a className="button" href="/weekend-fire">View Weekend Fire</a>
          <a className="button" href="#packages">View packages</a>
        </div>
        <p className="payment-note">{paymentDisclaimer} Stripe links are in test mode for preview.</p>
      </section>

      <section className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Event direction</span>
            <h2>Choose the format. BOSSA controls the fire flow.</h2>
            <p>
              Group orders should be simple: one request, one quote, one pickup or event time, and one clean food system.
            </p>
          </div>
          <img src="/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png" alt="BOSSA seafood event coming soon" style={{ width: '100%', borderRadius: '12px' }} />
        </div>
      </section>

      <section id="packages" className="section">
        <div className="container">
          <span className="badge">Party packages</span>
          <h2>Party and event formats.</h2>
          <p>Built from generated BOSSA content data: boxes, skewers, sandwiches, sides, sauces, audio, videos, and WhatsApp confirmation.</p>
          <div className="grid weekend-grid">
            {partyPackages.map((pkg) => (
              <article className="card tall-card" key={pkg.name}>
                <img src={pkg.image} alt={`${pkg.name} visual`} style={{ width: '100%', borderRadius: '14px', marginBottom: '14px' }} />
                <h3>{pkg.name}</h3>
                <strong className="price-line">{pkg.price}</strong>
                <p>{pkg.description}</p>
                <p><strong>Best for:</strong> {pkg.bestFor}</p>
                <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Request quote</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="badge">How to order</span>
            <h2>Simple request. Clean confirmation. No chaos.</h2>
            <p>Party orders should be locked before production starts. This protects quality, speed, and guest expectations.</p>
          </div>
          <div className="info-card">
            <h3>Ordering steps</h3>
            <ol>{orderSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container info-card" style={{ textAlign: 'center' }}>
          <span className="badge">Deposit options</span>
          <h2>Pay a deposit after BOSSA confirms availability.</h2>
          <p>{paymentDisclaimer}</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Confirm quote first</a>
            <a className="button" href={paymentLinks.partyDeposit.href} target="_blank" rel="noreferrer">{paymentLinks.partyDeposit.label}</a>
            <a className="button" href={paymentLinks.cateringDeposit.href} target="_blank" rel="noreferrer">{paymentLinks.cateringDeposit.label}</a>
          </div>
          <p className="payment-note">{paymentLinks.partyDeposit.amount} · {paymentLinks.cateringDeposit.amount}. Test-mode Stripe links for preview only.</p>
        </div>
      </section>

      <section id="audio" className="section media-section">
        <div className="container media-grid">
          <div>
            <span className="badge">Party music & ambiance</span>
            <h2>Audio experience</h2>
            <p>Let the {siteConfig.brandName} soundtrack set the mood for fire, smoke, and island soul.</p>
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

      <section id="videos" className="section media-section">
        <div className="container">
          <span className="badge">BOSSA YouTube Channel</span>
          <h2>Show the fire before the quote.</h2>
          <p>Use videos as trust proof for the food, fire, smoke, island flavor, and future event flow.</p>
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

      <section className="section">
        <div className="container info-card" style={{ textAlign: 'center' }}>
          <span className="badge">Ready to celebrate?</span>
          <h2>Request your BOSSA party / event quote.</h2>
          <p>Send your event details on WhatsApp. BOSSA confirms availability, format, quantity, pickup/event time, and quote.</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Request Party Quote via WhatsApp</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <strong>BOSSA Party / Events</strong>
            <p>{siteConfig.address}</p>
          </div>
          <div>
            <p>WhatsApp: +5999 523 0683</p>
            <p>Group orders by request · {siteConfig.hours}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
