'use client'

import type { ReactNode } from 'react'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'

const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL ?? 'https://app.multicorn.ai/signup'

interface MulticornSignupCtaProps {
  readonly className: string
  readonly eventName: string
  readonly eventProps?: Record<string, string>
  readonly children: ReactNode
}

/**
 * Client-only signup CTA so NEXT_PUBLIC_SIGNUP_URL is resolved in the client bundle
 * and the Shield page server module does not pull env helpers into the RSC graph.
 */
export function MulticornSignupCta({
  className,
  eventName,
  eventProps,
  children,
}: MulticornSignupCtaProps) {
  return (
    <TrackedCtaLink
      href={SIGNUP_URL}
      className={className}
      eventName={eventName}
      eventProps={eventProps}
    >
      {children}
    </TrackedCtaLink>
  )
}
