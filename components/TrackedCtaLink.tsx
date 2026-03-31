'use client'

import { trackEvent as trackAnalytics } from '@/lib/analytics'
import { trackEvent } from '@/lib/plausible'

interface TrackedCtaLinkProps {
  readonly href: string
  readonly className: string
  readonly eventName: string
  readonly eventProps?: Record<string, string>
  readonly target?: string
  readonly rel?: string
  readonly children: React.ReactNode
}

export function TrackedCtaLink({
  href,
  className,
  eventName,
  eventProps,
  target,
  rel,
  children,
}: TrackedCtaLinkProps) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://')
  const effectiveTarget = target ?? (isExternal ? '_blank' : undefined)
  const effectiveRel = rel ?? (isExternal ? 'noopener noreferrer' : undefined)

  return (
    <a
      href={href}
      className={className}
      target={effectiveTarget}
      rel={effectiveRel}
      onClick={() => {
        trackEvent(eventName, eventProps)
        trackAnalytics(eventName, eventProps)
      }}
    >
      {children}
    </a>
  )
}
