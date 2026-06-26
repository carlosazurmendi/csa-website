/**
 * Seed — Free Trainings content collection.
 *
 * The free, on-demand learning library on /resources/free-trainings.
 * Copy lifted verbatim from the design export:
 *   design-reference/project/Resources/Free Trainings.html (CONFIG.cards).
 *
 * The export cards carry a filter category ("Video Overviews", "Core
 * Introductions", "Technical Whitepapers") and a meta string. The schema has
 * no category field, so the category is folded into `duration`/`level` where it
 * makes sense. Upload fields (thumbnail) are omitted — seeded later.
 *
 * richText `description` uses the default Lexical editor state shape via rt().
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
  collection: 'free-trainings',
  docs: [
    {
      title:
        'Introduction to Probabilistic Safety: Calculating Average Probability of Failure on Demand (PFD)',
      slug: 'introduction-to-probabilistic-safety-pfd',
      summary:
        'A plain-English video walkthrough of probabilistic safety and how Average Probability of Failure on Demand is calculated and applied.',
      description: rt(
        'A plain-English video walkthrough of probabilistic safety and how Average Probability of Failure on Demand is calculated and applied.',
      ),
      duration: 'Video · Overview',
      level: 'introductory',
      seo: {
        metaTitle: 'Introduction to Probabilistic Safety (PFD) | CSA',
        metaDescription:
          'A plain-English video walkthrough of probabilistic safety and how Average Probability of Failure on Demand is calculated and applied.',
      },
    },
    {
      title:
        'Defining the Architectural Boundary: Hardware Isolation & Independent Safety Auditing Explained',
      slug: 'defining-the-architectural-boundary',
      summary:
        'An introductory presentation on drawing the architectural boundary — why hardware isolation and independent safety auditing matter.',
      description: rt(
        'An introductory presentation on drawing the architectural boundary — why hardware isolation and independent safety auditing matter.',
      ),
      duration: 'Presentation · Intro',
      level: 'introductory',
      seo: {
        metaTitle: 'Defining the Architectural Boundary | CSA',
        metaDescription:
          'An introductory presentation on drawing the architectural boundary — why hardware isolation and independent safety auditing matter.',
      },
    },
    {
      title: 'Technical whitepaper series',
      slug: 'technical-whitepaper-series',
      summary:
        'In-depth written briefings on safety-lifecycle fundamentals, published alongside the video overviews as the series grows.',
      description: rt(
        'In-depth written briefings on safety-lifecycle fundamentals, published alongside the video overviews as the series grows.',
      ),
      duration: 'Publishing soon',
      level: 'intermediate',
      seo: {
        metaTitle: 'Technical Whitepaper Series | CSA',
        metaDescription:
          'In-depth written briefings on safety-lifecycle fundamentals, published alongside the video overviews as the series grows.',
      },
    },
  ],
}
