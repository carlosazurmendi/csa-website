/**
 * Seed: assessments collection — the flagship IFSP Final Assessment.
 *
 * Real questions / options / answer keys / explanations lifted from the FLAGSHIP
 * object in design-reference/project/assets/assessment-data.js (8 questions).
 *
 * Schema source: src/collections/Assessments.ts
 *   - course: relationship → courses, expressed as { _ref: { collection: 'courses', slug } }.
 *   - questions[].options: source string[] mapped → [{ text }].
 *   - answerIndex / explanation are SERVER-ONLY (adminFieldAccess) — they live in
 *     the seed but Payload strips them from non-admin API responses at runtime.
 *
 * SECURITY: answerIndex (0-based, canonical order) and explanation must never
 * reach the client. They are seeded here so server-side grading + the post-grade
 * Review state work; field-level access control enforces the boundary.
 */

export const seed = {
  collection: 'assessments',
  docs: [
    {
      course: { _ref: { collection: 'courses', slug: 'iec-61508-ifsp' } },
      title: 'IFSP Final Assessment',
      passScore: 80,
      shuffle: true,
      recommendAfter: 3,
      questions: [
        {
          id: 'q1',
          topic: 'The Functional Safety Lifecycle',
          standard: 'IEC 61508-1',
          prompt: 'What is the primary purpose of the overall safety lifecycle in IEC 61508?',
          options: [
            { text: 'To define a fixed project schedule every program must follow' },
            {
              text: 'To structure the activities that achieve and maintain functional safety from concept to decommissioning',
            },
            { text: 'To replace the need for an independent functional safety assessment' },
            { text: 'To specify the programming language used for safety software' },
          ],
          answerIndex: 1,
          explanation:
            'The overall safety lifecycle is the framework of phases — from concept through operation to decommissioning — that ensures functional safety is achieved and maintained across the system’s life. It is a structure, not a fixed schedule.',
        },
        {
          id: 'q2',
          topic: 'Hazard & Risk Analysis',
          standard: 'IEC 61508-1 §7.4',
          prompt: 'A hazard and risk analysis is performed primarily to:',
          options: [
            { text: 'Confirm the software has no syntax errors' },
            {
              text: 'Identify hazardous events and determine the risk reduction the safety functions must provide',
            },
            { text: 'Select the cheapest sensor that meets the budget' },
            { text: 'Document the marketing requirements for the product' },
          ],
          answerIndex: 1,
          explanation:
            'HARA identifies hazardous events and the necessary risk reduction, which in turn drives the safety requirements and the target integrity level for each safety function.',
        },
        {
          id: 'q3',
          topic: 'SIL Determination',
          standard: 'IEC 61508-1',
          prompt: 'Safety Integrity Level (SIL) is best described as:',
          options: [
            { text: 'A measure of how fast a safety function executes' },
            {
              text: 'A discrete level (1–4) specifying the target risk reduction / probability of dangerous failure for a safety function',
            },
            { text: 'The number of redundant channels in an architecture' },
            { text: 'A rating of how easy the system is to maintain' },
          ],
          answerIndex: 1,
          explanation:
            'SIL is a discrete level (SIL 1 lowest to SIL 4 highest) expressing the target probability of dangerous failure — i.e. the amount of risk reduction a safety function must achieve.',
        },
        {
          id: 'q4',
          topic: 'Hardware Safety Integrity',
          standard: 'IEC 61508-2',
          prompt:
            'For a safety function operating in low-demand mode, the relevant target failure measure is:',
          options: [
            { text: 'PFH — average frequency of a dangerous failure per hour' },
            { text: 'PFDavg — average probability of dangerous failure on demand' },
            { text: 'MTTR — mean time to repair' },
            { text: 'SFF — safe failure fraction only' },
          ],
          answerIndex: 1,
          explanation:
            'Low-demand functions are quantified by PFDavg (probability of failure on demand). High-demand / continuous functions use PFH (dangerous failures per hour).',
        },
        {
          id: 'q5',
          topic: 'Systematic Capability',
          standard: 'IEC 61508-2',
          prompt: 'Why can adding hardware redundancy fail to mitigate a systematic failure?',
          options: [
            { text: 'Redundant channels are always more expensive to certify' },
            {
              text: 'A systematic fault is present identically in every redundant channel, so they fail together',
            },
            { text: 'Redundancy only ever addresses software faults' },
            { text: 'Systematic failures are impossible to detect with diagnostics' },
          ],
          answerIndex: 1,
          explanation:
            'A systematic failure stems from a deterministic cause (e.g. a specification error). Duplicating a channel duplicates the fault, so all channels fail under the same conditions — redundancy does not help.',
        },
        {
          id: 'q6',
          topic: 'Systematic Capability',
          standard: 'IEC 61508-3 Annex A',
          prompt:
            'In the IEC 61508 techniques tables, an "HR" entry for your target SIL means the measure is:',
          options: [
            { text: 'Not recommended' },
            {
              text: 'Highly recommended — omitting it requires a documented, equally rigorous justification',
            },
            { text: 'Hardware-related only' },
            { text: 'Optional regardless of SIL' },
          ],
          answerIndex: 1,
          explanation:
            'HR = Highly Recommended. You may deviate, but only with a justification that provides equivalent rigor — and it must be documented for the assessor.',
        },
        {
          id: 'q7',
          topic: 'Software Safety Requirements',
          standard: 'IEC 61508-3',
          prompt:
            'In a V-model development flow, verification activities on the right-hand (integration) side are planned:',
          options: [
            { text: 'After integration testing is already complete' },
            { text: 'During the corresponding left-hand specification phase' },
            { text: 'Only if the assessor specifically requests them' },
            { text: 'At the very end of the project, as a final gate' },
          ],
          answerIndex: 1,
          explanation:
            'Each right-side verification is defined against its corresponding left-side specification phase, so acceptance criteria are written when the requirement is — not improvised later.',
        },
        {
          id: 'q8',
          topic: 'Assessment & Sign-Off',
          standard: 'IEC 61508-1',
          prompt: 'A functional safety assessment (FSA) is intended to:',
          options: [
            { text: 'Re-do all of the engineering work from scratch' },
            {
              text: 'Judge whether the safety functions achieve functional safety and whether the lifecycle was followed',
            },
            { text: 'Approve the project budget and schedule' },
            { text: 'Replace verification and validation entirely' },
          ],
          answerIndex: 1,
          explanation:
            'The FSA forms a judgement on the functional safety achieved by the safety functions and on whether the lifecycle activities and work products meet the standard’s requirements.',
        },
      ],
    },
  ],
}
