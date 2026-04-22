'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import {
  course3PlatformStoreSubscribe,
  getCourse3MdxPlatformSnapshot,
  setCourse3MdxPlatformOnClient,
} from '@/lib/course-3-platform'
import type { PlatformSlug } from '@/lib/platform-picker'

const LABELS: Record<PlatformSlug, string> = {
  vercel: 'Vercel',
  netlify: 'Netlify',
  'fly-io': 'Fly.io',
}

const SERVER_PLATFORM = 'vercel' as const

function clientSnapshot() {
  return getCourse3MdxPlatformSnapshot()
}

export function PlatformSwitcherNote() {
  const platform = useSyncExternalStore(
    course3PlatformStoreSubscribe,
    clientSnapshot,
    () => SERVER_PLATFORM,
  )
  return (
    <div className="mb-8 rounded-lg border border-border bg-surface-secondary p-4 sm:p-5">
      <p className="text-sm leading-relaxed text-text-secondary">
        These lessons use your chosen path:{' '}
        <span className="font-semibold text-text-primary">{LABELS[platform]}</span>. Picked
        something else?{' '}
        <Link
          href="/learn/course-3#pick-your-platform"
          className="font-medium text-primary underline decoration-primary/30 underline-offset-2"
        >
          Open the three questions
        </Link>
        {', or switch here:'}
      </p>
      <div
        className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
        role="group"
        aria-label="Change hosting platform for this lesson"
      >
        {(['vercel', 'netlify', 'fly-io'] as const).map((slug) => {
          const selected = platform === slug
          return (
            <button
              key={slug}
              type="button"
              onClick={() => {
                setCourse3MdxPlatformOnClient(slug)
              }}
              className={
                selected
                  ? 'inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border-2 border-primary bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary sm:min-w-[120px] sm:flex-none'
                  : 'inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-primary/30 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 sm:min-w-[120px] sm:flex-none'
              }
              aria-pressed={selected}
            >
              {LABELS[slug]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
