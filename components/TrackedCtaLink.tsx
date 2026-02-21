'use client'

import { trackEvent } from '@/lib/plausible'

interface TrackedCtaLinkProps {
  readonly href: string
  readonly className: string
  readonly eventName: string
  readonly eventProps?: Record<string, string>
  readonly children: React.ReactNode
}

export function TrackedCtaLink({
  href,
  className,
  eventName,
  eventProps,
  children,
}: TrackedCtaLinkProps) {
  return (
    <a href={href} className={className} onClick={() => trackEvent(eventName, eventProps)}>
      {children}
    </a>
  )
}
