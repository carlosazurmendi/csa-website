import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig, type Plugin } from 'payload'
import sharp from 'sharp'

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
// Register the S3 plugin UNCONDITIONALLY so the admin importMap always contains its
// client upload component. `payload generate:importmap` runs without the runtime env
// (so s3Configured would be false there); if the plugin were env-gated, the component
// would be absent from the map and the admin would crash to a blank screen at runtime
// once the plugin IS active. The fallbacks only keep config construction valid at
// build / importmap time — no uploads happen then, and the throws above still fail a
// real production deploy that is missing credentials.
plugins.push(
  s3Storage({
    collections: { media: true },
    bucket: s3Env.bucket || 'media',
    acl: 'public-read',
    config: {
      endpoint: s3Env.endpoint || 'http://localhost:9000',
      region: process.env.SUPABASE_S3_REGION || 'us-east-1',
      forcePathStyle: true,
      credentials: {
        accessKeyId: s3Env.accessKeyId || 'build-placeholder',
        secretAccessKey: s3Env.secretAccessKey || 'build-placeholder',
      },
    },
  }),
)

export default buildConfig({
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
  ],
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
  ],
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
