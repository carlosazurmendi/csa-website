/**
 * Seed: Home — the single landing-page record.
 * Real copy lifted verbatim from design-reference/project/Home.html and the
 * section components it mounts (assets/hero.jsx, case-studies.jsx, partners.jsx,
 * problem.jsx, services.jsx, standing-apart.jsx, about.jsx, news.jsx, footer.jsx).
 */

/** Minimal Lexical rich-text value: one paragraph per supplied string. */
const rt = (...paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      children: [
        { type: 'text', mode: 'normal', text, format: 0, style: '', detail: 0, version: 1 },
      ],
    })),
  },
})

export const seed = {
  collection: 'home',
  docs: [
    {
      title: 'Home',
      slug: 'home',
      order: 0,
      navLabel: 'Home',

      /* ---------------------------------------------------------------- Hero */
      heroTitle: 'Safer Systems. Accelerated Innovation.',
      heroTitleAccent: 'Innovation',
      heroSubhead:
        'Expert functional safety engineering consulting for the world’s most critical systems.',
      heroSub: rt(
        'At Critical Systems Analysis (CSA), we bridge the gap between advanced autonomous innovation and the rigorous demands of global safety standards. We empower engineering teams worldwide to transform complex compliance from a regulatory burden into a core strategic advantage.',
      ),
      heroCtaPrimary: 'Book a Consultation',
      heroCtaSecondary: 'Explore Our Services',
      heroSystems: [
        {
          cat: 'Humanoid Robotics',
          name: 'Atlas-Class Humanoid',
          blurb:
            'Collaborative humanoids working in shared human spaces — validated for safe force, speed, and separation monitoring.',
          standards: [{ code: 'ISO 10218-1' }, { code: 'ISO/TS 15066' }, { code: 'ISO 13849-1' }],
          metricLabel: 'Performance Level',
          metricVal: 'PL d',
        },
        {
          cat: 'Rail Transit',
          name: 'High-Speed Trainset',
          blurb:
            'Mainline and metro rolling stock — signalling, braking, and door control certified across the railway safety lifecycle.',
          standards: [{ code: 'EN 50126' }, { code: 'EN 50128' }, { code: 'IEC 61508' }],
          metricLabel: 'Safety Integrity',
          metricVal: 'SIL 4',
        },
        {
          cat: 'Industrial Automation',
          name: 'Six-Axis Robotic Arm',
          blurb:
            'High-payload manipulators on the factory floor — safety-rated stop, zoning, and speed-and-separation monitoring.',
          standards: [{ code: 'ISO 10218-2' }, { code: 'IEC 62061' }, { code: 'ISO 13849-1' }],
          metricLabel: 'Performance Level',
          metricVal: 'PL e',
        },
        {
          cat: 'Autonomous Mobile Robots',
          name: 'FleetBot AMR · 09',
          blurb:
            'Warehouse AMRs navigating among people — obstacle detection, protective stops, and safe fleet coordination by design.',
          standards: [{ code: 'ISO 3691-4' }, { code: 'ISO 13849-1' }, { code: 'IEC 61508' }],
          metricLabel: 'Performance Level',
          metricVal: 'PL d',
        },
        {
          cat: 'Autonomous Vehicles',
          name: 'NX-42 Driverless Shuttle',
          blurb:
            'Driverless passenger shuttles — functional safety and safety of the intended function validated end to end.',
          standards: [{ code: 'ISO 26262' }, { code: 'ISO 21448' }, { code: 'UL 4600' }],
          metricLabel: 'Automotive SIL',
          metricVal: 'ASIL D',
        },
      ],
      heroTicker: [
        { code: 'ISO 13849-1' },
        { code: 'IEC 61508' },
        { code: 'ISO 10218-1' },
        { code: 'IEC 62061' },
        { code: 'ISO 26262' },
        { code: 'EN 50126' },
        { code: 'EN 50128' },
        { code: 'ISO/TS 15066' },
        { code: 'ISO 3691-4' },
        { code: 'UL 4600' },
        { code: 'ISO 21448' },
      ],

      /* -------------------------------------------------------- Case Studies */
      csEyebrow: 'Proof, not promises.',
      csHeading: 'Case studies.',
      csSub: 'Real results from teams shipping safety-critical systems.',
      csCtaLabel: 'Read the Full Case Studies',
      csItems: [
        {
          sector: 'Mining Equipment',
          name: 'Liebherr Mining Equipment',
          desc: 'Safety-lifecycle and compliance-pathway guidance that brought clarity to a challenging program — with clear documentation, leadership, and actionable insights that improved both design and process.',
          standards: [],
          quote:
            'CSA’s understanding of the safety lifecycle and compliance pathways gave our organization clarity during a challenging project. They provided clear documentation, leadership, and actionable insights that improved both our design and our processes.',
          author: 'Erin Dalby',
          affiliation: 'Liebherr Mining Equipment Newport News Co.',
        },
        {
          sector: 'Autonomous Mobile Robots',
          name: 'AMR Manufacturer',
          desc: 'End-to-end functional safety lifecycle support — from hazard analysis through verification — anchored in IEC 61508 and real-world implementation that kept the program ahead of schedule.',
          standards: [{ code: 'IEC 61508' }],
          quote:
            'Ben’s safety engineers supported us through the entire functional safety lifecycle, from hazard analysis to verification. CSA’s expertise in IEC 61508 and real-world implementation helped our engineering team avoid costly mistakes and stay ahead of schedule.',
          author: 'AMR Manufacturer',
          affiliation: '',
        },
        {
          sector: 'Robotic Workcells',
          name: 'Workcell Integrator',
          desc: 'A safety-critical robotic system delivered with clear documentation, expert leadership, and actionable insights — without needing constant oversight from the engineering team.',
          standards: [],
          quote:
            'We partnered with CSA on a safety-critical robotic system, and the experience was outstanding. They delivered clear documentation, expert leadership, and actionable insights that improved both our design and our processes — without needing constant oversight from our engineers.',
          author: 'Workcell Integrator',
          affiliation: '',
        },
        {
          sector: 'Machinery',
          name: 'Machine Designer',
          desc: 'Safety-lifecycle and compliance-pathway guidance that made a difficult certification smooth and stress-free.',
          standards: [],
          quote:
            'CSA’s grasp of the safety lifecycle and compliance pathways gave us clarity during a difficult project. Their guidance made certification smooth and stress-free.',
          author: 'Machine Designer',
          affiliation: '',
        },
        {
          sector: 'Safety-Critical Components',
          name: 'Component Manufacturer',
          desc: 'A knowledgeable, dependable functional safety partner — always willing to go the extra mile, and now the go-to for all functional safety needs.',
          standards: [],
          quote:
            'Ben is incredibly easy to work with — knowledgeable, dependable, and always willing to go the extra mile. CSA is now our go-to partner for all functional safety needs.',
          author: 'Safety-Critical Component Manufacturer',
          affiliation: '',
        },
        {
          sector: 'Robotics',
          name: 'Robotics Manufacturer',
          desc: 'Honesty and commitment that went beyond checking the boxes — helping build a safer, more reliable product.',
          standards: [],
          quote:
            'What stood out most was their honesty and commitment. Beyond checking the boxes, CSA helped us build a safer, more reliable product.',
          author: 'Robotics Manufacturer',
          affiliation: '',
        },
      ],

      /* ------------------------------------------------ Partners / Trusted by */
      ptEyebrow: 'Trusted by.',
      ptHeading: 'The teams building critical systems.',
      ptSub: 'Railroads, robotics innovators, and equipment manufacturers across North America rely on CSA to validate their most safety-critical systems.',
      ptCustomers: [
        { name: 'Association of American Railroads', mark: 'AAR', domain: 'aar.org' },
        { name: 'Alaska Railroad', mark: 'ARR', domain: 'alaskarailroad.com' },
        { name: 'Caltrain', mark: 'CT', domain: 'caltrain.com' },
        { name: 'MxV Rail', mark: 'MxV', domain: 'mxvrail.com' },
        { name: 'Railway Association of Canada', mark: 'RAC', domain: 'railcan.ca' },
        { name: 'RSE Corporation', mark: 'RSE', domain: 'rsecorp.com' },
        { name: 'Saphira.AI', mark: 'SA', domain: 'saphira.ai' },
        { name: 'Unbox Robotics', mark: 'UB', domain: 'unboxrobotics.com' },
        { name: 'John Deere', mark: 'JD', domain: 'deere.com' },
        { name: 'Keolis', mark: 'KE', domain: 'keolisna.com' },
      ],
      ptPartnersLabel: 'Partners',
      ptPartnersIntro:
        'We work alongside the industry’s leading certification bodies and technical collaborators.',
      ptPartners: [
        { name: 'SGS-TÜV Saar', role: 'Approved Training & Service Provider', mono: 'SGS' },
        { name: 'TÜV Rheinland', role: 'Certification Partner', mono: 'TÜV' },
        { name: 'Saphira', role: 'Technical Collaboration', mono: 'SA' },
        { name: 'Fennec Engineering', role: 'Technical Collaboration', mono: 'FE' },
        { name: 'A3', role: 'Industry Partner', mono: 'A3' },
      ],

      /* ------------------------------------------------------------- Problem */
      pbEyebrow: 'The problem',
      pbHeading: 'Real expertise for rapid innovation.',
      pbLead: rt(
        'In an era of continuous, fast-moving design cycles, you need a functional safety partner who can keep pace with your engineering team. Too many organizations end up drowning in manual preparation work — or stuck with consultants who oversell their technical depth.',
      ),
      pbSolveLabel: 'The CSA solution',
      pbSolutions: [
        {
          title: 'Embedded Partnership',
          desc: 'We become an extension of your design team, working reliably without constant oversight.',
        },
        {
          title: 'Principal-Led Projects',
          desc: 'Every engagement is run by a principal safety engineer with decades of experience, acting in your best interest like an internal employee.',
        },
        {
          title: 'AI-Augmented Accuracy',
          desc: 'We pair a systematic methodology with AI tooling to accelerate development lifecycles while raising accuracy.',
        },
        {
          title: 'Strict Technical Objectivity',
          desc: 'By staying independent, we provide the unbiased validation that proves your hardware and software are functionally safe.',
        },
      ],

      /* ------------------------------------------- Services & Industries */
      svEyebrow: 'What we do',
      svServicesHeading: 'Functional safety services.',
      svServicesLead:
        'Principal-led functional safety engineering consulting across the full system lifecycle.',
      svServicesCta: 'See All Services',
      svIndustriesHeading: 'Industries we serve.',
      svIndustriesLead:
        'Functional safety engineering consulting tailored to the standards and hazards of your sector.',
      svIndustriesCta: 'Explore Industries',
      svServices: [
        {
          title: 'Engineering',
          desc: 'We embed directly with your team to execute safety work products and analysis as if we were internal staff.',
          points: [
            { point: 'Hands-on safety engineering: HARA, FMEA/FMEDA, fault tree analysis (FTA), and requirements traceability' },
            { point: 'Develop, complete, and maintain required safety artifacts and documentation' },
            { point: 'Work closely with systems, software, hardware, and operations teams to influence design decisions early' },
            { point: 'Interface directly with third-party assessors, certifiers, and auditors' },
            { point: 'Support compliance, certification, and regulator-facing activities' },
          ],
          bestFor: 'Teams without safety engineers, or safety teams short on bandwidth.',
        },
        {
          title: 'Consulting',
          desc: 'Strategic and technical safety guidance across the full system lifecycle — from concept through deployment and operation.',
          points: [
            { point: 'Functional and system safety strategy' },
            { point: 'Safety architecture and requirements advisory' },
            { point: 'Compliance strategy for international standards (IEC 61508, ISO 26262, ISO 13849, IEC 62061)' },
            { point: 'Safety support for novel, autonomous, and public-facing systems' },
          ],
          bestFor:
            'Teams with existing safety knowledge seeking expert backup to avoid mistakes, or a second opinion alongside other consultants.',
        },
        {
          title: 'Auditing',
          desc: 'Independent, objective assessments that build confidence in both technical safety and organizational competence.',
          points: [
            { point: 'Safety gap analyses and maturity assessments' },
            { point: 'Independent safety audits and technical reviews' },
            { point: 'Certification and regulatory readiness evaluations' },
            { point: 'Review of safety processes, artifacts, and governance' },
            { point: 'Trusted third-party oversight for critical programs' },
          ],
          bestFor:
            'Teams with some safety artifacts but needing direction to reach their safety goals — and industries where external review is required by the safety lifecycle.',
        },
        {
          title: 'Training',
          desc: 'Practical, engineering-driven functional safety training that translates standards into real-world practice.',
          points: [
            { point: 'Functional and system safety training (introductory to advanced)' },
            { point: 'Customized training for specific industries, products, or technologies' },
            { point: 'Workshops for engineering teams and technical leadership' },
            { point: 'Focus on failure modes, lessons learned, and defensible decision-making' },
          ],
          bestFor: '',
        },
      ],
      svIndustries: [
        {
          title: 'Rail',
          desc: 'Independent functional safety analysis for autonomous and conventional rail systems across every lifecycle phase.',
          points: [
            { point: 'Independent Safety Assessment (ISA), safety lifecycle management, hazard analysis (PHA, FMEA, FTA), and safety case authoring' },
            { point: 'Commuter, freight, signaling, rolling stock, autonomous, and rail-robot integrations' },
          ],
          standards: [{ code: 'EN 50126' }, { code: 'EN 50128' }, { code: 'EN 50129' }, { code: 'EN 50657' }],
        },
        {
          title: 'Robotics',
          desc: 'Safe design for industrial, mobile, and collaborative robots operating in unstructured, human-shared environments.',
          points: [
            { point: 'Item definition, hazard analysis, risk reduction, requirements, and verification & validation' },
          ],
          standards: [{ code: 'ISO 10218-1/-2' }, { code: 'ISO 3691-4' }, { code: 'ISO 13849-1/-2' }, { code: 'IEC 61508' }],
        },
        {
          title: 'Machinery',
          desc: 'Compliant, defensible safety architectures for fixed and mobile machinery.',
          points: [
            { point: 'Risk assessment, SRP/CS validation, and SISTEMA-based PL verification' },
            { point: 'Safety requirements specification and verification planning' },
          ],
          standards: [{ code: 'ISO 12100' }, { code: 'ISO 13849-1/-2' }, { code: 'IEC 62061' }, { code: 'IEC 61508' }],
        },
        {
          title: 'Physical AI',
          desc: 'Addressing the added risk of AI-driven perception, decision-making, and adaptation in safety-critical systems.',
          points: [
            { point: 'Safety analysis of AI functions, fallback strategies, and monitoring concepts' },
            { point: 'Integration of AI behavior into conventional functional safety lifecycles' },
          ],
          standards: [
            { code: 'IEC 61508' },
            { code: 'ISO 13849' },
            { code: 'ISO/TR 5469' },
            { code: 'ISO/IEC 23894' },
            { code: 'ISO/PAS 8800' },
            { code: 'ISO/IEC CD TS 22440-1' },
          ],
        },
        {
          title: 'Construction & Mining Equipment',
          desc: 'Safe automation and autonomy for on-site machinery operating near workers and the public, plus catastrophic-risk reduction in harsh, high-energy environments.',
          points: [
            { point: 'Hazard analysis for autonomy, remote operation, and human-machine interaction' },
            { point: 'Functional safety concepts for braking, steering, and fail-safe actuation; safety-related control system verification under extreme conditions' },
          ],
          standards: [
            { code: 'ISO 19014' },
            { code: 'ISO 21815 (emerging)' },
            { code: 'ISO 17757' },
            { code: 'ISO 13849' },
            { code: 'IEC 62061' },
            { code: 'IEC 61508' },
          ],
        },
        {
          title: 'Automotive',
          desc: 'Compliant, scalable safety engineering for E/E systems up to autonomous functions, including automotive software testing and validation.',
          points: [
            { point: 'HARA, FSC/TSC development, and safety concept validation' },
            { point: 'Safety analysis of ADAS, autonomy stacks, and software-intensive systems' },
          ],
          standards: [{ code: 'ISO 26262' }, { code: 'ISO 21448 (SOTIF)' }, { code: 'IEC 61508 (foundational)' }],
        },
        {
          title: 'Defense',
          desc: 'Rigorous, auditable safety analysis aligned with mission-critical and MIL-SPEC regulatory expectations.',
          points: [
            { point: 'System safety assessments, hazard tracking, and independent review' },
            { point: 'Support for complex electromechanical and autonomous defense platforms' },
          ],
          standards: [{ code: 'MIL-STD-882' }, { code: 'IEC 61508' }, { code: 'DEF-STANs (program-specific)' }],
        },
        {
          title: 'Process Industry',
          desc: 'High-integrity protection systems that prevent catastrophic chemical and energy hazards.',
          points: [
            { point: 'SIL determination, LOPA, SIF design review, and safety lifecycle audits' },
            { point: 'Safety instrumented system validation and compliance evidence' },
          ],
          standards: [{ code: 'IEC 61511' }, { code: 'IEC 61508' }, { code: 'API RP 754 (supporting)' }],
        },
      ],

      /* ------------------------------------------- Standing Apart / How we work */
      saEyebrow: 'Standing apart',
      saHeading: 'How we work.',
      saLead: rt(
        'We operate as an embedded extension of your team, using an advanced AI-augmented approach to deliver release-ready safety cases faster — and with unmatched precision.',
      ),
      saMandateKey: 'Human expertise + AI acceleration.',
      saMandateTag: 'Our human-in-the-loop mandate',
      saColOld: 'The old way',
      saColNew: 'The CSA AI-augmented way',
      saRows: [
        {
          theme: 'Speed',
          oldTitle: 'Slow & manual',
          oldDesc: 'Teams spend weeks gathering raw inputs and drowning in manual preparation work.',
          newTitle: 'Accelerated core baseline',
          newDesc: 'Specialized AI tools immediately extract initial data and automate preparation, clearing engineering bottlenecks.',
        },
        {
          theme: 'Accuracy',
          oldTitle: 'Imprecise & inconsistent',
          oldDesc: 'Manual checking leaves programs vulnerable to systematic failures or misaligned design requirements.',
          newTitle: 'Data-driven & consistent',
          newDesc: 'Automated consistency checks maintain absolute accuracy across complex, multi-layered requirements.',
        },
        {
          theme: 'Cost',
          oldTitle: 'Expensive rework',
          oldDesc: 'Safety is treated as a late-stage checkbox, forcing delays and redesigns at the end of a project.',
          newTitle: 'Continuous integration',
          newDesc: 'Identifying architectural safety concerns early in the V-model phase cuts your long-term cost of ownership.',
        },
        {
          theme: 'Utility',
          oldTitle: 'Academic & disconnected',
          oldDesc: 'Dense compliance summaries delivered without real-world, machine-building utility.',
          newTitle: 'Expert, actionable auditing',
          newDesc: 'Senior safety engineers directly guide and verify every output — a strict human-in-the-loop mandate.',
        },
      ],
      saNeverLabel: 'Where we never rely on AI',
      saNeverItems: [
        { label: 'Expert review' },
        { label: 'Expert approvals' },
        { label: 'Final sign-off' },
      ],
      saNeverNote: 'A qualified safety engineer is always in the loop.',

      /* ------------------------------------------------------- About / Founder */
      abEyebrow: 'About CSA',
      abHeading: 'Meet the founder.',
      abName: 'Ben Twombly',
      abRole: 'Founder & CEO',
      abLocation: 'Sarasota, FL',
      abCallout: 'Principal-led',
      abCerts: [
        { title: 'FS Engineer', sub: 'Certified by TÜV Rheinland' },
        { title: 'IFSP', sub: 'Industrial Functional Safety Professional' },
      ],
      abBio: rt(
        'Ben Twombly is the CEO and founder of Critical Systems Analysis, a functional safety consulting firm based in Sarasota, Florida. He holds an FS Engineer certification from TÜV Rheinland and the Industrial Functional Safety Professional (IFSP) certification. Before co-founding CSA in May 2023, he spent six years as a Senior Safety Engineer at TÜV Rheinland, preparing clients for safety assessments across a wide range of safety-critical systems. He earned his degree in robotics from the Colorado School of Mines.',
        'At CSA, Ben and his team work with robotics companies, autonomous vehicle manufacturers, industrial machinery firms, battery management system developers, and rail transit organizations across the U.S., Canada, and Europe.',
      ),
      abExperienceLabel: 'Hands-on certification experience',
      abExperience: [
        { label: 'Autonomous mobile robots' },
        { label: 'Humanoid robots' },
        { label: 'Autonomous agricultural equipment' },
        { label: 'Heavy haul trucks' },
        { label: 'Autonomous delivery vehicles' },
        { label: 'AGVs' },
        { label: 'Battery management systems' },
        { label: 'Industrial machinery' },
        { label: 'Rail signaling systems' },
      ],
      abFieldLabel: 'Active in the field',
      abFieldNote:
        'CSA contributes to the development of functional safety standards and is present at the industry’s leading events each year.',
      abConferences: [
        { label: 'Robotics Summit & Expo' },
        { label: 'Automate' },
        { label: 'International Robot Safety Conference' },
      ],
      abCtaLabel: 'Meet the Team',

      /* ----------------------------------------------------- News / Insights */
      nwEyebrow: 'Insights',
      nwHeading: 'Latest news.',
      nwLead:
        'Field notes, standards updates, and what we’re learning at the frontier of functional safety.',
      nwCtaLabel: 'Visit the Resource Center',
      nwArticles: [
        {
          category: 'Standards',
          date: 'Jun 2026',
          title: 'ISO/PAS 8800 and the road to certifying AI in safety-critical systems.',
        },
        {
          category: 'Field Notes',
          date: 'May 2026',
          title: 'What we learned certifying a collaborative humanoid for the factory floor.',
        },
        {
          category: 'Company',
          date: 'Apr 2026',
          title: 'CSA joins the program committee for the International Robot Safety Conference.',
        },
      ],

      /* ----------------------------------------------------------- Closing CTA */
      ctaEyebrow: 'Ready when you are.',
      ctaHeading: 'Build Safer. Scale Confidently.',
      ctaSub: 'Integrate functional safety without slowing down development. Let’s talk about your next safety-critical system.',
      ctaPrimary: 'Book a Consultation',
      ctaSecondary: 'See Our Services',
      ctaBlurb:
        'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',

      /* ------------------------------------------------------------------ SEO */
      seo: {
        metaTitle: 'Functional Safety Engineering Consulting | CSA',
        metaDescription:
          'Functional safety engineering consulting for autonomous rail, robotics & machinery. Principal-led HARA, FMEA, ISO 26262 & IEC 61508 support. Faster certification.',
      },
    },
  ],
}
