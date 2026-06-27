/**
 * Seed per-lesson Course Player content (key points + formative knowledge check,
 * and an "In this lesson" summary where one is missing) for the flagship
 * IEC 61508 IFSP course. Ports design-reference/assets/course-player-data.js:
 * the Systematic Capability module (index 4, lessons 0–2) gets its hand-authored
 * content; every other lesson gets generated-but-plausible content so the whole
 * outline binds — mirroring the design's generate() fallback. All content is real
 * CMS data afterwards, editable in /admin.
 *
 * Run (container node, avoids host node-26 `payload run` breakage):
 *   docker compose run --rm migrator npm run payload -- run src/scripts/seedLessonContent.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const SLUG = 'iec-61508-ifsp'

type Q = { prompt: string; options: string[]; answerIndex: number; explanation: string }
type Res = { name: string; type: string; sizeLabel: string }
type Content = { summary: string; keyPoints: string[]; questions: Q[]; resources: Res[] }

// A served stand-in clip so the custom video controls are demonstrable until real
// lesson videos are uploaded (mirrors the design's hero.mp4 stub).
const SAMPLE_VIDEO = '/csa/hero.mp4'

// Hand-authored content (design CONTENT['iec-61508-ifsp']), keyed "moduleIndex.lessonIndex".
const HAND: Record<string, Content> = {
  '4.0': {
    summary:
      'Systematic failures are the faults you design in — specification gaps, tool defects, and process errors that no amount of redundancy will catch. This lesson frames the two-pronged IEC 61508 strategy: avoid faults during development, and control the ones that slip through at run time.',
    keyPoints: [
      'Random vs. systematic failures — and why duplication does not help the latter',
      'Fault avoidance measures applied across the safety lifecycle phases',
      'Fault control measures: diagnostics, monitoring, and defensive architecture',
      'How systematic capability (SC 1–4) maps to the target SIL',
    ],
    questions: [
      {
        prompt: 'Why can hardware redundancy fail to mitigate a systematic failure?',
        options: [
          'Redundant channels are more expensive to certify',
          'A systematic fault is present identically in every redundant channel',
          'Redundancy only addresses software faults',
          'Systematic failures cannot be detected by diagnostics',
        ],
        answerIndex: 1,
        explanation:
          'A systematic failure stems from a deterministic cause (e.g. a specification error). Duplicating the channel duplicates the fault, so all channels fail together under the same conditions.',
      },
      {
        prompt: 'IEC 61508 controls systematic faults through two complementary strategies. They are:',
        options: [
          'Avoidance during development and control at run time',
          'Proof testing and burn-in',
          'Derating and redundancy',
          'FMEA and FTA only',
        ],
        answerIndex: 0,
        explanation:
          'The standard pairs fault avoidance (rigorous lifecycle techniques and measures) with fault control (run-time diagnostics, monitoring, and defensive design).',
      },
    ],
    resources: [
      { name: 'Systematic Capability — Measures Checklist.pdf', type: 'PDF', sizeLabel: '318 KB' },
      { name: 'IEC 61508-2 Annex A — Techniques Map.xlsx', type: 'XLSX', sizeLabel: '96 KB' },
      { name: 'Worked Example — Fault Avoidance Plan.docx', type: 'DOCX', sizeLabel: '142 KB' },
    ],
  },
  '4.1': {
    summary:
      'A catalogue walkthrough of the IEC 61508-2/-3 techniques and measures tables. We show how to read the recommendation columns (R / HR / NR) against your target SIL and build a defensible justification when you deviate.',
    keyPoints: [
      'Reading the "Recommended / Highly Recommended / Not Recommended" columns',
      'Selecting a compliant set of measures for the target SIL',
      'Documenting justified deviations with equivalent rigor',
      'Tying each measure back to a verification artifact',
    ],
    questions: [
      {
        prompt: 'In the IEC 61508 techniques tables, an "HR" entry for your target SIL means the measure is:',
        options: ['Not recommended', 'Highly recommended', 'Hardware-related', 'Optional regardless of SIL'],
        answerIndex: 1,
        explanation:
          'HR = Highly Recommended. Omitting an HR measure requires a documented, equally rigorous justification to remain compliant.',
      },
    ],
    resources: [
      { name: 'Techniques & Measures — Selection Worksheet.xlsx', type: 'XLSX', sizeLabel: '124 KB' },
      { name: 'Deviation Justification Template.docx', type: 'DOCX', sizeLabel: '88 KB' },
    ],
  },
  '4.2': {
    summary:
      'How a compliant development flow actually reads in practice — V-model phases, the verification checkpoints between them, and the work products that constitute your evidence trail for the assessor.',
    keyPoints: [
      'Mapping IEC 61508 phases onto a V-model development flow',
      'Verification checkpoints and entry/exit criteria per phase',
      'Configuration management and tool qualification expectations',
      'Assembling the work-product set the assessor will request',
    ],
    questions: [
      {
        prompt: 'In the V-model, verification activities on the right-hand (integration) side are planned:',
        options: [
          'After integration is complete',
          'During the corresponding left-hand specification phase',
          'Only if the assessor requests them',
          'At the very end of the project',
        ],
        answerIndex: 1,
        explanation:
          'Each right-side verification is defined against its corresponding left-side specification phase, so test criteria are written when the requirement is — not improvised later.',
      },
    ],
    resources: [
      { name: 'Compliant Development Flow — V-Model Map.pdf', type: 'PDF', sizeLabel: '412 KB' },
      { name: 'Work Product Index (per phase).xlsx', type: 'XLSX', sizeLabel: '102 KB' },
      { name: 'Phase Checkpoint Pack.zip', type: 'ZIP', sizeLabel: '1.8 MB' },
    ],
  },
}

function generate(title: string, modTitle: string): Content {
  return {
    summary: `This lesson covers ${title} within ${modTitle}. We move from the underlying principle to a worked engineering example you can apply to your own hardware, then point to the evidence an assessor expects.`,
    keyPoints: [
      `The core principle behind ${title.toLowerCase()}`,
      'A worked example on representative safety-critical hardware',
      'Common pitfalls and how independent review catches them',
      'The work product that records this step for certification',
    ],
    questions: [
      {
        prompt: `Which statement best reflects the goal of "${title}"?`,
        options: [
          'It is an optional, documentation-only step',
          'It produces defensible evidence toward the target SIL / PL',
          'It replaces the need for independent assessment',
          'It applies only to software components',
        ],
        answerIndex: 1,
        explanation:
          'Every lifecycle step in this course is framed around the audit-ready evidence it contributes toward your target integrity level.',
      },
    ],
    resources: [
      { name: `${title.replace(/[^\w]+/g, '-')} — Notes.pdf`, type: 'PDF', sizeLabel: '180 KB' },
      { name: `${modTitle} — Worksheet.xlsx`, type: 'XLSX', sizeLabel: '96 KB' },
    ],
  }
}

/** Minimal Payload-Lexical document holding a single paragraph of plain text. */
function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          textFormat: 0,
          children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
        },
      ],
    },
  }
}

const hasBody = (body: unknown): boolean => {
  const root = (body as { root?: { children?: unknown[] } } | null)?.root
  return Array.isArray(root?.children) && root.children.length > 0
}

const payload = await getPayload({ config })

const res = await payload.find({
  collection: 'courses',
  where: { slug: { equals: SLUG } },
  depth: 0,
  limit: 1,
  overrideAccess: true,
})
const course = res.docs[0] as unknown as {
  id: number | string
  modules?: Array<{ title?: string; lessons?: Array<Record<string, unknown>> }>
}
if (!course) {
  console.error(`Course "${SLUG}" not found.`)
  process.exit(1)
}

let lessonsTouched = 0
const modules = (course.modules ?? []).map((mod, mi) => {
  const lessons = (mod.lessons ?? []).map((lesson, li) => {
    const title = String(lesson.title ?? `Lesson ${li + 1}`)
    const content = HAND[`${mi}.${li}`] ?? generate(title, mod.title ?? 'this module')
    const hasVideo =
      lesson.video != null || (typeof lesson.videoUrl === 'string' && (lesson.videoUrl as string).length > 0)
    lessonsTouched++
    return {
      ...lesson,
      // Give videoless lessons a served stand-in clip so the player's custom
      // controls are demonstrable (preserve any real uploaded video / URL).
      videoUrl: hasVideo ? (lesson.videoUrl ?? null) : SAMPLE_VIDEO,
      body: hasBody(lesson.body) ? lesson.body : lexicalParagraph(content.summary),
      keyPoints: content.keyPoints.map((point) => ({ point })),
      quiz: {
        passScore: 100,
        questions: content.questions.map((q) => ({
          prompt: q.prompt,
          options: q.options.map((text) => ({ text })),
          answerIndex: q.answerIndex,
          explanation: q.explanation,
        })),
      },
      resources: content.resources.map((r) => ({ name: r.name, type: r.type, sizeLabel: r.sizeLabel })),
    }
  })
  return { ...mod, lessons }
})

await payload.update({
  collection: 'courses',
  id: course.id,
  overrideAccess: true,
  data: { modules, _status: 'published' } as never,
})

console.log(`Seeded knowledge checks + key points into ${lessonsTouched} lessons of "${SLUG}".`)
process.exit(0)
