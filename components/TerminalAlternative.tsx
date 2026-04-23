'use client'

import type { ReactNode, JSX } from 'react'
import { ChevronRight } from 'lucide-react'

interface TerminalAlternativeProps {
  readonly label?: string
  readonly children: ReactNode
}

/**
 * Collapsible "prefer the terminal?" block used inside lessons where a
 * guided (dashboard) path is the default but a terminal equivalent exists.
 * Keep terminal-only steps (e.g. Fly.io) in the main flow instead.
 */
export function TerminalAlternative({
  label = 'Prefer the terminal?',
  children,
}: TerminalAlternativeProps): JSX.Element {
  return (
    <details className="group mb-6 rounded-lg border border-border bg-surface-secondary [&>summary::-webkit-details-marker]:[display:none] [&>summary::marker]:[display:none] [&>summary]:list-none">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-3 p-4 text-sm font-semibold leading-snug text-text-primary transition-colors hover:bg-course-3-accent/5 sm:p-5">
        <ChevronRight
          className="h-4 w-4 shrink-0 text-text-secondary transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none"
          strokeWidth={2}
          aria-hidden="true"
        />
        <span>{label}</span>
      </summary>
      <div className="space-y-4 border-t border-border px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        {children}
      </div>
    </details>
  )
}
