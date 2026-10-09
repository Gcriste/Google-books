'use client'

import { useSession } from '@/lib/auth-client'

/**
 * Who is signed in, for client components.
 *
 * A thin seam over Better Auth's session store rather than a React context:
 * `useSession` is already globally available without a provider, so wrapping it
 * in our own context would duplicate state and invite the two copies to drift.
 * This keeps the auth library behind one import, matching `useSavedBooks` and
 * `useBookSearch`.
 */
export const useUser = () => {
  const { data: session, isPending } = useSession()
  const user = session?.user

  return {
    user,
    firstName: user?.firstName,
    lastName: user?.lastName,
    /** First name when we have one, otherwise something always printable. */
    displayName: user?.firstName || user?.name || user?.email,
    isSignedIn: !!user,
    isLoading: isPending
  }
}
