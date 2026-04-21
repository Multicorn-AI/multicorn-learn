'use client'

import type { ReactNode } from 'react'
import { MulticornSignupCta } from '@/components/MulticornSignupCta'

interface MulticornNavSignupCtaProps {
  readonly eventName: string
  readonly eventProps?: Record<string, string>
  readonly children: ReactNode
}

/**
 * Signup CTA that matches the SiteHeader "Get Started" button.
 *
 * The `[&_p]:*` arbitrary variants neutralise MDX's paragraph wrapper:
 * MDX wraps text children in <p class="mb-4 leading-relaxed text-text-secondary">,
 * which would otherwise inflate the button and override text-white.
 */
export function MulticornNavSignupCta({
  eventName,
  eventProps,
  children,
}: MulticornNavSignupCtaProps) {
  return (
    <MulticornSignupCta
      className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 [&_p]:m-0 [&_p]:!inline [&_p]:!leading-none [&_p]:!text-white"
      eventName={eventName}
      eventProps={eventProps}
    >
      {children}
    </MulticornSignupCta>
  )
}
