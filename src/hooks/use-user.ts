'use client'

import { useSession } from '@/services/auth'

export const useUser = () => {
  const { data: session, isPending } = useSession()
  const user = session?.user

  return {
    user,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    /** First name when we have one, otherwise something always printable. */
    displayName: user?.firstName || user?.name || user?.email,
    isSignedIn: !!user,
    isLoading: isPending
  }
}
