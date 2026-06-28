import type { Metadata } from 'next'

import { CartView } from './CartView'

/**
 * /cart (M7) — the full cart page. Replaces the design's Cart.html stub (the
 * export only ever shipped a placeholder here; the real cart lives in the
 * localStorage store). Client-rendered from window.CSAStore; noindex.
 */
export const metadata: Metadata = {
  title: 'Your Cart | CSA',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default function CartPage() {
  return <CartView />
}
