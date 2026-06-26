/**
 * Seed copy for the Training & Templates landing/listing pages.
 * Copy lifted verbatim from the design export under
 * design-reference/project/Training - Templates/*.html.
 *
 * richText (heroLead) uses the Lexical default root shape so it imports cleanly.
 */

const lead = (text: string) => ({
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
  collection: 'training-templates',
  docs: [
    /* ============================================================ 1. OVERVIEW */
    {
      title: 'Overview',
      slug: 'overview',
      order: 0,
      navLabel: 'Overview',

      heroCrumb: 'Overview',
      heroGhost: 'TRAIN',
      heroTitle: 'Functional Safety\nTraining & Templates.',
      heroLead: lead(
        'We believe functional safety should be accessible and practical. Our training programs and technical templates are built for the engineers who design real machines — bridging the gap between academic standards and real-world implementation to empower your internal teams.',
      ),
      heroPrimaryCta: 'Browse Courses',
      heroSecondaryCta: 'Shop Templates',
      heroStandards: [
        { label: 'IEC 61508' },
        { label: 'ISO 13849' },
        { label: 'ISO 26262' },
      ],

      waysEyebrow: 'Build internal capability',
      waysHeading: 'Two ways to build internal capability.',
      waysLead:
        'Whether you need your engineers up to speed on a standard or a defensible documentation set ready to fill in, we meet your team where it is.',
      waysItems: [
        {
          num: '01',
          icon: 'graduation-cap',
          title: 'Training',
          desc: 'Practical, engineering-driven courses that turn dense standards into real-world practice — delivered as private virtual sessions or in-person custom workshops built around your team’s hardware.',
          meta: [
            { label: 'Private Virtual Sessions' },
            { label: 'In-Person Workshops' },
            { label: 'SGS-TÜV Saar Approved' },
          ],
          cta: 'Browse Courses',
        },
        {
          num: '02',
          icon: 'file-text',
          title: 'Templates',
          desc: 'Field-proven Word and Excel documentation toolsets that let your team build a defensible safety case without starting from scratch — compliant structures, standardized formatting, and clear required-content outlines.',
          meta: [
            { label: 'Word & Excel' },
            { label: 'Bundles & Individual' },
            { label: 'Audit-Ready Structures' },
          ],
          cta: 'Shop Templates',
        },
      ],

      seo: {
        metaTitle: 'Functional Safety Training & Templates | CSA',
        metaDescription:
          'Practical functional safety training and field-proven Word/Excel templates — IEC 61508, ISO 13849, ISO 26262. Bridge academic standards and real-world engineering.',
      },
    },

    /* ====================================================== 2. DIGITAL COURSES */
    {
      title: 'Digital Courses',
      slug: 'digital-courses',
      order: 1,
      navLabel: 'Digital Courses',

      heroCrumb: 'Digital Courses',
      heroGhost: 'LEARN',
      heroTitle: 'Functional safety training,\nbuilt for working engineers.',
      heroLead: lead(
        'Practical, on-demand and private courses that turn dense standards into real-world practice — taught by the principal engineers who certify real systems. Train your team on the exact standards your products must meet.',
      ),
      heroPrimaryCta: 'Browse the Course Catalog',
      heroSecondaryCta: 'Talk to an Instructor',
      heroStandards: [
        { label: 'SGS-TÜV Saar approved partner' },
        { label: 'Certificate of completion' },
        { label: 'On-demand & private programs' },
      ],

      valEyebrow: 'Why train with CSA',
      valHeading: 'Training from engineers who certify real systems.',
      valItems: [
        {
          icon: 'user-check',
          title: 'Taught by practitioners',
          body: 'Principal safety engineers who certify real systems — not career instructors.',
        },
        {
          icon: 'cpu',
          title: 'Built around your hardware',
          body: 'Workshops tailored to your team’s active blueprints and components.',
        },
        {
          icon: 'badge-check',
          title: 'Approved partner credentials',
          body: 'Flagship IEC 61508 training delivered as an approved SGS-TÜV Saar partner.',
        },
        {
          icon: 'shield-check',
          title: 'Defensible decision-making',
          body: 'Every course centers on failure modes, lessons learned, and audit-ready reasoning.',
        },
      ],

      trkEyebrow: 'Learning tracks',
      trkHeading: 'Choose your industry track.',
      trkLead:
        'Every program is grounded in the standards and hazards of a specific sector. Pick the track that matches your systems — or browse the full catalog.',
      trkItems: [
        {
          name: 'Robotics',
          icon: 'bot',
          standards: 'ISO 10218 · ISO 3691-4 · ISO 13849',
          desc: 'Safe design for industrial, collaborative, and mobile robots operating in unstructured, human-shared environments.',
          linkLabel: 'Explore Robotics courses',
        },
        {
          name: 'Rail',
          icon: 'train-front',
          standards: 'EN 50126 · EN 50128 · EN 50129',
          desc: 'Fail-safe signaling, train-control architectures, and certifiable safety cases across the RAMS lifecycle.',
          linkLabel: 'Explore Rail courses',
        },
        {
          name: 'Industrial Machinery',
          icon: 'cog',
          standards: 'ISO 12100 · ISO 13849 · IEC 62061',
          desc: 'Compliant, defensible safety architectures and Performance Level verification for fixed and mobile machinery.',
          linkLabel: 'Explore Industrial Machinery courses',
        },
      ],

      instrEyebrow: 'Taught by the founder',
      instrHeading: 'Learn from the engineer who certifies these systems.',
      instrPortraitTag: 'Your instructor',

      ctaEyebrow: 'Private & custom delivery',
      ctaHeading: 'Want a program built for your team?',
      ctaSub:
        'Bring any course to your engineers as a private virtual session or an in-person custom workshop — scheduled around your calendar and tailored to your active hardware.',
      ctaPrimary: 'Request a Private Course',
      ctaSecondary: 'Browse the catalog',

      seo: {
        metaTitle: 'Digital Courses & On-Demand Functional Safety Training | CSA',
        metaDescription:
          "On-demand functional safety training built for working engineers — learning tracks for Robotics, Rail, and Industrial Machinery, taught by CSA's principal safety engineers.",
      },
    },

    /* ======================================================= 3. COURSE CATALOG */
    {
      title: 'Course Catalog',
      slug: 'course-catalog',
      order: 2,
      navLabel: 'Course Catalog',

      heroCrumb: 'Course Catalog',
      heroGhost: 'COURSES',
      heroTitle: 'Functional Safety\nCourse Catalog.',
      heroLead: lead(
        'Practical functional safety training that simplifies the safety lifecycle — designed for working engineers, not just standards committees.',
      ),
      heroPrimaryCta: 'Explore Courses',
      heroSecondaryCta: 'Request a Private Course',

      valEyebrow: 'Why train with CSA',
      valHeading: 'Training from engineers who certify real systems.',
      valItems: [
        {
          icon: 'user-check',
          title: 'Taught by practitioners',
          body: 'Principal safety engineers who certify real systems — not career instructors.',
        },
        {
          icon: 'cpu',
          title: 'Built around your hardware',
          body: 'Workshops can be tailored to your team’s active blueprints and components.',
        },
        {
          icon: 'badge-check',
          title: 'Approved partner credentials',
          body: 'Flagship IEC 61508 training delivered as an approved SGS-TÜV Saar partner.',
        },
        {
          icon: 'shield-check',
          title: 'Defensible decision-making',
          body: 'Every course centers on failure modes, lessons learned, and audit-ready reasoning.',
        },
      ],

      filtEyebrow: 'Find your course',
      filtHeading: 'Filter courses.',
      filtLead:
        'Narrow by industry, delivery format, or credential to find the right program for your team.',
      filtNote: 'Live courses populated via Payload CMS',

      offEyebrow: 'Core educational offerings',
      offHeading: 'Three programs that translate standards into practice.',
      offItems: [
        {
          num: '01',
          title:
            'IEC 61508 Industrial Functional Safety Professional (IFSP) Training',
          body: 'Our flagship program, delivered directly as an approved SGS-TÜV Saar partner. Systematically simplifies the 10-part structure of the master standard, with practical guidance on risk assessment, Safety Integrity Level (SIL) determination, and software safety requirement validation.',
          badge: 'Flagship · SGS-TÜV Saar',
          meta: 'IEC 61508',
        },
        {
          num: '02',
          title: 'Custom Floor-Ready Workshops',
          body: 'Fully customized, hands-on sessions built around your engineering team’s active hardware blueprints and system components. We translate dense regulatory text into real-world machine-building logic, so your engineers can implement compliant safety controls without halting development speed.',
          badge: 'Tailored · In-Person',
          meta: 'Your hardware',
        },
        {
          num: '03',
          title: 'Independent Risk Assessment Facilitation Training',
          body: 'An engineering workshop that trains your internal staff in the investigative mindset of an independent safety challenger. Your team masters the bottom-up detective process of Failure Mode and Effects Analysis (FMEA) and the top-down deductive reasoning of Fault Tree Analysis (FTA) to confidently challenge internal design assumptions.',
          badge: 'Workshop · FMEA + FTA',
          meta: 'Risk analysis',
        },
      ],

      ctaEyebrow: 'Private & custom delivery',
      ctaHeading: 'Request a private course.',
      ctaSub:
        'Bring any program to your team as a private virtual session or an in-person custom workshop — scheduled around your engineering calendar and tailored to your active hardware.',
      ctaPrimary: 'Request a Private Course',
      ctaSecondary: 'Talk to an instructor',

      seo: {
        metaTitle: 'Functional Safety Courses | IEC 61508 Training | CSA',
        metaDescription:
          'Functional safety training from an approved SGS-TÜV Saar partner — IEC 61508 IFSP, custom floor-ready workshops, and independent risk assessment (FMEA/FTA) facilitation.',
      },
    },

    /* =================================================== 4. PURCHASE TEMPLATES */
    {
      title: 'Purchase Templates',
      slug: 'purchase-templates',
      order: 3,
      navLabel: 'Purchase Templates',

      heroCrumb: 'Templates Storefront',
      heroGhost: 'TEMPLATES',
      heroTitle: 'Functional Safety\nDocumentation Templates.',
      heroLead: lead(
        'Jumpstart your compliance and certification preparation with field-proven Word & Excel templates — compliant engineering structures, standardized formatting, and clear required-content outlines that let your team build a defensible safety case without starting from scratch.',
      ),
      heroPrimaryCta: 'Shop All Templates',
      heroSecondaryCta: 'Browse & Search',
      heroStandards: [
        { label: 'IEC 61508' },
        { label: 'ISO 13849' },
        { label: 'ISO 26262' },
      ],

      catEyebrow: 'Shop by category',
      catHeading: 'Bundles, governance, and lifecycle documents.',
      catItems: [
        {
          icon: 'layers',
          name: 'Compliance Bundles',
          desc: 'Packaged sets that bring whole workflows up to audit-readiness for one bundled price.',
        },
        {
          icon: 'folder-cog',
          name: 'Quality Management',
          desc: 'Foundational governance — safety policy, configuration, document control, and reviews.',
        },
        {
          icon: 'shield-check',
          name: 'Functional Safety',
          desc: 'Lifecycle deliverables assessors expect: management plan, HARA, concept, SRS, FMEA.',
        },
      ],

      filtEyebrow: 'Filter templates',
      filtHeading: 'Build your documentation set.',
      filtLead:
        'Filter by category, standard focus, or document type to assemble exactly the templates your program needs. Add to cart, or buy instantly with one-click checkout.',
      filtNote:
        'Prices are managed in Payload. Every template is available individually or as part of a bundle — buy instantly with one-click checkout.',

      ctaEyebrow: 'Shop all templates',
      ctaHeading: 'Buy as a bundle, or one document at a time.',
      ctaSub:
        'Field-proven Word & Excel templates that bridge academic standards and real-world implementation. Start with a compliance bundle for full coverage, or pick the individual documents your active project needs right now.',
      ctaPrimary: 'Browse & Search All',
      ctaSecondary: 'Scope a custom bundle',
      ctaStats: [
        { label: '4 bundles' },
        { label: '17 individual templates' },
        { label: 'IEC 61508 · ISO 13849 · ISO 26262' },
      ],

      seo: {
        metaTitle: 'Functional Safety Templates | IEC 61508, ISO 13849, ISO 26262 | CSA',
        metaDescription:
          'Field-proven Word & Excel functional safety templates — HARA, FMEA, safety plans, and requirements management. Buy bundles or individual docs with one-click checkout.',
      },
    },

    /* ================================================ 5. BROWSE ALL TEMPLATES */
    {
      title: 'Browse All Templates',
      slug: 'browse-all-templates',
      order: 4,
      navLabel: 'Browse All Templates',

      heroCrumb: 'Browse All',
      heroTitle: 'Browse all templates.',
      heroLead: lead(
        'Search the full library and filter by category, standard focus, or document type. Every product is an instant Word or Excel download — add to cart or buy in one click.',
      ),

      filtEyebrow: 'Search & results',
      filtHeading: 'Browse all templates.',
      filtLead:
        'Search the full library and filter by category, standard focus, or document type. Every product is an instant Word or Excel download — add to cart or buy in one click.',
      filtNote: 'Search templates — HARA, FMEA, SIL, EN 50129…',

      seo: {
        metaTitle: 'Browse All Templates | Functional Safety Documentation | CSA',
        metaDescription:
          "Search and filter CSA's full library of functional safety templates — bundles and individual Word & Excel documents for IEC 61508, ISO 13849, and ISO 26262.",
      },
    },
  ],
}
