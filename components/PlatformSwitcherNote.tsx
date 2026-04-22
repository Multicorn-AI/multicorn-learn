'use client'

import Link from 'next/link'
import {
  useCourse3PlatformLinkHelpers,
  useLessonPlatform,
} from '@/components/LessonPlatformProvider'
import { clearCourse3MdxPlatformOnClient } from '@/lib/course-3-platform'
import type { PlatformSlug } from '@/lib/platform-picker'

const SLUGS = ['vercel', 'netlify', 'fly-io'] as const satisfies readonly PlatformSlug[]

const LABELS: Record<PlatformSlug, string> = {
  vercel: 'Vercel',
  netlify: 'Netlify',
  'fly-io': 'Fly.io',
}

function PlatformPills({
  chosenPlatform,
  pathname,
  singleFocusMode,
}: {
  readonly chosenPlatform: PlatformSlug | null
  readonly pathname: string
  /** When true, active platform is bold; others are links. When false, all are links. */
  readonly singleFocusMode: boolean
}) {
  return (
    <span className="font-medium text-text-primary">
      {SLUGS.map((slug, index) => {
        const isActive = singleFocusMode && chosenPlatform === slug
        const separator = index > 0 ? ' · ' : ''
        if (isActive) {
          return (
            <span key={slug}>
              {separator}
              <span className="font-semibold text-text-primary">{LABELS[slug]}</span>
            </span>
          )
        }
        return (
          <span key={slug}>
            {separator}
            <Link
              href={`${pathname}?platform=${slug}`}
              className="text-primary underline decoration-primary/30 underline-offset-2"
            >
              {LABELS[slug]}
            </Link>
          </span>
        )
      })}
    </span>
  )
}

export function PlatformSwitcherNote() {
  const { chosenPlatform } = useLessonPlatform()
  const { pathname, router } = useCourse3PlatformLinkHelpers()

  const showAllThree = () => {
    clearCourse3MdxPlatformOnClient()
    router.replace(pathname, { scroll: false })
  }

  if (chosenPlatform === null) {
    return (
      <div className="mb-8 rounded-lg border border-border bg-surface-secondary p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-text-secondary">
          You are seeing all three platforms. Pick one to focus on just that content:{' '}
          <PlatformPills chosenPlatform={null} pathname={pathname} singleFocusMode={false} />
        </p>
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-lg border border-border bg-surface-secondary p-4 sm:p-5">
      <p className="text-sm leading-relaxed text-text-secondary">
        These lessons use your chosen path:{' '}
        <span className="font-semibold text-text-primary">{LABELS[chosenPlatform]}</span>. Switch:{' '}
        <PlatformPills chosenPlatform={chosenPlatform} pathname={pathname} singleFocusMode />.{' '}
        <button
          type="button"
          onClick={showAllThree}
          className="min-h-[44px] text-sm font-medium text-primary underline decoration-primary/30 underline-offset-2"
        >
          Show all three
        </button>
      </p>
    </div>
  )
}
