'use client'

import { useQuery } from '@tanstack/react-query'
import { BooksApiError, getBookDetails, searchBooks } from '@/services/books'
import { queryKeys } from './query-keys'

/**
 * Google Books fails a lot, and only in one direction worth retrying.
 *
 * The `/volumes` endpoint returns `503 backendFailed` for a large share of
 * requests; retrying after a short pause clears it. A 4xx will never clear, so
 * retrying one just delays the error by the length of the backoff and hides a
 * real bug (a malformed query, a rejected key) behind what looks like a flake.
 *
 * React Query's default `retry: 3` was already masking the 503s by accident —
 * this makes that deliberate, and gives it enough attempts to actually hold.
 */
const retryTransient = (failureCount: number, error: Error) => {
  if (error instanceof BooksApiError && error.status < 500) return false
  return failureCount < 5
}

/**
 * Google Books search results.
 *
 * Idle until there is something to search for. The query key includes the
 * search string, so each distinct search is cached separately and repeating one
 * costs nothing.
 *
 * The cache is held well past the default here on purpose: repeated identical
 * searches in quick succession fail noticeably more often upstream than varied
 * ones, so not re-requesting a term we already have is itself a reliability
 * win, not just a saved round trip.
 */
export const useBookSearch = (searchStr: string) =>
  useQuery({
    queryKey: queryKeys.bookSearch(searchStr),
    queryFn: () => searchBooks(searchStr),
    enabled: !!searchStr,
    retry: retryTransient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

/**
 * A single volume from the Google Books API.
 *
 * Takes `id` as an optional plain string so callers do not have to narrow
 * `useParams()`, which is typed `string | string[] | undefined`.
 */
export const useBookDetails = (id?: string) =>
  useQuery({
    queryKey: queryKeys.bookDetails(id ?? ''),
    queryFn: () => getBookDetails(id as string),
    enabled: !!id,
    retry: retryTransient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })
