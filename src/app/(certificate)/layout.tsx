import '../(frontend)/styles/csa/certificate-bundle.css'

import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'

import { CsaIcons } from '../(frontend)/_components/CsaIcons'

export const metadata: Metadata = {
  title: 'Certificate of Completion | CSA Academy',
  robots: { index: false, follow: false },
}

/**
 * Standalone full-screen shell for the Certificate page (/certificate). Like the
 * Course Player and Assessment, it renders NO global SiteHeader/footer — it has
 * its own dark masthead (.ct-top). Loads the minimal `.ct-` bundle (tokens + kit
 * + certificate) so neither the marketing chrome nor the `.cp-`/`.as-` sheets can
 * bleed in. Payload owns its own <html> root, so this route group has its own
 * root layout rather than sharing one with (frontend).
 */
export default function CertificateLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-csa-motion>
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
