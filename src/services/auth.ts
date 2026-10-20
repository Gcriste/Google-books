import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'

/**
 * Browser-side auth client — a typed transport over `/api/auth/*`, which is
 * served by `src/lib/auth.ts` via `src/app/api/auth/[...all]/route.ts`.
 */
export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        addressLine1: { type: 'string', required: false },
        addressLine2: { type: 'string', required: false },
        addressCity: { type: 'string', required: false },
        addressState: { type: 'string', required: false },
        addressPostalCode: { type: 'string', required: false },
        addressCountry: { type: 'string', required: false }
      }
    })
  ]
})

export const { signIn, signUp, signOut, useSession, updateUser } = authClient
