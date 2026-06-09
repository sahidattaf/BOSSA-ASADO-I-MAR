import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.bossaasado.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/menu',
    '/weekend-fire',
    '/rooftop-lounge',
    '/catering',
    '/private-events',
    '/tourist-experiences',
    '/gallery',
    '/reviews',
    '/about',
    '/partners',
    '/contact',
    '/ai-concierge',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
