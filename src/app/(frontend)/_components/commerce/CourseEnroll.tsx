'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { addToCart, store, subscribeStore, type CartItem } from './store-client'
import { CIcon } from './Icon'

/**
 * Course enroll controls (M7) — the purchasable (priced, not-yet-owned) branch
 * of the enroll card. "Enroll Now" adds the seat to the cart and goes to the
 * cart; "Add to Cart" adds without leaving (flips to "In cart"). Renders the two
 * controls inside `.cl-enroll__actions`, matching Course.html. A paid course →
 * an Enrollment created by the Stripe webhook, which unlocks the LMS player.
 */
export function CourseEnroll({ item, label = 'Enroll Now' }: { item: CartItem; label?: string }) {
  const [inCart, setInCart] = useState(false)
  useEffect(() => {
    const sync = () => setInCart(store().getCart().some((i) => i.id === item.id))
    sync()
    return subscribeStore(sync)
  }, [item.id])

  const enroll = () => {
    addToCart(item)
    window.location.href = '/cart'
  }

  return (
    <>
      <button className="btn btn--gold-solid btn--lg" onClick={enroll} type="button">
        {label} <CIcon name="arrow-right" />
      </button>
      {inCart ? (
        <Link className="cl-enroll__added" href="/cart">
          <CIcon name="check" /> In cart — view cart
        </Link>
      ) : (
        <button className="cl-enroll__secondary" onClick={() => addToCart(item)} type="button">
          <CIcon name="shopping-cart" /> Add to Cart
        </button>
      )}
    </>
  )
}
