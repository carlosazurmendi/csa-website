'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { ClientAssessment, PriorAttempt } from '@/lib/assessment'
import { submitAssessment } from '../actions'
import { Ic } from './AssessmentIcon'

/**
 * Final Assessment client — pixel-faithful port of design-reference/project/assets/
 * assessment.jsx. Four states (cover · quiz · result · review). Questions and
 * options are deterministically re-shuffled per attempt for DISPLAY only; the
 * browser submits selections keyed by stable question id + CANONICAL option index.
 * Grading happens SERVER-SIDE (submitAssessment) — no answer keys exist on the
 * client; the per-question correct index + explanation arrive only in the graded
 * response and drive the Review screen.
 */

type Course = { slug: string; title: string; code: string; standards: string[] }
type Layout = { order: number[]; optPerms: number[][] }
type Result = { score: number; passed: boolean; total: number; correct: number; attemptNo: number }
type ReviewMap = Record<string, { correctIndex: number; explanation: string }>

export type AssessmentData = {
  course: Course | null
  assessment: ClientAssessment | null
  priorAttempts: PriorAttempt[]
  certificateId: string | null
  resumeCourseHref: string
  initials: string
  fullName: string
}

/* ---------- seeded shuffle (deterministic per attempt) ---------- */
function mulberry32(a: number) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function shuffled(n: number, rnd: () => number): number[] {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
function buildLayout(asmt: ClientAssessment, attemptNo: number): Layout {
  const qs = asmt.questions
  const rnd = mulberry32(((String(asmt.id).length * 2654435761 + attemptNo * 40503) >>> 0) as number)
  const order = asmt.shuffle ? shuffled(qs.length, rnd) : qs.map((_, i) => i)
  const optPerms = qs.map((q) => (asmt.shuffle ? shuffled(q.options.length, rnd) : q.options.map((_, i) => i)))
  return { order, optPerms }
}

const scrollTop = () => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch {
    window.scrollTo(0, 0)
  }
}

export function AssessmentClient({ data }: { data: AssessmentData }) {
  const { course, assessment: asmt, resumeCourseHref, initials, fullName } = data

  /* ---------- NOT FOUND ---------- */
  if (!course || !asmt) {
    return (
      <div className="as">
        <main className="as-main" style={{ textAlign: 'center', paddingTop: 140 }}>
          <h1 className="as-cover__title" style={{ fontSize: 36 }}>
            Assessment not found.
          </h1>
          <p className="as-cover__lead" style={{ margin: '0 auto 26px' }}>
            We couldn&rsquo;t load this assessment. Head back to your dashboard.
          </p>
          <a className="btn btn--gold-pill btn--lg" href="/dashboard">
            Back to Dashboard <Ic name="arrow-right" />
          </a>
        </main>
      </div>
    )
  }

  return <AssessmentRunner course={course} asmt={asmt} data={data} resumeCourseHref={resumeCourseHref} initials={initials} fullName={fullName} />
}

function AssessmentRunner({
  course,
  asmt,
  data,
  resumeCourseHref,
  initials,
  fullName,
}: {
  course: Course
  asmt: ClientAssessment
  data: AssessmentData
  resumeCourseHref: string
  initials: string
  fullName: string
}) {
  const [screen, setScreen] = useState<'cover' | 'quiz' | 'result' | 'review'>('cover')
  const [attemptNo, setAttemptNo] = useState(1)
  const [layout, setLayout] = useState<Layout>(() => buildLayout(asmt, 1))
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [current, setCurrent] = useState(0)
  const [startedAt, setStartedAt] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [reviewMap, setReviewMap] = useState<ReviewMap>({})
  const [attempts, setAttempts] = useState<PriorAttempt[]>(data.priorAttempts)
  const [certificateId, setCertificateId] = useState<string | null>(data.certificateId)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalFails = attempts.filter((a) => !a.passed).length
  const bestPass = attempts.some((a) => a.passed)

  const beginAttempt = useCallback(
    (n: number) => {
      setAttemptNo(n)
      setLayout(buildLayout(asmt, n))
      setAnswers({})
      setCurrent(0)
      setResult(null)
      setReviewMap({})
      setError(null)
      setStartedAt(new Date().toISOString())
      setScreen('quiz')
      scrollTop()
    },
    [asmt],
  )

  const pick = (qid: string, ci: number) => setAnswers((a) => ({ ...a, [qid]: ci }))
  const goto = (i: number) => {
    setCurrent(i)
    scrollTop()
  }
  const prev = () => {
    setCurrent((c) => Math.max(0, c - 1))
    scrollTop()
  }
  const next = () => {
    setCurrent((c) => Math.min(asmt.questions.length - 1, c + 1))
    scrollTop()
  }

  const submit = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    setError(null)
    const res = await submitAssessment({ courseSlug: course.slug, answers, startedAt })
    setSubmitting(false)
    if ('error' in res) {
      setError(res.error)
      return
    }
    const map: ReviewMap = {}
    res.review.forEach((r) => {
      map[r.questionId] = { correctIndex: r.correctIndex, explanation: r.explanation }
    })
    setReviewMap(map)
    setResult({ score: res.score, passed: res.passed, total: res.total, correct: res.correct, attemptNo: res.attemptNo })
    setAttempts((a) => [...a, { attemptNo: res.attemptNo, score: res.score, passed: res.passed }])
    if (res.certificateId) setCertificateId(res.certificateId)
    setScreen('result')
    scrollTop()
  }, [submitting, course.slug, answers, startedAt])

  const retry = useCallback(() => beginAttempt(attempts.length + 1), [beginAttempt, attempts.length])

  return (
    <div className="as">
      <div className="as__grid"></div>
      <header className="as-top" data-screen-label="Assessment Header">
        <div className="as-top__brand">
          <a href="/dashboard" aria-label="CSA Academy — Dashboard">
            <img className="as-top__logo" src="/csa/logo-white.png" alt="CSA" />
          </a>
          <span className="as-top__div"></span>
          <div className="as-top__course">
            <span className="as-top__eyebrow">CSA Academy · Assessment</span>
            <p className="as-top__title">{course.title}</p>
          </div>
        </div>
        <div className="as-top__right">
          <a className="as-top__exit" href={resumeCourseHref}>
            <Ic name="x" />
            <span>Exit assessment</span>
          </a>
          <span className="as-top__avatar" title={fullName}>
            {initials}
          </span>
        </div>
      </header>

      {screen === 'cover' && (
        <main className="as-main">
          <Cover
            course={course}
            asmt={asmt}
            attempts={attempts}
            totalFails={totalFails}
            bestPass={bestPass}
            resumeCourseHref={resumeCourseHref}
            onBegin={() => beginAttempt(attempts.length + 1)}
          />
        </main>
      )}

      {screen === 'quiz' && (
        <Quiz
          asmt={asmt}
          layout={layout}
          answers={answers}
          current={current}
          submitting={submitting}
          error={error}
          onPick={pick}
          onGoto={goto}
          onPrev={prev}
          onNext={next}
          onSubmit={submit}
        />
      )}

      {screen === 'result' && result && (
        <Result
          course={course}
          asmt={asmt}
          result={result}
          totalFails={totalFails}
          certificateId={certificateId}
          onRetry={retry}
          onReview={() => {
            setScreen('review')
            scrollTop()
          }}
        />
      )}

      {screen === 'review' && (
        <Review
          asmt={asmt}
          layout={layout}
          answers={answers}
          reviewMap={reviewMap}
          onBack={() => {
            setScreen('result')
            scrollTop()
          }}
        />
      )}
    </div>
  )
}

/* =========================================================
   COVER / START
   ========================================================= */
function Cover({
  course,
  asmt,
  attempts,
  totalFails,
  bestPass,
  resumeCourseHref,
  onBegin,
}: {
  course: Course
  asmt: ClientAssessment
  attempts: PriorAttempt[]
  totalFails: number
  bestPass: boolean
  resumeCourseHref: string
  onBegin: () => void
}) {
  return (
    <div className="as-cover as-fade">
      <p className="as-eyebrow">
        <Ic name="clipboard-check" /> Final assessment · {course.code}
      </p>
      <h1 className="as-cover__title">{course.title}</h1>
      <p className="as-cover__lead">
        This is the graded assessment for the course. Answer every question, then submit to see your result. You need{' '}
        <b style={{ color: 'var(--fg-1)' }}>{asmt.passScore}% or higher</b> to pass and unlock your Certificate of
        Completion.
      </p>

      <div className="as-cover__facts">
        <div className="as-fact">
          <div className="as-fact__n">{asmt.questions.length}</div>
          <p className="as-fact__l">Questions</p>
        </div>
        <div className="as-fact">
          <div className="as-fact__n">
            {asmt.passScore}
            <span className="u">%</span>
          </div>
          <p className="as-fact__l">To pass</p>
        </div>
        <div className="as-fact">
          <div className="as-fact__n">∞</div>
          <p className="as-fact__l">Retries</p>
        </div>
        <div className="as-fact">
          <div className="as-fact__n">
            {Math.max(8, asmt.questions.length * 2)}
            <span className="u">m</span>
          </div>
          <p className="as-fact__l">Est. time</p>
        </div>
      </div>

      <div className="as-cover__std">
        {course.standards.map((s) => (
          <span className="as-std" key={s}>
            {s}
          </span>
        ))}
      </div>

      <div className="as-rules">
        <p className="as-rules__h">
          <Ic name="info" /> Before you start
        </p>
        <ul className="as-rules__list">
          <li>
            <Ic name="list-checks" />
            <span>Multiple choice — exactly one correct answer per question.</span>
          </li>
          <li>
            <Ic name="arrow-left-right" />
            <span>Move freely between questions; change answers until you submit.</span>
          </li>
          <li>
            <Ic name="eye-off" />
            <span>Results and explanations appear only after you submit.</span>
          </li>
          <li>
            <Ic name="rotate-ccw" />
            <span>Fail and you can retry with re-shuffled questions, as many times as you need.</span>
          </li>
        </ul>
      </div>

      {totalFails >= asmt.recommendAfter && !bestPass && (
        <div className="as-recommend">
          <Ic name="life-buoy" />
          <div>
            <p className="as-recommend__t">{totalFails} attempts so far — want a hand?</p>
            <p className="as-recommend__d">
              You can keep retrying as many times as you like. If the material isn&rsquo;t clicking, our instructors are
              happy to help — <a href="/book-a-consultation">talk to CSA</a> or revisit the lessons before your next
              attempt.
            </p>
          </div>
        </div>
      )}

      <div className="as-cover__cta">
        <button className="btn btn--gold-solid btn--lg" onClick={onBegin}>
          {attempts.length ? 'Start a new attempt' : 'Begin Assessment'} <Ic name="arrow-right" />
        </button>
        <a className="btn btn--link" href={resumeCourseHref}>
          Back to course
        </a>
      </div>

      {attempts.length > 0 && (
        <div className="as-attempts">
          <p className="as-attempts__h">
            <Ic name="history" /> Your previous attempts
          </p>
          {attempts.map((a, i) => (
            <div className="as-attempt-row" key={i}>
              <span className="as-attempt-row__no">Attempt {a.attemptNo}</span>
              <span className="as-attempt-row__bar">
                <span
                  className="as-attempt-row__fill"
                  style={{ width: a.score + '%', background: a.passed ? 'var(--status-safe)' : 'var(--status-warn)' }}
                ></span>
              </span>
              <span
                className="as-attempt-row__score"
                style={{ color: a.passed ? 'var(--status-safe)' : 'var(--status-warn)' }}
              >
                {a.score}%
              </span>
              <span className={'as-attempt-row__badge ' + (a.passed ? 'as-badge--pass' : 'as-badge--fail')}>
                {a.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* =========================================================
   QUIZ — one question at a time
   ========================================================= */
function Quiz({
  asmt,
  layout,
  answers,
  current,
  submitting,
  error,
  onPick,
  onGoto,
  onPrev,
  onNext,
  onSubmit,
}: {
  asmt: ClientAssessment
  layout: Layout
  answers: Record<string, number>
  current: number
  submitting: boolean
  error: string | null
  onPick: (qid: string, ci: number) => void
  onGoto: (i: number) => void
  onPrev: () => void
  onNext: () => void
  onSubmit: () => void
}) {
  const qIndex = layout.order[current]
  const q = asmt.questions[qIndex]
  const perm = layout.optPerms[qIndex]
  const total = asmt.questions.length
  const answeredCount = asmt.questions.filter((qq) => answers[qq.id] != null).length
  const pct = Math.round(((current + 1) / total) * 100)
  const isLast = current === total - 1
  const allAnswered = answeredCount === total

  return (
    <>
      <div className="as-prog">
        <div className="as-prog__inner">
          <div className="as-prog__top">
            <span className="as-prog__count">
              <b>Question {current + 1}</b> of {total}
            </span>
            <span className="as-prog__answered">
              {answeredCount} answered<span className="dot">·</span>
              {total - answeredCount} left
            </span>
          </div>
          <div className="as-prog__track">
            <div className="as-prog__fill" style={{ width: pct + '%' }}></div>
          </div>
          <div className="as-steps">
            {layout.order.map((qi, i) => {
              const a = answers[asmt.questions[qi].id] != null
              const cls = 'as-step' + (a ? ' is-answered' : '') + (i === current ? ' is-current' : '')
              return (
                <button key={i} className={cls} onClick={() => onGoto(i)} aria-label={'Question ' + (i + 1)}>
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <main className="as-main">
        <div className="as-qcard as-fade" key={current}>
          <div className="as-qcard__meta">
            <span className="as-qcard__num">Question {current + 1}</span>
            <span className="as-qcard__topic">{q.topic}</span>
            <span className="as-qcard__std">{q.standard}</span>
          </div>
          <p className="as-qcard__prompt">{q.prompt}</p>
          <div className="as-opts">
            {perm.map((canonical, di) => {
              const sel = answers[q.id] === canonical
              return (
                <button
                  type="button"
                  className={'as-opt' + (sel ? ' is-selected' : '')}
                  key={canonical}
                  onClick={() => onPick(q.id, canonical)}
                >
                  <span className="as-opt__mark">{sel && <Ic name="check" />}</span>
                  <span className="as-opt__letter">{String.fromCharCode(65 + di)}</span>
                  <span className="as-opt__txt">{q.options[canonical]}</span>
                </button>
              )
            })}
          </div>

          <div className="as-qnav">
            <button className="as-qnav__btn" onClick={onPrev} disabled={current === 0}>
              <Ic name="arrow-left" /> Previous
            </button>
            <span className="as-qnav__spacer"></span>
            {isLast ? (
              <button
                className="btn btn--gold-solid btn--lg"
                onClick={onSubmit}
                disabled={!allAnswered || submitting}
                title={allAnswered ? '' : 'Answer every question to submit'}
              >
                {submitting ? 'Submitting…' : 'Submit Assessment'} <Ic name="send" />
              </button>
            ) : (
              <button className="as-qnav__btn" onClick={onNext}>
                Next <Ic name="arrow-right" />
              </button>
            )}
          </div>
        </div>
        {error && (
          <p
            style={{
              textAlign: 'center',
              marginTop: 16,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--status-critical)',
            }}
          >
            {error}
          </p>
        )}
        {isLast && !allAnswered && (
          <p
            style={{
              textAlign: 'center',
              marginTop: 16,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--fg-3)',
            }}
          >
            {total - answeredCount} unanswered — jump to any number above to finish.
          </p>
        )}
      </main>
    </>
  )
}

/* =========================================================
   RESULT — pass / fail
   ========================================================= */
function ResultRing({ score, passed }: { score: number; passed: boolean }) {
  const R = 84
  const C = 2 * Math.PI * R
  const off = C * (1 - score / 100)
  const color = passed ? 'var(--status-safe)' : 'var(--status-warn)'
  return (
    <div className="as-ring">
      <svg viewBox="0 0 188 188">
        <circle className="as-ring__track" cx="94" cy="94" r={R}></circle>
        <circle
          className="as-ring__arc"
          cx="94"
          cy="94"
          r={R}
          style={{ stroke: color, strokeDasharray: C, strokeDashoffset: off }}
        ></circle>
      </svg>
      <div className="as-ring__center">
        <span className="as-ring__pct">
          {score}
          <span className="s">%</span>
        </span>
        <span className="as-ring__lbl">Your score</span>
      </div>
    </div>
  )
}

function Result({
  course,
  asmt,
  result,
  totalFails,
  certificateId,
  onRetry,
  onReview,
}: {
  course: Course
  asmt: ClientAssessment
  result: Result
  totalFails: number
  certificateId: string | null
  onRetry: () => void
  onReview: () => void
}) {
  const { passed, correct, total, score, attemptNo } = result
  return (
    <main className="as-main">
      <div className="as-result as-fade">
        <ResultRing score={score} passed={passed} />
        <div>
          <span className={'as-result__badge ' + (passed ? 'as-result__badge--pass' : 'as-result__badge--fail')}>
            <Ic name={passed ? 'shield-check' : 'alert-triangle'} />
            {passed ? 'Assessment passed' : 'Not passed yet'}
          </span>
        </div>
        <h1 className="as-result__title">{passed ? 'Well done — you passed.' : 'So close. Give it another go.'}</h1>
        <p className="as-result__sub">
          {passed
            ? `You scored ${score}% on the ${course.code} final assessment — above the ${asmt.passScore}% pass mark.`
            : `You scored ${score}%, just under the ${asmt.passScore}% pass mark. Review the explanations, then retry with a fresh set — questions and answers are re-shuffled each attempt.`}
        </p>

        <div className="as-result__stats">
          <div className="as-result__stat">
            <div className="as-result__stat-n">
              {correct}/{total}
            </div>
            <p className="as-result__stat-l">Correct</p>
          </div>
          <div className="as-result__stat">
            <div className="as-result__stat-n">{asmt.passScore}%</div>
            <p className="as-result__stat-l">Pass mark</p>
          </div>
          <div className="as-result__stat">
            <div className="as-result__stat-n">{attemptNo}</div>
            <p className="as-result__stat-l">Attempt</p>
          </div>
        </div>

        {!passed && totalFails >= asmt.recommendAfter && (
          <div className="as-recommend" style={{ textAlign: 'left' }}>
            <Ic name="life-buoy" />
            <div>
              <p className="as-recommend__t">That&rsquo;s {totalFails} attempts — we&rsquo;re here to help.</p>
              <p className="as-recommend__d">
                There&rsquo;s no limit on retries. If you&rsquo;d like guidance,{' '}
                <a href="/book-a-consultation">reach out to a CSA instructor</a> or revisit the lessons — then jump back
                in whenever you&rsquo;re ready.
              </p>
            </div>
          </div>
        )}

        <div className="as-result__cta">
          {passed ? (
            <>
              <a
                className="btn btn--gold-solid btn--lg"
                href={
                  certificateId
                    ? `/certificate?cert=${encodeURIComponent(certificateId)}`
                    : `/certificate?course=${encodeURIComponent(course.slug)}`
                }
              >
                {certificateId ? 'View your certificate' : 'Continue to certificate'} <Ic name="arrow-right" />
              </a>
              <button className="btn btn--link" onClick={onReview}>
                Review answers
              </button>
            </>
          ) : (
            <>
              <button className="btn btn--gold-solid btn--lg" onClick={onRetry}>
                Retry Assessment <Ic name="rotate-ccw" />
              </button>
              <button className="btn btn--link" onClick={onReview}>
                Review answers
              </button>
            </>
          )}
        </div>
        {passed && !certificateId && (
          <p style={{ marginTop: 22, fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.55 }}>
            <Ic name="info" style={{ width: 13, height: 13, marginRight: 6, color: 'var(--gold-500)' }} />
            Finish the remaining course lessons to reach 100% and your certificate will be issued automatically.
          </p>
        )}
      </div>
    </main>
  )
}

/* =========================================================
   REVIEW — every question, graded (server-provided keys)
   ========================================================= */
function Review({
  asmt,
  layout,
  answers,
  reviewMap,
  onBack,
}: {
  asmt: ClientAssessment
  layout: Layout
  answers: Record<string, number>
  reviewMap: ReviewMap
  onBack: () => void
}) {
  return (
    <main className="as-main as-fade">
      <div className="as-review__head">
        <div>
          <p className="as-eyebrow">
            <Ic name="search-check" /> Answer review
          </p>
          <h1 className="as-review__title">Review your answers.</h1>
        </div>
        <button className="as-review__back" onClick={onBack}>
          <Ic name="arrow-left" /> Back to result
        </button>
      </div>

      {layout.order.map((qi, i) => {
        const q = asmt.questions[qi]
        const meta = reviewMap[q.id] ?? { correctIndex: -1, explanation: '' }
        const chosen = answers[q.id]
        const ok = chosen === meta.correctIndex
        const perm = layout.optPerms[qi]
        return (
          <div className={'as-rq ' + (ok ? 'is-correct' : 'is-wrong')} key={q.id}>
            <div className="as-rq__top">
              <span className="as-rq__num">Q{i + 1}</span>
              <span className={'as-rq__verdict ' + (ok ? 'ok' : 'no')}>
                <Ic name={ok ? 'check-circle-2' : 'x-circle'} /> {ok ? 'Correct' : 'Incorrect'}
              </span>
              <span className="as-rq__std">{q.standard}</span>
            </div>
            <p className="as-rq__prompt">{q.prompt}</p>
            <div className="as-rq__opts">
              {perm.map((canonical, di) => {
                const isAnswer = canonical === meta.correctIndex
                const isChosenWrong = canonical === chosen && !isAnswer
                let cls = 'as-ro'
                if (isAnswer) cls += ' is-correct'
                else if (isChosenWrong) cls += ' is-chosen-wrong'
                return (
                  <div className={cls} key={canonical}>
                    <span className="as-ro__mark">
                      {isAnswer ? <Ic name="check" /> : isChosenWrong ? <Ic name="x" /> : null}
                    </span>
                    <span className="as-opt__letter">{String.fromCharCode(65 + di)}</span>
                    <span className="as-ro__txt">{q.options[canonical]}</span>
                    {isAnswer && <span className="as-ro__tag">Correct answer</span>}
                    {isChosenWrong && <span className="as-ro__tag">Your answer</span>}
                  </div>
                )
              })}
            </div>
            <div className="as-rq__fb">
              <Ic name="lightbulb" />
              <span>
                <b>Why: </b>
                {meta.explanation}
              </span>
            </div>
          </div>
        )
      })}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
        <button className="btn btn--silver-pill btn--lg" data-metal="silver" onClick={onBack}>
          Back to result <Ic name="arrow-right" />
        </button>
      </div>
    </main>
  )
}
