/**
 * Seed: instructors collection.
 *
 * Real copy lifted from the INSTRUCTORS block in
 * design-reference/project/assets/courses-data.js.
 *
 * Schema source: src/collections/Instructors.ts
 *   - bio is richText (Lexical root shape via richText()).
 *   - credentials[]: { icon, title, subtitle }  (source keys t/s mapped → title/subtitle).
 *   - stats[]: { value, suffix, label }          (source keys n/l mapped → value/label).
 *   - avatar (upload) omitted — seeded later.
 */

const richText = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: [
          {
            type: 'text',
            text,
            format: 0,
            style: '',
            mode: 'normal' as const,
            detail: 0,
            version: 1,
          },
        ],
      },
    ],
  },
})

export const seed = {
  collection: 'instructors',
  docs: [
    {
      slug: 'ben',
      name: 'Ben Twombly',
      role: 'Founder & CEO · Principal Safety Engineer',
      location: 'Sarasota, Florida',
      bioShort:
        'Ben Twombly is the founder of Critical Systems Analysis and the principal engineer behind every CSA program. He holds an FS Engineer certification from TÜV Rheinland and the Industrial Functional Safety Professional (IFSP) certification.',
      bio: richText(
        'Before founding CSA in May 2023, Ben spent six years as a Senior Safety Engineer at TÜV Rheinland, preparing clients for safety assessments across a wide range of safety-critical systems. He earned his degree in robotics from the Colorado School of Mines. At CSA he works with robotics companies, autonomous vehicle manufacturers, industrial machinery firms, battery management system developers, and rail transit organizations across the U.S., Canada, and Europe.',
      ),
      credentials: [
        { icon: 'badge-check', title: 'FS Engineer', subtitle: 'Certified by TÜV Rheinland' },
        { icon: 'award', title: 'IFSP', subtitle: 'Industrial Functional Safety Professional' },
        { icon: 'graduation-cap', title: 'B.S. Robotics', subtitle: 'Colorado School of Mines' },
      ],
      stats: [
        { value: '6', suffix: ' yrs', label: 'Senior Safety Engineer at TÜV Rheinland' },
        { value: '3', label: 'Continents of certification experience' },
        { value: '1st', label: 'IEC 61508-certified collaborative AMR' },
      ],
    },
  ],
}
