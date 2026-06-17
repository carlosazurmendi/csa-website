import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_partners_type" AS ENUM('customer', 'partner');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_templates_category" AS ENUM('compliance-bundle', 'qms', 'fs');
  CREATE TYPE "public"."enum_templates_format" AS ENUM('word', 'excel');
  CREATE TYPE "public"."enum_courses_format" AS ENUM('online', 'in-person', 'hybrid', 'self-paced');
  CREATE TYPE "public"."enum_resources_category" AS ENUM('checklist', 'guidebook', 'free-template', 'standards-guide');
  CREATE TYPE "public"."enum_events_type" AS ENUM('upcoming', 'past-keynote', 'webinar');
  CREATE TYPE "public"."enum_free_trainings_category" AS ENUM('video-overview', 'whitepaper', 'core-intro');
  CREATE TYPE "public"."enum_safety_chat_page_panel_thread_who" AS ENUM('bot', 'user');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "industries_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "industries_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "industries_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"slug" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"hero_headline" varchar,
  	"hero_intro" varchar,
  	"experience_highlight" varchar,
  	"cta_label" varchar DEFAULT 'Book a Consultation',
  	"cta_href" varchar DEFAULT '#',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"description" varchar NOT NULL,
  	"best_for" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_partners_type" DEFAULT 'customer' NOT NULL,
  	"order" numeric DEFAULT 0,
  	"domain" varchar,
  	"mono" varchar,
  	"role" varchar,
  	"url" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" varchar,
  	"published_date" timestamp(3) with time zone,
  	"excerpt" varchar,
  	"hero_image_id" integer,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" varchar,
  	"version_published_date" timestamp(3) with time zone,
  	"version_excerpt" varchar,
  	"version_hero_image_id" integer,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "case_studies_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"sector" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"description" varchar NOT NULL,
  	"cover_image_id" integer,
  	"testimonial_quote" varchar,
  	"testimonial_author" varchar,
  	"testimonial_affiliation" varchar,
  	"problem" varchar,
  	"solution" varchar,
  	"result" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar NOT NULL,
  	"company" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "templates_whats_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" "enum_templates_category" NOT NULL,
  	"format" "enum_templates_format",
  	"standard_focus" varchar,
  	"document_type" varchar,
  	"price" varchar,
  	"thumbnail_id" integer,
  	"is_bundle" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"slug" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"track" varchar,
  	"format" "enum_courses_format",
  	"credential" varchar,
  	"price" varchar,
  	"instructor" varchar,
  	"media_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" "enum_resources_category" NOT NULL,
  	"order" numeric DEFAULT 0,
  	"description" varchar NOT NULL,
  	"file_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"type" "enum_events_type" NOT NULL,
  	"date" timestamp(3) with time zone,
  	"description" varchar,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "free_trainings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" "enum_free_trainings_category" NOT NULL,
  	"order" numeric DEFAULT 0,
  	"description" varchar NOT NULL,
  	"media_id" integer,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"photo_id" integer,
  	"bio" varchar,
  	"location" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_postings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"location" varchar,
  	"order" numeric DEFAULT 0,
  	"summary" varchar NOT NULL,
  	"apply_link" varchar DEFAULT '#',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"last_updated" timestamp(3) with time zone,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"industries_id" integer,
  	"services_id" integer,
  	"partners_id" integer,
  	"articles_id" integer,
  	"case_studies_id" integer,
  	"testimonials_id" integer,
  	"templates_id" integer,
  	"courses_id" integer,
  	"resources_id" integer,
  	"events_id" integer,
  	"free_trainings_id" integer,
  	"team_members_id" integer,
  	"job_postings_id" integer,
  	"legal_pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Critical Systems Analysis' NOT NULL,
  	"logo_id" integer,
  	"default_seo_title" varchar,
  	"default_seo_description" varchar,
  	"social_linkedin" varchar DEFAULT 'https://www.linkedin.com/',
  	"social_x" varchar DEFAULT 'https://x.com/',
  	"social_youtube" varchar DEFAULT 'https://www.youtube.com/',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar DEFAULT '#' NOT NULL,
  	"is_c_t_a" boolean DEFAULT false
  );
  
  CREATE TABLE "header_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar DEFAULT '#' NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"utility_login_label" varchar DEFAULT 'Login',
  	"utility_login_href" varchar DEFAULT '#',
  	"utility_cart_href" varchar DEFAULT '#',
  	"utility_consultation_label" varchar DEFAULT 'Book a Consultation',
  	"utility_consultation_href" varchar DEFAULT '#',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar DEFAULT '#' NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"closing_cta_eyebrow" varchar DEFAULT 'Ready when you are.',
  	"closing_cta_title" varchar DEFAULT 'Build Safer.
  Scale Confidently.',
  	"closing_cta_sub" varchar,
  	"closing_cta_primary_label" varchar DEFAULT 'Book a Consultation',
  	"closing_cta_primary_href" varchar DEFAULT '#',
  	"closing_cta_secondary_label" varchar DEFAULT 'See Our Services',
  	"closing_cta_secondary_href" varchar DEFAULT '#',
  	"brand_blurb" varchar,
  	"copyright" varchar DEFAULT '© 2026 Critical Systems Analysis · All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_hero_systems_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_hero_systems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"blurb" varchar NOT NULL,
  	"video_url" varchar,
  	"poster_url" varchar,
  	"is_gif" boolean DEFAULT false,
  	"metric_label" varchar,
  	"metric_value" varchar,
  	"size_k" numeric DEFAULT 1,
  	"offset_y" numeric DEFAULT 0,
  	"active_r_y" numeric DEFAULT 0
  );
  
  CREATE TABLE "home_page_hero_ticker_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_problem_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_standing_apart_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"theme" varchar NOT NULL,
  	"old_title" varchar NOT NULL,
  	"new_title" varchar NOT NULL,
  	"old_desc" varchar NOT NULL,
  	"new_desc" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_standing_apart_never_ai" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_about_certs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_about_experience_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_about_conferences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title_line1" varchar DEFAULT 'Safer Systems.',
  	"hero_title_line2" varchar DEFAULT 'Accelerated Innovation.',
  	"hero_highlight_word" varchar DEFAULT 'Innovation',
  	"hero_subhead" varchar,
  	"hero_sub" varchar,
  	"hero_primary_cta_label" varchar DEFAULT 'Book a Consultation',
  	"hero_primary_cta_href" varchar DEFAULT '#',
  	"hero_secondary_cta_label" varchar DEFAULT 'Explore Our Services',
  	"hero_secondary_cta_href" varchar DEFAULT '#',
  	"hero_background_video_url" varchar DEFAULT '/assets/hero.mp4',
  	"problem_eyebrow" varchar DEFAULT 'The problem',
  	"problem_title" varchar,
  	"problem_lead" varchar,
  	"problem_solution_label" varchar DEFAULT 'The CSA solution',
  	"services_section_eyebrow" varchar DEFAULT 'What we do',
  	"services_section_services_title" varchar DEFAULT 'Functional safety services.',
  	"services_section_industries_title" varchar DEFAULT 'Industries we serve.',
  	"services_section_services_lead" varchar,
  	"services_section_industries_lead" varchar,
  	"services_section_services_cta" varchar DEFAULT 'See All Services',
  	"services_section_industries_cta" varchar DEFAULT 'Explore Industries',
  	"standing_apart_eyebrow" varchar DEFAULT 'Standing apart',
  	"standing_apart_title" varchar DEFAULT 'How we work.',
  	"standing_apart_lead" varchar,
  	"standing_apart_mandate_kicker" varchar DEFAULT 'Human expertise + AI acceleration.',
  	"standing_apart_mandate_tag" varchar DEFAULT 'Our human-in-the-loop mandate',
  	"standing_apart_old_way_label" varchar DEFAULT 'The old way',
  	"standing_apart_new_way_label" varchar DEFAULT 'The CSA AI-augmented way',
  	"standing_apart_never_ai_label" varchar DEFAULT 'Where we never rely on AI',
  	"standing_apart_human_note" varchar DEFAULT 'A qualified safety engineer is always in the loop.',
  	"about_eyebrow" varchar DEFAULT 'About CSA',
  	"about_title" varchar DEFAULT 'Meet the founder.',
  	"about_portrait_id" integer,
  	"about_name" varchar DEFAULT 'Ben Twombly',
  	"about_role" varchar DEFAULT 'Founder & CEO',
  	"about_location" varchar DEFAULT 'Sarasota, FL',
  	"about_callout_label" varchar DEFAULT 'Principal-led',
  	"about_bio" jsonb,
  	"about_experience_label" varchar DEFAULT 'Hands-on certification experience',
  	"about_active_label" varchar DEFAULT 'Active in the field',
  	"about_active_note" varchar,
  	"about_cta_label" varchar DEFAULT 'Meet the Team',
  	"about_cta_href" varchar DEFAULT '#',
  	"case_studies_section_eyebrow" varchar DEFAULT 'Proof, not promises.',
  	"case_studies_section_title" varchar DEFAULT 'Case studies.',
  	"case_studies_section_sub" varchar,
  	"case_studies_section_cta_label" varchar DEFAULT 'Read the Full Case Studies',
  	"partners_section_eyebrow" varchar DEFAULT 'Trusted by.',
  	"partners_section_title" varchar,
  	"partners_section_sub" varchar,
  	"partners_section_partners_label" varchar DEFAULT 'Partners',
  	"partners_section_partners_intro" varchar,
  	"news_section_eyebrow" varchar DEFAULT 'Insights',
  	"news_section_title" varchar DEFAULT 'Latest news.',
  	"news_section_lead" varchar,
  	"news_section_cta_label" varchar DEFAULT 'Visit the Resource Center',
  	"news_section_cta_href" varchar DEFAULT '#',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "consulting_overview_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_overview_hero_hud_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_overview_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"kicker" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_overview_about_creds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_overview_options_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"best_for" varchar
  );
  
  CREATE TABLE "consulting_overview_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_overview_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_overview" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Functional Safety Consulting',
  	"hero_ghost" varchar DEFAULT 'Consulting',
  	"hero_title" varchar,
  	"hero_sub" varchar,
  	"hero_primary_cta_label" varchar DEFAULT 'Book a Consultation',
  	"hero_primary_cta_href" varchar DEFAULT '#',
  	"hero_secondary_cta_label" varchar DEFAULT 'See How We Work',
  	"hero_secondary_cta_href" varchar DEFAULT '#how-we-work',
  	"hero_hud_tag" varchar DEFAULT 'Concept → Certification',
  	"hero_hud_badge" varchar DEFAULT 'Independent',
  	"hero_hud_foot" varchar DEFAULT 'Principal-led · Decades of combined experience',
  	"facts_eyebrow" varchar DEFAULT 'Technical Authority',
  	"facts_title" varchar DEFAULT 'Quick facts.',
  	"facts_lead" varchar,
  	"about_eyebrow" varchar DEFAULT 'About CSA',
  	"about_title" varchar DEFAULT 'An independent functional safety firm.',
  	"about_prose" jsonb,
  	"about_quote" varchar,
  	"about_creds_label" varchar DEFAULT 'Why our validation holds',
  	"options_eyebrow" varchar DEFAULT 'How We Provide Consulting',
  	"options_title" varchar DEFAULT 'Three ways to work with us.',
  	"options_lead" varchar,
  	"capabilities_eyebrow" varchar DEFAULT 'Contract Engineering',
  	"capabilities_title" varchar DEFAULT 'Expert contract engineering capabilities.',
  	"capabilities_lead" varchar,
  	"industries_section_eyebrow" varchar DEFAULT 'Industries We Serve',
  	"industries_section_title" varchar DEFAULT 'Tailored to your sector.',
  	"industries_section_lead" varchar,
  	"faq_eyebrow" varchar DEFAULT 'Common Questions',
  	"faq_title" varchar DEFAULT 'What teams ask first.',
  	"closing_eyebrow" varchar DEFAULT 'Concept to certification',
  	"closing_title" varchar DEFAULT 'Validate with confidence.',
  	"closing_sub" varchar,
  	"closing_cta_label" varchar DEFAULT 'Book a Consultation',
  	"closing_cta_href" varchar DEFAULT '#',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "training_templates_overview_overview_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "training_templates_overview_ways_items_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "training_templates_overview_ways_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL
  );
  
  CREATE TABLE "training_templates_overview_why_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "training_templates_overview_offerings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"badge" varchar NOT NULL,
  	"meta" varchar NOT NULL
  );
  
  CREATE TABLE "training_templates_overview_templates_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "training_templates_overview_featured_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "training_templates_overview_templates_closing_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "training_templates_overview" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"overview_hero_crumb" varchar DEFAULT 'Overview',
  	"overview_hero_ghost" varchar DEFAULT 'TRAIN',
  	"overview_hero_title" varchar,
  	"overview_hero_lead" varchar,
  	"overview_hero_primary_cta_label" varchar DEFAULT 'Browse Courses',
  	"overview_hero_primary_cta_href" varchar DEFAULT '/training-templates/courses',
  	"overview_hero_secondary_cta_label" varchar DEFAULT 'Shop Templates',
  	"overview_hero_secondary_cta_href" varchar DEFAULT '/training-templates/templates',
  	"ways_eyebrow" varchar DEFAULT 'Build internal capability',
  	"ways_title" varchar DEFAULT 'Two ways to build internal capability.',
  	"ways_lead" varchar,
  	"courses_hero_crumb" varchar DEFAULT 'Course Catalog',
  	"courses_hero_ghost" varchar DEFAULT 'COURSES',
  	"courses_hero_title" varchar,
  	"courses_hero_lead" varchar,
  	"courses_hero_primary_cta_label" varchar DEFAULT 'Explore Courses',
  	"courses_hero_primary_cta_href" varchar DEFAULT '#catalog',
  	"courses_hero_secondary_cta_label" varchar DEFAULT 'Request a Private Course',
  	"courses_hero_secondary_cta_href" varchar DEFAULT '#',
  	"why_eyebrow" varchar DEFAULT 'Why train with CSA',
  	"why_title" varchar DEFAULT 'Training from engineers who certify real systems.',
  	"catalog_eyebrow" varchar DEFAULT 'Find your course',
  	"catalog_title" varchar DEFAULT 'Filter courses.',
  	"catalog_lead" varchar,
  	"offerings_eyebrow" varchar DEFAULT 'Core educational offerings',
  	"offerings_title" varchar DEFAULT 'Three programs that translate standards into practice.',
  	"courses_private_eyebrow" varchar DEFAULT 'Private & custom delivery',
  	"courses_private_title" varchar DEFAULT 'Request a private course.',
  	"courses_private_sub" varchar,
  	"courses_private_primary_label" varchar DEFAULT 'Request a Private Course',
  	"courses_private_primary_href" varchar DEFAULT '#',
  	"courses_private_secondary_label" varchar DEFAULT 'Talk to an instructor',
  	"courses_private_secondary_href" varchar DEFAULT '#',
  	"templates_hero_crumb" varchar DEFAULT 'Purchase Templates',
  	"templates_hero_ghost" varchar DEFAULT 'TEMPLATES',
  	"templates_hero_title" varchar,
  	"templates_hero_lead" varchar,
  	"templates_hero_primary_cta_label" varchar DEFAULT 'Shop All Templates',
  	"templates_hero_primary_cta_href" varchar DEFAULT '#store',
  	"templates_hero_secondary_cta_label" varchar DEFAULT 'Talk to an Engineer',
  	"templates_hero_secondary_cta_href" varchar DEFAULT '#',
  	"featured_badge" varchar DEFAULT 'Featured Bundle',
  	"featured_icon" varchar DEFAULT 'library',
  	"featured_tag" varchar DEFAULT '17 templates',
  	"featured_title" varchar DEFAULT 'Full Standards Compliance Suite',
  	"featured_description" varchar,
  	"featured_price_meta" varchar DEFAULT '17 templates · best value',
  	"featured_primary_label" varchar DEFAULT 'Quick Checkout',
  	"featured_secondary_label" varchar DEFAULT 'Add to Cart',
  	"store_eyebrow" varchar DEFAULT 'Filter templates',
  	"store_title" varchar DEFAULT 'Build your documentation set.',
  	"store_lead" varchar,
  	"store_pricing_note" varchar DEFAULT 'Pricing to be added. Every template is available as part of a bundle or as an individual document.',
  	"templates_closing_eyebrow" varchar DEFAULT 'Shop all templates',
  	"templates_closing_title" varchar DEFAULT 'Buy as a bundle, or one document at a time.',
  	"templates_closing_sub" varchar,
  	"templates_closing_primary_label" varchar DEFAULT 'Shop All Templates',
  	"templates_closing_primary_href" varchar DEFAULT '#store',
  	"templates_closing_secondary_label" varchar DEFAULT 'Scope a custom bundle',
  	"templates_closing_secondary_href" varchar DEFAULT '#',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_about_hero_hud_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar
  );
  
  CREATE TABLE "company_about_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL
  );
  
  CREATE TABLE "company_about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_ghost" varchar DEFAULT 'CSA',
  	"hero_icon" varchar DEFAULT 'compass',
  	"hero_eyebrow" varchar DEFAULT 'About CSA',
  	"hero_title" varchar DEFAULT 'Engineering a Safer Future.',
  	"hero_tagline" varchar,
  	"hero_intro" varchar,
  	"hero_primary_cta_label" varchar DEFAULT 'See Our Experience',
  	"hero_primary_cta_href" varchar DEFAULT '/company/experience',
  	"hero_secondary_cta_label" varchar DEFAULT 'Our Services',
  	"hero_secondary_cta_href" varchar DEFAULT '/company/services',
  	"hero_hud_tag" varchar DEFAULT 'Operating principle',
  	"hero_hud_badge" varchar DEFAULT 'Technical objectivity',
  	"hero_hud_foot" varchar DEFAULT 'Independent by design',
  	"mission_num" varchar DEFAULT '01 — Mission',
  	"mission_eyebrow" varchar DEFAULT 'Our Mission',
  	"mission_title" varchar DEFAULT 'Democratizing functional safety.',
  	"mission_body" jsonb,
  	"philosophy_num" varchar DEFAULT '02 — Philosophy',
  	"philosophy_eyebrow" varchar DEFAULT 'The CSA Philosophy',
  	"philosophy_title" varchar DEFAULT 'Safety is a design feature, not a cost center.',
  	"philosophy_body" jsonb,
  	"philosophy_boundary_icon" varchar DEFAULT 'git-fork',
  	"philosophy_boundary_title" varchar DEFAULT 'A clear professional boundary',
  	"philosophy_boundary_body" jsonb,
  	"values_eyebrow" varchar DEFAULT 'Core Values',
  	"values_title" varchar DEFAULT 'What we hold ourselves to.',
  	"values_lead" varchar,
  	"iso_icon" varchar DEFAULT 'badge-check',
  	"iso_eyebrow" varchar DEFAULT 'Quality management',
  	"iso_body" jsonb,
  	"closing_eyebrow" varchar DEFAULT 'About CSA · Get to know us',
  	"closing_title" varchar DEFAULT 'Trusted systems safety, end to end.',
  	"closing_sub" varchar,
  	"closing_primary_label" varchar DEFAULT 'Meet the Team',
  	"closing_primary_href" varchar DEFAULT '#',
  	"closing_secondary_label" varchar DEFAULT 'See Our Experience',
  	"closing_secondary_href" varchar DEFAULT '/company/experience',
  	"meta_title" varchar DEFAULT 'About CSA | Independent Functional Safety Firm',
  	"meta_description" varchar DEFAULT 'Critical Systems Analysis is an independent functional safety consulting firm — auditing, reviewing, and validating safety-critical systems with strict technical objectivity.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_services_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "company_services_hero_hud_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar
  );
  
  CREATE TABLE "company_services_models_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"best" varchar NOT NULL
  );
  
  CREATE TABLE "company_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_ghost" varchar DEFAULT 'SERVICES',
  	"hero_icon" varchar DEFAULT 'settings-2',
  	"hero_eyebrow" varchar DEFAULT 'Company · Services',
  	"hero_title" varchar DEFAULT 'Flexible Functional Safety Engineering Services',
  	"hero_tagline" varchar,
  	"hero_intro" varchar,
  	"hero_primary_cta_label" varchar DEFAULT 'Book a Consultation',
  	"hero_primary_cta_href" varchar DEFAULT '#',
  	"hero_secondary_cta_label" varchar DEFAULT 'See Our Experience',
  	"hero_secondary_cta_href" varchar DEFAULT '/company/experience',
  	"hero_hud_tag" varchar DEFAULT 'How we engage',
  	"hero_hud_badge" varchar DEFAULT 'Flexible',
  	"hero_hud_foot" varchar DEFAULT 'Senior capacity, on your terms',
  	"models_eyebrow" varchar DEFAULT 'Engagement Models',
  	"models_title" varchar DEFAULT 'Four ways to bring CSA in.',
  	"models_lead" varchar,
  	"closing_eyebrow" varchar DEFAULT 'Services · Scope your engagement',
  	"closing_title" varchar DEFAULT 'Find the right model for your team.',
  	"closing_sub" varchar,
  	"closing_primary_label" varchar DEFAULT 'Book a Consultation',
  	"closing_primary_href" varchar DEFAULT '#',
  	"meta_title" varchar DEFAULT 'Our Services | Functional Safety Engagement Models',
  	"meta_description" varchar DEFAULT 'Flexible functional safety engagement models — independent safety audits, embedded engineering support, technical liaison for assessors, and expert contract engagements.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_experience_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "company_experience_hero_hud_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar
  );
  
  CREATE TABLE "company_experience_delivered_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL
  );
  
  CREATE TABLE "company_experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_ghost" varchar DEFAULT 'EXPERIENCE',
  	"hero_icon" varchar DEFAULT 'award',
  	"hero_eyebrow" varchar DEFAULT 'Company · Experience',
  	"hero_title" varchar DEFAULT 'Deep, Hands-On Certification Experience',
  	"hero_tagline" varchar,
  	"hero_intro" varchar,
  	"hero_primary_cta_label" varchar DEFAULT 'Discuss Your Project',
  	"hero_primary_cta_href" varchar DEFAULT '#',
  	"hero_secondary_cta_label" varchar DEFAULT 'Our Services',
  	"hero_secondary_cta_href" varchar DEFAULT '/company/services',
  	"hero_hud_tag" varchar DEFAULT 'Systems we have certified',
  	"hero_hud_badge" varchar DEFAULT 'Proven record',
  	"hero_hud_foot" varchar DEFAULT 'Decades of combined experience',
  	"delivered_eyebrow" varchar DEFAULT 'Where We''ve Delivered',
  	"delivered_title" varchar DEFAULT 'Certification across high-stakes sectors.',
  	"delivered_lead" varchar,
  	"cases_eyebrow" varchar DEFAULT 'Case Studies',
  	"cases_title" varchar DEFAULT 'Independent validation, proven in the field.',
  	"cases_lead" varchar,
  	"cases_note_icon" varchar DEFAULT 'folder-plus',
  	"cases_note_bold" varchar DEFAULT 'More case studies on the way.',
  	"cases_note_text" varchar DEFAULT 'Additional case studies to be added from the CSA case study library.',
  	"closing_eyebrow" varchar DEFAULT 'Experience · Your program next',
  	"closing_title" varchar DEFAULT 'Put this experience to work.',
  	"closing_sub" varchar,
  	"closing_primary_label" varchar DEFAULT 'Discuss Your Project',
  	"closing_primary_href" varchar DEFAULT '#',
  	"meta_title" varchar DEFAULT 'Our Experience | Functional Safety Certification',
  	"meta_description" varchar DEFAULT 'Proven functional safety certification experience across robotics, transport, and infrastructure — including a first-of-its-kind collaborative AMR certification under IEC 61508.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "careers_intro_hero_hud_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar
  );
  
  CREATE TABLE "careers_intro_why_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL
  );
  
  CREATE TABLE "careers_intro" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_ghost" varchar DEFAULT 'CAREERS',
  	"hero_icon" varchar DEFAULT 'compass',
  	"hero_eyebrow" varchar DEFAULT 'Company · Careers',
  	"hero_title" varchar DEFAULT 'Build the Future of Safe Automation',
  	"hero_tagline" varchar,
  	"hero_intro" varchar,
  	"hero_primary_cta_label" varchar DEFAULT 'View Open Roles',
  	"hero_secondary_cta_label" varchar DEFAULT 'Why CSA',
  	"hero_secondary_cta_href" varchar DEFAULT '/company',
  	"hero_hud_tag" varchar DEFAULT 'Who we hire',
  	"hero_hud_badge" varchar DEFAULT 'We''re hiring',
  	"hero_hud_foot" varchar DEFAULT 'Independence, applied',
  	"why_eyebrow" varchar DEFAULT 'Why Elite Engineers Build Careers at CSA',
  	"why_title" varchar DEFAULT 'Ownership, impact, and autonomy.',
  	"why_lead" varchar,
  	"roles_eyebrow" varchar DEFAULT 'Open Positions',
  	"roles_title" varchar DEFAULT 'Find your role.',
  	"roles_lead" varchar,
  	"roles_note_icon" varchar DEFAULT 'briefcase',
  	"roles_note_bold" varchar DEFAULT 'Roles update as we grow.',
  	"roles_note_text" varchar DEFAULT 'Live openings are populated from the CSA hiring system — check back, or reach out if you believe you belong here.',
  	"closing_eyebrow" varchar DEFAULT 'Careers · Join CSA',
  	"closing_title" varchar DEFAULT 'Apply rigorous engineering to what matters.',
  	"closing_sub" varchar,
  	"closing_primary_label" varchar DEFAULT 'View Open Roles',
  	"meta_title" varchar DEFAULT 'Careers | Build the Future of Safe Automation',
  	"meta_description" varchar DEFAULT 'Join CSA. We seek elite engineers, independent technical minds, and safety authorities who want to apply rigorous systems engineering to the world’s most innovative autonomous platforms.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "resources_overview_hero_jump" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "resources_overview_tools_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"tag" varchar DEFAULT 'AI Tool' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "resources_overview_library_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "resources_overview" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Functional Safety Resources',
  	"hero_eyebrow_icon" varchar DEFAULT 'library-big',
  	"hero_ghost" varchar DEFAULT 'Resources',
  	"hero_title" varchar DEFAULT 'Tools and knowledge for the safety lifecycle.',
  	"hero_sub" varchar,
  	"tools_eyebrow" varchar DEFAULT 'AI-Augmented Tools',
  	"tools_title" varchar DEFAULT 'Start with a tool.',
  	"tools_lead" varchar,
  	"library_eyebrow" varchar DEFAULT 'Knowledge Library',
  	"library_title" varchar DEFAULT 'Go deeper.',
  	"library_lead" varchar,
  	"closing_eyebrow" varchar DEFAULT 'Beyond the tools',
  	"closing_title" varchar DEFAULT 'Need an expert in the room?',
  	"closing_sub" varchar,
  	"closing_cta_label" varchar DEFAULT 'Book a Consultation',
  	"closing_cta_href" varchar DEFAULT '#',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "standards_identifier_page_tool_selectors_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "standards_identifier_page_tool_selectors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "standards_identifier_page_tool_roadmap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"pill" varchar NOT NULL,
  	"meta" varchar NOT NULL
  );
  
  CREATE TABLE "standards_identifier_page_frameworks_items_codes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "standards_identifier_page_frameworks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "standards_identifier_page_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "standards_identifier_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Standards Identifier',
  	"hero_eyebrow_icon" varchar DEFAULT 'crosshair',
  	"hero_ghost" varchar DEFAULT 'Standards',
  	"hero_title" varchar DEFAULT 'Which safety standard applies to your project?',
  	"hero_sub1" varchar,
  	"hero_sub2" varchar,
  	"hero_primary_cta_label" varchar DEFAULT 'Try the Standards Identifier',
  	"hero_primary_cta_href" varchar DEFAULT '#tool',
  	"hero_secondary_cta_label" varchar DEFAULT 'Talk to an Engineer',
  	"hero_secondary_cta_href" varchar DEFAULT '#',
  	"tool_name" varchar DEFAULT 'AI Standards Identifier',
  	"tool_sub" varchar DEFAULT 'Industry · Mobility · Environment',
  	"tool_badge" varchar DEFAULT 'UI Preview',
  	"tool_submit_label" varchar DEFAULT 'Identify My Standards',
  	"tool_submit_note" varchar DEFAULT 'Interactive preview — full AI mapping connects at launch.',
  	"tool_result_label" varchar DEFAULT 'Compliance roadmap',
  	"tool_result_preview_label" varchar DEFAULT 'Sample output',
  	"tool_veil_text" varchar,
  	"frameworks_eyebrow" varchar DEFAULT 'Primary Regulatory Frameworks',
  	"frameworks_title" varchar DEFAULT 'Covered by our independent audits.',
  	"frameworks_lead" varchar,
  	"how_it_works_eyebrow" varchar DEFAULT 'How It Works',
  	"how_it_works_title" varchar DEFAULT 'From parameters to roadmap in three steps.',
  	"closing_eyebrow" varchar DEFAULT 'Isolate your targets',
  	"closing_title" varchar DEFAULT 'Try the Standards Identifier.',
  	"closing_sub" varchar,
  	"closing_cta_label" varchar DEFAULT 'Try the Standards Identifier',
  	"closing_cta_href" varchar DEFAULT '#tool',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "safety_chat_page_panel_thread" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"who" "enum_safety_chat_page_panel_thread_who" DEFAULT 'bot' NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "safety_chat_page_panel_suggestions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "safety_chat_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Safety Chat',
  	"hero_eyebrow_icon" varchar DEFAULT 'message-square-text',
  	"hero_ghost" varchar DEFAULT 'Safety Chat',
  	"hero_title" varchar DEFAULT 'Safety Chat: immediate engineering insight.',
  	"hero_sub" varchar,
  	"hero_note" varchar,
  	"hero_primary_cta_label" varchar DEFAULT 'Ask Safety Chat',
  	"hero_primary_cta_href" varchar DEFAULT '#',
  	"hero_secondary_cta_label" varchar DEFAULT 'Talk to an Engineer',
  	"hero_secondary_cta_href" varchar DEFAULT '#',
  	"panel_name" varchar DEFAULT 'Safety Chat',
  	"panel_status" varchar DEFAULT 'AI Assistant',
  	"panel_tag" varchar DEFAULT 'AI-Augmented',
  	"panel_placeholder" varchar DEFAULT 'Ask a functional safety question…',
  	"panel_lock_text" varchar DEFAULT 'Sign in to start chatting. Safety Chat is available to logged-in users.',
  	"panel_lock_cta_label" varchar DEFAULT 'Sign in to chat',
  	"panel_lock_cta_href" varchar DEFAULT '#',
  	"closing_eyebrow" varchar DEFAULT 'Move faster',
  	"closing_title" varchar DEFAULT 'Ask Safety Chat.',
  	"closing_sub" varchar,
  	"closing_cta_label" varchar DEFAULT 'Ask Safety Chat',
  	"closing_cta_href" varchar DEFAULT '#',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_highlights" ADD CONSTRAINT "industries_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_standards" ADD CONSTRAINT "industries_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_capabilities" ADD CONSTRAINT "industries_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_points" ADD CONSTRAINT "services_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_standards" ADD CONSTRAINT "case_studies_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_whats_included" ADD CONSTRAINT "templates_whats_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates" ADD CONSTRAINT "templates_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates" ADD CONSTRAINT "templates_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_modules" ADD CONSTRAINT "courses_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "free_trainings" ADD CONSTRAINT "free_trainings_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_credentials" ADD CONSTRAINT "team_members_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages" ADD CONSTRAINT "legal_pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_templates_fk" FOREIGN KEY ("templates_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_free_trainings_fk" FOREIGN KEY ("free_trainings_id") REFERENCES "public"."free_trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_postings_fk" FOREIGN KEY ("job_postings_id") REFERENCES "public"."job_postings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_children" ADD CONSTRAINT "header_nav_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav" ADD CONSTRAINT "header_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_systems_standards" ADD CONSTRAINT "home_page_hero_systems_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_systems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_systems" ADD CONSTRAINT "home_page_hero_systems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_ticker_standards" ADD CONSTRAINT "home_page_hero_ticker_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_problem_solutions" ADD CONSTRAINT "home_page_problem_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_standing_apart_rows" ADD CONSTRAINT "home_page_standing_apart_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_standing_apart_never_ai" ADD CONSTRAINT "home_page_standing_apart_never_ai_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_certs" ADD CONSTRAINT "home_page_about_certs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_experience_tags" ADD CONSTRAINT "home_page_about_experience_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_conferences" ADD CONSTRAINT "home_page_about_conferences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_portrait_id_media_id_fk" FOREIGN KEY ("about_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "consulting_overview_hero_standards" ADD CONSTRAINT "consulting_overview_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_overview_hero_hud_steps" ADD CONSTRAINT "consulting_overview_hero_hud_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_overview_facts_items" ADD CONSTRAINT "consulting_overview_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_overview_about_creds" ADD CONSTRAINT "consulting_overview_about_creds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_overview_options_items" ADD CONSTRAINT "consulting_overview_options_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_overview_capabilities_items" ADD CONSTRAINT "consulting_overview_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_overview_faq_items" ADD CONSTRAINT "consulting_overview_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_overview" ADD CONSTRAINT "consulting_overview_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "training_templates_overview_overview_hero_standards" ADD CONSTRAINT "training_templates_overview_overview_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_templates_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_templates_overview_ways_items_meta" ADD CONSTRAINT "training_templates_overview_ways_items_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_templates_overview_ways_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_templates_overview_ways_items" ADD CONSTRAINT "training_templates_overview_ways_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_templates_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_templates_overview_why_items" ADD CONSTRAINT "training_templates_overview_why_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_templates_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_templates_overview_offerings_items" ADD CONSTRAINT "training_templates_overview_offerings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_templates_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_templates_overview_templates_hero_standards" ADD CONSTRAINT "training_templates_overview_templates_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_templates_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_templates_overview_featured_chips" ADD CONSTRAINT "training_templates_overview_featured_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_templates_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_templates_overview_templates_closing_stats" ADD CONSTRAINT "training_templates_overview_templates_closing_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_templates_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_templates_overview" ADD CONSTRAINT "training_templates_overview_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_about_hero_hud_rows" ADD CONSTRAINT "company_about_hero_hud_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_about_values_items" ADD CONSTRAINT "company_about_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_services_hero_standards" ADD CONSTRAINT "company_services_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_services_hero_hud_rows" ADD CONSTRAINT "company_services_hero_hud_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_services_models_items" ADD CONSTRAINT "company_services_models_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_experience_hero_standards" ADD CONSTRAINT "company_experience_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_experience_hero_hud_rows" ADD CONSTRAINT "company_experience_hero_hud_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_experience_delivered_items" ADD CONSTRAINT "company_experience_delivered_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_intro_hero_hud_rows" ADD CONSTRAINT "careers_intro_hero_hud_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_intro_why_items" ADD CONSTRAINT "careers_intro_why_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_overview_hero_jump" ADD CONSTRAINT "resources_overview_hero_jump_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_overview_tools_items" ADD CONSTRAINT "resources_overview_tools_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_overview_library_items" ADD CONSTRAINT "resources_overview_library_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_overview" ADD CONSTRAINT "resources_overview_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "standards_identifier_page_tool_selectors_options" ADD CONSTRAINT "standards_identifier_page_tool_selectors_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."standards_identifier_page_tool_selectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "standards_identifier_page_tool_selectors" ADD CONSTRAINT "standards_identifier_page_tool_selectors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."standards_identifier_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "standards_identifier_page_tool_roadmap" ADD CONSTRAINT "standards_identifier_page_tool_roadmap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."standards_identifier_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "standards_identifier_page_frameworks_items_codes" ADD CONSTRAINT "standards_identifier_page_frameworks_items_codes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."standards_identifier_page_frameworks_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "standards_identifier_page_frameworks_items" ADD CONSTRAINT "standards_identifier_page_frameworks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."standards_identifier_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "standards_identifier_page_how_it_works_steps" ADD CONSTRAINT "standards_identifier_page_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."standards_identifier_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "standards_identifier_page" ADD CONSTRAINT "standards_identifier_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "safety_chat_page_panel_thread" ADD CONSTRAINT "safety_chat_page_panel_thread_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."safety_chat_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "safety_chat_page_panel_suggestions" ADD CONSTRAINT "safety_chat_page_panel_suggestions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."safety_chat_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "safety_chat_page" ADD CONSTRAINT "safety_chat_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "industries_highlights_order_idx" ON "industries_highlights" USING btree ("_order");
  CREATE INDEX "industries_highlights_parent_id_idx" ON "industries_highlights" USING btree ("_parent_id");
  CREATE INDEX "industries_standards_order_idx" ON "industries_standards" USING btree ("_order");
  CREATE INDEX "industries_standards_parent_id_idx" ON "industries_standards" USING btree ("_parent_id");
  CREATE INDEX "industries_capabilities_order_idx" ON "industries_capabilities" USING btree ("_order");
  CREATE INDEX "industries_capabilities_parent_id_idx" ON "industries_capabilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  CREATE INDEX "industries_meta_meta_image_idx" ON "industries" USING btree ("meta_image_id");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "services_points_order_idx" ON "services_points" USING btree ("_order");
  CREATE INDEX "services_points_parent_id_idx" ON "services_points" USING btree ("_parent_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_hero_image_idx" ON "articles" USING btree ("hero_image_id");
  CREATE INDEX "articles_meta_meta_image_idx" ON "articles" USING btree ("meta_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_hero_image_idx" ON "_articles_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_articles_v_version_meta_version_meta_image_idx" ON "_articles_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "case_studies_standards_order_idx" ON "case_studies_standards" USING btree ("_order");
  CREATE INDEX "case_studies_standards_parent_id_idx" ON "case_studies_standards" USING btree ("_parent_id");
  CREATE INDEX "case_studies_cover_image_idx" ON "case_studies" USING btree ("cover_image_id");
  CREATE INDEX "case_studies_meta_meta_image_idx" ON "case_studies" USING btree ("meta_image_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "templates_whats_included_order_idx" ON "templates_whats_included" USING btree ("_order");
  CREATE INDEX "templates_whats_included_parent_id_idx" ON "templates_whats_included" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "templates_slug_idx" ON "templates" USING btree ("slug");
  CREATE INDEX "templates_thumbnail_idx" ON "templates" USING btree ("thumbnail_id");
  CREATE INDEX "templates_meta_meta_image_idx" ON "templates" USING btree ("meta_image_id");
  CREATE INDEX "templates_updated_at_idx" ON "templates" USING btree ("updated_at");
  CREATE INDEX "templates_created_at_idx" ON "templates" USING btree ("created_at");
  CREATE INDEX "courses_modules_order_idx" ON "courses_modules" USING btree ("_order");
  CREATE INDEX "courses_modules_parent_id_idx" ON "courses_modules" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_media_idx" ON "courses" USING btree ("media_id");
  CREATE INDEX "courses_meta_meta_image_idx" ON "courses" USING btree ("meta_image_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "resources_file_idx" ON "resources" USING btree ("file_id");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "free_trainings_media_idx" ON "free_trainings" USING btree ("media_id");
  CREATE INDEX "free_trainings_updated_at_idx" ON "free_trainings" USING btree ("updated_at");
  CREATE INDEX "free_trainings_created_at_idx" ON "free_trainings" USING btree ("created_at");
  CREATE INDEX "team_members_credentials_order_idx" ON "team_members_credentials" USING btree ("_order");
  CREATE INDEX "team_members_credentials_parent_id_idx" ON "team_members_credentials" USING btree ("_parent_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "job_postings_updated_at_idx" ON "job_postings" USING btree ("updated_at");
  CREATE INDEX "job_postings_created_at_idx" ON "job_postings" USING btree ("created_at");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_meta_meta_image_idx" ON "legal_pages" USING btree ("meta_image_id");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("templates_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_free_trainings_id_idx" ON "payload_locked_documents_rels" USING btree ("free_trainings_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_job_postings_id_idx" ON "payload_locked_documents_rels" USING btree ("job_postings_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "header_nav_children_order_idx" ON "header_nav_children" USING btree ("_order");
  CREATE INDEX "header_nav_children_parent_id_idx" ON "header_nav_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_order_idx" ON "header_nav" USING btree ("_order");
  CREATE INDEX "header_nav_parent_id_idx" ON "header_nav" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_systems_standards_order_idx" ON "home_page_hero_systems_standards" USING btree ("_order");
  CREATE INDEX "home_page_hero_systems_standards_parent_id_idx" ON "home_page_hero_systems_standards" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_systems_order_idx" ON "home_page_hero_systems" USING btree ("_order");
  CREATE INDEX "home_page_hero_systems_parent_id_idx" ON "home_page_hero_systems" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_ticker_standards_order_idx" ON "home_page_hero_ticker_standards" USING btree ("_order");
  CREATE INDEX "home_page_hero_ticker_standards_parent_id_idx" ON "home_page_hero_ticker_standards" USING btree ("_parent_id");
  CREATE INDEX "home_page_problem_solutions_order_idx" ON "home_page_problem_solutions" USING btree ("_order");
  CREATE INDEX "home_page_problem_solutions_parent_id_idx" ON "home_page_problem_solutions" USING btree ("_parent_id");
  CREATE INDEX "home_page_standing_apart_rows_order_idx" ON "home_page_standing_apart_rows" USING btree ("_order");
  CREATE INDEX "home_page_standing_apart_rows_parent_id_idx" ON "home_page_standing_apart_rows" USING btree ("_parent_id");
  CREATE INDEX "home_page_standing_apart_never_ai_order_idx" ON "home_page_standing_apart_never_ai" USING btree ("_order");
  CREATE INDEX "home_page_standing_apart_never_ai_parent_id_idx" ON "home_page_standing_apart_never_ai" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_certs_order_idx" ON "home_page_about_certs" USING btree ("_order");
  CREATE INDEX "home_page_about_certs_parent_id_idx" ON "home_page_about_certs" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_experience_tags_order_idx" ON "home_page_about_experience_tags" USING btree ("_order");
  CREATE INDEX "home_page_about_experience_tags_parent_id_idx" ON "home_page_about_experience_tags" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_conferences_order_idx" ON "home_page_about_conferences" USING btree ("_order");
  CREATE INDEX "home_page_about_conferences_parent_id_idx" ON "home_page_about_conferences" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_about_portrait_idx" ON "home_page" USING btree ("about_portrait_id");
  CREATE INDEX "home_page_meta_meta_image_idx" ON "home_page" USING btree ("meta_image_id");
  CREATE INDEX "consulting_overview_hero_standards_order_idx" ON "consulting_overview_hero_standards" USING btree ("_order");
  CREATE INDEX "consulting_overview_hero_standards_parent_id_idx" ON "consulting_overview_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "consulting_overview_hero_hud_steps_order_idx" ON "consulting_overview_hero_hud_steps" USING btree ("_order");
  CREATE INDEX "consulting_overview_hero_hud_steps_parent_id_idx" ON "consulting_overview_hero_hud_steps" USING btree ("_parent_id");
  CREATE INDEX "consulting_overview_facts_items_order_idx" ON "consulting_overview_facts_items" USING btree ("_order");
  CREATE INDEX "consulting_overview_facts_items_parent_id_idx" ON "consulting_overview_facts_items" USING btree ("_parent_id");
  CREATE INDEX "consulting_overview_about_creds_order_idx" ON "consulting_overview_about_creds" USING btree ("_order");
  CREATE INDEX "consulting_overview_about_creds_parent_id_idx" ON "consulting_overview_about_creds" USING btree ("_parent_id");
  CREATE INDEX "consulting_overview_options_items_order_idx" ON "consulting_overview_options_items" USING btree ("_order");
  CREATE INDEX "consulting_overview_options_items_parent_id_idx" ON "consulting_overview_options_items" USING btree ("_parent_id");
  CREATE INDEX "consulting_overview_capabilities_items_order_idx" ON "consulting_overview_capabilities_items" USING btree ("_order");
  CREATE INDEX "consulting_overview_capabilities_items_parent_id_idx" ON "consulting_overview_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "consulting_overview_faq_items_order_idx" ON "consulting_overview_faq_items" USING btree ("_order");
  CREATE INDEX "consulting_overview_faq_items_parent_id_idx" ON "consulting_overview_faq_items" USING btree ("_parent_id");
  CREATE INDEX "consulting_overview_meta_meta_image_idx" ON "consulting_overview" USING btree ("meta_image_id");
  CREATE INDEX "training_templates_overview_overview_hero_standards_order_idx" ON "training_templates_overview_overview_hero_standards" USING btree ("_order");
  CREATE INDEX "training_templates_overview_overview_hero_standards_parent_id_idx" ON "training_templates_overview_overview_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "training_templates_overview_ways_items_meta_order_idx" ON "training_templates_overview_ways_items_meta" USING btree ("_order");
  CREATE INDEX "training_templates_overview_ways_items_meta_parent_id_idx" ON "training_templates_overview_ways_items_meta" USING btree ("_parent_id");
  CREATE INDEX "training_templates_overview_ways_items_order_idx" ON "training_templates_overview_ways_items" USING btree ("_order");
  CREATE INDEX "training_templates_overview_ways_items_parent_id_idx" ON "training_templates_overview_ways_items" USING btree ("_parent_id");
  CREATE INDEX "training_templates_overview_why_items_order_idx" ON "training_templates_overview_why_items" USING btree ("_order");
  CREATE INDEX "training_templates_overview_why_items_parent_id_idx" ON "training_templates_overview_why_items" USING btree ("_parent_id");
  CREATE INDEX "training_templates_overview_offerings_items_order_idx" ON "training_templates_overview_offerings_items" USING btree ("_order");
  CREATE INDEX "training_templates_overview_offerings_items_parent_id_idx" ON "training_templates_overview_offerings_items" USING btree ("_parent_id");
  CREATE INDEX "training_templates_overview_templates_hero_standards_order_idx" ON "training_templates_overview_templates_hero_standards" USING btree ("_order");
  CREATE INDEX "training_templates_overview_templates_hero_standards_parent_id_idx" ON "training_templates_overview_templates_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "training_templates_overview_featured_chips_order_idx" ON "training_templates_overview_featured_chips" USING btree ("_order");
  CREATE INDEX "training_templates_overview_featured_chips_parent_id_idx" ON "training_templates_overview_featured_chips" USING btree ("_parent_id");
  CREATE INDEX "training_templates_overview_templates_closing_stats_order_idx" ON "training_templates_overview_templates_closing_stats" USING btree ("_order");
  CREATE INDEX "training_templates_overview_templates_closing_stats_parent_id_idx" ON "training_templates_overview_templates_closing_stats" USING btree ("_parent_id");
  CREATE INDEX "training_templates_overview_meta_meta_image_idx" ON "training_templates_overview" USING btree ("meta_image_id");
  CREATE INDEX "company_about_hero_hud_rows_order_idx" ON "company_about_hero_hud_rows" USING btree ("_order");
  CREATE INDEX "company_about_hero_hud_rows_parent_id_idx" ON "company_about_hero_hud_rows" USING btree ("_parent_id");
  CREATE INDEX "company_about_values_items_order_idx" ON "company_about_values_items" USING btree ("_order");
  CREATE INDEX "company_about_values_items_parent_id_idx" ON "company_about_values_items" USING btree ("_parent_id");
  CREATE INDEX "company_services_hero_standards_order_idx" ON "company_services_hero_standards" USING btree ("_order");
  CREATE INDEX "company_services_hero_standards_parent_id_idx" ON "company_services_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "company_services_hero_hud_rows_order_idx" ON "company_services_hero_hud_rows" USING btree ("_order");
  CREATE INDEX "company_services_hero_hud_rows_parent_id_idx" ON "company_services_hero_hud_rows" USING btree ("_parent_id");
  CREATE INDEX "company_services_models_items_order_idx" ON "company_services_models_items" USING btree ("_order");
  CREATE INDEX "company_services_models_items_parent_id_idx" ON "company_services_models_items" USING btree ("_parent_id");
  CREATE INDEX "company_experience_hero_standards_order_idx" ON "company_experience_hero_standards" USING btree ("_order");
  CREATE INDEX "company_experience_hero_standards_parent_id_idx" ON "company_experience_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "company_experience_hero_hud_rows_order_idx" ON "company_experience_hero_hud_rows" USING btree ("_order");
  CREATE INDEX "company_experience_hero_hud_rows_parent_id_idx" ON "company_experience_hero_hud_rows" USING btree ("_parent_id");
  CREATE INDEX "company_experience_delivered_items_order_idx" ON "company_experience_delivered_items" USING btree ("_order");
  CREATE INDEX "company_experience_delivered_items_parent_id_idx" ON "company_experience_delivered_items" USING btree ("_parent_id");
  CREATE INDEX "careers_intro_hero_hud_rows_order_idx" ON "careers_intro_hero_hud_rows" USING btree ("_order");
  CREATE INDEX "careers_intro_hero_hud_rows_parent_id_idx" ON "careers_intro_hero_hud_rows" USING btree ("_parent_id");
  CREATE INDEX "careers_intro_why_items_order_idx" ON "careers_intro_why_items" USING btree ("_order");
  CREATE INDEX "careers_intro_why_items_parent_id_idx" ON "careers_intro_why_items" USING btree ("_parent_id");
  CREATE INDEX "resources_overview_hero_jump_order_idx" ON "resources_overview_hero_jump" USING btree ("_order");
  CREATE INDEX "resources_overview_hero_jump_parent_id_idx" ON "resources_overview_hero_jump" USING btree ("_parent_id");
  CREATE INDEX "resources_overview_tools_items_order_idx" ON "resources_overview_tools_items" USING btree ("_order");
  CREATE INDEX "resources_overview_tools_items_parent_id_idx" ON "resources_overview_tools_items" USING btree ("_parent_id");
  CREATE INDEX "resources_overview_library_items_order_idx" ON "resources_overview_library_items" USING btree ("_order");
  CREATE INDEX "resources_overview_library_items_parent_id_idx" ON "resources_overview_library_items" USING btree ("_parent_id");
  CREATE INDEX "resources_overview_meta_meta_image_idx" ON "resources_overview" USING btree ("meta_image_id");
  CREATE INDEX "standards_identifier_page_tool_selectors_options_order_idx" ON "standards_identifier_page_tool_selectors_options" USING btree ("_order");
  CREATE INDEX "standards_identifier_page_tool_selectors_options_parent_id_idx" ON "standards_identifier_page_tool_selectors_options" USING btree ("_parent_id");
  CREATE INDEX "standards_identifier_page_tool_selectors_order_idx" ON "standards_identifier_page_tool_selectors" USING btree ("_order");
  CREATE INDEX "standards_identifier_page_tool_selectors_parent_id_idx" ON "standards_identifier_page_tool_selectors" USING btree ("_parent_id");
  CREATE INDEX "standards_identifier_page_tool_roadmap_order_idx" ON "standards_identifier_page_tool_roadmap" USING btree ("_order");
  CREATE INDEX "standards_identifier_page_tool_roadmap_parent_id_idx" ON "standards_identifier_page_tool_roadmap" USING btree ("_parent_id");
  CREATE INDEX "standards_identifier_page_frameworks_items_codes_order_idx" ON "standards_identifier_page_frameworks_items_codes" USING btree ("_order");
  CREATE INDEX "standards_identifier_page_frameworks_items_codes_parent_id_idx" ON "standards_identifier_page_frameworks_items_codes" USING btree ("_parent_id");
  CREATE INDEX "standards_identifier_page_frameworks_items_order_idx" ON "standards_identifier_page_frameworks_items" USING btree ("_order");
  CREATE INDEX "standards_identifier_page_frameworks_items_parent_id_idx" ON "standards_identifier_page_frameworks_items" USING btree ("_parent_id");
  CREATE INDEX "standards_identifier_page_how_it_works_steps_order_idx" ON "standards_identifier_page_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "standards_identifier_page_how_it_works_steps_parent_id_idx" ON "standards_identifier_page_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "standards_identifier_page_meta_meta_image_idx" ON "standards_identifier_page" USING btree ("meta_image_id");
  CREATE INDEX "safety_chat_page_panel_thread_order_idx" ON "safety_chat_page_panel_thread" USING btree ("_order");
  CREATE INDEX "safety_chat_page_panel_thread_parent_id_idx" ON "safety_chat_page_panel_thread" USING btree ("_parent_id");
  CREATE INDEX "safety_chat_page_panel_suggestions_order_idx" ON "safety_chat_page_panel_suggestions" USING btree ("_order");
  CREATE INDEX "safety_chat_page_panel_suggestions_parent_id_idx" ON "safety_chat_page_panel_suggestions" USING btree ("_parent_id");
  CREATE INDEX "safety_chat_page_meta_meta_image_idx" ON "safety_chat_page" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "industries_highlights" CASCADE;
  DROP TABLE "industries_standards" CASCADE;
  DROP TABLE "industries_capabilities" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "services_points" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "case_studies_standards" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "templates_whats_included" CASCADE;
  DROP TABLE "templates" CASCADE;
  DROP TABLE "courses_modules" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "free_trainings" CASCADE;
  DROP TABLE "team_members_credentials" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "job_postings" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "header_nav_children" CASCADE;
  DROP TABLE "header_nav" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "home_page_hero_systems_standards" CASCADE;
  DROP TABLE "home_page_hero_systems" CASCADE;
  DROP TABLE "home_page_hero_ticker_standards" CASCADE;
  DROP TABLE "home_page_problem_solutions" CASCADE;
  DROP TABLE "home_page_standing_apart_rows" CASCADE;
  DROP TABLE "home_page_standing_apart_never_ai" CASCADE;
  DROP TABLE "home_page_about_certs" CASCADE;
  DROP TABLE "home_page_about_experience_tags" CASCADE;
  DROP TABLE "home_page_about_conferences" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "consulting_overview_hero_standards" CASCADE;
  DROP TABLE "consulting_overview_hero_hud_steps" CASCADE;
  DROP TABLE "consulting_overview_facts_items" CASCADE;
  DROP TABLE "consulting_overview_about_creds" CASCADE;
  DROP TABLE "consulting_overview_options_items" CASCADE;
  DROP TABLE "consulting_overview_capabilities_items" CASCADE;
  DROP TABLE "consulting_overview_faq_items" CASCADE;
  DROP TABLE "consulting_overview" CASCADE;
  DROP TABLE "training_templates_overview_overview_hero_standards" CASCADE;
  DROP TABLE "training_templates_overview_ways_items_meta" CASCADE;
  DROP TABLE "training_templates_overview_ways_items" CASCADE;
  DROP TABLE "training_templates_overview_why_items" CASCADE;
  DROP TABLE "training_templates_overview_offerings_items" CASCADE;
  DROP TABLE "training_templates_overview_templates_hero_standards" CASCADE;
  DROP TABLE "training_templates_overview_featured_chips" CASCADE;
  DROP TABLE "training_templates_overview_templates_closing_stats" CASCADE;
  DROP TABLE "training_templates_overview" CASCADE;
  DROP TABLE "company_about_hero_hud_rows" CASCADE;
  DROP TABLE "company_about_values_items" CASCADE;
  DROP TABLE "company_about" CASCADE;
  DROP TABLE "company_services_hero_standards" CASCADE;
  DROP TABLE "company_services_hero_hud_rows" CASCADE;
  DROP TABLE "company_services_models_items" CASCADE;
  DROP TABLE "company_services" CASCADE;
  DROP TABLE "company_experience_hero_standards" CASCADE;
  DROP TABLE "company_experience_hero_hud_rows" CASCADE;
  DROP TABLE "company_experience_delivered_items" CASCADE;
  DROP TABLE "company_experience" CASCADE;
  DROP TABLE "careers_intro_hero_hud_rows" CASCADE;
  DROP TABLE "careers_intro_why_items" CASCADE;
  DROP TABLE "careers_intro" CASCADE;
  DROP TABLE "resources_overview_hero_jump" CASCADE;
  DROP TABLE "resources_overview_tools_items" CASCADE;
  DROP TABLE "resources_overview_library_items" CASCADE;
  DROP TABLE "resources_overview" CASCADE;
  DROP TABLE "standards_identifier_page_tool_selectors_options" CASCADE;
  DROP TABLE "standards_identifier_page_tool_selectors" CASCADE;
  DROP TABLE "standards_identifier_page_tool_roadmap" CASCADE;
  DROP TABLE "standards_identifier_page_frameworks_items_codes" CASCADE;
  DROP TABLE "standards_identifier_page_frameworks_items" CASCADE;
  DROP TABLE "standards_identifier_page_how_it_works_steps" CASCADE;
  DROP TABLE "standards_identifier_page" CASCADE;
  DROP TABLE "safety_chat_page_panel_thread" CASCADE;
  DROP TABLE "safety_chat_page_panel_suggestions" CASCADE;
  DROP TABLE "safety_chat_page" CASCADE;
  DROP TYPE "public"."enum_partners_type";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_templates_category";
  DROP TYPE "public"."enum_templates_format";
  DROP TYPE "public"."enum_courses_format";
  DROP TYPE "public"."enum_resources_category";
  DROP TYPE "public"."enum_events_type";
  DROP TYPE "public"."enum_free_trainings_category";
  DROP TYPE "public"."enum_safety_chat_page_panel_thread_who";`)
}
