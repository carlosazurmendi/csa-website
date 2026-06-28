'use client'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { saveProfile } from './actions'
import { removeCard, type DisplayCard } from './stripe-actions'
import { BillingCardForm } from './BillingCardForm'

/**
 * Customer Portal shell (/portal) — pixel-faithful port of
 * design-reference/project/Customer Portal/Overview.html (assets/portal.jsx):
 * a sidebar + panel across Account / Billing / Template Library / Order History.
 * M5 wires the Account section for real (profile → CustomerProfiles via a server
 * action; email/password → Supabase); Billing / Templates / Orders render their
 * empty states until commerce lands (M7). The reviewer demo dock is omitted.
 */

export type PortalProfile = {
  fullName: string
  jobTitle: string
  company: string
  phone: string
  country: string
  email: string
  emailVerified: boolean
  initials: string
  plan: string
  memberSince: string
}

export type PortalOrder = {
  id: string | number
  orderNumber: string
  date: string
  itemsSummary: string
  itemCount: number
  total: string
  status: string
  receiptUrl: string | null
}

export type PortalTemplate = {
  id: string | number
  code: string
  title: string
  fileType: string
  version: string
  standards: string[]
  downloadHref: string
  downloadable: boolean
}

/** Map an order status to its portal status-chip modifier (classes in portal.css). */
function statusClass(status: string): string {
  switch (status) {
    case 'paid':
      return 'cp-status--safe'
    case 'pending':
      return 'cp-status--warn'
    case 'failed':
      return 'cp-status--critical'
    default:
      return 'cp-status--muted'
  }
}

/** Presentation-cased label for an order status (mirrors the design's statusMeta). */
function statusLabel(status: string): string {
  switch (status) {
    case 'paid':
      return 'Paid'
    case 'pending':
      return 'Pending'
    case 'failed':
      return 'Failed'
    case 'refunded':
      return 'Refunded'
    default:
      return status ? status.charAt(0).toUpperCase() + status.slice(1) : '—'
  }
}

const SECTIONS = [
  { id: 'account', label: 'Account Settings', icon: 'user-cog' },
  { id: 'billing', label: 'Billing', icon: 'credit-card' },
  { id: 'templates', label: 'Template Library', icon: 'folder-down' },
  { id: 'orders', label: 'Order History', icon: 'receipt' },
] as const
type SectionId = (typeof SECTIONS)[number]['id']

const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan']

/** Password field with a show/hide eye toggle — mirrors the design's CpField. */
function PwField({
  label,
  name,
  placeholder,
  autoComplete,
  full,
}: {
  label: string
  name: string
  placeholder?: string
  autoComplete?: string
  full?: boolean
}) {
  const [show, setShow] = useState(false)
  return (
    <label className={'cp-field' + (full ? ' cp-field--full' : '')}>
      <span>{label}</span>
      <div className="cp-field__box">
        <i className="cp-field__ic" data-lucide="key"></i>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="cp-field__eye"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <i data-lucide={show ? 'eye-off' : 'eye'}></i>
        </button>
      </div>
    </label>
  )
}

function CpEmpty({
  icon,
  title,
  sub,
  actions,
}: {
  icon: string
  title: string
  sub: string
  actions?: React.ReactNode
}) {
  return (
    <div className="cp-empty" data-reveal="up">
      <div className="cp-empty__grid"></div>
      <div className="cp-empty__inner">
        <span className="cp-empty__mark">
          <i data-lucide={icon}></i>
        </span>
        <h3 className="cp-empty__title">{title}</h3>
        <p className="cp-empty__sub">{sub}</p>
        {actions && <div className="cp-empty__actions">{actions}</div>}
      </div>
    </div>
  )
}

export function PortalClient({
  profile,
  billing,
  orders = [],
  templates = [],
}: {
  profile: PortalProfile
  billing: { configured: boolean; card: DisplayCard }
  orders?: PortalOrder[]
  templates?: PortalTemplate[]
}) {
  const router = useRouter()
  const [active, setActive] = useState<SectionId>('account')
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [savingProfile, setSavingProfile] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)
  const [removingCard, setRemovingCard] = useState(false)

  async function onRemoveCard() {
    setRemovingCard(true)
    const res = await removeCard()
    setRemovingCard(false)
    showToast(res.ok ? 'Card removed' : res.error || 'Could not remove card')
    if (res.ok) router.refresh()
  }

  // Deep links from the dashboard (#billing, #orders, …).
  useEffect(() => {
    const fromHash = () => {
      const id = (window.location.hash || '').replace('#', '')
      if (SECTIONS.some((s) => s.id === id)) setActive(id as SectionId)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2800)
  }

  const go = (id: SectionId) => {
    setActive(id)
    try {
      history.replaceState(null, '', '#' + id)
    } catch {
      window.location.hash = id
    }
  }

  async function onSaveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setSavingProfile(true)
    const res = await saveProfile({
      fullName: String(fd.get('full_name') ?? ''),
      jobTitle: String(fd.get('job_title') ?? ''),
      company: String(fd.get('company') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      country: String(fd.get('country') ?? ''),
    })
    setSavingProfile(false)
    showToast(res.ok ? 'Profile saved' : res.error || 'Could not save')
    if (res.ok) router.refresh()
  }

  async function onUpdateEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '')
    if (!email) return
    const { error } = await createClient().auth.updateUser({ email })
    showToast(error ? error.message : 'Verification link sent to your new email')
  }

  async function onUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const next = String(fd.get('new_password') ?? '')
    if (next !== String(fd.get('confirm_password') ?? '')) {
      showToast('New passwords do not match')
      return
    }
    const { error } = await createClient().auth.updateUser({ password: next })
    showToast(error ? error.message : 'Password updated')
    if (!error) e.currentTarget.reset()
  }

  async function onSignOut() {
    try {
      await createClient().auth.signOut()
    } catch {
      // ignore
    }
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <main className="cp-main" data-screen-label="Customer Portal">
        {/* Header band */}
        <section className="cp-hero">
          <div className="cp-hero__haze"></div>
          <div className="cp-hero__grid-bg"></div>
          <div className="cp-hero__inner">
            <div>
              <p className="cp-hero__crumb">
                <span className="dot"></span> CSA <span style={{ color: 'var(--gold-600)' }}>/</span>{' '}
                <Link href="/dashboard">Account</Link>{' '}
                <span style={{ color: 'var(--gold-600)' }}>/</span> Customer Portal
              </p>
              <p className="csa-eyebrow cp-hero__eyebrow">Your account</p>
              <h1 className="csa-display cp-hero__title">Customer Portal.</h1>
              <p className="cp-hero__sub">
                Manage your account and billing, download the templates you own, and review your order history —
                all in one place.
              </p>
            </div>
            <div className="cp-id">
              <span className="cp-id__avatar">{profile.initials}</span>
              <div className="cp-id__body">
                <p className="cp-id__name">{profile.fullName}</p>
                <p className="cp-id__company">{profile.company}</p>
                <div className="cp-id__meta">
                  <span className="cp-id__plan">
                    <i data-lucide="shield-check"></i> {profile.plan}
                  </span>
                  {profile.memberSince && <span className="cp-id__since">Member since {profile.memberSince}</span>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar + panel */}
        <div className="cp-layout">
          <nav className="cp-side" aria-label="Customer portal sections">
            <p className="cp-side__label">Portal</p>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={'cp-nav' + (active === s.id ? ' is-active' : '')}
                onClick={() => go(s.id)}
                aria-current={active === s.id ? 'page' : undefined}
              >
                <i data-lucide={s.icon}></i>
                <span>{s.label}</span>
              </button>
            ))}
            <div className="cp-side__sep"></div>
            <Link className="cp-nav" href="/dashboard">
              <i data-lucide="layout-dashboard"></i>
              <span>Student Dashboard</span>
            </Link>
            <button className="cp-nav cp-nav--logout" onClick={onSignOut}>
              <i data-lucide="log-out"></i>
              <span>Sign out</span>
            </button>
          </nav>

          <div className="cp-panel" key={active}>
            {active === 'account' && (
              <>
                <div className="cp-sec__head" data-reveal="up">
                  <p className="csa-eyebrow cp-sec__eyebrow">Account</p>
                  <h2 className="csa-h2 cp-sec__title">Account settings.</h2>
                  <p className="cp-sec__sub">
                    Manage your profile, sign-in email, and password. These details are stored against your
                    Supabase account and sync everywhere you use CSA.
                  </p>
                </div>

                <form onSubmit={onSaveProfile}>
                  <section className="cp-card" data-reveal="up">
                    <header className="cp-card__head">
                      <div className="cp-card__htitle">
                        <span className="cp-card__hic">
                          <i data-lucide="id-card"></i>
                        </span>
                        <div>
                          <h3 className="cp-card__h">Profile information</h3>
                          <p className="cp-card__hsub">Shown on certificates, receipts, and support requests.</p>
                        </div>
                      </div>
                    </header>
                    <div className="cp-card__body">
                      <div className="cp-form-grid">
                        <label className="cp-field">
                          <span>Full name</span>
                          <div className="cp-field__box">
                            <i className="cp-field__ic" data-lucide="user"></i>
                            <input name="full_name" defaultValue={profile.fullName} autoComplete="name" />
                          </div>
                        </label>
                        <label className="cp-field">
                          <span>Job title</span>
                          <div className="cp-field__box">
                            <i className="cp-field__ic" data-lucide="briefcase"></i>
                            <input name="job_title" defaultValue={profile.jobTitle} />
                          </div>
                        </label>
                        <label className="cp-field">
                          <span>Company</span>
                          <div className="cp-field__box">
                            <i className="cp-field__ic" data-lucide="building-2"></i>
                            <input name="company" defaultValue={profile.company} autoComplete="organization" />
                          </div>
                        </label>
                        <label className="cp-field">
                          <span>Phone</span>
                          <div className="cp-field__box">
                            <i className="cp-field__ic" data-lucide="phone"></i>
                            <input name="phone" type="tel" defaultValue={profile.phone} />
                          </div>
                        </label>
                        <label className="cp-field">
                          <span>Country</span>
                          <select name="country" defaultValue={profile.country || COUNTRIES[0]}>
                            {COUNTRIES.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                    <footer className="cp-card__foot">
                      <p className="cp-card__note">
                        <i data-lucide="info"></i> Your details sync everywhere you use CSA.
                      </p>
                      <button type="submit" className="btn btn--gold-solid" disabled={savingProfile}>
                        {savingProfile ? 'Saving…' : 'Save changes'} <i data-lucide="check"></i>
                      </button>
                    </footer>
                  </section>
                </form>

                <form onSubmit={onUpdateEmail}>
                  <section className="cp-card" data-reveal="up">
                    <header className="cp-card__head">
                      <div className="cp-card__htitle">
                        <span className="cp-card__hic">
                          <i data-lucide="mail"></i>
                        </span>
                        <div>
                          <h3 className="cp-card__h">Email address</h3>
                          <p className="cp-card__hsub">Used to sign in and to receive receipts and course updates.</p>
                        </div>
                      </div>
                    </header>
                    <div className="cp-card__body">
                      <div className="cp-email-row" style={{ marginBottom: 18 }}>
                        <span className="cp-email-row__addr">{profile.email}</span>
                        {profile.emailVerified ? (
                          <span className="cp-verified">
                            <i data-lucide="badge-check"></i> Verified
                          </span>
                        ) : (
                          <span className="cp-verified cp-verified--warn">
                            <i data-lucide="alert-triangle"></i> Unverified
                          </span>
                        )}
                      </div>
                      <div className="cp-form-grid">
                        <label className="cp-field cp-field--full">
                          <span>New email address</span>
                          <div className="cp-field__box">
                            <i className="cp-field__ic" data-lucide="at-sign"></i>
                            <input name="email" type="email" placeholder="you@company.com" autoComplete="email" />
                          </div>
                        </label>
                      </div>
                    </div>
                    <footer className="cp-card__foot">
                      <p className="cp-card__note">
                        <i data-lucide="info"></i> Changing your email triggers a re-verification link.
                      </p>
                      <button type="submit" className="btn btn--gold-solid">
                        Update email <i data-lucide="check"></i>
                      </button>
                    </footer>
                  </section>
                </form>

                <form onSubmit={onUpdatePassword}>
                  <section className="cp-card" data-reveal="up">
                    <header className="cp-card__head">
                      <div className="cp-card__htitle">
                        <span className="cp-card__hic">
                          <i data-lucide="lock"></i>
                        </span>
                        <div>
                          <h3 className="cp-card__h">Password</h3>
                          <p className="cp-card__hsub">Choose a strong password — 8+ characters, mixed case, and a number.</p>
                        </div>
                      </div>
                    </header>
                    <div className="cp-card__body">
                      <div className="cp-form-grid">
                        <PwField
                          label="Current password"
                          name="current_password"
                          placeholder="••••••••"
                          autoComplete="current-password"
                          full
                        />
                        <PwField label="New password" name="new_password" placeholder="Create a new password" autoComplete="new-password" />
                        <PwField label="Confirm new password" name="confirm_password" placeholder="Re-enter new password" autoComplete="new-password" />
                      </div>
                    </div>
                    <footer className="cp-card__foot">
                      <p className="cp-card__note">
                        <i data-lucide="info"></i> Use 8+ characters with a mix of letters and numbers.
                      </p>
                      <button type="submit" className="btn btn--gold-solid">
                        Update password <i data-lucide="check"></i>
                      </button>
                    </footer>
                  </section>
                </form>
              </>
            )}

            {active === 'billing' && (
              <>
                <div className="cp-sec__head" data-reveal="up">
                  <p className="csa-eyebrow cp-sec__eyebrow">Billing</p>
                  <h2 className="csa-h2 cp-sec__title">Billing &amp; payments.</h2>
                  <p className="cp-sec__sub">
                    Your saved payment method and every invoice and receipt. Card data is held by Stripe — CSA
                    never stores raw card numbers.
                  </p>
                </div>

                <section className="cp-card" data-reveal="up">
                  <header className="cp-card__head">
                    <div className="cp-card__htitle">
                      <span className="cp-card__hic">
                        <i data-lucide="credit-card"></i>
                      </span>
                      <div>
                        <h3 className="cp-card__h">Payment method</h3>
                        <p className="cp-card__hsub">Used for template and course purchases.</p>
                      </div>
                    </div>
                  </header>
                  <div className="cp-card__body">
                    {!billing.configured ? (
                      <CpEmpty
                        icon="credit-card"
                        title="Payments connect at launch"
                        sub="Secure card management turns on once Stripe is configured for this environment. Your card details will be entered on Stripe and never touch CSA servers."
                      />
                    ) : showCardForm ? (
                      <BillingCardForm
                        onDone={() => {
                          setShowCardForm(false)
                          showToast('Card saved')
                          router.refresh()
                        }}
                        onCancel={() => setShowCardForm(false)}
                      />
                    ) : billing.card ? (
                      <div className="cp-pm">
                        <span className="cp-pm__brand">{billing.card.brand}</span>
                        <div className="cp-pm__body">
                          <div className="cp-pm__num">
                            <span className="dots">•••• •••• ••••</span> {billing.card.last4}
                            <span className="cp-pm__default" style={{ marginLeft: 8 }}>
                              Default
                            </span>
                          </div>
                          <p className="cp-pm__meta">
                            Expires {String(billing.card.expMonth).padStart(2, '0')}/{billing.card.expYear}
                          </p>
                        </div>
                        <div className="cp-pm__actions">
                          <button className="cp-btn-sm" onClick={() => setShowCardForm(true)}>
                            <i data-lucide="pencil"></i> Update
                          </button>
                          <button
                            className="cp-btn-sm cp-btn-sm--danger"
                            onClick={onRemoveCard}
                            disabled={removingCard}
                          >
                            <i data-lucide="trash-2"></i> {removingCard ? 'Removing…' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <CpEmpty
                        icon="credit-card"
                        title="No payment method on file"
                        sub="Add a card to check out faster. We use Stripe for secure, PCI-compliant payments — your card details never touch CSA servers."
                        actions={
                          <button className="btn btn--gold-solid" onClick={() => setShowCardForm(true)} data-metal="none">
                            Add payment method <i data-lucide="plus"></i>
                          </button>
                        }
                      />
                    )}
                  </div>
                </section>

                <section className="cp-card" data-reveal="up">
                  <header className="cp-card__head">
                    <div className="cp-card__htitle">
                      <span className="cp-card__hic">
                        <i data-lucide="file-text"></i>
                      </span>
                      <div>
                        <h3 className="cp-card__h">Invoices &amp; receipts</h3>
                        <p className="cp-card__hsub">Every paid invoice and receipt, as downloadable PDFs.</p>
                      </div>
                    </div>
                  </header>
                  <div className="cp-card__body">
                    <CpEmpty
                      icon="file-text"
                      title="No invoices yet"
                      sub="When you purchase a template, bundle, or course, the paid invoice and receipt will appear here as downloadable PDFs."
                      actions={
                        <Link className="btn btn--silver-pill" href="/training/purchase-templates" data-metal="silver">
                          Shop templates <i data-lucide="arrow-right"></i>
                        </Link>
                      }
                    />
                  </div>
                </section>
              </>
            )}

            {active === 'templates' && (
              <>
                <div className="cp-sec__head" data-reveal="up">
                  <p className="csa-eyebrow cp-sec__eyebrow">Library</p>
                  <h2 className="csa-h2 cp-sec__title">Purchased templates.</h2>
                  <p className="cp-sec__sub">
                    Every documentation template you own, ready to download anytime. Files are served from secure
                    storage and you always get the latest revision you&rsquo;re entitled to.
                  </p>
                </div>
                {templates.length === 0 ? (
                  <CpEmpty
                    icon="folder-open"
                    title="Your library is empty"
                    sub="Templates and bundles you purchase appear here as downloadable Word and Excel files — with version and format details, re-downloadable whenever you need them."
                    actions={
                      <>
                        <Link className="btn btn--gold-solid" href="/training/purchase-templates" data-metal="none">
                          Browse templates <i data-lucide="arrow-right"></i>
                        </Link>
                        <Link className="btn btn--silver-pill" href="/training/browse-all-templates" data-metal="silver">
                          See all documents
                        </Link>
                      </>
                    }
                  />
                ) : (
                  <div className="cp-lib" data-reveal="up">
                    {templates.map((t) => (
                      <article className="cp-tpl" key={t.id}>
                        <div className="cp-tpl__media">
                          <div className="cp-tpl__grid"></div>
                          <span className="cp-tpl__fmt">{t.fileType}</span>
                          <span className="cp-tpl__mark">
                            <i data-lucide="file-text"></i>
                          </span>
                        </div>
                        <div className="cp-tpl__body">
                          {t.code && <p className="cp-tpl__code">{t.code}</p>}
                          <h3 className="cp-tpl__title">{t.title}</h3>
                          {t.standards.length > 0 && (
                            <div className="cp-tpl__stds">
                              {t.standards.map((s) => (
                                <span className="cp-tpl__std" key={s}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="cp-tpl__specs">
                            <span className="cp-tpl__spec">
                              <i data-lucide="git-branch"></i> {t.version}
                            </span>
                          </div>
                          <div className="cp-tpl__foot">
                            {t.downloadable ? (
                              <a
                                className="btn btn--gold-solid btn--dl cp-tpl__dl"
                                href={t.downloadHref}
                                data-metal="none"
                              >
                                Download <i data-lucide="download"></i>
                              </a>
                            ) : (
                              <span className="btn btn--silver-pill cp-tpl__dl" aria-disabled="true">
                                Preparing…
                              </span>
                            )}
                          </div>
                          <span className="cp-dl-meta">
                            <i data-lucide="shield-check"></i> Owner-only, secure download
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}

            {active === 'orders' && (
              <>
                <div className="cp-sec__head" data-reveal="up">
                  <p className="csa-eyebrow cp-sec__eyebrow">Orders</p>
                  <h2 className="csa-h2 cp-sec__title">Order history.</h2>
                  <p className="cp-sec__sub">
                    A record of every purchase on your account — templates, bundles, and courses — with totals,
                    status, and downloadable receipts.
                  </p>
                </div>
                <section className="cp-card" data-reveal="up">
                  <header className="cp-card__head">
                    <div className="cp-card__htitle">
                      <span className="cp-card__hic">
                        <i data-lucide="receipt"></i>
                      </span>
                      <div>
                        <h3 className="cp-card__h">Past orders</h3>
                        <p className="cp-card__hsub">Templates, bundles, and courses you&rsquo;ve purchased.</p>
                      </div>
                    </div>
                  </header>
                  <div className="cp-card__body">
                    {orders.length === 0 ? (
                      <CpEmpty
                        icon="receipt"
                        title="No orders yet"
                        sub="Once you make your first purchase, it’ll show up here with the date, order number, items, total, and a receipt you can download."
                        actions={
                          <Link className="btn btn--gold-solid" href="/training" data-metal="none">
                            Explore training &amp; templates <i data-lucide="arrow-right"></i>
                          </Link>
                        }
                      />
                    ) : (
                      <div className="cp-table-wrap">
                        <table className="cp-table">
                          <thead>
                            <tr>
                              <th>Order</th>
                              <th>Date</th>
                              <th>Items</th>
                              <th className="cp-num">Total</th>
                              <th>Status</th>
                              <th className="cp-num">Receipt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((o) => (
                              <tr key={o.id}>
                                <td className="cp-table__mono">{o.orderNumber}</td>
                                <td>{o.date}</td>
                                <td className="cp-table__strong">
                                  {o.itemsSummary}
                                  <span className="cp-table__sub">
                                    {o.itemCount} item{o.itemCount === 1 ? '' : 's'}
                                  </span>
                                </td>
                                <td className="cp-table__amount cp-num">{o.total}</td>
                                <td>
                                  <span className={'cp-status ' + statusClass(o.status)}>
                                    {statusLabel(o.status)}
                                  </span>
                                </td>
                                <td className="cp-num">
                                  {o.receiptUrl ? (
                                    <a className="cp-receipt" href={o.receiptUrl} target="_blank" rel="noreferrer">
                                      <i data-lucide="download"></i> Receipt
                                    </a>
                                  ) : (
                                    '—'
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </main>

      <div className={'cp-toast' + (toast ? ' is-on' : '')} role="status" aria-live="polite">
        <span className="cp-toast__ic">
          <i data-lucide="check"></i>
        </span>
        <span>{toast || ''}</span>
      </div>
    </>
  )
}
