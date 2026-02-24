import { NextRequest, NextResponse } from 'next/server'
import { isLaunchGatePublicPath } from './lib/launchGatePaths'

const COOKIE_NAME = 'multicorn_preview'
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 days in seconds

function nextWithRouteHeaders(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  requestHeaders.set(
    'x-launch-gate-public',
    isLaunchGatePublicPath(request.nextUrl.pathname) ? '1' : '0',
  )

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export function middleware(request: NextRequest) {
  const preview = request.nextUrl.searchParams.get('preview')

  if (!preview) return nextWithRouteHeaders(request)

  const cleanUrl = request.nextUrl.clone()
  cleanUrl.searchParams.delete('preview')

  if (preview === 'off') {
    const response = NextResponse.redirect(cleanUrl)
    response.cookies.delete(COOKIE_NAME)
    return response
  }

  const secret = process.env.PREVIEW_SECRET
  if (secret && preview === secret) {
    const response = NextResponse.redirect(cleanUrl)
    response.cookies.set(COOKIE_NAME, '1', {
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'strict',
      secure: true,
      path: '/',
    })
    return response
  }

  return nextWithRouteHeaders(request)
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|.*\\.(?:png|jpg|svg|ico)).*)'],
}
