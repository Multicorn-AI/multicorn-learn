'use client'

import { useSyncExternalStore } from 'react'
import {
  course3PlatformStoreSubscribe,
  getCourse3MdxPlatformSnapshot,
} from '@/lib/course-3-platform'
import type { PlatformSlug } from '@/lib/platform-picker'

const SERVER_SNAPSHOT: PlatformSlug = 'vercel'

function getClientSnapshot(): PlatformSlug {
  return getCourse3MdxPlatformSnapshot()
}

export function PlatformContent({
  platform,
  children,
}: {
  readonly platform: PlatformSlug
  readonly children: React.ReactNode
}) {
  const active = useSyncExternalStore(
    course3PlatformStoreSubscribe,
    getClientSnapshot,
    () => SERVER_SNAPSHOT,
  )
  if (active !== platform) {
    return null
  }
  return <div className="mb-6">{children}</div>
}
