'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { NavUser } from '@/lib/auth'
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
  user?: NavUser | null
}

const ACCOUNT_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'layout-dashboard' },
  { label: 'Customer Portal', href: '/portal', icon: 'user-cog' },
]

/**
 * Global primary navigation — ported to the v2 design (nav.css):
 * animated hamburger↔X, auth-aware right cluster (Login + Book a Consultation
 * when signed out; account menu when signed in), and the v2 mobile drawer.
 * Route tree comes from the Payload `header` global; the signed-in user comes
 * from the Supabase session (resolved server-side in the layout).
 */
export function Nav({ logoUrl, logoAlt = 'CSA — Critical Systems Analysis', nav, utility, user }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openAcc, setOpenAcc] = useState<string | null>(null)

  // Real CMS hrefs win; fall back to the live app routes when the CMS still
  // holds the Phase-1 "#" placeholders.
  const real = (href?: string | null, fallback?: string) => (href && href !== '#' ? href : fallback || '#')
  const loginHref = real(utility.loginHref, '/login')
  const cartHref = real(utility.cartHref, '/cart')
  const consultationHref = utility.consultationHref || '#'
  const loginLabel = utility.loginLabel || 'Login'
  const consultationLabel = utility.consultationLabel || 'Book a Consultation'

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as { lucide?: { createIcons: () => void } }).lucide)
      (window as { lucide?: { createIcons: () => void } }).lucide!.createIcons()
  })

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close the mobile drawer when the route changes.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (!href || href === '#') return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }
  const branchActive = (item: NavItem) =>
    isActive(item.href) || (item.children || []).some((c) => isActive(c.href))

  const logout = async () => {
    try {
      await fetch('/auth/signout', { method: 'POST' })
    } finally {
      router.push('/')
      router.refresh()
    }
  }

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
            <a className="navx__cart" href={cartHref} aria-label="Cart">
              <i data-lucide="shopping-cart"></i>
              <span className="navx__cart-badge">0</span>
            </a>

            {user ? (
              <AccountMenu user={user} consultationHref={consultationHref} consultationLabel={consultationLabel} onLogout={logout} />
            ) : (
              <>
                <a className="navx__login" href={loginHref}>
                  <i data-lucide="user"></i> {loginLabel}
                </a>
                <MetalEdge as="a" className="btn btn--silver-pill navx__cta" href={consultationHref} goldOnHover>
                  {consultationLabel} <i data-lucide="arrow-right"></i>
                </MetalEdge>
              </>
            )}

            {/* Animated hamburger ↔ X (mobile) */}
            <div
              className={'navx-hamburger' + (mobileOpen ? ' active' : '')}
              role="button"
              tabIndex={0}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setMobileOpen((o) => !o)
                }
              }}
            >
              <div></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={'navx-mobile' + (mobileOpen ? ' is-open' : '')}>
        {user && (
          <div className="navx-mobile__id">
            <span className="navx-acct__avatar navx-acct__avatar--lg">{user.initials}</span>
            <div className="navx-acct__idtext">
              <p className="navx-acct__fullname">{user.fullName}</p>
              <p className="navx-acct__email">{user.email}</p>
            </div>
          </div>
        )}
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
          {user ? (
            <>
              {ACCOUNT_LINKS.map((l) => (
                <a key={l.label} className="btn btn--silver-pill btn--block" href={l.href}>
                  {l.label}
                </a>
              ))}
              <button className="btn btn--link btn--block" onClick={logout}>
                Log Out <i data-lucide="log-out"></i>
              </button>
            </>
          ) : (
            <>
              <a className="btn btn--silver-pill btn--block" href={loginHref}>
                {loginLabel}
              </a>
              <a className="btn btn--gold-pill btn--block" href={consultationHref}>
                {consultationLabel} <i data-lucide="arrow-right"></i>
              </a>
            </>
          )}
        </div>
      </div>
    </>
  )
}

/* ---------- Account menu (signed-in) ---------- */
function AccountMenu({
  user,
  consultationHref,
  consultationLabel,
  onLogout,
}: {
  user: NavUser
  consultationHref: string
  consultationLabel: string
  onLogout: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as { lucide?: { createIcons: () => void } }).lucide)
      (window as { lucide?: { createIcons: () => void } }).lucide!.createIcons()
  })
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className={'navx-acct' + (open ? ' is-open' : '')} ref={ref}>
      <button className="navx-acct__btn" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
        <span className="navx-acct__avatar">{user.initials}</span>
        <span className="navx-acct__name">{user.fullName.split(' ')[0]}</span>
        <i className="chev" data-lucide="chevron-down"></i>
      </button>
      <div className="navx-acct__menu" role="menu">
        <div className="navx-acct__id">
          <span className="navx-acct__avatar navx-acct__avatar--lg">{user.initials}</span>
          <div className="navx-acct__idtext">
            <p className="navx-acct__fullname">{user.fullName}</p>
            <p className="navx-acct__email">{user.email}</p>
          </div>
        </div>
        <a className="btn btn--gold-pill btn--block navx-acct__cta" href={consultationHref}>
          {consultationLabel} <i data-lucide="arrow-right"></i>
        </a>
        <div className="navx-acct__links">
          {ACCOUNT_LINKS.map((l) => (
            <a key={l.label} className="navx-acct__link" href={l.href} role="menuitem">
              <i data-lucide={l.icon}></i>
              <span>{l.label}</span>
            </a>
          ))}
        </div>
        <button className="navx-acct__link navx-acct__logout" onClick={onLogout} role="menuitem">
          <i data-lucide="log-out"></i>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
}
