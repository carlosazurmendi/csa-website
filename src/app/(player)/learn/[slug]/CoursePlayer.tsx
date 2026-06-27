'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { toEmbedUrl } from '@/lib/video'
import { markLessonComplete } from '../actions'
import { Ic } from './PlayerIcon'

/**
 * Course Player (client) — port of assets/course-player.jsx, bound to CMS data:
 * left navigator + final-assessment entry, centre video (uploaded <video> or
 * embedded URL) + inline knowledge check, right lesson notes (summary, key points,
 * standards) + downloadable resources, footer prev/next + mark-complete. Progress
 * persists server-side via markLessonComplete (owner-scoped). The knowledge check
 * is formative (client-graded). Native video controls (the export's custom bar
 * only fit the stub clip; native handles upload + embed).
 */

export type PlayerQuizQuestion = {
  prompt: string
  options: string[]
  answerIndex: number
  explanation: string
}
export type PlayerQuiz = { passScore: number; questions: PlayerQuizQuestion[] }
export type PlayerResource = { name: string; url: string; type: string; sizeLabel: string }

export type PlayerLesson = {
  global: number
  moduleIndex: number
  lessonIndex: number
  moduleN: string
  moduleTitle: string
  title: string
  uploadUrl?: string | null
  videoUrl?: string | null
  bodyParas: string[]
  keyPoints: string[]
  quiz: PlayerQuiz | null
  resources: PlayerResource[]
}
export type PlayerModule = {
  moduleIndex: number
  n: string
  title: string
  lessons: { global: number; title: string }[]
}
export type PlayerData = {
  courseId: number | string
  slug: string
  title: string
  code: string
  standards: string[]
  modules: PlayerModule[]
  lessons: PlayerLesson[]
  completed: { moduleIndex: number; lessonIndex: number }[]
  startGlobal: number
  hasAssessment: boolean
}

const keyOf = (mi: number, li: number) => `${mi}.${li}`

function fmtTime(sec: number): string {
  const s = Math.max(0, Math.round(sec || 0))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r < 10 ? '0' : ''}${r}`
}

const RATES = [0.75, 1, 1.25, 1.5, 1.75, 2]
const QUALITIES = ['1080p', '720p', '480p', 'Auto']

/**
 * Video player — port of the design's VideoPlayer. For an uploaded video or a
 * direct MP4 URL it renders the full custom control bar over a <video> (poster →
 * play, seek, play/pause, mute, time, settings gear with playback speed + quality,
 * captions, fullscreen). YouTube/Vimeo embeds keep their own iframe controls;
 * lessons with no video show the designed poster. Mounted with key={lesson} by the
 * parent so all state resets on lesson change. Quality + captions are presentation
 * controls (single source / no track), matching the design.
 */
function VideoPlayer({ lesson }: { lesson: PlayerLesson }) {
  const vRef = useRef<HTMLVideoElement>(null)
  const seekRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'buffering' | 'playing' | 'paused'>('idle')
  const [t, setT] = useState(0)
  const [dur, setDur] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [muted, setMuted] = useState(false)
  const [rate, setRate] = useState(1)
  const [quality, setQuality] = useState('Auto')
  const [ccOn, setCcOn] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [isFs, setIsFs] = useState(false)

  // Track fullscreen so the control swaps maximize ⇄ minimize (Esc also exits).
  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const embed = !lesson.uploadUrl && lesson.videoUrl ? toEmbedUrl(lesson.videoUrl) : null
  const src = lesson.uploadUrl || (!embed ? lesson.videoUrl : null) || null

  // Embedded provider (YouTube/Vimeo) — its own controls.
  if (embed) {
    return (
      <div className="cp-video">
        <iframe
          className="cp-video__el"
          src={embed}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // No video yet — designed poster.
  if (!src) {
    return (
      <div className="cp-video">
        <div className="cp-poster">
          <div className="cp-poster__grid"></div>
          <div className="cp-poster__lower">
            <p className="cp-poster__kicker">
              Module {lesson.moduleN} · Lesson {lesson.lessonIndex + 1}
            </p>
            <h3 className="cp-poster__heading">{lesson.title}</h3>
            <p className="cp-notes__sub" style={{ marginTop: 8 }}>Video coming soon for this lesson.</p>
          </div>
        </div>
      </div>
    )
  }

  const v = () => vRef.current
  const onPlayClick = () => {
    setState('buffering')
    v()
      ?.play()
      .catch(() => setState('paused'))
  }
  const togglePlay = () => {
    const el = v()
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }
  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = v()
    const bar = seekRef.current
    if (!el || !bar || !dur) return
    const r = bar.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    el.currentTime = p * dur
    setT(p * dur)
  }
  const cycleRate = () => {
    const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length]
    setRate(next)
    if (v()) v()!.playbackRate = next
  }
  const setSpeed = (n: number) => {
    setRate(n)
    if (v()) v()!.playbackRate = n
  }
  const toggleMute = () => {
    const el = v()
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }
  const toggleCc = () => {
    const el = v()
    const track = el?.textTracks?.[0]
    if (track) track.mode = ccOn ? 'disabled' : 'showing'
    setCcOn((c) => !c)
  }
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      const box = v()?.closest('.cp-video') as HTMLElement | null
      box?.requestFullscreen?.()
    }
  }

  const pct = dur ? (t / dur) * 100 : 0
  const showPoster = state === 'idle'
  const showSkel = state === 'buffering'
  const cls = 'cp-video' + (state === 'playing' ? ' is-playing' : state === 'paused' ? ' is-paused' : '')

  return (
    <div className={cls}>
      <video
        ref={vRef}
        className="cp-video__el"
        src={src}
        preload="metadata"
        playsInline
        onPlaying={() => setState('playing')}
        onPause={() => setState((s) => (s === 'idle' ? s : 'paused'))}
        onWaiting={() => setState('buffering')}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          if (e.currentTarget.duration && isFinite(e.currentTarget.duration)) setDur(e.currentTarget.duration)
        }}
        onProgress={(e) => {
          const el = e.currentTarget
          if (el.buffered.length && el.duration) setBuffered((el.buffered.end(el.buffered.length - 1) / el.duration) * 100)
        }}
        onEnded={() => setState('paused')}
      />

      {showPoster && (
        <div className="cp-poster" onClick={onPlayClick}>
          <div className="cp-poster__grid"></div>
          <span className="cp-poster__reg"></span>
          <span className="cp-poster__reg cp-poster__reg--br"></span>
          <span className="cp-poster__cdn">
            <Ic name="cloud" /> Lesson video
          </span>
          <button className="cp-poster__play" aria-label="Play lesson">
            <Ic name="play" />
          </button>
          <div className="cp-poster__lower">
            <p className="cp-poster__kicker">
              Module {lesson.moduleN} · Lesson {lesson.lessonIndex + 1}
            </p>
            <h3 className="cp-poster__heading">{lesson.title}</h3>
          </div>
        </div>
      )}

      {showSkel && (
        <div className="cp-video__skel">
          <div className="cp-video__skel-mark">
            <span className="cp-spinner"></span>
            <span>Buffering…</span>
          </div>
        </div>
      )}

      {!showPoster && (
        <div className="cp-ctrls">
          <div className="cp-seek" ref={seekRef} onClick={onSeek}>
            <div className="cp-seek__track">
              <div className="cp-seek__buf" style={{ width: buffered + '%' }}></div>
              <div className="cp-seek__fill" style={{ width: pct + '%' }}></div>
            </div>
            <div className="cp-seek__knob" style={{ left: pct + '%' }}></div>
          </div>
          <div className="cp-ctrls__row">
            <button className="cp-cbtn cp-cbtn--play" onClick={togglePlay} aria-label="Play / pause">
              <Ic name={state === 'playing' ? 'pause' : 'play'} />
            </button>
            <button className="cp-cbtn" onClick={toggleMute} aria-label="Mute">
              <Ic name={muted ? 'volume-x' : 'volume-2'} />
            </button>
            <span className="cp-ctrls__time">
              {fmtTime(t)}
              <span className="sep">/</span>
              {fmtTime(dur)}
            </span>
            <span className="cp-ctrls__spacer"></span>
            <button className="cp-ctrls__rate" onClick={cycleRate} aria-label="Playback speed">
              {rate}×
            </button>
            <button
              className={'cp-cbtn' + (ccOn ? ' is-active' : '')}
              onClick={toggleCc}
              aria-label="Captions"
              aria-pressed={ccOn}
            >
              <Ic name="captions" />
            </button>
            <div className="cp-settings">
              <button
                className={'cp-cbtn' + (settingsOpen ? ' is-active' : '')}
                aria-label="Settings"
                aria-haspopup="true"
                aria-expanded={settingsOpen}
                onClick={() => setSettingsOpen((o) => !o)}
              >
                <Ic name="settings" />
              </button>
              {settingsOpen && (
                <>
                  <div className="cp-settings__scrim" onClick={() => setSettingsOpen(false)}></div>
                  <div className="cp-settings__pop" role="menu">
                    <p className="cp-settings__title">
                      <Ic name="monitor-play" /> Playback speed
                    </p>
                    <ul className="cp-settings__list">
                      {RATES.map((r) => (
                        <li key={r}>
                          <button
                            className={'cp-settings__opt' + (r === rate ? ' is-selected' : '')}
                            role="menuitemradio"
                            aria-checked={r === rate}
                            onClick={() => setSpeed(r)}
                          >
                            <span className="cp-settings__check">{r === rate && <Ic name="check" />}</span>
                            <span className="cp-settings__label">{r}×</span>
                            {r === 1 && <span className="cp-settings__hint">Normal</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className="cp-settings__title" style={{ marginTop: 6 }}>
                      <Ic name="monitor-play" /> Video quality
                    </p>
                    <ul className="cp-settings__list">
                      {QUALITIES.map((q) => (
                        <li key={q}>
                          <button
                            className={'cp-settings__opt' + (q === quality ? ' is-selected' : '')}
                            role="menuitemradio"
                            aria-checked={q === quality}
                            onClick={() => {
                              setQuality(q)
                              setSettingsOpen(false)
                            }}
                          >
                            <span className="cp-settings__check">{q === quality && <Ic name="check" />}</span>
                            <span className="cp-settings__label">{q}</span>
                            {q === 'Auto' && <span className="cp-settings__hint">Recommended</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
            <button
              className="cp-cbtn"
              onClick={toggleFullscreen}
              aria-label={isFs ? 'Exit fullscreen' : 'Fullscreen'}
            >
              <Ic name={isFs ? 'minimize' : 'maximize'} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/** Resource file-type → lucide icon, mirroring the design's typeMeta. */
function resIcon(type: string): string {
  if (type === 'XLSX' || type === 'XLS' || type === 'CSV') return 'file-spreadsheet'
  if (type === 'ZIP') return 'folder-archive'
  return 'file-text'
}

/**
 * Inline knowledge check (formative). Client-graded against the answer keys with a
 * pass score + per-question explanations. Mounted with key={lesson} so its state
 * resets on lesson change. Separate from the graded final assessment (Phase C).
 */
function KnowledgeCheck({ quiz }: { quiz: PlayerQuiz }) {
  const qs = quiz.questions
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [graded, setGraded] = useState(false)

  const allAnswered = qs.every((_, i) => answers[i] != null)
  const correctCount = qs.filter((q, i) => answers[i] === q.answerIndex).length
  const score = qs.length ? Math.round((correctCount / qs.length) * 100) : 0
  const passed = score >= (quiz.passScore || 100)
  const pick = (qi: number, oi: number) => {
    if (graded) return
    setAnswers((a) => ({ ...a, [qi]: oi }))
  }

  return (
    <section className="cp-quiz" data-screen-label="Knowledge Check">
      <div className="cp-quiz__head">
        <span className="cp-quiz__ic">
          <Ic name="list-checks" />
        </span>
        <div className="cp-quiz__htxt">
          <p className="cp-quiz__eyebrow">Knowledge check</p>
          <h3 className="cp-quiz__title">Quick questions for this lesson</h3>
        </div>
        <span className="cp-quiz__score">
          {qs.length} {qs.length === 1 ? 'question' : 'questions'}
        </span>
      </div>
      <div className="cp-quiz__body">
        {qs.map((q, qi) => {
          const sel = answers[qi]
          return (
            <div className={'cp-q' + (graded ? ' is-graded' : '')} key={qi}>
              <span className="cp-q__num">Q{qi + 1}</span>
              <p className="cp-q__prompt">{q.prompt}</p>
              <div className="cp-opts">
                {q.options.map((opt, oi) => {
                  let cls = 'cp-opt'
                  if (!graded && sel === oi) cls += ' is-selected'
                  if (graded && oi === q.answerIndex) cls += ' is-correct'
                  if (graded && sel === oi && oi !== q.answerIndex) cls += ' is-wrong'
                  const showCheck = (!graded && sel === oi) || (graded && oi === q.answerIndex)
                  const showX = graded && sel === oi && oi !== q.answerIndex
                  return (
                    <button type="button" className={cls} key={oi} onClick={() => pick(qi, oi)}>
                      <span className="cp-opt__mark">
                        {showCheck && <Ic name="check" />}
                        {showX && <Ic name="x" />}
                      </span>
                      <span>{opt}</span>
                      <span className="cp-opt__letter">{String.fromCharCode(65 + oi)}</span>
                    </button>
                  )
                })}
              </div>
              {graded && (
                <div className={'cp-q__fb ' + (sel === q.answerIndex ? 'cp-q__fb--ok' : 'cp-q__fb--no')}>
                  <Ic name={sel === q.answerIndex ? 'check-circle-2' : 'info'} />
                  <span>
                    <b>{sel === q.answerIndex ? 'Correct. ' : 'Not quite. '}</b>
                    {q.explanation}
                  </span>
                </div>
              )}
            </div>
          )
        })}

        <div className="cp-quiz__foot">
          {graded ? (
            <>
              <span className={'cp-quiz__result ' + (passed ? 'cp-quiz__result--pass' : 'cp-quiz__result--fail')}>
                <Ic name={passed ? 'shield-check' : 'alert-triangle'} />
                {passed ? 'Passed' : 'Review needed'} — {correctCount}/{qs.length} correct ({score}%)
              </span>
              <button
                className="cp-quiz__reset"
                onClick={() => {
                  setAnswers({})
                  setGraded(false)
                }}
              >
                <Ic name="rotate-ccw" /> Try again
              </button>
            </>
          ) : (
            <>
              <span className="cp-quiz__score">Select an answer for each question</span>
              <button className="btn btn--gold-solid" disabled={!allAnswered} onClick={() => setGraded(true)}>
                Check Answers <Ic name="arrow-right" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export function CoursePlayer({ data, userInitials }: { data: PlayerData; userInitials: string }) {
  const router = useRouter()
  const flat = data.lessons
  const total = flat.length

  const [current, setCurrent] = useState(data.startGlobal)
  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set(data.completed.map((c) => keyOf(c.moduleIndex, c.lessonIndex))),
  )
  const [openMods, setOpenMods] = useState<Set<number>>(
    () => new Set([flat[data.startGlobal]?.moduleIndex ?? 0]),
  )
  const [navOpen, setNavOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const lesson = flat[current]
  const percent = total ? Math.round((completed.size / total) * 100) : 0
  const isDone = completed.has(keyOf(lesson.moduleIndex, lesson.lessonIndex))

  const goTo = useCallback(
    (g: number) => {
      if (g < 0 || g >= total) return
      setCurrent(g)
      const mi = flat[g].moduleIndex
      setOpenMods((s) => new Set(s).add(mi))
      setNavOpen(false)
      // Lesson switching is pure client state — like the design's player. We do NOT
      // touch the URL: Next 16's router intercepts history.pushState/replaceState and
      // re-renders the route, which would re-fetch the server component and crash on
      // reconcile. Deep-links (?m&l from the dashboard Resume link) are still honored
      // on a hard load by the server page; in-player navigation stays instant.
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch {
        // ignore
      }
    },
    [flat, total],
  )

  const toggleMod = useCallback((mi: number) => {
    setOpenMods((s) => {
      const n = new Set(s)
      if (n.has(mi)) n.delete(mi)
      else n.add(mi)
      return n
    })
  }, [])

  async function markComplete() {
    if (saving) return
    const k = keyOf(lesson.moduleIndex, lesson.lessonIndex)
    const done = !isDone
    setCompleted((prev) => {
      const n = new Set(prev)
      if (done) n.add(k)
      else n.delete(k)
      return n
    })
    setSaving(true)
    const res = await markLessonComplete(data.courseId, lesson.moduleIndex, lesson.lessonIndex, done)
    setSaving(false)
    if (res.error) {
      // revert on failure
      setCompleted((prev) => {
        const n = new Set(prev)
        if (done) n.delete(k)
        else n.add(k)
        return n
      })
    } else {
      router.refresh()
    }
  }

  const prevG = current > 0 ? current - 1 : -1
  const nextG = current < total - 1 ? current + 1 : -1

  return (
    <div className={'cp' + (navOpen ? ' is-nav-open' : '')}>
      {/* slim brand header */}
      <header className="cp-top" data-screen-label="Player Header">
        <button className="cp-top__burger" onClick={() => setNavOpen((o) => !o)} aria-label="Toggle lessons">
          <Ic name="menu" />
        </button>
        <div className="cp-top__brand">
          <Link href="/dashboard" aria-label="CSA Academy — Dashboard">
            <img className="cp-top__logo" src="/csa/logo-white.png" alt="CSA" />
          </Link>
          <span className="cp-top__div"></span>
          <div className="cp-top__course">
            <span className="cp-top__eyebrow">CSA Academy</span>
            <p className="cp-top__title">{data.title}</p>
          </div>
        </div>
        <div className="cp-top__prog">
          <span className="cp-top__prog-label">
            <b>{percent}%</b> complete
          </span>
          <div className="cp-top__prog-track">
            <div className="cp-top__prog-fill" style={{ width: percent + '%' }}></div>
          </div>
        </div>
        <div className="cp-top__right">
          <Link className="cp-top__exit" href="/dashboard">
            <Ic name="log-out" />
            <span>Exit to dashboard</span>
          </Link>
          <span className="cp-top__avatar">{userInitials}</span>
        </div>
      </header>

      <div className="cp-shell">
        {/* left navigator */}
        <nav className="cp-nav" data-screen-label="Lesson Navigator">
          <div className="cp-nav__head">
            <p className="cp-nav__crumb">
              <Ic name="graduation-cap" /> Course curriculum
            </p>
            <h2 className="cp-nav__title">{data.title}</h2>
            {data.code && <span className="cp-nav__code">{data.code}</span>}
            <div className="cp-nav__prog">
              <div className="cp-nav__prog-top">
                <span className="cp-nav__prog-pct">{percent}%</span>
                <span className="cp-nav__prog-of">
                  {completed.size} / {total} lessons
                </span>
              </div>
              <div className="cp-nav__prog-track">
                <div className="cp-nav__prog-fill" style={{ width: percent + '%' }}></div>
              </div>
            </div>
          </div>

          {data.modules.map((mod) => {
            const open = openMods.has(mod.moduleIndex)
            const done = mod.lessons.filter((l) => {
              const fl = flat[l.global]
              return completed.has(keyOf(fl.moduleIndex, fl.lessonIndex))
            }).length
            return (
              <div className={'cp-mod' + (open ? ' is-open' : '')} key={mod.moduleIndex}>
                <button className="cp-mod__head" onClick={() => toggleMod(mod.moduleIndex)} aria-expanded={open}>
                  <span className="cp-mod__n">{mod.n}</span>
                  <span>
                    <span className="cp-mod__name">{mod.title}</span>
                    <span className="cp-mod__meta">
                      {done}/{mod.lessons.length} · {done === mod.lessons.length ? 'complete' : 'in progress'}
                    </span>
                  </span>
                  <span className="cp-mod__chev">
                    <Ic name="chevron-down" />
                  </span>
                </button>
                <div className="cp-mod__body">
                  <div className="cp-mod__inner">
                    <ul className="cp-mod__lessons">
                      {mod.lessons.map((l) => {
                        const fl = flat[l.global]
                        const lDone = completed.has(keyOf(fl.moduleIndex, fl.lessonIndex))
                        const isCur = l.global === current
                        return (
                          <li key={l.global}>
                            <button
                              className={'cp-lrow' + (isCur ? ' is-current' : '') + (lDone ? ' is-completed' : '')}
                              onClick={() => goTo(l.global)}
                            >
                              <span
                                className={
                                  'cp-lrow__ic' +
                                  (lDone ? ' cp-lrow__ic--done' : isCur ? '' : ' cp-lrow__ic--upcoming')
                                }
                              >
                                {lDone ? (
                                  <Ic name="check-circle-2" />
                                ) : isCur ? (
                                  <Ic name="play-circle" />
                                ) : (
                                  <span className="cp-lrow__dot"></span>
                                )}
                              </span>
                              <span className="cp-lrow__title">{l.title}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Final assessment — gates the certificate; unlocks at 100% (Phase C). */}
          <div className="cp-final" data-screen-label="Final Assessment Entry">
            {percent >= 100 ? (
              <Link className="cp-final__row" href={`/assessment/${data.slug}`} title="Final assessment">
                <span className="cp-final__ic">
                  <Ic name="clipboard-check" />
                </span>
                <span className="cp-final__tx">
                  <span className="cp-final__t">Final assessment</span>
                  <span className="cp-final__d">Unlocked — take the graded assessment</span>
                </span>
                <span className="cp-final__go">
                  <Ic name="arrow-right" />
                </span>
              </Link>
            ) : (
              <div className="cp-final__row is-locked" aria-disabled title="Complete all lessons to unlock">
                <span className="cp-final__ic">
                  <Ic name="lock" />
                </span>
                <span className="cp-final__tx">
                  <span className="cp-final__t">Final assessment</span>
                  <span className="cp-final__d">Complete all lessons to unlock</span>
                </span>
              </div>
            )}
          </div>
        </nav>

        {/* centre */}
        <main className="cp-main" data-screen-label="Course Player">
          <div className="cp-main__scroll">
            <div className="cp-main__wrap">
              <div className="cp-lhead">
                <p className="cp-lhead__eyebrow">
                  Module {lesson.moduleN} <span className="sep">·</span> {lesson.moduleTitle}{' '}
                  <span className="sep">·</span> Lesson {lesson.lessonIndex + 1}
                </p>
                <h1 className="cp-lhead__title">{lesson.title}</h1>
                <div className="cp-lhead__meta">
                  <span className="cp-lhead__chip">
                    <Ic name="play-circle" /> Video lesson
                  </span>
                  <span className="cp-lhead__chip">
                    <Ic name="layers" /> Lesson {current + 1} of {total}
                  </span>
                  {isDone && (
                    <span className="cp-lhead__chip" style={{ color: 'var(--status-safe)' }}>
                      <Ic name="check-circle-2" /> Completed
                    </span>
                  )}
                </div>
              </div>

              <VideoPlayer lesson={lesson} key={'v' + current} />

              {lesson.quiz && lesson.quiz.questions.length > 0 && (
                <KnowledgeCheck quiz={lesson.quiz} key={'q' + current} />
              )}
            </div>
          </div>

          <footer className="cp-footer" data-screen-label="Lesson Footer">
            <button
              className={'cp-footer__nav cp-footer__nav--prev' + (prevG >= 0 ? '' : ' is-disabled')}
              onClick={() => goTo(prevG)}
              disabled={prevG < 0}
            >
              <Ic name="arrow-left" />
              <span className="cp-footer__nav-txt">
                <span className="cp-footer__nav-k">Previous</span>
                <span className="cp-footer__nav-l">{prevG >= 0 ? flat[prevG].title : 'Start of course'}</span>
              </span>
            </button>

            <div className="cp-footer__center">
              <button
                className={'btn btn--gold-solid btn--lg cp-footer__complete' + (isDone ? ' is-done' : '')}
                onClick={markComplete}
                disabled={saving}
              >
                {isDone ? (
                  <>
                    <Ic name="check-circle-2" /> Completed
                  </>
                ) : (
                  <>
                    <Ic name="check" /> {saving ? 'Saving…' : 'Mark Complete'}
                  </>
                )}
              </button>
            </div>

            {nextG >= 0 ? (
              <button className="cp-footer__nav cp-footer__nav--next" onClick={() => goTo(nextG)}>
                <span className="cp-footer__nav-txt">
                  <span className="cp-footer__nav-k">Next</span>
                  <span className="cp-footer__nav-l">{flat[nextG].title}</span>
                </span>
                <Ic name="arrow-right" />
              </button>
            ) : (
              <span
                className="cp-footer__nav cp-footer__nav--next is-disabled"
                title={percent >= 100 ? 'Course complete' : 'Complete all lessons'}
              >
                <span className="cp-footer__nav-txt">
                  <span className="cp-footer__nav-k">{percent >= 100 ? 'Course complete' : 'Final lesson'}</span>
                  <span className="cp-footer__nav-l">
                    {percent >= 100 ? 'All lessons done' : 'Mark complete to finish'}
                  </span>
                </span>
                <Ic name={percent >= 100 ? 'check-circle-2' : 'flag'} />
              </span>
            )}
          </footer>
        </main>

        {/* right aside — lesson notes + resources */}
        <aside className="cp-aside" data-screen-label="Lesson Info Sidebar">
          <div className="cp-aside__inner">
            <section className="cp-aside__sec" data-screen-label="Lesson Notes">
              <h4 className="cp-aside__h">
                <Ic name="notebook-pen" /> In this lesson
              </h4>
              {lesson.bodyParas.length > 0 ? (
                lesson.bodyParas.map((p, i) => (
                  <p className="cp-notes__lead" key={i} style={{ marginTop: i ? 10 : 0 }}>
                    {p}
                  </p>
                ))
              ) : (
                <p className="cp-notes__lead" style={{ color: 'var(--fg-3)' }}>
                  A summary for this lesson is coming soon.
                </p>
              )}

              {lesson.keyPoints.length > 0 && (
                <>
                  <p className="cp-notes__sub">Key points</p>
                  <ul className="cp-notes__list">
                    {lesson.keyPoints.map((k) => (
                      <li key={k}>
                        <Ic name="check" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {data.standards.length > 0 && (
                <>
                  <p className="cp-notes__sub">Standards referenced</p>
                  <div className="cp-stds">
                    {data.standards.map((s) => (
                      <span className="cp-std" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </section>

            {lesson.resources.length > 0 && (
              <section className="cp-aside__sec" data-screen-label="Downloadable Resources">
                <h4 className="cp-aside__h">
                  <Ic name="folder-down" /> Downloadable resources
                </h4>
                <div className="cp-res__list">
                  {lesson.resources.map((r, i) => {
                    const inner = (
                      <>
                        <span className="cp-res-item__ic">
                          <Ic name={resIcon(r.type)} />
                          <span className="cp-res-item__ext">{r.type}</span>
                        </span>
                        <div className="cp-res-item__txt">
                          <p className="cp-res-item__name">{r.name}</p>
                          <p className="cp-res-item__meta">
                            {r.type}
                            {r.sizeLabel && (
                              <>
                                <span className="dot">·</span>
                                {r.sizeLabel}
                              </>
                            )}
                          </p>
                        </div>
                        <span className="cp-res-item__dl">
                          <Ic name="download" />
                        </span>
                      </>
                    )
                    return r.url ? (
                      <a
                        className="cp-res-item"
                        key={r.name + i}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="cp-res-item" key={r.name + i} title="Download available soon">
                        {inner}
                      </div>
                    )
                  })}
                </div>
                <p className="cp-res__note">
                  <Ic name="lock" /> Served from secure storage via signed URLs
                </p>
              </section>
            )}
          </div>
        </aside>
      </div>

      <div className="cp-scrim" onClick={() => setNavOpen(false)}></div>
    </div>
  )
}
