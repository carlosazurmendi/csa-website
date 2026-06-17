'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MetalEdge } from '@/components/ui/MetalEdge'

export type NavChild = { label: string; href: string; isCTA?: boolean | null }
export type NavItem = { label: string; href: string; children?: NavChild[] | null }
export type NavUtility = {
  loginLabel?: string | null
  loginHref?: string | null
  cartHref?: string | null
  consultationLabel?: string | null
  consultationHref?: string | null
}

type Props = {
  logoUrl?: string
  logoAlt?: string
  nav: NavItem[]
  utility: NavUtility
}

/**
 * Global primary navigation. Ported from the prototype's nav.jsx — same markup
 * and class names (.navx*), same scroll-solid behavior and mobile drawer — but
 * the route tree comes from the Payload `header` global and active state is
 * derived from the App Router pathname.
 */
export function Nav({ logoUrl, logoAlt = 'CSA — Critical Systems Analysis', nav, utility }: Props) {
  const pathname = usePathname()
  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openAcc, setOpenAcc] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) (window as any).lucide.createIcons()
  })

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (!href || href === '#') return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }
  const branchActive = (item: NavItem) =>
    isActive(item.href) || (item.children || []).some((c) => isActive(c.href))

  return (
    <>
      <nav className={'navx' + (solid ? ' is-solid' : '')} data-screen-label="Global Nav">
        <div className="navx__inner">
          <a className="navx__logo" href="/" aria-label="CSA — home">
            {logoUrl ? <img src={logoUrl} alt={logoAlt} /> : <span style={{ color: 'var(--fg-1)', fontWeight: 800 }}>CSA</span>}
          </a>

          <div className="navx__primary">
            {nav.map((item) => {
              if (!item.children || item.children.length === 0) {
                return (
                  <div className="navx-item" key={item.label}>
                    <a className={'navx-item__link' + (isActive(item.href) ? ' is-active' : '')} href={item.href}>
                      {item.label}
                    </a>
                  </div>
                )
              }
              const wide = item.children.length > 5
              return (
                <div className="navx-item" key={item.label}>
                  <a className={'navx-item__link' + (branchActive(item) ? ' is-active' : '')} href={item.href}>
                    {item.label}
                    <i className="chev" data-lucide="chevron-down"></i>
                  </a>
                  <div className={'navx-drop' + (wide ? ' navx-drop--wide' : '')}>
                    {item.children.map((c) =>
                      c.isCTA ? (
                        <a key={c.label} className="btn btn--gold-pill navx-drop__cta" href={c.href}>
                          {c.label} <i data-lucide="arrow-right"></i>
                        </a>
                      ) : (
                        <a
                          key={c.label}
                          className={'navx-drop__link' + (isActive(c.href) ? ' is-active' : '')}
                          href={c.href}
                        >
                          <span>{c.label}</span>
                          <span className="dot"></span>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="navx__right">
            <a className="navx__login" href={utility.loginHref || '#'}>
              <i data-lucide="user"></i> {utility.loginLabel || 'Login'}
            </a>
            <a className="navx__cart" href={utility.cartHref || '#'} aria-label="Cart">
              <i data-lucide="shopping-cart"></i>
              <span className="navx__cart-badge">0</span>
            </a>
            <MetalEdge as="a" className="btn btn--silver-pill navx__cta" href={utility.consultationHref || '#'} goldOnHover>
              {utility.consultationLabel || 'Book a Consultation'} <i data-lucide="arrow-right"></i>
            </MetalEdge>
            <button className="navx__burger" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
              <i data-lucide="menu"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={'navx-mobile' + (mobileOpen ? ' is-open' : '')}>
        <button
          className="navx__burger"
          style={{ position: 'absolute', top: 22, right: 20 }}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          <i data-lucide="x"></i>
        </button>
        {nav.map((item) => {
          if (!item.children || item.children.length === 0) {
            return (
              <div className="navx-macc" key={item.label}>
                <a
                  className={'navx-macc__head' + (isActive(item.href) ? ' is-active' : '')}
                  href={item.href}
                  style={{ textDecoration: 'none' }}
                >
                  {item.label}
                </a>
              </div>
            )
          }
          const open = openAcc === item.label
          return (
            <div className={'navx-macc' + (open ? ' is-open' : '')} key={item.label}>
              <button className="navx-macc__head" onClick={() => setOpenAcc(open ? null : item.label)}>
                {item.label} <i data-lucide="chevron-down"></i>
              </button>
              <div className="navx-macc__body">
                {item.children.map((c) =>
                  c.isCTA ? (
                    <a key={c.label} className="btn btn--gold-pill btn--block" href={c.href} style={{ marginTop: 8 }}>
                      {c.label} <i data-lucide="arrow-right"></i>
                    </a>
                  ) : (
                    <a key={c.label} className={isActive(c.href) ? 'is-active' : ''} href={c.href}>
                      {c.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          )
        })}
        <div className="navx-mobile__actions">
          <MetalEdge as="a" className="btn btn--silver-pill btn--block" href={utility.consultationHref || '#'} goldOnHover>
            {utility.consultationLabel || 'Book a Consultation'} <i data-lucide="arrow-right"></i>
          </MetalEdge>
          <div className="navx-mobile__row">
            <a className="navx__login" href={utility.loginHref || '#'} style={{ padding: '9px 0' }}>
              <i data-lucide="user"></i> {utility.loginLabel || 'Login'}
            </a>
            <a className="navx__cart" href={utility.cartHref || '#'} aria-label="Cart">
              <i data-lucide="shopping-cart"></i>
              <span className="navx__cart-badge">0</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
