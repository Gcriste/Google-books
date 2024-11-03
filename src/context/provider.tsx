"use client"
import type { FC, PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'
import { BookState} from './types'
import { Book } from '@/app/types'
import { BookStore } from './store'

const { Provider} = BookStore


const BookContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]
  >([])

  const value: BookState = useMemo(() => {
    return {
        searchedBooks,
        setSearchedBooks
    }
  }, [searchedBooks])

  return <Provider value={value}>{children}</Provider>
}

export default BookContextProvider
