'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, Suspense, useContext, useEffect, useMemo } from 'react'
import { useSyncExternalStore } from 'react'
import {
  course3PlatformStoreSubscribe,
  isCourse3Platform,
  readCourse3MdxPlatformFromStorageOnClient,
  resolveChosenPlatform,
  setCourse3MdxPlatformOnClient,
} from '@/lib/course-3-platform'
import type { Course3Platform } from '@/lib/course-3-platform'

// Re-export type for consumers
export type { Course3Platform }

const LessonPlatformContext = createContext<{
  readonly chosenPlatform: Course3Platform | null
} | null>(null)

export function useLessonPlatform(): { readonly chosenPlatform: Course3Platform | null } {
  const ctx = useContext(LessonPlatformContext)
  if (ctx === null) {
    throw new Error('useLessonPlatform must be used within LessonPlatformProvider')
  }
  return ctx
}

function getStoredSnapshot(): string | null {
  return readCourse3MdxPlatformFromStorageOnClient()
}

function LessonPlatformProviderInner({ children }: { readonly children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const urlPlatform = searchParams.get('platform')
  const stored = useSyncExternalStore(course3PlatformStoreSubscribe, getStoredSnapshot, () => null)
  const chosenPlatform = useMemo(
    () => resolveChosenPlatform(urlPlatform, stored),
    [urlPlatform, stored],
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (urlPlatform && isCourse3Platform(urlPlatform)) {
      try {
        setCourse3MdxPlatformOnClient(urlPlatform)
      } catch {
        /* ignore */
      }
    }
  }, [urlPlatform])

  return (
    <LessonPlatformContext.Provider value={{ chosenPlatform }}>
      {children}
    </LessonPlatformContext.Provider>
  )
}

/**
 * Resolves the user's platform choice from `?platform=` and localStorage, and exposes
 * `chosenPlatform` (null = show all three platform sections).
 */
export function LessonPlatformProvider({ children }: { readonly children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-[1px] w-full" aria-hidden="true" />}>
      <LessonPlatformProviderInner>{children}</LessonPlatformProviderInner>
    </Suspense>
  )
}

/** Client-only: link row helpers use pathname + next/router */
export function useCourse3PlatformLinkHelpers() {
  const pathname = usePathname()
  const router = useRouter()
  return { pathname, router }
}
