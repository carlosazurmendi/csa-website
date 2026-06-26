/**
 * Seed — Articles collection (Resource Center publication library).
 *
 * Copy lifted from the design export:
 *   design-reference/project/Article.html              (the one fully-written article — V-model TCO)
 *   design-reference/project/assets/article-detail.jsx (the body-block field map)
 *   design-reference/project/assets/news.jsx           (3 "Latest news" placeholder cards)
 *   design-reference/project/Resources/Articles.html   (category framing + related-article stubs)
 *
 * Schema (src/collections/Articles.ts):
 *   title (required), slug, category (select, required), date (required),
 *   excerpt (required, ≤320), heroImage(upload), heroCaption,
 *   body (richText, required),
 *   authorMember (relationship → team-members), authorName, readingTime,
 *   topics[] { topic }, related (relationship → articles, hasMany ≤3), seo.
 *
 * Upload fields (heroImage, seo.ogImage) are omitted — seeded later.
 * authorMember uses { _ref: { collection: 'team-members', slug } }; the only
 * named author in the export is Ben Twombly (slug 'ben-twombly' in
 * team-members.ts). Placeholder cards have no byline in the export, so they
 * carry no author.
 *
 * category values map to the schema's select options:
 *   robotics · automotive · rail · off-road-agriculture · philosophy ·
 *   standards · field-notes · company.
 *
 * The body uses the default Lexical editor state. Helpers below build paragraph,
 * heading, blockquote, and list nodes. The export's V-model article body is a
 * block array (lead | p | h2 | h3 | quote | list | numlist | figure | callout |
 * incta). Layout-only blocks (figure / callout / incta) are dropped — they are
 * media + CTA chrome, not article prose. Inline **bold** / [text](href) markup
 * from the export's placeholder serializer is flattened to plain text so the
 * Lexical state stays valid and faithful to the words.
 */

type TextNode = {
  type: 'text'
  version: 1
  text: string
  detail: 0
  format: number
  mode: 'normal'
  style: ''
}

const text = (value: string, format = 0): TextNode => ({
  type: 'text',
  version: 1,
  text: value,
  detail: 0,
  format,
  mode: 'normal',
  style: '',
})

const para = (value: string) => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: [text(value)],
})

const heading = (value: string, tag: 'h2' | 'h3') => ({
  type: 'heading',
  tag,
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: [text(value)],
})

const quote = (value: string) => ({
  type: 'quote',
  version: 1,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: [text(value)],
})

const list = (items: string[], listType: 'bullet' | 'number') => ({
  type: 'list',
  version: 1,
  listType,
  start: 1,
  tag: listType === 'number' ? ('ol' as const) : ('ul' as const),
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  children: items.map((item, i) => ({
    type: 'listitem',
    version: 1,
    value: i + 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: [text(item)],
  })),
})

type Node =
  | ReturnType<typeof para>
  | ReturnType<typeof heading>
  | ReturnType<typeof quote>
  | ReturnType<typeof list>

const doc = (...nodes: Node[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    children: nodes,
  },
})

export const seed = {
  collection: 'articles',
  docs: [
    /* ============================================================
       1 · V-MODEL / TOTAL COST OF OWNERSHIP — fully written (Article.html)
       ============================================================ */
    {
      title: 'Safety as a Design Feature: Using the V-Model to Cut Total Cost of Ownership',
      slug: 'v-model-total-cost-of-ownership',
      category: 'philosophy',
      date: '2026-06-18',
      excerpt:
        'Treating functional safety as a late-stage checkbox is the single most expensive way to build a safety-critical system. Integrate it across the V-model instead, and safety becomes a lever on cost — not a tax on it.',
      heroCaption: 'A safety case matures alongside the design — not after it.',
      authorMember: { _ref: { collection: 'team-members', slug: 'ben-twombly' } },
      authorName: 'Ben Twombly',
      readingTime: '9 min read',
      topics: [{ topic: 'V-Model' }, { topic: 'IEC 61508' }, { topic: 'Total Cost of Ownership' }],
      body: doc(
        para(
          'Every engineering leader has felt it: the program is weeks from launch, an assessor asks for evidence, and the team discovers a safety requirement that should have shaped the architecture a year ago. Now it means a redesign. This is not a documentation problem — it is a sequencing problem, and the V-model is the cure.',
        ),
        heading('The hidden cost of late-stage safety', 'h2'),
        para(
          'When safety is treated as a gate at the end of development, the cost of every defect compounds. A missing requirement caught during architecture is a paragraph. The same gap caught during validation is a hardware spin, a re-test campaign, and a slipped launch. The further right it surfaces, the more committed design decisions it invalidates.',
        ),
        para(
          'The pattern is predictable enough to plan around: teams spend weeks gathering raw inputs and drowning in preparation work, then treat safety as a late-stage checkbox that forces delays and redesigns. The fix is not working harder at the end — it is moving the work left.',
        ),
        quote(
          'Safety is a fundamental design feature, not a late-stage cost center. Integrating it from a project’s inception improves reliability and reduces total cost of ownership by avoiding expensive rework after a system has been prototyped.',
        ),
        heading('The V-model, in one minute', 'h2'),
        para(
          'The V-model pairs every definition activity on the left-hand descent with a corresponding verification activity on the right-hand ascent. Requirements at the top-left are validated against the system at the top-right; module designs are verified by unit tests at the bottom of the V. The shape is the point: what you specify is what you prove, and the two sides are joined by traceability.',
        ),
        para(
          'For functional safety, the descent is where hazard analysis (HARA), the functional safety concept, and the safety requirements specification live. The ascent is where you demonstrate — with evidence — that the implementation satisfies them. A gap on the left always becomes a finding on the right.',
        ),
        heading('Where cost actually accumulates', 'h2'),
        para(
          'The relationship between defect-discovery phase and remediation cost is roughly geometric. A safety requirement traced from architecture costs the time to write and verify it. The same requirement discovered in field validation can cost one to two orders of magnitude more, because it now reaches back through completed hardware, software, and documentation.',
        ),
        para(
          'This is why identifying architectural safety concerns early in the V-model phase cuts the long-term cost of ownership. You are not buying compliance — you are buying the right to not redesign later.',
        ),
        heading('Designing safety in from day one', 'h2'),
        para(
          'Shifting safety left means a handful of concrete commitments at the start of a program, not a heavier process at the end:',
        ),
        list(
          [
            'Define the item first. Establish the system boundary, operational context, and intended function before any hazard analysis — every later artifact depends on it.',
            'Run HARA against the architecture, not the prototype. Hazards identified while the architecture is still fluid can be designed out; hazards found after fabrication must be guarded against.',
            'Make requirements traceable from the start. Each safety requirement should carry its source hazard and its verification method from the moment it is written.',
            'Treat assessor interfaces as a workstream, not an event. Engage independent review continuously so there are no surprises at the gate.',
          ],
          'bullet',
        ),
        heading('What shift-left looks like in practice', 'h2'),
        heading('Anchor the descent in a real safety concept', 'h3'),
        para(
          'A functional safety concept that exists on paper but not in the architecture is the most common source of late rework. Tie each safety mechanism to a specific failure mode and a specific architectural element, and the verification plan on the ascent writes itself.',
        ),
        heading('Use templates so the team builds, not formats', 'h3'),
        para(
          'Engineers should spend their time on analysis, not on inventing document structures. Field-proven functional safety documentation templates — HARA, the safety management plan, the safety requirements specification — let a team build a defensible safety case without starting from scratch.',
        ),
        list(
          [
            'Specify on the left: item definition, HARA, functional safety concept, safety requirements.',
            'Build with traceability intact so every requirement has a home in the design.',
            'Verify on the right against the exact requirements you specified — no more, no less.',
            'Validate the integrated system and close the safety case with assessor-ready evidence.',
          ],
          'number',
        ),
        heading('The bottom line', 'h2'),
        para(
          'The V-model is not bureaucracy — it is the cheapest path through a safety-critical program, because it forces the expensive decisions to the left where they are still cheap to change. Integrate functional safety as a design feature and it stops being a tax on velocity. It becomes the reason you can move fast without breaking what matters.',
        ),
        para(
          'If you are building autonomous or safety-critical hardware and want safety sequenced correctly from the start, our engineering team embeds with yours to make it happen.',
        ),
      ),
      related: [
        { _ref: { collection: 'articles', slug: 'what-is-a-requirement-functional-safety-primer' } },
        { _ref: { collection: 'articles', slug: 'software-fmea-practical-walkthrough' } },
        { _ref: { collection: 'articles', slug: 'when-to-bring-in-independent-functional-safety-expert' } },
      ],
      seo: {
        metaTitle: 'Safety as a Design Feature: The V-Model & Total Cost of Ownership',
        metaDescription:
          'Why treating functional safety as a late-stage checkbox is the most expensive way to build — and how integrating it across the V-model cuts total cost of ownership.',
      },
    },

    /* ============================================================
       2 · ISO/PAS 8800 — "Latest news" card (news.jsx)
       ============================================================ */
    {
      title: 'ISO/PAS 8800 and the road to certifying AI in safety-critical systems.',
      slug: 'iso-pas-8800-certifying-ai-safety-critical-systems',
      category: 'standards',
      date: '2026-06-02',
      excerpt:
        'ISO/PAS 8800 is the first published attempt to frame how AI components are made safe inside road-vehicle systems. Here is what it asks of engineering teams, and where it leaves room for independent judgment.',
      readingTime: '6 min read',
      topics: [{ topic: 'ISO/PAS 8800' }, { topic: 'AI Safety' }, { topic: 'Standards' }],
      body: doc(
        para(
          'For most of functional safety’s history, the methods assumed a system you could fully specify and exhaustively analyze. AI components break that assumption: their behavior is learned, not written, and the conditions under which they fail are not always knowable in advance. ISO/PAS 8800 is the standards community’s first published attempt to bridge that gap for road vehicles.',
        ),
        heading('What ISO/PAS 8800 actually covers', 'h2'),
        para(
          'The document sits alongside ISO 26262 and ISO 21448 (SOTIF) rather than replacing them. It addresses the safety of AI and machine-learning components used within a vehicle’s safety-related functions — how to specify them, how to argue about their performance, and what evidence a credible safety case needs when part of the system was trained rather than designed.',
        ),
        heading('Where independent judgment still matters', 'h2'),
        para(
          'A published specification does not make an AI component safe; it gives teams a shared vocabulary for the argument. The hard questions — what counts as sufficient performance, how to bound the operational domain, when residual risk is acceptable — still demand experienced safety engineers willing to challenge a model’s assumptions rather than rubber-stamp them.',
        ),
        para(
          'As this class of standard matures, the teams that fare best will be the ones treating AI safety as an engineering discipline with evidence and traceability, not a compliance afterthought.',
        ),
      ),
      seo: {
        metaTitle: 'ISO/PAS 8800: Certifying AI in Safety-Critical Systems | CSA',
        metaDescription:
          'ISO/PAS 8800 is the first published attempt to frame how AI components are made safe in road-vehicle systems. What it asks of engineering teams — and where judgment remains.',
      },
    },

    /* ============================================================
       3 · HUMANOID FIELD NOTE — "Latest news" card (news.jsx)
       ============================================================ */
    {
      title: 'What we learned certifying a collaborative humanoid for the factory floor.',
      slug: 'certifying-collaborative-humanoid-factory-floor',
      category: 'field-notes',
      date: '2026-05-12',
      excerpt:
        'Field notes from validating a collaborative humanoid robot for shared-space industrial work — where the hazard analysis has to account for a machine that moves like a person but fails like a machine.',
      readingTime: '7 min read',
      topics: [{ topic: 'Humanoids' }, { topic: 'ISO 10218' }, { topic: 'Field Notes' }],
      body: doc(
        para(
          'Certifying a collaborative humanoid for a working factory floor is not the same problem as certifying a fixed industrial arm. The robot shares space with people, moves through an unstructured environment, and is expected to behave predictably in situations no one fully enumerated at design time. These notes capture what stood out across the engagement.',
        ),
        heading('The hazard analysis has to assume a person is always nearby', 'h2'),
        para(
          'In a caged workcell you can engineer the human out of the hazard zone. On a shared factory floor you cannot. Every hazard analysis assumed continuous human proximity, which moved the burden onto the robot’s own safety functions — force and speed limiting, safe stopping, and reliable detection of people in the path.',
        ),
        heading('Moves like a person, fails like a machine', 'h2'),
        para(
          'A humanoid form invites people to read human intent into the machine’s motion. That is exactly the trap to avoid in a safety argument. The validation had to treat the robot as a machine with quantifiable failure modes, not as a colleague — separating the ergonomics of collaboration from the cold accounting of what happens when a sensor, actuator, or controller fails.',
        ),
        para(
          'The throughline is the one we return to on every program: independence and evidence beat intuition. A humanoid that looks safe is not the same as one whose safety you can prove.',
        ),
      ),
      seo: {
        metaTitle: 'Certifying a Collaborative Humanoid for the Factory Floor | CSA',
        metaDescription:
          'Field notes from validating a collaborative humanoid robot for shared-space industrial work — where the hazard analysis must account for a machine that moves like a person.',
      },
    },

    /* ============================================================
       4 · IRSC PROGRAM COMMITTEE — "Latest news" card (news.jsx)
       ============================================================ */
    {
      title: 'CSA joins the program committee for the International Robot Safety Conference.',
      slug: 'csa-joins-irsc-program-committee',
      category: 'company',
      date: '2026-04-09',
      excerpt:
        'CSA has joined the program committee for the International Robot Safety Conference, helping shape the technical agenda around real-world certification of autonomous and collaborative systems.',
      readingTime: '3 min read',
      authorMember: { _ref: { collection: 'team-members', slug: 'ben-twombly' } },
      authorName: 'Ben Twombly',
      topics: [{ topic: 'Company' }, { topic: 'Robotics' }, { topic: 'Community' }],
      body: doc(
        para(
          'We are glad to share that Critical Systems Analysis has joined the program committee for the International Robot Safety Conference. The role puts us alongside other practitioners shaping the conference’s technical agenda — with a focus on the safety challenges teams actually hit when bringing autonomous and collaborative systems to market.',
        ),
        heading('Why this matters to us', 'h2'),
        para(
          'Our work lives at the intersection of standards and real-world deployment, from the first-ever IEC 61508 certification for a collaborative AMR to autonomous fleets in mining. Helping curate the conversation at IRSC lets us push the field toward evidence-driven, independently validated robot safety rather than checkbox compliance.',
        ),
        para(
          'We are looking forward to the sessions ahead — and to the engineers, assessors, and builders we will meet there.',
        ),
      ),
      seo: {
        metaTitle: 'CSA Joins the International Robot Safety Conference Program Committee',
        metaDescription:
          'CSA has joined the program committee for the International Robot Safety Conference, helping shape the technical agenda around real-world certification of autonomous systems.',
      },
    },

    /* ============================================================
       5 · WHAT IS A REQUIREMENT — related-article stub (Article.html related[0])
       ============================================================ */
    {
      title: 'What Is a Requirement? A Functional Safety Primer',
      slug: 'what-is-a-requirement-functional-safety-primer',
      category: 'philosophy',
      date: '2026-06-04',
      excerpt:
        'A requirement is the smallest unit of a safety argument — and the most commonly mishandled. A plain-language primer on what makes a functional safety requirement defensible.',
      readingTime: '5 min read',
      authorMember: { _ref: { collection: 'team-members', slug: 'ben-twombly' } },
      authorName: 'Ben Twombly',
      topics: [{ topic: 'Requirements' }, { topic: 'Traceability' }, { topic: 'Fundamentals' }],
      body: doc(
        para(
          'Ask ten engineers what a requirement is and you will get ten answers, most of them describing a feature. In functional safety, a requirement is something more specific and more demanding: a verifiable statement of what the system must do, tied to a hazard it exists to control. Get this wrong at the start and every downstream artifact inherits the ambiguity.',
        ),
        heading('A requirement is verifiable, or it is a wish', 'h2'),
        para(
          'The test is simple: can you write down, in advance, the evidence that would prove the requirement is met? “The system shall be safe” fails that test. “Emergency stop shall reach safe torque-off within 250 ms” passes it. A requirement you cannot verify cannot anchor a safety case.',
        ),
        heading('Every requirement carries its source and its proof', 'h2'),
        para(
          'A defensible safety requirement is traceable in two directions at once: back to the hazard or analysis that motivated it, and forward to the verification activity that confirms it. Requirements written without that lineage are the ones that resurface as findings late in a program — when fixing them is most expensive.',
        ),
        para(
          'Treat requirements as the load-bearing units of the safety argument and the rest of the lifecycle has something solid to stand on.',
        ),
      ),
      related: [
        { _ref: { collection: 'articles', slug: 'v-model-total-cost-of-ownership' } },
        { _ref: { collection: 'articles', slug: 'software-fmea-practical-walkthrough' } },
      ],
      seo: {
        metaTitle: 'What Is a Requirement? A Functional Safety Primer | CSA',
        metaDescription:
          'A functional safety requirement is the smallest unit of a safety argument — and the most mishandled. A plain-language primer on what makes a requirement defensible.',
      },
    },

    /* ============================================================
       6 · SOFTWARE FMEA — related-article stub (Article.html related[1])
       ============================================================ */
    {
      title: 'Software FMEA: A Practical Walkthrough',
      slug: 'software-fmea-practical-walkthrough',
      category: 'robotics',
      date: '2026-05-21',
      excerpt:
        'Failure Modes and Effects Analysis is usually taught for hardware. Applied to software with discipline, it becomes one of the sharpest tools for finding systematic faults before they ship.',
      readingTime: '8 min read',
      authorMember: { _ref: { collection: 'team-members', slug: 'ben-twombly' } },
      authorName: 'Ben Twombly',
      topics: [{ topic: 'FMEA' }, { topic: 'Software Safety' }, { topic: 'Systematic Faults' }],
      body: doc(
        para(
          'FMEA grew up in hardware reliability, where failure modes are physical and rates are quantifiable. Software has no wear-out and no random failures — its faults are systematic, baked in at design time. That difference makes some engineers dismiss software FMEA. Applied with discipline, it is one of the most effective ways to surface systematic faults before they reach the field.',
        ),
        heading('Start from the function, not the code', 'h2'),
        para(
          'A productive software FMEA begins at the level of functions and interfaces, not individual lines. For each function, ask how it can fail to deliver its intended behavior: it does not execute, executes at the wrong time, produces a wrong result, or runs when it should not. Those failure modes map cleanly onto the safety concerns that matter.',
        ),
        heading('Trace each effect to a real hazard', 'h2'),
        para(
          'The analysis earns its keep when each failure mode is traced through to a system-level effect and, where relevant, a hazard. That is what turns a long table into design pressure: a failure mode with a severe effect and a weak detection or mitigation story is a requirement waiting to be written.',
        ),
        para(
          'Done well, software FMEA is not paperwork — it is a structured way of doubting your own design hard enough to make it safer.',
        ),
      ),
      related: [
        { _ref: { collection: 'articles', slug: 'v-model-total-cost-of-ownership' } },
        { _ref: { collection: 'articles', slug: 'what-is-a-requirement-functional-safety-primer' } },
      ],
      seo: {
        metaTitle: 'Software FMEA: A Practical Walkthrough | CSA',
        metaDescription:
          'Failure Modes and Effects Analysis is usually taught for hardware. Applied to software with discipline, it becomes a sharp tool for finding systematic faults before they ship.',
      },
    },

    /* ============================================================
       7 · INDEPENDENT FS EXPERT — related-article stub (Article.html related[2])
       ============================================================ */
    {
      title: 'When to Bring in an Independent Functional Safety Expert',
      slug: 'when-to-bring-in-independent-functional-safety-expert',
      category: 'philosophy',
      date: '2026-05-07',
      excerpt:
        'Independence is not a formality you satisfy at the end — it is leverage you gain by engaging early. A look at the moments where an outside safety perspective pays for itself.',
      readingTime: '6 min read',
      authorMember: { _ref: { collection: 'team-members', slug: 'ben-twombly' } },
      authorName: 'Ben Twombly',
      topics: [{ topic: 'Independence' }, { topic: 'Assessment' }, { topic: 'Engagement' }],
      body: doc(
        para(
          'Many teams treat independent safety review as a box to tick near certification. By then, the architecture is frozen and the most valuable findings are also the most expensive to act on. The better question is not whether to bring in an independent expert, but when — and the answer is almost always earlier than feels comfortable.',
        ),
        heading('Independence is leverage, not a formality', 'h2'),
        para(
          'An outside safety engineer’s value is precisely that they did not help design the system. They have no investment in the choices already made, which lets them challenge assumptions an internal team has stopped seeing. Engaged early, that independence shapes the architecture; engaged late, it can only document what is already built.',
        ),
        heading('The moments it pays for itself', 'h2'),
        para(
          'There are recurring inflection points: a novel or autonomous system with no regulatory precedent, a team without dedicated safety engineers, a program facing a third-party assessment, or a high-stakes FMEA or FTA where internal assumptions need a credible challenger. In each, an independent perspective converts uncertainty into a defensible plan.',
        ),
        para(
          'Because we never build the product we assess, our review carries the independence certifiers expect — and the earlier it starts, the more it is worth.',
        ),
      ),
      related: [
        { _ref: { collection: 'articles', slug: 'v-model-total-cost-of-ownership' } },
        { _ref: { collection: 'articles', slug: 'what-is-a-requirement-functional-safety-primer' } },
      ],
      seo: {
        metaTitle: 'When to Bring in an Independent Functional Safety Expert | CSA',
        metaDescription:
          'Independence is not a formality satisfied at the end — it is leverage gained by engaging early. Where an outside functional safety perspective pays for itself.',
      },
    },
  ],
}
