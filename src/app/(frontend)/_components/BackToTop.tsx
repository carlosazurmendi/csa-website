'use client'

import { smoothScrollTo } from './SmoothScroll'

export function BackToTop() {
  return (
    <button
      className="ft__totop"
      onClick={() => smoothScrollTo(0)}
      aria-label="Back to top"
    >
      Top <i data-lucide="arrow-up"></i>
    </button>
  )
}
