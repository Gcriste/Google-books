'use client'

import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addReview, fetchSavedBooks, updateBook } from '@/services/saved-books'
import type { BookType, NewReview, SavedBook } from '@/app/types'
import { queryKeys } from './query-keys'

/**
 * The app's saved books, fetched once and shared.
 *
 * React Query dedupes by query key, so every component calling this hook reads
 * the same cached map from a single request. That lets `getById` stay
 * synchronous, which is what keeps the call sites that read saved state during
 * render from having to become async.
 */
export const useSavedBooks = () => {
  const {
    data: savedBooks = {},
    isLoading,
    error
  } = useQuery<SavedBook>({
    queryKey: queryKeys.savedBooks,
    queryFn: fetchSavedBooks
  })

  const getById = useCallback(
    (id?: string): BookType | undefined => (id ? savedBooks[id] : undefined),
    [savedBooks]
  )

  return { savedBooks, getById, isLoading, error }
}

// Defined at module scope so React Query can memoize them. An inline arrow
// would be a new function identity each render, re-filtering every time.
const selectFavorites = (books: SavedBook): BookType[] =>
  Object.values(books).filter(book => book.isFavorite)

const selectWithReviews = (books: SavedBook): BookType[] =>
  Object.values(books).filter(book => !!book.reviews?.length)

/**
 * Saved books the user has favorited.
 *
 * Shares `queryKeys.savedBooks` with `useSavedBooks`, so this adds no cache
 * entry and no extra request — it is a filtered view of the same fetch.
 */
export const useFavoriteBooks = () =>
  useQuery({
    queryKey: queryKeys.savedBooks,
    queryFn: fetchSavedBooks,
    select: selectFavorites
  })

/** Saved books the user has written at least one review for. */
export const useBooksWithReviews = () =>
  useQuery({
    queryKey: queryKeys.savedBooks,
    queryFn: fetchSavedBooks,
    select: selectWithReviews
  })

/**
 * Writes share one cache-update strategy: every endpoint returns the full
 * updated map, so the response seeds the cache directly rather than triggering
 * a second round trip to refetch it.
 */
const useSavedBooksMutation = <TVariables>(
  mutationFn: (variables: TVariables) => Promise<SavedBook>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: savedBooks =>
      queryClient.setQueryData(queryKeys.savedBooks, savedBooks)
  })
}

/**
 * Add or remove a favorite.
 *
 * Updates the cache optimistically so the button flips immediately. That also
 * makes the cache the only source of truth for whether a book is favorited —
 * components must not mirror it in local state, which would go stale when the
 * saved-books query resolves after the first render.
 */
export const useUpdateBook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBook,
    onMutate: async (book: BookType) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savedBooks })
      const previous = queryClient.getQueryData<SavedBook>(queryKeys.savedBooks)

      queryClient.setQueryData<SavedBook>(queryKeys.savedBooks, current => ({
        ...(current ?? {}),
        // The book may come from search results, which carry no reviews —
        // keep whatever the cache already holds for it.
        [book.id]: {
          ...book,
          reviews: book.reviews ?? current?.[book.id]?.reviews ?? []
        }
      }))

      return { previous }
    },
    onError: (_error, _book, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.savedBooks, context.previous)
      }
    },
    onSuccess: savedBooks =>
      queryClient.setQueryData(queryKeys.savedBooks, savedBooks)
  })
}

/** Write a review, upserting the book if it was never saved. */
export const useAddReview = () =>
  useSavedBooksMutation<{ book: BookType; review: NewReview }>(addReview)
