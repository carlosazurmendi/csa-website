import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_free_trainings_resource_type" AS ENUM('video', 'document', 'presentation');
  CREATE TYPE "public"."enum_free_trainings_release_status" AS ENUM('published', 'soon');
  CREATE TYPE "public"."enum__free_trainings_v_version_resource_type" AS ENUM('video', 'document', 'presentation');
  CREATE TYPE "public"."enum__free_trainings_v_version_release_status" AS ENUM('published', 'soon');
  CREATE TABLE "courses_modules_lessons_key_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "courses_modules_lessons_quiz_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "courses_modules_lessons_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prompt" varchar,
  	"answer_index" numeric DEFAULT 0,
  	"explanation" varchar
  );
  
  CREATE TABLE "_courses_v_version_modules_lessons_key_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_modules_lessons_quiz_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_modules_lessons_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prompt" varchar,
  	"answer_index" numeric DEFAULT 0,
  	"explanation" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "protected_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
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
  
  CREATE TABLE "certificates_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL
  );
  
  CREATE TABLE "chat_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"icon" varchar DEFAULT 'folder',
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "chat_threads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" varchar NOT NULL,
  	"project_id" integer,
  	"title" varchar DEFAULT 'New chat',
  	"messages" jsonb DEFAULT '[]'::jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "products" DROP CONSTRAINT "products_downloadable_file_id_media_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_downloadable_file_id_media_id_fk";
  
  ALTER TABLE "courses_modules_lessons" DROP CONSTRAINT "courses_modules_lessons_video_id_media_id_fk";
  
  ALTER TABLE "_courses_v_version_modules_lessons" DROP CONSTRAINT "_courses_v_version_modules_lessons_video_id_media_id_fk";
  
  ALTER TABLE "home_cs_items" ADD COLUMN "cover_id" integer;
  ALTER TABLE "home" ADD COLUMN "ab_portrait_id" integer;
  ALTER TABLE "_home_v_version_cs_items" ADD COLUMN "cover_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN "version_ab_portrait_id" integer;
  ALTER TABLE "comp_case_items" ADD COLUMN "case_study_id" integer;
  ALTER TABLE "_comp_v_version_case_items" ADD COLUMN "case_study_id" integer;
  ALTER TABLE "courses_modules_lessons_resources" ADD COLUMN "name" varchar;
  ALTER TABLE "courses_modules_lessons_resources" ADD COLUMN "type" varchar;
  ALTER TABLE "courses_modules_lessons_resources" ADD COLUMN "size_label" varchar;
  ALTER TABLE "courses_modules_lessons" ADD COLUMN "video_url" varchar;
  ALTER TABLE "courses_modules_lessons" ADD COLUMN "quiz_pass_score" numeric DEFAULT 100;
  ALTER TABLE "courses" ADD COLUMN "enroll_cta_label" varchar DEFAULT 'Enroll Now';
  ALTER TABLE "_courses_v_version_modules_lessons_resources" ADD COLUMN "name" varchar;
  ALTER TABLE "_courses_v_version_modules_lessons_resources" ADD COLUMN "type" varchar;
  ALTER TABLE "_courses_v_version_modules_lessons_resources" ADD COLUMN "size_label" varchar;
  ALTER TABLE "_courses_v_version_modules_lessons" ADD COLUMN "video_url" varchar;
  ALTER TABLE "_courses_v_version_modules_lessons" ADD COLUMN "quiz_pass_score" numeric DEFAULT 100;
  ALTER TABLE "_courses_v" ADD COLUMN "version_enroll_cta_label" varchar DEFAULT 'Enroll Now';
  ALTER TABLE "free_trainings" ADD COLUMN "resource_type" "enum_free_trainings_resource_type" DEFAULT 'video';
  ALTER TABLE "free_trainings" ADD COLUMN "release_status" "enum_free_trainings_release_status" DEFAULT 'published';
  ALTER TABLE "free_trainings" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "_free_trainings_v" ADD COLUMN "version_resource_type" "enum__free_trainings_v_version_resource_type" DEFAULT 'video';
  ALTER TABLE "_free_trainings_v" ADD COLUMN "version_release_status" "enum__free_trainings_v_version_release_status" DEFAULT 'published';
  ALTER TABLE "_free_trainings_v" ADD COLUMN "version_cta_label" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filename" varchar;
  ALTER TABLE "certificates" ADD COLUMN "recipient_company" varchar;
  ALTER TABLE "certificates" ADD COLUMN "course_title" varchar;
  ALTER TABLE "certificates" ADD COLUMN "credential" varchar DEFAULT 'Certificate of Completion';
  ALTER TABLE "certificates" ADD COLUMN "score" numeric;
  ALTER TABLE "certificates" ADD COLUMN "hours" varchar;
  ALTER TABLE "certificates" ADD COLUMN "expires_at" timestamp(3) with time zone;
  ALTER TABLE "certificates" ADD COLUMN "instructor_name" varchar DEFAULT 'Ben Twombly';
  ALTER TABLE "certificates" ADD COLUMN "instructor_title" varchar DEFAULT 'Founder & Principal Safety Engineer · TÜV FS Eng., IFSP';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "protected_media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "chat_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "chat_threads_id" integer;
  ALTER TABLE "courses_modules_lessons_key_points" ADD CONSTRAINT "courses_modules_lessons_key_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_modules_lessons_quiz_questions_options" ADD CONSTRAINT "courses_modules_lessons_quiz_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_modules_lessons_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_modules_lessons_quiz_questions" ADD CONSTRAINT "courses_modules_lessons_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons_key_points" ADD CONSTRAINT "_courses_v_version_modules_lessons_key_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons_quiz_questions_options" ADD CONSTRAINT "_courses_v_version_modules_lessons_quiz_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_modules_lessons_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons_quiz_questions" ADD CONSTRAINT "_courses_v_version_modules_lessons_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certificates_standards" ADD CONSTRAINT "certificates_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_threads" ADD CONSTRAINT "chat_threads_project_id_chat_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."chat_projects"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "courses_modules_lessons_key_points_order_idx" ON "courses_modules_lessons_key_points" USING btree ("_order");
  CREATE INDEX "courses_modules_lessons_key_points_parent_id_idx" ON "courses_modules_lessons_key_points" USING btree ("_parent_id");
  CREATE INDEX "courses_modules_lessons_quiz_questions_options_order_idx" ON "courses_modules_lessons_quiz_questions_options" USING btree ("_order");
  CREATE INDEX "courses_modules_lessons_quiz_questions_options_parent_id_idx" ON "courses_modules_lessons_quiz_questions_options" USING btree ("_parent_id");
  CREATE INDEX "courses_modules_lessons_quiz_questions_order_idx" ON "courses_modules_lessons_quiz_questions" USING btree ("_order");
  CREATE INDEX "courses_modules_lessons_quiz_questions_parent_id_idx" ON "courses_modules_lessons_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_modules_lessons_key_points_order_idx" ON "_courses_v_version_modules_lessons_key_points" USING btree ("_order");
  CREATE INDEX "_courses_v_version_modules_lessons_key_points_parent_id_idx" ON "_courses_v_version_modules_lessons_key_points" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_modules_lessons_quiz_questions_options_order_idx" ON "_courses_v_version_modules_lessons_quiz_questions_options" USING btree ("_order");
  CREATE INDEX "_courses_v_version_modules_lessons_quiz_questions_options_parent_id_idx" ON "_courses_v_version_modules_lessons_quiz_questions_options" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_modules_lessons_quiz_questions_order_idx" ON "_courses_v_version_modules_lessons_quiz_questions" USING btree ("_order");
  CREATE INDEX "_courses_v_version_modules_lessons_quiz_questions_parent_id_idx" ON "_courses_v_version_modules_lessons_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "protected_media_updated_at_idx" ON "protected_media" USING btree ("updated_at");
  CREATE INDEX "protected_media_created_at_idx" ON "protected_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "protected_media_filename_idx" ON "protected_media" USING btree ("filename");
  CREATE INDEX "certificates_standards_order_idx" ON "certificates_standards" USING btree ("_order");
  CREATE INDEX "certificates_standards_parent_id_idx" ON "certificates_standards" USING btree ("_parent_id");
  CREATE INDEX "chat_projects_user_id_idx" ON "chat_projects" USING btree ("user_id");
  CREATE INDEX "chat_projects_updated_at_idx" ON "chat_projects" USING btree ("updated_at");
  CREATE INDEX "chat_projects_created_at_idx" ON "chat_projects" USING btree ("created_at");
  CREATE INDEX "chat_threads_user_id_idx" ON "chat_threads" USING btree ("user_id");
  CREATE INDEX "chat_threads_project_idx" ON "chat_threads" USING btree ("project_id");
  CREATE INDEX "chat_threads_updated_at_idx" ON "chat_threads" USING btree ("updated_at");
  CREATE INDEX "chat_threads_created_at_idx" ON "chat_threads" USING btree ("created_at");
  ALTER TABLE "home_cs_items" ADD CONSTRAINT "home_cs_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_ab_portrait_id_media_id_fk" FOREIGN KEY ("ab_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_cs_items" ADD CONSTRAINT "_home_v_version_cs_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_ab_portrait_id_media_id_fk" FOREIGN KEY ("version_ab_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comp_case_items" ADD CONSTRAINT "comp_case_items_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_comp_v_version_case_items" ADD CONSTRAINT "_comp_v_version_case_items_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_downloadable_file_id_protected_media_id_fk" FOREIGN KEY ("downloadable_file_id") REFERENCES "public"."protected_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_downloadable_file_id_protected_media_id_fk" FOREIGN KEY ("version_downloadable_file_id") REFERENCES "public"."protected_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_modules_lessons" ADD CONSTRAINT "courses_modules_lessons_video_id_protected_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."protected_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons" ADD CONSTRAINT "_courses_v_version_modules_lessons_video_id_protected_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."protected_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_protected_media_fk" FOREIGN KEY ("protected_media_id") REFERENCES "public"."protected_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chat_projects_fk" FOREIGN KEY ("chat_projects_id") REFERENCES "public"."chat_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chat_threads_fk" FOREIGN KEY ("chat_threads_id") REFERENCES "public"."chat_threads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_cs_items_cover_idx" ON "home_cs_items" USING btree ("cover_id");
  CREATE INDEX "home_ab_portrait_idx" ON "home" USING btree ("ab_portrait_id");
  CREATE INDEX "_home_v_version_cs_items_cover_idx" ON "_home_v_version_cs_items" USING btree ("cover_id");
  CREATE INDEX "_home_v_version_version_ab_portrait_idx" ON "_home_v" USING btree ("version_ab_portrait_id");
  CREATE INDEX "comp_case_items_case_study_idx" ON "comp_case_items" USING btree ("case_study_id");
  CREATE INDEX "_comp_v_version_case_items_case_study_idx" ON "_comp_v_version_case_items" USING btree ("case_study_id");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "orders_stripe_session_id_idx" ON "orders" USING btree ("stripe_session_id");
  CREATE INDEX "payload_locked_documents_rels_protected_media_id_idx" ON "payload_locked_documents_rels" USING btree ("protected_media_id");
  CREATE INDEX "payload_locked_documents_rels_chat_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("chat_projects_id");
  CREATE INDEX "payload_locked_documents_rels_chat_threads_id_idx" ON "payload_locked_documents_rels" USING btree ("chat_threads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses_modules_lessons_key_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_modules_lessons_quiz_questions_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_modules_lessons_quiz_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_modules_lessons_key_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_modules_lessons_quiz_questions_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_modules_lessons_quiz_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "protected_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certificates_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chat_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chat_threads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "courses_modules_lessons_key_points" CASCADE;
  DROP TABLE "courses_modules_lessons_quiz_questions_options" CASCADE;
  DROP TABLE "courses_modules_lessons_quiz_questions" CASCADE;
  DROP TABLE "_courses_v_version_modules_lessons_key_points" CASCADE;
  DROP TABLE "_courses_v_version_modules_lessons_quiz_questions_options" CASCADE;
  DROP TABLE "_courses_v_version_modules_lessons_quiz_questions" CASCADE;
  DROP TABLE "protected_media" CASCADE;
  DROP TABLE "certificates_standards" CASCADE;
  DROP TABLE "chat_projects" CASCADE;
  DROP TABLE "chat_threads" CASCADE;
  ALTER TABLE "home_cs_items" DROP CONSTRAINT "home_cs_items_cover_id_media_id_fk";
  
  ALTER TABLE "home" DROP CONSTRAINT "home_ab_portrait_id_media_id_fk";
  
  ALTER TABLE "_home_v_version_cs_items" DROP CONSTRAINT "_home_v_version_cs_items_cover_id_media_id_fk";
  
  ALTER TABLE "_home_v" DROP CONSTRAINT "_home_v_version_ab_portrait_id_media_id_fk";
  
  ALTER TABLE "comp_case_items" DROP CONSTRAINT "comp_case_items_case_study_id_case_studies_id_fk";
  
  ALTER TABLE "_comp_v_version_case_items" DROP CONSTRAINT "_comp_v_version_case_items_case_study_id_case_studies_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_downloadable_file_id_protected_media_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_downloadable_file_id_protected_media_id_fk";
  
  ALTER TABLE "courses_modules_lessons" DROP CONSTRAINT "courses_modules_lessons_video_id_protected_media_id_fk";
  
  ALTER TABLE "_courses_v_version_modules_lessons" DROP CONSTRAINT "_courses_v_version_modules_lessons_video_id_protected_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_protected_media_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_chat_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_chat_threads_fk";
  
  DROP INDEX "home_cs_items_cover_idx";
  DROP INDEX "home_ab_portrait_idx";
  DROP INDEX "_home_v_version_cs_items_cover_idx";
  DROP INDEX "_home_v_version_version_ab_portrait_idx";
  DROP INDEX "comp_case_items_case_study_idx";
  DROP INDEX "_comp_v_version_case_items_case_study_idx";
  DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX "media_sizes_card_sizes_card_filename_idx";
  DROP INDEX "media_sizes_hero_sizes_hero_filename_idx";
  DROP INDEX "orders_stripe_session_id_idx";
  DROP INDEX "payload_locked_documents_rels_protected_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_chat_projects_id_idx";
  DROP INDEX "payload_locked_documents_rels_chat_threads_id_idx";
  ALTER TABLE "products" ADD CONSTRAINT "products_downloadable_file_id_media_id_fk" FOREIGN KEY ("downloadable_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_downloadable_file_id_media_id_fk" FOREIGN KEY ("version_downloadable_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_modules_lessons" ADD CONSTRAINT "courses_modules_lessons_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_version_modules_lessons" ADD CONSTRAINT "_courses_v_version_modules_lessons_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_cs_items" DROP COLUMN "cover_id";
  ALTER TABLE "home" DROP COLUMN "ab_portrait_id";
  ALTER TABLE "_home_v_version_cs_items" DROP COLUMN "cover_id";
  ALTER TABLE "_home_v" DROP COLUMN "version_ab_portrait_id";
  ALTER TABLE "comp_case_items" DROP COLUMN "case_study_id";
  ALTER TABLE "_comp_v_version_case_items" DROP COLUMN "case_study_id";
  ALTER TABLE "courses_modules_lessons_resources" DROP COLUMN "name";
  ALTER TABLE "courses_modules_lessons_resources" DROP COLUMN "type";
  ALTER TABLE "courses_modules_lessons_resources" DROP COLUMN "size_label";
  ALTER TABLE "courses_modules_lessons" DROP COLUMN "video_url";
  ALTER TABLE "courses_modules_lessons" DROP COLUMN "quiz_pass_score";
  ALTER TABLE "courses" DROP COLUMN "enroll_cta_label";
  ALTER TABLE "_courses_v_version_modules_lessons_resources" DROP COLUMN "name";
  ALTER TABLE "_courses_v_version_modules_lessons_resources" DROP COLUMN "type";
  ALTER TABLE "_courses_v_version_modules_lessons_resources" DROP COLUMN "size_label";
  ALTER TABLE "_courses_v_version_modules_lessons" DROP COLUMN "video_url";
  ALTER TABLE "_courses_v_version_modules_lessons" DROP COLUMN "quiz_pass_score";
  ALTER TABLE "_courses_v" DROP COLUMN "version_enroll_cta_label";
  ALTER TABLE "free_trainings" DROP COLUMN "resource_type";
  ALTER TABLE "free_trainings" DROP COLUMN "release_status";
  ALTER TABLE "free_trainings" DROP COLUMN "cta_label";
  ALTER TABLE "_free_trainings_v" DROP COLUMN "version_resource_type";
  ALTER TABLE "_free_trainings_v" DROP COLUMN "version_release_status";
  ALTER TABLE "_free_trainings_v" DROP COLUMN "version_cta_label";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_url";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_width";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_height";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filename";
  ALTER TABLE "certificates" DROP COLUMN "recipient_company";
  ALTER TABLE "certificates" DROP COLUMN "course_title";
  ALTER TABLE "certificates" DROP COLUMN "credential";
  ALTER TABLE "certificates" DROP COLUMN "score";
  ALTER TABLE "certificates" DROP COLUMN "hours";
  ALTER TABLE "certificates" DROP COLUMN "expires_at";
  ALTER TABLE "certificates" DROP COLUMN "instructor_name";
  ALTER TABLE "certificates" DROP COLUMN "instructor_title";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "protected_media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "chat_projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "chat_threads_id";
  DROP TYPE "public"."enum_free_trainings_resource_type";
  DROP TYPE "public"."enum_free_trainings_release_status";
  DROP TYPE "public"."enum__free_trainings_v_version_resource_type";
  DROP TYPE "public"."enum__free_trainings_v_version_release_status";`)
}
