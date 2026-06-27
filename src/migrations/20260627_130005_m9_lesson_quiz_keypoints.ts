import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// M6 (course player): lessons gain a formative knowledge check + key points.
//   - `keyPoints` (array)  → courses_modules_lessons_key_points
//   - `quiz` (group)       → quiz_pass_score column + quiz_questions / _options arrays
// Mirrored across the versions shadow tables (_courses_v_version_modules_lessons*).
// migrate:create bundled the older push-only diffs (m3–m8) into its output; those
// columns already ship in their own migrations, so this file keeps ONLY the new
// keyPoints/quiz schema.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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

   ALTER TABLE "courses_modules_lessons" ADD COLUMN "quiz_pass_score" numeric DEFAULT 100;
   ALTER TABLE "_courses_v_version_modules_lessons" ADD COLUMN "quiz_pass_score" numeric DEFAULT 100;

   ALTER TABLE "courses_modules_lessons_key_points" ADD CONSTRAINT "courses_modules_lessons_key_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "courses_modules_lessons_quiz_questions_options" ADD CONSTRAINT "courses_modules_lessons_quiz_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_modules_lessons_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "courses_modules_lessons_quiz_questions" ADD CONSTRAINT "courses_modules_lessons_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "_courses_v_version_modules_lessons_key_points" ADD CONSTRAINT "_courses_v_version_modules_lessons_key_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "_courses_v_version_modules_lessons_quiz_questions_options" ADD CONSTRAINT "_courses_v_version_modules_lessons_quiz_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_modules_lessons_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "_courses_v_version_modules_lessons_quiz_questions" ADD CONSTRAINT "_courses_v_version_modules_lessons_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_modules_lessons"("id") ON DELETE cascade ON UPDATE no action;

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
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses_modules_lessons_key_points" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "courses_modules_lessons_quiz_questions_options" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "courses_modules_lessons_quiz_questions" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "_courses_v_version_modules_lessons_key_points" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "_courses_v_version_modules_lessons_quiz_questions_options" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "_courses_v_version_modules_lessons_quiz_questions" DISABLE ROW LEVEL SECURITY;
   DROP TABLE "courses_modules_lessons_key_points" CASCADE;
   DROP TABLE "courses_modules_lessons_quiz_questions_options" CASCADE;
   DROP TABLE "courses_modules_lessons_quiz_questions" CASCADE;
   DROP TABLE "_courses_v_version_modules_lessons_key_points" CASCADE;
   DROP TABLE "_courses_v_version_modules_lessons_quiz_questions_options" CASCADE;
   DROP TABLE "_courses_v_version_modules_lessons_quiz_questions" CASCADE;
   ALTER TABLE "courses_modules_lessons" DROP COLUMN "quiz_pass_score";
   ALTER TABLE "_courses_v_version_modules_lessons" DROP COLUMN "quiz_pass_score";
  `)
}
