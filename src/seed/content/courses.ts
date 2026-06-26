/**
 * Seed: courses collection.
 *
 * Real copy / modules / outcomes / prices (cents) lifted from the COURSES block
 * in design-reference/project/assets/courses-data.js (all 6 courses).
 *
 * Schema source: src/collections/Courses.ts
 *   - track[] / format[] are hasMany selects (string arrays).
 *   - blurb is richText (Lexical root shape via richText()).
 *   - outcomes[]: source string[] mapped → [{ outcome }].
 *   - modules[].lessons: source string[] mapped → [{ title }] (schema lesson objects).
 *   - standards[]: source string[] mapped → [{ code }].
 *   - instructor: relationship → instructors via { _ref }.
 *   - assessment (course → assessments) is wired from the assessments seed side
 *     (assessment.course → this course's slug), since Assessments has no slug
 *     field to target a forward { _ref } here. See content/assessments.ts.
 *   - price omitted where the source price is null (custom / request-a-quote).
 *   - media (upload) omitted — seeded later.
 *
 * Format vocabulary (matches the Courses.ts select options):
 *   PVT      'Private Virtual Team Session'
 *   WORKSHOP 'In-Person Custom Workshop'
 *   ONDEMAND 'On-Demand'
 *   GROUP    'Group'
 *   PRIVATE  'Private'
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

const CRED = 'Certificate of completion'

const lessons = (...titles: string[]) => titles.map((title) => ({ title }))

export const seed = {
  collection: 'courses',
  docs: [
    /* ============================================================ FLAGSHIP — IEC 61508 IFSP */
    {
      slug: 'iec-61508-ifsp',
      code: 'IEC 61508 · IFSP',
      title: 'IEC 61508 Industrial Functional Safety Professional (IFSP) Training',
      track: ['Robotics', 'Rail', 'Industrial Machinery'],
      format: ['Private Virtual Team Session', 'On-Demand', 'Group', 'Private'],
      credential: CRED,
      level: 'Intermediate',
      duration: '12 modules · ~16 hrs',
      lessons: 12,
      price: 149000,
      priceNote: 'Per seat · team & site licenses available',
      summary:
        'Flagship program that systematically simplifies the 10-part master standard — risk assessment, SIL determination, and software safety validation.',
      blurb: richText(
        'Our flagship program, delivered directly as an approved SGS-TÜV Saar partner. We systematically simplify the 10-part structure of the master standard so working engineers can apply it on real hardware — with practical guidance on risk assessment, Safety Integrity Level (SIL) determination, and software safety requirement validation.',
      ),
      outcomes: [
        'Navigate the 10-part structure of IEC 61508 with confidence',
        'Run risk assessments and determine the correct Safety Integrity Level (SIL)',
        'Specify and validate software safety requirements',
        'Build audit-ready evidence that satisfies third-party assessors',
      ].map((outcome) => ({ outcome })),
      modules: [
        {
          n: '01',
          title: 'The Functional Safety Lifecycle',
          lessons: lessons(
            'Why IEC 61508 exists',
            'The overall safety lifecycle',
            'Roles, competence & independence',
          ),
        },
        {
          n: '02',
          title: 'Hazard & Risk Analysis',
          lessons: lessons(
            'Hazard identification',
            'Risk parameters & tolerability',
            'Allocating safety functions',
          ),
        },
        {
          n: '03',
          title: 'SIL Determination',
          lessons: lessons(
            'Risk graph & LOPA methods',
            'Target failure measures',
            'Worked SIL examples',
          ),
        },
        {
          n: '04',
          title: 'Hardware Safety Integrity',
          lessons: lessons(
            'Architectural constraints',
            'PFH / PFDavg calculation',
            'Safe failure fraction',
          ),
        },
        {
          n: '05',
          title: 'Systematic Capability',
          lessons: lessons(
            'Avoiding & controlling systematic faults',
            'Techniques & measures',
            'Compliant development flow',
          ),
        },
        {
          n: '06',
          title: 'Software Safety Requirements',
          lessons: lessons(
            'Software safety lifecycle',
            'Requirements & architecture',
            'Verification & validation',
          ),
        },
        {
          n: '07',
          title: 'Assessment & Sign-Off',
          lessons: lessons(
            'Functional safety assessment',
            'Building the safety case',
            'Preparing for the assessor',
          ),
        },
      ],
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }, { code: 'ISO 26262' }],
      instructor: { _ref: { collection: 'instructors', slug: 'ben' } },
      badge: 'Flagship · SGS-TÜV Saar',
      popular: true,
    },

    /* ============================================================ ISO 13849 PL VERIFICATION */
    {
      slug: 'iso-13849-pl-verification',
      code: 'ISO 13849 · PL',
      title: 'ISO 13849 Performance Level Verification Essentials',
      track: ['Industrial Machinery'],
      format: ['On-Demand', 'Group', 'Private Virtual Team Session'],
      credential: CRED,
      level: 'Intermediate',
      duration: '6 modules · ~8 hrs',
      lessons: 6,
      price: 74000,
      priceNote: 'Per seat · group rates available',
      summary:
        'Validate safety-related parts of control systems with SISTEMA-based Performance Level verification — categories, MTTFd, DC and CCF.',
      blurb: richText(
        'A practical workshop for machinery and controls engineers who must prove a Performance Level under ISO 13849. We work through categories, MTTFd, diagnostic coverage and common-cause failure using SISTEMA, on the kind of architectures you actually build.',
      ),
      outcomes: [
        'Map a safety function to the right Category and architecture',
        'Calculate MTTFd, DCavg and evaluate common-cause failure',
        'Drive a PL verification end-to-end in SISTEMA',
        'Document a defensible PL result for audit',
      ].map((outcome) => ({ outcome })),
      modules: [
        {
          n: '01',
          title: 'ISO 13849 in Context',
          lessons: lessons(
            'Machinery Directive & risk reduction',
            'PLr from risk assessment',
            'Designated architectures',
          ),
        },
        {
          n: '02',
          title: 'Categories & Architectures',
          lessons: lessons(
            'Category B through 4',
            'Channel structure',
            'Diagnostics & monitoring',
          ),
        },
        {
          n: '03',
          title: 'Reliability Data',
          lessons: lessons(
            'MTTFd of components',
            'Diagnostic coverage',
            'Common-cause failure (CCF)',
          ),
        },
        {
          n: '04',
          title: 'Working in SISTEMA',
          lessons: lessons(
            'Building the safety function',
            'Block library & data',
            'Reading the PL result',
          ),
        },
        {
          n: '05',
          title: 'Verification & Records',
          lessons: lessons(
            'Verification plan',
            'Evidence & traceability',
            'Audit-ready documentation',
          ),
        },
      ],
      standards: [{ code: 'ISO 13849' }, { code: 'IEC 62061' }, { code: 'ISO 12100' }],
      instructor: { _ref: { collection: 'instructors', slug: 'ben' } },
      popular: true,
    },

    /* ============================================================ ROBOT SAFETY FUNDAMENTALS */
    {
      slug: 'robot-safety-fundamentals',
      code: 'ISO 10218 · 3691-4',
      title: 'Robot Safety Fundamentals: ISO 10218 & ISO 3691-4',
      track: ['Robotics'],
      format: ['On-Demand', 'Private Virtual Team Session', 'Group'],
      credential: CRED,
      level: 'Introductory',
      duration: '5 modules · ~6 hrs',
      lessons: 5,
      price: 74000,
      priceNote: 'Per seat · group rates available',
      summary:
        'Item definition through verification for industrial, collaborative, and mobile robots operating in human-shared spaces.',
      blurb: richText(
        'A grounding course for teams building industrial, collaborative, and mobile robots. We move from item definition and hazard analysis through risk reduction and verification — the safety lifecycle that ISO 10218 and ISO 3691-4 expect for robots that share space with people.',
      ),
      outcomes: [
        'Write a clear item definition and operational boundary',
        'Run a bottom-up FMEA to isolate sensor and actuation failure modes',
        'Apply ISO 10218 and ISO 3691-4 risk-reduction measures',
        'Plan verification & validation for human-shared operation',
      ].map((outcome) => ({ outcome })),
      modules: [
        {
          n: '01',
          title: 'Robots & Human-Shared Space',
          lessons: lessons(
            'Standards landscape',
            'Collaborative vs. industrial',
            'Mobile robots (AMRs)',
          ),
        },
        {
          n: '02',
          title: 'Item Definition',
          lessons: lessons('Performance boundaries', 'Operating modes', 'Foreseeable misuse'),
        },
        {
          n: '03',
          title: 'Hazard Analysis',
          lessons: lessons(
            'Bottom-up FMEA',
            'Sensor & actuation failure modes',
            'Speed & separation',
          ),
        },
        {
          n: '04',
          title: 'Risk Reduction',
          lessons: lessons('Safety functions', 'ISO 3691-4 zones', 'Requirements specification'),
        },
        {
          n: '05',
          title: 'Verification & Validation',
          lessons: lessons('Test planning', 'Physical V&V', 'Evidence for assessors'),
        },
      ],
      standards: [
        { code: 'ISO 10218-1/-2' },
        { code: 'ISO 3691-4' },
        { code: 'ISO 13849' },
        { code: 'IEC 61508' },
      ],
      instructor: { _ref: { collection: 'instructors', slug: 'ben' } },
    },

    /* ============================================================ RAIL SAFETY CASE AUTHORING */
    {
      slug: 'rail-safety-case-authoring',
      code: 'EN 50126 / 50129',
      title: 'Rail Safety Case Authoring: EN 50126 / 50128 / 50129',
      track: ['Rail'],
      format: ['Private Virtual Team Session', 'In-Person Custom Workshop', 'Private'],
      credential: CRED,
      level: 'Advanced',
      duration: '8 modules · ~12 hrs',
      lessons: 8,
      price: 119000,
      priceNote: 'Per seat · private cohort pricing on request',
      summary:
        'Author certifiable safety cases for processor-based fail-safe signaling and train-control systems across the RAMS lifecycle.',
      blurb: richText(
        'For signaling, rolling-stock, and train-control engineers, this advanced workshop covers the RAMS lifecycle and the structure of a defensible safety case under EN 50126/50128/50129 — including independent software review and high-integrity argument construction.',
      ),
      outcomes: [
        'Manage the RAMS lifecycle under EN 50126',
        'Structure a high-integrity safety case under EN 50129',
        'Scope independent software functional-safety reviews (EN 50128 / 50657)',
        'Author ConOps so processor-based systems interact safely with operators',
      ].map((outcome) => ({ outcome })),
      modules: [
        {
          n: '01',
          title: 'RAMS & EN 50126',
          lessons: lessons('The rail safety lifecycle', 'RAM vs. safety', 'Apportionment'),
        },
        {
          n: '02',
          title: 'Hazard Analysis for Rail',
          lessons: lessons('PHA, FMEA, FTA', 'Tolerable hazard rates', 'Hazard log'),
        },
        {
          n: '03',
          title: 'Safety Cases (EN 50129)',
          lessons: lessons('Safety case structure', 'Evidence & argument', 'Cross-acceptance'),
        },
        {
          n: '04',
          title: 'Software (EN 50128 / 50657)',
          lessons: lessons('Software SIL', 'Independent review', 'Tool qualification'),
        },
        {
          n: '05',
          title: 'ConOps & Integration',
          lessons: lessons(
            'Concepts of operation',
            'Human-operator interaction',
            'Autonomous rail-robot integration',
          ),
        },
      ],
      standards: [
        { code: 'EN 50126' },
        { code: 'EN 50128' },
        { code: 'EN 50129' },
        { code: 'EN 50657' },
      ],
      instructor: { _ref: { collection: 'instructors', slug: 'ben' } },
    },

    /* ============================================================ RISK ASSESSMENT FACILITATION */
    {
      slug: 'risk-assessment-facilitation',
      code: 'FMEA + FTA',
      title: 'Independent Risk Assessment Facilitation Training',
      track: ['Robotics', 'Rail', 'Industrial Machinery'],
      format: [
        'Private Virtual Team Session',
        'In-Person Custom Workshop',
        'On-Demand',
        'Group',
        'Private',
      ],
      credential: CRED,
      level: 'Intermediate',
      duration: '6 modules · ~9 hrs',
      lessons: 6,
      price: 98000,
      priceNote: 'Per seat · private facilitation available',
      summary:
        'Train your staff in the investigative mindset of an independent challenger — bottom-up FMEA and top-down FTA to challenge internal design assumptions.',
      blurb: richText(
        'An engineering workshop that trains your internal staff in the investigative mindset of an independent safety challenger. Your team masters the bottom-up detective process of Failure Mode and Effects Analysis (FMEA) and the top-down deductive reasoning of Fault Tree Analysis (FTA) to confidently challenge internal design assumptions.',
      ),
      outcomes: [
        'Facilitate a rigorous, blame-free FMEA workshop',
        'Build and quantify fault trees (FTA) for top events',
        'Challenge design assumptions like an independent assessor',
        'Translate findings into prioritized, traceable safety requirements',
      ].map((outcome) => ({ outcome })),
      modules: [
        {
          n: '01',
          title: 'The Challenger Mindset',
          lessons: lessons(
            'Why independence matters',
            'Facilitation principles',
            'Common analysis traps',
          ),
        },
        {
          n: '02',
          title: 'FMEA — Bottom Up',
          lessons: lessons(
            'Functional decomposition',
            'Failure modes & effects',
            'Detection & RPN',
          ),
        },
        {
          n: '03',
          title: 'FTA — Top Down',
          lessons: lessons('Defining top events', 'Gates & cut sets', 'Quantification'),
        },
        {
          n: '04',
          title: 'Running the Workshop',
          lessons: lessons('Preparation & inputs', 'Leading the room', 'Capturing actions'),
        },
        {
          n: '05',
          title: 'From Findings to Requirements',
          lessons: lessons('Prioritization', 'Traceability', 'Closing the loop'),
        },
      ],
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }, { code: 'ISO 26262' }],
      instructor: { _ref: { collection: 'instructors', slug: 'ben' } },
    },

    /* ============================================================ CUSTOM FLOOR-READY WORKSHOP */
    {
      slug: 'custom-floor-ready-workshop',
      code: 'Custom · Workshop',
      title: 'Custom Floor-Ready Workshops',
      track: ['Robotics', 'Industrial Machinery'],
      format: ['In-Person Custom Workshop', 'Private'],
      credential: CRED,
      level: 'Tailored',
      duration: 'Scoped to your program',
      lessons: 0,
      // price omitted — source price is null (custom quote).
      priceNote: 'Custom quote · scoped to your hardware',
      summary:
        'Fully customized, hands-on sessions built around your engineering team’s active hardware blueprints and system components.',
      blurb: richText(
        'Fully customized, hands-on sessions built around your engineering team’s active hardware blueprints and system components. We translate dense regulatory text into real-world machine-building logic, so your engineers can implement compliant safety controls without halting development speed.',
      ),
      outcomes: [
        'A curriculum scoped to your active blueprints and components',
        'Hands-on application of the standards relevant to your product',
        'Compliant safety controls your team can implement immediately',
        'Delivery on your engineering calendar, on-site or private virtual',
      ].map((outcome) => ({ outcome })),
      modules: [],
      standards: [{ code: 'IEC 61508' }, { code: 'ISO 13849' }, { code: 'ISO 10218' }],
      instructor: { _ref: { collection: 'instructors', slug: 'ben' } },
    },
  ],
}
