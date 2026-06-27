'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

import { createSetupIntent, saveCardFromSetupIntent } from './stripe-actions'

/**
 * Embedded card form: requests a SetupIntent, mounts Stripe Elements, and confirms
 * the setup so the card is saved to the customer. Card data is entered in Stripe's
 * iframe (PaymentElement) and never touches our code. The publishable key is read
 * from the runtime-injected window.__CSA_ENV__ (see (frontend)/layout.tsx).
 */
function publishableKey(): string {
  return (typeof window !== 'undefined' && window.__CSA_ENV__?.stripePublishableKey) || ''
}

// Cache the Stripe.js loader per publishable key (loadStripe must not run per render).
let _stripePromise: Promise<Stripe | null> | null = null
function stripeLoader(pk: string) {
  if (!_stripePromise) _stripePromise = loadStripe(pk)
  return _stripePromise
}

export function BillingCardForm({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const pk = publishableKey()

  useEffect(() => {
    let active = true
    createSetupIntent().then((r) => {
      if (!active) return
      if (r.error) setError(r.error)
      else setClientSecret(r.clientSecret ?? null)
    })
    return () => {
      active = false
    }
  }, [])

  if (!pk) return <p className="auth-error">Stripe publishable key is missing.</p>
  if (error) return <p className="auth-error">{error}</p>
  if (!clientSecret) return <p className="cp-card__note">Loading secure card form…</p>

  return (
    <Elements
      stripe={stripeLoader(pk)}
      options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }}
    >
      <InnerForm onDone={onDone} onCancel={onCancel} />
    </Elements>
  )
}

function InnerForm({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)
    const { error: confirmError, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: 'if_required',
    })
    if (confirmError) {
      setError(confirmError.message ?? 'Could not save the card.')
      setSubmitting(false)
      return
    }
    if (setupIntent?.status === 'succeeded') {
      const res = await saveCardFromSetupIntent(setupIntent.id)
      setSubmitting(false)
      if (res.error) {
        setError(res.error)
        return
      }
      onDone()
    } else {
      setSubmitting(false)
      setError('The card could not be confirmed. Please try again.')
    }
  }

  return (
    <form className="cp-cardform" onSubmit={onSubmit}>
      <PaymentElement />
      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
      <div className="cp-cardform__actions">
        <button type="submit" className="btn btn--gold-solid" disabled={!stripe || submitting}>
          {submitting ? 'Saving…' : 'Save card'} <i data-lucide="check"></i>
        </button>
        <button type="button" className="btn btn--link" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
