import { s3Storage } from '@payloadcms/storage-s3'

/**
 * Storage adapter abstraction.
 *
 * Phase 1: if the S3_* env vars are present we use Supabase Storage via its
 * S3-compatible endpoint (Vercel-safe). If they're blank, Payload falls back
 * to local-disk uploads (./media) so `npm run dev` works with zero config.
 *
 * Phase 2: point S3_* at the production Supabase bucket + CDN. No code change.
 *
 * Returns the storage plugin, or `null` to signal "use the local-disk default".
 */
export const buildStoragePlugin = () => {
  const {
    S3_BUCKET,
    S3_REGION,
    S3_ENDPOINT,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
  } = process.env

  const configured =
    S3_BUCKET && S3_REGION && S3_ENDPOINT && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY

  if (!configured) return null

  return s3Storage({
    collections: {
      media: true,
    },
    bucket: S3_BUCKET!,
    config: {
      region: S3_REGION,
      endpoint: S3_ENDPOINT,
      // Supabase Storage requires path-style addressing.
      forcePathStyle: true,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID!,
        secretAccessKey: S3_SECRET_ACCESS_KEY!,
      },
    },
  })
}
