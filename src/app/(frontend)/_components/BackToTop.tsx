'use client'

export function BackToTop() {
  return (
    <button
      className="ft__totop"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      Top <i data-lucide="arrow-up"></i>
    </button>
  )
}
