import type { PlatformSlug } from '@/lib/platform-picker'

export const COURSE_3_MD_PLATFORM_STORAGE_KEY = 'multicorn_course3_mdx_platform_v1'

export type Course3Platform = PlatformSlug

export const COURSE_3_PLATFORMS: readonly Course3Platform[] = ['vercel', 'netlify', 'fly-io']

export const PLATFORM_LABELS: Record<Course3Platform, string> = {
  vercel: 'Vercel',
  netlify: 'Netlify',
  'fly-io': 'Fly.io',
}

const PLATFORM_SET = new Set<Course3Platform>(COURSE_3_PLATFORMS)

export function isCourse3Platform(value: string | null | undefined): value is Course3Platform {
  if (value === null || value === undefined) {
    return false
  }
  return PLATFORM_SET.has(value as Course3Platform)
}

/** @deprecated use {@link isCourse3Platform} */
export function isCourse3PlatformSlug(value: string): value is Course3Platform {
  return isCourse3Platform(value)
}

/**
 * URL query wins, then localStorage. If neither is a valid platform, no choice.
 */
export function resolveChosenPlatform(
  searchParam: string | null,
  storedValue: string | null,
): Course3Platform | null {
  if (isCourse3Platform(searchParam)) {
    return searchParam
  }
  if (isCourse3Platform(storedValue)) {
    return storedValue
  }
  return null
}

export function setCourse3MdxPlatformOnClient(platform: Course3Platform): void {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(COURSE_3_MD_PLATFORM_STORAGE_KEY, platform)
    window.dispatchEvent(new Event('multicorn_course3_platform_change'))
  } catch {
    /* private mode, quota, etc. */
  }
}

export function clearCourse3MdxPlatformOnClient(): void {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.removeItem(COURSE_3_MD_PLATFORM_STORAGE_KEY)
    window.dispatchEvent(new Event('multicorn_course3_platform_change'))
  } catch {
    /* private mode, quota, etc. */
  }
}

/** Clears the saved Course 3 platform; same as {@link clearCourse3MdxPlatformOnClient}. */
export function clearChosenPlatform(): void {
  clearCourse3MdxPlatformOnClient()
}

export function readCourse3MdxPlatformFromStorageOnClient(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(COURSE_3_MD_PLATFORM_STORAGE_KEY)
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
