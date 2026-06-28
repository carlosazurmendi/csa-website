'use client'

import { useEffect, useState } from 'react'

import { createCheckoutSession } from '../../training/checkout/actions'
import { store, subscribeStore, toCompact } from './store-client'
import { CIcon } from './Icon'

/**
 * Checkout CTA (M7) — reads the shared cart, asks the server action for a Stripe
 * Hosted Checkout session, and redirects the browser to Stripe. Reused by the
 * nav mini-cart and the cart page (the caller passes the design's button
 * classes). Login-gated and env-gated failures surface inline.
 */
export function CheckoutButton({
  className = 'btn btn--gold-solid btn--lg',
  label = 'Checkout',
}: {
  className?: string
  label?: string
}) {
  const [count, setCount] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sync = () => setCount(store().cartCount())
    sync()
    return subscribeStore(sync)
  }, [])

  const checkout = async () => {
    setError(null)
    const cart = store().getCart()
    if (cart.length === 0) return
    setBusy(true)
    try {
      const res = await createCheckoutSession(toCompact(cart))
      if (res.url) {
        window.location.href = res.url
        return
      }
      if (res.code === 'sign-in-required') {
        window.location.href = '/login?next=/cart'
        return
      }
      setError(res.error ?? 'Checkout is unavailable right now. Please try again.')
    } catch {
      setError('Something went wrong starting checkout. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button className={className} onClick={checkout} type="button" disabled={busy || count === 0}>
        {busy ? 'Starting checkout…' : label} <CIcon name="arrow-right" />
      </button>
      {error && (
        <p className="mc__error" role="alert" style={{ marginTop: 8, color: 'var(--status-warn)', fontSize: 12.5 }}>
          {error}
        </p>
      )}
    </>
  )
}
