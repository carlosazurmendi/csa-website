'use client'

/* ============================================================
   CSA — Industry detail page scroll-reveal + icon boot.
   Mirrors industry-page.jsx useReveal(): tags every .ip-reveal
   block with [data-reveal="up"] so the global CSA motion engine
   (interactions.js) reveals it, then runs csaInit(). Also boots
   lucide icons for the server-rendered static markup. Renders
   nothing.
   ============================================================ */
import { useEffect } from 'react'

export function IndustryReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const blocks = document.querySelectorAll('.ip-reveal')
    blocks.forEach((el) => {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'up')
    })
    if ((window as any).lucide) (window as any).lucide.createIcons()
    if ((window as any).csaInit) (window as any).csaInit()
  }, [])

  return null
}
