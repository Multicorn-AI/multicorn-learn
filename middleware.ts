import { NextRequest, NextResponse } from 'next/server'
import { isLaunchGatePublicPath } from './lib/launchGatePaths'

function nextWithRouteHeaders(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  requestHeaders.set(
    'x-launch-gate-public',
    isLaunchGatePublicPath(request.nextUrl.pathname) ? '1' : '0',
  )
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export function middleware(request: NextRequest) {
  return nextWithRouteHeaders(request)
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|.*\\.(?:png|jpg|svg|ico)).*)'],
}
