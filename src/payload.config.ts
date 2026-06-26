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

// PUBLIC media bucket — enabled only when Supabase Storage (S3) credentials are present.
if (process.env.SUPABASE_S3_ENDPOINT && process.env.S3_PUBLIC_BUCKET) {
  plugins.push(
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_PUBLIC_BUCKET,
      acl: 'public-read',
      config: {
        endpoint: process.env.SUPABASE_S3_ENDPOINT,
        region: process.env.SUPABASE_S3_REGION || 'us-east-1',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  )
}

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
