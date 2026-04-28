import crypto from 'node:crypto'

import { NextResponse } from 'next/server'

const COOKIE_NAME = 'multicorn_preview'
const COOKIE_MAX_AGE = 604800

function cookieOptions(maxAge: number) {
  return {
    path: '/',
    sameSite: 'strict' as const,
    secure: true,
    httpOnly: true,
    maxAge,
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 401 })
  }

  const secret =
    body !== null && typeof body === 'object' && 'secret' in body
      ? (body as { secret: unknown }).secret
      : undefined

  const fromBody = typeof secret === 'string' ? secret : null
  const expected = process.env.PREVIEW_SECRET

  if (!fromBody || !expected) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 401 })
  }

  const a = Buffer.from(fromBody, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  if (a.length !== b.length) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  if (!crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true }, { status: 200 })
  response.cookies.set(COOKIE_NAME, '1', cookieOptions(COOKIE_MAX_AGE))
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true }, { status: 200 })
  response.cookies.set(COOKIE_NAME, '', cookieOptions(0))
  return response
}
