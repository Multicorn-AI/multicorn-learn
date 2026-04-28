import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { CourseProgressIndicator } from '@/components/CourseProgressIndicator'

const heroVariantStyles = {
  'course-1': {
    iconBox: 'bg-course-1-accent/10 text-course-1-accent',
    label: 'text-course-1-accent',
  },
  'course-2': {
    iconBox: 'bg-course-2-accent/10 text-course-2-accent',
    label: 'text-course-2-accent',
  },
  'course-3': {
    iconBox: 'bg-course-3-accent/10 text-course-3-accent',
    label: 'text-course-3-accent',
  },
  'course-4': {
    iconBox: 'bg-violet-500/10 text-violet-600',
    label: 'text-violet-600',
  },
} as const

export type CourseLandingHeroVariant = keyof typeof heroVariantStyles

export function CourseLandingTopNav({ activeCourse }: { readonly activeCourse: 1 | 2 | 3 | 4 }) {
  return (
    <div className="mb-10 flex flex-col items-center gap-6">
      <Link
        href="/learn"
        className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
        All courses
      </Link>
      <CourseProgressIndicator activeCourse={activeCourse} />
    </div>
  )
}

export function CourseLandingHero({
  variant,
  icon,
  courseLabel,
  title,
  children,
}: {
  readonly variant: CourseLandingHeroVariant
  readonly icon: ReactNode
  readonly courseLabel: string
  readonly title: string
  readonly children: ReactNode
}) {
  const { iconBox, label } = heroVariantStyles[variant]

  return (
    <section className="mx-auto mb-12 w-full max-w-3xl px-4">
      <div className="mb-6 flex items-start gap-3 sm:gap-4">
        <span
          className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBox}`}
          aria-hidden="true"
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <span className={`text-xs font-semibold uppercase leading-snug tracking-wide ${label}`}>
            {courseLabel}
          </span>
          <h1 className="break-words text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}
