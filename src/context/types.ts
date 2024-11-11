import type { Dispatch, SetStateAction } from 'react'

export type BookState = {
  searchStr: string
  setSearchStr: Dispatch<SetStateAction<string>>
}
