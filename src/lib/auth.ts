import 'server-only'
import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

/**
 * Better Auth server instance.
 */
export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true
  },
  user: {
    additionalFields: {
      firstName: { type: 'string', required: true, input: true },
      lastName: { type: 'string', required: true, input: true },
      // nullable
      addressLine1: { type: 'string', required: false, input: true },
      addressLine2: { type: 'string', required: false, input: true },
      addressCity: { type: 'string', required: false, input: true },
      addressState: { type: 'string', required: false, input: true },
      addressPostalCode: { type: 'string', required: false, input: true },
      addressCountry: { type: 'string', required: false, input: true }
    }
  }
})
