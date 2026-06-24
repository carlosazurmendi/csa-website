import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'instructor');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "profiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"auth_user_id" varchar NOT NULL,
  	"email" varchar,
  	"full_name" varchar,
  	"company" varchar,
  	"job_title" varchar,
  	"country" varchar,
  	"phone" varchar,
  	"plan" varchar DEFAULT 'Customer',
  	"onboarded" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profiles_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "profiles_id" integer;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profiles_texts" ADD CONSTRAINT "profiles_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE UNIQUE INDEX "profiles_auth_user_id_idx" ON "profiles" USING btree ("auth_user_id");
  CREATE INDEX "profiles_updated_at_idx" ON "profiles" USING btree ("updated_at");
  CREATE INDEX "profiles_created_at_idx" ON "profiles" USING btree ("created_at");
  CREATE INDEX "profiles_texts_order_parent" ON "profiles_texts" USING btree ("order","parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_profiles_fk" FOREIGN KEY ("profiles_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("profiles_id");`)

  // Backfill: every pre-existing admin user gets the `admin` role so the new
  // role-gated access (Users create/update/delete = isAdmin) doesn't lock them
  // out. Idempotent — skips users that already have a role row.
  await db.execute(sql`
    INSERT INTO "users_roles" ("order", "parent_id", "value")
    SELECT 1, u."id", 'admin'
    FROM "users" u
    WHERE NOT EXISTS (SELECT 1 FROM "users_roles" r WHERE r."parent_id" = u."id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profiles_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "profiles" CASCADE;
  DROP TABLE "profiles_texts" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_profiles_fk";
  
  DROP INDEX "payload_locked_documents_rels_profiles_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "profiles_id";
  DROP TYPE "public"."enum_users_roles";`)
}
