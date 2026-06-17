import React from 'react'
import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { buildNav } from '@/lib/nav'
import { Nav, type NavItem } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { CsaScripts } from '@/components/layout/CsaScripts'

const mediaUrl = (m: unknown): string | undefined =>
  m && typeof m === 'object' && 'url' in m ? ((m as { url?: string }).url ?? undefined) : undefined

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'siteSettings' })
  return {
    title: {
      default: settings?.defaultSeo?.title || settings?.siteName || 'Critical Systems Analysis',
      template: `%s | ${settings?.siteName || 'CSA'}`,
    },
    description: settings?.defaultSeo?.description || undefined,
    metadataBase: process.env.NEXT_PUBLIC_SERVER_URL
      ? new URL(process.env.NEXT_PUBLIC_SERVER_URL)
      : undefined,
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const [settings, header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'siteSettings', depth: 1 }),
    payload.findGlobal({ slug: 'header', depth: 1 }),
    payload.findGlobal({ slug: 'footer', depth: 1 }),
  ])

  const logoUrl = mediaUrl(settings?.logo)
  const nav = await buildNav(payload, (header?.nav || []) as unknown as NavItem[])
  const utility = {
    loginLabel: header?.utility?.loginLabel,
    loginHref: header?.utility?.loginHref,
    cartHref: header?.utility?.cartHref,
    consultationLabel: header?.utility?.consultationLabel,
    consultationHref: header?.utility?.consultationHref,
  }

  return (
    <html lang="en" data-csa-motion>
      <body className="csa-root" data-csa-intro="CRITICAL SYSTEMS ANALYSIS">
        {/* Design-system CSS served verbatim (not through the bundler, which
            strips backdrop-filter/background from the source). Single ordered
            bundle; review-treatments wins because it's concatenated last. */}
        <link rel="stylesheet" href="/assets/csa.bundle.css" precedence="csa" />
        <link rel="stylesheet" href="/assets/csa-overrides.css" precedence="csa-overrides" />
        <Nav logoUrl={logoUrl} nav={nav} utility={utility} />
        {children}
        <Footer
          logoUrl={logoUrl}
          nav={nav}
          social={{
            linkedin: settings?.social?.linkedin,
            x: settings?.social?.x,
            youtube: settings?.social?.youtube,
          }}
          closingCta={footer?.closingCta || {}}
          brandBlurb={footer?.brandBlurb}
          legalLinks={(footer?.legalLinks || []).map((l) => ({ label: l.label, href: l.href }))}
          copyright={footer?.copyright}
        />
        <CsaScripts />
      </body>
    </html>
  )
}
