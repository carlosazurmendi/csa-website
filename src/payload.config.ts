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

import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'

import { buildStoragePlugin } from './lib/storage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const storagePlugin = buildStoragePlugin()

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
  ],
  globals: [SiteSettings, Header, Footer, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['articles', 'industries', 'caseStudies'],
      globals: ['homePage'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: { title?: string; name?: string } }) => {
        const t = doc?.title || doc?.name
        return t ? `${t} | CSA` : 'Critical Systems Analysis'
      },
      generateDescription: ({ doc }: { doc: { excerpt?: string; shortDescription?: string } }) =>
        doc?.excerpt || doc?.shortDescription || '',
    }),
    ...(storagePlugin ? [storagePlugin] : []),
  ],
})
