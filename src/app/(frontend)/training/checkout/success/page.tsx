import type { Metadata } from 'next'
import Link from 'next/link'

import { getStripe, stripeConfigured } from '@/lib/stripe'
import { getCurrentCustomer } from '@/lib/customer'
import { ClearCart } from './ClearCart'

/**
 * Checkout success / thank-you (M7). Stripe redirects here after Hosted Checkout
 * with ?session_id. Access is actually granted by the verified webhook (not this
 * page); here we just confirm payment for the buyer and clear the local cart.
 */
export const metadata: Metadata = {
  title: 'Purchase complete | CSA',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const CSS = `
  .ck-done{max-width:620px;margin:0 auto;padding:160px 24px 130px;text-align:center}
  .ck-done__ic{width:72px;height:72px;margin:0 auto 22px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--fg-on-gold);background-image:var(--gold-foil);background-size:200% 100%;box-shadow:var(--glow-gold)}
  .ck-done__ic svg{width:34px;height:34px}
  .ck-done__crumb{font-family:var(--font-mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-400);margin:0 0 14px}
  .ck-done__title{margin:0 0 16px;font-size:clamp(34px,5vw,54px);line-height:1.04}
  .ck-done__sub{font-size:17px;line-height:1.6;color:var(--fg-2);margin:0 0 32px}
  .ck-done__actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
`

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  // Only reveal buyer details to the buyer themselves: the session_id rides in the
  // URL (logs, Referer) so it is not a bearer secret. Require a signed-in user and
  // verify the session's metadata.userId matches them before echoing any email /
  // payment status. A non-owner (or logged-out viewer) gets a generic thank-you.
  const customer = await getCurrentCustomer()
  let paid = false
  let email: string | null = null
  let owned = false
  if (session_id && stripeConfigured() && customer) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id)
      if (session.metadata?.userId && session.metadata.userId === customer.userId) {
        owned = true
        paid = session.payment_status === 'paid'
        email = session.customer_details?.email ?? customer.email ?? null
      }
    } catch {
      // Soft fail — still show the generic thank-you.
    }
  }

  return (
    <main className="ck-done" data-screen-label="Checkout complete">
      <style>{CSS}</style>
      <ClearCart />
      <span className="ck-done__ic" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <p className="ck-done__crumb">Order confirmed</p>
      <h1 className="csa-display ck-done__title">Purchase complete.</h1>
      <p className="ck-done__sub">
        {paid
          ? 'Thank you — your payment was received.'
          : 'Thank you — your order is being finalized.'}{' '}
        {email ? `A receipt is on its way to ${email}. ` : ''}
        Your courses and template downloads are now available in your Customer Portal.
      </p>
      <div className="ck-done__actions">
        <Link className="btn btn--gold-solid btn--lg" href="/portal">
          View in Customer Portal
        </Link>
        <Link className="btn btn--silver-pill btn--lg" href="/dashboard" data-metal="silver">
          Go to My Courses
        </Link>
        <Link className="btn btn--link" href="/training/purchase-templates">
          Continue browsing
        </Link>
      </div>
    </main>
  )
}
