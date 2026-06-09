import type { Metadata } from 'next';
import PublicHeader from '../components/PublicHeader';
import SiteFooter from '../components/SiteFooter';
import { starterReviews } from '../data/revenue-pages';

export const metadata: Metadata = {
  title: 'Reviews',
  description:
    'Read BOSSA Asado i Mar customer review highlights, testimonial layout, Google Reviews direction, and social proof for the Curacao fire-grill restaurant.',
  alternates: { canonical: 'https://www.bossaasado.com/reviews' },
};

export default function ReviewsPage() {
  return (
    <main>
      <PublicHeader />
      <section className="container hero">
        <span className="badge">Reviews · Trust · Social Proof</span>
        <h1>Trust for the fire, the flow, and the food.</h1>
        <p className="lead">
          This page is ready for Google Reviews, TripAdvisor, Instagram mentions, customer quotes, and video testimonials.
        </p>
      </section>
      <section className="section premium-section">
        <div className="container grid">
          {starterReviews.map((review) => (
            <article className="card tall-card" key={review.source}>
              <h3>{review.source}</h3>
              <p>{review.quote}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter label="BOSSA Reviews" />
    </main>
  );
}
