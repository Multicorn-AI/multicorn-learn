const PUBLIC_LAUNCH_PATHS = ['/confirmed', '/subscribed', '/unsubscribed', '/blog'] as const
const PUBLIC_LAUNCH_PREFIXES = ['/policies/', '/blog/', '/verify/'] as const

export function isLaunchGatePublicPath(pathname: string): boolean {
  if (pathname === '/policies') {
    return true
  }

  if (PUBLIC_LAUNCH_PATHS.includes(pathname as (typeof PUBLIC_LAUNCH_PATHS)[number])) {
    return true
  }

  return PUBLIC_LAUNCH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export function isLaunchGateStandalonePath(pathname: string): boolean {
  return pathname === '/confirmed' || pathname === '/subscribed' || pathname === '/unsubscribed'
}
