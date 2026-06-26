/**
 * Seed — Team Members content collection.
 *
 * The people behind CSA, shown on Company → Overview ("Meet the team") and
 * per-person bio pages. Copy lifted verbatim from the design export:
 *   design-reference/project/assets/about.jsx (the AboutSection founder block —
 *   bio, role, location, and the two certification cards) cross-checked against
 *   Company/Overview.html.
 *
 * Ben Twombly is the only named individual in the export; the Careers/Overview
 * pages otherwise speak about "the team" generically. Credentials map onto the
 * schema's structured array (icon / title / subtitle). The `photo` upload field
 * is omitted — seeded later. richText `bio` uses the default Lexical editor
 * state shape via rt().
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
  collection: 'team-members',
  docs: [
    {
      name: 'Ben Twombly',
      slug: 'ben-twombly',
      role: 'Founder & CEO',
      location: 'Sarasota, FL',
      bio: rt(
        'Ben Twombly is the CEO and founder of Critical Systems Analysis, a functional safety consulting firm based in Sarasota, Florida. He holds an FS Engineer certification from TÜV Rheinland and the Industrial Functional Safety Professional (IFSP) certification. Before co-founding CSA in May 2023, he spent six years as a Senior Safety Engineer at TÜV Rheinland, preparing clients for safety assessments across a wide range of safety-critical systems. He earned his degree in robotics from the Colorado School of Mines.',
        'At CSA, Ben and his team work with robotics companies, autonomous vehicle manufacturers, industrial machinery firms, battery management system developers, and rail transit organizations across the U.S., Canada, and Europe.',
      ),
      credentials: [
        {
          icon: 'badge-check',
          title: 'FS Engineer',
          subtitle: 'Certified by TÜV Rheinland',
        },
        {
          icon: 'award',
          title: 'IFSP',
          subtitle: 'Industrial Functional Safety Professional',
        },
      ],
      order: 1,
      seo: {
        metaTitle: 'Ben Twombly — Founder & CEO | CSA',
        metaDescription:
          'Ben Twombly is the founder and CEO of Critical Systems Analysis — an FS Engineer (TÜV Rheinland) and Industrial Functional Safety Professional based in Sarasota, FL.',
      },
    },
  ],
}
