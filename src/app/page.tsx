'use client'
import { Container } from '@/components/common'
import BookList from '@/components/books/book-list'
import { useCallback } from 'react'

import type { FormValues } from './types'
import SearchForm from '@/components/search-form'
import { useBookContext } from '@/context/use-book-context'
import { useBookSearch } from '@/hooks/use-books'
import { useSavedBooks } from '@/hooks/use-saved-books'
import type { UseFormReset } from 'react-hook-form'

const HomePage = () => {
  const { searchStr, setSearchStr } = useBookContext()
  const { getById } = useSavedBooks()
  const { data: searchedBooks, isLoading, error } = useBookSearch(searchStr)

  const handleSubmit = useCallback(
    (reset: UseFormReset<FormValues>) => (data: FormValues) => {
      setSearchStr(data.searchStr)
      reset()
    },
    [setSearchStr]
  )

  const updatedBooks = (searchedBooks ?? []).map(
    book => getById(book.id) ?? book
  )

  return (
    <Container title="Book Search">
      <SearchForm onSubmit={handleSubmit} />
      <BookList books={updatedBooks} isLoading={isLoading} error={error} />
    </Container>
  )
}

export default HomePage
