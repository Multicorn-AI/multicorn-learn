import { NextResponse } from 'next/server'

const SUBSCRIBE_STATUSES = {
  success: 'success',
  already_subscribed: 'already_subscribed',
  error: 'error',
} as const

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

interface KitSubscriberLookup {
  readonly total_subscribers: number
  readonly subscribers: readonly { readonly state: string }[]
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()

    if (!body || typeof body !== 'object' || !('email' in body)) {
      return NextResponse.json(
        { status: SUBSCRIBE_STATUSES.error, message: 'Email is required.' },
        { status: 400 },
      )
    }

    const { email } = body as { email: unknown }

    if (typeof email !== 'string' || !email.trim() || !isValidEmail(email)) {
      return NextResponse.json(
        { status: SUBSCRIBE_STATUSES.error, message: 'Please enter a valid email address.' },
        { status: 400 },
      )
    }

    const formId = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID
    const apiKey = process.env.CONVERTKIT_API_KEY
    const apiSecret = process.env.CONVERTKIT_API_SECRET

    if (!formId || !apiKey || !apiSecret) {
      return NextResponse.json(
        { status: SUBSCRIBE_STATUSES.error, message: 'Email signup is not configured.' },
        { status: 500 },
      )
    }

    const lookupUrl = new URL('https://api.convertkit.com/v3/subscribers')
    lookupUrl.searchParams.set('api_secret', apiSecret)
    lookupUrl.searchParams.set('email_address', email)

    const lookupResponse = await fetch(lookupUrl.toString(), {
      signal: AbortSignal.timeout(10_000),
    })

    if (lookupResponse.ok) {
      const lookupData = (await lookupResponse.json()) as KitSubscriberLookup
      if (lookupData.total_subscribers > 0) {
        return NextResponse.json({ status: SUBSCRIBE_STATUSES.already_subscribed })
      }
    }

    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ api_key: apiKey, email }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Kit API error:', response.status, errorBody)
      return NextResponse.json(
        { status: SUBSCRIBE_STATUSES.error, message: 'Subscription failed.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ status: SUBSCRIBE_STATUSES.success })
  } catch (error) {
    console.error('Subscribe route error:', error)
    return NextResponse.json(
      { status: SUBSCRIBE_STATUSES.error, message: 'Something went wrong.' },
      { status: 500 },
    )
  }
}
