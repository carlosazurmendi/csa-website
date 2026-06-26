'use client'

import { useEffect, useState } from 'react'

/**
 * TemplateGallery — client port of the Gallery (+ Page9) component from
 * design-reference/project/Training - Templates/Template.html. The thumbnail
 * strip toggles which mock "sample page" is shown; the page mocks are pure
 * design markup (empty .td-page placeholders — no CMS media exists yet, matching
 * the export's `<Page9>` blocks). The gallery page list (text vs grid kinds) is a
 * design-only mock derived from the product format/type — lifted verbatim from
 * the gallery() helper in templates-data.js — since the CMS doesn't carry it.
 */

type PageKind = 'text' | 'grid'

function Page9({ kind }: { kind: PageKind }) {
  return (
    <div className="td-page">
      <div className="td-page__title"></div>
      <div className="td-page__meta"></div>
      <div className={kind === 'grid' ? 'td-page__grid' : 'td-page__body'}></div>
    </div>
  )
}

export function TemplateGallery({
  pages,
  format,
  type,
  memberCount,
}: {
  pages: { kind: PageKind }[]
  format?: string
  type: 'document' | 'bundle'
  memberCount: number
}) {
  const [i, setI] = useState(0)
  const cur = pages[Math.min(i, pages.length - 1)] || { kind: 'text' as PageKind }
  const isXls = format === 'Excel'

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  }, [i])

  return (
    <div className="td-gallery">
      <div className="td-shot">
        <span className={'td-shot__badge' + (isXls ? ' td-shot__badge--xls' : '')}>
          <i data-lucide={isXls ? 'file-spreadsheet' : type === 'bundle' ? 'files' : 'file-text'}></i>
          {type === 'bundle' ? memberCount + ' documents' : format + ' · sample page'}
        </span>
        <div className="td-pagewrap">
          <Page9 kind={cur.kind} />
        </div>
      </div>
      {pages.length > 1 && (
        <div className="td-thumbs">
          {pages.map((pg, n) => (
            <button
              key={n}
              className={'td-thumb' + (n === i ? ' is-on' : '')}
              onClick={() => setI(n)}
              aria-label={'Preview page ' + (n + 1)}
            >
              <span className="td-thumb__page">
                <span className="b"></span>
                <span className={pg.kind === 'grid' ? 'g' : 'l'}></span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
