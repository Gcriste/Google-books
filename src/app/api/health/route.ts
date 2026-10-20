import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * Deployment diagnostics.
 *
 * Deliberately does NOT import `@/lib/auth`: that module throws at init when
 * BETTER_AUTH_SECRET is missing, which is precisely the failure this endpoint
 * exists to report. Importing it would make the health check 500 for the same
 * reason as the thing it is diagnosing.
 *
 * Reports presence and lengths only, never values, so it is safe to leave
 * reachable.
 */
export async function GET(request: Request) {
  const present = (value?: string) => ({
    set: !!value,
    length: value?.length ?? 0
  })

  let database: 'ok' | 'error' = 'error'
  let databaseError: string | undefined

  try {
    const rows = await getSql()`select 1 as ok`
    database = rows?.[0]?.ok === 1 ? 'ok' : 'error'
  } catch (error) {
    databaseError = error instanceof Error ? error.message : String(error)
  }

  return NextResponse.json({
    database,
    ...(databaseError ? { databaseError } : {}),
    env: {
      DATABASE_URL: present(process.env.DATABASE_URL),
      BETTER_AUTH_SECRET: present(process.env.BETTER_AUTH_SECRET),
      GOOGLE_BOOKS_API_KEY: present(process.env.GOOGLE_BOOKS_API_KEY),
      BETTER_AUTH_URL: present(process.env.BETTER_AUTH_URL)
    },
    // What Better Auth falls back to when BETTER_AUTH_URL is unset.
    requestOrigin: new URL(request.url).origin,
    vercel: {
      env: process.env.VERCEL_ENV ?? null,
      region: process.env.VERCEL_REGION ?? null
    }
  })
}
