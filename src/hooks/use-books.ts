'use client'

import { useQuery } from '@tanstack/react-query'
import { getBookDetails, searchBooks } from '@/services/books'
import { queryKeys } from './query-keys'

/**
 * Google Books search results.
 *
 * Idle until there is something to search for. The query key includes the
 * search string, so each distinct search is cached separately and repeating one
 * costs nothing.
 */
export const useBookSearch = (searchStr: string) =>
  useQuery({
    queryKey: queryKeys.bookSearch(searchStr),
    queryFn: () => searchBooks(searchStr),
    enabled: !!searchStr
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
    enabled: !!id
  })
