'use client'

import * as React from 'react'
import { useCallback, useState } from 'react'

import type { CertData, LockedState } from '@/lib/certificate'
import { BrandLogo } from '@/app/(frontend)/_components/BrandLogo'
import { Ic } from './CertificateIcon'

/**
 * Certificate client — pixel-faithful port of design-reference/project/assets/
 * certificate.jsx. Read-only render of the issued certificate paper + share/verify
 * cards, the public verification view, or the locked / not-yet-earned state.
 * "Download PDF" / "Print" use window.print() (certificate.css isolates the paper),
 * matching the design.
 */

export type CertificateData = {
  mode: 'issued' | 'verify' | 'locked' | 'notfound'
  data?: CertData
  locked?: LockedState
  firstName: string
  initials: string
}

const DASHBOARD = '/dashboard'
const HOME = '/'

/* =========================================================
   THE CERTIFICATE PAPER (light document)
   ========================================================= */
function CertificatePaper({ data }: { data: CertData }) {
  return (
    <div className="ct-paper" data-screen-label="Certificate Document">
      <div className="ct-paper__frame"></div>
      <span className="ct-paper__reg ct-paper__reg--tl"></span>
      <span className="ct-paper__reg ct-paper__reg--tr"></span>
      <span className="ct-paper__reg ct-paper__reg--bl"></span>
      <span className="ct-paper__reg ct-paper__reg--br"></span>
      <span className="ct-paper__seal-ghost"></span>

      <div className="ct-paper__head">
        <div className="ct-paper__brand">
          <span className="ct-paper__mono">
            <Ic name="shield-check" />
          </span>
          <span className="ct-paper__brand-tx">
            <span className="ct-paper__brand-nm">Critical Systems Analysis</span>
            <span className="ct-paper__brand-sub">CSA Academy · Functional Safety</span>
          </span>
        </div>
        <div className="ct-paper__authority">
          <p className="ct-paper__authority-t">Issued by</p>
          <p className="ct-paper__authority-v">SGS-TÜV Saar Approved Partner</p>
        </div>
      </div>

      <div className="ct-paper__body">
        <p className="ct-paper__eyebrow">Certificate of Completion</p>
        <p className="ct-paper__pre">This certifies that</p>
        <h2 className="ct-paper__name">{data.recipientName}</h2>
        <div className="ct-paper__name-rule"></div>
        <p className="ct-paper__pre2">has successfully completed the functional safety training program</p>
        <p className="ct-paper__course">{data.courseTitle}</p>
        <div className="ct-paper__meta">
          {data.standards.map((s) => (
            <span className="ct-paper__chip" key={s}>
              {s}
            </span>
          ))}
          <span className="ct-paper__chip">{data.hours} learning hours</span>
          <span className="ct-paper__chip">Final score {data.score}%</span>
        </div>
      </div>

      <div className="ct-paper__foot">
        <div className="ct-sign">
          <div className="ct-sign__name">{data.instructorName}</div>
          <div className="ct-sign__rule"></div>
          <div className="ct-sign__role">{data.instructorTitle}</div>
        </div>
        <div className="ct-seal">
          <span className="ct-seal__notch"></span>
          <span className="ct-seal__disc">
            <span className="ct-seal__inner">
              <Ic name="award" />
              <span>Verified</span>
            </span>
          </span>
        </div>
        <div className="ct-issue">
          <p className="ct-issue__t">Date of completion</p>
          <p className="ct-issue__v">{data.issuedLabel}</p>
          <div className="ct-issue__rule"></div>
        </div>
      </div>

      <div className="ct-paper__verline">
        <span>
          <b>Verification ID</b> {data.id}
        </span>
        <span className="sep">·</span>
        <span>{data.verifyUrl.replace(/^https?:\/\//, '')}</span>
      </div>
    </div>
  )
}

/* =========================================================
   ACTIONS + VERIFICATION (issued state)
   ========================================================= */
function CopyLink({ url }: { url: string }) {
  const [done, setDone] = useState(false)
  const copy = () => {
    try {
      navigator.clipboard.writeText(url).then(() => {
        setDone(true)
        setTimeout(() => setDone(false), 1800)
      })
    } catch {
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    }
  }
  return (
    <div className="ct-copy">
      <span className="ct-copy__url">{url}</span>
      <button className={'ct-copy__btn' + (done ? ' is-done' : '')} onClick={copy}>
        <Ic name={done ? 'check' : 'copy'} /> {done ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function IssuedExtras({ data, onPrint }: { data: CertData; onPrint: () => void }) {
  const shareText = encodeURIComponent('I earned a ' + data.credential + ' from CSA Academy: ' + data.courseTitle)
  const shareUrl = encodeURIComponent(data.verifyUrl)
  return (
    <div className="ct-below" data-screen-label="Certificate Actions">
      <div className="ct-actions">
        <p className="ct-actions__h">
          <Ic name="download" /> Download &amp; share
        </p>
        <div className="ct-actions__row">
          <button className="btn btn--gold-solid btn--lg" onClick={onPrint}>
            <Ic name="file-down" /> Download PDF
          </button>
          <button className="btn btn--silver-pill btn--lg" data-metal="silver" onClick={onPrint}>
            <Ic name="printer" /> Print
          </button>
        </div>
        <div className="ct-share">
          <span className="ct-share__lbl">Shareable verification link</span>
          <CopyLink url={data.verifyUrl} />
          <div className="ct-socials">
            <a
              className="ct-social"
              href={'https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Ic name="briefcase" /> LinkedIn
            </a>
            <a
              className="ct-social"
              href={'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + shareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Ic name="share-2" /> Share
            </a>
            <a className="ct-social" href={'mailto:?subject=' + shareText + '&body=' + shareUrl}>
              <Ic name="mail" /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="ct-verify">
        <p className="ct-verify__h">
          <Ic name="badge-check" /> Verification
        </p>
        <span className="ct-verify__status">
          <Ic name="shield-check" /> Valid &amp; current
        </span>
        <div className="ct-verify__list">
          <div className="ct-vrow">
            <span className="ct-vrow__k">Verification ID</span>
            <span className="ct-vrow__v">{data.id}</span>
          </div>
          <div className="ct-vrow">
            <span className="ct-vrow__k">Recipient</span>
            <span className="ct-vrow__v">{data.recipientName}</span>
          </div>
          <div className="ct-vrow">
            <span className="ct-vrow__k">Issued</span>
            <span className="ct-vrow__v">{data.issuedLabel}</span>
          </div>
          <div className="ct-vrow">
            <span className="ct-vrow__k">Expires</span>
            <span className="ct-vrow__v">{data.expiresLabel}</span>
          </div>
          <div className="ct-vrow">
            <span className="ct-vrow__k">Verify at</span>
            <span className="ct-vrow__v">
              <a href={`/certificate?cert=${encodeURIComponent(data.id)}&verify=1`}>
                {data.verifyUrl.replace(/^https?:\/\//, '')}
              </a>
            </span>
          </div>
        </div>
        <p className="ct-verify__note">
          <Ic name="lock" /> Anyone with the link can confirm this credential against the CSA registry. The PDF is
          server-rendered and tamper-evident.
        </p>
      </div>
    </div>
  )
}

/* =========================================================
   LOCKED / NOT-YET-ELIGIBLE
   ========================================================= */
function Locked({ locked }: { locked: LockedState }) {
  const { course, percent, done, total, passed, resumeHref } = locked
  const lessonsLeft = Math.max(0, total - done)
  const lessonsDone = percent >= 100
  const assessmentHref = `/assessment/${course.slug}`
  return (
    <>
      <div className="ct-context">
        <p className="ct-eyebrow">
          <Ic name="lock" /> Not yet earned
        </p>
        <h1 className="ct-context__title">Your certificate is almost ready.</h1>
        <p className="ct-context__sub">
          Certificates are issued the moment you reach 100% completion and pass the course&rsquo;s final assessment.
          Here&rsquo;s what&rsquo;s left for <b style={{ color: 'var(--fg-1)' }}>{course.title}</b>.
        </p>
      </div>

      <div className="ct-locked-wrap">
        <div className="ct-locked" data-screen-label="Locked Certificate">
          <div className="ct-locked__grid"></div>
          <div className="ct-locked__ghost">
            <span style={{ width: '40%' }}></span>
            <span style={{ width: '60%' }}></span>
            <span style={{ width: '30%' }}></span>
          </div>
          <div className="ct-locked__inner">
            <span className="ct-lock-badge">
              <Ic name="lock" />
            </span>
            <p className="ct-locked__eyebrow">{course.code} · Certificate of Completion</p>
            <h2 className="ct-locked__title">Finish the course to unlock your certificate.</h2>
            <p className="ct-locked__sub">
              You&rsquo;re making great progress. Complete the remaining lessons and pass the final assessment to issue
              your personalized, verifiable certificate.
            </p>
            <div className="ct-locked__prog">
              <div className="ct-locked__prog-top">
                <span className="ct-locked__pct">{percent}%</span>
                <span className="ct-locked__of">
                  {done} / {total} lessons
                </span>
              </div>
              <div className="ct-locked__track">
                <div className="ct-locked__fill" style={{ width: percent + '%' }}></div>
              </div>
            </div>
            <div className="ct-locked__cta">
              <a className="btn btn--gold-solid btn--lg" href={resumeHref}>
                {done === 0 ? 'Start the course' : 'Resume learning'} <Ic name="arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="ct-reqs" data-screen-label="Certificate Requirements">
        <p className="ct-reqs__h">
          <Ic name="list-checks" /> Requirements to earn this certificate
        </p>
        <div className="ct-req">
          <span className={'ct-req__ic ' + (lessonsDone ? 'done' : 'todo')}>
            <Ic name={lessonsDone ? 'check' : 'circle'} />
          </span>
          <div className="ct-req__tx">
            <p className="ct-req__t">Complete all course lessons</p>
            <p className="ct-req__d">
              {lessonsDone
                ? 'All lessons complete.'
                : `${lessonsLeft} lesson${lessonsLeft === 1 ? '' : 's'} remaining — ${percent}% done.`}
            </p>
          </div>
          {!lessonsDone && (
            <a className="btn btn--link ct-req__cta" href={resumeHref}>
              Resume <Ic name="arrow-right" />
            </a>
          )}
        </div>
        <div className="ct-req">
          <span className={'ct-req__ic ' + (passed ? 'done' : 'todo')}>
            <Ic name={passed ? 'check' : 'circle'} />
          </span>
          <div className="ct-req__tx">
            <p className="ct-req__t">Pass the final assessment (80% or higher)</p>
            <p className="ct-req__d">
              {passed ? 'Final assessment passed.' : 'Available once your lessons are complete — unlimited retries.'}
            </p>
          </div>
          <a className="btn btn--link ct-req__cta" href={assessmentHref}>
            {passed ? 'Review' : 'Go to assessment'} <Ic name="arrow-right" />
          </a>
        </div>
      </div>
    </>
  )
}

/* =========================================================
   PAGE
   ========================================================= */
export function CertificateClient({ data: payload }: { data: CertificateData }) {
  const { mode, data, locked, firstName, initials } = payload
  const print = useCallback(() => {
    try {
      window.print()
    } catch {
      /* no-op */
    }
  }, [])

  if (mode === 'notfound' || ((mode === 'issued' || mode === 'verify') && !data) || (mode === 'locked' && !locked)) {
    return (
      <div className="ct">
        <main className="ct-stage" style={{ textAlign: 'center', paddingTop: 140 }}>
          <h1 className="ct-context__title">Certificate not found.</h1>
          <p className="ct-context__sub" style={{ margin: '10px auto 26px' }}>
            We couldn&rsquo;t find this certificate. Head back to your dashboard.
          </p>
          <a className="btn btn--gold-pill btn--lg" href={DASHBOARD}>
            Back to Dashboard <Ic name="arrow-right" />
          </a>
        </main>
      </div>
    )
  }

  return (
    <div className="ct">
      <div className="ct__grid"></div>
      <div className="ct__haze"></div>

      <header className="ct-top" data-screen-label="Certificate Header">
        <div className="ct-top__brand">
          <a href={DASHBOARD} aria-label="CSA Academy — Dashboard">
            <BrandLogo className="ct-top__logo" alt="CSA" priority />
          </a>
          <span className="ct-top__div"></span>
          <div>
            <span className="ct-top__eyebrow">CSA Academy</span>
            <p className="ct-top__title">{mode === 'verify' ? 'Certificate verification' : 'Certificate of Completion'}</p>
          </div>
        </div>
        <div className="ct-top__right">
          {mode === 'verify' ? (
            <a className="ct-top__exit" href={HOME}>
              <Ic name="external-link" />
              <span>CSA home</span>
            </a>
          ) : (
            <>
              <a className="ct-top__exit" href={DASHBOARD}>
                <Ic name="arrow-left" />
                <span>Back to dashboard</span>
              </a>
              <span className="ct-top__avatar" title={firstName}>
                {initials}
              </span>
            </>
          )}
        </div>
      </header>

      <main className="ct-stage">
        {mode === 'locked' && locked && <Locked locked={locked} />}

        {(mode === 'issued' || mode === 'verify') && data && (
          <>
            {mode === 'verify' ? (
              <div className="ct-verified-banner" data-screen-label="Public Verification Banner">
                <Ic name="shield-check" />
                <span>
                  <b>Verified credential.</b> This certificate was issued by Critical Systems Analysis and is valid
                  &amp; current.
                </span>
              </div>
            ) : (
              <div className="ct-context">
                <p className="ct-eyebrow">
                  <Ic name="party-popper" /> Congratulations, {firstName}
                </p>
                <h1 className="ct-context__title">You earned your certificate.</h1>
                <p className="ct-context__sub">
                  Your Certificate of Completion is ready. Download the PDF, add it to LinkedIn, or share the
                  verification link — anyone can confirm it against the CSA registry.
                </p>
              </div>
            )}

            <div className="ct-paper-wrap">
              <CertificatePaper data={data} />
            </div>

            {mode === 'issued' && <IssuedExtras data={data} onPrint={print} />}

            {mode === 'verify' && (
              <div className="ct-below" style={{ gridTemplateColumns: '1fr' }}>
                <div className="ct-verify">
                  <p className="ct-verify__h">
                    <Ic name="badge-check" /> Registry record
                  </p>
                  <span className="ct-verify__status">
                    <Ic name="shield-check" /> Valid &amp; current
                  </span>
                  <div className="ct-verify__list">
                    <div className="ct-vrow">
                      <span className="ct-vrow__k">Verification ID</span>
                      <span className="ct-vrow__v">{data.id}</span>
                    </div>
                    <div className="ct-vrow">
                      <span className="ct-vrow__k">Recipient</span>
                      <span className="ct-vrow__v">{data.recipientName}</span>
                    </div>
                    <div className="ct-vrow">
                      <span className="ct-vrow__k">Credential</span>
                      <span className="ct-vrow__v">{data.courseTitle}</span>
                    </div>
                    <div className="ct-vrow">
                      <span className="ct-vrow__k">Issued by</span>
                      <span className="ct-vrow__v">Critical Systems Analysis</span>
                    </div>
                    <div className="ct-vrow">
                      <span className="ct-vrow__k">Issued</span>
                      <span className="ct-vrow__v">{data.issuedLabel}</span>
                    </div>
                    <div className="ct-vrow">
                      <span className="ct-vrow__k">Expires</span>
                      <span className="ct-vrow__v">{data.expiresLabel}</span>
                    </div>
                  </div>
                  <p className="ct-verify__note">
                    <Ic name="info" /> Public verification view — what a third party sees when they open the
                    verification link.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
