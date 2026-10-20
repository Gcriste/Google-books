import 'server-only'
import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

/**
 * Better Auth server instance.
 *
 * Note this uses `pg` rather than `@neondatabase/serverless`, which the rest of
 * the app uses. That is deliberate, not an oversight:
 *
 * Better Auth needs a long-lived Pool, but Neon's HTTP driver requires pools to
 * be opened and closed inside a single request handler. The DATABASE_URL here is
 * Neon's *pooled* endpoint (`-pooler` in the host), so PgBouncer manages
 * connection lifetime server-side and a module-scope Pool is safe.
 *
 * Please don't "consolidate" the two clients — they solve different problems.
 */
export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true
  },
  user: {
    // Mirrored by hand in `src/services/auth.ts` (the browser client cannot
    // infer `typeof auth` without pulling this server-only module into the
    // client graph). Edit both or the extra fields go untyped on the client.
    additionalFields: {
      firstName: { type: 'string', required: true, input: true },
      lastName: { type: 'string', required: true, input: true },
      // Optional, hence `required: false` -- which also keeps the columns
      // nullable if the better-auth CLI ever regenerates the schema.
      addressLine1: { type: 'string', required: false, input: true },
      addressLine2: { type: 'string', required: false, input: true },
      addressCity: { type: 'string', required: false, input: true },
      addressState: { type: 'string', required: false, input: true },
      addressPostalCode: { type: 'string', required: false, input: true },
      addressCountry: { type: 'string', required: false, input: true }
    }
  }
})
