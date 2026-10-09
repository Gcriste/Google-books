import 'server-only'
import { neon } from '@neondatabase/serverless'
import type { NeonQueryFunction } from '@neondatabase/serverless'

let cached: NeonQueryFunction<false, false> | undefined

/**
 * Lazily builds the Neon query function. Resolved on first use rather than at
 * module scope so that a missing DATABASE_URL fails the request that needs it
 * instead of the whole build.
 *
 * Tagged templates parameterize automatically (`${value}` becomes a bound
 * parameter), so interpolated values are never concatenated into SQL.
 */
export const getSql = (): NeonQueryFunction<false, false> => {
  if (cached) return cached

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  cached = neon(connectionString)
  return cached
}
