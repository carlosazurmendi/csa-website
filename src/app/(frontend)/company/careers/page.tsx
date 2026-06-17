import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Hero, Closing } from '@/components/company/parts'
import { RolesScrollLink } from '@/components/company/RolesScrollLink'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const g = (await payload.findGlobal({ slug: 'careersIntro' })) as any
  return {
    title: g?.meta?.title || 'Careers',
    description: g?.meta?.description || undefined,
  }
}

export default async function CompanyCareersPage() {
  const payload = await getPayloadClient()
  const [g, jobsRes] = await Promise.all([
    payload.findGlobal({ slug: 'careersIntro', depth: 1 }) as Promise<any>,
    payload.find({ collection: 'jobPostings', sort: 'order', limit: 100, depth: 1 }),
  ])

  const hero = g?.hero || {}
  const why = g?.why || {}
  const rolesSec = g?.roles || {}
  const note = rolesSec?.note || {}
  const closing = g?.closing || {}

  const jobs = (jobsRes.docs as any[]).map((j) => ({
    title: j.title,
    location: j.location,
    summary: j.summary,
    applyLink: j.applyLink || '#',
  }))

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
            <RolesScrollLink className="btn btn--gold-pill btn--lg">
              {hero.primaryCtaLabel} <i data-lucide="arrow-down"></i>
            </RolesScrollLink>
            <a className="btn btn--link" href={hero.secondaryCtaHref || '#'}>
              {hero.secondaryCtaLabel} <i data-lucide="arrow-right"></i>
            </a>
          </>
        }
      />

      {/* Why Elite Engineers Build Careers at CSA */}
      <section className="ip-sec ip-band-top" data-screen-label="Why Build a Career at CSA">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{why.eyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{why.title}</h2>
          <p className="csa-lead ip-head__lead">{why.lead}</p>
        </div>
        <div className="ip-cap__grid ip-reveal" data-reveal="up">
          {(why.items || []).map((it: any) => (
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

      {/* Open Positions */}
      <section className="ip-sec ip-band-top" id="roles" data-screen-label="Open Positions">
        <div className="ip-head ip-reveal" data-reveal="up">
          <span className="csa-eyebrow">{rolesSec.eyebrow}</span>
          <h2 className="csa-h2 ip-head__title">{rolesSec.title}</h2>
          <p className="csa-lead ip-head__lead">{rolesSec.lead}</p>
        </div>
        <div className="co-roles ip-reveal" data-reveal="up">
          {jobs.map((r) => (
            <article className="co-role" key={r.title}>
              <div>
                <div className="co-role__meta">
                  {r.location && (
                    <span className="co-role__chip">
                      <i data-lucide="map-pin"></i> {r.location}
                    </span>
                  )}
                </div>
                <h3 className="co-role__t">{r.title}</h3>
                <p className="co-role__d">{r.summary}</p>
              </div>
              <a className="btn btn--silver-pill co-role__apply" href={r.applyLink}>
                Apply <i data-lucide="arrow-right"></i>
              </a>
            </article>
          ))}
          <div className="co-note">
            <span className="co-note__icon">
              <i data-lucide={note.icon || 'briefcase'}></i>
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
          <RolesScrollLink className="btn btn--gold-pill btn--lg">
            {closing.primaryLabel} <i data-lucide="arrow-up"></i>
          </RolesScrollLink>
        }
      />
    </main>
  )
}
