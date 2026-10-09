import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { OWNER_COOKIE, OWNER_COOKIE_MAX_AGE } from '@/lib/constants'

/**
 * Mints an anonymous owner id on first visit so saved books can be scoped to a
 * browser without a login. Replaced by a real session id if accounts are added.
 */
export function middleware(request: NextRequest) {
  if (request.cookies.get(OWNER_COOKIE)?.value) return NextResponse.next()

  const ownerKey = crypto.randomUUID()

  // Set on the REQUEST so a route handler in this same request can read it...
  request.cookies.set(OWNER_COOKIE, ownerKey)
  const response = NextResponse.next({ request: { headers: request.headers } })

  // ...and on the RESPONSE so the browser keeps it for later requests.
  response.cookies.set(OWNER_COOKIE, ownerKey, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: OWNER_COOKIE_MAX_AGE
  })

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
