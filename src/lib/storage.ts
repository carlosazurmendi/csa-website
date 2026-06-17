import { s3Storage } from '@payloadcms/storage-s3'

/**
 * Storage adapter.
 *
 * IMPORTANT: the plugin is ALWAYS included in the Payload config (never
 * env-conditional). If it were only added when the S3_* env vars are present,
 * a build with no env would omit its admin client component
 * (`@payloadcms/storage-s3/client#S3ClientUploadHandler`) from the importMap —
 * then at runtime, with S3 env set, the media collection references a component
 * the importMap doesn't have, and Payload aborts the admin render (blank panel).
 *
 * Instead we always register it and toggle activation with `enabled`:
 *  - S3_* fully set  → enabled: media is stored in Supabase Storage.
 *  - S3_* blank      → disabled: media falls back to local-disk uploads (./media).
 *
 * Placeholder config values keep the plugin valid when disabled.
 */
export const storagePlugin = () => {
  const { S3_BUCKET, S3_REGION, S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = process.env

  const configured = Boolean(
    S3_BUCKET && S3_REGION && S3_ENDPOINT && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY,
  )

  return s3Storage({
    enabled: configured,
    collections: { media: true },
    bucket: S3_BUCKET || 'media',
    config: {
      region: S3_REGION || 'us-east-1',
      endpoint: S3_ENDPOINT || 'https://example.com',
      // Supabase Storage requires path-style addressing.
      forcePathStyle: true,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID || 'placeholder',
        secretAccessKey: S3_SECRET_ACCESS_KEY || 'placeholder',
      },
    },
  })
}
