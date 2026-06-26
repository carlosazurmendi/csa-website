'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { attachTilt } from '../../_components/tilt'
import type { HomeDoc, NewsArticle } from './types'

/**
 * NewsSection — faithful port of design-reference/project/assets/news.jsx.
 * Editorial copy (eyebrow, heading, lead, CTA label) and the article cards come
 * from the `home` record; the per-card hover affordances (3D tilt, gold
 * liquid-metal arrow ring, pulsing-border glow) are design behaviour preserved
 * inline. Article cards link to /resources/articles.
 */

// Mount a GOLD liquid-metal shader ring as the arrow's edge while hovered
// (replacing the old gold-foil FILL). Hover-only so each ring's WebGL context
// is released between hovers — same budget discipline as the card glow below.
// Degrades to the CSS gold edge (.nw-card:hover .nw-card__arrow) if the
// shader element isn't defined (WebGL/CDN unavailable).
function mountArrowMetal(card: HTMLElement | null) {
  const arrow = card && card.querySelector('.nw-card__arrow')
  if (!arrow || (arrow as ArrowEl).__metalRing) return
  if (!window.customElements || !customElements.get('csa-liquid-metal')) return
  const ring = document.createElement('csa-liquid-metal')
  ring.setAttribute('ring', '')
  ring.setAttribute('thickness', '2px')
  ring.setAttribute('contour', '0.92')
  ring.setAttribute('repetition', '3')
  ring.setAttribute('tint', '#F4D585')
  ring.setAttribute('color-back', '#7A5E2A')
  ring.setAttribute('distortion', '0.15')
  ring.setAttribute('data-no-lazy', '')
  ring.setAttribute('aria-hidden', 'true')
  ring.style.cssText = 'position:absolute;inset:0;border-radius:inherit;z-index:0;pointer-events:none;'
  arrow.insertBefore(ring, arrow.firstChild)
  ;(arrow as ArrowEl).__metalRing = ring
}
function unmountArrowMetal(card: HTMLElement | null) {
  const arrow = card && card.querySelector('.nw-card__arrow')
  if (!arrow || !(arrow as ArrowEl).__metalRing) return
  ;(arrow as ArrowEl).__metalRing!.remove()
  ;(arrow as ArrowEl).__metalRing = null
}

type ArrowEl = Element & { __metalRing?: Element | null }
type CardEl = HTMLAnchorElement & { __glow?: boolean }

declare global {
  interface Window {
    CSAShaders?: { wireGlow?: (el: Element | null) => void }
  }
}

function NewsCard({ article }: { article: NewsArticle; index: number }) {
  const ref = useRef<CardEl>(null)
  // Document-level tilt tracking (see _components/tilt.ts) so the card never
  // flickers near its edges, plus the hover-only glow + arrow-metal lifecycle
  // (mounted on genuine enter, torn down on genuine leave to free WebGL
  // contexts between hovers).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return attachTilt(el, {
      onEnter: () => {
        // Gold liquid-metal ring on the arrow (replaces the old gold-foil fill).
        mountArrowMetal(el)
        // Lazily mount the pulsing-border glow ONLY while hovered; one WebGL
        // context per card at rest would exhaust the scarce (~16) budget and
        // make metal edges elsewhere flicker.
        const prev = el.previousElementSibling
        if (el.__glow || (prev && prev.tagName && prev.tagName.toLowerCase() === 'csa-pulsing-border')) return
        el.setAttribute('data-glow', '')
        el.setAttribute('data-glow-bleed', '40')
        if (window.CSAShaders && window.CSAShaders.wireGlow) window.CSAShaders.wireGlow(el.parentElement)
      },
      onTilt: (px, py) => {
        const rx = ((px - 0.5) * 2 * 4).toFixed(2) + 'deg' // → rotateY
        const ry = (-(py - 0.5) * 2 * 4).toFixed(2) + 'deg' // → rotateX
        el.style.setProperty('--rx', rx)
        el.style.setProperty('--ry', ry)
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%')
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%')
        // Tilt the pulsing-border glow (injected as the card's prev sibling) in
        // lockstep so the neon border follows the card in 3D, not flat behind it.
        const glow = el.previousElementSibling as HTMLElement | null
        if (glow && glow.tagName && glow.tagName.toLowerCase() === 'csa-pulsing-border') {
          glow.style.transform = 'rotateX(' + ry + ') rotateY(' + rx + ')'
        }
      },
      onReset: () => {
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      },
      onLeave: () => {
        // Tear the glow back down so its WebGL context is released between hovers.
        const glow = el.previousElementSibling
        if (glow && glow.tagName && glow.tagName.toLowerCase() === 'csa-pulsing-border') glow.remove()
        el.__glow = false
        el.removeAttribute('data-glow')
        // Release the arrow's metal ring context between hovers.
        unmountArrowMetal(el)
      },
    })
  }, [])
  return (
    <Link className="nw-card csa-glass" href="/resources/articles" ref={ref}>
      <div className="nw-card__body">
        <p className="nw-card__meta">
          <span className="nw-card__cat">{article.category}</span>
          <span className="nw-card__sep" />
          <span className="nw-card__date">{article.date}</span>
        </p>
        <h3 className="nw-card__title">{article.title}</h3>
      </div>
      <span className="nw-card__arrow">
        <i data-lucide="arrow-up-right"></i>
      </span>
    </Link>
  )
}

export function NewsSection({ home }: { home: HomeDoc }) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  })

  const articles = home.nwArticles ?? []

  return (
    <section className="nw" data-screen-label="Latest News">
      <div className="nw__haze" />
      <csa-grain className="rv-grain" intensity="0.2" speed="0.4"></csa-grain>
      <div className="nw__inner">
        <div className="nw__intro">
          <p className="csa-eyebrow" data-reveal="up" data-scramble>
            {home.nwEyebrow}
          </p>
          <h2 className="csa-h2 nw__title" data-reveal="up" data-reveal-delay="80">
            {home.nwHeading}
          </h2>
          <p className="nw__lead" data-reveal="up" data-reveal-delay="160">
            {home.nwLead}
          </p>
          <Link
            className="btn btn--lg nw__cta rv-glass-btn"
            href="/resources"
            data-metal="gold"
            data-reveal="up"
            data-reveal-delay="240"
          >
            {home.nwCtaLabel} <i data-lucide="arrow-right"></i>
          </Link>
        </div>

        <div className="nw__list">
          {articles.map((a, i) => (
            <NewsCard key={i} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
