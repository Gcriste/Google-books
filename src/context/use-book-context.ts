import { useContext } from 'react'

import { BookStore } from './store'

export const useBookContext = () => useContext(BookStore)
