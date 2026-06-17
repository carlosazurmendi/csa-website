import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Hero, Closing } from '@/components/company/parts'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const g = (await payload.findGlobal({ slug: 'companyServices' })) as any
  return {
    title: g?.meta?.title || 'Our Services',
    description: g?.meta?.description || undefined,
  }
}

export default async function CompanyServicesPage() {
  const payload = await getPayloadClient()
  const g = (await payload.findGlobal({ slug: 'companyServices', depth: 1 })) as any

  const hero = g?.hero || {}
  const models = g?.models || {}
  const closing = g?.closing || {}

  const heroStandards = (hero.standards || []).map((s: any) => s.label)

  return (
    <main className="ip">
      <Hero
        ghost={hero.ghost}
        icon={hero.icon}
        eyebrow={hero.eyebrow}
        title={hero.title}
        tagline={hero.tagline}
        intro={hero.intro}
        standards={heroStandards}
        hud={{
          tag: hero.hud?.tag,
          badge: hero.hud?.badge,
          foot: hero.hud?.foot,
          rows: (hero.hud?.rows || []).map((r: any) => ({ icon: r.icon, t: r.t, d: r.d })),
        }}
        actions={
          <>
            <a className="btn btn--gold-pill btn--lg" href={hero.primaryCtaHref || '#'}>
              {hero.primaryCtaLabel} <i data-lucide="arrow-right"></i>
            </a>
            <a className="btn btn--link" href={hero.secondaryCtaHref || '#'}>
              {hero.secondaryCtaLabel} <i data-lucide="arrow-right"></i>
            </a>
          </>
        }
      />

      {/* Engagement Models */}
      <section className="ip-sec ip-band-top" data-screen-label="Engagement Models">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{models.eyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{models.title}</h2>
          <p className="csa-lead ip-head__lead">{models.lead}</p>
        </div>
        <div className="co-models ip-reveal" data-reveal="up">
          {(models.items || []).map((m: any, i: number) => (
            <article className="co-model" key={m.t}>
              <div className="co-model__top">
                <span className="co-model__icon">
                  <i data-lucide={m.icon}></i>
                </span>
                <span className="co-model__n">{'MODEL ' + String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="co-model__t">{m.t}</h3>
              <p className="co-model__d">{m.d}</p>
              <div className="co-model__foot">
                <span className="co-model__best">
                  <b>Best for:</b> {m.best}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Closing
        eyebrow={closing.eyebrow}
        title={closing.title}
        sub={closing.sub}
        actions={
          <a className="btn btn--gold-pill btn--lg" href={closing.primaryHref || '#'}>
            {closing.primaryLabel} <i data-lucide="arrow-right"></i>
          </a>
        }
      />
    </main>
  )
}
