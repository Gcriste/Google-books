import type { BookType } from '@/app/types'

const apiKey = process.env.GOOGLE_BOOKS_API_KEY
if (!apiKey) {
  console.error('no api key found')
}

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
