import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { findBySlug } from '@/lib/cms'
import { getCurrentCustomer } from '@/lib/customer'
import {
  getCertByPublicId,
  getMyCertificate,
  getLockedState,
  type CertData,
  type LockedState,
} from '@/lib/certificate'
import { CertificateClient, type CertificateData } from './CertificateClient'

/**
 * Certificate of Completion (/certificate) — port of design-reference/project/
 * Training - Templates/Certificate.html (assets/certificate.jsx). Three modes
 * resolved from the query string:
 *   ?cert=<verificationId>           → issued (owner) or verify (public fallback)
 *   ?cert=<verificationId>&verify=1  → public third-party verification view
 *   ?course=<slug>                   → owner's issued cert, else the locked state
 * A certificate is issued upstream (Phase C) when the learner reaches 100% AND
 * passes the final assessment. This page is read-only; "Download PDF" / "Print"
 * use the browser print path (certificate.css isolates the paper), matching the
 * design — a server-rendered tamper-evident PDF is a later enhancement.
 */

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Certificate of Completion | CSA Academy',
  robots: { index: false, follow: false },
}

function userFields(fullName?: string | null): { firstName: string; initials: string } {
  const name = fullName || ''
  const firstName = name.split(' ')[0] || 'there'
  const initials =
    (name || 'U')
      .split(' ')
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U'
  return { firstName, initials }
}

type CourseRef = { id: number | string; slug?: string }

export default async function CertificatePage({
  searchParams,
}: {
  searchParams: Promise<{ cert?: string; course?: string; verify?: string }>
}) {
  const sp = await searchParams
  const certId = sp.cert
  const slug = sp.course
  const verify = sp.verify === '1'

  let mode: CertificateData['mode'] = 'notfound'
  let data: CertData | undefined
  let locked: LockedState | undefined
  let firstName = ''
  let initials = 'U'

  if (certId) {
    const found = await getCertByPublicId(certId)
    if (found) {
      if (verify) {
        mode = 'verify'
      } else {
        const customer = await getCurrentCustomer()
        if (customer && customer.userId === found.userId) {
          mode = 'issued'
          ;({ firstName, initials } = userFields(customer.profile.fullName))
        } else {
          // Anyone with the link sees the public verification view, not the
          // owner's download controls.
          mode = 'verify'
        }
      }
      data = found.data
    }
  } else if (slug) {
    const customer = await getCurrentCustomer()
    if (!customer) redirect(`/login?next=${encodeURIComponent('/certificate?course=' + slug)}`)
    const course = await findBySlug<CourseRef>('courses', slug, 0)
    if (course) {
      const cert = await getMyCertificate(customer.userId, course.id)
      if (cert) {
        mode = verify ? 'verify' : 'issued'
        data = cert
        ;({ firstName, initials } = userFields(customer.profile.fullName))
      } else {
        const lk = await getLockedState(customer.userId, slug)
        if (lk) {
          mode = 'locked'
          locked = lk
          ;({ firstName, initials } = userFields(customer.profile.fullName))
        }
      }
    }
  } else {
    // No params — nothing to render here; the dashboard lists issued certificates.
    const customer = await getCurrentCustomer()
    if (!customer) redirect('/login?next=/dashboard')
    redirect('/dashboard')
  }

  const payload: CertificateData = { mode, data, locked, firstName, initials }
  return <CertificateClient data={payload} />
}
