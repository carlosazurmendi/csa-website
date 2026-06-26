'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { attachTilt } from '../../_components/tilt'

/**
 * Client-only behavior for the Resources Overview page (/resources), ported from
 * the inline <script> in design-reference/project/Resources/Overview.html.
 *
 * Two pieces:
 *   • ResourcesReveal — mounts the page-wide IntersectionObserver that toggles
 *     `.res-reveal` → `.is-in` (the page's bespoke scroll-reveal; matches the
 *     export's `useReveal`). Renders nothing.
 *   • ResourcesTools — the "Start with a tool." AI-tools band. It carries the
 *     export's inline 3D-tilt handlers (onMouseMove / onMouseLeave write the
 *     --rx/--ry/--mx/--my custom props), so it must be a client component.
 *
 * Both are co-located here so the server page can stay pure markup. The lucide
 * icon hydration + shaders are handled globally, so we drop the export's
 * window.lucide.createIcons / window.csaInit calls.
 */

/* ---------- Scroll reveal (page-wide, faithful to useReveal in the export) ---------- */
export function ResourcesReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('.res-reveal')
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

/* ---------- AI Tools band (with 3D tilt) ---------- */
export type ToolCard = {
  icon: string
  tag: string
  title: string
  desc: string
  href: string
}

// One AI-tool card. The 3D tilt is wired via attachTilt (document-level pointer
// tracking) so the card never flickers near its edges; `data-tilt-managed` tells
// interactions.js' wireTilt to leave this .csa-tilt element to React.
function ResToolCard({ tool }: { tool: ToolCard }) {
  const ref = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const MAX = 8
    return attachTilt(c, {
      onTilt: (px, py) => {
        c.style.setProperty('--rx', ((px - 0.5) * 2 * MAX).toFixed(2) + 'deg')
        c.style.setProperty('--ry', (-(py - 0.5) * 2 * MAX).toFixed(2) + 'deg')
        c.style.setProperty('--mx', (px * 100).toFixed(1) + '%')
        c.style.setProperty('--my', (py * 100).toFixed(1) + '%')
      },
      onReset: () => {
        c.style.setProperty('--rx', '0deg')
        c.style.setProperty('--ry', '0deg')
      },
    })
  }, [])
  return (
    <Link className="res-tool csa-glass csa-tilt" href={tool.href} ref={ref} data-tilt-managed="">
      <div className="res-tool__top">
        <span className="res-tool__icon">
          <i data-lucide={tool.icon}></i>
        </span>
        <span className="res-tool__tag">
          <span className="d"></span> {tool.tag}
        </span>
      </div>
      <h3 className="res-tool__title">{tool.title}</h3>
      <p className="res-tool__d">{tool.desc}</p>
      <span className="res-tool__foot">
        Open the tool <i data-lucide="arrow-right"></i>
      </span>
    </Link>
  )
}

export function ResourcesTools({
  eyebrow,
  heading,
  lead,
  tools,
}: {
  eyebrow: string
  heading: string
  lead: string
  tools: ToolCard[]
}) {
  return (
    <section className="res-sec res-band-top" id="tools">
      <div className="res-head res-reveal">
        <span className="csa-eyebrow">{eyebrow}</span>
        <h2 className="csa-h2 res-head__title">{heading}</h2>
        <p className="csa-lead res-head__lead">{lead}</p>
      </div>
      <div className="res-tools__grid res-reveal csa-tilt-scene">
        {tools.map((t) => (
          <ResToolCard key={t.title} tool={t} />
        ))}
      </div>
    </section>
  )
}
