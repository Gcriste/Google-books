'use client'

import { Container } from '@/components/common'
import SavedBooksContainer from '@/components/shared/saved-books-container'
import { useBooksWithNotes } from '@/hooks/use-saved-books'
import type { BookType } from '@/app/types'

// Module scope: a fresh [] each render would be a new array prop every time.
const EMPTY_BOOKS: BookType[] = []

const MyNotesPage = () => {
  const { data: books = EMPTY_BOOKS, isLoading, error } = useBooksWithNotes()

  return (
    <Container title="My Notes">
      <SavedBooksContainer
        books={books}
        isLoading={isLoading}
        error={error}
        emptyText="No notes written"
        isMyNotes
      />
    </Container>
  )
}

export default MyNotesPage
