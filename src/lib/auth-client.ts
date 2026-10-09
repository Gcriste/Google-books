import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'

/**
 * Browser-side auth client. Deliberately NOT marked `server-only` — unlike its
 * siblings in this folder, this one is meant for client components.
 *
 * The extra user fields are declared explicitly rather than inferred from
 * `typeof auth`: inferring would pull the server module (which carries
 * `import 'server-only'`) into the client graph.
 */
export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        firstName: { type: 'string' },
        lastName: { type: 'string' }
      }
    })
  ]
})

export const { signIn, signUp, signOut, useSession } = authClient
