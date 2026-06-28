import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Commerce idempotency: a UNIQUE index on orders.stripe_session_id makes the Stripe
// Checkout Session id the authoritative idempotency key — a re-delivered or
// concurrent webhook can never create a duplicate order for the same session (the
// grant path in src/lib/orders.ts catches the unique violation and reuses the
// existing order). Partial index (WHERE NOT NULL) so manually-created orders without
// a session id are still allowed. Additive + index-only — no schema/type change.
//
// (Previously committed as m13; preserved as a raw-SQL migration because a PARTIAL
// unique index isn't expressible in the Payload collection schema, so it survives the
// M9 migration-chain squash. Runs after 20260628_131848_m3_schema_current.)
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE UNIQUE INDEX IF NOT EXISTS "orders_stripe_session_id_idx"
     ON "orders" USING btree ("stripe_session_id")
     WHERE "stripe_session_id" IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "orders_stripe_session_id_idx";
  `)
}
