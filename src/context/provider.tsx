'use client'
import type { FC, PropsWithChildren } from 'react'
import { useMemo, useState } from 'react'
import { BookState } from './types'
import { BookType } from '@/app/types'
import { BookStore } from './store'

const { Provider } = BookStore

const BookContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchedBooks, setSearchedBooks] = useState<BookType[]>([])

  const value: BookState = useMemo(() => {
    return {
      searchedBooks,
      setSearchedBooks
    }
  }, [searchedBooks])

  return <Provider value={value}>{children}</Provider>
}

export default BookContextProvider
