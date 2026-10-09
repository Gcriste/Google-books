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

export const searchBooks = async (searchStr: string): Promise<BookType[]> => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchStr}&key=${apiKey}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }

  const data = await response.json()
  return data.items || []
}

export const getBookDetails = async (id: string): Promise<BookType> => {
  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
  const response = await fetch(url)

  if (!response.ok) {
    console.error('err', response)
    throw new Error('Failed to fetch books')
  }

  const data = await response.json()
  return data
}
