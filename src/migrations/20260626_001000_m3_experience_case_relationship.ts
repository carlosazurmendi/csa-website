import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Adds the `caseStudy` relationship on the Company "Experience" case items
// (links each summary card to its full case-study doc). Stored as a direct
// nullable FK column on the array's row table + its versions shadow table.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "comp_case_items" ADD COLUMN "case_study_id" integer;
   ALTER TABLE "_comp_v_version_case_items" ADD COLUMN "case_study_id" integer;
   ALTER TABLE "comp_case_items" ADD CONSTRAINT "comp_case_items_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "_comp_v_version_case_items" ADD CONSTRAINT "_comp_v_version_case_items_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "comp_case_items_case_study_idx" ON "comp_case_items" USING btree ("case_study_id");
   CREATE INDEX "_comp_v_version_case_items_case_study_idx" ON "_comp_v_version_case_items" USING btree ("case_study_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "comp_case_items_case_study_idx";
   DROP INDEX IF EXISTS "_comp_v_version_case_items_case_study_idx";
   ALTER TABLE "comp_case_items" DROP CONSTRAINT IF EXISTS "comp_case_items_case_study_id_case_studies_id_fk";
   ALTER TABLE "_comp_v_version_case_items" DROP CONSTRAINT IF EXISTS "_comp_v_version_case_items_case_study_id_case_studies_id_fk";
   ALTER TABLE "comp_case_items" DROP COLUMN IF EXISTS "case_study_id";
   ALTER TABLE "_comp_v_version_case_items" DROP COLUMN IF EXISTS "case_study_id";
  `)
}
