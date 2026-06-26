import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Adds `releaseStatus` (Published | Publishing soon) to Free Trainings so each
// training controls its own card treatment: published → working "Watch/Start
// free" link; soon → the "Coming soon" (clock) treatment. Enum + column on the
// main table and its versions shadow table.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_free_trainings_release_status" AS ENUM('published', 'soon');
   CREATE TYPE "public"."enum__free_trainings_v_version_release_status" AS ENUM('published', 'soon');
   ALTER TABLE "free_trainings" ADD COLUMN "release_status" "enum_free_trainings_release_status" DEFAULT 'published';
   ALTER TABLE "_free_trainings_v" ADD COLUMN "version_release_status" "enum__free_trainings_v_version_release_status" DEFAULT 'published';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "free_trainings" DROP COLUMN IF EXISTS "release_status";
   ALTER TABLE "_free_trainings_v" DROP COLUMN IF EXISTS "version_release_status";
   DROP TYPE IF EXISTS "public"."enum_free_trainings_release_status";
   DROP TYPE IF EXISTS "public"."enum__free_trainings_v_version_release_status";
  `)
}
