import { NextResponse, type NextRequest } from 'next/server'

import { getCurrentCustomer } from '@/lib/customer'
import { getPayloadClient } from '@/lib/cms'
import { presignProtectedGet, DOWNLOAD_TTL_SECONDS } from '@/lib/protectedMedia'

/**
 * Owner-gated template download (M7, hardened M9) at /download/[entitlementId] —
 * OUTSIDE Payload's /api/[...slug] catch-all. The entitlement must belong to the
 * signed-in Supabase user and be active; only then do we mint a short-lived
 * presigned GET against the PRIVATE bucket and 302 the browser to it. The
 * deliverable lives in `protected-media` (no public-read ACL), so there is no
 * durable public URL — the entitlement check gates the only way to the bytes.
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
  const key = file && typeof file.filename === 'string' ? file.filename : null
  if (!file || !key) {
    return new NextResponse('No downloadable file is attached to this product yet.', { status: 404 })
  }

  // Mint a short-lived presigned GET against the private bucket and hand the
  // browser straight to it (Content-Disposition forces a clean download name).
  // The URL expires, so it is never a durable public link.
  const downloadName = key || `${(product?.code as string) || 'download'}`
  let signedUrl: string
  try {
    signedUrl = await presignProtectedGet(key, {
      downloadFilename: downloadName,
      expiresIn: DOWNLOAD_TTL_SECONDS,
    })
  } catch {
    return new NextResponse('Download is temporarily unavailable.', { status: 502 })
  }

  const res = NextResponse.redirect(signedUrl, { status: 302 })
  res.headers.set('Cache-Control', 'private, no-store')
  return res
}
