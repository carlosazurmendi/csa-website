import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// M6: lessons gain an external `videoUrl` (YouTube/Vimeo/MP4) alongside the
// uploaded `video`, so the course player can embed either source. Added to the
// lessons array table and its versions shadow.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses_modules_lessons" ADD COLUMN "video_url" varchar;
   ALTER TABLE "_courses_v_version_modules_lessons" ADD COLUMN "video_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses_modules_lessons" DROP COLUMN IF EXISTS "video_url";
   ALTER TABLE "_courses_v_version_modules_lessons" DROP COLUMN IF EXISTS "video_url";
  `)
}
