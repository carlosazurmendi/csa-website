/**
 * Shape of the single `home` page-collection record (see src/collections/pages/Home.ts).
 * Section components read their prefixed fields off this object. Loose where the
 * design only ever reads/maps the value; rich-text fields are passed through the
 * lexical helpers in @/lib/cms.
 */

export type Code = { code: string }
export type RichText = unknown

export type HeroSystem = {
  cat?: string
  name?: string
  blurb?: string
  standards?: Code[]
  metricLabel?: string
  metricVal?: string
}

export type CaseStudyCard = {
  sector?: string
  name?: string
  desc?: string
  standards?: Code[]
  quote?: string
  author?: string
  affiliation?: string
}

export type Customer = { name: string; mark?: string; domain?: string }
export type Partner = { name: string; role?: string; mono?: string }
export type Solution = { title: string; desc?: string }

export type ServiceItem = {
  title: string
  desc?: string
  points?: { point: string }[]
  bestFor?: string
}
export type IndustryItem = {
  title: string
  desc?: string
  points?: { point: string }[]
  standards?: Code[]
}

export type SaRow = {
  theme: string
  oldTitle?: string
  oldDesc?: string
  newTitle?: string
  newDesc?: string
}

export type Cert = { title: string; sub?: string }
export type NewsArticle = { category?: string; date?: string; title: string }

export interface HomeDoc {
  title?: string
  slug?: string

  // Hero
  heroTitle?: string
  heroTitleAccent?: string
  heroSubhead?: string
  heroSub?: RichText
  heroCtaPrimary?: string
  heroCtaSecondary?: string
  heroSystems?: HeroSystem[]
  heroTicker?: Code[]

  // Case studies
  csEyebrow?: string
  csHeading?: string
  csSub?: string
  csCtaLabel?: string
  csItems?: CaseStudyCard[]

  // Partners / trusted by
  ptEyebrow?: string
  ptHeading?: string
  ptSub?: string
  ptCustomers?: Customer[]
  ptPartnersLabel?: string
  ptPartnersIntro?: string
  ptPartners?: Partner[]

  // Problem
  pbEyebrow?: string
  pbHeading?: string
  pbLead?: RichText
  pbSolveLabel?: string
  pbSolutions?: Solution[]

  // Services & industries
  svEyebrow?: string
  svServicesHeading?: string
  svServicesLead?: string
  svServicesCta?: string
  svIndustriesHeading?: string
  svIndustriesLead?: string
  svIndustriesCta?: string
  svServices?: ServiceItem[]
  svIndustries?: IndustryItem[]

  // Standing apart / how we work
  saEyebrow?: string
  saHeading?: string
  saLead?: RichText
  saMandateKey?: string
  saMandateTag?: string
  saColOld?: string
  saColNew?: string
  saRows?: SaRow[]
  saNeverLabel?: string
  saNeverItems?: { label: string }[]
  saNeverNote?: string

  // About / founder
  abEyebrow?: string
  abHeading?: string
  abName?: string
  abRole?: string
  abLocation?: string
  abCallout?: string
  abCerts?: Cert[]
  abBio?: RichText
  abExperienceLabel?: string
  abExperience?: { label: string }[]
  abFieldLabel?: string
  abFieldNote?: string
  abConferences?: { label: string }[]
  abCtaLabel?: string

  // News / insights
  nwEyebrow?: string
  nwHeading?: string
  nwLead?: string
  nwCtaLabel?: string
  nwArticles?: NewsArticle[]
}
