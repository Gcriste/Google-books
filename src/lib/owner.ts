import 'server-only'
import { headers } from 'next/headers'
import { auth } from './auth'

/**
 * The single seam between stored data and whoever owns it.
 *
 * Returns the authenticated user's id, or '' when nobody is signed in. Route
 * handlers treat '' as a 400, so an unauthenticated request can never read or
 * write another user's shelf.
 *
 * This previously returned an anonymous per-browser cookie id. Swapping that
 * for a real session was a one-function change — no route handler or query
 * needed touching, because `saved_books.owner_key` is just text either way.
 */
export const getOwnerKey = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? ''
}
