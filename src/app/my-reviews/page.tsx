'use client'

import { Container } from '@/components/common'
import SavedBooksContainer from '@/components/saved-books-container'
import { useBooksWithReviews } from '@/hooks/use-saved-books'
import type { BookType } from '@/app/types'

// Module scope: a fresh [] each render would be a new array prop every time.
const EMPTY_BOOKS: BookType[] = []

const MyReviewsPage = () => {
  const { data: books = EMPTY_BOOKS, isLoading, error } = useBooksWithReviews()

  return (
    <Container title="My Reviews">
      <SavedBooksContainer
        books={books}
        isLoading={isLoading}
        error={error}
        emptyText="No reviews written"
        isMyReviews
      />
    </Container>
  )
}

export default MyReviewsPage
