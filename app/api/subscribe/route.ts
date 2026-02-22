import { NextResponse } from 'next/server'

const SUBSCRIBE_STATUSES = {
  success: 'success',
  already_subscribed: 'already_subscribed',
  error: 'error',
} as const

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

interface ConvertKitSubscriber {
  readonly state: string
}

interface ConvertKitResponse {
  readonly subscription: {
    readonly subscriber: ConvertKitSubscriber
  }
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

    if (!formId || !apiKey) {
      return NextResponse.json(
        { status: SUBSCRIBE_STATUSES.error, message: 'Email signup is not configured.' },
        { status: 500 },
      )
    }

    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ api_key: apiKey, email }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      return NextResponse.json(
        { status: SUBSCRIBE_STATUSES.error, message: 'Subscription failed.' },
        { status: 502 },
      )
    }

    const data = (await response.json()) as ConvertKitResponse
    const subscriberState = data.subscription?.subscriber?.state

    if (subscriberState === 'active') {
      return NextResponse.json({ status: SUBSCRIBE_STATUSES.already_subscribed })
    }

    return NextResponse.json({ status: SUBSCRIBE_STATUSES.success })
  } catch {
    return NextResponse.json(
      { status: SUBSCRIBE_STATUSES.error, message: 'Something went wrong.' },
      { status: 500 },
    )
  }
}
