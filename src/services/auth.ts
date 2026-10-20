import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'

/**
 * Browser-side auth client — a typed transport over `/api/auth/*`, which is
 * served by `src/lib/auth.ts` via `src/app/api/auth/[...all]/route.ts`.
 *
 * Lives here rather than in `src/lib/` because everything in that folder is
 * `server-only`; this is the client half.
 *
 * The extra user fields are declared explicitly rather than inferred from
 * `typeof auth`: inferring would pull the server module (which carries
 * `import 'server-only'`) into the client graph.
 *
 * The cost of that is a second source of truth: this list and the
 * `additionalFields` in `src/lib/auth.ts` must always be edited together.
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
