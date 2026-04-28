'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLessonPlatform } from '@/components/LessonPlatformProvider'
import { COURSE_3_PLATFORMS, PLATFORM_LABELS, clearChosenPlatform } from '@/lib/course-3-platform'

export function PlatformSwitcherNote(): React.JSX.Element {
  const { chosenPlatform } = useLessonPlatform()
  const pathname = usePathname()
  const router = useRouter()

  // Unchosen state: invite the user to pick one.
  if (chosenPlatform === null) {
    return (
      <aside
        aria-label="Platform selection"
        className="mb-8 rounded-lg border border-border bg-surface-secondary p-4"
      >
        <p className="mb-3 text-sm text-text-secondary">
          You are seeing all three platforms. Pick one to focus on just that content:
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a platform">
          {COURSE_3_PLATFORMS.map((slug) => (
            <Link
              key={slug}
              href={`${pathname}?platform=${slug}`}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-course-3-accent/40 hover:bg-course-3-accent/5 focus:outline-none focus:ring-2 focus:ring-course-3-accent/30 focus:ring-offset-2"
            >
              {PLATFORM_LABELS[slug]}
            </Link>
          ))}
        </div>
      </aside>
    )
  }

  // Chosen state: show the choice with a clear segmented switcher.
  return (
    <aside
      aria-label="Platform selection"
      className="mb-8 rounded-lg border border-border bg-surface-secondary p-4"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
        <span>Your chosen platform:</span>
        <span className="font-semibold text-text-primary">{PLATFORM_LABELS[chosenPlatform]}</span>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Switch platform">
        {COURSE_3_PLATFORMS.map((slug) => {
          const isActive = slug === chosenPlatform
          return (
            <Link
              key={slug}
              href={`${pathname}?platform=${slug}`}
              aria-current={isActive ? 'true' : undefined}
              className={
                isActive
                  ? 'inline-flex min-h-[44px] items-center rounded-lg border-2 border-course-3-accent bg-course-3-accent/10 px-4 py-2 text-sm font-semibold text-course-3-accent focus:outline-none focus:ring-2 focus:ring-course-3-accent/30 focus:ring-offset-2'
                  : 'inline-flex min-h-[44px] items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-course-3-accent/40 hover:bg-course-3-accent/5 focus:outline-none focus:ring-2 focus:ring-course-3-accent/30 focus:ring-offset-2'
              }
            >
              {PLATFORM_LABELS[slug]}
            </Link>
          )
        })}
      </div>
      <div className="mt-3 border-t border-border pt-3">
        <Link
          href={pathname}
          onClick={(e) => {
            e.preventDefault()
            clearChosenPlatform()
            router.replace(pathname, { scroll: false })
          }}
          className="inline-flex min-h-[44px] items-center text-sm text-text-secondary underline decoration-dotted underline-offset-4 hover:text-course-3-accent focus:text-course-3-accent focus:outline-none"
        >
          Show all three platforms
        </Link>
      </div>
    </aside>
  )
}
