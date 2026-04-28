function shouldTrack(): boolean {
  const explicit = process.env.NEXT_PUBLIC_ANALYTICS_URL
  if (typeof explicit === 'string' && explicit.trim() !== '') return true
  return process.env.NODE_ENV === 'production'
}

function getBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_ANALYTICS_URL
  if (typeof explicit === 'string' && explicit.trim() !== '') {
    return explicit.replace(/\/$/, '')
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.multicorn.ai'
  }
  return 'http://localhost:8080'
}

export interface ThumbsFeedbackPayload {
  readonly course_slug: string
  readonly lesson_slug: string
  readonly feedback_type: 'thumbs'
  readonly rating_value: 0 | 1
}

export interface StarFeedbackPayload {
  readonly course_slug: string
  readonly lesson_slug?: string
  readonly feedback_type: 'star_rating'
  readonly rating_value: 1 | 2 | 3 | 4 | 5
  readonly text_positive?: string
  readonly text_negative?: string
  readonly would_recommend?: boolean
  readonly email?: string
  readonly website?: string
}

export type FeedbackPayload = ThumbsFeedbackPayload | StarFeedbackPayload

export async function submitFeedback(payload: FeedbackPayload): Promise<boolean> {
  if (typeof window === 'undefined' || !shouldTrack()) return false
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch {
    return false
  }
}
