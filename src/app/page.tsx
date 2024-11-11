/* eslint-disable no-console */
'use client'
import { Container } from '@/components/common'
import BookList from '@/components/books/book-list'
import { useApi } from '@/api'
import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { FormValues } from './types'
import SearchForm from '@/components/search-form'
import { useBookContext } from '@/context/use-book-context'
import type { UseFormReset } from 'react-hook-form'

const HomePage = () => {
  const { getByIdFromDB, searchBooks } = useApi()
  const { searchStr, setSearchStr } = useBookContext()
  const [triggerQuery, setTriggerQuery] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const {
    data: searchedBooks,
    isLoading,
    error
  } = useQuery({
    queryKey: ['searchedBooks', searchStr],
    queryFn: () => searchBooks(searchStr),
    enabled: triggerQuery && !!searchStr
  })
  console.log('searchStr', { searchStr, searchedBooks, triggerQuery })
  const handleSubmit = useCallback(
    (reset: UseFormReset<FormValues>) => (data: FormValues) => {
      setSearchStr(data.searchStr)
      setTriggerQuery(true)
      reset()
    },
    [setSearchStr]
  )
  const cachedData = queryClient.getQueryData(['searchedBooks', searchStr])
  const allCacheData = queryClient
  console.log('Cached Data:', { cachedData, allCacheData })

  useEffect(() => {
    if (triggerQuery) {
      setTriggerQuery(false)
    }
  }, [triggerQuery])

  const updatedBooks = (searchedBooks ?? []).map(
    book => getByIdFromDB(book.id) ?? book
  )

  return (
    <Container title="Book Search">
      <SearchForm onSubmit={handleSubmit} />
      <BookList books={updatedBooks} isLoading={isLoading} error={error} />
    </Container>
  )
}

export default HomePage
