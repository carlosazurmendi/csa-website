/**
 * Seed — Testimonials collection.
 *
 * Client quotes lifted verbatim from the design export:
 *   design-reference/project/assets/case-studies.jsx  (CASES[].quote / author / affiliation)
 *   design-reference/project/Case Study.html          (testimonialRef — AMR Manufacturer)
 *   design-reference/project/assets/standing-apart.jsx (human-in-the-loop framing — not a quote, omitted)
 *
 * partners.jsx carries brand marks (no client quotes), so it contributes no
 * testimonial copy here.
 *
 * Schema (src/collections/Testimonials.ts):
 *   quote (required), authorName (required), authorRole, authorCompany,
 *   rating (1–5), logo (upload — omitted, seeded later), featured (checkbox).
 *
 * Slugs are not a schema field on this collection, but each doc carries a
 * stable `slug` so case-studies.ts can resolve testimonialRef via
 * { _ref: { collection: 'testimonials', slug } }. The master seed strips
 * the helper `slug` before create if the collection has no slug field.
 */

export const seed = {
  collection: 'testimonials',
  docs: [
    {
      slug: 'liebherr-mining-equipment',
      quote:
        'CSA’s understanding of the safety lifecycle and compliance pathways gave our organization clarity during a challenging project. They provided clear documentation, leadership, and actionable insights that improved both our design and our processes.',
      authorName: 'Erin Dalby',
      authorCompany: 'Liebherr Mining Equipment Newport News Co.',
      rating: 5,
      featured: true,
    },
    {
      slug: 'amr-manufacturer',
      quote:
        'Ben’s safety engineers supported us through the entire functional safety lifecycle, from hazard analysis to verification. CSA’s expertise in IEC 61508 and real-world implementation helped our engineering team avoid costly mistakes and stay ahead of schedule.',
      authorName: 'AMR Manufacturer',
      authorRole: 'Autonomous Mobile Robots',
      rating: 5,
      featured: true,
    },
    {
      slug: 'workcell-integrator',
      quote:
        'We partnered with CSA on a safety-critical robotic system, and the experience was outstanding. They delivered clear documentation, expert leadership, and actionable insights that improved both our design and our processes — without needing constant oversight from our engineers.',
      authorName: 'Workcell Integrator',
      authorRole: 'Robotic Workcells',
      rating: 5,
      featured: false,
    },
    {
      slug: 'machine-designer',
      quote:
        'CSA’s grasp of the safety lifecycle and compliance pathways gave us clarity during a difficult project. Their guidance made certification smooth and stress-free.',
      authorName: 'Machine Designer',
      authorRole: 'Machinery',
      rating: 5,
      featured: false,
    },
    {
      slug: 'safety-critical-component-manufacturer',
      quote:
        'Ben is incredibly easy to work with — knowledgeable, dependable, and always willing to go the extra mile. CSA is now our go-to partner for all functional safety needs.',
      authorName: 'Safety-Critical Component Manufacturer',
      authorRole: 'Safety-Critical Components',
      rating: 5,
      featured: false,
    },
    {
      slug: 'robotics-manufacturer',
      quote:
        'What stood out most was their honesty and commitment. Beyond checking the boxes, CSA helped us build a safer, more reliable product.',
      authorName: 'Robotics Manufacturer',
      authorRole: 'Robotics',
      rating: 5,
      featured: false,
    },
  ],
}
