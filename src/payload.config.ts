import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Industries } from './collections/Industries'
import { Services } from './collections/Services'
import { Partners } from './collections/Partners'
import { Articles } from './collections/Articles'
import { CaseStudies } from './collections/CaseStudies'
import { Testimonials } from './collections/Testimonials'
import { Templates } from './collections/Templates'
import { Courses } from './collections/Courses'
import { Resources } from './collections/Resources'
import { Events } from './collections/Events'
import { FreeTrainings } from './collections/FreeTrainings'
import { TeamMembers } from './collections/TeamMembers'
import { JobPostings } from './collections/JobPostings'
import { LegalPages } from './collections/LegalPages'

import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'
import { ConsultingOverview } from './globals/ConsultingOverview'
import { TrainingTemplatesOverview } from './globals/TrainingTemplatesOverview'
import { CompanyAbout } from './globals/CompanyAbout'
import { CompanyServices } from './globals/CompanyServices'
import { CompanyExperience } from './globals/CompanyExperience'
import { CareersIntro } from './globals/CareersIntro'
import { ResourcesOverview } from './globals/ResourcesOverview'
import { StandardsIdentifierPage } from './globals/StandardsIdentifierPage'
import { SafetyChatPage } from './globals/SafetyChatPage'

import { storagePlugin } from './lib/storage'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— CSA Admin',
    },
  },
  collections: [
    Users,
    Media,
    Industries,
    Services,
    Partners,
    Articles,
    CaseStudies,
    Testimonials,
    Templates,
    Courses,
    Resources,
    Events,
    FreeTrainings,
    TeamMembers,
    JobPostings,
    LegalPages,
  ],
  globals: [
    SiteSettings,
    Header,
    Footer,
    HomePage,
    ConsultingOverview,
    TrainingTemplatesOverview,
    CompanyAbout,
    CompanyServices,
    CompanyExperience,
    CareersIntro,
    ResourcesOverview,
    StandardsIdentifierPage,
    SafetyChatPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // In production (the Docker container) Payload applies these on init, so the
    // schema is migrated automatically on boot — no CLI needed in the image.
    // Local dev still uses `push` (auto-sync) instead.
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['articles', 'industries', 'caseStudies', 'templates', 'courses', 'legalPages'],
      // NB: the Company globals (companyAbout/Services/Experience/careersIntro)
      // define their own `meta` group, so they're intentionally NOT listed here
      // (the plugin would add a duplicate `meta` field).
      globals: [
        'homePage',
        'consultingOverview',
        'trainingTemplatesOverview',
        'resourcesOverview',
        'standardsIdentifierPage',
        'safetyChatPage',
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: { title?: string; name?: string } }) => {
        const t = doc?.title || doc?.name
        return t ? `${t} | CSA` : 'Critical Systems Analysis'
      },
      generateDescription: ({ doc }: { doc: { excerpt?: string; shortDescription?: string } }) =>
        doc?.excerpt || doc?.shortDescription || '',
    }),
    // Always included (gated by its own `enabled` flag) so its admin client
    // component is always in the importMap — see src/lib/storage.ts.
    storagePlugin(),
  ],
})
