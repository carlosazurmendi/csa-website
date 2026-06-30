import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig, type Plugin } from 'payload'
import sharp from 'sharp'

import { withRevalidate, withRevalidateGlobal } from './lib/revalidate'

// --- Nav page-collections (sub-pages = rows, tabbed section copy + SEO) ---
import { Home } from './collections/pages/Home'
import { Consulting } from './collections/pages/Consulting'
import { TrainingTemplates } from './collections/pages/TrainingTemplates'
import { Company } from './collections/pages/Company'
import { ResourcesPages } from './collections/pages/ResourcesPages'

// --- Company content ---
import { JobPostings } from './collections/JobPostings'
import { TeamMembers } from './collections/TeamMembers'

// --- Written Content ---
import { Articles } from './collections/Articles'
import { CaseStudies } from './collections/CaseStudies'
import { PartnerLogos } from './collections/PartnerLogos'
import { TrustedLogos } from './collections/TrustedLogos'
import { Testimonials } from './collections/Testimonials'

// --- Storefront ---
import { Products } from './collections/Products'
import { Courses } from './collections/Courses'
import { Instructors } from './collections/Instructors'
import { Assessments } from './collections/Assessments'

// --- Free Resources / Events ---
import { FreeTrainings } from './collections/FreeTrainings'
import { Downloads } from './collections/Downloads'
import { Events } from './collections/Events'

// --- Legal / Media ---
import { LegalPages } from './collections/LegalPages'
import { Media } from './collections/Media'
import { ProtectedMedia } from './collections/ProtectedMedia'

// --- App / user-owned (locked down; M5 hardens to owner-scoped server-only) ---
import { Enrollments } from './collections/Enrollments'
import { CourseProgress } from './collections/CourseProgress'
import { QuizAttempts } from './collections/QuizAttempts'
import { Certificates } from './collections/Certificates'
import { ChatProjects } from './collections/ChatProjects'
import { ChatThreads } from './collections/ChatThreads'
import { Orders } from './collections/Orders'
import { Entitlements } from './collections/Entitlements'
import { CustomerProfiles } from './collections/CustomerProfiles'
import { StripeCustomers } from './collections/StripeCustomers'
import { ProcessedStripeEvents } from './collections/ProcessedStripeEvents'
import { Users } from './collections/Users'

// --- Globals (site config + one-off / app pages) ---
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { DashboardPage } from './globals/DashboardPage'
import { PortalPage } from './globals/PortalPage'
import { CartPage } from './globals/CartPage'
import { CheckoutPage } from './globals/CheckoutPage'
import { ThankYouPage } from './globals/ThankYouPage'
import { AuthPages } from './globals/AuthPages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseSsl =
  process.env.DATABASE_SSL === 'false'
    ? false
    : { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true' }

const plugins: Plugin[] = []

// Media storage = Supabase Storage (S3-compatible) PUBLIC bucket. No local-disk
// fallback in production (M4 decision). The four S3 vars must be set together —
// a partial set is a misconfiguration, and production with none is fatal so
// uploads can never silently land on the ephemeral container disk.
const s3Env = {
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  bucket: process.env.S3_PUBLIC_BUCKET,
  accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY,
}
const s3Configured = Boolean(s3Env.endpoint && s3Env.bucket && s3Env.accessKeyId && s3Env.secretAccessKey)
const s3AnySet = Boolean(s3Env.endpoint || s3Env.bucket || s3Env.accessKeyId || s3Env.secretAccessKey)
// `next build` evaluates this config with NODE_ENV=production but no live env /
// no DB connection — don't fail the build on missing creds; enforce at runtime.
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'

if (!isBuildPhase && s3AnySet && !s3Configured) {
  throw new Error(
    'Incomplete Supabase S3 config — set ALL of SUPABASE_S3_ENDPOINT, S3_PUBLIC_BUCKET, ' +
      'SUPABASE_S3_ACCESS_KEY_ID, SUPABASE_S3_SECRET_ACCESS_KEY (or none).',
  )
}
if (!isBuildPhase && process.env.NODE_ENV === 'production' && !s3Configured) {
  throw new Error(
    'Media storage misconfigured: Supabase Storage (S3) is required in production — no local-disk fallback.',
  )
}
// Shared S3 client config — the public `media` bucket and the private
// `protected-media` bucket live on the same Supabase Storage endpoint/credentials.
const s3ClientConfig = {
  endpoint: s3Env.endpoint || 'http://localhost:9000',
  region: process.env.SUPABASE_S3_REGION || 'us-east-1',
  forcePathStyle: true,
  // Disable the AWS SDK v3 default request checksum (CRC32). Two reasons:
  // (1) admin uploads arrive as a SharedArrayBuffer-backed body, and the SDK's
  //     checksum hasher throws `The "input" argument must be ArrayBuffer` on it;
  // (2) MinIO does not accept the new aws-chunked checksum trailers. WHEN_REQUIRED
  //     only sends a checksum when the operation mandates one. Seeding (disk-read
  //     Buffers) was unaffected; this fixes the multipart admin upload path.
  requestChecksumCalculation: 'WHEN_REQUIRED' as const,
  responseChecksumValidation: 'WHEN_REQUIRED' as const,
  credentials: {
    accessKeyId: s3Env.accessKeyId || 'build-placeholder',
    secretAccessKey: s3Env.secretAccessKey || 'build-placeholder',
  },
}

// Register the S3 plugins UNCONDITIONALLY so the admin importMap always contains the
// client upload component. `payload generate:importmap` runs without the runtime env
// (so s3Configured would be false there); if the plugin were env-gated, the component
// would be absent from the map and the admin would crash to a blank screen at runtime
// once the plugin IS active. The fallbacks only keep config construction valid at
// build / importmap time — no uploads happen then, and the throws above still fail a
// real production deploy that is missing credentials.
plugins.push(
  // PUBLIC marketing media (world-readable).
  s3Storage({
    collections: { media: true },
    bucket: s3Env.bucket || 'media',
    acl: 'public-read',
    config: s3ClientConfig,
  }),
  // PRIVATE purchase/enrolment-gated deliverables + lesson videos. No public-read
  // ACL — objects are reachable only via short-lived presigned GET URLs minted by
  // the gated routes (src/lib/protectedMedia.ts).
  s3Storage({
    collections: { 'protected-media': true },
    bucket: process.env.S3_PROTECTED_BUCKET || 'course-assets',
    acl: 'private',
    config: s3ClientConfig,
  }),
)

// Owner/app-data collections — NOT public content, so they get no public-cache
// revalidate hook (an order/enrollment write must not purge the marketing cache).
// Everything else is public content and gets revalidate-on-publish (M8).
const APP_DATA_SLUGS = new Set([
  'enrollments',
  'course-progress',
  'quiz-attempts',
  'certificates',
  'chat-projects',
  'chat-threads',
  'orders',
  'entitlements',
  'customer-profiles',
  'stripe-customers',
  'processed-stripe-events',
  'users',
  // Private deliverables — not public marketing content, so no public-cache purge.
  'protected-media',
])

// Transactional email (order confirmations). Configured ONLY when SMTP is set —
// otherwise Payload falls back to its console logger, so the app still runs and
// orders still fulfil without mail. May reuse the same SMTP provider as GoTrue.
const emailAdapter = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'no-reply@criticalsystemsanalysis.com',
      defaultFromName: process.env.SMTP_FROM_NAME || 'Critical Systems Analysis',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth:
          process.env.SMTP_USER || process.env.SMTP_PASS
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
      },
    })
  : undefined

export default buildConfig({
  email: emailAdapter,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · CSA Admin' },
  },
  collections: [
    // Nav pages (each nav item = a collection, sub-pages = rows)
    Home,
    Consulting,
    TrainingTemplates,
    Company,
    JobPostings,
    TeamMembers,
    ResourcesPages,
    // Written Content
    Articles,
    CaseStudies,
    PartnerLogos,
    TrustedLogos,
    Testimonials,
    // Storefront
    Products,
    Courses,
    Instructors,
    Assessments,
    // Free Resources
    FreeTrainings,
    Downloads,
    // Events
    Events,
    // Legal
    LegalPages,
    // Media
    Media,
    ProtectedMedia,
    // Customers (app/user-owned, locked down)
    Enrollments,
    CourseProgress,
    QuizAttempts,
    Certificates,
    ChatProjects,
    ChatThreads,
    Orders,
    Entitlements,
    CustomerProfiles,
    StripeCustomers,
    ProcessedStripeEvents,
    // Administration
    Users,
  ].map((c) => (APP_DATA_SLUGS.has(c.slug) ? c : withRevalidate(c))),
  globals: [
    SiteSettings,
    Header,
    Footer,
    DashboardPage,
    PortalPage,
    CartPage,
    CheckoutPage,
    ThankYouPage,
    AuthPages,
  ].map(withRevalidateGlobal),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: databaseSsl,
      max: 10,
    },
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  plugins,
  sharp,
})
