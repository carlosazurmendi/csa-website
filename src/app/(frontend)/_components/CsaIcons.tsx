'use client'

import { useEffect } from 'react'

/**
 * Drives Lucide. The vendored UMD (public/csa/vendor/lucide.min.js) exposes
 * window.lucide.createIcons(), which swaps every `<i data-lucide="name">` for an
 * inline SVG. We run it on mount (with a few retries while the UMD loads) and
 * re-run ONLY when genuinely new `[data-lucide]` placeholders are added to the DOM
 * — debounced. Re-running on every mutation (carousel ticks, transform/text
 * changes, lucide's own <svg> insertions) thrashed the main thread and made the
 * sliders laggy; the filter + debounce keeps it idle during interaction.
 */
export function CsaIcons() {
  useEffect(() => {
    const run = () => {
      try {
        window.lucide?.createIcons()
      } catch {
        /* UMD not ready yet */
      }
    }

    run()
    const retries = [60, 200, 500, 1200].map((t) => window.setTimeout(run, t))

    let timer = 0
    const schedule = () => {
      if (timer) return
      timer = window.setTimeout(() => {
        timer = 0
        run()
      }, 180)
    }

    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue // skip text nodes (counters, etc.)
          const el = node as Element
          // Only redraw when a NEW lucide placeholder appears. lucide's own <svg>
          // output has no [data-lucide], so its insertions never re-trigger us.
          if (el.matches?.('[data-lucide]') || el.querySelector?.('[data-lucide]')) {
            schedule()
            return
          }
        }
      }
    })
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      obs.disconnect()
      retries.forEach((id) => window.clearTimeout(id))
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  return null
}
