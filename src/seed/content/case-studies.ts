/**
 * Seed — Case Studies collection.
 *
 * Copy lifted verbatim from the design export:
 *   design-reference/project/Case Study.html             (the AMR detail page — full Problem/Solution/Result)
 *   design-reference/project/assets/case-study-detail.jsx (field map / section shape)
 *   design-reference/project/assets/case-studies.jsx      (carousel CASES — sectors, descriptions, related)
 *   design-reference/project/Company/Experience.html → assets/company.jsx (caseItems: AMR + mining fleet)
 *
 * Schema (src/collections/CaseStudies.ts):
 *   title (required), slug, sector, heroBadge,
 *   client { clientName, role, logo(upload) },
 *   heroImage(upload), lead,
 *   glance { industry, engagement, outcome, outcomeSub },
 *   standards[] { code },
 *   problem  { body(richText), points[] { title, description } },
 *   solution { body(richText), points[] { title, description } },
 *   result   { body(richText), metrics[] { value, label } },
 *   body(richText), metrics[] { value, label },
 *   testimonialRef (relationship → testimonials),
 *   related (relationship → case-studies, hasMany),
 *   closing { eyebrow, title, sub, buttons[] (ctaField) }, seo.
 *
 * Upload fields (client.logo, heroImage, seo.ogImage) are omitted — seeded later.
 * richText fields use the default Lexical editor state shape via rt().
 * Relationships use { _ref: { collection, slug } } resolved by the master seed.
 *
 * ctaField('buttons') produces an array of link rows. From src/fields/link.ts the
 * row carries { label, href, style } where style is 'primary' | 'secondary' | 'glass'.
 * The closing CTA on the detail page is a single primary (gold pill) button →
 * Book a Consultation.
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
  collection: 'case-studies',
  docs: [
    /* ============================================================
       1 · COLLABORATIVE AMR — IEC 61508 (the full detail page)
       Source: Case Study.html
       ============================================================ */
    {
      title: 'First-ever IEC 61508 certification for a collaborative AMR',
      slug: 'collaborative-amr-iec-61508-certification',
      sector: 'Robotics · Autonomous Mobile Robots',
      heroBadge: 'First-ever IEC 61508 certification — collaborative AMR',
      client: {
        clientName: 'Fortune 500 Robotics Manufacturer',
        role: 'Collaborative autonomous mobile robots',
      },
      lead: 'A Fortune 500 robotics manufacturer needed to deploy collaborative autonomous mobile robots into high-speed, human-shared facilities — with no mature regulatory blueprint to follow. CSA built the validation pathway from the ground up.',
      glance: {
        industry: 'Autonomous Mobile Robots',
        engagement: 'Embedded support + independent assessment',
        outcome: 'Certified',
        outcomeSub: 'First-ever collaborative AMR to IEC 61508',
      },
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 3691-4' }, { code: 'ISO 13849' }],
      problem: {
        body: rt(
          'The client was deploying collaborative AMRs into high-speed, human-shared facility environments — mixed zones where robots and people occupy the same floor. There was no mature regulatory blueprint for this class of system, and no independent validation framework to demonstrate the robots were functionally safe.',
          'Without an established certification path, the program faced two compounding risks: an architecture that might not withstand independent scrutiny, and a launch timeline exposed to late-stage findings that could force a redesign.',
        ),
        points: [
          {
            title: 'No regulatory precedent',
            description:
              'No prior collaborative AMR had been certified to IEC 61508 — the path had to be defined, not followed.',
          },
          {
            title: 'Human-shared, high-speed operation',
            description:
              'Mixed-zone personnel tracking under ISO 3691-4 raised the bar for hazard analysis and risk reduction.',
          },
          {
            title: 'No internal validation framework',
            description:
              'The team needed independent technical evidence that certifiers and regulators would accept.',
          },
        ],
      },
      solution: {
        body: rt(
          'CSA embedded with the engineering team as an independent technical challenger, building the safety case alongside the design rather than auditing it after the fact. We executed rigorous safety audits, managed requirements traceability across the full lifecycle, and led the third-party assessment interfaces end to end.',
          'Because we never build the product we assess, our validation carried the independence certifiers expect — letting the client present a clean, defensible argument at every gate.',
        ),
        points: [
          {
            title: 'Rigorous safety audits',
            description:
              'Independent gap analyses and hardware safety validation against IEC 61508 systematic-capability targets.',
          },
          {
            title: 'End-to-end requirements traceability',
            description:
              'Every safety requirement tied to its source hazard and its verification evidence across the V-model.',
          },
          {
            title: 'Led third-party assessment interfaces',
            description:
              'Acted as the technical bridge to assessors so the certification argument was presented clearly and completely.',
          },
        ],
      },
      result: {
        body: rt(
          'The platform achieved the first-ever IEC 61508 certification for a collaborative autonomous mobile robot — establishing both the client’s product and the validation pathway itself as a reference for the category.',
        ),
        metrics: [
          { value: '1st', label: 'IEC 61508 certification for a collaborative AMR — an industry first.' },
          { value: '100%', label: 'Safety requirements traced from source hazard through verification evidence.' },
          { value: '3', label: 'Standards navigated in parallel: IEC 61508, ISO 3691-4, ISO 13849.' },
        ],
      },
      testimonialRef: { _ref: { collection: 'testimonials', slug: 'amr-manufacturer' } },
      related: [
        { _ref: { collection: 'case-studies', slug: 'heavy-mining-equipment-autonomous-fleet' } },
        { _ref: { collection: 'case-studies', slug: 'safety-critical-robotic-workcell' } },
        { _ref: { collection: 'case-studies', slug: 'liebherr-mining-equipment-compliance-pathway' } },
      ],
      closing: {
        eyebrow: 'Your system is specific',
        title: 'Discuss Your Project.',
        sub: 'Bring us your toughest safety-critical program. We’ll map the path from where you are to certification — independently, and ahead of schedule.',
        buttons: [
          {
            label: 'Discuss Your Project',
            href: 'Book a Consultation.html',
            style: 'primary',
          },
        ],
      },
      seo: {
        metaTitle: 'First-Ever IEC 61508 Certification for a Collaborative AMR',
        metaDescription:
          'How CSA guided a Fortune 500 robotics manufacturer to the first-ever IEC 61508 certification for a collaborative autonomous mobile robot — problem, solution, and result.',
      },
    },

    /* ============================================================
       2 · HEAVY MINING EQUIPMENT AUTONOMOUS FLEET
       Source: Experience.html caseItems[1] (company.jsx) + case-study-detail related card
       ============================================================ */
    {
      title: 'Heavy mining equipment autonomous fleet certification',
      slug: 'heavy-mining-equipment-autonomous-fleet',
      sector: 'Construction & Mining',
      heroBadge: 'Full international market certification',
      lead: 'Transitioning high-energy haulage and drilling machinery to full autonomy in harsh, unpredictable environments — with zero legacy safety infrastructure to build on.',
      glance: {
        industry: 'Construction & Mining',
        engagement: 'Full functional safety lifecycle',
        outcome: 'Certified',
        outcomeSub: 'Full international market certification',
      },
      problem: {
        body: rt(
          'Transitioning high-energy haulage and drilling machinery to full autonomy in harsh, unpredictable environments with zero legacy safety infrastructure. The platform combined extreme stored energy with autonomous operation in conditions where no prior safety framework existed.',
        ),
      },
      solution: {
        body: rt(
          'Established full functional safety lifecycles, performed systematic Preliminary Hazard Analyses, and guided the platform to full international market certification.',
        ),
      },
      result: {
        body: rt(
          'Full functional safety lifecycles and systematic PHAs guided a high-energy haulage platform to international market certification.',
        ),
      },
      related: [
        { _ref: { collection: 'case-studies', slug: 'collaborative-amr-iec-61508-certification' } },
        { _ref: { collection: 'case-studies', slug: 'safety-critical-robotic-workcell' } },
      ],
      closing: {
        eyebrow: 'Your system is specific',
        title: 'Discuss Your Project.',
        sub: 'Bring us your toughest safety-critical program. We’ll map the path from where you are to certification — independently, and ahead of schedule.',
        buttons: [
          {
            label: 'Discuss Your Project',
            href: 'Book a Consultation.html',
            style: 'primary',
          },
        ],
      },
      seo: {
        metaTitle: 'Heavy Mining Equipment Autonomous Fleet Certification | CSA',
        metaDescription:
          'CSA established full functional safety lifecycles and systematic PHAs that guided a high-energy autonomous haulage platform to international market certification.',
      },
    },

    /* ============================================================
       3 · SAFETY-CRITICAL ROBOTIC WORKCELL
       Source: case-study-detail related card + case-studies.jsx (Workcell Integrator)
       ============================================================ */
    {
      title: 'Safety-critical robotic workcell system',
      slug: 'safety-critical-robotic-workcell',
      sector: 'Robotic Workcells',
      lead: 'A safety-critical robotic workcell delivered with clear documentation, expert leadership, and actionable insights — without needing constant oversight from the client’s engineers.',
      glance: {
        industry: 'Robotic Workcells',
        engagement: 'Embedded support',
        outcome: 'Delivered',
        outcomeSub: 'Documentation, leadership & insights',
      },
      problem: {
        body: rt(
          'The client needed a safety-critical robotic workcell taken through to a defensible safety case, but lacked the bandwidth to supervise the work closely. They needed a partner who could operate independently and still deliver assessor-ready results.',
        ),
      },
      solution: {
        body: rt(
          'CSA delivered clear documentation, expert leadership, and actionable insights that improved both the design and the underlying processes — operating as a trusted extension of the team rather than a vendor requiring constant direction.',
        ),
      },
      result: {
        body: rt(
          'Clear documentation, expert leadership, and actionable insights — delivered without constant oversight from the client’s engineers, improving both the design and the development process.',
        ),
      },
      testimonialRef: { _ref: { collection: 'testimonials', slug: 'workcell-integrator' } },
      related: [
        { _ref: { collection: 'case-studies', slug: 'collaborative-amr-iec-61508-certification' } },
        { _ref: { collection: 'case-studies', slug: 'liebherr-mining-equipment-compliance-pathway' } },
      ],
      closing: {
        eyebrow: 'Your system is specific',
        title: 'Discuss Your Project.',
        sub: 'Bring us your toughest safety-critical program. We’ll map the path from where you are to certification — independently, and ahead of schedule.',
        buttons: [
          {
            label: 'Discuss Your Project',
            href: 'Book a Consultation.html',
            style: 'primary',
          },
        ],
      },
      seo: {
        metaTitle: 'Safety-Critical Robotic Workcell System | CSA Case Study',
        metaDescription:
          'CSA delivered a safety-critical robotic workcell with clear documentation, expert leadership, and actionable insights — without constant oversight from the client’s engineers.',
      },
    },

    /* ============================================================
       4 · LIEBHERR MINING EQUIPMENT COMPLIANCE PATHWAY
       Source: case-study-detail related card + case-studies.jsx (Liebherr / Erin Dalby)
       ============================================================ */
    {
      title: 'Liebherr Mining Equipment compliance pathway',
      slug: 'liebherr-mining-equipment-compliance-pathway',
      sector: 'Mining Equipment',
      client: {
        clientName: 'Liebherr Mining Equipment Newport News Co.',
        role: 'Mining Equipment',
      },
      lead: 'Safety-lifecycle and compliance-pathway guidance that brought clarity to a challenging program — improving both the design and the process behind it.',
      glance: {
        industry: 'Mining Equipment',
        engagement: 'Safety lifecycle & compliance guidance',
        outcome: 'Clarity',
        outcomeSub: 'Improved design & process',
      },
      problem: {
        body: rt(
          'A challenging mining-equipment program needed clarity around the safety lifecycle and the right compliance pathway. The organization needed documentation, leadership, and direction it could trust to move the program forward.',
        ),
      },
      solution: {
        body: rt(
          'CSA brought an understanding of the safety lifecycle and compliance pathways that gave the organization clarity during a challenging project — providing clear documentation, leadership, and actionable insights.',
        ),
      },
      result: {
        body: rt(
          'Safety-lifecycle and compliance-pathway guidance that brought clarity to a challenging program and improved both design and process.',
        ),
      },
      testimonialRef: { _ref: { collection: 'testimonials', slug: 'liebherr-mining-equipment' } },
      related: [
        { _ref: { collection: 'case-studies', slug: 'collaborative-amr-iec-61508-certification' } },
        { _ref: { collection: 'case-studies', slug: 'heavy-mining-equipment-autonomous-fleet' } },
      ],
      closing: {
        eyebrow: 'Your system is specific',
        title: 'Discuss Your Project.',
        sub: 'Bring us your toughest safety-critical program. We’ll map the path from where you are to certification — independently, and ahead of schedule.',
        buttons: [
          {
            label: 'Discuss Your Project',
            href: 'Book a Consultation.html',
            style: 'primary',
          },
        ],
      },
      seo: {
        metaTitle: 'Liebherr Mining Equipment Compliance Pathway | CSA',
        metaDescription:
          'Safety-lifecycle and compliance-pathway guidance from CSA brought clarity to a challenging Liebherr Mining Equipment program — improving both design and process.',
      },
    },
  ],
}
