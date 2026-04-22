import type { PlatformSlug } from '@/lib/platform-picker'

export const COURSE_3_MD_PLATFORM_STORAGE_KEY = 'multicorn_course3_mdx_platform_v1'

export const DEFAULT_COURSE3_PLATFORM: PlatformSlug = 'vercel'

const PLATFORM_SET = new Set<PlatformSlug>(['vercel', 'netlify', 'fly-io'])

export function isCourse3PlatformSlug(value: string): value is PlatformSlug {
  return PLATFORM_SET.has(value as PlatformSlug)
}

/**
 * Read the platform used for Course 3 lesson content (set by the overview picker, or
 * switched in-lesson). Safe on server: returns default.
 */
export function getCourse3MdxPlatformSnapshot(): PlatformSlug {
  if (typeof window === 'undefined') {
    return DEFAULT_COURSE3_PLATFORM
  }
  const raw = window.localStorage.getItem(COURSE_3_MD_PLATFORM_STORAGE_KEY)
  if (raw && isCourse3PlatformSlug(raw)) {
    return raw
  }
  return DEFAULT_COURSE3_PLATFORM
}

export function setCourse3MdxPlatformOnClient(platform: PlatformSlug): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(COURSE_3_MD_PLATFORM_STORAGE_KEY, platform)
  window.dispatchEvent(new Event('multicorn_course3_platform_change'))
}

export function clearCourse3MdxPlatformOnClient(): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.removeItem(COURSE_3_MD_PLATFORM_STORAGE_KEY)
  window.dispatchEvent(new Event('multicorn_course3_platform_change'))
}

export function course3PlatformStoreSubscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => undefined
  }
  const onStorage = () => {
    callback()
  }
  window.addEventListener('multicorn_course3_platform_change', onStorage)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener('multicorn_course3_platform_change', onStorage)
    window.removeEventListener('storage', onStorage)
  }
}
