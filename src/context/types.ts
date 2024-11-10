import { BookType } from '@/app/types'
import { Dispatch, SetStateAction } from 'react'

export type BookState = {
  searchedBooks: BookType[]
  setSearchedBooks: Dispatch<SetStateAction<BookType[]>>
}
