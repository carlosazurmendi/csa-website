import 'server-only'

import type { Payload } from 'payload'

import type { ResolvedLine } from '@/lib/commerce'

/**
 * Order-confirmation email, sent best-effort from the verified webhook after a
 * successful grant. Uses Payload's configured email transport (nodemailer; see
 * payload.config.ts). If no SMTP is configured Payload logs instead of sending,
 * so this is always safe to call. A send failure must NEVER fail fulfilment —
 * the caller swallows errors.
 */

export type OrderEmail = {
  to: string
  orderNumber: string
  lines: Pick<ResolvedLine, 'name' | 'qty' | 'unitAmount'>[]
  amountTotal: number | null
  currency?: string | null
  receiptUrl?: string | null
  serverUrl: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function money(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((cents || 0) / 100)
}

export async function sendOrderConfirmation(payload: Payload, o: OrderEmail): Promise<void> {
  const currency = o.currency || 'usd'
  const total =
    typeof o.amountTotal === 'number'
      ? o.amountTotal
      : o.lines.reduce((n, l) => n + l.unitAmount * l.qty, 0)

  const rows = o.lines
    .map(
      (l) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #1d2533;color:#e7eaf0">${escapeHtml(l.name)}${l.qty > 1 ? ` &times; ${l.qty}` : ''}</td>` +
        `<td align="right" style="padding:8px 0;border-bottom:1px solid #1d2533;color:#e7eaf0;white-space:nowrap">${money(l.unitAmount * l.qty, currency)}</td></tr>`,
    )
    .join('')

  const dash = `${o.serverUrl}/dashboard`
  const html = `<!doctype html><html><body style="margin:0;background:#0A0E14;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E14">
    <tr><td align="center" style="padding:32px 16px">
      <table role="presentation" width="100%" style="max-width:520px;background:#0d1320;border:1px solid #1d2533;border-radius:14px;overflow:hidden">
        <tr><td style="padding:24px 28px;border-bottom:1px solid #1d2533">
          <div style="color:#C6A256;font-weight:700;letter-spacing:.12em;font-size:12px">CRITICAL SYSTEMS ANALYSIS</div>
        </td></tr>
        <tr><td style="padding:28px">
          <h1 style="margin:0 0 6px;color:#fff;font-size:20px">Thank you for your purchase</h1>
          <p style="margin:0 0 20px;color:#9aa3b2;font-size:14px">Order <strong style="color:#e7eaf0">${escapeHtml(o.orderNumber)}</strong> is confirmed. Your access is ready.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
            ${rows}
            <tr><td style="padding:12px 0 0;color:#fff;font-weight:700">Total</td>
                <td align="right" style="padding:12px 0 0;color:#fff;font-weight:700">${money(total, currency)}</td></tr>
          </table>
          <div style="margin:26px 0 8px">
            <a href="${dash}" style="display:inline-block;background:#C6A256;color:#0A0E14;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px">Access your purchase</a>
          </div>
          ${o.receiptUrl ? `<p style="margin:14px 0 0;font-size:13px"><a href="${escapeHtml(o.receiptUrl)}" style="color:#8aa0c6">View your Stripe receipt</a></p>` : ''}
        </td></tr>
        <tr><td style="padding:18px 28px;border-top:1px solid #1d2533">
          <p style="margin:0;color:#5b6472;font-size:12px">Need help? Reply to this email or contact Critical Systems Analysis.</p>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`

  await payload.sendEmail({
    to: o.to,
    subject: `Your CSA order ${o.orderNumber}`,
    html,
  })
}
