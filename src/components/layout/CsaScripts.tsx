'use client'

import Script from 'next/script'

/**
 * Client-side runtime from the design system, loaded once globally:
 *  - lucide (icon rendering via <i data-lucide>)
 *  - interactions.js — scroll-reveal / scramble / tilt motion engine
 *    (self-booting, idempotent, observes DOM mutations to wire React output)
 *  - csa-shaders.js (ES module) — registers <csa-grain>/<csa-liquid-metal>/
 *    <csa-pulsing-border> custom elements + window.CSAShaders; degrades to a
 *    CSS fallback if WebGL/CDN is unavailable.
 *
 * lucide's createIcons() is (re)invoked on load and a few times after, since
 * components render <i data-lucide> markers that need converting to <svg>.
 */
export function CsaScripts() {
  return (
    <>
      <Script
        src="https://unpkg.com/lucide@1.18.0"
        strategy="afterInteractive"
        onLoad={() => {
          const tick = () => {
            try {
              ;(window as any).lucide?.createIcons()
            } catch {}
          }
          tick()
          setTimeout(tick, 200)
          setTimeout(tick, 800)
        }}
      />
      <Script src="/assets/interactions.js" strategy="afterInteractive" />
      <Script src="/assets/csa-shaders.js" type="module" strategy="afterInteractive" />
    </>
  )
}
