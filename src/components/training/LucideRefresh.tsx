'use client'

import { useEffect } from 'react'

/**
 * Re-runs lucide's icon hydration after a server-rendered page mounts, so the
 * `<i data-lucide="…">` placeholders on otherwise-static pages (Overview,
 * single template) become SVGs. The interactive filter components handle their
 * own re-hydration on data changes; this covers the static routes.
 */
export function LucideRefresh() {
  useEffect(() => {
    ;(window as any).lucide?.createIcons()
  })
  return null
}
