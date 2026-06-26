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
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
