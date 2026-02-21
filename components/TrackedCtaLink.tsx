'use client'

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
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => trackEvent(eventName, eventProps)}
    >
      {children}
    </a>
  )
}
