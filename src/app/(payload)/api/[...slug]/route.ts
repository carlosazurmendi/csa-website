/* THIS FILE WAS GENERATED FOLLOWING THE PAYLOAD 3 BLANK TEMPLATE. */
// The REST API must never be statically cached (avoids cold-start 404 caching under Next 16 standalone).
export const dynamic = 'force-dynamic'

import config from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
