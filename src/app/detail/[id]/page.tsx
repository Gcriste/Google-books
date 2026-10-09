'use client'

import { useParams } from 'next/navigation'

import { Container, Text } from '@/components/common'
import Book from '@/components/books/book'
import { useBookDetails } from '@/hooks/use-books'
import { useSavedBooks } from '@/hooks/use-saved-books'

const DetailPage = () => {
  const { id } = useParams()
  const { getById } = useSavedBooks()
  const { data: bookData, isLoading, error } = useBookDetails(id as string)

  // A saved copy wins over the API copy, so favorites and reviews show here.
  const currentBook = getById(id as string) ?? bookData
  const isRefetchBook = currentBook?.id !== id

  return (
    <Container title="Book Details">
      {currentBook && (
        <Book
          book={currentBook}
          isDetails
          isLoading={isLoading || isRefetchBook}
        />
      )}
      {error && <Text variant="error">{error.message}</Text>}
    </Container>
  )
}

export default DetailPage
