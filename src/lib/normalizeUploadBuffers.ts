import 'server-only'

import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Copy any SharedArrayBuffer-backed upload buffer into a pool-allocated (normal
 * ArrayBuffer) Buffer before @payloadcms/storage-s3 uploads it.
 *
 * Why this exists: under Next.js App Router, Payload hands the cloud-storage plugin
 * a file buffer (`req.file.data`, plus each entry of `req.payloadUploadSizes`) whose
 * underlying ArrayBuffer is a *SharedArrayBuffer*. AWS SDK v3's request signer /
 * checksum (`@smithy/core` `fromArrayBuffer`) only accepts a plain ArrayBuffer and
 * throws on PutObject:
 *   TypeError: The "input" argument must be ArrayBuffer. Received ... SharedArrayBuffer
 * PutObject integrity is mandatory, so the checksum can't be switched off, and
 * `useTempFiles` doesn't help because `req.file.tempFilePath` never propagates to the
 * plugin in this runtime. Copying the bytes into a Buffer.allocUnsafe target yields a
 * normal ArrayBuffer the SDK accepts.
 *
 * Runs at beforeChange — after resize (so `payloadUploadSizes` is populated) and
 * before the plugin's afterChange upload reads the same `req.file` reference. No-op
 * when there is no file, or the buffer is already backed by a regular ArrayBuffer.
 */
function toPooledBuffer(buf: Buffer): Buffer {
  // Already a normal ArrayBuffer — leave it untouched.
  if (!(buf.buffer instanceof SharedArrayBuffer)) return buf
  const copy = Buffer.allocUnsafe(buf.length)
  buf.copy(copy)
  return copy
}

export const normalizeUploadBuffers: CollectionBeforeChangeHook = ({ req }) => {
  const file = req.file as { data?: Buffer } | undefined
  if (file?.data && Buffer.isBuffer(file.data)) {
    file.data = toPooledBuffer(file.data)
  }

  const sizes = req.payloadUploadSizes as Record<string, Buffer> | undefined
  if (sizes) {
    for (const key of Object.keys(sizes)) {
      if (Buffer.isBuffer(sizes[key])) sizes[key] = toPooledBuffer(sizes[key])
    }
  }
}
