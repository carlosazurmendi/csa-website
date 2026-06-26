import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Adds `resourceType` (Video | Document | Presentation — drives the card icon)
// and a CMS-set `ctaLabel` (card button text) to Free Trainings, on the main
// table and its versions shadow table.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_free_trainings_resource_type" AS ENUM('video', 'document', 'presentation');
   CREATE TYPE "public"."enum__free_trainings_v_version_resource_type" AS ENUM('video', 'document', 'presentation');
   ALTER TABLE "free_trainings" ADD COLUMN "resource_type" "enum_free_trainings_resource_type" DEFAULT 'video';
   ALTER TABLE "free_trainings" ADD COLUMN "cta_label" varchar;
   ALTER TABLE "_free_trainings_v" ADD COLUMN "version_resource_type" "enum__free_trainings_v_version_resource_type" DEFAULT 'video';
   ALTER TABLE "_free_trainings_v" ADD COLUMN "version_cta_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "free_trainings" DROP COLUMN IF EXISTS "resource_type";
   ALTER TABLE "free_trainings" DROP COLUMN IF EXISTS "cta_label";
   ALTER TABLE "_free_trainings_v" DROP COLUMN IF EXISTS "version_resource_type";
   ALTER TABLE "_free_trainings_v" DROP COLUMN IF EXISTS "version_cta_label";
   DROP TYPE IF EXISTS "public"."enum_free_trainings_resource_type";
   DROP TYPE IF EXISTS "public"."enum__free_trainings_v_version_resource_type";
  `)
}
