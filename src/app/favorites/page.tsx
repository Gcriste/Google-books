'use client'

import { Container } from '@/components/common'
import SavedBooksContainer from '@/components/saved-books-container'
import { useFavoriteBooks } from '@/hooks/use-saved-books'
import type { BookType } from '@/app/types'

// Module scope: a fresh [] each render would be a new array prop every time.
const EMPTY_BOOKS: BookType[] = []

const FavoritesPage = () => {
  const { data: books = EMPTY_BOOKS, isLoading, error } = useFavoriteBooks()

  return (
    <Container title="My Favorites">
      <SavedBooksContainer
        books={books}
        isLoading={isLoading}
        error={error}
        emptyText="No favorites selected"
      />
    </Container>
  )
}

export default FavoritesPage
