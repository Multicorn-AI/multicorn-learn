import Link from 'next/link'
import { isCourse2Enabled, isCourse3Enabled } from '@/lib/feature-flags'

interface CourseProgressIndicatorProps {
  readonly activeCourse: number
}

const activePillClasses: Record<1 | 2 | 3, string> = {
  1: 'border-course-1-accent/30 bg-course-1-accent/10 text-course-1-accent hover:border-course-1-accent/40 focus:ring-course-1-accent/30',
  2: 'border-course-2-accent/30 bg-course-2-accent/10 text-course-2-accent hover:border-course-2-accent/40 focus:ring-course-2-accent/20',
  3: 'border-course-3-accent/30 bg-course-3-accent/10 text-course-3-accent hover:border-course-3-accent/40 focus:ring-course-3-accent/20',
}

/**
 * Pills in the top course stepper. Each course links to that course (or the Learn hub if the
 * course is not enabled yet) so you can move between them without the back link only.
 */
function PillLink({
  label,
  shortLabel,
  state,
  href,
  courseNum,
}: {
  label: string
  shortLabel: string
  state: 'completed' | 'active' | 'locked'
  href: string
  courseNum: 1 | 2 | 3
}) {
  const base =
    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
  if (state === 'completed') {
    return (
      <Link
        href={href}
        className={`${base} border-green/30 bg-green/10 text-green hover:border-green/40 hover:bg-green/[0.12] focus:ring-green/30`}
        title={label}
      >
        <span className="sm:hidden">{shortLabel}</span>
        <span className="hidden sm:inline">{label}</span>
      </Link>
    )
  }
  if (state === 'active') {
    return (
      <Link
        href={href}
        className={`${base} ${activePillClasses[courseNum]}`}
        title={label}
        aria-current="step"
      >
        <span className="sm:hidden">{shortLabel}</span>
        <span className="hidden sm:inline">{label}</span>
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className={`${base} border-border bg-surface-tertiary text-text-tertiary hover:border-border hover:bg-surface-secondary hover:text-text-secondary focus:ring-border`}
      title={label}
    >
      <span className="sm:hidden">{shortLabel}</span>
      <span className="hidden sm:inline">{label}</span>
    </Link>
  )
}

function Connector() {
  return <span className="hidden h-px w-6 shrink-0 bg-border sm:block sm:w-10" aria-hidden="true" />
}

function stateFor(courseNum: number, active: number): 'completed' | 'active' | 'locked' {
  if (courseNum < active) return 'completed'
  if (courseNum === active) return 'active'
  return 'locked'
}

export function CourseProgressIndicator({ activeCourse }: CourseProgressIndicatorProps) {
  const c2on = isCourse2Enabled()
  const c3on = isCourse3Enabled()
  const href1 = '/learn/course-1'
  const href2 = c2on ? '/learn/course-2' : '/learn'
  const href3 = c3on ? '/learn/course-3' : '/learn'

  const c1 = stateFor(1, activeCourse)
  const c2 = stateFor(2, activeCourse)
  const c3 = stateFor(3, activeCourse)

  return (
    <div
      className="flex w-full max-w-xl flex-wrap items-center justify-center gap-2 sm:gap-0"
      role="navigation"
      aria-label="Course progress"
    >
      <PillLink label="Course 1" shortLabel="C1" state={c1} href={href1} courseNum={1} />
      <Connector />
      <PillLink label="Course 2" shortLabel="C2" state={c2} href={href2} courseNum={2} />
      <Connector />
      <PillLink label="Course 3" shortLabel="C3" state={c3} href={href3} courseNum={3} />
    </div>
  )
}
