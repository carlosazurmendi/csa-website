import type { MetadataRoute } from 'next'

import { primaryOrigin } from '@/lib/origin'

// Evaluated per request, not at build: the production image bakes no
// NEXT_PUBLIC_* values, so a static robots.txt would lose the Sitemap pointer.
export const dynamic = 'force-dynamic'

/**
 * /robots.txt — everything public is crawlable (the point of the structured
 * data work); account, commerce-session, and app surfaces are not.
 */
export default function robots(): MetadataRoute.Robots {
  const origin = primaryOrigin()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api/',
        '/dashboard',
        '/portal',
        '/cart',
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/learn/',
        '/assessment/',
        '/certificate',
        '/safety-chat',
        '/training/checkout/',
      ],
    },
    sitemap: origin ? `${origin}/sitemap.xml` : undefined,
  }
}
