import 'server-only'
import { cookies } from 'next/headers'
import { OWNER_COOKIE } from './constants'

/**
 * The single seam between stored data and whoever owns it.
 *
 * Today that's an anonymous per-browser cookie minted in `middleware.ts`. To
 * move to real accounts later, return the authenticated user's id from here —
 * no other file needs to change.
 */
export const getOwnerKey = async (): Promise<string> => {
  const store = await cookies()
  return store.get(OWNER_COOKIE)?.value ?? ''
}
