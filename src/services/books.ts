import type { BookType } from '@/app/types'

/**
 * Google Books API transport.
 *
 * Plain async functions, no React. When these run and where their results live
 * is decided by `src/hooks/use-books.ts`, which wraps them in React Query.
 */

const apiKey = process.env.GOOGLE_BOOKS_API_KEY
if (!apiKey) {
  console.error('no api key found')
}

/**
 * A failed Google Books response, carrying the status code.
 *
 * The status is what lets `use-books.ts` tell a retryable upstream failure from
 * a request we got wrong. The `/volumes` search endpoint returns a large share
 * of `503 Service temporarily unavailable` (`reason: backendFailed`) — a
 * Google-side fault that clears on a retry a second or two later. A 4xx is the
 * opposite: the same request will fail the same way forever.
 *
 * Without the status both look identical, which is why this previously read as
 * an intermittent mystery rather than an upstream outage.
 */
export class BooksApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
    this.name = 'BooksApiError'
  }
}

export const searchBooks = async (searchStr: string): Promise<BookType[]> => {
  // Encoded, not interpolated raw: an unescaped `&`, `#` or `+` in the search
  // term silently truncates or corrupts the query string.
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchStr
  )}&key=${apiKey}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new BooksApiError(
      `Google Books search failed (${response.status})`,
      response.status
    )
  }

  const data = await response.json()
  return data.items || []
}

export const getBookDetails = async (id: string): Promise<BookType> => {
  const url = `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(
    id
  )}?key=${apiKey}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new BooksApiError(
      `Google Books lookup failed (${response.status})`,
      response.status
    )
  }

  const data = await response.json()
  return data
}
