import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// M6 Phase C/D (final assessment → certificate): the Certificates collection gains
// the snapshot metadata the printed certificate paper renders — recipient company,
// course title, credential, standards (array), final score, learning hours, expiry,
// and the signatory name/title. These are written at issue time (Phase C) and
// rendered by the certificate page (Phase D). Additive only.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "certificates" ADD COLUMN "recipient_company" varchar;
   ALTER TABLE "certificates" ADD COLUMN "course_title" varchar;
   ALTER TABLE "certificates" ADD COLUMN "credential" varchar DEFAULT 'Certificate of Completion';
   ALTER TABLE "certificates" ADD COLUMN "score" numeric;
   ALTER TABLE "certificates" ADD COLUMN "hours" varchar;
   ALTER TABLE "certificates" ADD COLUMN "expires_at" timestamp(3) with time zone;
   ALTER TABLE "certificates" ADD COLUMN "instructor_name" varchar DEFAULT 'Ben Twombly';
   ALTER TABLE "certificates" ADD COLUMN "instructor_title" varchar DEFAULT 'Founder & Principal Safety Engineer · TÜV FS Eng., IFSP';

   CREATE TABLE "certificates_standards" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"code" varchar
   );

   ALTER TABLE "certificates_standards" ADD CONSTRAINT "certificates_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
   CREATE INDEX "certificates_standards_order_idx" ON "certificates_standards" USING btree ("_order");
   CREATE INDEX "certificates_standards_parent_id_idx" ON "certificates_standards" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "certificates_standards" CASCADE;
   ALTER TABLE "certificates" DROP COLUMN "recipient_company";
   ALTER TABLE "certificates" DROP COLUMN "course_title";
   ALTER TABLE "certificates" DROP COLUMN "credential";
   ALTER TABLE "certificates" DROP COLUMN "score";
   ALTER TABLE "certificates" DROP COLUMN "hours";
   ALTER TABLE "certificates" DROP COLUMN "expires_at";
   ALTER TABLE "certificates" DROP COLUMN "instructor_name";
   ALTER TABLE "certificates" DROP COLUMN "instructor_title";
  `)
}
