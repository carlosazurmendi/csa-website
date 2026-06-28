'use client'

import { useEffect } from 'react'

import { clearCart } from '../../../_components/commerce/store-client'

/**
 * Clears the local cart once the buyer lands on the success page. Resilient to
 * the vendored store.js loading afterInteractive: if window.CSAStore isn't present
 * yet, poll briefly until it is, otherwise clearCart() would hit the inert no-op
 * and the just-purchased items would linger in the cart.
 */
export function ClearCart() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.CSAStore) {
      clearCart()
      return
    }
    const poll = setInterval(() => {
      if (window.CSAStore) {
        clearInterval(poll)
        clearCart()
      }
    }, 100)
    const stop = setTimeout(() => clearInterval(poll), 6000)
    return () => {
      clearInterval(poll)
      clearTimeout(stop)
    }
  }, [])
  return null
}
