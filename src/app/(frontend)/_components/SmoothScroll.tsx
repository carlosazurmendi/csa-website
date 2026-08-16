'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * SmoothScroll — inertia (lerp) wheel scrolling for the marketing shell, via
 * Lenis. Lenis animates the REAL window scroll position (no transform hijack),
 * so sticky columns, backdrop-filter glass, and the window-scroll listeners in
 * interactions.js / csa-shaders.js all keep working untouched. Touch input
 * stays native (Lenis default), so phones are unaffected.
 *
 * Mounted only in the (frontend) layout on purpose: the app-like route groups
 * (safety-chat, course player, assessment) keep native scroll.
 *
 * Skipped under prefers-reduced-motion unless the shell forces motion on via
 * html[data-csa-motion] — the same override convention the CSS uses.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const forced = document.documentElement.hasAttribute('data-csa-motion')
    if (reduced && !forced) return

    const lenis = new Lenis({ autoRaf: true, anchors: true })
    window.__lenis = lenis
    return () => {
      if (window.__lenis === lenis) delete window.__lenis
      lenis.destroy()
    }
  }, [])
  return null
}

/**
 * Route programmatic scrolls through Lenis when it's live: a concurrent native
 * behavior:'smooth' scroll would fight Lenis's frame loop (both write the
 * scroll position every frame → visible jitter). Falls back to the UA smooth
 * scroll when Lenis is absent (reduced motion, or a route without it).
 */
export function smoothScrollTo(top: number) {
  if (window.__lenis) window.__lenis.scrollTo(top)
  else window.scrollTo({ top, behavior: 'smooth' })
}
