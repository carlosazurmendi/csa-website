import type { Payload } from 'payload'

/**
 * Seeds the Training & Templates section from the design export:
 *   - upserts the `trainingTemplatesOverview` global (all page copy), and
 *   - clears + re-seeds the `templates` (4 bundles + 5 QMS + 12 FS = 21) and
 *     `courses` (3) collections with the real products/courses shown in the
 *     design (Purchase Templates + Course Catalog pages).
 *
 * Idempotent: the collections are cleared and recreated on each run; the global
 * is upserted. Prices are placeholders (Phase 1 has no checkout). Thumbnails /
 * media are left unset (no real assets in the export).
 *
 * Not yet wired into src/seed/index.ts (that file is owned elsewhere) — import
 * and call `await seedTraining(payload)` from there when ready.
 */
export async function seedTraining(payload: Payload): Promise<void> {
  payload.logger.info('— seedTraining starting —')

  // ---- Clear collections (idempotent) --------------------------------------
  await payload.delete({ collection: 'templates', where: { id: { exists: true } } })
  await payload.delete({ collection: 'courses', where: { id: { exists: true } } })

  // ==========================================================================
  // COURSES (3) — from Course Catalog.html
  // ==========================================================================
  const courses = [
    {
      title: 'IEC 61508 Industrial Functional Safety Professional (IFSP) Training',
      slug: 'iec-61508-ifsp',
      summary:
        'Flagship program that systematically simplifies the 10-part master standard — risk assessment, SIL determination, and software safety validation.',
      track: 'Robotics · Rail · Industrial Machinery',
      format: 'online' as const,
      credential: 'Certificate of completion',
      instructor: 'CSA Principal Safety Engineer',
      modules: [
        {
          title: 'Simplifying the 10-part standard',
          description: 'A structured walkthrough of the IEC 61508 master standard and how its parts fit together.',
        },
        { title: 'Risk assessment & SIL determination', description: 'Practical methods for determining target SIL.' },
        { title: 'Software safety requirement validation', description: 'Validating software against safety integrity requirements.' },
      ],
    },
    {
      title: 'Custom Floor-Ready Workshops',
      slug: 'custom-floor-ready-workshops',
      summary:
        'Hands-on sessions built around your team’s active hardware blueprints — translating regulatory text into real-world machine-building logic.',
      track: 'Robotics · Industrial Machinery',
      format: 'in-person' as const,
      credential: 'Certificate of completion',
      instructor: 'CSA Principal Safety Engineer',
      modules: [
        { title: 'Your hardware, your standards', description: 'Tailored to your active blueprints and components.' },
        { title: 'From regulatory text to machine logic', description: 'Implementing compliant safety controls without halting development speed.' },
      ],
    },
    {
      title: 'Independent Risk Assessment Facilitation Training',
      slug: 'independent-risk-assessment-facilitation',
      summary:
        'Train your staff in the investigative mindset of an independent challenger — bottom-up FMEA and top-down FTA to challenge internal design assumptions.',
      track: 'Robotics · Rail · Industrial Machinery',
      format: 'hybrid' as const,
      credential: 'Certificate of completion',
      instructor: 'CSA Principal Safety Engineer',
      modules: [
        { title: 'Bottom-up FMEA', description: 'The detective process of Failure Mode and Effects Analysis.' },
        { title: 'Top-down FTA', description: 'Deductive reasoning with Fault Tree Analysis.' },
        { title: 'Challenging design assumptions', description: 'Acting as an independent safety challenger.' },
      ],
    },
  ]
  for (let i = 0; i < courses.length; i++) {
    await payload.create({
      collection: 'courses',
      data: {
        ...courses[i],
        order: i,
        meta: { title: `${courses[i].title} | CSA Training`, description: courses[i].summary },
      },
    })
  }

  // ==========================================================================
  // TEMPLATES — from Purchase Templates.html
  //   standardFocus is stored as a "·"-joined string (the routes split it back
  //   into the multi-standard filter list). documentType holds the doc-type
  //   bucket label. whatsIncluded carries bundle inclusion chips.
  // ==========================================================================

  // --- 4 Compliance Bundles ---
  const bundles = [
    {
      title: 'Full Standards Compliance Suite',
      slug: 'full-standards-compliance-suite',
      description:
        'The complete, end-to-end documentation blueprint. Includes all 5 Quality Management System templates and all 12 Functional Safety lifecycle templates to bring your corporate workflows up to strict external audit-readiness.',
      standardFocus: 'IEC 61508 · ISO 13849 · ISO 26262 · Generic Safety Lifecycle',
      documentType: 'Plans',
      incl: ['All 5 QMS templates', 'All 12 FS templates'],
    },
    {
      title: 'Quality Management System (QMS) Compliance Bundle',
      slug: 'qms-compliance-bundle',
      description:
        'A packaged suite of core operational governance structures. All 5 foundational QMS templates needed to manage safety policies, configuration changes, documentation control, and design reviews.',
      standardFocus: 'Generic Safety Lifecycle',
      documentType: 'Plans',
      incl: ['Safety Policy', 'Config Management', 'Document Control', '+ 2 more'],
    },
    {
      title: 'Functional Safety Lifecycle Core Bundle',
      slug: 'fs-lifecycle-core-bundle',
      description:
        'Built for engineering teams managing an active project lifecycle. The critical deliverables third-party assessors require: Safety Management Plan, HARA, Safety Concept, and Safety Requirements Specification.',
      standardFocus: 'IEC 61508 · ISO 13849 · ISO 26262',
      documentType: 'Plans',
      incl: ['Safety Mgmt Plan', 'HARA', 'Safety Concept', 'SRS'],
    },
    {
      title: 'Risk & Reliability Engineering Model Bundle',
      slug: 'risk-reliability-model-bundle',
      description:
        'A specialized toolkit for deep-dive technical evaluations. Combines our FMEA template, Safety Reliability Calculation models, and Impact Analysis frameworks.',
      standardFocus: 'IEC 61508 · ISO 13849',
      documentType: 'Analytical Models & Tools',
      incl: ['FMEA', 'Reliability Calcs', 'Impact Analysis'],
    },
  ]

  // --- 5 QMS templates (all Word) ---
  const qms = [
    {
      title: 'Safety Policy Template',
      slug: 'safety-policy-template',
      description:
        'A high-level organizational framework outlining a company’s commitment to designing and managing systems that prevent hazardous failures.',
      standardFocus: 'Generic Safety Lifecycle',
      documentType: 'Plans',
      format: 'word' as const,
    },
    {
      title: 'Configuration Management Template',
      slug: 'configuration-management-template',
      description:
        'Policies, processes, and procedures ensuring hardware and software configurations are developed consistently, with change-control records and compliance evidence.',
      standardFocus: 'Generic Safety Lifecycle',
      documentType: 'Plans',
      format: 'word' as const,
    },
    {
      title: 'Document Control Template',
      slug: 'document-control-template',
      description:
        'A process blueprint for creating, reviewing, approving, storing, tracking, and distributing engineering documentation across revision cycles.',
      standardFocus: 'Generic Safety Lifecycle',
      documentType: 'Plans',
      format: 'word' as const,
    },
    {
      title: 'Work Product Review Template',
      slug: 'work-product-review-template',
      description:
        'A standardized process to evaluate deliverables against compliance targets, including step-by-step review and record logs.',
      standardFocus: 'Generic Safety Lifecycle',
      documentType: 'Plans',
      format: 'word' as const,
    },
    {
      title: 'Impact Analysis Report Template',
      slug: 'impact-analysis-report-template',
      description:
        'A change-management template to evaluate the consequences of a hardware or design modification on a safety-critical system.',
      standardFocus: 'Generic Safety Lifecycle',
      documentType: 'Reports & Concepts',
      format: 'word' as const,
    },
  ]

  // --- 12 FS templates ---
  const fs = [
    {
      title: 'Functional Safety Management Plan',
      slug: 'functional-safety-management-plan',
      description:
        'A master lifecycle document defining how functional safety is governed: responsibilities, toolsets, verification checkpoints, and compliance measures.',
      standardFocus: 'IEC 61508',
      documentType: 'Plans',
      format: 'word' as const,
    },
    {
      title: 'Hazard Analysis & Risk Assessment Report',
      slug: 'hazard-analysis-risk-assessment-report',
      description:
        'A structured methodology to identify hazards, evaluate operational risks, and determine target SIL/PL.',
      standardFocus: 'IEC 61508 · ISO 13849 · ISO 26262',
      documentType: 'Reports & Concepts',
      format: 'word' as const,
    },
    {
      title: 'Functional Safety Concept Template',
      slug: 'functional-safety-concept-template',
      description:
        'An architectural layout of safety mechanisms, fault-detection rules, mitigation strategies, and fail-safe behaviors.',
      standardFocus: 'IEC 61508 · ISO 26262',
      documentType: 'Reports & Concepts',
      format: 'word' as const,
    },
    {
      title: 'Safety Verification & Validation Plan',
      slug: 'safety-verification-validation-plan',
      description:
        'Methods, tools, and timelines to verify hardware performs safely and meets specified safety integrity.',
      standardFocus: 'IEC 61508 · Generic Safety Lifecycle',
      documentType: 'Plans',
      format: 'word' as const,
    },
    {
      title: 'Safety Verification & Validation Report',
      slug: 'safety-verification-validation-report',
      description: 'Formal, structured evidence that safety-related loops are tested and confirmed.',
      standardFocus: 'IEC 61508 · Generic Safety Lifecycle',
      documentType: 'Reports & Concepts',
      format: 'word' as const,
    },
    {
      title: 'Safety Requirements Specification',
      slug: 'safety-requirements-specification',
      description:
        'Concrete functional and integrity criteria for safety functions, translating hazard analyses into clear hardware boundaries.',
      standardFocus: 'IEC 61508 · ISO 13849',
      documentType: 'Reports & Concepts',
      format: 'word' as const,
    },
    {
      title: 'Requirements Management Process Template',
      slug: 'requirements-management-process-template',
      description:
        'A lifecycle guide for identifying, prioritizing, tracing, and controlling engineering requirements from concept through deployment. Works alongside requirements-management software such as DOORS or Polarion.',
      standardFocus: 'Generic Safety Lifecycle',
      documentType: 'Plans',
      format: 'word' as const,
    },
    {
      title: 'Safety Architecture & Design Specification Template',
      slug: 'safety-architecture-design-specification-template',
      description:
        'System component interactions, fail-safe mechanisms, fault-tolerant logic, and hardware diagnostics.',
      standardFocus: 'IEC 61508',
      documentType: 'Reports & Concepts',
      format: 'word' as const,
    },
    {
      title: 'Software Development Plan',
      slug: 'software-development-plan',
      description:
        'Project organization, programming environments, scheduling, milestone tracking, and QA workflows.',
      standardFocus: 'IEC 61508 · ISO 26262',
      documentType: 'Plans',
      format: 'word' as const,
    },
    {
      title: 'Safety Reliability Calculations Template',
      slug: 'safety-reliability-calculations-template',
      description:
        'An Excel modeling toolkit to calculate probability of dangerous failure per hour and safe failure fraction.',
      standardFocus: 'IEC 61508 · ISO 13849',
      documentType: 'Analytical Models & Tools',
      format: 'excel' as const,
    },
    {
      title: 'Failure Mode and Effects Analysis Template',
      slug: 'failure-mode-effects-analysis-template',
      description:
        'A bottom-up analytical template to decompose systems, map failure modes, evaluate diagnostic coverage, and document preventive designs.',
      standardFocus: 'IEC 61508 · ISO 13849 · ISO 26262',
      documentType: 'Analytical Models & Tools',
      format: 'excel' as const,
    },
    {
      title: 'Hardware Development Plan',
      slug: 'hardware-development-plan',
      description:
        'A roadmap for physical engineering programs: development approach, resource allocation, component testing, and configuration changes.',
      standardFocus: 'IEC 61508',
      documentType: 'Plans',
      format: 'word' as const,
    },
  ]

  // Insert in storefront order: bundles, then QMS, then FS.
  let order = 0
  for (const b of bundles) {
    await payload.create({
      collection: 'templates',
      data: {
        title: b.title,
        slug: b.slug,
        order: order++,
        description: b.description,
        category: 'compliance-bundle',
        standardFocus: b.standardFocus,
        documentType: b.documentType,
        price: '$—',
        whatsIncluded: b.incl.map((text) => ({ text })),
        isBundle: true,
        meta: { title: `${b.title} | CSA Templates`, description: b.description },
      },
    })
  }
  for (const t of qms) {
    await payload.create({
      collection: 'templates',
      data: {
        title: t.title,
        slug: t.slug,
        order: order++,
        description: t.description,
        category: 'qms',
        format: t.format,
        standardFocus: t.standardFocus,
        documentType: t.documentType,
        price: '$—',
        isBundle: false,
        meta: { title: `${t.title} | CSA Templates`, description: t.description },
      },
    })
  }
  for (const t of fs) {
    await payload.create({
      collection: 'templates',
      data: {
        title: t.title,
        slug: t.slug,
        order: order++,
        description: t.description,
        category: 'fs',
        format: t.format,
        standardFocus: t.standardFocus,
        documentType: t.documentType,
        price: '$—',
        isBundle: false,
        meta: { title: `${t.title} | CSA Templates`, description: t.description },
      },
    })
  }

  // ==========================================================================
  // GLOBAL — trainingTemplatesOverview (all page copy)
  // ==========================================================================
  await payload.updateGlobal({
    slug: 'trainingTemplatesOverview',
    data: {
      // ---- Overview page ----
      overviewHero: {
        crumb: 'Overview',
        ghost: 'TRAIN',
        title: 'Functional Safety\nTraining & Templates.',
        lead:
          'We believe functional safety should be accessible and practical. Our training programs and technical templates are built for the engineers who design real machines — bridging the gap between academic standards and real-world implementation to empower your internal teams.',
        primaryCtaLabel: 'Browse Courses',
        primaryCtaHref: '/training-templates/courses',
        secondaryCtaLabel: 'Shop Templates',
        secondaryCtaHref: '/training-templates/templates',
        standards: [{ label: 'IEC 61508' }, { label: 'ISO 13849' }, { label: 'ISO 26262' }],
      },
      ways: {
        eyebrow: 'Build internal capability',
        title: 'Two ways to build internal capability.',
        lead:
          'Whether you need your engineers up to speed on a standard or a defensible documentation set ready to fill in, we meet your team where it is.',
        items: [
          {
            num: '01',
            icon: 'graduation-cap',
            title: 'Training',
            description:
              'Practical, engineering-driven courses that turn dense standards into real-world practice — delivered as private virtual sessions or in-person custom workshops built around your team’s hardware.',
            meta: [
              { label: 'Private Virtual Sessions' },
              { label: 'In-Person Workshops' },
              { label: 'SGS-TÜV Saar Approved' },
            ],
            ctaLabel: 'Browse Courses',
            ctaHref: '/training-templates/courses',
          },
          {
            num: '02',
            icon: 'file-text',
            title: 'Templates',
            description:
              'Field-proven Word and Excel documentation toolsets that let your team build a defensible safety case without starting from scratch — compliant structures, standardized formatting, and clear required-content outlines.',
            meta: [{ label: 'Word & Excel' }, { label: 'Bundles & Individual' }, { label: 'Audit-Ready Structures' }],
            ctaLabel: 'Shop Templates',
            ctaHref: '/training-templates/templates',
          },
        ],
      },
      // ---- Course catalog page ----
      coursesHero: {
        crumb: 'Course Catalog',
        ghost: 'COURSES',
        title: 'Functional Safety\nCourse Catalog.',
        lead:
          'Practical functional safety training that simplifies the safety lifecycle — designed for working engineers, not just standards committees.',
        primaryCtaLabel: 'Explore Courses',
        primaryCtaHref: '#catalog',
        secondaryCtaLabel: 'Request a Private Course',
        secondaryCtaHref: '#',
      },
      why: {
        eyebrow: 'Why train with CSA',
        title: 'Training from engineers who certify real systems.',
        items: [
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
      },
      catalog: {
        eyebrow: 'Find your course',
        title: 'Filter courses.',
        lead: 'Narrow by industry, delivery format, or credential to find the right program for your team.',
      },
      offerings: {
        eyebrow: 'Core educational offerings',
        title: 'Three programs that translate standards into practice.',
        items: [
          {
            num: '01',
            title: 'IEC 61508 Industrial Functional Safety Professional (IFSP) Training',
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
      },
      coursesPrivate: {
        eyebrow: 'Private & custom delivery',
        title: 'Request a private course.',
        sub:
          'Bring any program to your team as a private virtual session or an in-person custom workshop — scheduled around your engineering calendar and tailored to your active hardware.',
        primaryLabel: 'Request a Private Course',
        primaryHref: '#',
        secondaryLabel: 'Talk to an instructor',
        secondaryHref: '#',
      },
      // ---- Purchase templates page ----
      templatesHero: {
        crumb: 'Purchase Templates',
        ghost: 'TEMPLATES',
        title: 'Functional Safety\nDocumentation Templates.',
        lead:
          'Jumpstart your compliance and certification preparation with professional, field-proven technical documentation templates. Each product delivers a Microsoft Word or Excel document featuring compliant engineering structures, standardized formatting, and clear outlines of the required contents — letting your internal teams build a defensible safety case without starting from scratch.',
        primaryCtaLabel: 'Shop All Templates',
        primaryCtaHref: '#store',
        secondaryCtaLabel: 'Talk to an Engineer',
        secondaryCtaHref: '#',
        standards: [
          { label: 'IEC 61508' },
          { label: 'ISO 13849' },
          { label: 'ISO 26262' },
          { label: 'Generic Safety Lifecycle' },
        ],
      },
      featured: {
        badge: 'Featured Bundle',
        icon: 'library',
        tag: '17 templates',
        title: 'Full Standards Compliance Suite',
        description:
          'The complete, end-to-end documentation blueprint — all 5 QMS templates and all 12 Functional Safety lifecycle templates for strict external audit-readiness.',
        chips: [{ label: 'All 5 QMS templates' }, { label: 'All 12 FS templates' }, { label: 'Word & Excel' }],
        priceMeta: '17 templates · best value',
        primaryLabel: 'Quick Checkout',
        secondaryLabel: 'Add to Cart',
      },
      store: {
        eyebrow: 'Filter templates',
        title: 'Build your documentation set.',
        lead:
          'Filter by category, standard focus, or document type to assemble exactly the templates your program needs. These toolsets slot in alongside your existing requirements-management and ALM tooling.',
        pricingNote:
          'Pricing to be added. Every template is available as part of a bundle or as an individual document.',
      },
      templatesClosing: {
        eyebrow: 'Shop all templates',
        title: 'Buy as a bundle, or one document at a time.',
        sub:
          'Field-proven Word & Excel templates that bridge academic standards and real-world implementation. Start with a compliance bundle for full coverage, or pick the individual documents your active project needs right now.',
        stats: [
          { value: '4', label: 'bundles' },
          { value: '17', label: 'individual templates' },
          { value: '', label: 'IEC 61508 · ISO 13849 · ISO 26262' },
        ],
        primaryLabel: 'Shop All Templates',
        primaryHref: '#store',
        secondaryLabel: 'Scope a custom bundle',
        secondaryHref: '#',
      },
      meta: {
        title: 'Functional Safety Training & Templates | CSA',
        description:
          'Practical functional safety training and field-proven Word & Excel documentation templates — built for engineers who design real machines. IEC 61508, ISO 13849, ISO 26262.',
      },
    },
  })

  payload.logger.info('— seedTraining complete (21 templates, 3 courses) —')
}
