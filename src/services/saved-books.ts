import type { BookType, NewReview, SavedBook } from '@/app/types'

/**
 * Transport for this app's own API — the Postgres-backed saved books.
 *
 * Plain async functions, no React. These call the route handlers under
 * `src/app/api/saved-books/`; `src/hooks/use-saved-books.ts` wraps them in
 * React Query.
 */

const sendJson = async <T>(
  url: string,
  method: 'POST' | 'PUT',
  body: unknown
): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({ error: '' }))
    throw new Error(error || 'Failed to save')
  }

  return response.json()
}

/** Every saved book for this browser. Backs the single savedBooks query. */
export const fetchSavedBooks = async (): Promise<SavedBook> => {
  const response = await fetch('/api/saved-books')

  if (!response.ok) {
    throw new Error('Failed to load saved books')
  }

  return response.json()
}

/**
 * Each write returns the full updated map, so callers can seed the savedBooks
 * cache from the response instead of refetching.
 */
export const updateBook = (book: BookType): Promise<SavedBook> =>
  sendJson(`/api/saved-books/${book.id}`, 'PUT', book)

export const addReview = ({
  book,
  review
}: {
  book: BookType
  review: NewReview
}): Promise<SavedBook> =>
  sendJson(`/api/saved-books/${book.id}/reviews`, 'POST', { book, review })
