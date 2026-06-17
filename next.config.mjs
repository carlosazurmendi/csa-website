import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server bundle for the Docker runtime image.
  output: 'standalone',
  // Pin the workspace root to this project (a stray lockfile in the home dir
  // otherwise confuses Turbopack's root inference).
  turbopack: {
    root: dirname,
  },
  // Allow Payload's admin + our frontend to share the app.
  // Add remote image hosts (e.g. Supabase Storage CDN) here in Phase 2.
  images: {
    remotePatterns: [],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
