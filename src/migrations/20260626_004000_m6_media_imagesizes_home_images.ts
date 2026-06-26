import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// M4 media pipeline:
//  • Media gains a focal point + responsive image sizes (thumbnail/card/hero),
//    each a set of url/width/height/mime_type/filesize/filename columns plus a
//    filename index — generated on upload (sharp) and stored in the bucket.
//  • Home gains a founder portrait (ab_portrait) and a per-card cover image on the
//    Case Studies carousel array (cs_items.cover), each an FK to media, mirrored
//    on the versions shadow tables.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "focal_x" numeric;
   ALTER TABLE "media" ADD COLUMN "focal_y" numeric;
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
   CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
   CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
   CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");

   ALTER TABLE "home" ADD COLUMN "ab_portrait_id" integer;
   ALTER TABLE "home_cs_items" ADD COLUMN "cover_id" integer;
   ALTER TABLE "_home_v" ADD COLUMN "version_ab_portrait_id" integer;
   ALTER TABLE "_home_v_version_cs_items" ADD COLUMN "cover_id" integer;

   ALTER TABLE "home" ADD CONSTRAINT "home_ab_portrait_id_media_id_fk" FOREIGN KEY ("ab_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "home_cs_items" ADD CONSTRAINT "home_cs_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_ab_portrait_id_media_id_fk" FOREIGN KEY ("version_ab_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "_home_v_version_cs_items" ADD CONSTRAINT "_home_v_version_cs_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" DROP CONSTRAINT IF EXISTS "home_ab_portrait_id_media_id_fk";
   ALTER TABLE "home_cs_items" DROP CONSTRAINT IF EXISTS "home_cs_items_cover_id_media_id_fk";
   ALTER TABLE "_home_v" DROP CONSTRAINT IF EXISTS "_home_v_version_ab_portrait_id_media_id_fk";
   ALTER TABLE "_home_v_version_cs_items" DROP CONSTRAINT IF EXISTS "_home_v_version_cs_items_cover_id_media_id_fk";
   ALTER TABLE "home" DROP COLUMN IF EXISTS "ab_portrait_id";
   ALTER TABLE "home_cs_items" DROP COLUMN IF EXISTS "cover_id";
   ALTER TABLE "_home_v" DROP COLUMN IF EXISTS "version_ab_portrait_id";
   ALTER TABLE "_home_v_version_cs_items" DROP COLUMN IF EXISTS "cover_id";

   DROP INDEX IF EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
   DROP INDEX IF EXISTS "media_sizes_card_sizes_card_filename_idx";
   DROP INDEX IF EXISTS "media_sizes_hero_sizes_hero_filename_idx";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "focal_x";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "focal_y";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_url";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_width";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_height";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_mime_type";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filesize";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filename";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_url";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_width";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_height";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_mime_type";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filesize";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filename";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_url";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_width";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_height";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_mime_type";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_filesize";
   ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_filename";
  `)
}
