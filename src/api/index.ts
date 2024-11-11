import type { BookType, SavedBook } from '@/app/types'

export const useApi = () => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY

  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.log('no api key found')
  }

  const searchBooks = async (searchStr: string): Promise<BookType[]> => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchStr}&key=${apiKey}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }

    const data = await response.json()
    return data.items || []
  }

  const getBookDetails = async (id: string): Promise<BookType> => {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }

    const data = response.json()
    return data
  }

  const getAllFromDB = (): SavedBook | undefined => {
    const currentBooks = localStorage.getItem('savedBooks') ?? '{}'
    const parsedBooks = JSON.parse(currentBooks) ?? {}

    return parsedBooks
  }

  const getByIdFromDB = (id: string | undefined): BookType | undefined => {
    if (!id) return
    const currentBooks = getAllFromDB()
    const currentBook = currentBooks?.[id]

    return currentBook
  }

  const updateBook = async (book: BookType) => {
    const currentBooks = getAllFromDB()
    const { id, ...rest } = book
    const updatedBook = { ...currentBooks, [id]: { id, ...rest } }
    localStorage.setItem('savedBooks', JSON.stringify(updatedBook))
    return updatedBook
  }

  return {
    searchBooks,
    getBookDetails,
    getAllFromDB,
    getByIdFromDB,
    updateBook
  }
}
