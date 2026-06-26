'use client'

import { useEffect, useState } from 'react'

/**
 * DownloadsListing — client port of the <Listing> component inside the shared
 * design-reference/project/assets/resource-listing.jsx (mounted by
 * Resources/Downloadable Resources.html). The filter bar drives a live
 * client-side filter over the download cards (useState), so it must be a client
 * component.
 *
 * Cards come from the `downloads` content collection. The per-card icon /
 * metaIcon / meta line / CTA label are design constants the Downloads schema
 * doesn't carry — they're zipped onto each card on the server by category (same
 * pattern as the export's CONFIG.cards) and passed in as props. The filter chip
 * set + empty-state copy come from the `resources` page row.
 *
 * Gated downloads (M6): the export renders the download CTA as a plain
 * <span className="rl-card__cta"> — non-functional static markup. We keep that
 * exactly; the real signed-URL download + lead-capture flow is deferred to
 * Milestone 6, so no action is wired. Lucide icon hydration is handled globally,
 * so the export's window.lucide.createIcons on filter change is dropped.
 */

export type DownloadCard = {
  title: string
  cat: string
  d: string
  meta: string
  icon: string
  metaIcon: string
  cta: string
  soon: boolean
}

export function DownloadsListing({
  id,
  filters,
  cards,
  emptyTitle,
  emptyText,
}: {
  id: string
  filters: string[]
  cards: DownloadCard[]
  emptyTitle: string
  emptyText: string
}) {
  const [active, setActive] = useState(filters[0])
  const shown = active === filters[0] ? cards : cards.filter((c) => c.cat === active)

  // Re-run nothing app-side; lucide hydration is global. Keep the effect hook
  // shape (faithful to the export) so the chip set stays a controlled tab group.
  useEffect(() => {
    /* icons hydrate globally */
  }, [active])

  return (
    <section className="rl-sec res-band-top" id={id}>
      <div className="rl-bar res-reveal">
        <span className="rl-bar__label">
          <i data-lucide="sliders-horizontal"></i> Filter
        </span>
        <div className="rl-bar__chips">
          {filters.map((f) => (
            <button
              type="button"
              key={f}
              className={'rl-chip' + (f === active ? ' is-active' : '')}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="rl-bar__count">
          {shown.length} {shown.length === 1 ? 'resource' : 'resources'}
        </span>
      </div>
      <div className="rl-grid res-reveal">
        {shown.length > 0 ? (
          shown.map((c) => (
            <article
              className={'rl-card csa-glass' + (c.soon ? ' rl-card--soon' : '')}
              data-cat={c.cat}
              key={c.title}
            >
              <div className="rl-card__top">
                <span className="rl-card__icon">
                  <i data-lucide={c.icon}></i>
                </span>
                <span className="rl-card__tag">{c.cat}</span>
              </div>
              <h3 className="rl-card__title">{c.title}</h3>
              <p className="rl-card__d">{c.d}</p>
              <div className="rl-card__foot">
                <span className="rl-card__meta">
                  <i data-lucide={c.metaIcon || 'file'}></i>
                  {c.meta}
                </span>
                {/* Gated download / lead-capture is deferred to M6 — the export's
                    non-functional <span> CTA is the static shell. */}
                <span className="rl-card__cta">
                  {c.cta} <i data-lucide={c.soon ? 'clock' : 'arrow-right'}></i>
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="rl-empty">
            <span className="rl-empty__ico">
              <i data-lucide="folder-plus"></i>
            </span>
            <p className="rl-empty__t">{emptyTitle || 'More on the way.'}</p>
            <p className="rl-empty__d">
              {emptyText || 'New resources are being created for this category. Check back soon.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
