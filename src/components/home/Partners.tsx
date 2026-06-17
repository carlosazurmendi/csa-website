'use client'

import { useState } from 'react'

/* ============================================================
   CSA — Trusted By (customer wall) + Partners / accreditations
   Requires assets/partners.css.

   Both walls load brand marks from the DuckDuckGo icon service
   (icons.duckduckgo.com/ip3/{domain}.ico) — the source that loaded
   reliably here. A tile only falls back to its monogram if the icon
   HARD-FAILS (onError); there is no timeout that could blank a
   still-loading mark.
   ============================================================ */

const icon = (domain: string) => 'https://icons.duckduckgo.com/ip3/' + domain + '.ico'

export type CustomerLogoData = { name: string; domain?: string | null; mono?: string | null; logoUrl?: string | null }
export type PartnerLogoData = { name: string; role?: string | null; mono?: string | null; domain?: string | null; logoUrl?: string | null }
export type PartnersProps = {
  eyebrow?: string | null; title?: string | null; sub?: string | null
  partnersLabel?: string | null; partnersIntro?: string | null
  customers: CustomerLogoData[]
  partners: PartnerLogoData[]
}

function CustomerLogo({ customer }: { customer: CustomerLogoData }) {
  const [ok, setOk] = useState(true)
  const src = customer.logoUrl || (customer.domain ? icon(customer.domain) : '')
  if (!ok || !src) return <span className="pt-logo__mark">{customer.mono}</span>
  return (
    <img
      className="pt-logo__img"
      src={src}
      alt={customer.name + ' logo'}
      loading="lazy"
      onError={() => setOk(false)} />)


}

function PartnerLogo({ partner }: { partner: PartnerLogoData }) {
  const [ok, setOk] = useState(true)
  const src = partner.logoUrl || (partner.domain ? icon(partner.domain) : '')
  return (
    <span className="pt-card__logo">
    {ok && src ?
      <img
        src={src}
        alt={partner.name + ' logo'}
        loading="lazy"
        onError={() => setOk(false)} /> :


      <span className="pt-card__mono">{partner.mono}</span>
      }
  </span>)

}

export function Partners(props: PartnersProps) {
  return (
    <section className="pt" data-screen-label="Partners" data-comment-anchor="e3d3bb4cae-section-73-5">
    <div className="pt__haze" />
    <div className="pt__head">
      <p className="csa-eyebrow" data-reveal="up" data-scramble>{props.eyebrow}</p>
      <h2 className="csa-h2 pt__title" data-reveal="up" data-reveal-delay="80">{props.title}</h2>
      <p className="pt__sub" data-reveal="up" data-reveal-delay="160">{props.sub}</p>
    </div>

    <div className="pt-shell pt-shell--bare" data-comment-anchor="3763d4a128-div-81-7">
      <div className="pt-logos">
        {props.customers.map((c, i) =>
          <div className="pt-logo" key={c.name} data-reveal="up" data-reveal-delay={String(i * 55)}>
            <span className="pt-logo__logo"><CustomerLogo customer={c} /></span>
            <span className="pt-logo__name">{c.name}</span>
          </div>
          )}
      </div>
    </div>

    <div className="pt__partners">
      <p className="pt__partners-label" data-reveal="up"><span className="pt__partners-tick" />{props.partnersLabel}</p>
      <p className="pt__partners-intro" data-reveal="up" data-reveal-delay="80">{props.partnersIntro}</p>

      <div className="pt-shell pt-shell--bare" data-comment-anchor="d203be2675-div-96-9">
        <div className="pt-wall" data-comment-anchor="b47442033c-div-97-11">
          {props.partners.map((p, i) =>
            <div className="pt-card" key={p.name} data-reveal="up" data-reveal-delay={String(i * 70)}>
              <PartnerLogo partner={p} />
              <span className="pt-card__meta">
                <span className="pt-card__name">{p.name}</span>
                <span className="pt-card__role">{p.role}</span>
              </span>
            </div>
            )}
        </div>
      </div>
    </div>
  </section>)

}
