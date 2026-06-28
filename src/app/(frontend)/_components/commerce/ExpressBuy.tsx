'use client'

import { useCallback, useEffect, useState } from 'react'

import { createCheckoutSession } from '../../training/checkout/actions'
import { EXPRESS_EVENT, addToCart, formatMoney, toCompact, type CartItem } from './store-client'
import { CIcon } from './Icon'

/**
 * Express (one-click) checkout slide-over (M7) — port of express-buy.jsx. The
 * chrome (scrim, right panel, header) and CSS are reproduced verbatim. The
 * design's simulated one-click payment is replaced with real Stripe Hosted
 * Checkout: "Confirm purchase" asks the server for a Checkout session and
 * redirects to Stripe (where the payment method + billing are collected), so the
 * mock saved-card / billing blocks are intentionally omitted — they can't be
 * backed by real data. Mounted once in the (frontend) layout; opened from any
 * Buy-Now button via the `csa:express-buy` window event.
 */

const XB_CSS = `
  .xb-scrim{position:fixed;inset:0;z-index:1200;background:rgba(6,9,13,0.62);
    opacity:0;pointer-events:none;transition:opacity .3s var(--ease-out);
    -webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}
  .xb-scrim.is-open{opacity:1;pointer-events:auto}
  .xb{position:fixed;top:0;right:0;bottom:0;z-index:1201;width:min(430px,94vw);
    display:flex;flex-direction:column;background:var(--bg-base-2);
    border-left:1px solid var(--border-strong);box-shadow:-30px 0 70px rgba(0,0,0,0.5);
    transform:translateX(102%);transition:transform .36s var(--ease-out);
    font-family:var(--font-body)}
  .xb.is-open{transform:translateX(0) !important}
  @media (prefers-reduced-motion: reduce){
    .xb{transition:none !important}
    .xb-scrim{transition:none !important}
  }
  .xb__head{display:flex;align-items:center;justify-content:space-between;
    padding:20px 22px;border-bottom:1px solid var(--border-2);flex:none}
  .xb__title{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-body);
    font-weight:600;font-size:16px;color:var(--fg-1)}
  .xb__title i{width:18px;height:18px;color:var(--gold-400)}
  .xb__x{width:34px;height:34px;border-radius:var(--r-sm);border:1px solid var(--border-2);
    background:var(--bg-base);color:var(--fg-3);display:flex;align-items:center;justify-content:center;
    transition:color var(--dur-fast),border-color var(--dur-fast)}
  .xb__x:hover{color:var(--fg-1);border-color:var(--border-strong)}
  .xb__x i{width:17px;height:17px}
  .xb__body{flex:1;overflow-y:auto;padding:22px;display:flex;flex-direction:column;gap:16px}

  .xb-line{display:flex;align-items:center;gap:13px;padding:14px;border-radius:var(--r-md);
    background:var(--bg-elevated);border:1px solid var(--border-1)}
  .xb-line--done{background:rgba(var(--gold-rgb),.05);border-color:var(--border-gold)}
  .xb-line__body{flex:1;min-width:0}
  .xb-line__kind{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-400)}
  .xb-line__name{margin:4px 0 0;font-weight:600;font-size:14px;line-height:1.32;color:var(--fg-1)}
  .xb-line__meta{margin:4px 0 0;font-size:11.5px;color:var(--fg-3)}
  .xb-line__price{font-family:var(--font-display);font-weight:600;font-size:19px;letter-spacing:-.01em;color:var(--fg-1);white-space:nowrap}

  .xb-thumb{position:relative;width:46px;height:54px;flex:none;border-radius:4px;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;
    border:1px solid var(--border-2);background:linear-gradient(160deg,#151b25,#0c1118);color:var(--gold-400)}
  .xb-thumb i{width:18px;height:18px}
  .xb-thumb__ext{font-family:var(--font-mono);font-size:7.5px;letter-spacing:.1em;color:var(--fg-3)}
  .xb-thumb--xls{color:var(--status-safe)}
  .xb-thumb--bundle{color:var(--gold-300)}

  .xb-sum{display:flex;flex-direction:column;gap:10px;padding:16px 0 4px;border-top:1px solid var(--border-2)}
  .xb-sum__row{display:flex;align-items:center;justify-content:space-between;font-size:13.5px;color:var(--fg-2)}
  .xb-sum__muted{font-size:11.5px;color:var(--fg-4)}
  .xb-sum__row--total{padding-top:11px;border-top:1px solid var(--border-2);color:var(--fg-1);font-weight:600;font-size:16px}
  .xb-sum__row--total span:last-child{font-family:var(--font-display);font-size:22px;letter-spacing:-.01em}

  .xb__actions{display:flex;flex-direction:column;gap:11px;margin-top:auto;padding-top:4px}
  .xb__primary{width:100%;justify-content:center}
  .xb__primary:disabled{opacity:.8}
  .xb__secondary{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;
    padding:13px 16px;border:1px solid var(--border-1);border-radius:var(--r-sm);
    color:var(--fg-1);font-weight:600;font-size:14px;background:var(--bg-base);
    transition:border-color var(--dur-fast),color var(--dur-fast),background var(--dur-fast)}
  .xb__secondary:hover{border-color:var(--border-gold);color:var(--gold-300)}
  .xb__secondary i{width:16px;height:16px}
  .xb-secure{margin:2px 0 0;display:inline-flex;align-items:center;justify-content:center;gap:7px;
    font-size:11.5px;color:var(--fg-3)}
  .xb-secure i{width:14px;height:14px;color:var(--status-safe)}

  .xb-gate{text-align:center;padding:10px 4px 4px}
  .xb-gate__ic{width:54px;height:54px;margin:0 auto 16px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;color:var(--gold-400);
    background:rgba(var(--gold-rgb),.08);border:1px solid var(--border-gold)}
  .xb-gate__ic i{width:24px;height:24px}
  .xb-gate__title{margin:0 0 10px;font-family:var(--font-display);font-weight:600;font-size:23px;letter-spacing:-.01em;color:var(--fg-1)}
  .xb-gate__sub{margin:0;font-size:14px;line-height:1.6;color:var(--fg-3)}

  .xb-tip{display:flex;align-items:flex-start;gap:8px;margin:2px 0 0;font-size:11.5px;line-height:1.5;color:var(--fg-3);
    padding:11px 12px;border-radius:var(--r-md);background:rgba(var(--gold-rgb),.05);border:1px solid var(--border-gold)}
  .xb-tip i{width:14px;height:14px;color:var(--gold-400);flex:none;margin-top:1px}
  .xb-tip--stub{background:var(--bg-base);border-color:var(--border-2)}
  .xb-tip--stub i{color:var(--status-warn)}

  .xb-spin{width:16px;height:16px;border-radius:50%;border:2px solid rgba(0,0,0,.25);
    border-top-color:var(--fg-on-gold);display:inline-block;animation:xb-spin .7s linear infinite}
  @keyframes xb-spin{to{transform:rotate(360deg)}}
`

function thumbFor(item: CartItem): { ic: string; mod: string } {
  const fmt = item.fmt
  if (fmt === 'BUNDLE') return { ic: 'layers', mod: 'bundle' }
  if (fmt === 'XLSX') return { ic: 'file-spreadsheet', mod: 'xls' }
  if (fmt === 'COURSE') return { ic: 'play', mod: 'doc' }
  return { ic: 'file-text', mod: 'doc' }
}

function kindLabel(item: CartItem): string {
  if (item.kind === 'BUNDLE') return 'Bundle'
  if (item.kind === 'COURSE') return 'Course'
  return 'Template'
}

function priceShort(cents: number): string {
  return '$' + Math.round(cents / 100).toLocaleString('en-US')
}

export function ExpressBuy({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState<CartItem | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const close = useCallback(() => setOpen(false), [])

  // Open trigger (csa:express-buy window event carries the cart line).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<CartItem>).detail
      if (!detail) return
      setItem(detail)
      setBusy(false)
      setError(null)
      setOpen(true)
    }
    window.addEventListener(EXPRESS_EVENT, onOpen as EventListener)
    return () => window.removeEventListener(EXPRESS_EVENT, onOpen as EventListener)
  }, [])

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    if (open) document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  const confirm = async () => {
    if (!item) return
    setError(null)
    setBusy(true)
    try {
      const res = await createCheckoutSession(toCompact([item]))
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

  const addInstead = () => {
    if (item) addToCart(item)
    window.location.href = '/cart'
  }

  const { ic, mod } = item ? thumbFor(item) : { ic: 'file-text', mod: 'doc' }
  const subtotal = item ? item.price : 0

  return (
    <>
      <style>{XB_CSS}</style>
      <div className={'xb-scrim' + (open ? ' is-open' : '')} onClick={close}></div>
      <aside
        className={'xb' + (open ? ' is-open' : '')}
        role="dialog"
        aria-label="Express checkout"
        aria-hidden={!open}
      >
        <header className="xb__head">
          <span className="xb__title">
            <CIcon name="zap" /> Express checkout
          </span>
          <button className="xb__x" onClick={close} aria-label="Close" type="button">
            <CIcon name="x" size={17} />
          </button>
        </header>

        {!item ? null : !signedIn ? (
          /* ---------- Logged-out gate ---------- */
          <div className="xb__body">
            <div className="xb-gate">
              <span className="xb-gate__ic">
                <CIcon name="lock" size={24} />
              </span>
              <h3 className="xb-gate__title">One-click checkout is for members.</h3>
              <p className="xb-gate__sub">
                Sign in to buy instantly with secure Stripe checkout — or add this to your cart and
                check out after signing in.
              </p>
            </div>
            <div className="xb-line">
              <div className={'xb-thumb xb-thumb--' + mod} aria-hidden="true">
                <CIcon name={ic} />
                <span className="xb-thumb__ext">{item.fmt}</span>
              </div>
              <div className="xb-line__body">
                <span className="xb-line__kind">{kindLabel(item)}</span>
                <p className="xb-line__name">{item.name}</p>
              </div>
              <span className="xb-line__price">{priceShort(item.price)}</span>
            </div>
            <div className="xb__actions">
              <a className="btn btn--gold-solid btn--lg xb__primary" href="/login?next=/cart">
                Sign in for one-click <CIcon name="arrow-right" />
              </a>
              <button className="xb__secondary" onClick={addInstead} type="button">
                <CIcon name="shopping-cart" size={16} /> Add to cart instead
              </button>
            </div>
          </div>
        ) : (
          /* ---------- Logged-in review → Stripe ---------- */
          <div className="xb__body">
            <div className="xb-line">
              <div className={'xb-thumb xb-thumb--' + mod} aria-hidden="true">
                <CIcon name={ic} />
                <span className="xb-thumb__ext">{item.fmt}</span>
              </div>
              <div className="xb-line__body">
                <span className="xb-line__kind">{kindLabel(item)}</span>
                <p className="xb-line__name">{item.name}</p>
                {item.meta && <p className="xb-line__meta">{item.meta}</p>}
              </div>
              <span className="xb-line__price">{priceShort(item.price)}</span>
            </div>

            <div className="xb-sum">
              <div className="xb-sum__row">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="xb-sum__row">
                <span>Tax</span>
                <span className="xb-sum__muted">Calculated at checkout</span>
              </div>
              <div className="xb-sum__row xb-sum__row--total">
                <span>Total</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
            </div>

            <div className="xb__actions">
              <button
                className="btn btn--gold-solid btn--lg xb__primary"
                onClick={confirm}
                disabled={busy}
                type="button"
              >
                {busy ? (
                  <>
                    <span className="xb-spin" aria-hidden="true"></span> Redirecting…
                  </>
                ) : (
                  <>
                    <CIcon name="lock" /> Confirm purchase · {priceShort(item.price)}
                  </>
                )}
              </button>
              {error && (
                <p className="xb-tip xb-tip--stub" role="alert">
                  <CIcon name="info" size={14} /> {error}
                </p>
              )}
              <p className="xb-secure">
                <CIcon name="shield-check" size={14} /> Secure checkout via Stripe · instant digital
                delivery.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
