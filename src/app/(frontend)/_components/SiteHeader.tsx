'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { toAuthUser, type AuthUser } from '@/lib/auth-user'
import { BrandLogo } from './BrandLogo'
import { CheckoutButton } from './commerce/CheckoutButton'
import { subscribeStore } from './commerce/store-client'

/**
 * SiteHeader — faithful port of design-reference/project/assets/nav.jsx.
 * Structure (menu + utility links + CTA) comes from the Payload `header` global,
 * falling back to the design's route tree when the global is empty. Auth + cart
 * state come from window.CSAStore (public/csa/vendor/store.js); when that stub is
 * absent the header degrades to the logged-out, empty-cart state — exactly as the
 * export does. Pre-auth (Milestone 3) the logged-out cluster is what renders.
 */

export type NavChild = { label: string; href: string; isCta?: boolean }
export type NavItem = { label: string; href: string; children?: NavChild[] }
export type HeaderData = {
  navItems?: NavItem[]
  utility?: {
    login?: { label?: string; href?: string }
    cart?: { label?: string; href?: string }
  }
  cta?: { label?: string; href?: string; style?: 'silver' | 'gold' }
} | null

type CartItem = {
  id: string
  name: string
  meta?: string
  kind?: string
  fmt?: string
  price: number
  qty?: number
}

const DEFAULT_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Consulting',
    href: '/consulting',
    children: [
      { label: 'Overview', href: '/consulting' },
      { label: 'Rail', href: '/consulting/rail' },
      { label: 'Robotics', href: '/consulting/robotics' },
      { label: 'Machinery', href: '/consulting/machinery' },
      { label: 'Physical AI', href: '/consulting/physical-ai' },
      { label: 'Construction & Mining Equipment', href: '/consulting/construction-mining-equipment' },
      { label: 'Automotive', href: '/consulting/automotive' },
      { label: 'Defense', href: '/consulting/defense' },
      { label: 'Process', href: '/consulting/process' },
    ],
  },
  {
    label: 'Training & Templates',
    href: '/training',
    children: [
      { label: 'Overview', href: '/training' },
      { label: 'Digital Courses', href: '/training/digital-courses' },
      { label: 'Course Catalog', href: '/training/course-catalog' },
      { label: 'Purchase Templates', href: '/training/purchase-templates' },
      { label: 'Browse All Templates', href: '/training/browse-all-templates' },
      { label: 'Request a Private Course', href: '/training/request-a-private-course', isCta: true },
    ],
  },
  {
    label: 'Company',
    href: '/company',
    children: [
      { label: 'Overview', href: '/company' },
      { label: 'Experience', href: '/company/experience' },
      { label: 'Services', href: '/company/services' },
      { label: 'Careers', href: '/company/careers' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Overview', href: '/resources' },
      { label: 'Standards Identifier', href: '/resources/standards-identifier' },
      { label: 'Safety Chat', href: '/resources/safety-chat' },
      { label: 'Downloadable Resources', href: '/resources/downloadable-resources' },
      { label: 'Articles', href: '/resources/articles' },
      { label: 'Events & Webinars', href: '/resources/events-webinars' },
      { label: 'Free Trainings', href: '/resources/free-trainings' },
    ],
  },
]

const ACCOUNT_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'layout-dashboard' },
  { label: 'Customer Portal', href: '/portal', icon: 'user-cog' },
]

// Inert store fallback so pages without store.js never crash (mirrors nav.jsx).
const inertStore = {
  getAuth: () => null as AuthUser,
  logout() {},
  getCart: () => [] as CartItem[],
  removeItem(_id: string) {},
  formatMoney: (c: number) => '$' + (c / 100).toFixed(2),
  subscribe: (_fn: () => void) => () => {},
}
const getStore = () => (typeof window !== 'undefined' && window.CSAStore) || inertStore

/* ---------- Mini-cart line-item thumbnail ---------- */
function CartThumb({ fmt }: { fmt?: string }) {
  const map: Record<string, { t: string; cls: string }> = {
    DOCX: { t: 'DOC', cls: 'mc-thumb--doc' },
    XLSX: { t: 'XLS', cls: 'mc-thumb--xls' },
    BUNDLE: { t: 'SET', cls: 'mc-thumb--bundle' },
    COURSE: { t: 'PLAY', cls: 'mc-thumb--course' },
  }
  const m = (fmt && map[fmt]) || { t: 'DOC', cls: 'mc-thumb--doc' }
  return (
    <div className={'mc-thumb ' + m.cls} aria-hidden="true">
      <i data-lucide={fmt === 'COURSE' ? 'play' : fmt === 'BUNDLE' ? 'layers' : 'file-text'}></i>
      <span className="mc-thumb__ext">{m.t}</span>
    </div>
  )
}

/* ---------- Mini-cart drawer ---------- */
function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
}: {
  open: boolean
  items: CartItem[]
  onClose: () => void
  onRemove: (id: string) => void
}) {
  const Store = getStore()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const subtotal = items.reduce((n, i) => n + i.price * (i.qty || 1), 0)
  const count = items.reduce((n, i) => n + (i.qty || 1), 0)

  return (
    <>
      <div className={'mc-scrim' + (open ? ' is-open' : '')} onClick={onClose}></div>
      <aside
        className={'mc' + (open ? ' is-open' : '')}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <header className="mc__head">
          <div className="mc__title">
            <i data-lucide="shopping-cart"></i>
            <span>Your cart</span>
            {count > 0 && <span className="mc__count">{count}</span>}
          </div>
          <button className="mc__x" onClick={onClose} aria-label="Close cart">
            <i data-lucide="x"></i>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="mc__empty">
            <div className="mc__empty-ic">
              <i data-lucide="shopping-bag"></i>
            </div>
            <h4 className="mc__empty-title">Your cart is empty</h4>
            <p className="mc__empty-sub">
              Add functional-safety templates, bundles, or a training course to get started.
            </p>
            <Link className="btn btn--gold-pill btn--block" href="/training/purchase-templates">
              Shop Templates <i data-lucide="arrow-right"></i>
            </Link>
            <Link className="btn btn--link mc__empty-link" href="/training/course-catalog">
              Browse courses <i data-lucide="arrow-right"></i>
            </Link>
          </div>
        ) : (
          <>
            <div className="mc__items">
              {items.map((it) => (
                <div className="mc-item" key={it.id}>
                  <CartThumb fmt={it.fmt} />
                  <div className="mc-item__body">
                    <span className="mc-item__kind">{it.kind}</span>
                    <p className="mc-item__name">{it.name}</p>
                    <p className="mc-item__meta">{it.meta}</p>
                  </div>
                  <div className="mc-item__right">
                    <span className="mc-item__price">{Store.formatMoney(it.price * (it.qty || 1))}</span>
                    <button
                      className="mc-item__rm"
                      onClick={() => onRemove(it.id)}
                      aria-label={'Remove ' + it.name}
                    >
                      <i data-lucide="trash-2"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <footer className="mc__foot">
              <div className="mc__row">
                <span>Subtotal</span>
                <span className="mc__subtotal">{Store.formatMoney(subtotal)}</span>
              </div>
              <p className="mc__note">
                Taxes calculated at checkout. Digital delivery — instant download after purchase.
              </p>
              <CheckoutButton className="btn btn--gold-solid btn--block mc__checkout" />
              <Link className="btn btn--silver-pill btn--block" href="/cart">
                View Cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}

/* ---------- Account menu (signed-in) ---------- */
function AccountMenu({
  user,
  consultation,
  onLogout,
}: {
  user: NonNullable<AuthUser>
  consultation: { label: string; href: string }
  onLogout: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])
  // Close on route change (e.g. clicking a menu link navigates).
  useEffect(() => setOpen(false), [pathname])
  return (
    <div className={'navx-acct' + (open ? ' is-open' : '')} ref={ref}>
      <button
        className="navx-acct__btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
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
        <Link className="btn btn--gold-pill btn--block navx-acct__cta" href={consultation.href}>
          {consultation.label} <i data-lucide="arrow-right"></i>
        </Link>
        <div className="navx-acct__links">
          {ACCOUNT_LINKS.map((l) => (
            <Link key={l.label} className="navx-acct__link" href={l.href} role="menuitem">
              <i data-lucide={l.icon}></i>
              <span>{l.label}</span>
            </Link>
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

export function SiteHeader({ data, initialUser = null }: { data: HeaderData; initialUser?: AuthUser }) {
  const pathname = usePathname() || '/'
  const router = useRouter()

  const NAV = data?.navItems && data.navItems.length > 0 ? data.navItems : DEFAULT_NAV
  const login = {
    label: data?.utility?.login?.label || 'Login',
    href: data?.utility?.login?.href || '/login',
  }
  const consultation = {
    label: data?.cta?.label || 'Book a Consultation',
    href: data?.cta?.href || '/book-a-consultation',
  }

  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openAcc, setOpenAcc] = useState<string | null>(null)
  const [auth, setAuth] = useState<AuthUser>(initialUser)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [suppressDrops, setSuppressDrops] = useState(false)

  // Cart comes from the localStorage store (window.CSAStore). subscribeStore is
  // resilient to the store script loading after this effect (afterInteractive),
  // so the badge + drawer stay live from first add — see store-client.ts.
  useEffect(() => {
    const sync = () => setCart(getStore().getCart() as CartItem[])
    sync()
    return subscribeStore(sync)
  }, [])

  // Auth comes from Supabase: hydrate from the current session, then stay live on
  // sign-in / sign-out so the account menu flips without a page reload.
  useEffect(() => {
    const sb = createClient()
    let active = true
    sb.auth.getUser().then(({ data }) => {
      if (active) setAuth(toAuthUser(data.user))
    })
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      setAuth(toAuthUser(session?.user ?? null))
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const onLogout = async () => {
    setMobileOpen(false)
    setCartOpen(false)
    try {
      await createClient().auth.signOut()
    } catch {
      // ignore — we still clear local state below
    }
    setAuth(null)
    router.refresh()
  }

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen || cartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, cartOpen])

  // Close every nav overlay on route change. The desktop megamenu is pure CSS
  // hover/focus, so after an in-dropdown link click the cursor is still parked
  // over the trigger and the panel would stay open on the new page — we blur the
  // focused link and suppress :hover until the pointer next moves, then resume
  // normal hover. Also dismiss the mobile drawer / cart / mobile accordion.
  useEffect(() => {
    setMobileOpen(false)
    setCartOpen(false)
    setOpenAcc(null)
    setSuppressDrops(true)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    const release = () => setSuppressDrops(false)
    window.addEventListener('mousemove', release, { once: true })
    return () => window.removeEventListener('mousemove', release)
  }, [pathname])

  // Top-level items highlight across their whole section (current page or any
  // descendant) — startsWith.
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')
  const branchActive = (item: NavItem) =>
    isActive(item.href) || (item.children || []).some((c) => isActive(c.href))
  // Dropdown child links highlight ONLY the exact current sub-page — otherwise the
  // section-overview child (e.g. /consulting) lights up alongside the real
  // sub-page (e.g. /consulting/rail) via startsWith.
  const isCurrent = (href: string) => pathname === href

  const cartCount = cart.reduce((n, i) => n + (i.qty || 1), 0)

  return (
    <>
      <nav className={'navx' + (solid ? ' is-solid' : '') + (suppressDrops ? ' navx--drops-suppressed' : '')}>
        <div className="navx__inner">
          <Link className="navx__logo" href="/" aria-label="CSA — home">
            <BrandLogo priority />
          </Link>

          <div className="navx__primary" style={{ textAlign: 'right', justifyContent: 'flex-end' }}>
            {NAV.map((item) => {
              if (!item.children || item.children.length === 0) {
                return (
                  <div className="navx-item" key={item.label}>
                    <Link
                      className={'navx-item__link' + (isActive(item.href) ? ' is-active' : '')}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </div>
                )
              }
              const wide = item.children.length > 5
              return (
                <div className="navx-item" key={item.label}>
                  <Link
                    className={'navx-item__link' + (branchActive(item) ? ' is-active' : '')}
                    href={item.href}
                  >
                    {item.label}
                    <i className="chev" data-lucide="chevron-down"></i>
                  </Link>
                  <div className={'navx-drop' + (wide ? ' navx-drop--wide' : '')}>
                    {item.children.map((c) =>
                      c.isCta ? (
                        <Link key={c.label} className="btn btn--gold-pill navx-drop__cta" href={c.href}>
                          {c.label} <i data-lucide="arrow-right"></i>
                        </Link>
                      ) : (
                        <Link
                          key={c.label}
                          className={'navx-drop__link' + (isCurrent(c.href) ? ' is-active' : '')}
                          href={c.href}
                        >
                          <span>{c.label}</span>
                          <span className="dot"></span>
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="navx__right">
            <button
              className="navx__cart"
              onClick={() => setCartOpen(true)}
              aria-label={'Cart, ' + cartCount + ' items'}
            >
              <i data-lucide="shopping-cart"></i>
              {cartCount > 0 && <span className="navx__cart-badge">{cartCount}</span>}
            </button>

            {auth ? (
              <AccountMenu user={auth} consultation={consultation} onLogout={onLogout} />
            ) : (
              <>
                <Link className="navx__login" href={login.href}>
                  <i data-lucide="user"></i> {login.label}
                </Link>
                <Link className="btn btn--silver-pill navx__cta" href={consultation.href} data-metal="silver">
                  {consultation.label} <i data-lucide="arrow-right"></i>
                </Link>
              </>
            )}

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
        {auth && (
          <div className="navx-mobile__id">
            <span className="navx-acct__avatar navx-acct__avatar--lg">{auth.initials}</span>
            <div className="navx-acct__idtext">
              <p className="navx-acct__fullname">{auth.fullName}</p>
              <p className="navx-acct__email">{auth.email}</p>
            </div>
          </div>
        )}
        {NAV.map((item) => {
          if (!item.children || item.children.length === 0) {
            return (
              <div className="navx-macc" key={item.label}>
                <Link
                  className={'navx-macc__head' + (isActive(item.href) ? ' is-active' : '')}
                  href={item.href}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
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
                  c.isCta ? (
                    <Link
                      key={c.label}
                      className="btn btn--gold-pill btn--block"
                      href={c.href}
                      style={{ marginTop: 8 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {c.label} <i data-lucide="arrow-right"></i>
                    </Link>
                  ) : (
                    <Link
                      key={c.label}
                      className={isCurrent(c.href) ? 'is-active' : ''}
                      href={c.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          )
        })}
        <div className="navx-mobile__actions">
          {auth ? (
            <>
              {ACCOUNT_LINKS.map((l) => (
                <Link key={l.label} className="btn btn--silver-pill btn--block" href={l.href}>
                  {l.label}
                </Link>
              ))}
              <button className="btn btn--link btn--block" onClick={onLogout}>
                Log Out <i data-lucide="log-out"></i>
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn--silver-pill btn--block" href={login.href}>
                {login.label}
              </Link>
              <Link className="btn btn--gold-pill btn--block" href={consultation.href}>
                {consultation.label} <i data-lucide="arrow-right"></i>
              </Link>
            </>
          )}
        </div>
      </div>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={(id) => getStore().removeItem(id)}
      />
    </>
  )
}
