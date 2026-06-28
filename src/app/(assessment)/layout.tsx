import '../(frontend)/styles/csa/assessment-bundle.css'

import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'

import { fontVariables } from '@/lib/fonts'
import { CsaIcons } from '../(frontend)/_components/CsaIcons'

export const metadata: Metadata = {
  title: 'Final Assessment | CSA Academy',
  robots: { index: false, follow: false },
}

/**
 * Standalone full-screen shell for the Final Assessment (/assessment/*). Like the
 * Course Player, this is a focused testing screen that owns the whole viewport
 * with its own slim brand header (.as-top) — NO global SiteHeader/footer. It loads
 * the minimal `.as-` bundle (tokens + kit + assessment) so neither the marketing
 * chrome nor the `.cp-` sheets (course-player / portal) can bleed in. Payload owns
 * its own <html> root, so this route group has its own root layout rather than
 * sharing one with (frontend) or (player).
 */
export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} data-csa-motion>
      <body className="csa-root">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__CSA_ENV__=${JSON.stringify({
              supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
              supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
              stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
            })}`,
          }}
        />
        <Script src="/csa/vendor/lucide.min.js" strategy="afterInteractive" />
        <Script src="/csa/vendor/interactions.js" strategy="afterInteractive" />

        {children}

        <CsaIcons />
      </body>
    </html>
  )
}
