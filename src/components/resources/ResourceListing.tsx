'use client'

import { useEffect, useState } from 'react'

/**
 * Shared resource-listing client component — the Next port of
 * assets/resource-listing.jsx. One reusable pattern for the four library
 * pages (Downloads, Articles, Events, Free Trainings):
 *   Hero → filter bar → CMS card grid (→ optional featured band) → closing CTA.
 *
 * Cards come from CMS data passed as props; the filter chips drive a live
 * client-side filter (filter labels map to a card's `cat`). Class names match
 * the design's resources.css (.res- / .rl- prefixes).
 */

export type ListingCard = {
  icon: string
  cat: string
  title: string
  d: string
  meta: string
  metaIcon?: string
  cta: string
  soon?: boolean
  href?: string
}

export type FeaturedItem = { icon: string; t: string; d: string }

export type ResourceListingProps = {
  hero: {
    eyebrow: string
    eyebrowIcon: string
    ghost: string
    title: string
    lead: string
    cta?: { label: string; href: string } | null
  }
  filters: string[]
  emptyTitle?: string
  emptyText?: string
  cards: ListingCard[]
  featured?: {
    eyebrow: string
    title: string
    lead?: string | null
    items: FeaturedItem[]
  } | null
  closing: {
    eyebrow: string
    title: string
    sub: string
    cta: { label: string; href: string }
  }
}

function Hero({ hero }: { hero: ResourceListingProps['hero'] }) {
  return (
    <header className="res-hero res-hero--listing" data-screen-label="Hero">
      <div className="res-hero__ghost" aria-hidden="true">{hero.ghost}</div>
      <div className="res-hero__inner">
        <p className="csa-eyebrow">
          <span className="res-hero__eyebrow-ico"><i data-lucide={hero.eyebrowIcon}></i></span>
          {hero.eyebrow}
        </p>
        <h1 className="csa-display res-hero__title">{hero.title}</h1>
        <p className="csa-lead res-hero__sub">{hero.lead}</p>
        {hero.cta ? (
          <div className="res-hero__cta">
            <a className="btn btn--gold-pill btn--lg" href={hero.cta.href}>{hero.cta.label} <i data-lucide="arrow-right"></i></a>
          </div>
        ) : null}
      </div>
    </header>
  )
}

function Card({ card }: { card: ListingCard }) {
  const soon = !!card.soon
  // Link the card when it has a real destination (e.g. an article route or a
  // downloadable file); otherwise render the design's non-interactive article.
  const linked = !!card.href && card.href !== '#'
  const inner = (
    <>
      <div className="rl-card__top">
        <span className="rl-card__icon"><i data-lucide={card.icon}></i></span>
        <span className="rl-card__tag">{card.cat}</span>
      </div>
      <h3 className="rl-card__title">{card.title}</h3>
      <p className="rl-card__d">{card.d}</p>
      <div className="rl-card__foot">
        <span className="rl-card__meta"><i data-lucide={card.metaIcon || 'file'}></i>{card.meta}</span>
        <span className="rl-card__cta">{card.cta} <i data-lucide={soon ? 'clock' : 'arrow-right'}></i></span>
      </div>
    </>
  )
  const className = 'rl-card csa-glass' + (soon ? ' rl-card--soon' : '')
  return linked ? (
    <a className={className} data-cat={card.cat} href={card.href}>{inner}</a>
  ) : (
    <article className={className} data-cat={card.cat}>{inner}</article>
  )
}

function Listing({
  filters,
  cards,
  emptyTitle,
  emptyText,
}: {
  filters: string[]
  cards: ListingCard[]
  emptyTitle?: string
  emptyText?: string
}) {
  const [active, setActive] = useState(filters[0])
  const shown = active === filters[0] ? cards : cards.filter((c) => c.cat === active)
  // re-run lucide when the filtered set changes
  useEffect(() => {
    if ((window as any).lucide) (window as any).lucide.createIcons()
  }, [active])
  return (
    <section className="rl-sec res-band-top" id="library" data-screen-label="Resource Library">
      <div className="rl-bar res-reveal">
        <span className="rl-bar__label"><i data-lucide="sliders-horizontal"></i> Filter</span>
        <div className="rl-bar__chips">
          {filters.map((f) => (
            <button
              type="button"
              key={f}
              className={'rl-chip' + (f === active ? ' is-active' : '')}
              onClick={() => setActive(f)}
            >{f}</button>
          ))}
        </div>
        <span className="rl-bar__count">{shown.length} {shown.length === 1 ? 'resource' : 'resources'}</span>
      </div>
      <div className="rl-grid res-reveal">
        {shown.length > 0 ? (
          shown.map((c) => <Card card={c} key={c.title} />)
        ) : (
          <div className="rl-empty">
            <span className="rl-empty__ico"><i data-lucide="folder-plus"></i></span>
            <p className="rl-empty__t">{emptyTitle || 'More on the way.'}</p>
            <p className="rl-empty__d">{emptyText || 'New resources are being created for this category. Check back soon.'}</p>
          </div>
        )}
      </div>
    </section>
  )
}

function Featured({ featured }: { featured: ResourceListingProps['featured'] }) {
  if (!featured) return null
  return (
    <section className="res-sec--alt res-band-top" data-screen-label="Featured Annual Appearances">
      <div className="res-sec res-sec__inner">
        <div className="res-head res-reveal">
          <span className="csa-eyebrow">{featured.eyebrow}</span>
          <h2 className="csa-h2 res-head__title">{featured.title}</h2>
          {featured.lead ? <p className="csa-lead res-head__lead">{featured.lead}</p> : null}
        </div>
        <div className="rl-feat__grid res-reveal">
          {featured.items.map((it) => (
            <div className="rl-feat" key={it.t}>
              <span className="rl-feat__icon"><i data-lucide={it.icon}></i></span>
              <div>
                <h3 className="rl-feat__t">{it.t}</h3>
                <p className="rl-feat__d">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing({ closing }: { closing: ResourceListingProps['closing'] }) {
  return (
    <section className="res-close" data-screen-label="Closing CTA">
      <div className="res-close__haze" aria-hidden="true"></div>
      <div className="res-close__inner">
        <span className="csa-eyebrow">{closing.eyebrow}</span>
        <h2 className="csa-display res-close__title">{closing.title}</h2>
        <p className="csa-lead res-close__sub">{closing.sub}</p>
        <a className="btn btn--gold-pill btn--lg" href={closing.cta.href}>{closing.cta.label} <i data-lucide="arrow-right"></i></a>
      </div>
    </section>
  )
}

export function ResourceListing(props: ResourceListingProps) {
  // Reveal-on-scroll is delegated to the CSA motion engine (csaInit) via the
  // data-reveal attributes already present in the markup, re-run on mount.
  useEffect(() => {
    document.querySelectorAll('.res-reveal').forEach((el) => {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'up')
    })
    if ((window as any).lucide) (window as any).lucide.createIcons()
    if ((window as any).csaInit) (window as any).csaInit()
  })

  return (
    <main className="res">
      <Hero hero={props.hero} />
      <Listing
        filters={props.filters}
        cards={props.cards}
        emptyTitle={props.emptyTitle}
        emptyText={props.emptyText}
      />
      <Featured featured={props.featured} />
      <Closing closing={props.closing} />
    </main>
  )
}
