'use client'

import type { ReactNode } from 'react'
import { useLessonPlatform } from '@/components/LessonPlatformProvider'
import type { Course3Platform } from '@/lib/course-3-platform'

export function PlatformContent({
  platform,
  inverted = false,
  children,
}: {
  readonly platform: Course3Platform
  readonly inverted?: boolean
  readonly children: ReactNode
}): React.JSX.Element | null {
  const { chosenPlatform } = useLessonPlatform()

  // When no platform is chosen, show every block in the main flow.
  // Inverted (OtherPlatformsDisclosure) shows nothing, because the disclosure is hidden.
  if (chosenPlatform === null) {
    return inverted ? null : <div className="mb-6">{children}</div>
  }

  const matches = chosenPlatform === platform
  const shouldRender = inverted ? !matches : matches

  if (!shouldRender) {
    return null
  }

  return inverted ? <>{children}</> : <div className="mb-6">{children}</div>
}
