'use client'

/**
 * Client bridge to the vendored cart store (public/csa/vendor/store.js →
 * `window.CSAStore`, localStorage key `csa_cart`). The store is the design's
 * tiny localStorage layer; M7 keeps it as the single client-side cart so the
 * global nav mini-cart, the cart page, and the buy controls all share one source
 * of truth. Server-side pricing/grants never trust these values — they are
 * re-resolved from the CMS at checkout (see src/lib/commerce.ts).
 *
 * Cart line item shape (mirrors store.js's documented shape):
 *   id    `tpl_<slug>` | `bnd_<slug>` | `crs_<slug>`  (kind-prefixed product slug)
 *   name  product name
 *   meta  short variant line ("IEC 61508 · Word")
 *   kind  TEMPLATE | BUNDLE | COURSE
 *   fmt   DOCX | XLSX | BUNDLE | COURSE  (thumb badge)
 *   price unit price in CENTS
 *   qty   quantity
 */

export type CartKind = 'TEMPLATE' | 'BUNDLE' | 'COURSE'

export type CartItem = {
  id: string
  name: string
  meta: string
  kind: CartKind
  fmt: string
  price: number
  qty: number
}

/** Compact wire shape sent to the server action — never carries price/name. */
export type CompactItem = { slug: string; kind: CartKind; qty: number }

type CSAStore = {
  getCart(): CartItem[]
  setCart(items: CartItem[]): void
  cartCount(): number
  subtotal(): number
  removeItem(id: string): void
  clearCart(): void
  formatMoney(cents: number): string
  subscribe(fn: () => void): () => void
}

declare global {
  interface Window {
    CSAStore?: CSAStore
  }
}

/** Inert no-op store for SSR / before the vendor script loads. */
const INERT: CSAStore = {
  getCart: () => [],
  setCart: () => {},
  cartCount: () => 0,
  subtotal: () => 0,
  removeItem: () => {},
  clearCart: () => {},
  formatMoney: (cents) => '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  subscribe: () => () => {},
}

export function store(): CSAStore {
  if (typeof window !== 'undefined' && window.CSAStore) return window.CSAStore
  return INERT
}

/**
 * Subscribe to cart changes, resilient to load timing. The vendored store.js is
 * injected `afterInteractive`, so on first paint it may not exist yet when a
 * component's effect runs — binding through `store().subscribe` would attach to
 * the inert no-op and never fire. Instead we listen on the window events the real
 * store dispatches (so we catch every change regardless of when store.js lands),
 * and poll briefly until the store appears, firing once so the initial cart shows.
 */
export function subscribeStore(fn: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('csa:store', fn)
  window.addEventListener('storage', fn)
  let poll: ReturnType<typeof setInterval> | undefined
  if (!window.CSAStore) {
    poll = setInterval(() => {
      if (window.CSAStore) {
        if (poll) clearInterval(poll)
        poll = undefined
        fn()
      }
    }, 100)
    // Stop polling after a few seconds regardless (store.js missing entirely).
    setTimeout(() => {
      if (poll) clearInterval(poll)
    }, 6000)
  }
  return () => {
    window.removeEventListener('csa:store', fn)
    window.removeEventListener('storage', fn)
    if (poll) clearInterval(poll)
  }
}

export function formatMoney(cents: number): string {
  return store().formatMoney(cents)
}

/** Add a line to the cart, de-duplicating by id (matches express-buy.jsx). */
export function addToCart(item: CartItem): void {
  const s = store()
  const cart = s.getCart()
  if (!cart.some((i) => i.id === item.id)) s.setCart(cart.concat([item]))
}

export function clearCart(): void {
  store().clearCart()
}

const KIND_PREFIX: Record<CartKind, string> = {
  TEMPLATE: 'tpl_',
  BUNDLE: 'bnd_',
  COURSE: 'crs_',
}

/** Strip the kind prefix from a cart id → the bare product/course slug. */
export function idToSlug(id: string, kind: CartKind): string {
  const prefix = KIND_PREFIX[kind]
  return id.startsWith(prefix) ? id.slice(prefix.length) : id
}

/** Cart → the compact list the checkout server action re-resolves against the CMS. */
export function toCompact(items: CartItem[]): CompactItem[] {
  return items.map((i) => ({ slug: idToSlug(i.id, i.kind), kind: i.kind, qty: i.qty || 1 }))
}

/** Window event that opens the Express (one-click) slide-over, mirroring the
 *  design's `csa:express-buy` trigger so any button can open it without props. */
export const EXPRESS_EVENT = 'csa:express-buy'

export function openExpressBuy(item: CartItem): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<CartItem>(EXPRESS_EVENT, { detail: item }))
}
