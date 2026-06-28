import { NextResponse, type NextRequest } from 'next/server'

import { getCurrentCustomer } from '@/lib/customer'
import { getPayloadClient } from '@/lib/cms'

/**
 * Owner-gated template download (M7) at /download/[entitlementId] — OUTSIDE
 * Payload's /api/[...slug] catch-all. The entitlement must belong to the
 * signed-in Supabase user and be active; only then is the deliverable streamed
 * back through this route, so the underlying storage URL is never handed to the
 * client. (The deliverable currently lives in the public media bucket; a
 * dedicated protected bucket + presigned URLs is a follow-up.)
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ entitlementId: string }> },
) {
  const { entitlementId } = await params

  const customer = await getCurrentCustomer()
  if (!customer) {
    return NextResponse.redirect(new URL('/login?next=/portal', req.url))
  }

  const payload = await getPayloadClient()
  let ent: Record<string, unknown> | null = null
  try {
    ent = (await payload.findByID({
      collection: 'entitlements',
      id: entitlementId,
      depth: 2,
      overrideAccess: true,
    })) as unknown as Record<string, unknown>
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
  if (!ent) return new NextResponse('Not found', { status: 404 })

  // The owner + active gate — the only thing between a user and this file.
  if (ent.userId !== customer.userId || ent.active !== true) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const product = (
    ent.product && typeof ent.product === 'object' ? ent.product : null
  ) as Record<string, unknown> | null
  const file = (
    product?.downloadableFile && typeof product.downloadableFile === 'object'
      ? product.downloadableFile
      : null
  ) as Record<string, unknown> | null
  const url = file && typeof file.url === 'string' ? file.url : null
  if (!file || !url) {
    return new NextResponse('No downloadable file is attached to this product yet.', { status: 404 })
  }

  const absolute = url.startsWith('http') ? url : new URL(url, req.url).toString()
  let upstream: Response
  try {
    upstream = await fetch(absolute)
  } catch {
    return new NextResponse('Download is temporarily unavailable.', { status: 502 })
  }
  if (!upstream.ok || !upstream.body) {
    return new NextResponse('Download is temporarily unavailable.', { status: 502 })
  }

  const rawName =
    (typeof file.filename === 'string' && file.filename) || `${(product?.code as string) || 'download'}`
  const filename = rawName.replace(/["\r\n]/g, '')

  const headers = new Headers()
  headers.set(
    'Content-Type',
    upstream.headers.get('content-type') || (file.mimeType as string) || 'application/octet-stream',
  )
  const len = upstream.headers.get('content-length')
  if (len) headers.set('Content-Length', len)
  headers.set('Content-Disposition', `attachment; filename="${filename}"`)
  headers.set('Cache-Control', 'private, no-store')

  return new NextResponse(upstream.body, { status: 200, headers })
}
