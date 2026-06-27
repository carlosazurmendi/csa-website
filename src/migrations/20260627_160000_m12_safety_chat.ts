import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// M6.5 (Safety Chat): two owner-scoped collections — chat_projects (folders) and
// chat_threads (conversations; messages stored as a jsonb array). Both locked on
// the public API and read/written via the server-only Payload client. Mirrors the
// localStorage model in design-reference/project/assets/safety-chat-app.jsx.
// Additive: new tables + payload_locked_documents_rels columns/FKs/indexes.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "chat_projects" (
   	"id" serial PRIMARY KEY NOT NULL,
   	"user_id" varchar NOT NULL,
   	"name" varchar NOT NULL,
   	"icon" varchar DEFAULT 'folder',
   	"sort_order" numeric DEFAULT 0,
   	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
   	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   CREATE TABLE "chat_threads" (
   	"id" serial PRIMARY KEY NOT NULL,
   	"user_id" varchar NOT NULL,
   	"project_id" integer,
   	"title" varchar DEFAULT 'New chat',
   	"messages" jsonb DEFAULT '[]'::jsonb,
   	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
   	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "chat_projects_id" integer;
   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "chat_threads_id" integer;

   ALTER TABLE "chat_threads" ADD CONSTRAINT "chat_threads_project_id_chat_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."chat_projects"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chat_projects_fk" FOREIGN KEY ("chat_projects_id") REFERENCES "public"."chat_projects"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chat_threads_fk" FOREIGN KEY ("chat_threads_id") REFERENCES "public"."chat_threads"("id") ON DELETE cascade ON UPDATE no action;

   CREATE INDEX "chat_projects_user_id_idx" ON "chat_projects" USING btree ("user_id");
   CREATE INDEX "chat_projects_updated_at_idx" ON "chat_projects" USING btree ("updated_at");
   CREATE INDEX "chat_projects_created_at_idx" ON "chat_projects" USING btree ("created_at");
   CREATE INDEX "chat_threads_user_id_idx" ON "chat_threads" USING btree ("user_id");
   CREATE INDEX "chat_threads_project_idx" ON "chat_threads" USING btree ("project_id");
   CREATE INDEX "chat_threads_updated_at_idx" ON "chat_threads" USING btree ("updated_at");
   CREATE INDEX "chat_threads_created_at_idx" ON "chat_threads" USING btree ("created_at");
   CREATE INDEX "payload_locked_documents_rels_chat_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("chat_projects_id");
   CREATE INDEX "payload_locked_documents_rels_chat_threads_id_idx" ON "payload_locked_documents_rels" USING btree ("chat_threads_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "chat_projects_id";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "chat_threads_id";
   DROP TABLE "chat_threads" CASCADE;
   DROP TABLE "chat_projects" CASCADE;
  `)
}
