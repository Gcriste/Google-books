'use client'

import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addNote,
  deleteNote,
  fetchSavedBooks,
  removeFavorite,
  updateBook,
  updateNote
} from '@/services/saved-books'
import type { BookType, NewNote, SavedBook } from '@/app/types'
import { queryKeys } from './query-keys'
import { useUser } from './use-user'

/**
 * The app's saved books, fetched once and shared.
 *
 * React Query dedupes by query key, so every component calling this hook reads
 * the same cached map from a single request. That lets `getById` stay
 * synchronous, which is what keeps the call sites that read saved state during
 * render from having to become async.
 */
export const useSavedBooks = () => {
  const { isSignedIn } = useUser()

  const {
    data: savedBooks = {},
    isLoading,
    error
  } = useQuery<SavedBook>({
    queryKey: queryKeys.savedBooks,
    queryFn: fetchSavedBooks,
    // Saved books belong to an account. Without one the request would be a
    // guaranteed 400, so don't make it — public pages just see an empty shelf.
    enabled: isSignedIn
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

const selectWithNotes = (books: SavedBook): BookType[] =>
  Object.values(books).filter(book => !!book.notes?.length)

/**
 * Saved books the user has favorited.
 *
 * Shares `queryKeys.savedBooks` with `useSavedBooks`, so this adds no cache
 * entry and no extra request — it is a filtered view of the same fetch.
 */
export const useFavoriteBooks = () => {
  const { isSignedIn } = useUser()

  return useQuery({
    queryKey: queryKeys.savedBooks,
    queryFn: fetchSavedBooks,
    select: selectFavorites,
    enabled: isSignedIn
  })
}

/** Saved books the user has written at least one note for. */
export const useBooksWithNotes = () => {
  const { isSignedIn } = useUser()

  return useQuery({
    queryKey: queryKeys.savedBooks,
    queryFn: fetchSavedBooks,
    select: selectWithNotes,
    enabled: isSignedIn
  })
}

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
 * Add a favorite.
 *
 * Updates the cache optimistically so the button flips immediately. That also
 * makes the cache the only source of truth for whether a book is favorited —
 * components must not mirror it in local state, which would go stale when the
 * saved-books query resolves after the first render.
 *
 * Removal is `useRemoveFavorite`, not this with `isFavorite: false` — the
 * server treats the two as different operations.
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
        // The book may come from search results, which carry no notes —
        // keep whatever the cache already holds for it.
        [book.id]: {
          ...book,
          notes: book.notes ?? current?.[book.id]?.notes ?? []
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

/**
 * Remove a favorite.
 *
 * Mirrors `useUpdateBook`'s optimistic pattern, applying the same rule the
 * server applies: a book with notes stays in the map unfavorited (it is
 * still the user's, and /my-notes shows it), while one without notes
 * leaves the map entirely because the server deletes it outright.
 */
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeFavorite,
    onMutate: async (book: BookType) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savedBooks })
      const previous = queryClient.getQueryData<SavedBook>(queryKeys.savedBooks)

      queryClient.setQueryData<SavedBook>(queryKeys.savedBooks, current => {
        const { [book.id]: removed, ...rest } = current ?? {}
        if (!removed?.notes?.length) return rest

        return { ...rest, [book.id]: { ...removed, isFavorite: false } }
      })

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

/** Write a note, caching the book if it was never saved. */
export const useAddNote = () =>
  useSavedBooksMutation<{ book: BookType; note: NewNote }>(addNote)

export const useUpdateNote = () =>
  useSavedBooksMutation<{ book: BookType; noteId: string; note: NewNote }>(
    updateNote
  )

export const useDeleteNote = () =>
  useSavedBooksMutation<{ book: BookType; noteId: string }>(deleteNote)
