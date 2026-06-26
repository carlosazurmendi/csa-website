/**
 * Seed: products collection (templates store).
 *
 * Real copy + prices (cents) lifted from
 * design-reference/project/assets/templates-data.js — all 4 compliance bundles,
 * 5 QMS documents, and 12 Functional Safety documents (21 products total).
 *
 * Schema source: src/collections/Products.ts
 *   - type: 'document' | 'bundle'; category from the CAT vocabulary.
 *   - standards[]: source string[] mapped → [{ code }].
 *   - description is richText (Lexical root shape via richText()).
 *   - whatsIncluded[]: { item } — lifted from the export's whatsIncluded() helper
 *     (per-document by format; per-bundle by member count).
 *   - includes (bundles only): relationship → products, expressed as
 *     [{ _ref: { collection: 'products', slug } }]; master seed resolves to ids.
 *   - format 'Bundle' has no `pages` in the source — omitted for bundles.
 *   - thumbnail / downloadableFile (uploads) omitted — seeded later.
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

const ref = (slug: string) => ({ _ref: { collection: 'products', slug } })

// "What's included" checklist for a single document, keyed by file format
// (mirrors whatsIncluded() in templates-data.js).
const docIncluded = (format: 'Word' | 'Excel') => {
  const fmtline =
    format === 'Excel'
      ? 'Microsoft Excel (.xlsx) workbook with live, documented formulas'
      : 'Microsoft Word (.docx) source file, fully editable'
  return [
    fmtline,
    'Pre-built, standard-compliant section structure',
    'Required-content prompts and guidance notes throughout',
    'Worked example entries you can adapt to your system',
    'Free updates and revisions for 12 months',
  ].map((item) => ({ item }))
}

// "What's included" checklist for a bundle (mirrors whatsIncluded() in templates-data.js).
const bundleIncluded = (memberCount: number) =>
  [
    `${memberCount} individual templates in a single combined download`,
    'Every member document in its native Microsoft Word or Excel format',
    'Consistent structure and cross-references across the whole set',
    'One bundled price below the sum of the individual documents',
    'Free updates and revisions for 12 months',
  ].map((item) => ({ item }))

const CAT = {
  BUNDLE: 'Compliance Bundles',
  QMS: 'Quality Management System (QMS)',
  FS: 'Functional Safety Engineering (FS)',
}

export const seed = {
  collection: 'products',
  docs: [
    /* ============================================================ COMPLIANCE BUNDLES (4) */
    {
      slug: 'full-suite',
      code: 'SUITE-17',
      title: 'Full Standards Compliance Suite',
      type: 'bundle',
      category: CAT.BUNDLE,
      format: 'Bundle',
      price: 199000,
      icon: 'library',
      badge: 'Best value',
      featured: true,
      popular: true,
      standards: [
        { code: 'IEC 61508' },
        { code: 'ISO 13849' },
        { code: 'ISO 26262' },
        { code: 'Generic Safety Lifecycle' },
      ],
      docType: 'Plans',
      summary:
        'The complete, end-to-end documentation blueprint — all 5 QMS templates and all 12 Functional Safety lifecycle templates for strict external audit-readiness.',
      description: richText(
        'The complete documentation blueprint for an organization that wants every base covered. The Full Standards Compliance Suite bundles all five Quality Management System templates and all twelve Functional Safety lifecycle templates into a single download — the fastest way to bring corporate workflows up to strict, externally auditable readiness.',
      ),
      whatsIncluded: bundleIncluded(17),
      includes: [
        ref('safety-policy'),
        ref('config-mgmt'),
        ref('doc-control'),
        ref('work-review'),
        ref('impact-analysis'),
        ref('fsmp'),
        ref('hara'),
        ref('fs-concept'),
        ref('svvp'),
        ref('svvr'),
        ref('srs'),
        ref('req-mgmt'),
        ref('safety-arch'),
        ref('sdp'),
        ref('reliability'),
        ref('fmea'),
        ref('hdp'),
      ],
    },
    {
      slug: 'qms-bundle',
      code: 'QMS-5',
      title: 'Quality Management System (QMS) Compliance Bundle',
      type: 'bundle',
      category: CAT.BUNDLE,
      format: 'Bundle',
      price: 59900,
      icon: 'folder-cog',
      standards: [{ code: 'Generic Safety Lifecycle' }],
      docType: 'Plans',
      summary:
        'All 5 foundational QMS templates needed to manage safety policies, configuration changes, documentation control, and design reviews.',
      description: richText(
        'A packaged suite of core operational governance structures. The QMS bundle collects all five foundational quality-management templates — the policy, control, and review processes that surround every functional-safety project — so your organization’s governance layer is consistent, complete, and audit-ready.',
      ),
      whatsIncluded: bundleIncluded(5),
      includes: [
        ref('safety-policy'),
        ref('config-mgmt'),
        ref('doc-control'),
        ref('work-review'),
        ref('impact-analysis'),
      ],
    },
    {
      slug: 'fs-core',
      code: 'FS-CORE-4',
      title: 'Functional Safety Lifecycle Core Bundle',
      type: 'bundle',
      category: CAT.BUNDLE,
      format: 'Bundle',
      price: 89900,
      icon: 'shield-check',
      badge: 'Most popular',
      popular: true,
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }, { code: 'ISO 26262' }],
      docType: 'Reports & Concepts',
      summary:
        'The critical deliverables third-party assessors require: Safety Management Plan, HARA, Safety Concept, and Safety Requirements Specification.',
      description: richText(
        'Built for engineering teams managing an active project lifecycle. The Core bundle gathers the four deliverables a third-party assessor will always ask for first — the Functional Safety Management Plan, HARA, Safety Concept, and Safety Requirements Specification — giving your project a defensible spine from kick-off.',
      ),
      whatsIncluded: bundleIncluded(4),
      includes: [ref('fsmp'), ref('hara'), ref('fs-concept'), ref('srs')],
    },
    {
      slug: 'risk-model',
      code: 'RISK-3',
      title: 'Risk & Reliability Engineering Model Bundle',
      type: 'bundle',
      category: CAT.BUNDLE,
      format: 'Bundle',
      price: 49900,
      icon: 'calculator',
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }],
      docType: 'Analytical Models & Tools',
      summary:
        'A specialized toolkit for deep-dive technical evaluations — the FMEA template, Safety Reliability Calculation models, and Impact Analysis frameworks.',
      description: richText(
        'A specialized toolkit for the engineers doing the deep quantitative work. This bundle combines the FMEA workbook, the Safety Reliability Calculations model, and the Impact Analysis report framework — everything a reliability team needs to decompose, quantify, and defend the integrity of a safety function.',
      ),
      whatsIncluded: bundleIncluded(3),
      includes: [ref('fmea'), ref('reliability'), ref('impact-analysis')],
    },

    /* ============================================================ QMS DOCUMENTS (5) */
    {
      slug: 'safety-policy',
      code: 'QMS-POL',
      title: 'Safety Policy Template',
      type: 'document',
      category: CAT.QMS,
      icon: 'shield',
      format: 'Word',
      pages: 12,
      price: 14900,
      standards: [{ code: 'Generic Safety Lifecycle' }],
      docType: 'Plans',
      summary:
        'A high-level organizational framework outlining a company’s commitment to designing and managing systems that prevent hazardous failures.',
      description: richText(
        'The Safety Policy is the apex document of a functional-safety management system — the statement of intent that every downstream plan, review, and audit traces back to. This template gives you a board-ready structure: scope, safety objectives, roles and accountabilities, and the commitment statements assessors expect to see signed at the top of the organization.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'config-mgmt',
      code: 'QMS-CM',
      title: 'Configuration Management Template',
      type: 'document',
      category: CAT.QMS,
      icon: 'git-branch',
      format: 'Word',
      pages: 18,
      price: 17900,
      standards: [{ code: 'Generic Safety Lifecycle' }],
      docType: 'Plans',
      summary:
        'Policies, processes, and procedures ensuring hardware and software configurations are developed consistently, with full change-control evidence.',
      description: richText(
        'Configuration drift is one of the most common findings in a safety audit. This template sets out a complete configuration-management process — identification, baselining, change control, and status accounting — so that every hardware and software item carries a traceable, defensible revision history from concept through deployment.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'doc-control',
      code: 'QMS-DC',
      title: 'Document Control Template',
      type: 'document',
      category: CAT.QMS,
      icon: 'files',
      format: 'Word',
      pages: 14,
      price: 14900,
      standards: [{ code: 'Generic Safety Lifecycle' }],
      docType: 'Plans',
      summary:
        'A process blueprint for creating, reviewing, approving, storing, tracking, and distributing engineering documentation across revision cycles.',
      description: richText(
        'A safety case is only as strong as the document system that holds it together. This template defines a controlled lifecycle for every engineering deliverable — authoring, review, approval, distribution, and retirement — with the numbering, versioning, and access rules that keep your evidence audit-ready.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'work-review',
      code: 'QMS-WPR',
      title: 'Work Product Review Template',
      type: 'document',
      category: CAT.QMS,
      icon: 'clipboard-check',
      format: 'Word',
      pages: 11,
      price: 12900,
      standards: [{ code: 'Generic Safety Lifecycle' }],
      docType: 'Plans',
      summary:
        'A standardized process to evaluate deliverables against compliance targets, including step-by-step review and record logs.',
      description: richText(
        'Independent review is a cornerstone of every functional-safety standard. This template provides a repeatable review process and record log — entry criteria, checklists, finding severity, and sign-off — so each work product is demonstrably checked against its requirements before it advances.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'impact-analysis',
      code: 'QMS-IA',
      title: 'Impact Analysis Report Template',
      type: 'document',
      category: CAT.QMS,
      icon: 'file-search',
      format: 'Word',
      pages: 13,
      price: 16900,
      standards: [{ code: 'Generic Safety Lifecycle' }],
      docType: 'Reports & Concepts',
      summary:
        'A change-management template to evaluate the consequences of a hardware or design modification on a safety-critical system.',
      description: richText(
        'Every change to a safety-critical system needs a defensible impact assessment before it ships. This report template walks the analysis end to end — affected functions, re-verification scope, and residual-risk judgement — giving change boards the structured evidence they need to approve or reject a modification with confidence.',
      ),
      whatsIncluded: docIncluded('Word'),
    },

    /* ============================================================ FUNCTIONAL SAFETY DOCUMENTS (12) */
    {
      slug: 'fsmp',
      code: 'FSMP',
      title: 'Functional Safety Management Plan',
      type: 'document',
      category: CAT.FS,
      icon: 'shield-check',
      format: 'Word',
      pages: 26,
      price: 29900,
      popular: true,
      standards: [{ code: 'IEC 61508' }],
      docType: 'Plans',
      summary:
        'A master lifecycle document defining how functional safety is governed: responsibilities, toolsets, verification checkpoints, and compliance measures.',
      description: richText(
        'The FSMP is the document an assessor reads first. This template structures the entire management plan — lifecycle model, responsibilities and competence, tool and method selection, verification and validation strategy, and the compliance measures that hold it all together — so your project starts with a governance backbone the standards expect.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'hara',
      code: 'HARA',
      title: 'Hazard Analysis & Risk Assessment Report',
      type: 'document',
      category: CAT.FS,
      icon: 'crosshair',
      format: 'Word',
      pages: 22,
      price: 24900,
      popular: true,
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }, { code: 'ISO 26262' }],
      docType: 'Reports & Concepts',
      summary:
        'A structured methodology to identify hazards, evaluate operational risks, and determine the target SIL / PL.',
      description: richText(
        'The HARA is where safety requirements are born. This template provides a rigorous, repeatable methodology — operational situations, hazard identification, severity / exposure / controllability rating, and SIL or Performance Level assignment — producing the traceable risk record that every downstream safety requirement is derived from.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'fs-concept',
      code: 'FSC',
      title: 'Functional Safety Concept Template',
      type: 'document',
      category: CAT.FS,
      icon: 'shapes',
      format: 'Word',
      pages: 19,
      price: 24900,
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 26262' }],
      docType: 'Reports & Concepts',
      summary:
        'An architectural layout of safety mechanisms, fault-detection rules, mitigation strategies, and fail-safe behaviors.',
      description: richText(
        'The safety concept translates the HARA into an architecture. This template lays out safety mechanisms, fault detection and reaction, safe states, and the allocation of safety requirements to elements — the bridge between "what could go wrong" and "how the system stays safe when it does."',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'svvp',
      code: 'SVVP',
      title: 'Safety Verification & Validation Plan',
      type: 'document',
      category: CAT.FS,
      icon: 'list-checks',
      format: 'Word',
      pages: 17,
      price: 21900,
      standards: [{ code: 'IEC 61508' }, { code: 'Generic Safety Lifecycle' }],
      docType: 'Plans',
      summary:
        'Methods, tools, and timelines to verify hardware performs safely and meets specified safety integrity.',
      description: richText(
        'A V&V plan tells assessors how you will prove the system is safe before a single test is run. This template defines verification and validation strategy, methods and tools per lifecycle phase, independence requirements, and pass/fail criteria — the roadmap that makes your evidence trail intentional rather than improvised.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'svvr',
      code: 'SVVR',
      title: 'Safety Verification & Validation Report',
      type: 'document',
      category: CAT.FS,
      icon: 'file-check',
      format: 'Word',
      pages: 20,
      price: 21900,
      standards: [{ code: 'IEC 61508' }, { code: 'Generic Safety Lifecycle' }],
      docType: 'Reports & Concepts',
      summary: 'Formal, structured evidence that safety-related loops are tested and confirmed.',
      description: richText(
        'The V&V report is the proof. This template captures the executed verification and validation activities, results against criteria, anomalies and their disposition, and the validation statement — the structured, signed evidence that demonstrates each safety function performs as specified.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'srs',
      code: 'SRS',
      title: 'Safety Requirements Specification',
      type: 'document',
      category: CAT.FS,
      icon: 'list-tree',
      format: 'Word',
      pages: 18,
      price: 22900,
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }],
      docType: 'Reports & Concepts',
      summary:
        'Concrete functional and integrity criteria for safety functions, translating hazard analyses into clear hardware boundaries.',
      description: richText(
        'The SRS turns analysis into testable engineering requirements. This template specifies each safety function and its associated integrity target, with the structure, attributes, and traceability links that let you flow requirements down to design and back up to verification without gaps.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'req-mgmt',
      code: 'RMP',
      title: 'Requirements Management Process Template',
      type: 'document',
      category: CAT.FS,
      icon: 'workflow',
      format: 'Word',
      pages: 16,
      price: 19900,
      standards: [{ code: 'Generic Safety Lifecycle' }],
      docType: 'Plans',
      summary:
        'A lifecycle guide for identifying, prioritizing, tracing, and controlling engineering requirements from concept through deployment.',
      description: richText(
        'Requirements management is where traceability lives or dies. This template defines a process for capturing, prioritizing, tracing, and baselining requirements — and slots in alongside requirements-management tooling such as DOORS or Polarion, so your process and your tool tell the same story.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'safety-arch',
      code: 'SADS',
      title: 'Safety Architecture & Design Specification',
      type: 'document',
      category: CAT.FS,
      icon: 'circuit-board',
      format: 'Word',
      pages: 24,
      price: 26900,
      standards: [{ code: 'IEC 61508' }],
      docType: 'Reports & Concepts',
      summary:
        'System component interactions, fail-safe mechanisms, fault-tolerant logic, and hardware diagnostics.',
      description: richText(
        'This template documents the safety architecture in the detail an assessor expects — element interactions, redundancy and fault tolerance, diagnostic coverage, and the design rationale behind each safety mechanism — giving your hardware and systems engineers a single, defensible reference for how integrity is achieved.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'sdp',
      code: 'SDP',
      title: 'Software Development Plan',
      type: 'document',
      category: CAT.FS,
      icon: 'code',
      format: 'Word',
      pages: 21,
      price: 22900,
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 26262' }],
      docType: 'Plans',
      summary:
        'Project organization, programming environments, scheduling, milestone tracking, and QA workflows for safety-related software.',
      description: richText(
        'Safety-related software needs a development plan that satisfies the software safety lifecycle. This template covers organization and competence, environments and tools, coding standards, milestones, and QA workflows — the plan that keeps software development compliant from the first commit.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
    {
      slug: 'reliability',
      code: 'PFH / SFF',
      title: 'Safety Reliability Calculations Template',
      type: 'document',
      category: CAT.FS,
      icon: 'calculator',
      format: 'Excel',
      pages: 6,
      price: 34900,
      popular: true,
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }],
      docType: 'Analytical Models & Tools',
      summary:
        'An Excel modeling toolkit to calculate probability of dangerous failure per hour (PFH) and safe failure fraction (SFF).',
      description: richText(
        'Hardware integrity has to be calculated, not asserted. This Excel workbook ships with live, documented formulas for PFH / PFDavg, safe failure fraction, and architectural constraints — so your reliability engineers can model a safety function, vary the architecture, and read the resulting integrity directly.',
      ),
      whatsIncluded: docIncluded('Excel'),
    },
    {
      slug: 'fmea',
      code: 'FMEA',
      title: 'Failure Mode and Effects Analysis Template',
      type: 'document',
      category: CAT.FS,
      icon: 'table',
      format: 'Excel',
      pages: 8,
      price: 19900,
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }, { code: 'ISO 26262' }],
      docType: 'Analytical Models & Tools',
      summary:
        'A bottom-up analytical template to decompose systems, map failure modes, evaluate diagnostic coverage, and document preventive designs.',
      description: richText(
        'FMEA is the detective work of functional safety. This structured Excel workbook guides a disciplined bottom-up analysis — functional decomposition, failure modes and effects, detection and RPN, and recommended actions — with the columns, scoring, and rollups that turn a workshop into traceable evidence.',
      ),
      whatsIncluded: docIncluded('Excel'),
    },
    {
      slug: 'hdp',
      code: 'HDP',
      title: 'Hardware Development Plan',
      type: 'document',
      category: CAT.FS,
      icon: 'cpu',
      format: 'Word',
      pages: 20,
      price: 22900,
      standards: [{ code: 'IEC 61508' }],
      docType: 'Plans',
      summary:
        'A roadmap for physical engineering programs: development approach, resource allocation, component testing, and configuration changes.',
      description: richText(
        'The hardware development plan keeps a physical safety program on a compliant track. This template defines the development approach, resourcing, component qualification and testing, and configuration control — the plan that aligns your hardware effort with the functional-safety lifecycle from day one.',
      ),
      whatsIncluded: docIncluded('Word'),
    },
  ],
}
