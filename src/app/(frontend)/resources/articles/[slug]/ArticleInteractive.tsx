'use client'

import { useEffect, useState } from 'react'

/**
 * Client-only chrome for the article reading page — faithful port of the Toc
 * (scroll-spy) and ShareRail components in design-reference/project/assets/
 * article-detail.jsx. The article body itself is rendered server-side; the
 * server page derives the heading list and passes it here as `sections`.
 */

export type TocSection = { id: string; heading: string }

/* ---------- TOC with scroll-spy ---------- */
export function ArticleToc({ sections }: { sections: TocSection[] }) {
  const [active, setActive] = useState<string | undefined>(sections[0] && sections[0].id)
  useEffect(() => {
    // Rect-based scan instead of IntersectionObserver (system convention):
    // the heading whose top is closest to (but not far below) the offset wins.
    const onScroll = () => {
      const off = 140
      let cur = sections[0] && sections[0].id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= off) cur = s.id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' })
  }
  return (
    <nav className="ad-toc" aria-label="On this page">
      <p className="ad-toc__label">On this page</p>
      <ul className="ad-toc__list">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              className={'ad-toc__link' + (active === s.id ? ' is-active' : '')}
              href={'#' + s.id}
              onClick={(e) => go(e, s.id)}
            >
              {s.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ---------- Share rail ---------- */
export function ArticleShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const url = typeof location !== 'undefined' ? location.href : ''
  const open = (u: string) => window.open(u, '_blank', 'noopener,width=620,height=560')
  const onCopy = () => {
    const done = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1900)
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done)
    else done()
  }
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  }, [copied])
  return (
    <div className="ad-share">
      <p className="ad-share__label">Share</p>
      <button
        className="ad-share__btn"
        aria-label="Share on LinkedIn"
        onClick={() => open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url))}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.51C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z" />
        </svg>
      </button>
      <button
        className="ad-share__btn"
        aria-label="Share on X"
        onClick={() => open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url))}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      </button>
      <button
        className="ad-share__btn"
        aria-label="Share by email"
        onClick={() => {
          window.location.href = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url)
        }}
      >
        <i data-lucide="mail"></i>
      </button>
      <button className="ad-share__btn" aria-label="Copy link" onClick={onCopy}>
        <i data-lucide={copied ? 'check' : 'link'}></i>
      </button>
      <span className={'ad-share__copied' + (copied ? ' is-on' : '')}>Copied</span>
    </div>
  )
}
