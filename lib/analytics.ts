const MULTICORN_DOMAIN = 'multicorn.ai'

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

function getReferrer(): string | null {
  if (typeof document === 'undefined') return null
  const ref = document.referrer
  if (!ref) return null
  try {
    const hostname = new URL(ref).hostname
    if (
      hostname === MULTICORN_DOMAIN ||
      hostname === `www.${MULTICORN_DOMAIN}` ||
      hostname.endsWith(`.${MULTICORN_DOMAIN}`)
    ) {
      return null
    }
    return ref
  } catch {
    return null
  }
}

function sendAnalyticsPayload(body: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !shouldTrack()) return
  const url = `${getBaseUrl()}/api/v1/analytics/events`
  const json = JSON.stringify(body)
  const blob = new Blob([json], { type: 'application/json' })
  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    if (navigator.sendBeacon(url, blob)) return
  }
  void fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: json,
    keepalive: true,
  }).catch(() => {})
}

function basePayload(): { domain: string; path: string; referrer: string | null } {
  return {
    domain: MULTICORN_DOMAIN,
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    referrer: getReferrer(),
  }
}

export function trackPageview(): void {
  if (typeof window === 'undefined' || !shouldTrack()) return
  sendAnalyticsPayload(basePayload())
}

export function trackEvent(eventName: string, props?: Record<string, string>): void {
  if (typeof window === 'undefined' || !shouldTrack()) return
  const payload: Record<string, unknown> = {
    ...basePayload(),
    eventName,
  }
  if (props && Object.keys(props).length > 0) {
    payload.eventProps = props
  }
  sendAnalyticsPayload(payload)
}
