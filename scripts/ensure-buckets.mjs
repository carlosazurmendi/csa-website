// Idempotently create the public + private Supabase Storage buckets via the Storage
// REST API (service-role key). Self-hosted Supabase doesn't auto-create them, and
// seed:media + protected delivery need them. Safe to re-run (existing = skipped).
const base = (process.env.SUPABASE_INTERNAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '')
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!base || !key) {
  console.log('[buckets] NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — skipping')
  process.exit(0)
}

const buckets = [
  [process.env.S3_PUBLIC_BUCKET || 'marketing', true],
  [process.env.S3_PROTECTED_BUCKET || 'course-assets', false],
]

let failed = false
for (const [id, isPublic] of buckets) {
  try {
    const res = await fetch(`${base}/storage/v1/bucket`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, apikey: key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name: id, public: isPublic }),
    })
    if (res.ok) {
      console.log(`[buckets] created '${id}' (public=${isPublic})`)
    } else {
      const body = await res.text().catch(() => '')
      if (res.status === 409 || /already exists|Duplicate/i.test(body)) {
        console.log(`[buckets] '${id}' already exists`)
      } else {
        console.log(`[buckets] '${id}' failed: HTTP ${res.status} ${body}`)
        failed = true
      }
    }
  } catch (e) {
    console.log(`[buckets] '${id}' error: ${e.message}`)
    failed = true
  }
}

process.exit(failed ? 1 : 0)
