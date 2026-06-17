import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPayloadClient } from '@/lib/payload'
import { Hero, Closing } from '@/components/company/parts'

// ISR: CMS edits surface within 60s without a redeploy.
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const g = (await payload.findGlobal({ slug: 'companyAbout' })) as any
  return {
    title: g?.meta?.title || 'About CSA',
    description: g?.meta?.description || undefined,
  }
}

export default async function CompanyOverviewPage() {
  const payload = await getPayloadClient()
  const g = (await payload.findGlobal({ slug: 'companyAbout', depth: 1 })) as any

  const hero = g?.hero || {}
  const mission = g?.mission || {}
  const philosophy = g?.philosophy || {}
  const boundary = philosophy?.boundary || {}
  const values = g?.values || {}
  const iso = g?.iso || {}
  const closing = g?.closing || {}

  return (
    <main className="ip">
      <Hero
        ghost={hero.ghost}
        icon={hero.icon}
        eyebrow={hero.eyebrow}
        title={hero.title}
        tagline={hero.tagline}
        intro={hero.intro}
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

      {/* Mission */}
      <section className="ip-sec ip-band-top" data-screen-label="Our Mission">
        <div className="co-statement__grid">
          <div className="co-statement__head ip-reveal" data-reveal="up">
            <p className="co-statement__num">{mission.num}</p>
            <span className="csa-eyebrow">{mission.eyebrow}</span>
            <h2 className="csa-h2 co-statement__title">{mission.title}</h2>
          </div>
          <div className="co-prose ip-reveal" data-reveal="up">
            {mission.body ? <RichText data={mission.body} /> : null}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="ip-sec ip-band-top" data-screen-label="The CSA Philosophy">
        <div className="co-statement__grid">
          <div className="co-statement__head ip-reveal" data-reveal="up">
            <p className="co-statement__num">{philosophy.num}</p>
            <span className="csa-eyebrow">{philosophy.eyebrow}</span>
            <h2 className="csa-h2 co-statement__title">{philosophy.title}</h2>
          </div>
          <div className="ip-reveal" data-reveal="up">
            <div className="co-prose">{philosophy.body ? <RichText data={philosophy.body} /> : null}</div>
            <div className="co-boundary">
              <span className="co-boundary__icon">
                <i data-lucide={boundary.icon || 'git-fork'}></i>
              </span>
              <div>
                <p className="co-boundary__t">{boundary.title}</p>
                <div className="co-boundary__d">{boundary.body ? <RichText data={boundary.body} /> : null}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="ip-sec ip-band-top" data-screen-label="Core Values">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{values.eyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{values.title}</h2>
          <p className="csa-lead ip-head__lead">{values.lead}</p>
        </div>
        <div className="co-values ip-reveal" data-reveal="up">
          {(values.items || []).map((v: any, i: number) => (
            <article className="co-value" key={v.t}>
              <div className="co-value__top">
                <span className="co-value__icon">
                  <i data-lucide={v.icon}></i>
                </span>
                <span className="co-value__n">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="co-value__t">{v.t}</h3>
              <p className="co-value__d">{v.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ISO 9001 intent */}
      <div className="co-iso ip-reveal" data-reveal="up">
        <div className="co-iso__panel csa-glass">
          <span className="co-iso__badge">
            <i data-lucide={iso.icon || 'badge-check'}></i>
          </span>
          <div>
            <p className="co-iso__eyebrow">{iso.eyebrow}</p>
            <div className="co-iso__t">{iso.body ? <RichText data={iso.body} /> : null}</div>
          </div>
        </div>
      </div>

      <Closing
        eyebrow={closing.eyebrow}
        title={closing.title}
        sub={closing.sub}
        actions={
          <>
            <a className="btn btn--gold-pill btn--lg" href={closing.primaryHref || '#'}>
              {closing.primaryLabel} <i data-lucide="users"></i>
            </a>
            <a className="btn btn--silver-pill btn--lg" href={closing.secondaryHref || '#'}>
              {closing.secondaryLabel} <i data-lucide="arrow-right"></i>
            </a>
          </>
        }
      />
    </main>
  )
}
