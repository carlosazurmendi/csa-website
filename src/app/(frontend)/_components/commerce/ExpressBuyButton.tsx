'use client'

import { openExpressBuy, type CartItem } from './store-client'
import { CIcon } from './Icon'

/**
 * Single "Buy Now" button that opens the Express slide-over (M7). Used where only
 * the one-click action is needed (e.g. the template detail final CTA band), so a
 * server component can drop in a working buy button without its own client logic.
 */
export function ExpressBuyButton({
  item,
  className = 'btn btn--gold-solid btn--lg',
  label = 'Buy Now',
}: {
  item: CartItem
  className?: string
  label?: string
}) {
  return (
    <button className={className} type="button" onClick={() => openExpressBuy(item)}>
      <CIcon name="zap" /> {label}
    </button>
  )
}
