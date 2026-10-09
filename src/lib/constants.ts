/**
 * Name of the anonymous owner cookie. Lives here rather than in `owner.ts` so
 * that `middleware.ts` can import it without pulling in `next/headers`, which
 * is not available in the Edge middleware runtime.
 */
export const OWNER_COOKIE = 'bookshelf_id'

export const OWNER_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
