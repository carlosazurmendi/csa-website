import 'server-only'

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

/**
 * Protected-media delivery (M9 / M7-debt #1). The `protected-media` collection is
 * backed by a PRIVATE Supabase Storage bucket (no public-read ACL), so its objects
 * have no usable public URL. Purchase/enrolment-gated routes mint a short-lived
 * presigned GET against that bucket and 302 the browser to it — the entitlement /
 * enrollment check is enforced server-side BEFORE the URL is issued, and the URL
 * itself expires, so it is never a durable public link.
 *
 * The S3 client reuses the SAME credentials as the Payload `s3Storage` plugin
 * (src/payload.config.ts), but signs against the BROWSER-REACHABLE endpoint: the
 * presigned URL is handed to the browser, so its host must be publicly resolvable.
 * In the bundled deploy, uploads/reads use the internal endpoint (http://minio:9000)
 * while presigning uses SUPABASE_S3_PUBLIC_ENDPOINT (the Traefik-exposed storage
 * subdomain, e.g. https://files.<domain>). getSignedUrl computes the signature
 * offline, so the presign endpoint never has to be reachable FROM the container —
 * only from the browser. forcePathStyle keeps the bucket in the path so SigV4 still
 * validates through the proxy. Falls back to SUPABASE_S3_ENDPOINT when no separate
 * public endpoint is set (e.g. when both are the same external Supabase URL).
 */

// Default presign lifetimes. One-shot downloads get a short window; video gets a
// longer one so seeking (each seek is a fresh ranged GET reusing the same URL)
// keeps working through a normal viewing session.
export const DOWNLOAD_TTL_SECONDS = 300 // 5 min
export const VIDEO_TTL_SECONDS = 6 * 60 * 60 // 6 h

let _client: S3Client | null = null

function client(): S3Client {
  if (_client) return _client
  _client = new S3Client({
    endpoint:
      process.env.SUPABASE_S3_PUBLIC_ENDPOINT ||
      process.env.SUPABASE_S3_ENDPOINT ||
      'http://localhost:9000',
    region: process.env.SUPABASE_S3_REGION || 'us-east-1',
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
    },
  })
  return _client
}

export function protectedBucket(): string {
  return process.env.S3_PROTECTED_BUCKET || 'course-assets'
}

const sanitizeFilename = (name: string): string => name.replace(/["\r\n]/g, '')

/**
 * Mint a short-lived presigned GET URL for an object key in the private bucket.
 * `downloadFilename` forces a `Content-Disposition: attachment` so the browser
 * saves the file under a clean name instead of streaming inline.
 */
export async function presignProtectedGet(
  key: string,
  opts?: { expiresIn?: number; downloadFilename?: string; contentType?: string },
): Promise<string> {
  const cmd = new GetObjectCommand({
    Bucket: protectedBucket(),
    Key: key,
    ...(opts?.downloadFilename
      ? { ResponseContentDisposition: `attachment; filename="${sanitizeFilename(opts.downloadFilename)}"` }
      : {}),
    ...(opts?.contentType ? { ResponseContentType: opts.contentType } : {}),
  })
  return getSignedUrl(client(), cmd, { expiresIn: opts?.expiresIn ?? DOWNLOAD_TTL_SECONDS })
}

type ProtectedRef = { filename?: string | null; mimeType?: string | null } | number | string | null | undefined

/**
 * Resolve a (depth-populated) `protected-media` upload ref to a presigned GET URL,
 * or null when the ref is unresolved / has no stored object. Never throws — a
 * presign failure degrades to null so the caller can show an unavailable state.
 */
export async function presignProtectedRef(
  ref: ProtectedRef,
  opts?: { expiresIn?: number; downloadFilename?: string },
): Promise<string | null> {
  const obj = ref && typeof ref === 'object' ? ref : null
  const key = obj && typeof obj.filename === 'string' ? obj.filename : null
  if (!key) return null
  try {
    return await presignProtectedGet(key, {
      ...opts,
      contentType: obj && typeof obj.mimeType === 'string' ? obj.mimeType : undefined,
    })
  } catch {
    return null
  }
}
