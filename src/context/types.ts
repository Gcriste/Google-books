import type { BookType } from '@/app/types'
import type { Dispatch, SetStateAction } from 'react'

export type BookState = {
  searchedBooks: BookType[]
  setSearchedBooks: Dispatch<SetStateAction<BookType[]>>
}
