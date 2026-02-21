import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'multicorn_preview'
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 days in seconds

export function middleware(request: NextRequest) {
  const preview = request.nextUrl.searchParams.get('preview')

  if (!preview) return NextResponse.next()

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

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|.*\\.(?:png|jpg|svg|ico)).*)'],
}
