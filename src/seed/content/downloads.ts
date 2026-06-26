/**
 * Seed — Downloads content collection.
 *
 * The downloadable Resource assets on /resources/downloadable-resources.
 * Copy lifted verbatim from the design export:
 *   design-reference/project/Resources/Downloadable Resources.html (CONFIG.cards).
 *
 * Per the task brief, the `file` and `thumbnail` upload fields are omitted
 * (seeded later). title / description / category / fileType / gated are kept.
 * Card meta strings ("PDF · Checklist") map onto the category + fileType enums.
 */
export const seed = {
  collection: 'downloads',
  docs: [
    {
      title: 'Physical System & Hardware Safety Validation Checklist',
      slug: 'physical-system-hardware-safety-validation-checklist',
      description:
        'A step-by-step validation checklist covering hardware fault tolerance, diagnostic coverage, and the evidence you need to close out a physical safety case.',
      category: 'checklists',
      fileType: 'pdf',
      gated: false,
      seo: {
        metaTitle: 'Hardware Safety Validation Checklist | CSA',
        metaDescription:
          'A step-by-step validation checklist covering hardware fault tolerance, diagnostic coverage, and the evidence you need to close out a physical safety case.',
      },
    },
    {
      title: 'V-Model Adherence Roadmap for Autonomous Vehicle Development',
      slug: 'v-model-adherence-roadmap-autonomous-vehicle-development',
      description:
        'A development roadmap mapping each V-model phase to its safety deliverables — so verification and validation stay aligned from concept to deployment.',
      category: 'guidebooks',
      fileType: 'pdf',
      gated: false,
      seo: {
        metaTitle: 'V-Model Adherence Roadmap | CSA',
        metaDescription:
          'A development roadmap mapping each V-model phase to its safety deliverables — so verification and validation stay aligned from concept to deployment.',
      },
    },
    {
      title: 'Interface Safety Case & COTS Integration Tracking Framework',
      slug: 'interface-safety-case-cots-integration-tracking-framework',
      description:
        'A working template for tracking interface safety requirements and COTS component integration across a multi-supplier system architecture.',
      category: 'free-templates',
      fileType: 'xlsx',
      gated: false,
      seo: {
        metaTitle: 'Interface Safety Case & COTS Integration Tracker | CSA',
        metaDescription:
          'A working template for tracking interface safety requirements and COTS component integration across a multi-supplier system architecture.',
      },
    },
  ],
}
