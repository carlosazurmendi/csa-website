'use client'

/* ============================================================
   CSA — Consulting Overview scroll-reveal + icon boot.
   Mirrors the prototype's useReveal() (Consulting/Overview.html):
   an IntersectionObserver adds .is-in to every .co-reveal block,
   honouring prefers-reduced-motion. Mounted once on the overview
   page; renders nothing. Also (re)creates lucide icons for the
   server-rendered static markup.
   ============================================================ */
import { useEffect } from 'react'

export function OverviewReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ((window as any).lucide) (window as any).lucide.createIcons()
    if ((window as any).csaInit) (window as any).csaInit()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('.co-reveal')
    if (reduce) {
      els.forEach((e) => e.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return null
}
