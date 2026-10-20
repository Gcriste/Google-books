import type { BookType, NewReview, SavedBook } from '@/app/types'

const sendJson = async <T>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE',
  body?: unknown
): Promise<T> => {
  const response = await fetch(url, {
    method,
    ...(body === undefined
      ? {}
      : {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
  })

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({ error: '' }))
    throw new Error(error || 'Failed to save')
  }

  return response.json()
}

export const fetchSavedBooks = async (): Promise<SavedBook> => {
  const response = await fetch('/api/saved-books')

  if (!response.ok) {
    throw new Error('Failed to load saved books')
  }

  return response.json()
}

export const updateBook = (book: BookType): Promise<SavedBook> =>
  sendJson(`/api/saved-books/${book.id}`, 'PUT', book)

export const removeFavorite = (book: BookType): Promise<SavedBook> =>
  sendJson(`/api/saved-books/${book.id}`, 'DELETE')

export const addReview = ({
  book,
  review
}: {
  book: BookType
  review: NewReview
}): Promise<SavedBook> =>
  sendJson(`/api/saved-books/${book.id}/reviews`, 'POST', { book, review })
