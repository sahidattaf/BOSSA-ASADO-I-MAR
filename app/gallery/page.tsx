import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';
import { galleryGroups } from '../data/revenue-pages';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'View BOSSA Asado i Mar food, fire, rooftop, event, and behind-the-scenes visuals from the Curacao fire-grill experience.',
  alternates: { canonical: 'https://www.bossaasado.com/gallery' },
};

export default function GalleryPage() {
  return (
    <main>
      <PublicHeader />
      <section className="container hero">
        <span className="badge">Gallery · Food · Fire · Rooftop · Events</span>
        <h1>See the fire before you choose.</h1>
        <p className="lead">Real BOSSA visuals should make people hungry before they think too much.</p>
      </section>
      <section className="section premium-section">
        <div className="container grid">
          {galleryGroups.map((group) => (
            <article className="photo-card" key={group.title}>
              <img src={group.image} alt={`${group.title} at BOSSA`} />
              <div className="image-caption">
                <strong>{group.title}</strong>
                <p>{group.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter label="BOSSA Gallery" />
    </main>
  );
}
