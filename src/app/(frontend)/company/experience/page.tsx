import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Hero, Closing } from '@/components/company/parts'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const g = (await payload.findGlobal({ slug: 'companyExperience' })) as any
  return {
    title: g?.meta?.title || 'Our Experience',
    description: g?.meta?.description || undefined,
  }
}

export default async function CompanyExperiencePage() {
  const payload = await getPayloadClient()
  const [g, casesRes] = await Promise.all([
    payload.findGlobal({ slug: 'companyExperience', depth: 1 }) as Promise<any>,
    payload.find({ collection: 'caseStudies', sort: 'order', limit: 100, depth: 1 }),
  ])

  const hero = g?.hero || {}
  const delivered = g?.delivered || {}
  const casesSec = g?.cases || {}
  const note = casesSec?.note || {}
  const closing = g?.closing || {}

  const heroStandards = (hero.standards || []).map((s: any) => s.label)

  // Long-form case studies for this page. Prefer entries with explicit
  // problem/solution copy; if none have been authored yet, fall back to the
  // full set using `description` as the solution so the section is never empty.
  const allCases = casesRes.docs as any[]
  const withPS = allCases.filter((c) => c.problem || c.solution)
  const source = withPS.length > 0 ? withPS : allCases
  const cases = source.map((c) => {
    const std = (c.standards || []).map((s: any) => s.label).filter(Boolean)
    const tag = [c.sector, std[0]].filter(Boolean).join(' · ')
    return {
      tag,
      title: c.name,
      problem: c.problem || null,
      solution: c.solution || c.description || null,
    }
  })

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

      {/* Where We've Delivered */}
      <section className="ip-sec ip-band-top" data-screen-label="Where We've Delivered">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{delivered.eyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{delivered.title}</h2>
          <p className="csa-lead ip-head__lead">{delivered.lead}</p>
        </div>
        <div className="ip-cap__grid ip-reveal" data-reveal="up">
          {(delivered.items || []).map((it: any) => (
            <div className="ip-cap" key={it.t}>
              <div className="ip-cap__icon">
                <i data-lucide={it.icon}></i>
              </div>
              <p className="ip-cap__code">{it.code}</p>
              <h3 className="ip-cap__t">{it.t}</h3>
              <p className="ip-cap__d">{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="ip-sec ip-band-top" data-screen-label="Case Studies">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{casesSec.eyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{casesSec.title}</h2>
          <p className="csa-lead ip-head__lead">{casesSec.lead}</p>
        </div>
        <div className="co-cases ip-reveal" data-reveal="up">
          {cases.map((c, i) => (
            <article className="co-case csa-glass" key={c.title}>
              <div className="co-case__grid">
                <span className="co-case__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <span className="co-case__tag">
                    <i data-lucide="badge-check"></i> {c.tag}
                  </span>
                  <h3 className="co-case__title">{c.title}</h3>
                  <div className="co-case__ps">
                    {c.problem && (
                      <div className="co-ps co-ps--problem">
                        <p className="co-ps__label">
                          <span className="mark">
                            <i data-lucide="alert-triangle"></i>
                          </span>{' '}
                          Problem
                        </p>
                        <p className="co-ps__d">{c.problem}</p>
                      </div>
                    )}
                    {c.solution && (
                      <div className="co-ps co-ps--solution">
                        <p className="co-ps__label">
                          <span className="mark">
                            <i data-lucide="check"></i>
                          </span>{' '}
                          Solution
                        </p>
                        <p className="co-ps__d">{c.solution}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
          <div className="co-note">
            <span className="co-note__icon">
              <i data-lucide={note.icon || 'folder-plus'}></i>
            </span>
            <p className="co-note__t">
              <b>{note.bold}</b> {note.text}
            </p>
          </div>
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
