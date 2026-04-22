'use client'

import { useLessonPlatform } from '@/components/LessonPlatformProvider'
import type { PlatformSlug } from '@/lib/platform-picker'

export function PlatformContent({
  platform,
  children,
}: {
  readonly platform: PlatformSlug
  readonly children: React.ReactNode
}) {
  const { chosenPlatform } = useLessonPlatform()
  if (chosenPlatform === null || chosenPlatform === platform) {
    return <div className="mb-6">{children}</div>
  }
  return null
}
