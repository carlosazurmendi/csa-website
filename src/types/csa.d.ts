import type React from 'react'

/**
 * Ambient types for the ported CSA design system:
 *  - the WebGL shader custom elements registered by public/csa/vendor/csa-shaders.js
 *  - the window globals exposed by the vendored side-effect scripts
 *    (lucide UMD, store.js, interactions.js).
 */

type CsaCustomElementProps = React.HTMLAttributes<HTMLElement> & {
  // shader/custom elements accept arbitrary kebab-case attributes
  // (ring, thickness, contour, repetition, tint, color-back, data-no-lazy, …)
  [attr: string]: unknown
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'csa-liquid-metal': CsaCustomElementProps
      'csa-pulsing-border': CsaCustomElementProps
      'csa-grain': CsaCustomElementProps
    }
  }
}

type CsaCartItem = {
  id: string
  name: string
  meta?: string
  kind?: string
  fmt?: string
  price: number
  qty?: number
}

type CsaAuthUser = {
  id: string
  email: string
  fullName: string
  company?: string
  initials: string
  plan?: string
}

interface CsaStore {
  getAuth: () => CsaAuthUser | null
  login: (user?: CsaAuthUser) => void
  logout: () => void
  getCart: () => CsaCartItem[]
  setCart: (items: CsaCartItem[]) => void
  cartCount: () => number
  subtotal: () => number
  removeItem: (id: string) => void
  clearCart: () => void
  setCartPreset: (name: string) => void
  formatMoney: (cents: number) => string
  subscribe: (fn: () => void) => () => void
}

declare global {
  interface Window {
    lucide?: { createIcons: (opts?: Record<string, unknown>) => void }
    CSAStore?: CsaStore
    csaInit?: (root?: Element | Document) => void
    csaIntro?: (opts?: { label?: string }) => void
    // Runtime-injected public config (see (frontend)/layout.tsx) — avoids baking
    // NEXT_PUBLIC_* into the image at build time.
    __CSA_ENV__?: { supabaseUrl?: string; supabaseAnonKey?: string; stripePublishableKey?: string }
  }
}

export {}
