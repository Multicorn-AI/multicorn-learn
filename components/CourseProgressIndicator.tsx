interface CourseProgressIndicatorProps {
  readonly activeCourse: number
}

function Pill({
  label,
  shortLabel,
  state,
}: {
  label: string
  shortLabel: string
  state: 'completed' | 'active' | 'locked'
}) {
  const base =
    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm'
  if (state === 'completed') {
    return (
      <span className={`${base} border-green/30 bg-green/10 text-green`} title={label}>
        <span className="sm:hidden">{shortLabel}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    )
  }
  if (state === 'active') {
    return (
      <span
        className={`${base} border-primary/30 bg-primary/10 text-primary`}
        title={label}
        aria-current="step"
      >
        <span className="sm:hidden">{shortLabel}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    )
  }
  return (
    <span className={`${base} border-border bg-surface-tertiary text-text-tertiary`} title={label}>
      <span className="sm:hidden">{shortLabel}</span>
      <span className="hidden sm:inline">{label}</span>
    </span>
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
  const c1 = stateFor(1, activeCourse)
  const c2 = stateFor(2, activeCourse)
  const c3 = stateFor(3, activeCourse)

  return (
    <div
      className="flex w-full max-w-xl flex-wrap items-center justify-center gap-2 sm:gap-0"
      role="navigation"
      aria-label="Course progress"
    >
      <Pill label="Course 1" shortLabel="C1" state={c1} />
      <Connector />
      <Pill label="Course 2" shortLabel="C2" state={c2} />
      <Connector />
      <Pill label="Course 3" shortLabel="C3" state={c3} />
    </div>
  )
}
