'use client'

import { useEffect, useState } from 'react'

/**
 * Client-only table of contents with scroll-spy — faithful port of the `Toc`
 * component in design-reference/project/assets/legal.jsx. The legal body is
 * rendered server-side; the server page derives the section list (one entry per
 * `h2` heading in the Lexical body) and passes it here as `sections`.
 */

export type LegalSection = { id: string; title: string }

export function LegalToc({ sections }: { sections: LegalSection[] }) {
  const [active, setActive] = useState<string | undefined>(sections[0] && sections[0].id)

  useEffect(() => {
    const ids = sections.map((s) => s.id)
    const onScroll = () => {
      const mark = 140 // px from top of viewport
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - mark <= 0) current = id
      }
      // at the very bottom, force-select the last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections])

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top: y, behavior: 'smooth' })
    if (history.replaceState) history.replaceState(null, '', '#' + id)
  }

  return (
    <nav className="lg-toc" aria-label="On this page">
      <p className="lg-toc__label">On this page</p>
      <ul className="lg-toc__list">
        {sections.map((s, i) => (
          <li className="lg-toc__item" key={s.id}>
            <a
              href={'#' + s.id}
              onClick={(e) => go(e, s.id)}
              className={'lg-toc__link' + (active === s.id ? ' is-active' : '')}
            >
              <span className="lg-toc__num">{String(i + 1).padStart(2, '0')}</span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
