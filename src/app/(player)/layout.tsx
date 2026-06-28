import '../(frontend)/styles/csa/player.css'

import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'

import { fontVariables } from '@/lib/fonts'
import { CsaIcons } from '../(frontend)/_components/CsaIcons'

export const metadata: Metadata = {
  title: 'Course Player | CSA',
  robots: { index: false, follow: false },
}

/**
 * Standalone full-screen shell for the Course Player (/learn/*). Unlike the
 * marketing/(frontend) layout, this one renders NO global SiteHeader/footer —
 * the player is a focused app that owns the whole viewport with its own slim
 * brand header (.cp-top) and lesson footer (.cp-footer). Wrapping it in the
 * fixed global nav overlapped the player and broke its sticky 3-column shell,
 * which assumes top:0. We still ship the design-system CSS, the runtime public
 * env, Lucide (icons) and the motion engine so the player renders identically.
 * Payload's admin owns its own <html> root, so this group has its own root
 * layout rather than sharing one with (frontend).
 */
export default function PlayerLayout({ children }: { children: React.ReactNode }) {
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
