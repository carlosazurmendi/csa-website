'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { store, subscribeStore, formatMoney, type CartItem } from '../_components/commerce/store-client'
import { CheckoutButton } from '../_components/commerce/CheckoutButton'
import { CIcon } from '../_components/commerce/Icon'

/**
 * Cart page view (M7). Reads the shared cart (window.CSAStore), lists the lines
 * using the design's mini-cart thumbnail (mc-thumb) for visual continuity, and
 * checks out via the Stripe Hosted Checkout server action. Layout is scoped here
 * with design tokens because the export only ships a Cart.html stub. Icons are
 * React-owned (CIcon) since the list re-renders on cart changes.
 */

const CART_CSS = `
  .cart-pg{max-width:1080px;margin:0 auto;padding:140px 24px 110px}
  .cart-pg__crumb{font-family:var(--font-mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-400);margin:0 0 14px}
  .cart-pg__title{margin:0 0 30px;font-size:clamp(34px,5vw,56px);line-height:1.02}
  .cart-grid{display:grid;grid-template-columns:1fr 360px;gap:34px;align-items:start}
  @media (max-width:880px){.cart-grid{grid-template-columns:1fr}}
  .cart-list{display:flex;flex-direction:column;gap:12px}
  .cart-row{display:flex;align-items:center;gap:14px;padding:16px;border-radius:var(--r-md);background:var(--bg-elevated);border:1px solid var(--border-1)}
  .cart-row__body{flex:1;min-width:0}
  .cart-row__kind{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-400)}
  .cart-row__name{margin:4px 0 0;font-weight:600;font-size:15px;line-height:1.3;color:var(--fg-1)}
  .cart-row__meta{margin:3px 0 0;font-size:12px;color:var(--fg-3)}
  .cart-row__right{display:flex;align-items:center;gap:14px;flex:none}
  .cart-row__price{font-family:var(--font-display);font-weight:600;font-size:18px;letter-spacing:-.01em;color:var(--fg-1);white-space:nowrap}
  .cart-row__rm{width:34px;height:34px;flex:none;border-radius:var(--r-sm);border:1px solid var(--border-2);background:var(--bg-base);color:var(--fg-3);display:flex;align-items:center;justify-content:center;transition:color var(--dur-fast),border-color var(--dur-fast)}
  .cart-row__rm:hover{color:var(--status-warn);border-color:var(--border-strong)}
  .cart-row__rm i{width:16px;height:16px}
  .cart-sum{position:sticky;top:110px;padding:22px;border-radius:var(--r-lg);background:var(--bg-base-2);border:1px solid var(--border-1)}
  .cart-sum__row{display:flex;justify-content:space-between;font-size:14px;color:var(--fg-2);margin-bottom:12px}
  .cart-sum__muted{color:var(--fg-4);font-size:12px}
  .cart-sum__total{display:flex;justify-content:space-between;align-items:baseline;padding-top:14px;border-top:1px solid var(--border-2);color:var(--fg-1);font-weight:600;margin-bottom:18px}
  .cart-sum__total b{font-family:var(--font-display);font-size:24px;letter-spacing:-.01em}
  .cart-sum__note{font-size:11.5px;line-height:1.5;color:var(--fg-3);margin:14px 0 0;display:flex;gap:7px;align-items:flex-start}
  .cart-sum__note i{width:14px;height:14px;color:var(--status-safe);flex:none;margin-top:1px}
  .cart-empty{text-align:center;padding:40px 4px;max-width:520px;margin:0 auto}
  .cart-empty__ic{width:64px;height:64px;margin:0 auto 18px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-400);background:rgba(var(--gold-rgb),.08);border:1px solid var(--border-gold)}
  .cart-empty__ic i{width:28px;height:28px}
  .cart-empty__title{font-family:var(--font-display);font-weight:600;font-size:26px;margin:0 0 10px;color:var(--fg-1)}
  .cart-empty__sub{font-size:15px;line-height:1.6;color:var(--fg-3);margin:0 0 24px}
  .cart-empty__actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
`

function Thumb({ fmt }: { fmt?: string }) {
  const map: Record<string, { t: string; cls: string; ic: string }> = {
    DOCX: { t: 'DOC', cls: 'mc-thumb--doc', ic: 'file-text' },
    XLSX: { t: 'XLS', cls: 'mc-thumb--xls', ic: 'file-spreadsheet' },
    BUNDLE: { t: 'SET', cls: 'mc-thumb--bundle', ic: 'layers' },
    COURSE: { t: 'PLAY', cls: 'mc-thumb--course', ic: 'play' },
  }
  const m = (fmt && map[fmt]) || map.DOCX
  return (
    <div className={'mc-thumb ' + m.cls} aria-hidden="true">
      <CIcon name={m.ic} />
      <span className="mc-thumb__ext">{m.t}</span>
    </div>
  )
}

export function CartView() {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const sync = () => {
      setItems(store().getCart())
      setReady(true)
    }
    sync()
    return subscribeStore(sync)
  }, [])

  const subtotal = items.reduce((n, i) => n + i.price * (i.qty || 1), 0)
  const remove = (id: string) => store().removeItem(id)

  return (
    <main className="cart-pg" data-screen-label="Cart">
      <style>{CART_CSS}</style>
      <p className="cart-pg__crumb">Your order</p>
      <h1 className="csa-display cart-pg__title">Cart</h1>

      {ready && items.length === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty__ic">
            <CIcon name="shopping-bag" size={28} />
          </span>
          <h2 className="cart-empty__title">Your cart is empty</h2>
          <p className="cart-empty__sub">
            Add functional-safety templates, bundles, or a training course to get started.
          </p>
          <div className="cart-empty__actions">
            <Link className="btn btn--gold-pill btn--lg" href="/training/purchase-templates">
              Shop Templates <CIcon name="arrow-right" />
            </Link>
            <Link className="btn btn--link" href="/training/course-catalog">
              Browse courses <CIcon name="arrow-right" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-list">
            {items.map((it) => (
              <div className="cart-row" key={it.id}>
                <Thumb fmt={it.fmt} />
                <div className="cart-row__body">
                  <span className="cart-row__kind">{it.kind}</span>
                  <p className="cart-row__name">{it.name}</p>
                  {it.meta && <p className="cart-row__meta">{it.meta}</p>}
                </div>
                <div className="cart-row__right">
                  <span className="cart-row__price">{formatMoney(it.price * (it.qty || 1))}</span>
                  <button
                    className="cart-row__rm"
                    onClick={() => remove(it.id)}
                    aria-label={'Remove ' + it.name}
                    type="button"
                  >
                    <CIcon name="trash-2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-sum csa-glass">
            <div className="cart-sum__row">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div className="cart-sum__row">
              <span>Tax</span>
              <span className="cart-sum__muted">Calculated at checkout</span>
            </div>
            <div className="cart-sum__total">
              <span>Total</span>
              <b>{formatMoney(subtotal)}</b>
            </div>
            <CheckoutButton className="btn btn--gold-solid btn--block" />
            <p className="cart-sum__note">
              <CIcon name="shield-check" size={14} /> Secure checkout via Stripe. Instant digital
              delivery — download immediately after purchase.
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}
