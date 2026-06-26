import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_cons_feat_kind" AS ENUM('none', 'experience', 'caseStudy');
  CREATE TYPE "public"."enum_cons_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cons_v_version_feat_kind" AS ENUM('none', 'experience', 'caseStudy');
  CREATE TYPE "public"."enum__cons_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_trn_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__trn_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_comp_hero_actions_style" AS ENUM('gold', 'silver', 'link');
  CREATE TYPE "public"."enum_comp_close_actions_style" AS ENUM('gold', 'silver', 'link');
  CREATE TYPE "public"."enum_comp_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__comp_v_version_hero_actions_style" AS ENUM('gold', 'silver', 'link');
  CREATE TYPE "public"."enum__comp_v_version_close_actions_style" AS ENUM('gold', 'silver', 'link');
  CREATE TYPE "public"."enum__comp_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_job_postings_type" AS ENUM('full-time', 'part-time', 'contract', 'internship');
  CREATE TYPE "public"."enum_job_postings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__job_postings_v_version_type" AS ENUM('full-time', 'part-time', 'contract', 'internship');
  CREATE TYPE "public"."enum__job_postings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_team_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_res_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__res_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_category" AS ENUM('robotics', 'automotive', 'rail', 'off-road-agriculture', 'philosophy', 'standards', 'field-notes', 'company');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_category" AS ENUM('robotics', 'automotive', 'rail', 'off-road-agriculture', 'philosophy', 'standards', 'field-notes', 'company');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_case_studies_closing_buttons_style" AS ENUM('primary', 'secondary', 'glass');
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_studies_v_version_closing_buttons_style" AS ENUM('primary', 'secondary', 'glass');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_products_type" AS ENUM('document', 'bundle');
  CREATE TYPE "public"."enum_products_category" AS ENUM('Compliance Bundles', 'Quality Management System (QMS)', 'Functional Safety Engineering (FS)');
  CREATE TYPE "public"."enum_products_doc_type" AS ENUM('Plans', 'Reports & Concepts', 'Analytical Models & Tools');
  CREATE TYPE "public"."enum_products_format" AS ENUM('Word', 'Excel', 'Bundle');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_type" AS ENUM('document', 'bundle');
  CREATE TYPE "public"."enum__products_v_version_category" AS ENUM('Compliance Bundles', 'Quality Management System (QMS)', 'Functional Safety Engineering (FS)');
  CREATE TYPE "public"."enum__products_v_version_doc_type" AS ENUM('Plans', 'Reports & Concepts', 'Analytical Models & Tools');
  CREATE TYPE "public"."enum__products_v_version_format" AS ENUM('Word', 'Excel', 'Bundle');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_courses_track" AS ENUM('Robotics', 'Rail', 'Industrial Machinery');
  CREATE TYPE "public"."enum_courses_format" AS ENUM('Private Virtual Team Session', 'In-Person Custom Workshop', 'On-Demand', 'Group', 'Private');
  CREATE TYPE "public"."enum_courses_level" AS ENUM('Introductory', 'Intermediate', 'Advanced', 'Tailored');
  CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__courses_v_version_track" AS ENUM('Robotics', 'Rail', 'Industrial Machinery');
  CREATE TYPE "public"."enum__courses_v_version_format" AS ENUM('Private Virtual Team Session', 'In-Person Custom Workshop', 'On-Demand', 'Group', 'Private');
  CREATE TYPE "public"."enum__courses_v_version_level" AS ENUM('Introductory', 'Intermediate', 'Advanced', 'Tailored');
  CREATE TYPE "public"."enum__courses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_instructors_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__instructors_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_free_trainings_level" AS ENUM('introductory', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum_free_trainings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__free_trainings_v_version_level" AS ENUM('introductory', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum__free_trainings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_downloads_category" AS ENUM('checklists', 'guidebooks', 'free-templates', 'standards-guides');
  CREATE TYPE "public"."enum_downloads_file_type" AS ENUM('pdf', 'xlsx', 'docx', 'csv', 'zip');
  CREATE TYPE "public"."enum_downloads_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__downloads_v_version_category" AS ENUM('checklists', 'guidebooks', 'free-templates', 'standards-guides');
  CREATE TYPE "public"."enum__downloads_v_version_file_type" AS ENUM('pdf', 'xlsx', 'docx', 'csv', 'zip');
  CREATE TYPE "public"."enum__downloads_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_type" AS ENUM('upcoming-event', 'past-keynote', 'technical-webinar');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_type" AS ENUM('upcoming-event', 'past-keynote', 'technical-webinar');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_enrollments_status" AS ENUM('active', 'completed', 'expired');
  CREATE TYPE "public"."enum_enrollments_source" AS ENUM('purchase', 'grant', 'free');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'paid', 'failed', 'refunded');
  CREATE TYPE "public"."enum_site_set_social_links_platform" AS ENUM('linkedin', 'x', 'youtube', 'facebook', 'instagram', 'github');
  CREATE TYPE "public"."enum_nav_hdr_cta_style" AS ENUM('silver', 'gold');
  CREATE TYPE "public"."enum_nav_ftr_closing_cta_ctas_style" AS ENUM('primary', 'secondary', 'glass');
  CREATE TYPE "public"."enum_dash_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__dash_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_portal_pg_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portal_pg_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_cart_pg_empty_cart_ctas_style" AS ENUM('primary', 'secondary', 'glass');
  CREATE TYPE "public"."enum_cart_pg_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cart_pg_v_version_empty_cart_ctas_style" AS ENUM('primary', 'secondary', 'glass');
  CREATE TYPE "public"."enum__cart_pg_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_checkout_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__checkout_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_thanks_confirmed_ctas_style" AS ENUM('primary', 'secondary', 'glass');
  CREATE TYPE "public"."enum_thanks_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__thanks_v_version_confirmed_ctas_style" AS ENUM('primary', 'secondary', 'glass');
  CREATE TYPE "public"."enum__thanks_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_auth_pg_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__auth_pg_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "home_hero_systems_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "home_hero_systems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cat" varchar,
  	"name" varchar,
  	"blurb" varchar,
  	"metric_label" varchar,
  	"metric_val" varchar
  );
  
  CREATE TABLE "home_hero_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "home_cs_items_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "home_cs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sector" varchar,
  	"name" varchar,
  	"desc" varchar,
  	"quote" varchar,
  	"author" varchar,
  	"affiliation" varchar
  );
  
  CREATE TABLE "home_pt_customers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"mark" varchar,
  	"domain" varchar
  );
  
  CREATE TABLE "home_pt_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"mono" varchar
  );
  
  CREATE TABLE "home_pb_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "home_sv_services_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "home_sv_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"best_for" varchar
  );
  
  CREATE TABLE "home_sv_industries_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "home_sv_industries_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "home_sv_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "home_sa_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"theme" varchar,
  	"old_title" varchar,
  	"old_desc" varchar,
  	"new_title" varchar,
  	"new_desc" varchar
  );
  
  CREATE TABLE "home_sa_never_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "home_ab_certs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub" varchar
  );
  
  CREATE TABLE "home_ab_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "home_ab_conferences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "home_nw_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"date" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"order" numeric,
  	"nav_label" varchar,
  	"hero_title" varchar,
  	"hero_title_accent" varchar,
  	"hero_subhead" varchar,
  	"hero_sub" jsonb,
  	"hero_cta_primary" varchar,
  	"hero_cta_secondary" varchar,
  	"cs_eyebrow" varchar,
  	"cs_heading" varchar,
  	"cs_sub" varchar,
  	"cs_cta_label" varchar,
  	"pt_eyebrow" varchar,
  	"pt_heading" varchar,
  	"pt_sub" varchar,
  	"pt_partners_label" varchar,
  	"pt_partners_intro" varchar,
  	"pb_eyebrow" varchar,
  	"pb_heading" varchar,
  	"pb_lead" jsonb,
  	"pb_solve_label" varchar,
  	"sv_eyebrow" varchar,
  	"sv_services_heading" varchar,
  	"sv_services_lead" varchar,
  	"sv_services_cta" varchar,
  	"sv_industries_heading" varchar,
  	"sv_industries_lead" varchar,
  	"sv_industries_cta" varchar,
  	"sa_eyebrow" varchar,
  	"sa_heading" varchar,
  	"sa_lead" jsonb,
  	"sa_mandate_key" varchar,
  	"sa_mandate_tag" varchar,
  	"sa_col_old" varchar,
  	"sa_col_new" varchar,
  	"sa_never_label" varchar,
  	"sa_never_note" varchar,
  	"ab_eyebrow" varchar,
  	"ab_heading" varchar,
  	"ab_name" varchar,
  	"ab_role" varchar,
  	"ab_location" varchar,
  	"ab_callout" varchar,
  	"ab_bio" jsonb,
  	"ab_experience_label" varchar,
  	"ab_field_label" varchar,
  	"ab_field_note" varchar,
  	"ab_cta_label" varchar,
  	"nw_eyebrow" varchar,
  	"nw_heading" varchar,
  	"nw_lead" varchar,
  	"nw_cta_label" varchar,
  	"cta_eyebrow" varchar,
  	"cta_heading" varchar,
  	"cta_sub" varchar,
  	"cta_primary" varchar,
  	"cta_secondary" varchar,
  	"cta_blurb" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_home_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_home_v_version_hero_systems_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_hero_systems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cat" varchar,
  	"name" varchar,
  	"blurb" varchar,
  	"metric_label" varchar,
  	"metric_val" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_hero_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_cs_items_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_cs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sector" varchar,
  	"name" varchar,
  	"desc" varchar,
  	"quote" varchar,
  	"author" varchar,
  	"affiliation" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_pt_customers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"mark" varchar,
  	"domain" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_pt_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"mono" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_pb_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_sv_services_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_sv_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"best_for" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_sv_industries_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_sv_industries_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_sv_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_sa_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"theme" varchar,
  	"old_title" varchar,
  	"old_desc" varchar,
  	"new_title" varchar,
  	"new_desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_sa_never_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_ab_certs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_ab_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_ab_conferences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_nw_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"date" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_nav_label" varchar,
  	"version_hero_title" varchar,
  	"version_hero_title_accent" varchar,
  	"version_hero_subhead" varchar,
  	"version_hero_sub" jsonb,
  	"version_hero_cta_primary" varchar,
  	"version_hero_cta_secondary" varchar,
  	"version_cs_eyebrow" varchar,
  	"version_cs_heading" varchar,
  	"version_cs_sub" varchar,
  	"version_cs_cta_label" varchar,
  	"version_pt_eyebrow" varchar,
  	"version_pt_heading" varchar,
  	"version_pt_sub" varchar,
  	"version_pt_partners_label" varchar,
  	"version_pt_partners_intro" varchar,
  	"version_pb_eyebrow" varchar,
  	"version_pb_heading" varchar,
  	"version_pb_lead" jsonb,
  	"version_pb_solve_label" varchar,
  	"version_sv_eyebrow" varchar,
  	"version_sv_services_heading" varchar,
  	"version_sv_services_lead" varchar,
  	"version_sv_services_cta" varchar,
  	"version_sv_industries_heading" varchar,
  	"version_sv_industries_lead" varchar,
  	"version_sv_industries_cta" varchar,
  	"version_sa_eyebrow" varchar,
  	"version_sa_heading" varchar,
  	"version_sa_lead" jsonb,
  	"version_sa_mandate_key" varchar,
  	"version_sa_mandate_tag" varchar,
  	"version_sa_col_old" varchar,
  	"version_sa_col_new" varchar,
  	"version_sa_never_label" varchar,
  	"version_sa_never_note" varchar,
  	"version_ab_eyebrow" varchar,
  	"version_ab_heading" varchar,
  	"version_ab_name" varchar,
  	"version_ab_role" varchar,
  	"version_ab_location" varchar,
  	"version_ab_callout" varchar,
  	"version_ab_bio" jsonb,
  	"version_ab_experience_label" varchar,
  	"version_ab_field_label" varchar,
  	"version_ab_field_note" varchar,
  	"version_ab_cta_label" varchar,
  	"version_nw_eyebrow" varchar,
  	"version_nw_heading" varchar,
  	"version_nw_lead" varchar,
  	"version_nw_cta_label" varchar,
  	"version_cta_eyebrow" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_sub" varchar,
  	"version_cta_primary" varchar,
  	"version_cta_secondary" varchar,
  	"version_cta_blurb" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "cons_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "cons_hero_lifecycle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "cons_caps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"code" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "cons_std_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "cons_feat_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "cons_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"kicker" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "cons_about_creds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "cons_opts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"best" varchar
  );
  
  CREATE TABLE "cons_ind_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"standards" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "cons_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar
  );
  
  CREATE TABLE "cons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"order" numeric,
  	"nav_label" varchar,
  	"hero_icon" varchar,
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar,
  	"hero_ghost" varchar,
  	"hero_tagline" varchar,
  	"hero_intro" jsonb,
  	"hero_cta_label" varchar,
  	"hero_cta_href" varchar,
  	"hero_scope_label" varchar,
  	"hero_scope_badge" varchar,
  	"hero_scope_foot" varchar,
  	"caps_eyebrow" varchar,
  	"caps_heading" varchar,
  	"caps_lead" varchar,
  	"std_eyebrow" varchar,
  	"std_heading" varchar,
  	"std_lead" varchar,
  	"feat_kind" "enum_cons_feat_kind" DEFAULT 'none',
  	"feat_eyebrow" varchar,
  	"feat_heading" varchar,
  	"feat_note" varchar,
  	"feat_tag" varchar,
  	"feat_headline" varchar,
  	"feat_body" varchar,
  	"feat_stat_value" varchar,
  	"feat_stat_label" varchar,
  	"facts_eyebrow" varchar,
  	"facts_heading" varchar,
  	"facts_lead" varchar,
  	"about_eyebrow" varchar,
  	"about_heading" varchar,
  	"about_body" jsonb,
  	"about_quote" varchar,
  	"about_creds_label" varchar,
  	"opts_eyebrow" varchar,
  	"opts_heading" varchar,
  	"opts_lead" varchar,
  	"ind_eyebrow" varchar,
  	"ind_heading" varchar,
  	"ind_lead" varchar,
  	"faq_eyebrow" varchar,
  	"faq_heading" varchar,
  	"cta_eyebrow" varchar,
  	"cta_heading" varchar,
  	"cta_sub" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_cons_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_cons_v_version_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_hero_lifecycle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_caps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"code" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_std_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_feat_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"kicker" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_about_creds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_opts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"best" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_ind_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"standards" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"q" varchar,
  	"a" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cons_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_nav_label" varchar,
  	"version_hero_icon" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_ghost" varchar,
  	"version_hero_tagline" varchar,
  	"version_hero_intro" jsonb,
  	"version_hero_cta_label" varchar,
  	"version_hero_cta_href" varchar,
  	"version_hero_scope_label" varchar,
  	"version_hero_scope_badge" varchar,
  	"version_hero_scope_foot" varchar,
  	"version_caps_eyebrow" varchar,
  	"version_caps_heading" varchar,
  	"version_caps_lead" varchar,
  	"version_std_eyebrow" varchar,
  	"version_std_heading" varchar,
  	"version_std_lead" varchar,
  	"version_feat_kind" "enum__cons_v_version_feat_kind" DEFAULT 'none',
  	"version_feat_eyebrow" varchar,
  	"version_feat_heading" varchar,
  	"version_feat_note" varchar,
  	"version_feat_tag" varchar,
  	"version_feat_headline" varchar,
  	"version_feat_body" varchar,
  	"version_feat_stat_value" varchar,
  	"version_feat_stat_label" varchar,
  	"version_facts_eyebrow" varchar,
  	"version_facts_heading" varchar,
  	"version_facts_lead" varchar,
  	"version_about_eyebrow" varchar,
  	"version_about_heading" varchar,
  	"version_about_body" jsonb,
  	"version_about_quote" varchar,
  	"version_about_creds_label" varchar,
  	"version_opts_eyebrow" varchar,
  	"version_opts_heading" varchar,
  	"version_opts_lead" varchar,
  	"version_ind_eyebrow" varchar,
  	"version_ind_heading" varchar,
  	"version_ind_lead" varchar,
  	"version_faq_eyebrow" varchar,
  	"version_faq_heading" varchar,
  	"version_cta_eyebrow" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_sub" varchar,
  	"version_cta_label" varchar,
  	"version_cta_href" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__cons_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "trn_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "trn_ways_items_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "trn_ways_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"cta" varchar
  );
  
  CREATE TABLE "trn_val_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "trn_trk_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"icon" varchar,
  	"standards" varchar,
  	"desc" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "trn_off_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"title" varchar,
  	"body" varchar,
  	"badge" varchar,
  	"meta" varchar
  );
  
  CREATE TABLE "trn_cat_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"name" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "trn_cta_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "trn" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"order" numeric,
  	"nav_label" varchar,
  	"hero_crumb" varchar,
  	"hero_ghost" varchar,
  	"hero_title" varchar,
  	"hero_lead" jsonb,
  	"hero_primary_cta" varchar,
  	"hero_secondary_cta" varchar,
  	"ways_eyebrow" varchar,
  	"ways_heading" varchar,
  	"ways_lead" varchar,
  	"val_eyebrow" varchar,
  	"val_heading" varchar,
  	"trk_eyebrow" varchar,
  	"trk_heading" varchar,
  	"trk_lead" varchar,
  	"instr_eyebrow" varchar,
  	"instr_heading" varchar,
  	"instr_portrait_tag" varchar,
  	"filt_eyebrow" varchar,
  	"filt_heading" varchar,
  	"filt_lead" varchar,
  	"filt_note" varchar,
  	"off_eyebrow" varchar,
  	"off_heading" varchar,
  	"cat_eyebrow" varchar,
  	"cat_heading" varchar,
  	"cta_eyebrow" varchar,
  	"cta_heading" varchar,
  	"cta_sub" varchar,
  	"cta_primary" varchar,
  	"cta_secondary" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_trn_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_trn_v_version_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trn_v_version_ways_items_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trn_v_version_ways_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"cta" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trn_v_version_val_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trn_v_version_trk_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"icon" varchar,
  	"standards" varchar,
  	"desc" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trn_v_version_off_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"title" varchar,
  	"body" varchar,
  	"badge" varchar,
  	"meta" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trn_v_version_cat_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"name" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trn_v_version_cta_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trn_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_nav_label" varchar,
  	"version_hero_crumb" varchar,
  	"version_hero_ghost" varchar,
  	"version_hero_title" varchar,
  	"version_hero_lead" jsonb,
  	"version_hero_primary_cta" varchar,
  	"version_hero_secondary_cta" varchar,
  	"version_ways_eyebrow" varchar,
  	"version_ways_heading" varchar,
  	"version_ways_lead" varchar,
  	"version_val_eyebrow" varchar,
  	"version_val_heading" varchar,
  	"version_trk_eyebrow" varchar,
  	"version_trk_heading" varchar,
  	"version_trk_lead" varchar,
  	"version_instr_eyebrow" varchar,
  	"version_instr_heading" varchar,
  	"version_instr_portrait_tag" varchar,
  	"version_filt_eyebrow" varchar,
  	"version_filt_heading" varchar,
  	"version_filt_lead" varchar,
  	"version_filt_note" varchar,
  	"version_off_eyebrow" varchar,
  	"version_off_heading" varchar,
  	"version_cat_eyebrow" varchar,
  	"version_cat_heading" varchar,
  	"version_cta_eyebrow" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_sub" varchar,
  	"version_cta_primary" varchar,
  	"version_cta_secondary" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__trn_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "comp_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "comp_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum_comp_hero_actions_style" DEFAULT 'gold'
  );
  
  CREATE TABLE "comp_hud_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "comp_val_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "comp_caps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"code" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "comp_case_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"problem" varchar,
  	"solution" varchar
  );
  
  CREATE TABLE "comp_svc_categories_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "comp_svc_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"best_for" varchar
  );
  
  CREATE TABLE "comp_eng_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"best_for" varchar
  );
  
  CREATE TABLE "comp_role_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dept" varchar,
  	"loc" varchar,
  	"type" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "comp_close_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum_comp_close_actions_style" DEFAULT 'gold'
  );
  
  CREATE TABLE "comp" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"order" numeric,
  	"nav_label" varchar,
  	"hero_ghost" varchar,
  	"hero_icon" varchar,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_tagline" varchar,
  	"hero_intro" varchar,
  	"hud_tag" varchar,
  	"hud_badge" varchar,
  	"hud_foot" varchar,
  	"mission_num" varchar,
  	"mission_eyebrow" varchar,
  	"mission_title" varchar,
  	"mission_body" jsonb,
  	"phil_num" varchar,
  	"phil_eyebrow" varchar,
  	"phil_title" varchar,
  	"phil_body" jsonb,
  	"phil_boundary_title" varchar,
  	"phil_boundary_body" jsonb,
  	"val_eyebrow" varchar,
  	"val_title" varchar,
  	"val_lead" varchar,
  	"iso_eyebrow" varchar,
  	"iso_body" jsonb,
  	"caps_eyebrow" varchar,
  	"caps_title" varchar,
  	"caps_lead" varchar,
  	"case_eyebrow" varchar,
  	"case_title" varchar,
  	"case_lead" varchar,
  	"case_note" varchar,
  	"svc_eyebrow" varchar,
  	"svc_title" varchar,
  	"svc_lead" varchar,
  	"eng_eyebrow" varchar,
  	"eng_title" varchar,
  	"eng_lead" varchar,
  	"role_eyebrow" varchar,
  	"role_title" varchar,
  	"role_lead" varchar,
  	"role_note" varchar,
  	"close_eyebrow" varchar,
  	"close_title" varchar,
  	"close_sub" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_comp_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_comp_v_version_hero_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum__comp_v_version_hero_actions_style" DEFAULT 'gold',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_hud_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_val_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_caps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"code" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_case_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"problem" varchar,
  	"solution" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_svc_categories_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_svc_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"best_for" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_eng_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"best_for" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_role_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"dept" varchar,
  	"loc" varchar,
  	"type" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v_version_close_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum__comp_v_version_close_actions_style" DEFAULT 'gold',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comp_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_nav_label" varchar,
  	"version_hero_ghost" varchar,
  	"version_hero_icon" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_tagline" varchar,
  	"version_hero_intro" varchar,
  	"version_hud_tag" varchar,
  	"version_hud_badge" varchar,
  	"version_hud_foot" varchar,
  	"version_mission_num" varchar,
  	"version_mission_eyebrow" varchar,
  	"version_mission_title" varchar,
  	"version_mission_body" jsonb,
  	"version_phil_num" varchar,
  	"version_phil_eyebrow" varchar,
  	"version_phil_title" varchar,
  	"version_phil_body" jsonb,
  	"version_phil_boundary_title" varchar,
  	"version_phil_boundary_body" jsonb,
  	"version_val_eyebrow" varchar,
  	"version_val_title" varchar,
  	"version_val_lead" varchar,
  	"version_iso_eyebrow" varchar,
  	"version_iso_body" jsonb,
  	"version_caps_eyebrow" varchar,
  	"version_caps_title" varchar,
  	"version_caps_lead" varchar,
  	"version_case_eyebrow" varchar,
  	"version_case_title" varchar,
  	"version_case_lead" varchar,
  	"version_case_note" varchar,
  	"version_svc_eyebrow" varchar,
  	"version_svc_title" varchar,
  	"version_svc_lead" varchar,
  	"version_eng_eyebrow" varchar,
  	"version_eng_title" varchar,
  	"version_eng_lead" varchar,
  	"version_role_eyebrow" varchar,
  	"version_role_title" varchar,
  	"version_role_lead" varchar,
  	"version_role_note" varchar,
  	"version_close_eyebrow" varchar,
  	"version_close_title" varchar,
  	"version_close_sub" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__comp_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "job_postings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"department" varchar,
  	"location" varchar,
  	"type" "enum_job_postings_type" DEFAULT 'full-time',
  	"summary" varchar,
  	"description" jsonb,
  	"apply_url" varchar,
  	"posted_at" timestamp(3) with time zone,
  	"active" boolean DEFAULT true,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_job_postings_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_job_postings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_department" varchar,
  	"version_location" varchar,
  	"version_type" "enum__job_postings_v_version_type" DEFAULT 'full-time',
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_apply_url" varchar,
  	"version_posted_at" timestamp(3) with time zone,
  	"version_active" boolean DEFAULT true,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__job_postings_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "team_members_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"role" varchar,
  	"location" varchar,
  	"photo_id" integer,
  	"bio" jsonb,
  	"order" numeric DEFAULT 0,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_team_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_team_members_v_version_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_team_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_role" varchar,
  	"version_location" varchar,
  	"version_photo_id" integer,
  	"version_bio" jsonb,
  	"version_order" numeric DEFAULT 0,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__team_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "res_hero_jump_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "res_tools_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "res_lib_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "res_fw_items_codes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "res_fw_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "res_how_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "res_list_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "res_list_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"cat" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"meta" varchar,
  	"meta_icon" varchar,
  	"cta_label" varchar,
  	"soon" boolean
  );
  
  CREATE TABLE "res_feat_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar
  );
  
  CREATE TABLE "res" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"order" numeric,
  	"nav_label" varchar,
  	"hero_eyebrow" varchar,
  	"hero_eyebrow_icon" varchar,
  	"hero_ghost" varchar,
  	"hero_headline" varchar,
  	"hero_sub" varchar,
  	"hero_sub2" varchar,
  	"hero_note" varchar,
  	"hero_cta_label" varchar,
  	"hero_cta_href" varchar,
  	"hero_secondary_label" varchar,
  	"tools_eyebrow" varchar,
  	"tools_heading" varchar,
  	"tools_lead" varchar,
  	"lib_eyebrow" varchar,
  	"lib_heading" varchar,
  	"lib_lead" varchar,
  	"tool_name" varchar,
  	"tool_sub" varchar,
  	"tool_badge" varchar,
  	"tool_cta_label" varchar,
  	"tool_note" varchar,
  	"tool_result_label" varchar,
  	"tool_result_veil" varchar,
  	"fw_eyebrow" varchar,
  	"fw_heading" varchar,
  	"fw_lead" varchar,
  	"how_eyebrow" varchar,
  	"how_heading" varchar,
  	"list_empty_title" varchar,
  	"list_empty_text" varchar,
  	"feat_eyebrow" varchar,
  	"feat_heading" varchar,
  	"feat_lead" varchar,
  	"close_eyebrow" varchar,
  	"close_heading" varchar,
  	"close_sub" varchar,
  	"close_cta_label" varchar,
  	"close_cta_href" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_res_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_res_v_version_hero_jump_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v_version_tools_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v_version_lib_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v_version_fw_items_codes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v_version_fw_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v_version_how_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v_version_list_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v_version_list_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"cat" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"meta" varchar,
  	"meta_icon" varchar,
  	"cta_label" varchar,
  	"soon" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v_version_feat_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"desc" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_res_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_nav_label" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_eyebrow_icon" varchar,
  	"version_hero_ghost" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_sub" varchar,
  	"version_hero_sub2" varchar,
  	"version_hero_note" varchar,
  	"version_hero_cta_label" varchar,
  	"version_hero_cta_href" varchar,
  	"version_hero_secondary_label" varchar,
  	"version_tools_eyebrow" varchar,
  	"version_tools_heading" varchar,
  	"version_tools_lead" varchar,
  	"version_lib_eyebrow" varchar,
  	"version_lib_heading" varchar,
  	"version_lib_lead" varchar,
  	"version_tool_name" varchar,
  	"version_tool_sub" varchar,
  	"version_tool_badge" varchar,
  	"version_tool_cta_label" varchar,
  	"version_tool_note" varchar,
  	"version_tool_result_label" varchar,
  	"version_tool_result_veil" varchar,
  	"version_fw_eyebrow" varchar,
  	"version_fw_heading" varchar,
  	"version_fw_lead" varchar,
  	"version_how_eyebrow" varchar,
  	"version_how_heading" varchar,
  	"version_list_empty_title" varchar,
  	"version_list_empty_text" varchar,
  	"version_feat_eyebrow" varchar,
  	"version_feat_heading" varchar,
  	"version_feat_lead" varchar,
  	"version_close_eyebrow" varchar,
  	"version_close_heading" varchar,
  	"version_close_sub" varchar,
  	"version_close_cta_label" varchar,
  	"version_close_cta_href" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__res_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "articles_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_articles_category",
  	"date" timestamp(3) with time zone,
  	"excerpt" varchar,
  	"hero_image_id" integer,
  	"hero_caption" varchar,
  	"body" jsonb,
  	"author_member_id" integer,
  	"author_name" varchar,
  	"reading_time" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  CREATE TABLE "_articles_v_version_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"topic" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__articles_v_version_category",
  	"version_date" timestamp(3) with time zone,
  	"version_excerpt" varchar,
  	"version_hero_image_id" integer,
  	"version_hero_caption" varchar,
  	"version_body" jsonb,
  	"version_author_member_id" integer,
  	"version_author_name" varchar,
  	"version_reading_time" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  CREATE TABLE "case_studies_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "case_studies_problem_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "case_studies_solution_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "case_studies_result_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "case_studies_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "case_studies_closing_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum_case_studies_closing_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"sector" varchar,
  	"hero_badge" varchar,
  	"client_client_name" varchar,
  	"client_role" varchar,
  	"client_logo_id" integer,
  	"hero_image_id" integer,
  	"lead" varchar,
  	"glance_industry" varchar,
  	"glance_engagement" varchar,
  	"glance_outcome" varchar,
  	"glance_outcome_sub" varchar,
  	"problem_body" jsonb,
  	"solution_body" jsonb,
  	"result_body" jsonb,
  	"body" jsonb,
  	"testimonial_ref_id" integer,
  	"closing_eyebrow" varchar,
  	"closing_title" varchar,
  	"closing_sub" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_studies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "case_studies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_case_studies_v_version_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_problem_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_solution_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_result_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_closing_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum__case_studies_v_version_closing_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_sector" varchar,
  	"version_hero_badge" varchar,
  	"version_client_client_name" varchar,
  	"version_client_role" varchar,
  	"version_client_logo_id" integer,
  	"version_hero_image_id" integer,
  	"version_lead" varchar,
  	"version_glance_industry" varchar,
  	"version_glance_engagement" varchar,
  	"version_glance_outcome" varchar,
  	"version_glance_outcome_sub" varchar,
  	"version_problem_body" jsonb,
  	"version_solution_body" jsonb,
  	"version_result_body" jsonb,
  	"version_body" jsonb,
  	"version_testimonial_ref_id" integer,
  	"version_closing_eyebrow" varchar,
  	"version_closing_title" varchar,
  	"version_closing_sub" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_case_studies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "p_logos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"url" varchar,
  	"role" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "t_logos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"url" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_company" varchar,
  	"rating" numeric,
  	"logo_id" integer,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_quote" varchar,
  	"version_author_name" varchar,
  	"version_author_role" varchar,
  	"version_author_company" varchar,
  	"version_rating" numeric,
  	"version_logo_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "products_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "products_whats_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"title" varchar,
  	"type" "enum_products_type" DEFAULT 'document',
  	"category" "enum_products_category",
  	"doc_type" "enum_products_doc_type",
  	"format" "enum_products_format",
  	"pages" numeric,
  	"price" numeric,
  	"price_note" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"icon" varchar,
  	"thumbnail_id" integer,
  	"badge" varchar,
  	"featured" boolean DEFAULT false,
  	"popular" boolean DEFAULT false,
  	"downloadable_file_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_products_v_version_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_whats_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_code" varchar,
  	"version_title" varchar,
  	"version_type" "enum__products_v_version_type" DEFAULT 'document',
  	"version_category" "enum__products_v_version_category",
  	"version_doc_type" "enum__products_v_version_doc_type",
  	"version_format" "enum__products_v_version_format",
  	"version_pages" numeric,
  	"version_price" numeric,
  	"version_price_note" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_icon" varchar,
  	"version_thumbnail_id" integer,
  	"version_badge" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_popular" boolean DEFAULT false,
  	"version_downloadable_file_id" integer,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "courses_track" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_courses_track",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_format" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_courses_format",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"outcome" varchar
  );
  
  CREATE TABLE "courses_modules_lessons_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "courses_modules_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"video_id" integer,
  	"body" jsonb
  );
  
  CREATE TABLE "courses_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"n" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "courses_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"title" varchar,
  	"credential" varchar DEFAULT 'Certificate of completion',
  	"level" "enum_courses_level",
  	"duration" varchar,
  	"lessons" numeric,
  	"price" numeric,
  	"price_note" varchar,
  	"summary" varchar,
  	"blurb" jsonb,
  	"instructor_id" integer,
  	"media_id" integer,
  	"badge" varchar,
  	"popular" boolean DEFAULT false,
  	"assessment_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_courses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_courses_v_version_track" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__courses_v_version_track",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_format" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__courses_v_version_format",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"outcome" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_modules_lessons_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_modules_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"video_id" integer,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"n" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_code" varchar,
  	"version_title" varchar,
  	"version_credential" varchar DEFAULT 'Certificate of completion',
  	"version_level" "enum__courses_v_version_level",
  	"version_duration" varchar,
  	"version_lessons" numeric,
  	"version_price" numeric,
  	"version_price_note" varchar,
  	"version_summary" varchar,
  	"version_blurb" jsonb,
  	"version_instructor_id" integer,
  	"version_media_id" integer,
  	"version_badge" varchar,
  	"version_popular" boolean DEFAULT false,
  	"version_assessment_id" integer,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "instructors_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "instructors_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "instructors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"location" varchar,
  	"avatar_id" integer,
  	"bio_short" varchar,
  	"bio" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_instructors_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_instructors_v_version_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instructors_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_instructors_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_location" varchar,
  	"version_avatar_id" integer,
  	"version_bio_short" varchar,
  	"version_bio" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__instructors_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "assessments_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "assessments_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prompt" varchar NOT NULL,
  	"answer_index" numeric,
  	"explanation" varchar,
  	"standard" varchar,
  	"topic" varchar
  );
  
  CREATE TABLE "assessments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"course_id" integer,
  	"title" varchar NOT NULL,
  	"pass_score" numeric DEFAULT 80,
  	"shuffle" boolean DEFAULT true,
  	"recommend_after" numeric DEFAULT 3,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "free_trainings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"duration" varchar,
  	"level" "enum_free_trainings_level",
  	"video_or_link" varchar,
  	"thumbnail_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_free_trainings_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_free_trainings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_duration" varchar,
  	"version_level" "enum__free_trainings_v_version_level",
  	"version_video_or_link" varchar,
  	"version_thumbnail_id" integer,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__free_trainings_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "downloads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"category" "enum_downloads_category",
  	"file_type" "enum_downloads_file_type" DEFAULT 'pdf',
  	"thumbnail_id" integer,
  	"file_id" integer,
  	"gated" boolean DEFAULT false,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_downloads_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_downloads_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_category" "enum__downloads_v_version_category",
  	"version_file_type" "enum__downloads_v_version_file_type" DEFAULT 'pdf',
  	"version_thumbnail_id" integer,
  	"version_file_id" integer,
  	"version_gated" boolean DEFAULT false,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__downloads_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"type" "enum_events_type",
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"location" varchar,
  	"description" jsonb,
  	"thumbnail_id" integer,
  	"register_url" varchar,
  	"recording_url" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_type" "enum__events_v_version_type",
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_description" jsonb,
  	"version_thumbnail_id" integer,
  	"version_register_url" varchar,
  	"version_recording_url" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"subtitle" varchar,
  	"last_updated" timestamp(3) with time zone,
  	"effective_date" timestamp(3) with time zone,
  	"version" varchar,
  	"body" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_subtitle" varchar,
  	"version_last_updated" timestamp(3) with time zone,
  	"version_effective_date" timestamp(3) with time zone,
  	"version_version" varchar,
  	"version_body" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "enrollments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"course_id" integer NOT NULL,
  	"enrolled_at" timestamp(3) with time zone,
  	"status" "enum_enrollments_status" DEFAULT 'active' NOT NULL,
  	"source" "enum_enrollments_source" DEFAULT 'purchase' NOT NULL,
  	"order_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "course_progress_completed_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lesson_id" varchar,
  	"module_index" numeric,
  	"lesson_index" numeric
  );
  
  CREATE TABLE "course_progress" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"course_id" integer NOT NULL,
  	"percent_complete" numeric DEFAULT 0,
  	"last_lesson_ref" varchar,
  	"resume_href" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "quiz_attempts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"assessment_id" integer NOT NULL,
  	"course_id" integer,
  	"attempt_no" numeric,
  	"started_at" timestamp(3) with time zone,
  	"submitted_at" timestamp(3) with time zone,
  	"score" numeric,
  	"passed" boolean DEFAULT false,
  	"answers" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "certificates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"course_id" integer NOT NULL,
  	"recipient_name" varchar,
  	"issued_at" timestamp(3) with time zone,
  	"certificate_id" varchar NOT NULL,
  	"pdf_id" integer,
  	"verified" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_slug" varchar,
  	"name" varchar,
  	"kind" varchar,
  	"qty" numeric DEFAULT 1,
  	"unit_amount" numeric
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"order_number" varchar NOT NULL,
  	"stripe_session_id" varchar,
  	"stripe_payment_intent_id" varchar,
  	"amount_total" numeric,
  	"currency" varchar DEFAULT 'usd',
  	"status" "enum_orders_status" DEFAULT 'pending' NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"receipt_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "entitlements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"product_id" integer NOT NULL,
  	"order_id" integer,
  	"granted_at" timestamp(3) with time zone,
  	"revoked_at" timestamp(3) with time zone,
  	"active" boolean DEFAULT true,
  	"storage_key" varchar,
  	"version" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "customer_profiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"full_name" varchar,
  	"email" varchar,
  	"company" varchar,
  	"job_title" varchar,
  	"country" varchar,
  	"phone" varchar,
  	"plan" varchar,
  	"email_verified" boolean DEFAULT false,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stripe_customers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"stripe_customer_id" varchar NOT NULL,
  	"default_payment_brand" varchar,
  	"default_payment_last4" varchar,
  	"default_payment_exp_month" numeric,
  	"default_payment_exp_year" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "processed_stripe_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" varchar NOT NULL,
  	"type" varchar,
  	"processed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_set_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_set_social_links_platform" DEFAULT 'linkedin' NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_set" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Critical Systems Analysis' NOT NULL,
  	"brand_short_name" varchar DEFAULT 'CSA',
  	"brand_tagline" varchar DEFAULT 'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',
  	"brand_logo_id" integer,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_address" varchar,
  	"announcement_bar_enabled" boolean DEFAULT false,
  	"announcement_bar_message" varchar,
  	"announcement_bar_link_label" varchar,
  	"announcement_bar_link_href" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_hdr_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"is_cta" boolean DEFAULT false
  );
  
  CREATE TABLE "nav_hdr_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "nav_hdr" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"utility_login_label" varchar DEFAULT 'Login',
  	"utility_login_href" varchar DEFAULT '/login',
  	"utility_cart_label" varchar DEFAULT 'Cart',
  	"utility_cart_href" varchar DEFAULT '/cart',
  	"cta_label" varchar DEFAULT 'Book a Consultation',
  	"cta_href" varchar DEFAULT '/book-a-consultation',
  	"cta_style" "enum_nav_hdr_cta_style" DEFAULT 'silver',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_ftr_closing_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"style" "enum_nav_ftr_closing_cta_ctas_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "nav_ftr_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "nav_ftr_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "nav_ftr_standards_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL
  );
  
  CREATE TABLE "nav_ftr_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "nav_ftr" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"closing_cta_eyebrow" varchar DEFAULT 'Ready when you are.',
  	"closing_cta_heading" varchar DEFAULT 'Build Safer. Scale Confidently.',
  	"closing_cta_subtext" varchar DEFAULT 'Integrate functional safety without slowing down development. Let’s talk about your next safety-critical system.',
  	"blurb" varchar DEFAULT 'Your trusted systems-safety partner for safety-critical systems and functional-safety compliance.',
  	"copyright" varchar DEFAULT '© 2026 Critical Systems Analysis. All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "dash_onboarding_courses_step_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "dash_onboarding_resources_step_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "dash" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"welcome_breadcrumb" varchar DEFAULT 'CSA Academy / Student Dashboard',
  	"welcome_eyebrow" varchar DEFAULT 'Welcome back',
  	"welcome_greeting_prefix" varchar DEFAULT 'Good to see you,',
  	"welcome_sub_with_courses" varchar DEFAULT 'Pick up where you left off, track your progress, and grab your certificates — all in one place.',
  	"welcome_sub_no_courses" varchar DEFAULT 'This is your learning home. Enroll in a course and your progress, lessons, and certificates will live here.',
  	"welcome_tour_label" varchar DEFAULT 'Take the product tour',
  	"welcome_stat_labels_in_progress" varchar DEFAULT 'Courses in progress',
  	"welcome_stat_labels_lessons_completed" varchar DEFAULT 'Lessons completed',
  	"welcome_stat_labels_certificates" varchar DEFAULT 'Certificates earned',
  	"sections_continue_learning_eyebrow" varchar DEFAULT 'Jump back in',
  	"sections_continue_learning_heading" varchar DEFAULT 'Continue learning.',
  	"sections_enrolled_eyebrow" varchar DEFAULT 'Your courses',
  	"sections_enrolled_heading" varchar DEFAULT 'Enrolled courses.',
  	"sections_completed_eyebrow" varchar DEFAULT 'Earned',
  	"sections_completed_heading" varchar DEFAULT 'Completed & certified.',
  	"sections_portal_links_eyebrow" varchar DEFAULT 'Account',
  	"sections_portal_links_heading" varchar DEFAULT 'Your Customer Portal.',
  	"empty_state_eyebrow" varchar DEFAULT 'Your learning starts here',
  	"empty_state_heading" varchar DEFAULT 'You’re not enrolled in any courses yet.',
  	"empty_state_body" varchar DEFAULT 'Browse the catalog to find practical, on-demand functional-safety training — grounded in the standards and hazards of your sector. Enroll once and your progress shows up right here.',
  	"onboarding_welcome_step_eyebrow" varchar DEFAULT 'Welcome to CSA Academy',
  	"onboarding_welcome_step_heading" varchar DEFAULT 'Functional safety training, built for working engineers.',
  	"onboarding_welcome_step_body" varchar DEFAULT 'You’re in. CSA Academy turns dense standards into practical, on-demand training you can apply on real hardware. This 60-second tour shows you how courses work, where to find resources, and how to set up your profile.',
  	"onboarding_courses_step_eyebrow" varchar DEFAULT 'How courses work',
  	"onboarding_courses_step_heading" varchar DEFAULT 'Learn, check, certify.',
  	"onboarding_courses_step_intro" varchar DEFAULT 'Every program follows the same simple loop — watch, confirm, and earn proof you can show an assessor.',
  	"onboarding_resources_step_eyebrow" varchar DEFAULT 'Resources & tools',
  	"onboarding_resources_step_heading" varchar DEFAULT 'Everything you need, close at hand.',
  	"onboarding_resources_step_intro" varchar DEFAULT 'Reference material, your template library, and an AI assistant are never more than a click away.',
  	"onboarding_profile_step_eyebrow" varchar DEFAULT 'Set up your profile',
  	"onboarding_profile_step_heading" varchar DEFAULT 'Tailor your learning.',
  	"onboarding_profile_step_intro" varchar DEFAULT 'Confirm your details and pick the tracks you care about — we’ll surface the most relevant courses first.',
  	"onboarding_complete_step_eyebrow" varchar DEFAULT 'You’re all set',
  	"onboarding_complete_step_heading" varchar DEFAULT 'Welcome aboard.',
  	"onboarding_complete_step_body" varchar DEFAULT 'Your learning home is ready. Jump back into a course, or browse the catalog to add another.',
  	"onboarding_skip_label" varchar DEFAULT 'Skip for now — explore the dashboard',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"_status" "enum_dash_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_dash_v_version_onboarding_courses_step_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dash_v_version_onboarding_resources_step_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dash_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_welcome_breadcrumb" varchar DEFAULT 'CSA Academy / Student Dashboard',
  	"version_welcome_eyebrow" varchar DEFAULT 'Welcome back',
  	"version_welcome_greeting_prefix" varchar DEFAULT 'Good to see you,',
  	"version_welcome_sub_with_courses" varchar DEFAULT 'Pick up where you left off, track your progress, and grab your certificates — all in one place.',
  	"version_welcome_sub_no_courses" varchar DEFAULT 'This is your learning home. Enroll in a course and your progress, lessons, and certificates will live here.',
  	"version_welcome_tour_label" varchar DEFAULT 'Take the product tour',
  	"version_welcome_stat_labels_in_progress" varchar DEFAULT 'Courses in progress',
  	"version_welcome_stat_labels_lessons_completed" varchar DEFAULT 'Lessons completed',
  	"version_welcome_stat_labels_certificates" varchar DEFAULT 'Certificates earned',
  	"version_sections_continue_learning_eyebrow" varchar DEFAULT 'Jump back in',
  	"version_sections_continue_learning_heading" varchar DEFAULT 'Continue learning.',
  	"version_sections_enrolled_eyebrow" varchar DEFAULT 'Your courses',
  	"version_sections_enrolled_heading" varchar DEFAULT 'Enrolled courses.',
  	"version_sections_completed_eyebrow" varchar DEFAULT 'Earned',
  	"version_sections_completed_heading" varchar DEFAULT 'Completed & certified.',
  	"version_sections_portal_links_eyebrow" varchar DEFAULT 'Account',
  	"version_sections_portal_links_heading" varchar DEFAULT 'Your Customer Portal.',
  	"version_empty_state_eyebrow" varchar DEFAULT 'Your learning starts here',
  	"version_empty_state_heading" varchar DEFAULT 'You’re not enrolled in any courses yet.',
  	"version_empty_state_body" varchar DEFAULT 'Browse the catalog to find practical, on-demand functional-safety training — grounded in the standards and hazards of your sector. Enroll once and your progress shows up right here.',
  	"version_onboarding_welcome_step_eyebrow" varchar DEFAULT 'Welcome to CSA Academy',
  	"version_onboarding_welcome_step_heading" varchar DEFAULT 'Functional safety training, built for working engineers.',
  	"version_onboarding_welcome_step_body" varchar DEFAULT 'You’re in. CSA Academy turns dense standards into practical, on-demand training you can apply on real hardware. This 60-second tour shows you how courses work, where to find resources, and how to set up your profile.',
  	"version_onboarding_courses_step_eyebrow" varchar DEFAULT 'How courses work',
  	"version_onboarding_courses_step_heading" varchar DEFAULT 'Learn, check, certify.',
  	"version_onboarding_courses_step_intro" varchar DEFAULT 'Every program follows the same simple loop — watch, confirm, and earn proof you can show an assessor.',
  	"version_onboarding_resources_step_eyebrow" varchar DEFAULT 'Resources & tools',
  	"version_onboarding_resources_step_heading" varchar DEFAULT 'Everything you need, close at hand.',
  	"version_onboarding_resources_step_intro" varchar DEFAULT 'Reference material, your template library, and an AI assistant are never more than a click away.',
  	"version_onboarding_profile_step_eyebrow" varchar DEFAULT 'Set up your profile',
  	"version_onboarding_profile_step_heading" varchar DEFAULT 'Tailor your learning.',
  	"version_onboarding_profile_step_intro" varchar DEFAULT 'Confirm your details and pick the tracks you care about — we’ll surface the most relevant courses first.',
  	"version_onboarding_complete_step_eyebrow" varchar DEFAULT 'You’re all set',
  	"version_onboarding_complete_step_heading" varchar DEFAULT 'Welcome aboard.',
  	"version_onboarding_complete_step_body" varchar DEFAULT 'Your learning home is ready. Jump back into a course, or browse the catalog to add another.',
  	"version_onboarding_skip_label" varchar DEFAULT 'Skip for now — explore the dashboard',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version__status" "enum__dash_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "portal_pg" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_eyebrow" varchar DEFAULT 'Your account',
  	"header_title" varchar DEFAULT 'Customer Portal.',
  	"header_subheading" varchar DEFAULT 'Manage your account and billing, download the templates you own, and review your order history — all in one place.',
  	"nav_labels_account" varchar DEFAULT 'Account Settings',
  	"nav_labels_billing" varchar DEFAULT 'Billing',
  	"nav_labels_templates" varchar DEFAULT 'Template Library',
  	"nav_labels_orders" varchar DEFAULT 'Order History',
  	"account_eyebrow" varchar DEFAULT 'Account',
  	"account_heading" varchar DEFAULT 'Account settings.',
  	"account_intro" varchar DEFAULT 'Manage your profile, sign-in email, and password. These details are stored against your account and sync everywhere you use CSA.',
  	"billing_eyebrow" varchar DEFAULT 'Billing',
  	"billing_heading" varchar DEFAULT 'Billing & payments.',
  	"billing_intro" varchar DEFAULT 'Your saved payment method, billing details, and every invoice and receipt. Card data is held by Stripe — CSA never stores raw card numbers.',
  	"billing_no_payment_method" varchar DEFAULT 'No payment method on file. Add a card to check out faster. We use Stripe for secure, PCI-compliant payments — your card details never touch CSA servers.',
  	"billing_no_invoices" varchar DEFAULT 'No invoices yet. When you purchase a template, bundle, or course, the paid invoice and receipt will appear here as downloadable PDFs.',
  	"templates_eyebrow" varchar DEFAULT 'Library',
  	"templates_heading" varchar DEFAULT 'Purchased templates.',
  	"templates_intro" varchar DEFAULT 'Every documentation template you own, ready to download anytime. Files are served from secure storage and you always get the latest revision you’re entitled to.',
  	"templates_empty_state" varchar DEFAULT 'Your library is empty. Templates and bundles you purchase appear here as downloadable Word and Excel files — with version and format details, re-downloadable whenever you need them.',
  	"orders_eyebrow" varchar DEFAULT 'Orders',
  	"orders_heading" varchar DEFAULT 'Order history.',
  	"orders_intro" varchar DEFAULT 'A record of every purchase on your account — templates, bundles, and courses — with totals, status, and downloadable receipts.',
  	"orders_empty_state" varchar DEFAULT 'No orders yet. Once you make your first purchase, it’ll show up here with the date, order number, items, total, and a receipt you can download.',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"_status" "enum_portal_pg_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_portal_pg_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_eyebrow" varchar DEFAULT 'Your account',
  	"version_header_title" varchar DEFAULT 'Customer Portal.',
  	"version_header_subheading" varchar DEFAULT 'Manage your account and billing, download the templates you own, and review your order history — all in one place.',
  	"version_nav_labels_account" varchar DEFAULT 'Account Settings',
  	"version_nav_labels_billing" varchar DEFAULT 'Billing',
  	"version_nav_labels_templates" varchar DEFAULT 'Template Library',
  	"version_nav_labels_orders" varchar DEFAULT 'Order History',
  	"version_account_eyebrow" varchar DEFAULT 'Account',
  	"version_account_heading" varchar DEFAULT 'Account settings.',
  	"version_account_intro" varchar DEFAULT 'Manage your profile, sign-in email, and password. These details are stored against your account and sync everywhere you use CSA.',
  	"version_billing_eyebrow" varchar DEFAULT 'Billing',
  	"version_billing_heading" varchar DEFAULT 'Billing & payments.',
  	"version_billing_intro" varchar DEFAULT 'Your saved payment method, billing details, and every invoice and receipt. Card data is held by Stripe — CSA never stores raw card numbers.',
  	"version_billing_no_payment_method" varchar DEFAULT 'No payment method on file. Add a card to check out faster. We use Stripe for secure, PCI-compliant payments — your card details never touch CSA servers.',
  	"version_billing_no_invoices" varchar DEFAULT 'No invoices yet. When you purchase a template, bundle, or course, the paid invoice and receipt will appear here as downloadable PDFs.',
  	"version_templates_eyebrow" varchar DEFAULT 'Library',
  	"version_templates_heading" varchar DEFAULT 'Purchased templates.',
  	"version_templates_intro" varchar DEFAULT 'Every documentation template you own, ready to download anytime. Files are served from secure storage and you always get the latest revision you’re entitled to.',
  	"version_templates_empty_state" varchar DEFAULT 'Your library is empty. Templates and bundles you purchase appear here as downloadable Word and Excel files — with version and format details, re-downloadable whenever you need them.',
  	"version_orders_eyebrow" varchar DEFAULT 'Orders',
  	"version_orders_heading" varchar DEFAULT 'Order history.',
  	"version_orders_intro" varchar DEFAULT 'A record of every purchase on your account — templates, bundles, and courses — with totals, status, and downloadable receipts.',
  	"version_orders_empty_state" varchar DEFAULT 'No orders yet. Once you make your first purchase, it’ll show up here with the date, order number, items, total, and a receipt you can download.',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version__status" "enum__portal_pg_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "cart_pg_empty_cart_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum_cart_pg_empty_cart_ctas_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "cart_pg" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_eyebrow" varchar DEFAULT 'Your order',
  	"header_title" varchar DEFAULT 'Your cart.',
  	"header_subheading" varchar DEFAULT 'Review the templates and courses in your cart, then continue to secure checkout.',
  	"empty_cart_heading" varchar DEFAULT 'Your cart is empty.',
  	"empty_cart_body" varchar DEFAULT 'Browse functional-safety templates and on-demand courses to get started — everything you add shows up here, ready for one secure checkout.',
  	"summary_heading" varchar DEFAULT 'Order summary',
  	"summary_subtotal_label" varchar DEFAULT 'Subtotal',
  	"summary_tax_label" varchar DEFAULT 'Tax',
  	"summary_tax_note" varchar DEFAULT 'Calculated at checkout',
  	"summary_total_label" varchar DEFAULT 'Total',
  	"summary_checkout_button_label" varchar DEFAULT 'Proceed to Checkout',
  	"summary_continue_shopping_label" varchar DEFAULT 'Continue shopping',
  	"trust_secure_line" varchar DEFAULT 'Secure checkout powered by Stripe — your card details never touch CSA servers.',
  	"trust_delivery_line" varchar DEFAULT 'Instant digital delivery. 14-day refund policy.',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"_status" "enum_cart_pg_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_cart_pg_v_version_empty_cart_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum__cart_pg_v_version_empty_cart_ctas_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cart_pg_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_eyebrow" varchar DEFAULT 'Your order',
  	"version_header_title" varchar DEFAULT 'Your cart.',
  	"version_header_subheading" varchar DEFAULT 'Review the templates and courses in your cart, then continue to secure checkout.',
  	"version_empty_cart_heading" varchar DEFAULT 'Your cart is empty.',
  	"version_empty_cart_body" varchar DEFAULT 'Browse functional-safety templates and on-demand courses to get started — everything you add shows up here, ready for one secure checkout.',
  	"version_summary_heading" varchar DEFAULT 'Order summary',
  	"version_summary_subtotal_label" varchar DEFAULT 'Subtotal',
  	"version_summary_tax_label" varchar DEFAULT 'Tax',
  	"version_summary_tax_note" varchar DEFAULT 'Calculated at checkout',
  	"version_summary_total_label" varchar DEFAULT 'Total',
  	"version_summary_checkout_button_label" varchar DEFAULT 'Proceed to Checkout',
  	"version_summary_continue_shopping_label" varchar DEFAULT 'Continue shopping',
  	"version_trust_secure_line" varchar DEFAULT 'Secure checkout powered by Stripe — your card details never touch CSA servers.',
  	"version_trust_delivery_line" varchar DEFAULT 'Instant digital delivery. 14-day refund policy.',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version__status" "enum__cart_pg_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "checkout" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_eyebrow" varchar DEFAULT 'Secure checkout',
  	"header_title" varchar DEFAULT 'Checkout.',
  	"header_subheading" varchar DEFAULT 'A few details and you’re done. Your templates and courses are delivered instantly after payment.',
  	"account_choice_heading" varchar DEFAULT 'How would you like to check out?',
  	"account_choice_guest_label" varchar DEFAULT 'Check out as a guest',
  	"account_choice_guest_body" varchar DEFAULT 'Buy with just your email. We’ll send your receipt and download links there — no account required.',
  	"account_choice_create_account_label" varchar DEFAULT 'Create an account',
  	"account_choice_create_account_body" varchar DEFAULT 'Set a password to keep every template you own in one re-downloadable library, with your order history and billing in your Customer Portal.',
  	"account_choice_sign_in_prompt" varchar DEFAULT 'Already have an account? Sign in for faster checkout.',
  	"contact_heading" varchar DEFAULT 'Contact',
  	"contact_email_note" varchar DEFAULT 'Your receipt and download links are sent here.',
  	"billing_heading" varchar DEFAULT 'Billing details',
  	"billing_intro" varchar DEFAULT 'Appears on your invoice. Card data is handled securely by Stripe.',
  	"billing_field_labels_full_name" varchar DEFAULT 'Full name',
  	"billing_field_labels_company" varchar DEFAULT 'Company (optional)',
  	"billing_field_labels_country" varchar DEFAULT 'Country',
  	"billing_field_labels_address_line1" varchar DEFAULT 'Address',
  	"billing_field_labels_address_line2" varchar DEFAULT 'Apartment, suite, etc. (optional)',
  	"billing_field_labels_city" varchar DEFAULT 'City',
  	"billing_field_labels_state" varchar DEFAULT 'State / Province',
  	"billing_field_labels_postal_code" varchar DEFAULT 'Postal code',
  	"billing_field_labels_tax_id" varchar DEFAULT 'Tax ID / VAT (optional)',
  	"payment_heading" varchar DEFAULT 'Payment',
  	"payment_place_order_label" varchar DEFAULT 'Place order',
  	"payment_processing_label" varchar DEFAULT 'Processing…',
  	"payment_trust_line" varchar DEFAULT 'Payments are processed securely by Stripe. CSA never sees or stores your card details.',
  	"payment_terms_line" varchar DEFAULT 'By placing your order you agree to CSA’s Terms of Service and Privacy Policy. Digital goods are delivered instantly and covered by our 14-day refund policy.',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"_status" "enum_checkout_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_checkout_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_eyebrow" varchar DEFAULT 'Secure checkout',
  	"version_header_title" varchar DEFAULT 'Checkout.',
  	"version_header_subheading" varchar DEFAULT 'A few details and you’re done. Your templates and courses are delivered instantly after payment.',
  	"version_account_choice_heading" varchar DEFAULT 'How would you like to check out?',
  	"version_account_choice_guest_label" varchar DEFAULT 'Check out as a guest',
  	"version_account_choice_guest_body" varchar DEFAULT 'Buy with just your email. We’ll send your receipt and download links there — no account required.',
  	"version_account_choice_create_account_label" varchar DEFAULT 'Create an account',
  	"version_account_choice_create_account_body" varchar DEFAULT 'Set a password to keep every template you own in one re-downloadable library, with your order history and billing in your Customer Portal.',
  	"version_account_choice_sign_in_prompt" varchar DEFAULT 'Already have an account? Sign in for faster checkout.',
  	"version_contact_heading" varchar DEFAULT 'Contact',
  	"version_contact_email_note" varchar DEFAULT 'Your receipt and download links are sent here.',
  	"version_billing_heading" varchar DEFAULT 'Billing details',
  	"version_billing_intro" varchar DEFAULT 'Appears on your invoice. Card data is handled securely by Stripe.',
  	"version_billing_field_labels_full_name" varchar DEFAULT 'Full name',
  	"version_billing_field_labels_company" varchar DEFAULT 'Company (optional)',
  	"version_billing_field_labels_country" varchar DEFAULT 'Country',
  	"version_billing_field_labels_address_line1" varchar DEFAULT 'Address',
  	"version_billing_field_labels_address_line2" varchar DEFAULT 'Apartment, suite, etc. (optional)',
  	"version_billing_field_labels_city" varchar DEFAULT 'City',
  	"version_billing_field_labels_state" varchar DEFAULT 'State / Province',
  	"version_billing_field_labels_postal_code" varchar DEFAULT 'Postal code',
  	"version_billing_field_labels_tax_id" varchar DEFAULT 'Tax ID / VAT (optional)',
  	"version_payment_heading" varchar DEFAULT 'Payment',
  	"version_payment_place_order_label" varchar DEFAULT 'Place order',
  	"version_payment_processing_label" varchar DEFAULT 'Processing…',
  	"version_payment_trust_line" varchar DEFAULT 'Payments are processed securely by Stripe. CSA never sees or stores your card details.',
  	"version_payment_terms_line" varchar DEFAULT 'By placing your order you agree to CSA’s Terms of Service and Privacy Policy. Digital goods are delivered instantly and covered by our 14-day refund policy.',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version__status" "enum__checkout_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "thanks_confirmed_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum_thanks_confirmed_ctas_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "thanks_next_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "thanks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pending_eyebrow" varchar DEFAULT 'Almost there',
  	"pending_heading" varchar DEFAULT 'Confirming your payment…',
  	"pending_body" varchar DEFAULT 'Hang tight — we’re confirming your payment and preparing your downloads. This usually takes just a few seconds and the page will update automatically.',
  	"confirmed_eyebrow" varchar DEFAULT 'Order confirmed',
  	"confirmed_heading" varchar DEFAULT 'Thank you for your order!',
  	"confirmed_body" varchar DEFAULT 'Your purchase is complete. A receipt and your download links are on their way to your email, and everything you bought is ready to access right now.',
  	"confirmed_order_number_label" varchar DEFAULT 'Order number',
  	"confirmed_download_library_label" varchar DEFAULT 'Go to your download library',
  	"next_steps_heading" varchar DEFAULT 'What happens next',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"_status" "enum_thanks_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_thanks_v_version_confirmed_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum__thanks_v_version_confirmed_ctas_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_thanks_v_version_next_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_thanks_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_pending_eyebrow" varchar DEFAULT 'Almost there',
  	"version_pending_heading" varchar DEFAULT 'Confirming your payment…',
  	"version_pending_body" varchar DEFAULT 'Hang tight — we’re confirming your payment and preparing your downloads. This usually takes just a few seconds and the page will update automatically.',
  	"version_confirmed_eyebrow" varchar DEFAULT 'Order confirmed',
  	"version_confirmed_heading" varchar DEFAULT 'Thank you for your order!',
  	"version_confirmed_body" varchar DEFAULT 'Your purchase is complete. A receipt and your download links are on their way to your email, and everything you bought is ready to access right now.',
  	"version_confirmed_order_number_label" varchar DEFAULT 'Order number',
  	"version_confirmed_download_library_label" varchar DEFAULT 'Go to your download library',
  	"version_next_steps_heading" varchar DEFAULT 'What happens next',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version__status" "enum__thanks_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "auth_pg_shared_trust_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "auth_pg" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"shared_google_sso_label_login" varchar DEFAULT 'Continue with Google',
  	"shared_google_sso_label_signup" varchar DEFAULT 'Sign up with Google',
  	"shared_or_divider" varchar DEFAULT 'or',
  	"login_eyebrow" varchar DEFAULT 'Welcome back',
  	"login_heading" varchar DEFAULT 'Log in to CSA',
  	"login_sub" varchar DEFAULT 'Access your dashboard, on-demand training, and purchased templates.',
  	"login_submit_label" varchar DEFAULT 'Log In',
  	"login_forgot_link_label" varchar DEFAULT 'Forgot password?',
  	"login_remember_label" varchar DEFAULT 'Remember me',
  	"login_signup_prompt" varchar DEFAULT 'New to CSA? Create an account',
  	"login_success_heading" varchar DEFAULT 'You’re signed in',
  	"signup_eyebrow" varchar DEFAULT 'Create your account',
  	"signup_heading" varchar DEFAULT 'Join CSA',
  	"signup_sub" varchar DEFAULT 'One account for functional-safety training, templates, and your customer portal.',
  	"signup_submit_label" varchar DEFAULT 'Create Account',
  	"signup_terms_consent_label" varchar DEFAULT 'I agree to the Terms & Privacy Policy',
  	"signup_legal_copy" varchar DEFAULT 'By creating an account you agree to CSA’s Terms of Service and Privacy Policy.',
  	"signup_login_prompt" varchar DEFAULT 'Already have an account? Log in',
  	"signup_success_heading" varchar DEFAULT 'Account created',
  	"signup_success_body" varchar DEFAULT 'We sent a verification link to your inbox. Confirm your email to unlock training and template downloads.',
  	"forgot_password_eyebrow" varchar DEFAULT 'Account recovery',
  	"forgot_password_heading" varchar DEFAULT 'Forgot your password?',
  	"forgot_password_sub" varchar DEFAULT 'Enter the email tied to your account and we''ll send a secure reset link.',
  	"forgot_password_submit_label" varchar DEFAULT 'Send Reset Link',
  	"forgot_password_success_heading" varchar DEFAULT 'Check your email',
  	"forgot_password_success_body" varchar DEFAULT 'If an account exists for that address, a secure password-reset link is on its way. The link expires in 30 minutes.',
  	"forgot_password_back_to_login_label" varchar DEFAULT '← Back to log in',
  	"reset_password_eyebrow" varchar DEFAULT 'Set a new password',
  	"reset_password_heading" varchar DEFAULT 'Reset password',
  	"reset_password_sub" varchar DEFAULT 'Choose a strong new password for your account.',
  	"reset_password_submit_label" varchar DEFAULT 'Update Password',
  	"reset_password_strength_hint" varchar DEFAULT '8+ chars, mixed case, a number',
  	"reset_password_success_heading" varchar DEFAULT 'Password updated',
  	"reset_password_success_body" varchar DEFAULT 'Your password has been changed. For your security, all other sessions have been signed out.',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"_status" "enum_auth_pg_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_auth_pg_v_version_shared_trust_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_auth_pg_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_shared_google_sso_label_login" varchar DEFAULT 'Continue with Google',
  	"version_shared_google_sso_label_signup" varchar DEFAULT 'Sign up with Google',
  	"version_shared_or_divider" varchar DEFAULT 'or',
  	"version_login_eyebrow" varchar DEFAULT 'Welcome back',
  	"version_login_heading" varchar DEFAULT 'Log in to CSA',
  	"version_login_sub" varchar DEFAULT 'Access your dashboard, on-demand training, and purchased templates.',
  	"version_login_submit_label" varchar DEFAULT 'Log In',
  	"version_login_forgot_link_label" varchar DEFAULT 'Forgot password?',
  	"version_login_remember_label" varchar DEFAULT 'Remember me',
  	"version_login_signup_prompt" varchar DEFAULT 'New to CSA? Create an account',
  	"version_login_success_heading" varchar DEFAULT 'You’re signed in',
  	"version_signup_eyebrow" varchar DEFAULT 'Create your account',
  	"version_signup_heading" varchar DEFAULT 'Join CSA',
  	"version_signup_sub" varchar DEFAULT 'One account for functional-safety training, templates, and your customer portal.',
  	"version_signup_submit_label" varchar DEFAULT 'Create Account',
  	"version_signup_terms_consent_label" varchar DEFAULT 'I agree to the Terms & Privacy Policy',
  	"version_signup_legal_copy" varchar DEFAULT 'By creating an account you agree to CSA’s Terms of Service and Privacy Policy.',
  	"version_signup_login_prompt" varchar DEFAULT 'Already have an account? Log in',
  	"version_signup_success_heading" varchar DEFAULT 'Account created',
  	"version_signup_success_body" varchar DEFAULT 'We sent a verification link to your inbox. Confirm your email to unlock training and template downloads.',
  	"version_forgot_password_eyebrow" varchar DEFAULT 'Account recovery',
  	"version_forgot_password_heading" varchar DEFAULT 'Forgot your password?',
  	"version_forgot_password_sub" varchar DEFAULT 'Enter the email tied to your account and we''ll send a secure reset link.',
  	"version_forgot_password_submit_label" varchar DEFAULT 'Send Reset Link',
  	"version_forgot_password_success_heading" varchar DEFAULT 'Check your email',
  	"version_forgot_password_success_body" varchar DEFAULT 'If an account exists for that address, a secure password-reset link is on its way. The link expires in 30 minutes.',
  	"version_forgot_password_back_to_login_label" varchar DEFAULT '← Back to log in',
  	"version_reset_password_eyebrow" varchar DEFAULT 'Set a new password',
  	"version_reset_password_heading" varchar DEFAULT 'Reset password',
  	"version_reset_password_sub" varchar DEFAULT 'Choose a strong new password for your account.',
  	"version_reset_password_submit_label" varchar DEFAULT 'Update Password',
  	"version_reset_password_strength_hint" varchar DEFAULT '8+ chars, mixed case, a number',
  	"version_reset_password_success_heading" varchar DEFAULT 'Password updated',
  	"version_reset_password_success_body" varchar DEFAULT 'Your password has been changed. For your security, all other sessions have been signed out.',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version__status" "enum__auth_pg_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "home_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cons_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "trn_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comp_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "job_postings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "res_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "articles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "case_studies_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "p_logos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "t_logos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "instructors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "assessments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "free_trainings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "downloads_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "legal_pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "enrollments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "course_progress_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "quiz_attempts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "certificates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "orders_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "entitlements_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "customer_profiles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "stripe_customers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "processed_stripe_events_id" integer;
  ALTER TABLE "home_hero_systems_standards" ADD CONSTRAINT "home_hero_systems_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_hero_systems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_systems" ADD CONSTRAINT "home_hero_systems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_ticker" ADD CONSTRAINT "home_hero_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_cs_items_standards" ADD CONSTRAINT "home_cs_items_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_cs_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_cs_items" ADD CONSTRAINT "home_cs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pt_customers" ADD CONSTRAINT "home_pt_customers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pt_partners" ADD CONSTRAINT "home_pt_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pb_solutions" ADD CONSTRAINT "home_pb_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_sv_services_points" ADD CONSTRAINT "home_sv_services_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_sv_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_sv_services" ADD CONSTRAINT "home_sv_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_sv_industries_points" ADD CONSTRAINT "home_sv_industries_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_sv_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_sv_industries_standards" ADD CONSTRAINT "home_sv_industries_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_sv_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_sv_industries" ADD CONSTRAINT "home_sv_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_sa_rows" ADD CONSTRAINT "home_sa_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_sa_never_items" ADD CONSTRAINT "home_sa_never_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_ab_certs" ADD CONSTRAINT "home_ab_certs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_ab_experience" ADD CONSTRAINT "home_ab_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_ab_conferences" ADD CONSTRAINT "home_ab_conferences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_nw_articles" ADD CONSTRAINT "home_nw_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_systems_standards" ADD CONSTRAINT "_home_v_version_hero_systems_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_hero_systems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_systems" ADD CONSTRAINT "_home_v_version_hero_systems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_ticker" ADD CONSTRAINT "_home_v_version_hero_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_cs_items_standards" ADD CONSTRAINT "_home_v_version_cs_items_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_cs_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_cs_items" ADD CONSTRAINT "_home_v_version_cs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_pt_customers" ADD CONSTRAINT "_home_v_version_pt_customers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_pt_partners" ADD CONSTRAINT "_home_v_version_pt_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_pb_solutions" ADD CONSTRAINT "_home_v_version_pb_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_sv_services_points" ADD CONSTRAINT "_home_v_version_sv_services_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_sv_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_sv_services" ADD CONSTRAINT "_home_v_version_sv_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_sv_industries_points" ADD CONSTRAINT "_home_v_version_sv_industries_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_sv_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_sv_industries_standards" ADD CONSTRAINT "_home_v_version_sv_industries_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_sv_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_sv_industries" ADD CONSTRAINT "_home_v_version_sv_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_sa_rows" ADD CONSTRAINT "_home_v_version_sa_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_sa_never_items" ADD CONSTRAINT "_home_v_version_sa_never_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_ab_certs" ADD CONSTRAINT "_home_v_version_ab_certs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_ab_experience" ADD CONSTRAINT "_home_v_version_ab_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_ab_conferences" ADD CONSTRAINT "_home_v_version_ab_conferences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_nw_articles" ADD CONSTRAINT "_home_v_version_nw_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_parent_id_home_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cons_hero_standards" ADD CONSTRAINT "cons_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_hero_lifecycle" ADD CONSTRAINT "cons_hero_lifecycle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_caps_items" ADD CONSTRAINT "cons_caps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_std_items" ADD CONSTRAINT "cons_std_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_feat_items" ADD CONSTRAINT "cons_feat_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_facts_items" ADD CONSTRAINT "cons_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_about_creds" ADD CONSTRAINT "cons_about_creds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_opts_items" ADD CONSTRAINT "cons_opts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_ind_items" ADD CONSTRAINT "cons_ind_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons_faq_items" ADD CONSTRAINT "cons_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cons" ADD CONSTRAINT "cons_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cons_v_version_hero_standards" ADD CONSTRAINT "_cons_v_version_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_hero_lifecycle" ADD CONSTRAINT "_cons_v_version_hero_lifecycle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_caps_items" ADD CONSTRAINT "_cons_v_version_caps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_std_items" ADD CONSTRAINT "_cons_v_version_std_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_feat_items" ADD CONSTRAINT "_cons_v_version_feat_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_facts_items" ADD CONSTRAINT "_cons_v_version_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_about_creds" ADD CONSTRAINT "_cons_v_version_about_creds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_opts_items" ADD CONSTRAINT "_cons_v_version_opts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_ind_items" ADD CONSTRAINT "_cons_v_version_ind_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v_version_faq_items" ADD CONSTRAINT "_cons_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cons_v" ADD CONSTRAINT "_cons_v_parent_id_cons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cons_v" ADD CONSTRAINT "_cons_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trn_hero_standards" ADD CONSTRAINT "trn_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trn"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trn_ways_items_meta" ADD CONSTRAINT "trn_ways_items_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trn_ways_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trn_ways_items" ADD CONSTRAINT "trn_ways_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trn"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trn_val_items" ADD CONSTRAINT "trn_val_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trn"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trn_trk_items" ADD CONSTRAINT "trn_trk_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trn"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trn_off_items" ADD CONSTRAINT "trn_off_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trn"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trn_cat_items" ADD CONSTRAINT "trn_cat_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trn"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trn_cta_stats" ADD CONSTRAINT "trn_cta_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trn"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trn" ADD CONSTRAINT "trn_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_trn_v_version_hero_standards" ADD CONSTRAINT "_trn_v_version_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trn_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trn_v_version_ways_items_meta" ADD CONSTRAINT "_trn_v_version_ways_items_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trn_v_version_ways_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trn_v_version_ways_items" ADD CONSTRAINT "_trn_v_version_ways_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trn_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trn_v_version_val_items" ADD CONSTRAINT "_trn_v_version_val_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trn_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trn_v_version_trk_items" ADD CONSTRAINT "_trn_v_version_trk_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trn_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trn_v_version_off_items" ADD CONSTRAINT "_trn_v_version_off_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trn_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trn_v_version_cat_items" ADD CONSTRAINT "_trn_v_version_cat_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trn_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trn_v_version_cta_stats" ADD CONSTRAINT "_trn_v_version_cta_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trn_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trn_v" ADD CONSTRAINT "_trn_v_parent_id_trn_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trn"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_trn_v" ADD CONSTRAINT "_trn_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comp_hero_standards" ADD CONSTRAINT "comp_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_hero_actions" ADD CONSTRAINT "comp_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_hud_rows" ADD CONSTRAINT "comp_hud_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_val_items" ADD CONSTRAINT "comp_val_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_caps_items" ADD CONSTRAINT "comp_caps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_case_items" ADD CONSTRAINT "comp_case_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_svc_categories_points" ADD CONSTRAINT "comp_svc_categories_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp_svc_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_svc_categories" ADD CONSTRAINT "comp_svc_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_eng_models" ADD CONSTRAINT "comp_eng_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_role_items" ADD CONSTRAINT "comp_role_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp_close_actions" ADD CONSTRAINT "comp_close_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comp" ADD CONSTRAINT "comp_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_comp_v_version_hero_standards" ADD CONSTRAINT "_comp_v_version_hero_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_hero_actions" ADD CONSTRAINT "_comp_v_version_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_hud_rows" ADD CONSTRAINT "_comp_v_version_hud_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_val_items" ADD CONSTRAINT "_comp_v_version_val_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_caps_items" ADD CONSTRAINT "_comp_v_version_caps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_case_items" ADD CONSTRAINT "_comp_v_version_case_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_svc_categories_points" ADD CONSTRAINT "_comp_v_version_svc_categories_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v_version_svc_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_svc_categories" ADD CONSTRAINT "_comp_v_version_svc_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_eng_models" ADD CONSTRAINT "_comp_v_version_eng_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_role_items" ADD CONSTRAINT "_comp_v_version_role_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v_version_close_actions" ADD CONSTRAINT "_comp_v_version_close_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comp_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comp_v" ADD CONSTRAINT "_comp_v_parent_id_comp_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."comp"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_comp_v" ADD CONSTRAINT "_comp_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_job_postings_v" ADD CONSTRAINT "_job_postings_v_parent_id_job_postings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."job_postings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_job_postings_v" ADD CONSTRAINT "_job_postings_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_credentials" ADD CONSTRAINT "team_members_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v_version_credentials" ADD CONSTRAINT "_team_members_v_version_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_members_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_parent_id_team_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "res_hero_jump_links" ADD CONSTRAINT "res_hero_jump_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res_tools_items" ADD CONSTRAINT "res_tools_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res_lib_items" ADD CONSTRAINT "res_lib_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res_fw_items_codes" ADD CONSTRAINT "res_fw_items_codes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res_fw_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res_fw_items" ADD CONSTRAINT "res_fw_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res_how_steps" ADD CONSTRAINT "res_how_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res_list_filters" ADD CONSTRAINT "res_list_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res_list_cards" ADD CONSTRAINT "res_list_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res_feat_items" ADD CONSTRAINT "res_feat_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "res" ADD CONSTRAINT "res_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_res_v_version_hero_jump_links" ADD CONSTRAINT "_res_v_version_hero_jump_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v_version_tools_items" ADD CONSTRAINT "_res_v_version_tools_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v_version_lib_items" ADD CONSTRAINT "_res_v_version_lib_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v_version_fw_items_codes" ADD CONSTRAINT "_res_v_version_fw_items_codes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v_version_fw_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v_version_fw_items" ADD CONSTRAINT "_res_v_version_fw_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v_version_how_steps" ADD CONSTRAINT "_res_v_version_how_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v_version_list_filters" ADD CONSTRAINT "_res_v_version_list_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v_version_list_cards" ADD CONSTRAINT "_res_v_version_list_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v_version_feat_items" ADD CONSTRAINT "_res_v_version_feat_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_res_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_res_v" ADD CONSTRAINT "_res_v_parent_id_res_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."res"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_res_v" ADD CONSTRAINT "_res_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_topics" ADD CONSTRAINT "articles_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_member_id_team_members_id_fk" FOREIGN KEY ("author_member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_version_topics" ADD CONSTRAINT "_articles_v_version_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_author_member_id_team_members_id_fk" FOREIGN KEY ("version_author_member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_standards" ADD CONSTRAINT "case_studies_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_problem_points" ADD CONSTRAINT "case_studies_problem_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_solution_points" ADD CONSTRAINT "case_studies_solution_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_result_metrics" ADD CONSTRAINT "case_studies_result_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_metrics" ADD CONSTRAINT "case_studies_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_closing_buttons" ADD CONSTRAINT "case_studies_closing_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_client_logo_id_media_id_fk" FOREIGN KEY ("client_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_testimonial_ref_id_testimonials_id_fk" FOREIGN KEY ("testimonial_ref_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_standards" ADD CONSTRAINT "_case_studies_v_version_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_problem_points" ADD CONSTRAINT "_case_studies_v_version_problem_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_solution_points" ADD CONSTRAINT "_case_studies_v_version_solution_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_result_metrics" ADD CONSTRAINT "_case_studies_v_version_result_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_metrics" ADD CONSTRAINT "_case_studies_v_version_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_closing_buttons" ADD CONSTRAINT "_case_studies_v_version_closing_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_client_logo_id_media_id_fk" FOREIGN KEY ("version_client_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_testimonial_ref_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_ref_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "p_logos" ADD CONSTRAINT "p_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "t_logos" ADD CONSTRAINT "t_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_standards" ADD CONSTRAINT "products_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_whats_included" ADD CONSTRAINT "products_whats_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_downloadable_file_id_media_id_fk" FOREIGN KEY ("downloadable_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_standards" ADD CONSTRAINT "_products_v_version_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_whats_included" ADD CONSTRAINT "_products_v_version_whats_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_downloadable_file_id_media_id_fk" FOREIGN KEY ("version_downloadable_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_track" ADD CONSTRAINT "courses_track_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_format" ADD CONSTRAINT "courses_format_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_outcomes" ADD CONSTRAINT "courses_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_modules_lessons_resources" ADD CONSTRAINT "courses_modules_lessons_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_modules_lessons_resources" ADD CONSTRAINT "courses_modules_lessons_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_modules_lessons" ADD CONSTRAINT "courses_modules_lessons_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_modules_lessons" ADD CONSTRAINT "courses_modules_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_modules" ADD CONSTRAINT "courses_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_standards" ADD CONSTRAINT "courses_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_assessment_id_assessments_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_version_track" ADD CONSTRAINT "_courses_v_version_track_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_format" ADD CONSTRAINT "_courses_v_version_format_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_outcomes" ADD CONSTRAINT "_courses_v_version_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons_resources" ADD CONSTRAINT "_courses_v_version_modules_lessons_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons_resources" ADD CONSTRAINT "_courses_v_version_modules_lessons_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons" ADD CONSTRAINT "_courses_v_version_modules_lessons_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons" ADD CONSTRAINT "_courses_v_version_modules_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules" ADD CONSTRAINT "_courses_v_version_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_standards" ADD CONSTRAINT "_courses_v_version_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_parent_id_courses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_instructor_id_instructors_id_fk" FOREIGN KEY ("version_instructor_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_media_id_media_id_fk" FOREIGN KEY ("version_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_assessment_id_assessments_id_fk" FOREIGN KEY ("version_assessment_id") REFERENCES "public"."assessments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructors_credentials" ADD CONSTRAINT "instructors_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructors_stats" ADD CONSTRAINT "instructors_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructors" ADD CONSTRAINT "instructors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_instructors_v_version_credentials" ADD CONSTRAINT "_instructors_v_version_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instructors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instructors_v_version_stats" ADD CONSTRAINT "_instructors_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_instructors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_instructors_v" ADD CONSTRAINT "_instructors_v_parent_id_instructors_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_instructors_v" ADD CONSTRAINT "_instructors_v_version_avatar_id_media_id_fk" FOREIGN KEY ("version_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "assessments_questions_options" ADD CONSTRAINT "assessments_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assessments_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_questions" ADD CONSTRAINT "assessments_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments" ADD CONSTRAINT "assessments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "free_trainings" ADD CONSTRAINT "free_trainings_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "free_trainings" ADD CONSTRAINT "free_trainings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_free_trainings_v" ADD CONSTRAINT "_free_trainings_v_parent_id_free_trainings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."free_trainings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_free_trainings_v" ADD CONSTRAINT "_free_trainings_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_free_trainings_v" ADD CONSTRAINT "_free_trainings_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_parent_id_downloads_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages" ADD CONSTRAINT "legal_pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_progress_completed_lessons" ADD CONSTRAINT "course_progress_completed_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course_progress"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_assessment_id_assessments_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_set_social_links" ADD CONSTRAINT "site_set_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_set"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_set" ADD CONSTRAINT "site_set_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_set" ADD CONSTRAINT "site_set_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "nav_hdr_nav_items_children" ADD CONSTRAINT "nav_hdr_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_hdr_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_hdr_nav_items" ADD CONSTRAINT "nav_hdr_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_hdr"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_ftr_closing_cta_ctas" ADD CONSTRAINT "nav_ftr_closing_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_ftr"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_ftr_columns_links" ADD CONSTRAINT "nav_ftr_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_ftr_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_ftr_columns" ADD CONSTRAINT "nav_ftr_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_ftr"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_ftr_standards_strip" ADD CONSTRAINT "nav_ftr_standards_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_ftr"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_ftr_legal_links" ADD CONSTRAINT "nav_ftr_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_ftr"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dash_onboarding_courses_step_points" ADD CONSTRAINT "dash_onboarding_courses_step_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dash_onboarding_resources_step_points" ADD CONSTRAINT "dash_onboarding_resources_step_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dash" ADD CONSTRAINT "dash_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dash_v_version_onboarding_courses_step_points" ADD CONSTRAINT "_dash_v_version_onboarding_courses_step_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dash_v_version_onboarding_resources_step_points" ADD CONSTRAINT "_dash_v_version_onboarding_resources_step_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dash_v" ADD CONSTRAINT "_dash_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portal_pg" ADD CONSTRAINT "portal_pg_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portal_pg_v" ADD CONSTRAINT "_portal_pg_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cart_pg_empty_cart_ctas" ADD CONSTRAINT "cart_pg_empty_cart_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cart_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cart_pg" ADD CONSTRAINT "cart_pg_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cart_pg_v_version_empty_cart_ctas" ADD CONSTRAINT "_cart_pg_v_version_empty_cart_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cart_pg_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cart_pg_v" ADD CONSTRAINT "_cart_pg_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checkout" ADD CONSTRAINT "checkout_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_checkout_v" ADD CONSTRAINT "_checkout_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "thanks_confirmed_ctas" ADD CONSTRAINT "thanks_confirmed_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."thanks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "thanks_next_steps_steps" ADD CONSTRAINT "thanks_next_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."thanks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "thanks" ADD CONSTRAINT "thanks_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_thanks_v_version_confirmed_ctas" ADD CONSTRAINT "_thanks_v_version_confirmed_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_thanks_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_thanks_v_version_next_steps_steps" ADD CONSTRAINT "_thanks_v_version_next_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_thanks_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_thanks_v" ADD CONSTRAINT "_thanks_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "auth_pg_shared_trust_standards" ADD CONSTRAINT "auth_pg_shared_trust_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."auth_pg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "auth_pg" ADD CONSTRAINT "auth_pg_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_auth_pg_v_version_shared_trust_standards" ADD CONSTRAINT "_auth_pg_v_version_shared_trust_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_auth_pg_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_auth_pg_v" ADD CONSTRAINT "_auth_pg_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_hero_systems_standards_order_idx" ON "home_hero_systems_standards" USING btree ("_order");
  CREATE INDEX "home_hero_systems_standards_parent_id_idx" ON "home_hero_systems_standards" USING btree ("_parent_id");
  CREATE INDEX "home_hero_systems_order_idx" ON "home_hero_systems" USING btree ("_order");
  CREATE INDEX "home_hero_systems_parent_id_idx" ON "home_hero_systems" USING btree ("_parent_id");
  CREATE INDEX "home_hero_ticker_order_idx" ON "home_hero_ticker" USING btree ("_order");
  CREATE INDEX "home_hero_ticker_parent_id_idx" ON "home_hero_ticker" USING btree ("_parent_id");
  CREATE INDEX "home_cs_items_standards_order_idx" ON "home_cs_items_standards" USING btree ("_order");
  CREATE INDEX "home_cs_items_standards_parent_id_idx" ON "home_cs_items_standards" USING btree ("_parent_id");
  CREATE INDEX "home_cs_items_order_idx" ON "home_cs_items" USING btree ("_order");
  CREATE INDEX "home_cs_items_parent_id_idx" ON "home_cs_items" USING btree ("_parent_id");
  CREATE INDEX "home_pt_customers_order_idx" ON "home_pt_customers" USING btree ("_order");
  CREATE INDEX "home_pt_customers_parent_id_idx" ON "home_pt_customers" USING btree ("_parent_id");
  CREATE INDEX "home_pt_partners_order_idx" ON "home_pt_partners" USING btree ("_order");
  CREATE INDEX "home_pt_partners_parent_id_idx" ON "home_pt_partners" USING btree ("_parent_id");
  CREATE INDEX "home_pb_solutions_order_idx" ON "home_pb_solutions" USING btree ("_order");
  CREATE INDEX "home_pb_solutions_parent_id_idx" ON "home_pb_solutions" USING btree ("_parent_id");
  CREATE INDEX "home_sv_services_points_order_idx" ON "home_sv_services_points" USING btree ("_order");
  CREATE INDEX "home_sv_services_points_parent_id_idx" ON "home_sv_services_points" USING btree ("_parent_id");
  CREATE INDEX "home_sv_services_order_idx" ON "home_sv_services" USING btree ("_order");
  CREATE INDEX "home_sv_services_parent_id_idx" ON "home_sv_services" USING btree ("_parent_id");
  CREATE INDEX "home_sv_industries_points_order_idx" ON "home_sv_industries_points" USING btree ("_order");
  CREATE INDEX "home_sv_industries_points_parent_id_idx" ON "home_sv_industries_points" USING btree ("_parent_id");
  CREATE INDEX "home_sv_industries_standards_order_idx" ON "home_sv_industries_standards" USING btree ("_order");
  CREATE INDEX "home_sv_industries_standards_parent_id_idx" ON "home_sv_industries_standards" USING btree ("_parent_id");
  CREATE INDEX "home_sv_industries_order_idx" ON "home_sv_industries" USING btree ("_order");
  CREATE INDEX "home_sv_industries_parent_id_idx" ON "home_sv_industries" USING btree ("_parent_id");
  CREATE INDEX "home_sa_rows_order_idx" ON "home_sa_rows" USING btree ("_order");
  CREATE INDEX "home_sa_rows_parent_id_idx" ON "home_sa_rows" USING btree ("_parent_id");
  CREATE INDEX "home_sa_never_items_order_idx" ON "home_sa_never_items" USING btree ("_order");
  CREATE INDEX "home_sa_never_items_parent_id_idx" ON "home_sa_never_items" USING btree ("_parent_id");
  CREATE INDEX "home_ab_certs_order_idx" ON "home_ab_certs" USING btree ("_order");
  CREATE INDEX "home_ab_certs_parent_id_idx" ON "home_ab_certs" USING btree ("_parent_id");
  CREATE INDEX "home_ab_experience_order_idx" ON "home_ab_experience" USING btree ("_order");
  CREATE INDEX "home_ab_experience_parent_id_idx" ON "home_ab_experience" USING btree ("_parent_id");
  CREATE INDEX "home_ab_conferences_order_idx" ON "home_ab_conferences" USING btree ("_order");
  CREATE INDEX "home_ab_conferences_parent_id_idx" ON "home_ab_conferences" USING btree ("_parent_id");
  CREATE INDEX "home_nw_articles_order_idx" ON "home_nw_articles" USING btree ("_order");
  CREATE INDEX "home_nw_articles_parent_id_idx" ON "home_nw_articles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_slug_idx" ON "home" USING btree ("slug");
  CREATE INDEX "home_seo_seo_og_image_idx" ON "home" USING btree ("seo_og_image_id");
  CREATE INDEX "home_updated_at_idx" ON "home" USING btree ("updated_at");
  CREATE INDEX "home_created_at_idx" ON "home" USING btree ("created_at");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "_home_v_version_hero_systems_standards_order_idx" ON "_home_v_version_hero_systems_standards" USING btree ("_order");
  CREATE INDEX "_home_v_version_hero_systems_standards_parent_id_idx" ON "_home_v_version_hero_systems_standards" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_hero_systems_order_idx" ON "_home_v_version_hero_systems" USING btree ("_order");
  CREATE INDEX "_home_v_version_hero_systems_parent_id_idx" ON "_home_v_version_hero_systems" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_hero_ticker_order_idx" ON "_home_v_version_hero_ticker" USING btree ("_order");
  CREATE INDEX "_home_v_version_hero_ticker_parent_id_idx" ON "_home_v_version_hero_ticker" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_cs_items_standards_order_idx" ON "_home_v_version_cs_items_standards" USING btree ("_order");
  CREATE INDEX "_home_v_version_cs_items_standards_parent_id_idx" ON "_home_v_version_cs_items_standards" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_cs_items_order_idx" ON "_home_v_version_cs_items" USING btree ("_order");
  CREATE INDEX "_home_v_version_cs_items_parent_id_idx" ON "_home_v_version_cs_items" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_pt_customers_order_idx" ON "_home_v_version_pt_customers" USING btree ("_order");
  CREATE INDEX "_home_v_version_pt_customers_parent_id_idx" ON "_home_v_version_pt_customers" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_pt_partners_order_idx" ON "_home_v_version_pt_partners" USING btree ("_order");
  CREATE INDEX "_home_v_version_pt_partners_parent_id_idx" ON "_home_v_version_pt_partners" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_pb_solutions_order_idx" ON "_home_v_version_pb_solutions" USING btree ("_order");
  CREATE INDEX "_home_v_version_pb_solutions_parent_id_idx" ON "_home_v_version_pb_solutions" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_sv_services_points_order_idx" ON "_home_v_version_sv_services_points" USING btree ("_order");
  CREATE INDEX "_home_v_version_sv_services_points_parent_id_idx" ON "_home_v_version_sv_services_points" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_sv_services_order_idx" ON "_home_v_version_sv_services" USING btree ("_order");
  CREATE INDEX "_home_v_version_sv_services_parent_id_idx" ON "_home_v_version_sv_services" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_sv_industries_points_order_idx" ON "_home_v_version_sv_industries_points" USING btree ("_order");
  CREATE INDEX "_home_v_version_sv_industries_points_parent_id_idx" ON "_home_v_version_sv_industries_points" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_sv_industries_standards_order_idx" ON "_home_v_version_sv_industries_standards" USING btree ("_order");
  CREATE INDEX "_home_v_version_sv_industries_standards_parent_id_idx" ON "_home_v_version_sv_industries_standards" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_sv_industries_order_idx" ON "_home_v_version_sv_industries" USING btree ("_order");
  CREATE INDEX "_home_v_version_sv_industries_parent_id_idx" ON "_home_v_version_sv_industries" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_sa_rows_order_idx" ON "_home_v_version_sa_rows" USING btree ("_order");
  CREATE INDEX "_home_v_version_sa_rows_parent_id_idx" ON "_home_v_version_sa_rows" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_sa_never_items_order_idx" ON "_home_v_version_sa_never_items" USING btree ("_order");
  CREATE INDEX "_home_v_version_sa_never_items_parent_id_idx" ON "_home_v_version_sa_never_items" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_ab_certs_order_idx" ON "_home_v_version_ab_certs" USING btree ("_order");
  CREATE INDEX "_home_v_version_ab_certs_parent_id_idx" ON "_home_v_version_ab_certs" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_ab_experience_order_idx" ON "_home_v_version_ab_experience" USING btree ("_order");
  CREATE INDEX "_home_v_version_ab_experience_parent_id_idx" ON "_home_v_version_ab_experience" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_ab_conferences_order_idx" ON "_home_v_version_ab_conferences" USING btree ("_order");
  CREATE INDEX "_home_v_version_ab_conferences_parent_id_idx" ON "_home_v_version_ab_conferences" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_nw_articles_order_idx" ON "_home_v_version_nw_articles" USING btree ("_order");
  CREATE INDEX "_home_v_version_nw_articles_parent_id_idx" ON "_home_v_version_nw_articles" USING btree ("_parent_id");
  CREATE INDEX "_home_v_parent_idx" ON "_home_v" USING btree ("parent_id");
  CREATE INDEX "_home_v_version_version_slug_idx" ON "_home_v" USING btree ("version_slug");
  CREATE INDEX "_home_v_version_seo_version_seo_og_image_idx" ON "_home_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_home_v_version_version_updated_at_idx" ON "_home_v" USING btree ("version_updated_at");
  CREATE INDEX "_home_v_version_version_created_at_idx" ON "_home_v" USING btree ("version_created_at");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "cons_hero_standards_order_idx" ON "cons_hero_standards" USING btree ("_order");
  CREATE INDEX "cons_hero_standards_parent_id_idx" ON "cons_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "cons_hero_lifecycle_order_idx" ON "cons_hero_lifecycle" USING btree ("_order");
  CREATE INDEX "cons_hero_lifecycle_parent_id_idx" ON "cons_hero_lifecycle" USING btree ("_parent_id");
  CREATE INDEX "cons_caps_items_order_idx" ON "cons_caps_items" USING btree ("_order");
  CREATE INDEX "cons_caps_items_parent_id_idx" ON "cons_caps_items" USING btree ("_parent_id");
  CREATE INDEX "cons_std_items_order_idx" ON "cons_std_items" USING btree ("_order");
  CREATE INDEX "cons_std_items_parent_id_idx" ON "cons_std_items" USING btree ("_parent_id");
  CREATE INDEX "cons_feat_items_order_idx" ON "cons_feat_items" USING btree ("_order");
  CREATE INDEX "cons_feat_items_parent_id_idx" ON "cons_feat_items" USING btree ("_parent_id");
  CREATE INDEX "cons_facts_items_order_idx" ON "cons_facts_items" USING btree ("_order");
  CREATE INDEX "cons_facts_items_parent_id_idx" ON "cons_facts_items" USING btree ("_parent_id");
  CREATE INDEX "cons_about_creds_order_idx" ON "cons_about_creds" USING btree ("_order");
  CREATE INDEX "cons_about_creds_parent_id_idx" ON "cons_about_creds" USING btree ("_parent_id");
  CREATE INDEX "cons_opts_items_order_idx" ON "cons_opts_items" USING btree ("_order");
  CREATE INDEX "cons_opts_items_parent_id_idx" ON "cons_opts_items" USING btree ("_parent_id");
  CREATE INDEX "cons_ind_items_order_idx" ON "cons_ind_items" USING btree ("_order");
  CREATE INDEX "cons_ind_items_parent_id_idx" ON "cons_ind_items" USING btree ("_parent_id");
  CREATE INDEX "cons_faq_items_order_idx" ON "cons_faq_items" USING btree ("_order");
  CREATE INDEX "cons_faq_items_parent_id_idx" ON "cons_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cons_slug_idx" ON "cons" USING btree ("slug");
  CREATE INDEX "cons_seo_seo_og_image_idx" ON "cons" USING btree ("seo_og_image_id");
  CREATE INDEX "cons_updated_at_idx" ON "cons" USING btree ("updated_at");
  CREATE INDEX "cons_created_at_idx" ON "cons" USING btree ("created_at");
  CREATE INDEX "cons__status_idx" ON "cons" USING btree ("_status");
  CREATE INDEX "_cons_v_version_hero_standards_order_idx" ON "_cons_v_version_hero_standards" USING btree ("_order");
  CREATE INDEX "_cons_v_version_hero_standards_parent_id_idx" ON "_cons_v_version_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_hero_lifecycle_order_idx" ON "_cons_v_version_hero_lifecycle" USING btree ("_order");
  CREATE INDEX "_cons_v_version_hero_lifecycle_parent_id_idx" ON "_cons_v_version_hero_lifecycle" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_caps_items_order_idx" ON "_cons_v_version_caps_items" USING btree ("_order");
  CREATE INDEX "_cons_v_version_caps_items_parent_id_idx" ON "_cons_v_version_caps_items" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_std_items_order_idx" ON "_cons_v_version_std_items" USING btree ("_order");
  CREATE INDEX "_cons_v_version_std_items_parent_id_idx" ON "_cons_v_version_std_items" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_feat_items_order_idx" ON "_cons_v_version_feat_items" USING btree ("_order");
  CREATE INDEX "_cons_v_version_feat_items_parent_id_idx" ON "_cons_v_version_feat_items" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_facts_items_order_idx" ON "_cons_v_version_facts_items" USING btree ("_order");
  CREATE INDEX "_cons_v_version_facts_items_parent_id_idx" ON "_cons_v_version_facts_items" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_about_creds_order_idx" ON "_cons_v_version_about_creds" USING btree ("_order");
  CREATE INDEX "_cons_v_version_about_creds_parent_id_idx" ON "_cons_v_version_about_creds" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_opts_items_order_idx" ON "_cons_v_version_opts_items" USING btree ("_order");
  CREATE INDEX "_cons_v_version_opts_items_parent_id_idx" ON "_cons_v_version_opts_items" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_ind_items_order_idx" ON "_cons_v_version_ind_items" USING btree ("_order");
  CREATE INDEX "_cons_v_version_ind_items_parent_id_idx" ON "_cons_v_version_ind_items" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_version_faq_items_order_idx" ON "_cons_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_cons_v_version_faq_items_parent_id_idx" ON "_cons_v_version_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_cons_v_parent_idx" ON "_cons_v" USING btree ("parent_id");
  CREATE INDEX "_cons_v_version_version_slug_idx" ON "_cons_v" USING btree ("version_slug");
  CREATE INDEX "_cons_v_version_seo_version_seo_og_image_idx" ON "_cons_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_cons_v_version_version_updated_at_idx" ON "_cons_v" USING btree ("version_updated_at");
  CREATE INDEX "_cons_v_version_version_created_at_idx" ON "_cons_v" USING btree ("version_created_at");
  CREATE INDEX "_cons_v_version_version__status_idx" ON "_cons_v" USING btree ("version__status");
  CREATE INDEX "_cons_v_created_at_idx" ON "_cons_v" USING btree ("created_at");
  CREATE INDEX "_cons_v_updated_at_idx" ON "_cons_v" USING btree ("updated_at");
  CREATE INDEX "_cons_v_latest_idx" ON "_cons_v" USING btree ("latest");
  CREATE INDEX "trn_hero_standards_order_idx" ON "trn_hero_standards" USING btree ("_order");
  CREATE INDEX "trn_hero_standards_parent_id_idx" ON "trn_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "trn_ways_items_meta_order_idx" ON "trn_ways_items_meta" USING btree ("_order");
  CREATE INDEX "trn_ways_items_meta_parent_id_idx" ON "trn_ways_items_meta" USING btree ("_parent_id");
  CREATE INDEX "trn_ways_items_order_idx" ON "trn_ways_items" USING btree ("_order");
  CREATE INDEX "trn_ways_items_parent_id_idx" ON "trn_ways_items" USING btree ("_parent_id");
  CREATE INDEX "trn_val_items_order_idx" ON "trn_val_items" USING btree ("_order");
  CREATE INDEX "trn_val_items_parent_id_idx" ON "trn_val_items" USING btree ("_parent_id");
  CREATE INDEX "trn_trk_items_order_idx" ON "trn_trk_items" USING btree ("_order");
  CREATE INDEX "trn_trk_items_parent_id_idx" ON "trn_trk_items" USING btree ("_parent_id");
  CREATE INDEX "trn_off_items_order_idx" ON "trn_off_items" USING btree ("_order");
  CREATE INDEX "trn_off_items_parent_id_idx" ON "trn_off_items" USING btree ("_parent_id");
  CREATE INDEX "trn_cat_items_order_idx" ON "trn_cat_items" USING btree ("_order");
  CREATE INDEX "trn_cat_items_parent_id_idx" ON "trn_cat_items" USING btree ("_parent_id");
  CREATE INDEX "trn_cta_stats_order_idx" ON "trn_cta_stats" USING btree ("_order");
  CREATE INDEX "trn_cta_stats_parent_id_idx" ON "trn_cta_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "trn_slug_idx" ON "trn" USING btree ("slug");
  CREATE INDEX "trn_seo_seo_og_image_idx" ON "trn" USING btree ("seo_og_image_id");
  CREATE INDEX "trn_updated_at_idx" ON "trn" USING btree ("updated_at");
  CREATE INDEX "trn_created_at_idx" ON "trn" USING btree ("created_at");
  CREATE INDEX "trn__status_idx" ON "trn" USING btree ("_status");
  CREATE INDEX "_trn_v_version_hero_standards_order_idx" ON "_trn_v_version_hero_standards" USING btree ("_order");
  CREATE INDEX "_trn_v_version_hero_standards_parent_id_idx" ON "_trn_v_version_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "_trn_v_version_ways_items_meta_order_idx" ON "_trn_v_version_ways_items_meta" USING btree ("_order");
  CREATE INDEX "_trn_v_version_ways_items_meta_parent_id_idx" ON "_trn_v_version_ways_items_meta" USING btree ("_parent_id");
  CREATE INDEX "_trn_v_version_ways_items_order_idx" ON "_trn_v_version_ways_items" USING btree ("_order");
  CREATE INDEX "_trn_v_version_ways_items_parent_id_idx" ON "_trn_v_version_ways_items" USING btree ("_parent_id");
  CREATE INDEX "_trn_v_version_val_items_order_idx" ON "_trn_v_version_val_items" USING btree ("_order");
  CREATE INDEX "_trn_v_version_val_items_parent_id_idx" ON "_trn_v_version_val_items" USING btree ("_parent_id");
  CREATE INDEX "_trn_v_version_trk_items_order_idx" ON "_trn_v_version_trk_items" USING btree ("_order");
  CREATE INDEX "_trn_v_version_trk_items_parent_id_idx" ON "_trn_v_version_trk_items" USING btree ("_parent_id");
  CREATE INDEX "_trn_v_version_off_items_order_idx" ON "_trn_v_version_off_items" USING btree ("_order");
  CREATE INDEX "_trn_v_version_off_items_parent_id_idx" ON "_trn_v_version_off_items" USING btree ("_parent_id");
  CREATE INDEX "_trn_v_version_cat_items_order_idx" ON "_trn_v_version_cat_items" USING btree ("_order");
  CREATE INDEX "_trn_v_version_cat_items_parent_id_idx" ON "_trn_v_version_cat_items" USING btree ("_parent_id");
  CREATE INDEX "_trn_v_version_cta_stats_order_idx" ON "_trn_v_version_cta_stats" USING btree ("_order");
  CREATE INDEX "_trn_v_version_cta_stats_parent_id_idx" ON "_trn_v_version_cta_stats" USING btree ("_parent_id");
  CREATE INDEX "_trn_v_parent_idx" ON "_trn_v" USING btree ("parent_id");
  CREATE INDEX "_trn_v_version_version_slug_idx" ON "_trn_v" USING btree ("version_slug");
  CREATE INDEX "_trn_v_version_seo_version_seo_og_image_idx" ON "_trn_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_trn_v_version_version_updated_at_idx" ON "_trn_v" USING btree ("version_updated_at");
  CREATE INDEX "_trn_v_version_version_created_at_idx" ON "_trn_v" USING btree ("version_created_at");
  CREATE INDEX "_trn_v_version_version__status_idx" ON "_trn_v" USING btree ("version__status");
  CREATE INDEX "_trn_v_created_at_idx" ON "_trn_v" USING btree ("created_at");
  CREATE INDEX "_trn_v_updated_at_idx" ON "_trn_v" USING btree ("updated_at");
  CREATE INDEX "_trn_v_latest_idx" ON "_trn_v" USING btree ("latest");
  CREATE INDEX "comp_hero_standards_order_idx" ON "comp_hero_standards" USING btree ("_order");
  CREATE INDEX "comp_hero_standards_parent_id_idx" ON "comp_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "comp_hero_actions_order_idx" ON "comp_hero_actions" USING btree ("_order");
  CREATE INDEX "comp_hero_actions_parent_id_idx" ON "comp_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "comp_hud_rows_order_idx" ON "comp_hud_rows" USING btree ("_order");
  CREATE INDEX "comp_hud_rows_parent_id_idx" ON "comp_hud_rows" USING btree ("_parent_id");
  CREATE INDEX "comp_val_items_order_idx" ON "comp_val_items" USING btree ("_order");
  CREATE INDEX "comp_val_items_parent_id_idx" ON "comp_val_items" USING btree ("_parent_id");
  CREATE INDEX "comp_caps_items_order_idx" ON "comp_caps_items" USING btree ("_order");
  CREATE INDEX "comp_caps_items_parent_id_idx" ON "comp_caps_items" USING btree ("_parent_id");
  CREATE INDEX "comp_case_items_order_idx" ON "comp_case_items" USING btree ("_order");
  CREATE INDEX "comp_case_items_parent_id_idx" ON "comp_case_items" USING btree ("_parent_id");
  CREATE INDEX "comp_svc_categories_points_order_idx" ON "comp_svc_categories_points" USING btree ("_order");
  CREATE INDEX "comp_svc_categories_points_parent_id_idx" ON "comp_svc_categories_points" USING btree ("_parent_id");
  CREATE INDEX "comp_svc_categories_order_idx" ON "comp_svc_categories" USING btree ("_order");
  CREATE INDEX "comp_svc_categories_parent_id_idx" ON "comp_svc_categories" USING btree ("_parent_id");
  CREATE INDEX "comp_eng_models_order_idx" ON "comp_eng_models" USING btree ("_order");
  CREATE INDEX "comp_eng_models_parent_id_idx" ON "comp_eng_models" USING btree ("_parent_id");
  CREATE INDEX "comp_role_items_order_idx" ON "comp_role_items" USING btree ("_order");
  CREATE INDEX "comp_role_items_parent_id_idx" ON "comp_role_items" USING btree ("_parent_id");
  CREATE INDEX "comp_close_actions_order_idx" ON "comp_close_actions" USING btree ("_order");
  CREATE INDEX "comp_close_actions_parent_id_idx" ON "comp_close_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "comp_slug_idx" ON "comp" USING btree ("slug");
  CREATE INDEX "comp_seo_seo_og_image_idx" ON "comp" USING btree ("seo_og_image_id");
  CREATE INDEX "comp_updated_at_idx" ON "comp" USING btree ("updated_at");
  CREATE INDEX "comp_created_at_idx" ON "comp" USING btree ("created_at");
  CREATE INDEX "comp__status_idx" ON "comp" USING btree ("_status");
  CREATE INDEX "_comp_v_version_hero_standards_order_idx" ON "_comp_v_version_hero_standards" USING btree ("_order");
  CREATE INDEX "_comp_v_version_hero_standards_parent_id_idx" ON "_comp_v_version_hero_standards" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_hero_actions_order_idx" ON "_comp_v_version_hero_actions" USING btree ("_order");
  CREATE INDEX "_comp_v_version_hero_actions_parent_id_idx" ON "_comp_v_version_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_hud_rows_order_idx" ON "_comp_v_version_hud_rows" USING btree ("_order");
  CREATE INDEX "_comp_v_version_hud_rows_parent_id_idx" ON "_comp_v_version_hud_rows" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_val_items_order_idx" ON "_comp_v_version_val_items" USING btree ("_order");
  CREATE INDEX "_comp_v_version_val_items_parent_id_idx" ON "_comp_v_version_val_items" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_caps_items_order_idx" ON "_comp_v_version_caps_items" USING btree ("_order");
  CREATE INDEX "_comp_v_version_caps_items_parent_id_idx" ON "_comp_v_version_caps_items" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_case_items_order_idx" ON "_comp_v_version_case_items" USING btree ("_order");
  CREATE INDEX "_comp_v_version_case_items_parent_id_idx" ON "_comp_v_version_case_items" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_svc_categories_points_order_idx" ON "_comp_v_version_svc_categories_points" USING btree ("_order");
  CREATE INDEX "_comp_v_version_svc_categories_points_parent_id_idx" ON "_comp_v_version_svc_categories_points" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_svc_categories_order_idx" ON "_comp_v_version_svc_categories" USING btree ("_order");
  CREATE INDEX "_comp_v_version_svc_categories_parent_id_idx" ON "_comp_v_version_svc_categories" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_eng_models_order_idx" ON "_comp_v_version_eng_models" USING btree ("_order");
  CREATE INDEX "_comp_v_version_eng_models_parent_id_idx" ON "_comp_v_version_eng_models" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_role_items_order_idx" ON "_comp_v_version_role_items" USING btree ("_order");
  CREATE INDEX "_comp_v_version_role_items_parent_id_idx" ON "_comp_v_version_role_items" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_version_close_actions_order_idx" ON "_comp_v_version_close_actions" USING btree ("_order");
  CREATE INDEX "_comp_v_version_close_actions_parent_id_idx" ON "_comp_v_version_close_actions" USING btree ("_parent_id");
  CREATE INDEX "_comp_v_parent_idx" ON "_comp_v" USING btree ("parent_id");
  CREATE INDEX "_comp_v_version_version_slug_idx" ON "_comp_v" USING btree ("version_slug");
  CREATE INDEX "_comp_v_version_seo_version_seo_og_image_idx" ON "_comp_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_comp_v_version_version_updated_at_idx" ON "_comp_v" USING btree ("version_updated_at");
  CREATE INDEX "_comp_v_version_version_created_at_idx" ON "_comp_v" USING btree ("version_created_at");
  CREATE INDEX "_comp_v_version_version__status_idx" ON "_comp_v" USING btree ("version__status");
  CREATE INDEX "_comp_v_created_at_idx" ON "_comp_v" USING btree ("created_at");
  CREATE INDEX "_comp_v_updated_at_idx" ON "_comp_v" USING btree ("updated_at");
  CREATE INDEX "_comp_v_latest_idx" ON "_comp_v" USING btree ("latest");
  CREATE UNIQUE INDEX "job_postings_slug_idx" ON "job_postings" USING btree ("slug");
  CREATE INDEX "job_postings_seo_seo_og_image_idx" ON "job_postings" USING btree ("seo_og_image_id");
  CREATE INDEX "job_postings_updated_at_idx" ON "job_postings" USING btree ("updated_at");
  CREATE INDEX "job_postings_created_at_idx" ON "job_postings" USING btree ("created_at");
  CREATE INDEX "job_postings__status_idx" ON "job_postings" USING btree ("_status");
  CREATE INDEX "_job_postings_v_parent_idx" ON "_job_postings_v" USING btree ("parent_id");
  CREATE INDEX "_job_postings_v_version_version_slug_idx" ON "_job_postings_v" USING btree ("version_slug");
  CREATE INDEX "_job_postings_v_version_seo_version_seo_og_image_idx" ON "_job_postings_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_job_postings_v_version_version_updated_at_idx" ON "_job_postings_v" USING btree ("version_updated_at");
  CREATE INDEX "_job_postings_v_version_version_created_at_idx" ON "_job_postings_v" USING btree ("version_created_at");
  CREATE INDEX "_job_postings_v_version_version__status_idx" ON "_job_postings_v" USING btree ("version__status");
  CREATE INDEX "_job_postings_v_created_at_idx" ON "_job_postings_v" USING btree ("created_at");
  CREATE INDEX "_job_postings_v_updated_at_idx" ON "_job_postings_v" USING btree ("updated_at");
  CREATE INDEX "_job_postings_v_latest_idx" ON "_job_postings_v" USING btree ("latest");
  CREATE INDEX "team_members_credentials_order_idx" ON "team_members_credentials" USING btree ("_order");
  CREATE INDEX "team_members_credentials_parent_id_idx" ON "team_members_credentials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "team_members_slug_idx" ON "team_members" USING btree ("slug");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_seo_seo_og_image_idx" ON "team_members" USING btree ("seo_og_image_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "team_members__status_idx" ON "team_members" USING btree ("_status");
  CREATE INDEX "_team_members_v_version_credentials_order_idx" ON "_team_members_v_version_credentials" USING btree ("_order");
  CREATE INDEX "_team_members_v_version_credentials_parent_id_idx" ON "_team_members_v_version_credentials" USING btree ("_parent_id");
  CREATE INDEX "_team_members_v_parent_idx" ON "_team_members_v" USING btree ("parent_id");
  CREATE INDEX "_team_members_v_version_version_slug_idx" ON "_team_members_v" USING btree ("version_slug");
  CREATE INDEX "_team_members_v_version_version_photo_idx" ON "_team_members_v" USING btree ("version_photo_id");
  CREATE INDEX "_team_members_v_version_seo_version_seo_og_image_idx" ON "_team_members_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_team_members_v_version_version_updated_at_idx" ON "_team_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_team_members_v_version_version_created_at_idx" ON "_team_members_v" USING btree ("version_created_at");
  CREATE INDEX "_team_members_v_version_version__status_idx" ON "_team_members_v" USING btree ("version__status");
  CREATE INDEX "_team_members_v_created_at_idx" ON "_team_members_v" USING btree ("created_at");
  CREATE INDEX "_team_members_v_updated_at_idx" ON "_team_members_v" USING btree ("updated_at");
  CREATE INDEX "_team_members_v_latest_idx" ON "_team_members_v" USING btree ("latest");
  CREATE INDEX "res_hero_jump_links_order_idx" ON "res_hero_jump_links" USING btree ("_order");
  CREATE INDEX "res_hero_jump_links_parent_id_idx" ON "res_hero_jump_links" USING btree ("_parent_id");
  CREATE INDEX "res_tools_items_order_idx" ON "res_tools_items" USING btree ("_order");
  CREATE INDEX "res_tools_items_parent_id_idx" ON "res_tools_items" USING btree ("_parent_id");
  CREATE INDEX "res_lib_items_order_idx" ON "res_lib_items" USING btree ("_order");
  CREATE INDEX "res_lib_items_parent_id_idx" ON "res_lib_items" USING btree ("_parent_id");
  CREATE INDEX "res_fw_items_codes_order_idx" ON "res_fw_items_codes" USING btree ("_order");
  CREATE INDEX "res_fw_items_codes_parent_id_idx" ON "res_fw_items_codes" USING btree ("_parent_id");
  CREATE INDEX "res_fw_items_order_idx" ON "res_fw_items" USING btree ("_order");
  CREATE INDEX "res_fw_items_parent_id_idx" ON "res_fw_items" USING btree ("_parent_id");
  CREATE INDEX "res_how_steps_order_idx" ON "res_how_steps" USING btree ("_order");
  CREATE INDEX "res_how_steps_parent_id_idx" ON "res_how_steps" USING btree ("_parent_id");
  CREATE INDEX "res_list_filters_order_idx" ON "res_list_filters" USING btree ("_order");
  CREATE INDEX "res_list_filters_parent_id_idx" ON "res_list_filters" USING btree ("_parent_id");
  CREATE INDEX "res_list_cards_order_idx" ON "res_list_cards" USING btree ("_order");
  CREATE INDEX "res_list_cards_parent_id_idx" ON "res_list_cards" USING btree ("_parent_id");
  CREATE INDEX "res_feat_items_order_idx" ON "res_feat_items" USING btree ("_order");
  CREATE INDEX "res_feat_items_parent_id_idx" ON "res_feat_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "res_slug_idx" ON "res" USING btree ("slug");
  CREATE INDEX "res_seo_seo_og_image_idx" ON "res" USING btree ("seo_og_image_id");
  CREATE INDEX "res_updated_at_idx" ON "res" USING btree ("updated_at");
  CREATE INDEX "res_created_at_idx" ON "res" USING btree ("created_at");
  CREATE INDEX "res__status_idx" ON "res" USING btree ("_status");
  CREATE INDEX "_res_v_version_hero_jump_links_order_idx" ON "_res_v_version_hero_jump_links" USING btree ("_order");
  CREATE INDEX "_res_v_version_hero_jump_links_parent_id_idx" ON "_res_v_version_hero_jump_links" USING btree ("_parent_id");
  CREATE INDEX "_res_v_version_tools_items_order_idx" ON "_res_v_version_tools_items" USING btree ("_order");
  CREATE INDEX "_res_v_version_tools_items_parent_id_idx" ON "_res_v_version_tools_items" USING btree ("_parent_id");
  CREATE INDEX "_res_v_version_lib_items_order_idx" ON "_res_v_version_lib_items" USING btree ("_order");
  CREATE INDEX "_res_v_version_lib_items_parent_id_idx" ON "_res_v_version_lib_items" USING btree ("_parent_id");
  CREATE INDEX "_res_v_version_fw_items_codes_order_idx" ON "_res_v_version_fw_items_codes" USING btree ("_order");
  CREATE INDEX "_res_v_version_fw_items_codes_parent_id_idx" ON "_res_v_version_fw_items_codes" USING btree ("_parent_id");
  CREATE INDEX "_res_v_version_fw_items_order_idx" ON "_res_v_version_fw_items" USING btree ("_order");
  CREATE INDEX "_res_v_version_fw_items_parent_id_idx" ON "_res_v_version_fw_items" USING btree ("_parent_id");
  CREATE INDEX "_res_v_version_how_steps_order_idx" ON "_res_v_version_how_steps" USING btree ("_order");
  CREATE INDEX "_res_v_version_how_steps_parent_id_idx" ON "_res_v_version_how_steps" USING btree ("_parent_id");
  CREATE INDEX "_res_v_version_list_filters_order_idx" ON "_res_v_version_list_filters" USING btree ("_order");
  CREATE INDEX "_res_v_version_list_filters_parent_id_idx" ON "_res_v_version_list_filters" USING btree ("_parent_id");
  CREATE INDEX "_res_v_version_list_cards_order_idx" ON "_res_v_version_list_cards" USING btree ("_order");
  CREATE INDEX "_res_v_version_list_cards_parent_id_idx" ON "_res_v_version_list_cards" USING btree ("_parent_id");
  CREATE INDEX "_res_v_version_feat_items_order_idx" ON "_res_v_version_feat_items" USING btree ("_order");
  CREATE INDEX "_res_v_version_feat_items_parent_id_idx" ON "_res_v_version_feat_items" USING btree ("_parent_id");
  CREATE INDEX "_res_v_parent_idx" ON "_res_v" USING btree ("parent_id");
  CREATE INDEX "_res_v_version_version_slug_idx" ON "_res_v" USING btree ("version_slug");
  CREATE INDEX "_res_v_version_seo_version_seo_og_image_idx" ON "_res_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_res_v_version_version_updated_at_idx" ON "_res_v" USING btree ("version_updated_at");
  CREATE INDEX "_res_v_version_version_created_at_idx" ON "_res_v" USING btree ("version_created_at");
  CREATE INDEX "_res_v_version_version__status_idx" ON "_res_v" USING btree ("version__status");
  CREATE INDEX "_res_v_created_at_idx" ON "_res_v" USING btree ("created_at");
  CREATE INDEX "_res_v_updated_at_idx" ON "_res_v" USING btree ("updated_at");
  CREATE INDEX "_res_v_latest_idx" ON "_res_v" USING btree ("latest");
  CREATE INDEX "articles_topics_order_idx" ON "articles_topics" USING btree ("_order");
  CREATE INDEX "articles_topics_parent_id_idx" ON "articles_topics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_hero_image_idx" ON "articles" USING btree ("hero_image_id");
  CREATE INDEX "articles_author_member_idx" ON "articles" USING btree ("author_member_id");
  CREATE INDEX "articles_seo_seo_og_image_idx" ON "articles" USING btree ("seo_og_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id");
  CREATE INDEX "_articles_v_version_topics_order_idx" ON "_articles_v_version_topics" USING btree ("_order");
  CREATE INDEX "_articles_v_version_topics_parent_id_idx" ON "_articles_v_version_topics" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_hero_image_idx" ON "_articles_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_articles_v_version_version_author_member_idx" ON "_articles_v" USING btree ("version_author_member_id");
  CREATE INDEX "_articles_v_version_seo_version_seo_og_image_idx" ON "_articles_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id");
  CREATE INDEX "case_studies_standards_order_idx" ON "case_studies_standards" USING btree ("_order");
  CREATE INDEX "case_studies_standards_parent_id_idx" ON "case_studies_standards" USING btree ("_parent_id");
  CREATE INDEX "case_studies_problem_points_order_idx" ON "case_studies_problem_points" USING btree ("_order");
  CREATE INDEX "case_studies_problem_points_parent_id_idx" ON "case_studies_problem_points" USING btree ("_parent_id");
  CREATE INDEX "case_studies_solution_points_order_idx" ON "case_studies_solution_points" USING btree ("_order");
  CREATE INDEX "case_studies_solution_points_parent_id_idx" ON "case_studies_solution_points" USING btree ("_parent_id");
  CREATE INDEX "case_studies_result_metrics_order_idx" ON "case_studies_result_metrics" USING btree ("_order");
  CREATE INDEX "case_studies_result_metrics_parent_id_idx" ON "case_studies_result_metrics" USING btree ("_parent_id");
  CREATE INDEX "case_studies_metrics_order_idx" ON "case_studies_metrics" USING btree ("_order");
  CREATE INDEX "case_studies_metrics_parent_id_idx" ON "case_studies_metrics" USING btree ("_parent_id");
  CREATE INDEX "case_studies_closing_buttons_order_idx" ON "case_studies_closing_buttons" USING btree ("_order");
  CREATE INDEX "case_studies_closing_buttons_parent_id_idx" ON "case_studies_closing_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_client_client_logo_idx" ON "case_studies" USING btree ("client_logo_id");
  CREATE INDEX "case_studies_hero_image_idx" ON "case_studies" USING btree ("hero_image_id");
  CREATE INDEX "case_studies_testimonial_ref_idx" ON "case_studies" USING btree ("testimonial_ref_id");
  CREATE INDEX "case_studies_seo_seo_og_image_idx" ON "case_studies" USING btree ("seo_og_image_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
  CREATE INDEX "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
  CREATE INDEX "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
  CREATE INDEX "case_studies_rels_case_studies_id_idx" ON "case_studies_rels" USING btree ("case_studies_id");
  CREATE INDEX "_case_studies_v_version_standards_order_idx" ON "_case_studies_v_version_standards" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_standards_parent_id_idx" ON "_case_studies_v_version_standards" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_problem_points_order_idx" ON "_case_studies_v_version_problem_points" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_problem_points_parent_id_idx" ON "_case_studies_v_version_problem_points" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_solution_points_order_idx" ON "_case_studies_v_version_solution_points" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_solution_points_parent_id_idx" ON "_case_studies_v_version_solution_points" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_result_metrics_order_idx" ON "_case_studies_v_version_result_metrics" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_result_metrics_parent_id_idx" ON "_case_studies_v_version_result_metrics" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_metrics_order_idx" ON "_case_studies_v_version_metrics" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_metrics_parent_id_idx" ON "_case_studies_v_version_metrics" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_closing_buttons_order_idx" ON "_case_studies_v_version_closing_buttons" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_closing_buttons_parent_id_idx" ON "_case_studies_v_version_closing_buttons" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX "_case_studies_v_version_client_version_client_logo_idx" ON "_case_studies_v" USING btree ("version_client_logo_id");
  CREATE INDEX "_case_studies_v_version_version_hero_image_idx" ON "_case_studies_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_case_studies_v_version_version_testimonial_ref_idx" ON "_case_studies_v" USING btree ("version_testimonial_ref_id");
  CREATE INDEX "_case_studies_v_version_seo_version_seo_og_image_idx" ON "_case_studies_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX "_case_studies_v_rels_order_idx" ON "_case_studies_v_rels" USING btree ("order");
  CREATE INDEX "_case_studies_v_rels_parent_idx" ON "_case_studies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_rels_path_idx" ON "_case_studies_v_rels" USING btree ("path");
  CREATE INDEX "_case_studies_v_rels_case_studies_id_idx" ON "_case_studies_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "p_logos_logo_idx" ON "p_logos" USING btree ("logo_id");
  CREATE INDEX "p_logos_updated_at_idx" ON "p_logos" USING btree ("updated_at");
  CREATE INDEX "p_logos_created_at_idx" ON "p_logos" USING btree ("created_at");
  CREATE INDEX "t_logos_logo_idx" ON "t_logos" USING btree ("logo_id");
  CREATE INDEX "t_logos_updated_at_idx" ON "t_logos" USING btree ("updated_at");
  CREATE INDEX "t_logos_created_at_idx" ON "t_logos" USING btree ("created_at");
  CREATE INDEX "testimonials_logo_idx" ON "testimonials" USING btree ("logo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_logo_idx" ON "_testimonials_v" USING btree ("version_logo_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "products_standards_order_idx" ON "products_standards" USING btree ("_order");
  CREATE INDEX "products_standards_parent_id_idx" ON "products_standards" USING btree ("_parent_id");
  CREATE INDEX "products_whats_included_order_idx" ON "products_whats_included" USING btree ("_order");
  CREATE INDEX "products_whats_included_parent_id_idx" ON "products_whats_included" USING btree ("_parent_id");
  CREATE INDEX "products_thumbnail_idx" ON "products" USING btree ("thumbnail_id");
  CREATE INDEX "products_downloadable_file_idx" ON "products" USING btree ("downloadable_file_id");
  CREATE INDEX "products_seo_seo_og_image_idx" ON "products" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_version_standards_order_idx" ON "_products_v_version_standards" USING btree ("_order");
  CREATE INDEX "_products_v_version_standards_parent_id_idx" ON "_products_v_version_standards" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_whats_included_order_idx" ON "_products_v_version_whats_included" USING btree ("_order");
  CREATE INDEX "_products_v_version_whats_included_parent_id_idx" ON "_products_v_version_whats_included" USING btree ("_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_thumbnail_idx" ON "_products_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_products_v_version_version_downloadable_file_idx" ON "_products_v" USING btree ("version_downloadable_file_id");
  CREATE INDEX "_products_v_version_seo_version_seo_og_image_idx" ON "_products_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  CREATE INDEX "courses_track_order_idx" ON "courses_track" USING btree ("order");
  CREATE INDEX "courses_track_parent_idx" ON "courses_track" USING btree ("parent_id");
  CREATE INDEX "courses_format_order_idx" ON "courses_format" USING btree ("order");
  CREATE INDEX "courses_format_parent_idx" ON "courses_format" USING btree ("parent_id");
  CREATE INDEX "courses_outcomes_order_idx" ON "courses_outcomes" USING btree ("_order");
  CREATE INDEX "courses_outcomes_parent_id_idx" ON "courses_outcomes" USING btree ("_parent_id");
  CREATE INDEX "courses_modules_lessons_resources_order_idx" ON "courses_modules_lessons_resources" USING btree ("_order");
  CREATE INDEX "courses_modules_lessons_resources_parent_id_idx" ON "courses_modules_lessons_resources" USING btree ("_parent_id");
  CREATE INDEX "courses_modules_lessons_resources_file_idx" ON "courses_modules_lessons_resources" USING btree ("file_id");
  CREATE INDEX "courses_modules_lessons_order_idx" ON "courses_modules_lessons" USING btree ("_order");
  CREATE INDEX "courses_modules_lessons_parent_id_idx" ON "courses_modules_lessons" USING btree ("_parent_id");
  CREATE INDEX "courses_modules_lessons_video_idx" ON "courses_modules_lessons" USING btree ("video_id");
  CREATE INDEX "courses_modules_order_idx" ON "courses_modules" USING btree ("_order");
  CREATE INDEX "courses_modules_parent_id_idx" ON "courses_modules" USING btree ("_parent_id");
  CREATE INDEX "courses_standards_order_idx" ON "courses_standards" USING btree ("_order");
  CREATE INDEX "courses_standards_parent_id_idx" ON "courses_standards" USING btree ("_parent_id");
  CREATE INDEX "courses_instructor_idx" ON "courses" USING btree ("instructor_id");
  CREATE INDEX "courses_media_idx" ON "courses" USING btree ("media_id");
  CREATE INDEX "courses_assessment_idx" ON "courses" USING btree ("assessment_id");
  CREATE INDEX "courses_seo_seo_og_image_idx" ON "courses" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "courses__status_idx" ON "courses" USING btree ("_status");
  CREATE INDEX "_courses_v_version_track_order_idx" ON "_courses_v_version_track" USING btree ("order");
  CREATE INDEX "_courses_v_version_track_parent_idx" ON "_courses_v_version_track" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_format_order_idx" ON "_courses_v_version_format" USING btree ("order");
  CREATE INDEX "_courses_v_version_format_parent_idx" ON "_courses_v_version_format" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_outcomes_order_idx" ON "_courses_v_version_outcomes" USING btree ("_order");
  CREATE INDEX "_courses_v_version_outcomes_parent_id_idx" ON "_courses_v_version_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_modules_lessons_resources_order_idx" ON "_courses_v_version_modules_lessons_resources" USING btree ("_order");
  CREATE INDEX "_courses_v_version_modules_lessons_resources_parent_id_idx" ON "_courses_v_version_modules_lessons_resources" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_modules_lessons_resources_file_idx" ON "_courses_v_version_modules_lessons_resources" USING btree ("file_id");
  CREATE INDEX "_courses_v_version_modules_lessons_order_idx" ON "_courses_v_version_modules_lessons" USING btree ("_order");
  CREATE INDEX "_courses_v_version_modules_lessons_parent_id_idx" ON "_courses_v_version_modules_lessons" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_modules_lessons_video_idx" ON "_courses_v_version_modules_lessons" USING btree ("video_id");
  CREATE INDEX "_courses_v_version_modules_order_idx" ON "_courses_v_version_modules" USING btree ("_order");
  CREATE INDEX "_courses_v_version_modules_parent_id_idx" ON "_courses_v_version_modules" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_standards_order_idx" ON "_courses_v_version_standards" USING btree ("_order");
  CREATE INDEX "_courses_v_version_standards_parent_id_idx" ON "_courses_v_version_standards" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_parent_idx" ON "_courses_v" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_version_instructor_idx" ON "_courses_v" USING btree ("version_instructor_id");
  CREATE INDEX "_courses_v_version_version_media_idx" ON "_courses_v" USING btree ("version_media_id");
  CREATE INDEX "_courses_v_version_version_assessment_idx" ON "_courses_v" USING btree ("version_assessment_id");
  CREATE INDEX "_courses_v_version_seo_version_seo_og_image_idx" ON "_courses_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_courses_v_version_version_slug_idx" ON "_courses_v" USING btree ("version_slug");
  CREATE INDEX "_courses_v_version_version_updated_at_idx" ON "_courses_v" USING btree ("version_updated_at");
  CREATE INDEX "_courses_v_version_version_created_at_idx" ON "_courses_v" USING btree ("version_created_at");
  CREATE INDEX "_courses_v_version_version__status_idx" ON "_courses_v" USING btree ("version__status");
  CREATE INDEX "_courses_v_created_at_idx" ON "_courses_v" USING btree ("created_at");
  CREATE INDEX "_courses_v_updated_at_idx" ON "_courses_v" USING btree ("updated_at");
  CREATE INDEX "_courses_v_latest_idx" ON "_courses_v" USING btree ("latest");
  CREATE INDEX "instructors_credentials_order_idx" ON "instructors_credentials" USING btree ("_order");
  CREATE INDEX "instructors_credentials_parent_id_idx" ON "instructors_credentials" USING btree ("_parent_id");
  CREATE INDEX "instructors_stats_order_idx" ON "instructors_stats" USING btree ("_order");
  CREATE INDEX "instructors_stats_parent_id_idx" ON "instructors_stats" USING btree ("_parent_id");
  CREATE INDEX "instructors_avatar_idx" ON "instructors" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "instructors_slug_idx" ON "instructors" USING btree ("slug");
  CREATE INDEX "instructors_updated_at_idx" ON "instructors" USING btree ("updated_at");
  CREATE INDEX "instructors_created_at_idx" ON "instructors" USING btree ("created_at");
  CREATE INDEX "instructors__status_idx" ON "instructors" USING btree ("_status");
  CREATE INDEX "_instructors_v_version_credentials_order_idx" ON "_instructors_v_version_credentials" USING btree ("_order");
  CREATE INDEX "_instructors_v_version_credentials_parent_id_idx" ON "_instructors_v_version_credentials" USING btree ("_parent_id");
  CREATE INDEX "_instructors_v_version_stats_order_idx" ON "_instructors_v_version_stats" USING btree ("_order");
  CREATE INDEX "_instructors_v_version_stats_parent_id_idx" ON "_instructors_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_instructors_v_parent_idx" ON "_instructors_v" USING btree ("parent_id");
  CREATE INDEX "_instructors_v_version_version_avatar_idx" ON "_instructors_v" USING btree ("version_avatar_id");
  CREATE INDEX "_instructors_v_version_version_slug_idx" ON "_instructors_v" USING btree ("version_slug");
  CREATE INDEX "_instructors_v_version_version_updated_at_idx" ON "_instructors_v" USING btree ("version_updated_at");
  CREATE INDEX "_instructors_v_version_version_created_at_idx" ON "_instructors_v" USING btree ("version_created_at");
  CREATE INDEX "_instructors_v_version_version__status_idx" ON "_instructors_v" USING btree ("version__status");
  CREATE INDEX "_instructors_v_created_at_idx" ON "_instructors_v" USING btree ("created_at");
  CREATE INDEX "_instructors_v_updated_at_idx" ON "_instructors_v" USING btree ("updated_at");
  CREATE INDEX "_instructors_v_latest_idx" ON "_instructors_v" USING btree ("latest");
  CREATE INDEX "assessments_questions_options_order_idx" ON "assessments_questions_options" USING btree ("_order");
  CREATE INDEX "assessments_questions_options_parent_id_idx" ON "assessments_questions_options" USING btree ("_parent_id");
  CREATE INDEX "assessments_questions_order_idx" ON "assessments_questions" USING btree ("_order");
  CREATE INDEX "assessments_questions_parent_id_idx" ON "assessments_questions" USING btree ("_parent_id");
  CREATE INDEX "assessments_course_idx" ON "assessments" USING btree ("course_id");
  CREATE INDEX "assessments_updated_at_idx" ON "assessments" USING btree ("updated_at");
  CREATE INDEX "assessments_created_at_idx" ON "assessments" USING btree ("created_at");
  CREATE UNIQUE INDEX "free_trainings_slug_idx" ON "free_trainings" USING btree ("slug");
  CREATE INDEX "free_trainings_thumbnail_idx" ON "free_trainings" USING btree ("thumbnail_id");
  CREATE INDEX "free_trainings_seo_seo_og_image_idx" ON "free_trainings" USING btree ("seo_og_image_id");
  CREATE INDEX "free_trainings_updated_at_idx" ON "free_trainings" USING btree ("updated_at");
  CREATE INDEX "free_trainings_created_at_idx" ON "free_trainings" USING btree ("created_at");
  CREATE INDEX "free_trainings__status_idx" ON "free_trainings" USING btree ("_status");
  CREATE INDEX "_free_trainings_v_parent_idx" ON "_free_trainings_v" USING btree ("parent_id");
  CREATE INDEX "_free_trainings_v_version_version_slug_idx" ON "_free_trainings_v" USING btree ("version_slug");
  CREATE INDEX "_free_trainings_v_version_version_thumbnail_idx" ON "_free_trainings_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_free_trainings_v_version_seo_version_seo_og_image_idx" ON "_free_trainings_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_free_trainings_v_version_version_updated_at_idx" ON "_free_trainings_v" USING btree ("version_updated_at");
  CREATE INDEX "_free_trainings_v_version_version_created_at_idx" ON "_free_trainings_v" USING btree ("version_created_at");
  CREATE INDEX "_free_trainings_v_version_version__status_idx" ON "_free_trainings_v" USING btree ("version__status");
  CREATE INDEX "_free_trainings_v_created_at_idx" ON "_free_trainings_v" USING btree ("created_at");
  CREATE INDEX "_free_trainings_v_updated_at_idx" ON "_free_trainings_v" USING btree ("updated_at");
  CREATE INDEX "_free_trainings_v_latest_idx" ON "_free_trainings_v" USING btree ("latest");
  CREATE UNIQUE INDEX "downloads_slug_idx" ON "downloads" USING btree ("slug");
  CREATE INDEX "downloads_thumbnail_idx" ON "downloads" USING btree ("thumbnail_id");
  CREATE INDEX "downloads_file_idx" ON "downloads" USING btree ("file_id");
  CREATE INDEX "downloads_seo_seo_og_image_idx" ON "downloads" USING btree ("seo_og_image_id");
  CREATE INDEX "downloads_updated_at_idx" ON "downloads" USING btree ("updated_at");
  CREATE INDEX "downloads_created_at_idx" ON "downloads" USING btree ("created_at");
  CREATE INDEX "downloads__status_idx" ON "downloads" USING btree ("_status");
  CREATE INDEX "_downloads_v_parent_idx" ON "_downloads_v" USING btree ("parent_id");
  CREATE INDEX "_downloads_v_version_version_slug_idx" ON "_downloads_v" USING btree ("version_slug");
  CREATE INDEX "_downloads_v_version_version_thumbnail_idx" ON "_downloads_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_downloads_v_version_version_file_idx" ON "_downloads_v" USING btree ("version_file_id");
  CREATE INDEX "_downloads_v_version_seo_version_seo_og_image_idx" ON "_downloads_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_downloads_v_version_version_updated_at_idx" ON "_downloads_v" USING btree ("version_updated_at");
  CREATE INDEX "_downloads_v_version_version_created_at_idx" ON "_downloads_v" USING btree ("version_created_at");
  CREATE INDEX "_downloads_v_version_version__status_idx" ON "_downloads_v" USING btree ("version__status");
  CREATE INDEX "_downloads_v_created_at_idx" ON "_downloads_v" USING btree ("created_at");
  CREATE INDEX "_downloads_v_updated_at_idx" ON "_downloads_v" USING btree ("updated_at");
  CREATE INDEX "_downloads_v_latest_idx" ON "_downloads_v" USING btree ("latest");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_thumbnail_idx" ON "events" USING btree ("thumbnail_id");
  CREATE INDEX "events_seo_seo_og_image_idx" ON "events" USING btree ("seo_og_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_thumbnail_idx" ON "_events_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_events_v_version_seo_version_seo_og_image_idx" ON "_events_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_seo_seo_og_image_idx" ON "legal_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_slug_idx" ON "_legal_pages_v" USING btree ("version_slug");
  CREATE INDEX "_legal_pages_v_version_seo_version_seo_og_image_idx" ON "_legal_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  CREATE INDEX "enrollments_user_id_idx" ON "enrollments" USING btree ("user_id");
  CREATE INDEX "enrollments_course_idx" ON "enrollments" USING btree ("course_id");
  CREATE INDEX "enrollments_order_idx" ON "enrollments" USING btree ("order_id");
  CREATE INDEX "enrollments_updated_at_idx" ON "enrollments" USING btree ("updated_at");
  CREATE INDEX "enrollments_created_at_idx" ON "enrollments" USING btree ("created_at");
  CREATE INDEX "course_progress_completed_lessons_order_idx" ON "course_progress_completed_lessons" USING btree ("_order");
  CREATE INDEX "course_progress_completed_lessons_parent_id_idx" ON "course_progress_completed_lessons" USING btree ("_parent_id");
  CREATE INDEX "course_progress_user_id_idx" ON "course_progress" USING btree ("user_id");
  CREATE INDEX "course_progress_course_idx" ON "course_progress" USING btree ("course_id");
  CREATE INDEX "course_progress_created_at_idx" ON "course_progress" USING btree ("created_at");
  CREATE INDEX "quiz_attempts_user_id_idx" ON "quiz_attempts" USING btree ("user_id");
  CREATE INDEX "quiz_attempts_assessment_idx" ON "quiz_attempts" USING btree ("assessment_id");
  CREATE INDEX "quiz_attempts_course_idx" ON "quiz_attempts" USING btree ("course_id");
  CREATE INDEX "quiz_attempts_updated_at_idx" ON "quiz_attempts" USING btree ("updated_at");
  CREATE INDEX "quiz_attempts_created_at_idx" ON "quiz_attempts" USING btree ("created_at");
  CREATE INDEX "certificates_user_id_idx" ON "certificates" USING btree ("user_id");
  CREATE INDEX "certificates_course_idx" ON "certificates" USING btree ("course_id");
  CREATE UNIQUE INDEX "certificates_certificate_id_idx" ON "certificates" USING btree ("certificate_id");
  CREATE INDEX "certificates_pdf_idx" ON "certificates" USING btree ("pdf_id");
  CREATE INDEX "certificates_updated_at_idx" ON "certificates" USING btree ("updated_at");
  CREATE INDEX "certificates_created_at_idx" ON "certificates" USING btree ("created_at");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_user_id_idx" ON "orders" USING btree ("user_id");
  CREATE UNIQUE INDEX "orders_order_number_idx" ON "orders" USING btree ("order_number");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "entitlements_user_id_idx" ON "entitlements" USING btree ("user_id");
  CREATE INDEX "entitlements_product_idx" ON "entitlements" USING btree ("product_id");
  CREATE INDEX "entitlements_order_idx" ON "entitlements" USING btree ("order_id");
  CREATE INDEX "entitlements_updated_at_idx" ON "entitlements" USING btree ("updated_at");
  CREATE INDEX "entitlements_created_at_idx" ON "entitlements" USING btree ("created_at");
  CREATE UNIQUE INDEX "customer_profiles_user_id_idx" ON "customer_profiles" USING btree ("user_id");
  CREATE INDEX "customer_profiles_updated_at_idx" ON "customer_profiles" USING btree ("updated_at");
  CREATE UNIQUE INDEX "stripe_customers_user_id_idx" ON "stripe_customers" USING btree ("user_id");
  CREATE UNIQUE INDEX "stripe_customers_stripe_customer_id_idx" ON "stripe_customers" USING btree ("stripe_customer_id");
  CREATE INDEX "stripe_customers_updated_at_idx" ON "stripe_customers" USING btree ("updated_at");
  CREATE INDEX "stripe_customers_created_at_idx" ON "stripe_customers" USING btree ("created_at");
  CREATE UNIQUE INDEX "processed_stripe_events_event_id_idx" ON "processed_stripe_events" USING btree ("event_id");
  CREATE INDEX "processed_stripe_events_updated_at_idx" ON "processed_stripe_events" USING btree ("updated_at");
  CREATE INDEX "processed_stripe_events_created_at_idx" ON "processed_stripe_events" USING btree ("created_at");
  CREATE INDEX "site_set_social_links_order_idx" ON "site_set_social_links" USING btree ("_order");
  CREATE INDEX "site_set_social_links_parent_id_idx" ON "site_set_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_set_brand_brand_logo_idx" ON "site_set" USING btree ("brand_logo_id");
  CREATE INDEX "site_set_seo_seo_og_image_idx" ON "site_set" USING btree ("seo_og_image_id");
  CREATE INDEX "nav_hdr_nav_items_children_order_idx" ON "nav_hdr_nav_items_children" USING btree ("_order");
  CREATE INDEX "nav_hdr_nav_items_children_parent_id_idx" ON "nav_hdr_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "nav_hdr_nav_items_order_idx" ON "nav_hdr_nav_items" USING btree ("_order");
  CREATE INDEX "nav_hdr_nav_items_parent_id_idx" ON "nav_hdr_nav_items" USING btree ("_parent_id");
  CREATE INDEX "nav_ftr_closing_cta_ctas_order_idx" ON "nav_ftr_closing_cta_ctas" USING btree ("_order");
  CREATE INDEX "nav_ftr_closing_cta_ctas_parent_id_idx" ON "nav_ftr_closing_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "nav_ftr_columns_links_order_idx" ON "nav_ftr_columns_links" USING btree ("_order");
  CREATE INDEX "nav_ftr_columns_links_parent_id_idx" ON "nav_ftr_columns_links" USING btree ("_parent_id");
  CREATE INDEX "nav_ftr_columns_order_idx" ON "nav_ftr_columns" USING btree ("_order");
  CREATE INDEX "nav_ftr_columns_parent_id_idx" ON "nav_ftr_columns" USING btree ("_parent_id");
  CREATE INDEX "nav_ftr_standards_strip_order_idx" ON "nav_ftr_standards_strip" USING btree ("_order");
  CREATE INDEX "nav_ftr_standards_strip_parent_id_idx" ON "nav_ftr_standards_strip" USING btree ("_parent_id");
  CREATE INDEX "nav_ftr_legal_links_order_idx" ON "nav_ftr_legal_links" USING btree ("_order");
  CREATE INDEX "nav_ftr_legal_links_parent_id_idx" ON "nav_ftr_legal_links" USING btree ("_parent_id");
  CREATE INDEX "dash_onboarding_courses_step_points_order_idx" ON "dash_onboarding_courses_step_points" USING btree ("_order");
  CREATE INDEX "dash_onboarding_courses_step_points_parent_id_idx" ON "dash_onboarding_courses_step_points" USING btree ("_parent_id");
  CREATE INDEX "dash_onboarding_resources_step_points_order_idx" ON "dash_onboarding_resources_step_points" USING btree ("_order");
  CREATE INDEX "dash_onboarding_resources_step_points_parent_id_idx" ON "dash_onboarding_resources_step_points" USING btree ("_parent_id");
  CREATE INDEX "dash_seo_seo_og_image_idx" ON "dash" USING btree ("seo_og_image_id");
  CREATE INDEX "dash__status_idx" ON "dash" USING btree ("_status");
  CREATE INDEX "_dash_v_version_onboarding_courses_step_points_order_idx" ON "_dash_v_version_onboarding_courses_step_points" USING btree ("_order");
  CREATE INDEX "_dash_v_version_onboarding_courses_step_points_parent_id_idx" ON "_dash_v_version_onboarding_courses_step_points" USING btree ("_parent_id");
  CREATE INDEX "_dash_v_version_onboarding_resources_step_points_order_idx" ON "_dash_v_version_onboarding_resources_step_points" USING btree ("_order");
  CREATE INDEX "_dash_v_version_onboarding_resources_step_points_parent_id_idx" ON "_dash_v_version_onboarding_resources_step_points" USING btree ("_parent_id");
  CREATE INDEX "_dash_v_version_seo_version_seo_og_image_idx" ON "_dash_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_dash_v_version_version__status_idx" ON "_dash_v" USING btree ("version__status");
  CREATE INDEX "_dash_v_created_at_idx" ON "_dash_v" USING btree ("created_at");
  CREATE INDEX "_dash_v_updated_at_idx" ON "_dash_v" USING btree ("updated_at");
  CREATE INDEX "_dash_v_latest_idx" ON "_dash_v" USING btree ("latest");
  CREATE INDEX "portal_pg_seo_seo_og_image_idx" ON "portal_pg" USING btree ("seo_og_image_id");
  CREATE INDEX "portal_pg__status_idx" ON "portal_pg" USING btree ("_status");
  CREATE INDEX "_portal_pg_v_version_seo_version_seo_og_image_idx" ON "_portal_pg_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_portal_pg_v_version_version__status_idx" ON "_portal_pg_v" USING btree ("version__status");
  CREATE INDEX "_portal_pg_v_created_at_idx" ON "_portal_pg_v" USING btree ("created_at");
  CREATE INDEX "_portal_pg_v_updated_at_idx" ON "_portal_pg_v" USING btree ("updated_at");
  CREATE INDEX "_portal_pg_v_latest_idx" ON "_portal_pg_v" USING btree ("latest");
  CREATE INDEX "cart_pg_empty_cart_ctas_order_idx" ON "cart_pg_empty_cart_ctas" USING btree ("_order");
  CREATE INDEX "cart_pg_empty_cart_ctas_parent_id_idx" ON "cart_pg_empty_cart_ctas" USING btree ("_parent_id");
  CREATE INDEX "cart_pg_seo_seo_og_image_idx" ON "cart_pg" USING btree ("seo_og_image_id");
  CREATE INDEX "cart_pg__status_idx" ON "cart_pg" USING btree ("_status");
  CREATE INDEX "_cart_pg_v_version_empty_cart_ctas_order_idx" ON "_cart_pg_v_version_empty_cart_ctas" USING btree ("_order");
  CREATE INDEX "_cart_pg_v_version_empty_cart_ctas_parent_id_idx" ON "_cart_pg_v_version_empty_cart_ctas" USING btree ("_parent_id");
  CREATE INDEX "_cart_pg_v_version_seo_version_seo_og_image_idx" ON "_cart_pg_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_cart_pg_v_version_version__status_idx" ON "_cart_pg_v" USING btree ("version__status");
  CREATE INDEX "_cart_pg_v_created_at_idx" ON "_cart_pg_v" USING btree ("created_at");
  CREATE INDEX "_cart_pg_v_updated_at_idx" ON "_cart_pg_v" USING btree ("updated_at");
  CREATE INDEX "_cart_pg_v_latest_idx" ON "_cart_pg_v" USING btree ("latest");
  CREATE INDEX "checkout_seo_seo_og_image_idx" ON "checkout" USING btree ("seo_og_image_id");
  CREATE INDEX "checkout__status_idx" ON "checkout" USING btree ("_status");
  CREATE INDEX "_checkout_v_version_seo_version_seo_og_image_idx" ON "_checkout_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_checkout_v_version_version__status_idx" ON "_checkout_v" USING btree ("version__status");
  CREATE INDEX "_checkout_v_created_at_idx" ON "_checkout_v" USING btree ("created_at");
  CREATE INDEX "_checkout_v_updated_at_idx" ON "_checkout_v" USING btree ("updated_at");
  CREATE INDEX "_checkout_v_latest_idx" ON "_checkout_v" USING btree ("latest");
  CREATE INDEX "thanks_confirmed_ctas_order_idx" ON "thanks_confirmed_ctas" USING btree ("_order");
  CREATE INDEX "thanks_confirmed_ctas_parent_id_idx" ON "thanks_confirmed_ctas" USING btree ("_parent_id");
  CREATE INDEX "thanks_next_steps_steps_order_idx" ON "thanks_next_steps_steps" USING btree ("_order");
  CREATE INDEX "thanks_next_steps_steps_parent_id_idx" ON "thanks_next_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "thanks_seo_seo_og_image_idx" ON "thanks" USING btree ("seo_og_image_id");
  CREATE INDEX "thanks__status_idx" ON "thanks" USING btree ("_status");
  CREATE INDEX "_thanks_v_version_confirmed_ctas_order_idx" ON "_thanks_v_version_confirmed_ctas" USING btree ("_order");
  CREATE INDEX "_thanks_v_version_confirmed_ctas_parent_id_idx" ON "_thanks_v_version_confirmed_ctas" USING btree ("_parent_id");
  CREATE INDEX "_thanks_v_version_next_steps_steps_order_idx" ON "_thanks_v_version_next_steps_steps" USING btree ("_order");
  CREATE INDEX "_thanks_v_version_next_steps_steps_parent_id_idx" ON "_thanks_v_version_next_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_thanks_v_version_seo_version_seo_og_image_idx" ON "_thanks_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_thanks_v_version_version__status_idx" ON "_thanks_v" USING btree ("version__status");
  CREATE INDEX "_thanks_v_created_at_idx" ON "_thanks_v" USING btree ("created_at");
  CREATE INDEX "_thanks_v_updated_at_idx" ON "_thanks_v" USING btree ("updated_at");
  CREATE INDEX "_thanks_v_latest_idx" ON "_thanks_v" USING btree ("latest");
  CREATE INDEX "auth_pg_shared_trust_standards_order_idx" ON "auth_pg_shared_trust_standards" USING btree ("_order");
  CREATE INDEX "auth_pg_shared_trust_standards_parent_id_idx" ON "auth_pg_shared_trust_standards" USING btree ("_parent_id");
  CREATE INDEX "auth_pg_seo_seo_og_image_idx" ON "auth_pg" USING btree ("seo_og_image_id");
  CREATE INDEX "auth_pg__status_idx" ON "auth_pg" USING btree ("_status");
  CREATE INDEX "_auth_pg_v_version_shared_trust_standards_order_idx" ON "_auth_pg_v_version_shared_trust_standards" USING btree ("_order");
  CREATE INDEX "_auth_pg_v_version_shared_trust_standards_parent_id_idx" ON "_auth_pg_v_version_shared_trust_standards" USING btree ("_parent_id");
  CREATE INDEX "_auth_pg_v_version_seo_version_seo_og_image_idx" ON "_auth_pg_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_auth_pg_v_version_version__status_idx" ON "_auth_pg_v" USING btree ("version__status");
  CREATE INDEX "_auth_pg_v_created_at_idx" ON "_auth_pg_v" USING btree ("created_at");
  CREATE INDEX "_auth_pg_v_updated_at_idx" ON "_auth_pg_v" USING btree ("updated_at");
  CREATE INDEX "_auth_pg_v_latest_idx" ON "_auth_pg_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_home_fk" FOREIGN KEY ("home_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consulting_fk" FOREIGN KEY ("cons_id") REFERENCES "public"."cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_training_templates_fk" FOREIGN KEY ("trn_id") REFERENCES "public"."trn"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_company_fk" FOREIGN KEY ("comp_id") REFERENCES "public"."comp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_postings_fk" FOREIGN KEY ("job_postings_id") REFERENCES "public"."job_postings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("res_id") REFERENCES "public"."res"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partner_logos_fk" FOREIGN KEY ("p_logos_id") REFERENCES "public"."p_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trusted_logos_fk" FOREIGN KEY ("t_logos_id") REFERENCES "public"."t_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_instructors_fk" FOREIGN KEY ("instructors_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assessments_fk" FOREIGN KEY ("assessments_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_free_trainings_fk" FOREIGN KEY ("free_trainings_id") REFERENCES "public"."free_trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enrollments_fk" FOREIGN KEY ("enrollments_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_course_progress_fk" FOREIGN KEY ("course_progress_id") REFERENCES "public"."course_progress"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quiz_attempts_fk" FOREIGN KEY ("quiz_attempts_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificates_fk" FOREIGN KEY ("certificates_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_entitlements_fk" FOREIGN KEY ("entitlements_id") REFERENCES "public"."entitlements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customer_profiles_fk" FOREIGN KEY ("customer_profiles_id") REFERENCES "public"."customer_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stripe_customers_fk" FOREIGN KEY ("stripe_customers_id") REFERENCES "public"."stripe_customers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_processed_stripe_events_fk" FOREIGN KEY ("processed_stripe_events_id") REFERENCES "public"."processed_stripe_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_home_id_idx" ON "payload_locked_documents_rels" USING btree ("home_id");
  CREATE INDEX "payload_locked_documents_rels_cons_id_idx" ON "payload_locked_documents_rels" USING btree ("cons_id");
  CREATE INDEX "payload_locked_documents_rels_trn_id_idx" ON "payload_locked_documents_rels" USING btree ("trn_id");
  CREATE INDEX "payload_locked_documents_rels_comp_id_idx" ON "payload_locked_documents_rels" USING btree ("comp_id");
  CREATE INDEX "payload_locked_documents_rels_job_postings_id_idx" ON "payload_locked_documents_rels" USING btree ("job_postings_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_res_id_idx" ON "payload_locked_documents_rels" USING btree ("res_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_p_logos_id_idx" ON "payload_locked_documents_rels" USING btree ("p_logos_id");
  CREATE INDEX "payload_locked_documents_rels_t_logos_id_idx" ON "payload_locked_documents_rels" USING btree ("t_logos_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_instructors_id_idx" ON "payload_locked_documents_rels" USING btree ("instructors_id");
  CREATE INDEX "payload_locked_documents_rels_assessments_id_idx" ON "payload_locked_documents_rels" USING btree ("assessments_id");
  CREATE INDEX "payload_locked_documents_rels_free_trainings_id_idx" ON "payload_locked_documents_rels" USING btree ("free_trainings_id");
  CREATE INDEX "payload_locked_documents_rels_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("downloads_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_enrollments_id_idx" ON "payload_locked_documents_rels" USING btree ("enrollments_id");
  CREATE INDEX "payload_locked_documents_rels_course_progress_id_idx" ON "payload_locked_documents_rels" USING btree ("course_progress_id");
  CREATE INDEX "payload_locked_documents_rels_quiz_attempts_id_idx" ON "payload_locked_documents_rels" USING btree ("quiz_attempts_id");
  CREATE INDEX "payload_locked_documents_rels_certificates_id_idx" ON "payload_locked_documents_rels" USING btree ("certificates_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_entitlements_id_idx" ON "payload_locked_documents_rels" USING btree ("entitlements_id");
  CREATE INDEX "payload_locked_documents_rels_customer_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("customer_profiles_id");
  CREATE INDEX "payload_locked_documents_rels_stripe_customers_id_idx" ON "payload_locked_documents_rels" USING btree ("stripe_customers_id");
  CREATE INDEX "payload_locked_documents_rels_processed_stripe_events_id_idx" ON "payload_locked_documents_rels" USING btree ("processed_stripe_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_hero_systems_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_hero_systems" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_hero_ticker" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_cs_items_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_cs_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_pt_customers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_pt_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_pb_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_sv_services_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_sv_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_sv_industries_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_sv_industries_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_sv_industries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_sa_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_sa_never_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_ab_certs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_ab_experience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_ab_conferences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_nw_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_hero_systems_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_hero_systems" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_hero_ticker" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_cs_items_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_cs_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_pt_customers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_pt_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_pb_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_sv_services_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_sv_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_sv_industries_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_sv_industries_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_sv_industries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_sa_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_sa_never_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_ab_certs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_ab_experience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_ab_conferences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_nw_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_hero_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_hero_lifecycle" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_caps_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_std_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_feat_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_facts_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_about_creds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_opts_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_ind_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_hero_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_hero_lifecycle" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_caps_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_std_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_feat_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_facts_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_about_creds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_opts_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_ind_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v_version_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cons_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn_hero_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn_ways_items_meta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn_ways_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn_val_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn_trk_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn_off_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn_cat_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn_cta_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trn" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v_version_hero_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v_version_ways_items_meta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v_version_ways_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v_version_val_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v_version_trk_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v_version_off_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v_version_cat_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v_version_cta_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trn_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_hero_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_hud_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_val_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_caps_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_case_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_svc_categories_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_svc_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_eng_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_role_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp_close_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comp" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_hero_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_hud_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_val_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_caps_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_case_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_svc_categories_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_svc_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_eng_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_role_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v_version_close_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comp_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_postings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_job_postings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members_credentials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_members_v_version_credentials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_members_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_hero_jump_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_tools_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_lib_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_fw_items_codes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_fw_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_how_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_list_filters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_list_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res_feat_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "res" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_hero_jump_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_tools_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_lib_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_fw_items_codes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_fw_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_how_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_list_filters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_list_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v_version_feat_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_res_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v_version_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_problem_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_solution_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_result_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_closing_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_problem_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_solution_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_result_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_closing_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "p_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "t_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_testimonials_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_whats_included" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_whats_included" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_track" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_format" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_modules_lessons_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_modules_lessons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_track" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_format" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_modules_lessons_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_modules_lessons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructors_credentials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructors_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instructors_v_version_credentials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instructors_v_version_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instructors_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_questions_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "free_trainings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_free_trainings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_downloads_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "enrollments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "course_progress_completed_lessons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "course_progress" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quiz_attempts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "entitlements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "customer_profiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stripe_customers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "processed_stripe_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_set_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_set" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_hdr_nav_items_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_hdr_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_hdr" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_ftr_closing_cta_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_ftr_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_ftr_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_ftr_standards_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_ftr_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_ftr" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dash_onboarding_courses_step_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dash_onboarding_resources_step_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dash" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dash_v_version_onboarding_courses_step_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dash_v_version_onboarding_resources_step_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dash_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portal_pg" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portal_pg_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cart_pg_empty_cart_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cart_pg" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cart_pg_v_version_empty_cart_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cart_pg_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "checkout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_checkout_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "thanks_confirmed_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "thanks_next_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "thanks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_thanks_v_version_confirmed_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_thanks_v_version_next_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_thanks_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "auth_pg_shared_trust_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "auth_pg" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_auth_pg_v_version_shared_trust_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_auth_pg_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_hero_systems_standards" CASCADE;
  DROP TABLE "home_hero_systems" CASCADE;
  DROP TABLE "home_hero_ticker" CASCADE;
  DROP TABLE "home_cs_items_standards" CASCADE;
  DROP TABLE "home_cs_items" CASCADE;
  DROP TABLE "home_pt_customers" CASCADE;
  DROP TABLE "home_pt_partners" CASCADE;
  DROP TABLE "home_pb_solutions" CASCADE;
  DROP TABLE "home_sv_services_points" CASCADE;
  DROP TABLE "home_sv_services" CASCADE;
  DROP TABLE "home_sv_industries_points" CASCADE;
  DROP TABLE "home_sv_industries_standards" CASCADE;
  DROP TABLE "home_sv_industries" CASCADE;
  DROP TABLE "home_sa_rows" CASCADE;
  DROP TABLE "home_sa_never_items" CASCADE;
  DROP TABLE "home_ab_certs" CASCADE;
  DROP TABLE "home_ab_experience" CASCADE;
  DROP TABLE "home_ab_conferences" CASCADE;
  DROP TABLE "home_nw_articles" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_version_hero_systems_standards" CASCADE;
  DROP TABLE "_home_v_version_hero_systems" CASCADE;
  DROP TABLE "_home_v_version_hero_ticker" CASCADE;
  DROP TABLE "_home_v_version_cs_items_standards" CASCADE;
  DROP TABLE "_home_v_version_cs_items" CASCADE;
  DROP TABLE "_home_v_version_pt_customers" CASCADE;
  DROP TABLE "_home_v_version_pt_partners" CASCADE;
  DROP TABLE "_home_v_version_pb_solutions" CASCADE;
  DROP TABLE "_home_v_version_sv_services_points" CASCADE;
  DROP TABLE "_home_v_version_sv_services" CASCADE;
  DROP TABLE "_home_v_version_sv_industries_points" CASCADE;
  DROP TABLE "_home_v_version_sv_industries_standards" CASCADE;
  DROP TABLE "_home_v_version_sv_industries" CASCADE;
  DROP TABLE "_home_v_version_sa_rows" CASCADE;
  DROP TABLE "_home_v_version_sa_never_items" CASCADE;
  DROP TABLE "_home_v_version_ab_certs" CASCADE;
  DROP TABLE "_home_v_version_ab_experience" CASCADE;
  DROP TABLE "_home_v_version_ab_conferences" CASCADE;
  DROP TABLE "_home_v_version_nw_articles" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "cons_hero_standards" CASCADE;
  DROP TABLE "cons_hero_lifecycle" CASCADE;
  DROP TABLE "cons_caps_items" CASCADE;
  DROP TABLE "cons_std_items" CASCADE;
  DROP TABLE "cons_feat_items" CASCADE;
  DROP TABLE "cons_facts_items" CASCADE;
  DROP TABLE "cons_about_creds" CASCADE;
  DROP TABLE "cons_opts_items" CASCADE;
  DROP TABLE "cons_ind_items" CASCADE;
  DROP TABLE "cons_faq_items" CASCADE;
  DROP TABLE "cons" CASCADE;
  DROP TABLE "_cons_v_version_hero_standards" CASCADE;
  DROP TABLE "_cons_v_version_hero_lifecycle" CASCADE;
  DROP TABLE "_cons_v_version_caps_items" CASCADE;
  DROP TABLE "_cons_v_version_std_items" CASCADE;
  DROP TABLE "_cons_v_version_feat_items" CASCADE;
  DROP TABLE "_cons_v_version_facts_items" CASCADE;
  DROP TABLE "_cons_v_version_about_creds" CASCADE;
  DROP TABLE "_cons_v_version_opts_items" CASCADE;
  DROP TABLE "_cons_v_version_ind_items" CASCADE;
  DROP TABLE "_cons_v_version_faq_items" CASCADE;
  DROP TABLE "_cons_v" CASCADE;
  DROP TABLE "trn_hero_standards" CASCADE;
  DROP TABLE "trn_ways_items_meta" CASCADE;
  DROP TABLE "trn_ways_items" CASCADE;
  DROP TABLE "trn_val_items" CASCADE;
  DROP TABLE "trn_trk_items" CASCADE;
  DROP TABLE "trn_off_items" CASCADE;
  DROP TABLE "trn_cat_items" CASCADE;
  DROP TABLE "trn_cta_stats" CASCADE;
  DROP TABLE "trn" CASCADE;
  DROP TABLE "_trn_v_version_hero_standards" CASCADE;
  DROP TABLE "_trn_v_version_ways_items_meta" CASCADE;
  DROP TABLE "_trn_v_version_ways_items" CASCADE;
  DROP TABLE "_trn_v_version_val_items" CASCADE;
  DROP TABLE "_trn_v_version_trk_items" CASCADE;
  DROP TABLE "_trn_v_version_off_items" CASCADE;
  DROP TABLE "_trn_v_version_cat_items" CASCADE;
  DROP TABLE "_trn_v_version_cta_stats" CASCADE;
  DROP TABLE "_trn_v" CASCADE;
  DROP TABLE "comp_hero_standards" CASCADE;
  DROP TABLE "comp_hero_actions" CASCADE;
  DROP TABLE "comp_hud_rows" CASCADE;
  DROP TABLE "comp_val_items" CASCADE;
  DROP TABLE "comp_caps_items" CASCADE;
  DROP TABLE "comp_case_items" CASCADE;
  DROP TABLE "comp_svc_categories_points" CASCADE;
  DROP TABLE "comp_svc_categories" CASCADE;
  DROP TABLE "comp_eng_models" CASCADE;
  DROP TABLE "comp_role_items" CASCADE;
  DROP TABLE "comp_close_actions" CASCADE;
  DROP TABLE "comp" CASCADE;
  DROP TABLE "_comp_v_version_hero_standards" CASCADE;
  DROP TABLE "_comp_v_version_hero_actions" CASCADE;
  DROP TABLE "_comp_v_version_hud_rows" CASCADE;
  DROP TABLE "_comp_v_version_val_items" CASCADE;
  DROP TABLE "_comp_v_version_caps_items" CASCADE;
  DROP TABLE "_comp_v_version_case_items" CASCADE;
  DROP TABLE "_comp_v_version_svc_categories_points" CASCADE;
  DROP TABLE "_comp_v_version_svc_categories" CASCADE;
  DROP TABLE "_comp_v_version_eng_models" CASCADE;
  DROP TABLE "_comp_v_version_role_items" CASCADE;
  DROP TABLE "_comp_v_version_close_actions" CASCADE;
  DROP TABLE "_comp_v" CASCADE;
  DROP TABLE "job_postings" CASCADE;
  DROP TABLE "_job_postings_v" CASCADE;
  DROP TABLE "team_members_credentials" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "_team_members_v_version_credentials" CASCADE;
  DROP TABLE "_team_members_v" CASCADE;
  DROP TABLE "res_hero_jump_links" CASCADE;
  DROP TABLE "res_tools_items" CASCADE;
  DROP TABLE "res_lib_items" CASCADE;
  DROP TABLE "res_fw_items_codes" CASCADE;
  DROP TABLE "res_fw_items" CASCADE;
  DROP TABLE "res_how_steps" CASCADE;
  DROP TABLE "res_list_filters" CASCADE;
  DROP TABLE "res_list_cards" CASCADE;
  DROP TABLE "res_feat_items" CASCADE;
  DROP TABLE "res" CASCADE;
  DROP TABLE "_res_v_version_hero_jump_links" CASCADE;
  DROP TABLE "_res_v_version_tools_items" CASCADE;
  DROP TABLE "_res_v_version_lib_items" CASCADE;
  DROP TABLE "_res_v_version_fw_items_codes" CASCADE;
  DROP TABLE "_res_v_version_fw_items" CASCADE;
  DROP TABLE "_res_v_version_how_steps" CASCADE;
  DROP TABLE "_res_v_version_list_filters" CASCADE;
  DROP TABLE "_res_v_version_list_cards" CASCADE;
  DROP TABLE "_res_v_version_feat_items" CASCADE;
  DROP TABLE "_res_v" CASCADE;
  DROP TABLE "articles_topics" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v_version_topics" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "case_studies_standards" CASCADE;
  DROP TABLE "case_studies_problem_points" CASCADE;
  DROP TABLE "case_studies_solution_points" CASCADE;
  DROP TABLE "case_studies_result_metrics" CASCADE;
  DROP TABLE "case_studies_metrics" CASCADE;
  DROP TABLE "case_studies_closing_buttons" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_rels" CASCADE;
  DROP TABLE "_case_studies_v_version_standards" CASCADE;
  DROP TABLE "_case_studies_v_version_problem_points" CASCADE;
  DROP TABLE "_case_studies_v_version_solution_points" CASCADE;
  DROP TABLE "_case_studies_v_version_result_metrics" CASCADE;
  DROP TABLE "_case_studies_v_version_metrics" CASCADE;
  DROP TABLE "_case_studies_v_version_closing_buttons" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP TABLE "_case_studies_v_rels" CASCADE;
  DROP TABLE "p_logos" CASCADE;
  DROP TABLE "t_logos" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "products_standards" CASCADE;
  DROP TABLE "products_whats_included" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_standards" CASCADE;
  DROP TABLE "_products_v_version_whats_included" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "courses_track" CASCADE;
  DROP TABLE "courses_format" CASCADE;
  DROP TABLE "courses_outcomes" CASCADE;
  DROP TABLE "courses_modules_lessons_resources" CASCADE;
  DROP TABLE "courses_modules_lessons" CASCADE;
  DROP TABLE "courses_modules" CASCADE;
  DROP TABLE "courses_standards" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "_courses_v_version_track" CASCADE;
  DROP TABLE "_courses_v_version_format" CASCADE;
  DROP TABLE "_courses_v_version_outcomes" CASCADE;
  DROP TABLE "_courses_v_version_modules_lessons_resources" CASCADE;
  DROP TABLE "_courses_v_version_modules_lessons" CASCADE;
  DROP TABLE "_courses_v_version_modules" CASCADE;
  DROP TABLE "_courses_v_version_standards" CASCADE;
  DROP TABLE "_courses_v" CASCADE;
  DROP TABLE "instructors_credentials" CASCADE;
  DROP TABLE "instructors_stats" CASCADE;
  DROP TABLE "instructors" CASCADE;
  DROP TABLE "_instructors_v_version_credentials" CASCADE;
  DROP TABLE "_instructors_v_version_stats" CASCADE;
  DROP TABLE "_instructors_v" CASCADE;
  DROP TABLE "assessments_questions_options" CASCADE;
  DROP TABLE "assessments_questions" CASCADE;
  DROP TABLE "assessments" CASCADE;
  DROP TABLE "free_trainings" CASCADE;
  DROP TABLE "_free_trainings_v" CASCADE;
  DROP TABLE "downloads" CASCADE;
  DROP TABLE "_downloads_v" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  DROP TABLE "enrollments" CASCADE;
  DROP TABLE "course_progress_completed_lessons" CASCADE;
  DROP TABLE "course_progress" CASCADE;
  DROP TABLE "quiz_attempts" CASCADE;
  DROP TABLE "certificates" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "entitlements" CASCADE;
  DROP TABLE "customer_profiles" CASCADE;
  DROP TABLE "stripe_customers" CASCADE;
  DROP TABLE "processed_stripe_events" CASCADE;
  DROP TABLE "site_set_social_links" CASCADE;
  DROP TABLE "site_set" CASCADE;
  DROP TABLE "nav_hdr_nav_items_children" CASCADE;
  DROP TABLE "nav_hdr_nav_items" CASCADE;
  DROP TABLE "nav_hdr" CASCADE;
  DROP TABLE "nav_ftr_closing_cta_ctas" CASCADE;
  DROP TABLE "nav_ftr_columns_links" CASCADE;
  DROP TABLE "nav_ftr_columns" CASCADE;
  DROP TABLE "nav_ftr_standards_strip" CASCADE;
  DROP TABLE "nav_ftr_legal_links" CASCADE;
  DROP TABLE "nav_ftr" CASCADE;
  DROP TABLE "dash_onboarding_courses_step_points" CASCADE;
  DROP TABLE "dash_onboarding_resources_step_points" CASCADE;
  DROP TABLE "dash" CASCADE;
  DROP TABLE "_dash_v_version_onboarding_courses_step_points" CASCADE;
  DROP TABLE "_dash_v_version_onboarding_resources_step_points" CASCADE;
  DROP TABLE "_dash_v" CASCADE;
  DROP TABLE "portal_pg" CASCADE;
  DROP TABLE "_portal_pg_v" CASCADE;
  DROP TABLE "cart_pg_empty_cart_ctas" CASCADE;
  DROP TABLE "cart_pg" CASCADE;
  DROP TABLE "_cart_pg_v_version_empty_cart_ctas" CASCADE;
  DROP TABLE "_cart_pg_v" CASCADE;
  DROP TABLE "checkout" CASCADE;
  DROP TABLE "_checkout_v" CASCADE;
  DROP TABLE "thanks_confirmed_ctas" CASCADE;
  DROP TABLE "thanks_next_steps_steps" CASCADE;
  DROP TABLE "thanks" CASCADE;
  DROP TABLE "_thanks_v_version_confirmed_ctas" CASCADE;
  DROP TABLE "_thanks_v_version_next_steps_steps" CASCADE;
  DROP TABLE "_thanks_v" CASCADE;
  DROP TABLE "auth_pg_shared_trust_standards" CASCADE;
  DROP TABLE "auth_pg" CASCADE;
  DROP TABLE "_auth_pg_v_version_shared_trust_standards" CASCADE;
  DROP TABLE "_auth_pg_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_home_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_consulting_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_training_templates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_company_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_job_postings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_articles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_case_studies_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_partner_logos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_trusted_logos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_courses_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_instructors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_assessments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_free_trainings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_downloads_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_legal_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_enrollments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_course_progress_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quiz_attempts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_certificates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_orders_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_entitlements_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_customer_profiles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_stripe_customers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_processed_stripe_events_fk";
  
  DROP INDEX "payload_locked_documents_rels_home_id_idx";
  DROP INDEX "payload_locked_documents_rels_cons_id_idx";
  DROP INDEX "payload_locked_documents_rels_trn_id_idx";
  DROP INDEX "payload_locked_documents_rels_comp_id_idx";
  DROP INDEX "payload_locked_documents_rels_job_postings_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_res_id_idx";
  DROP INDEX "payload_locked_documents_rels_articles_id_idx";
  DROP INDEX "payload_locked_documents_rels_case_studies_id_idx";
  DROP INDEX "payload_locked_documents_rels_p_logos_id_idx";
  DROP INDEX "payload_locked_documents_rels_t_logos_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_courses_id_idx";
  DROP INDEX "payload_locked_documents_rels_instructors_id_idx";
  DROP INDEX "payload_locked_documents_rels_assessments_id_idx";
  DROP INDEX "payload_locked_documents_rels_free_trainings_id_idx";
  DROP INDEX "payload_locked_documents_rels_downloads_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_legal_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_enrollments_id_idx";
  DROP INDEX "payload_locked_documents_rels_course_progress_id_idx";
  DROP INDEX "payload_locked_documents_rels_quiz_attempts_id_idx";
  DROP INDEX "payload_locked_documents_rels_certificates_id_idx";
  DROP INDEX "payload_locked_documents_rels_orders_id_idx";
  DROP INDEX "payload_locked_documents_rels_entitlements_id_idx";
  DROP INDEX "payload_locked_documents_rels_customer_profiles_id_idx";
  DROP INDEX "payload_locked_documents_rels_stripe_customers_id_idx";
  DROP INDEX "payload_locked_documents_rels_processed_stripe_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "home_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "cons_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "trn_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "comp_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "job_postings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "res_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "articles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "case_studies_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "p_logos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "t_logos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "courses_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "instructors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "assessments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "free_trainings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "downloads_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "legal_pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "enrollments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "course_progress_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "quiz_attempts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "certificates_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "orders_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "entitlements_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "customer_profiles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "stripe_customers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "processed_stripe_events_id";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum_cons_feat_kind";
  DROP TYPE "public"."enum_cons_status";
  DROP TYPE "public"."enum__cons_v_version_feat_kind";
  DROP TYPE "public"."enum__cons_v_version_status";
  DROP TYPE "public"."enum_trn_status";
  DROP TYPE "public"."enum__trn_v_version_status";
  DROP TYPE "public"."enum_comp_hero_actions_style";
  DROP TYPE "public"."enum_comp_close_actions_style";
  DROP TYPE "public"."enum_comp_status";
  DROP TYPE "public"."enum__comp_v_version_hero_actions_style";
  DROP TYPE "public"."enum__comp_v_version_close_actions_style";
  DROP TYPE "public"."enum__comp_v_version_status";
  DROP TYPE "public"."enum_job_postings_type";
  DROP TYPE "public"."enum_job_postings_status";
  DROP TYPE "public"."enum__job_postings_v_version_type";
  DROP TYPE "public"."enum__job_postings_v_version_status";
  DROP TYPE "public"."enum_team_members_status";
  DROP TYPE "public"."enum__team_members_v_version_status";
  DROP TYPE "public"."enum_res_status";
  DROP TYPE "public"."enum__res_v_version_status";
  DROP TYPE "public"."enum_articles_category";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_category";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_case_studies_closing_buttons_style";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum__case_studies_v_version_closing_buttons_style";
  DROP TYPE "public"."enum__case_studies_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_products_type";
  DROP TYPE "public"."enum_products_category";
  DROP TYPE "public"."enum_products_doc_type";
  DROP TYPE "public"."enum_products_format";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_type";
  DROP TYPE "public"."enum__products_v_version_category";
  DROP TYPE "public"."enum__products_v_version_doc_type";
  DROP TYPE "public"."enum__products_v_version_format";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum_courses_track";
  DROP TYPE "public"."enum_courses_format";
  DROP TYPE "public"."enum_courses_level";
  DROP TYPE "public"."enum_courses_status";
  DROP TYPE "public"."enum__courses_v_version_track";
  DROP TYPE "public"."enum__courses_v_version_format";
  DROP TYPE "public"."enum__courses_v_version_level";
  DROP TYPE "public"."enum__courses_v_version_status";
  DROP TYPE "public"."enum_instructors_status";
  DROP TYPE "public"."enum__instructors_v_version_status";
  DROP TYPE "public"."enum_free_trainings_level";
  DROP TYPE "public"."enum_free_trainings_status";
  DROP TYPE "public"."enum__free_trainings_v_version_level";
  DROP TYPE "public"."enum__free_trainings_v_version_status";
  DROP TYPE "public"."enum_downloads_category";
  DROP TYPE "public"."enum_downloads_file_type";
  DROP TYPE "public"."enum_downloads_status";
  DROP TYPE "public"."enum__downloads_v_version_category";
  DROP TYPE "public"."enum__downloads_v_version_file_type";
  DROP TYPE "public"."enum__downloads_v_version_status";
  DROP TYPE "public"."enum_events_type";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_type";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_status";
  DROP TYPE "public"."enum_enrollments_status";
  DROP TYPE "public"."enum_enrollments_source";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_site_set_social_links_platform";
  DROP TYPE "public"."enum_nav_hdr_cta_style";
  DROP TYPE "public"."enum_nav_ftr_closing_cta_ctas_style";
  DROP TYPE "public"."enum_dash_status";
  DROP TYPE "public"."enum__dash_v_version_status";
  DROP TYPE "public"."enum_portal_pg_status";
  DROP TYPE "public"."enum__portal_pg_v_version_status";
  DROP TYPE "public"."enum_cart_pg_empty_cart_ctas_style";
  DROP TYPE "public"."enum_cart_pg_status";
  DROP TYPE "public"."enum__cart_pg_v_version_empty_cart_ctas_style";
  DROP TYPE "public"."enum__cart_pg_v_version_status";
  DROP TYPE "public"."enum_checkout_status";
  DROP TYPE "public"."enum__checkout_v_version_status";
  DROP TYPE "public"."enum_thanks_confirmed_ctas_style";
  DROP TYPE "public"."enum_thanks_status";
  DROP TYPE "public"."enum__thanks_v_version_confirmed_ctas_style";
  DROP TYPE "public"."enum__thanks_v_version_status";
  DROP TYPE "public"."enum_auth_pg_status";
  DROP TYPE "public"."enum__auth_pg_v_version_status";`)
}
