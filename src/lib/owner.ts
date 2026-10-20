import 'server-only'
import { headers } from 'next/headers'
import { auth } from './auth'

/**
 * Helper function to get the user token and validate if api routes should be made
 */
export const getOwnerKey = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? ''
}
