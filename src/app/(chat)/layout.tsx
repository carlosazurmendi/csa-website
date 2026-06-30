import '../(frontend)/styles/csa/chat-bundle.css'

import React from 'react'
import Script from 'next/script'
import { va } from '@/lib/assetVersion'
import type { Metadata } from 'next'

import { getGlobalSafe } from '@/lib/cms'
import { createClient } from '@/lib/supabase/server'
import { toAuthUser, type AuthUser } from '@/lib/auth-user'
import { SiteHeader, type HeaderData } from '../(frontend)/_components/SiteHeader'
import { fontVariables } from '@/lib/fonts'
import { CsaIcons } from '../(frontend)/_components/CsaIcons'

export const metadata: Metadata = {
  title: 'Safety Chat | CSA',
  robots: { index: false, follow: false },
}

/**
 * Safety Chat shell (M6.5). Mirrors the design's Customer Portal Safety Chat page:
 * the GLOBAL nav stays on top (this is a portal app, not a chrome-less screen like
 * the player/assessment/certificate), but there is NO footer and the body is locked
 * to the viewport — the chat app owns its own internal scroll. Loads the minimal
 * `.sca-` bundle (tokens + kit + nav + safety-chat). Payload owns its own <html>
 * root, so this route group has its own root layout.
 */
export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const header = await getGlobalSafe<HeaderData>('header')

  let initialUser: AuthUser = null
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    initialUser = toAuthUser(user)
  } catch {
    // Supabase unreachable — render logged-out chrome (middleware gates the route anyway).
  }

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
        <link rel="modulepreload" href="/csa/vendor/paper-shaders.bundle.js" />
        <Script src={va('/csa/vendor/lucide.min.js')} strategy="afterInteractive" />
        <Script src={va('/csa/vendor/store.js')} strategy="afterInteractive" />
        <Script src={va('/csa/vendor/interactions.js')} strategy="afterInteractive" />
        <Script src={va('/csa/vendor/csa-shaders.js')} type="module" strategy="afterInteractive" />

        <SiteHeader data={header} initialUser={initialUser} />
        {children}

        <CsaIcons />
      </body>
    </html>
  )
}
