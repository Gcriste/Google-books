'use client'

import { useQuery } from '@tanstack/react-query'
import { BooksApiError, getBookDetails, searchBooks } from '@/services/books'
import { queryKeys } from './query-keys'

const retryTransient = (failureCount: number, error: Error) => {
  if (error instanceof BooksApiError && error.status < 500) return false
  return failureCount < 5
}

export const useBookSearch = (searchStr: string) =>
  useQuery({
    queryKey: queryKeys.bookSearch(searchStr),
    queryFn: () => searchBooks(searchStr),
    enabled: !!searchStr,
    retry: retryTransient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

export const useBookDetails = (id?: string) =>
  useQuery({
    queryKey: queryKeys.bookDetails(id ?? ''),
    queryFn: () => getBookDetails(id as string),
    enabled: !!id,
    retry: retryTransient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })
