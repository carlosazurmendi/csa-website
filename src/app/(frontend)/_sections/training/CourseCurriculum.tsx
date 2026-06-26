'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from '../../_components/Chevron'

/**
 * CourseCurriculum — client port of the curriculum accordion from
 * design-reference/project/Training - Templates/Course.html (the inline `Module`
 * component + the `openMod` state on `Page`). The module/lesson data is loaded
 * server-side from the `courses` collection and passed in as plain props.
 *
 * The live course player / lesson playback is a later milestone (M6); this renders
 * the curriculum outline statically, with only the expand/collapse interactivity.
 */

export type CurriculumModule = {
  n: string
  title: string
  lessons: string[]
}

/* ---------- Curriculum module (accordion) ---------- */
function Module({
  m,
  open,
  onToggle,
}: {
  m: CurriculumModule
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className={'cl-mod' + (open ? ' is-open' : '')}>
      <button className="cl-mod__head" onClick={onToggle} aria-expanded={open}>
        <span className="cl-mod__num">{m.n}</span>
        <span className="cl-mod__title">{m.title}</span>
        <span className="cl-mod__count">{m.lessons.length} lessons</span>
        <span className="cl-mod__chev"><ChevronDown /></span>
      </button>
      <div className="cl-mod__body">
        <div className="cl-mod__inner">
          <ul className="cl-mod__lessons">
            {m.lessons.map((l) => (
              <li className="cl-lesson" key={l}><i data-lucide="play-circle"></i> {l}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function CourseCurriculum({ modules }: { modules: CurriculumModule[] }) {
  const [openMod, setOpenMod] = useState(0)

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  })

  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0)

  return (
    <>
      <div className="cl-curric">
        {modules.map((m, i) => (
          <Module key={m.n} m={m} open={openMod === i} onToggle={() => setOpenMod(openMod === i ? -1 : i)} />
        ))}
      </div>
      <p className="cl-curric__note">{modules.length} modules · {totalLessons} lessons · Certificate of completion</p>
    </>
  )
}
