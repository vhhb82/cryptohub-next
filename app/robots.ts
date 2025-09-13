import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: ['/admin', '/api/'] }],
    // setează sitemap când ai domeniu: sitemap: 'https://exemplu.ro/sitemap.xml',
  }
}
