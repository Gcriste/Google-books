import { createContext } from 'react'
import type { BookState } from './types'

const initialState: BookState = {
  searchStr: '',
  setSearchStr: () => undefined
}

export const BookStore = createContext<BookState>(initialState)
