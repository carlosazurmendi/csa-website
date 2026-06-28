import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output keeps the production Docker image lean (server + traced deps only).
  output: 'standalone',
  // Pin the workspace root: a stray lockfile elsewhere on the machine must not be inferred.
  turbopack: { root: dirname },
  outputFileTracingRoot: dirname,
  // sharp is a native module used by Payload media processing — keep it server-external and
  // make sure its native binary is traced into the standalone bundle (Docker runtime needs it).
  serverExternalPackages: ['sharp'],
  outputFileTracingIncludes: {
    '/*': ['./node_modules/sharp/**/*'],
  },
  images: {
    // Payload serves local media under /api/media/file/** before S3 is wired (M6).
    localPatterns: [{ pathname: '/api/media/file/**' }],
    // Supabase Storage public-bucket remote patterns are added in Milestone 6/8.
    remotePatterns: [],
  },
  // M8: the reverse proxy (Traefik `csa-compress`) does gzip + brotli at the edge.
  // Disable Next's own gzip so it doesn't pre-encode responses — a gzip Content-
  // Encoding from the app makes Traefik pass it through and never apply brotli.
  compress: false,
  // M8: HTTP caching for assets Next doesn't already fingerprint. (/_next/static is
  // already immutable; dynamic pages stay private/no-store via the auth-reading layout.)
  async headers() {
    return [
      {
        // CMS media — Payload streams these with a strong ETag but no Cache-Control.
        // Add one so browsers + the CDN cache; the ETag guards correctness on revalidate.
        source: '/api/media/file/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Vendored runtime / fonts / hero gifs under /public/csa. Unhashed (so NOT
        // immutable) — a short cache + stale-while-revalidate + the default ETag avoids
        // a revalidation round-trip on every load while staying correct across deploys.
        source: '/csa/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
