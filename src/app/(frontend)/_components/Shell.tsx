'use client'

import { usePathname } from 'next/navigation'

/**
 * Layout-invisible wrapper around the page content (NOT the header/footer). It
 * carries `csa-subpage` on every route except the home page so CSS can give
 * sub-page CTAs the frosted-glass face without touching the home page's bespoke
 * button mix or the shared header/footer. `.csa-shell { display: contents }`
 * means this div generates no box — zero layout impact — while still acting as
 * an ancestor for descendant selectors like `.csa-subpage .btn--gold-pill`.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return <div className={'csa-shell' + (isHome ? '' : ' csa-subpage')}>{children}</div>
}
