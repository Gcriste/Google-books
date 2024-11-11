'use client'
import type { FC, PropsWithChildren } from 'react'
import { useMemo, useState } from 'react'
import type { BookState } from './types'
import { BookStore } from './store'

const { Provider } = BookStore

const BookContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchStr, setSearchStr] = useState<string>('')

  const value: BookState = useMemo(() => {
    return {
      searchStr,
      setSearchStr
    }
  }, [searchStr])

  return <Provider value={value}>{children}</Provider>
}

export default BookContextProvider
