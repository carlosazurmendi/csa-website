import './styles/csa/index.css'

import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'

import { getGlobalSafe } from '@/lib/cms'
import { SiteHeader, type HeaderData } from './_components/SiteHeader'
import { SiteFooter, type FooterData } from './_components/SiteFooter'
import { CsaIcons } from './_components/CsaIcons'
import { Shell } from './_components/Shell'

export const metadata: Metadata = {
  // No title.template — the seeded page metaTitles already carry their own branding
  // (e.g. "… | CSA"); a template would double the suffix. Pages set their full title.
  title: 'Functional Safety Engineering Consulting | CSA',
  description:
    'Functional safety engineering consulting for autonomous rail, robotics & machinery. Principal-led HARA, FMEA, ISO 26262 & IEC 61508 support. Faster certification.',
}

/**
 * Public marketing shell. Renders the CSA design system: tokens/kit CSS, the
 * vendored side-effect scripts (Lucide icons, the localStorage commerce/auth
 * stub, the motion engine, the WebGL shaders), and the global header/footer
 * driven by the Payload `header` / `footer` globals. `data-csa-motion` forces
 * the motion engine on (mirrors design-reference Home.html).
 */
export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [header, footer] = await Promise.all([
    getGlobalSafe<HeaderData>('header'),
    getGlobalSafe<FooterData>('footer'),
  ])

  return (
    <html lang="en" data-csa-motion>
      <body className="csa-root">
        {/* Start fetching the self-hosted shader bundle (React 18 + Paper) during
            HTML parse so it's cached by the time csa-shaders.js dynamic-imports
            it — faster, deterministic first paint for the WebGL effects. */}
        <link rel="modulepreload" href="/csa/vendor/paper-shaders.bundle.js" />
        {/* Vendored design-system runtime — load order mirrors the export shell.
            Lucide + store before the components that read them; the motion engine
            and shaders self-boot and re-scan React-rendered nodes. */}
        <Script src="/csa/vendor/lucide.min.js" strategy="afterInteractive" />
        <Script src="/csa/vendor/store.js" strategy="afterInteractive" />
        <Script src="/csa/vendor/interactions.js" strategy="afterInteractive" />
        <Script src="/csa/vendor/csa-shaders.js" type="module" strategy="afterInteractive" />

        <SiteHeader data={header} />
        <Shell>{children}</Shell>
        <SiteFooter data={footer} />

        <CsaIcons />
      </body>
    </html>
  )
}
