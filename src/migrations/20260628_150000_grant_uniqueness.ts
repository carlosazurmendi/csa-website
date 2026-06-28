import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Grant uniqueness: DB-level unique constraints so a re-delivered or genuinely
// concurrent webhook delivery can never create duplicate access grants. Until now
// `enrollments` and `entitlements` carried only PLAIN (non-unique) indexes, and the
// `catch(isUniqueViolation)` dedupe in src/lib/orders.ts assumed a constraint that
// did not exist — under a race both transactions passed the find()-is-empty check
// and both INSERTed. These partial unique indexes make that catch load-bearing.
//
//   - enrollments: one row per (user, course) — the collection's documented
//     invariant ("one row per user per course"); status changes in place.
//   - entitlements: one ACTIVE row per (user, product). An inactive/revoked row may
//     coexist with a later active one (refund → re-grant), so the unique is PARTIAL
//     on active = true, matching the app's active-only dedupe (orders.ts grantEntitlement).
//
// Additive + index-only — no schema/type change. Safe on an empty/clean table (the
// M9 audit confirmed the grant tables are clean at this stage). Partial unique isn't
// expressible in the Payload collection schema, so this stays a raw-SQL migration and
// survives the M9 migration-chain squash. Runs after 20260628_140000_order_idempotency.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE UNIQUE INDEX IF NOT EXISTS "enrollments_user_course_uniq"
     ON "enrollments" USING btree ("user_id", "course_id")
     WHERE "user_id" IS NOT NULL AND "course_id" IS NOT NULL;
  `)
  await db.execute(sql`
   CREATE UNIQUE INDEX IF NOT EXISTS "entitlements_user_product_active_uniq"
     ON "entitlements" USING btree ("user_id", "product_id")
     WHERE "active" = true AND "user_id" IS NOT NULL AND "product_id" IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP INDEX IF EXISTS "entitlements_user_product_active_uniq";`)
  await db.execute(sql`DROP INDEX IF EXISTS "enrollments_user_course_uniq";`)
}
