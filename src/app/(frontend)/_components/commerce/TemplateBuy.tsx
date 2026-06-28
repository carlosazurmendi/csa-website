'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { addToCart, openExpressBuy, store, subscribeStore, type CartItem } from './store-client'
import { CIcon } from './Icon'

/**
 * Template detail buy controls (M7) — replaces the design's `td-buy__actions`
 * stub. "Buy Now — one-click" opens the Express slide-over (Stripe Hosted
 * Checkout); "Add to Cart" adds to the shared cart and flips to "In cart — view
 * cart". Class names match Template.html so styling stays pixel-faithful.
 */
export function TemplateBuy({ item }: { item: CartItem }) {
  const [inCart, setInCart] = useState(false)
  useEffect(() => {
    const sync = () => setInCart(store().getCart().some((i) => i.id === item.id))
    sync()
    return subscribeStore(sync)
  }, [item.id])

  return (
    <div className="td-buy__actions">
      <button
        className="btn btn--gold-solid btn--lg"
        onClick={() => openExpressBuy(item)}
        type="button"
      >
        <CIcon name="zap" /> Buy Now — one-click
      </button>
      {inCart ? (
        <Link className="td-buy__in" href="/cart">
          <CIcon name="check" /> In cart — view cart
        </Link>
      ) : (
        <button className="td-buy__secondary" onClick={() => addToCart(item)} type="button">
          <CIcon name="shopping-cart" /> Add to Cart
        </button>
      )}
    </div>
  )
}
