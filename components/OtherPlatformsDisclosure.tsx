'use client'

import { ChevronRight } from 'lucide-react'
import { useLessonPlatform } from '@/components/LessonPlatformProvider'

/**
 * Collapsible "other platforms" block used in Course 3 MDX. Shown only when a single platform
 * is selected (hides when all three are visible).
 */
export function OtherPlatformsDisclosure({ children }: { readonly children: React.ReactNode }) {
  const { chosenPlatform } = useLessonPlatform()
  if (chosenPlatform === null) {
    return null
  }
  return (
    <details className="group mb-6 rounded-lg border border-border bg-surface-secondary [&>summary::-webkit-details-marker]:[display:none] [&>summary::marker]:[display:none] [&>summary]:list-none">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-3 p-4 text-sm font-semibold leading-snug text-text-primary transition-colors hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 sm:p-5">
        <ChevronRight
          className="h-4 w-4 shrink-0 text-text-secondary transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none"
          strokeWidth={2}
          aria-hidden="true"
        />
        <span>Curious about other platforms?</span>
      </summary>
      <div className="space-y-4 border-t border-border px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        {children}
      </div>
    </details>
  )
}
