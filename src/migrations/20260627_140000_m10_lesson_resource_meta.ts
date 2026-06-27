import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// M6 (course player): lesson resources gain design-shaped metadata — name, type
// (PDF/XLSX/DOCX/ZIP), and a human size label — so the sidebar resource cards
// render with a type chip + size without requiring an uploaded file (the `file`
// upload stays optional and drives the actual download when present). Mirrored on
// the versions shadow table.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses_modules_lessons_resources" ADD COLUMN "name" varchar;
   ALTER TABLE "courses_modules_lessons_resources" ADD COLUMN "type" varchar;
   ALTER TABLE "courses_modules_lessons_resources" ADD COLUMN "size_label" varchar;
   ALTER TABLE "_courses_v_version_modules_lessons_resources" ADD COLUMN "name" varchar;
   ALTER TABLE "_courses_v_version_modules_lessons_resources" ADD COLUMN "type" varchar;
   ALTER TABLE "_courses_v_version_modules_lessons_resources" ADD COLUMN "size_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses_modules_lessons_resources" DROP COLUMN "name";
   ALTER TABLE "courses_modules_lessons_resources" DROP COLUMN "type";
   ALTER TABLE "courses_modules_lessons_resources" DROP COLUMN "size_label";
   ALTER TABLE "_courses_v_version_modules_lessons_resources" DROP COLUMN "name";
   ALTER TABLE "_courses_v_version_modules_lessons_resources" DROP COLUMN "type";
   ALTER TABLE "_courses_v_version_modules_lessons_resources" DROP COLUMN "size_label";
  `)
}
