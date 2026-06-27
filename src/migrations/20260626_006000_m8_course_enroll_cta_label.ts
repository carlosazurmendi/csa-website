import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// M6: editable purchase/enroll button label on a course (CMS-controlled), on the
// courses table and its versions shadow. Default "Enroll Now".
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses" ADD COLUMN "enroll_cta_label" varchar DEFAULT 'Enroll Now';
   ALTER TABLE "_courses_v" ADD COLUMN "version_enroll_cta_label" varchar DEFAULT 'Enroll Now';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses" DROP COLUMN IF EXISTS "enroll_cta_label";
   ALTER TABLE "_courses_v" DROP COLUMN IF EXISTS "version_enroll_cta_label";
  `)
}
