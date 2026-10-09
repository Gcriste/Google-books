import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

/**
 * Keeps signed-out visitors out of the pages that show a personal shelf.
 *
 * This is an optimistic cookie check with no database call, so it is cheap
 * enough to run on every matched request. It is NOT the security boundary —
 * that is `getOwnerKey()`, which validates the session server-side on every
 * API call. A forged cookie gets past this and then fails there.
 */
export function middleware(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next()

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/favorites/:path*', '/my-reviews/:path*']
}
