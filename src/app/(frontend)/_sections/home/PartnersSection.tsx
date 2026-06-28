'use client'

import { useState } from 'react'
import { lexicalToText } from '@/lib/lexical'
import type { Customer, HomeDoc, Partner } from './types'

/**
 * PartnersSection — faithful port of design-reference/project/assets/partners.jsx.
 * Editorial copy (eyebrow, heading, sub, partner label/intro) and the customer +
 * partner rows come from the `home` record. Brand marks load from the DuckDuckGo
 * icon service (icons.duckduckgo.com/ip3/{domain}.ico) — a tile only falls back
 * to its monogram if the icon HARD-FAILS (onError).
 *
 * The CMS Partner type carries no domain, so the per-partner logo domain is a
 * design-only map keyed by partner name (the only stable identifier). Any partner
 * not in the map renders the monogram directly.
 */

// Brand marks load as third-party .ico favicons from the DuckDuckGo icon service.
// M8 exception — these stay plain <img>, NOT next/image: sharp can't decode .ico so
// the optimizer would hard-fail (and trip the onError → monogram fallback for every
// tile), and there is no responsive benefit at logo size. `loading="lazy"` + the
// onError fallback already cover the relevant perf/resilience concerns.
const icon = (domain: string): string => 'https://icons.duckduckgo.com/ip3/' + domain + '.ico'

// Design-only: partner-logo domains (not in the CMS Partner type), keyed by name.
const PARTNER_DOMAINS: Record<string, string> = {
  'SGS-TÜV Saar': 'sgs-tuev-saar.com',
  'TÜV Rheinland': 'tuv.com',
  Saphira: 'saphira.ai',
  'Fennec Engineering': 'fennec-engineering.com',
  A3: 'automate.org',
}

function CustomerLogo({ customer }: { customer: Customer }) {
  const [ok, setOk] = useState(true)
  if (!ok || !customer.domain) return <span className="pt-logo__mark">{customer.mark}</span>
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see `icon` note above
    <img
      className="pt-logo__img"
      src={icon(customer.domain)}
      alt={customer.name + ' logo'}
      loading="lazy"
      onError={() => setOk(false)}
    />
  )
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [ok, setOk] = useState(true)
  const logo = PARTNER_DOMAINS[partner.name] ? icon(PARTNER_DOMAINS[partner.name]) : null
  return (
    <span className="pt-card__logo">
      {ok && logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- see `icon` note above
        <img src={logo} alt={partner.name + ' logo'} loading="lazy" onError={() => setOk(false)} />
      ) : (
        <span className="pt-card__mono">{partner.mono}</span>
      )}
    </span>
  )
}

export function PartnersSection({ home }: { home: HomeDoc }) {
  const customers = home.ptCustomers ?? []
  const partners = home.ptPartners ?? []

  return (
    <section className="pt" data-screen-label="Partners">
      <div className="pt__haze" />
      <div className="pt__head">
        <p className="csa-eyebrow" data-reveal="up" data-scramble>
          {home.ptEyebrow}
        </p>
        <h2 className="csa-h2 pt__title" data-reveal="up" data-reveal-delay="80">
          {home.ptHeading}
        </h2>
        <p className="pt__sub" data-reveal="up" data-reveal-delay="160">
          {lexicalToText(home.ptSub)}
        </p>
      </div>

      <div className="pt-shell pt-shell--bare">
        <div className="pt-logos">
          {customers.map((c, i) => (
            <div className="pt-logo" key={c.name} data-reveal="up" data-reveal-delay={String(i * 55)}>
              <span className="pt-logo__logo">
                <CustomerLogo customer={c} />
              </span>
              <span className="pt-logo__name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt__partners">
        <p className="pt__partners-label" data-reveal="up">
          <span className="pt__partners-tick" />
          {home.ptPartnersLabel}
        </p>
        <p className="pt__partners-intro" data-reveal="up" data-reveal-delay="80">
          {home.ptPartnersIntro}
        </p>

        <div className="pt-shell pt-shell--bare">
          <div className="pt-wall">
            {partners.map((p, i) => (
              <div className="pt-card" key={p.name} data-reveal="up" data-reveal-delay={String(i * 70)}>
                <PartnerLogo partner={p} />
                <span className="pt-card__meta">
                  <span className="pt-card__name">{p.name}</span>
                  <span className="pt-card__role">{p.role}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
