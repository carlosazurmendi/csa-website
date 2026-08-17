import Script from 'next/script'

/**
 * GoogleTagManager — the standard two GTM snippets (dataLayer bootstrap +
 * gtm.js loader, plus the <noscript> iframe fallback), driven by the container
 * ID in Site Settings → Analytics. Renders nothing when no ID is set.
 *
 * The ID is re-validated here against the strict GTM-... shape before being
 * interpolated into the inline script and iframe URL, so a malformed or
 * malicious CMS value can never inject markup/script — it simply disables GTM.
 * (The Payload field carries the same validation; this is defense in depth.)
 */

const GTM_ID = /^GTM-[A-Z0-9]+$/

export function GoogleTagManager({ containerId }: { containerId?: string | null }) {
  const id = (containerId ?? '').trim()
  if (!GTM_ID.test(id)) return null
  return (
    <>
      <Script id="csa-gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        ></iframe>
      </noscript>
    </>
  )
}
