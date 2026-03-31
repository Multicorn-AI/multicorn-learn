'use client'

import { useState } from 'react'
import { trackEvent as trackAnalytics } from '@/lib/analytics'
import { trackEvent } from '@/lib/plausible'

interface AnalyticsEvent {
  readonly event: string
  readonly props?: Record<string, string>
}

interface CopyButtonProps {
  readonly text: string
  readonly label?: string
  readonly analyticsEvent?: AnalyticsEvent
}

export function CopyButton({ text, label = 'Copy to clipboard', analyticsEvent }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (analyticsEvent) {
        trackEvent(analyticsEvent.event, analyticsEvent.props)
        trackAnalytics(analyticsEvent.event, analyticsEvent.props)
      }
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : label}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-tertiary transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-green"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}
