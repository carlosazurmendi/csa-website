'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * ArticlesListing — client port of the filter bar + CMS card grid from
 * design-reference/project/assets/resource-listing.jsx (the shared <Listing>),
 * as composed for design-reference/project/Resources/Articles.html.
 *
 * The category filter is the only client behavior (the export's <Listing> holds
 * `active` in useState and filters the card set live), so it is lifted here. The
 * server page loads the real article docs (findDocs('articles')) and passes them
 * in as plain props alongside the export's filter / empty-state copy.
 *
 * The export's three placeholder "publication pipeline" cards are CMS stand-ins
 * (owner note BT30); here we render the actual published articles instead, each
 * linking to /resources/articles/<slug>. Each article's category is mapped to its
 * display label so the chip filter matches exactly as the export's
 * `data-cat`/`c.cat === active` semantics — an article whose category has no chip
 * still shows under "All". The reveal hooks (data-reveal) + lucide icon hydration
 * are handled by the global motion engine.
 */

export type ArticleCard = {
  slug: string
  icon: string
  cat: string
  title: string
  desc: string
  meta: string
  metaIcon: string
  cta: string
}

function Card({ card }: { card: ArticleCard }) {
  return (
    <Link className="rl-card csa-glass" href={`/resources/articles/${card.slug}`} data-cat={card.cat}>
      <div className="rl-card__top">
        <span className="rl-card__icon">
          <i data-lucide={card.icon}></i>
        </span>
        <span className="rl-card__tag">{card.cat}</span>
      </div>
      <h3 className="rl-card__title">{card.title}</h3>
      <p className="rl-card__d">{card.desc}</p>
      <div className="rl-card__foot">
        <span className="rl-card__meta">
          <i data-lucide={card.metaIcon || 'file'}></i>
          {card.meta}
        </span>
        <span className="rl-card__cta">
          {card.cta} <i data-lucide="arrow-right"></i>
        </span>
      </div>
    </Link>
  )
}

export function ArticlesListing({
  id,
  filters,
  cards,
  emptyTitle,
  emptyText,
}: {
  id: string
  filters: string[]
  cards: ArticleCard[]
  emptyTitle?: string
  emptyText?: string
}) {
  const [active, setActive] = useState(filters[0])
  const shown = active === filters[0] ? cards : cards.filter((c) => c.cat === active)

  // re-run lucide when the filtered set changes (faithful to the export's effect)
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
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
          shown.map((c) => <Card card={c} key={c.slug} />)
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
