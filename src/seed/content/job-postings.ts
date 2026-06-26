/**
 * Seed — Job Postings content collection.
 *
 * Open roles for the Company → Careers page.
 * Copy lifted verbatim from the design export:
 *   design-reference/project/assets/company.jsx (the ROLES array used by
 *   CompanyCareers) + Company/Careers.html.
 *
 * The export's role `type` strings ("Full-time" / "Contract") map onto the
 * schema enum (full-time | contract). `summary` carries the export role blurb.
 * `applyUrl` points at the careers apply route. richText `description` uses the
 * default Lexical editor state shape via rt().
 */

const para = (text: string) => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: [
    {
      type: 'text',
      version: 1,
      text,
      detail: 0,
      format: 0,
      mode: 'normal' as const,
      style: '',
    },
  ],
})

const rt = (...paragraphs: string[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: paragraphs.map(para),
  },
})

export const seed = {
  collection: 'job-postings',
  docs: [
    {
      title: 'Senior Functional Safety Engineer — Robotics',
      slug: 'senior-functional-safety-engineer-robotics',
      department: 'Robotics',
      location: 'Remote · U.S. / Canada / Europe',
      type: 'full-time',
      summary:
        'Lead hazard analysis, requirements traceability, and verification for AMRs and collaborative systems; interface directly with third-party assessors.',
      description: rt(
        'Lead hazard analysis, requirements traceability, and verification for AMRs and collaborative systems; interface directly with third-party assessors.',
      ),
      applyUrl: 'mailto:careers@criticalsystemsanalysis.com?subject=Senior%20Functional%20Safety%20Engineer%20%E2%80%94%20Robotics',
      postedAt: '2026-06-01T00:00:00.000Z',
      active: true,
      seo: {
        metaTitle: 'Senior Functional Safety Engineer — Robotics | CSA Careers',
        metaDescription:
          'Lead hazard analysis, requirements traceability, and verification for AMRs and collaborative systems; interface directly with third-party assessors.',
      },
    },
    {
      title: 'Independent Safety Assessor — Rail',
      slug: 'independent-safety-assessor-rail',
      department: 'Rail',
      location: 'Remote · U.S. / Canada / Europe',
      type: 'full-time',
      summary:
        'Own ISA reviews and lifecycle audits across signaling and train-control programs under EN 50126 / 50128 / 50129.',
      description: rt(
        'Own ISA reviews and lifecycle audits across signaling and train-control programs under EN 50126 / 50128 / 50129.',
      ),
      applyUrl: 'mailto:careers@criticalsystemsanalysis.com?subject=Independent%20Safety%20Assessor%20%E2%80%94%20Rail',
      postedAt: '2026-06-01T00:00:00.000Z',
      active: true,
      seo: {
        metaTitle: 'Independent Safety Assessor — Rail | CSA Careers',
        metaDescription:
          'Own ISA reviews and lifecycle audits across signaling and train-control programs under EN 50126 / 50128 / 50129.',
      },
    },
    {
      title: 'Safety Engineer — Autonomous Mobility',
      slug: 'safety-engineer-autonomous-mobility',
      department: 'Autonomy',
      location: 'Remote · U.S. / Canada / Europe',
      type: 'contract',
      summary:
        'Facilitate FMEA / FTA workshops and validate functional safety concepts for autonomous on- and off-road platforms.',
      description: rt(
        'Facilitate FMEA / FTA workshops and validate functional safety concepts for autonomous on- and off-road platforms.',
      ),
      applyUrl: 'mailto:careers@criticalsystemsanalysis.com?subject=Safety%20Engineer%20%E2%80%94%20Autonomous%20Mobility',
      postedAt: '2026-06-01T00:00:00.000Z',
      active: true,
      seo: {
        metaTitle: 'Safety Engineer — Autonomous Mobility | CSA Careers',
        metaDescription:
          'Facilitate FMEA / FTA workshops and validate functional safety concepts for autonomous on- and off-road platforms.',
      },
    },
  ],
}
