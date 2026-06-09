import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/weekend-fire/customize'],
    },
    sitemap: 'https://www.bossaasado.com/sitemap.xml',
  };
}
