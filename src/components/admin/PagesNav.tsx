import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Custom admin sidebar section that mirrors the live site's page hierarchy.
 * Rendered via `admin.components.beforeNavLinks`. Top-level pages are
 * collapsible (<details>) groups; leaves link to the right edit view:
 *   - page singletons  -> /admin/globals/<slug>
 *   - industry/legal    -> /admin/collections/<slug>/<id>  (one per entry)
 *   - listing pages     -> /admin/collections/<slug>       (the content list)
 *
 * The page singletons + the industries/legalPages collections are hidden from
 * the default nav (admin.hidden) so this tree is the single place to reach them;
 * each collapsible group also includes a "Manage…" link to add/remove entries.
 */
type Leaf = { label: string; href: string; muted?: boolean }
type Group = { label: string; href?: string; children: Leaf[] }

const g = (slug: string) => `/admin/globals/${slug}`
const list = (slug: string) => `/admin/collections/${slug}`
const doc = (slug: string, id: string | number) => `/admin/collections/${slug}/${id}`

export async function PagesNav() {
  const payload = await getPayload({ config })

  let industries: { title: string; id: string | number }[] = []
  let legal: { title: string; id: string | number }[] = []
  try {
    const [ind, leg] = await Promise.all([
      payload.find({ collection: 'industries', sort: 'order', limit: 100, depth: 0 }),
      payload.find({ collection: 'legalPages', limit: 100, depth: 0 }),
    ])
    industries = ind.docs as any
    legal = leg.docs as any
  } catch {
    // DB unavailable (e.g. admin loaded before migrations) — render the static
    // groups without the dynamic entries rather than crashing the nav.
  }

  const groups: Group[] = [
    { label: 'Home', href: g('homePage'), children: [] },
    {
      label: 'Consulting',
      children: [
        { label: 'Overview', href: g('consultingOverview') },
        ...industries.map((d) => ({ label: d.title, href: doc('industries', d.id) })),
        { label: 'Manage industries…', href: list('industries'), muted: true },
      ],
    },
    {
      label: 'Training & Templates',
      children: [
        { label: 'Overview', href: g('trainingTemplatesOverview') },
        { label: 'Course Catalog', href: list('courses') },
        { label: 'Purchase Templates', href: list('templates') },
      ],
    },
    {
      label: 'Company',
      children: [
        { label: 'Overview', href: g('companyAbout') },
        { label: 'Experience', href: g('companyExperience') },
        { label: 'Services', href: g('companyServices') },
        { label: 'Careers', href: g('careersIntro') },
      ],
    },
    {
      label: 'Resources',
      children: [
        { label: 'Overview', href: g('resourcesOverview') },
        { label: 'Standards Identifier', href: g('standardsIdentifierPage') },
        { label: 'Safety Chat', href: g('safetyChatPage') },
        { label: 'Downloadable Resources', href: list('resources') },
        { label: 'Articles', href: list('articles') },
        { label: 'Events & Webinars', href: list('events') },
        { label: 'Free Trainings', href: list('freeTrainings') },
      ],
    },
    {
      label: 'Legal',
      children: [
        ...legal.map((d) => ({ label: d.title, href: doc('legalPages', d.id) })),
        { label: 'Manage legal pages…', href: list('legalPages'), muted: true },
      ],
    },
  ]

  const linkStyle: React.CSSProperties = {
    display: 'block',
    padding: '6px 0',
    fontSize: '13px',
    color: 'var(--theme-elevation-700)',
    textDecoration: 'none',
  }
  const subLinkStyle: React.CSSProperties = { ...linkStyle, paddingLeft: '14px' }

  return (
    <div style={{ marginBottom: '24px' }}>
      <p
        style={{
          margin: '0 0 6px',
          fontSize: '11px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--theme-elevation-500)',
        }}
      >
        Pages
      </p>

      {groups.map((grp) =>
        grp.children.length === 0 && grp.href ? (
          <a key={grp.label} href={grp.href} style={{ ...linkStyle, fontWeight: 600, color: 'var(--theme-elevation-800)' }}>
            {grp.label}
          </a>
        ) : (
          <details key={grp.label} style={{ marginBottom: '2px' }}>
            <summary
              style={{
                cursor: 'pointer',
                padding: '6px 0',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--theme-elevation-800)',
                listStyle: 'revert',
              }}
            >
              {grp.label}
            </summary>
            <div style={{ borderLeft: '1px solid var(--theme-elevation-150)', marginLeft: '4px' }}>
              {grp.children.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  style={c.muted ? { ...subLinkStyle, fontStyle: 'italic', color: 'var(--theme-elevation-500)' } : subLinkStyle}
                >
                  {c.label}
                </a>
              ))}
            </div>
          </details>
        ),
      )}
    </div>
  )
}
