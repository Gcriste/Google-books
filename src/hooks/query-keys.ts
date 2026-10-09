/**
 * Every React Query cache key in the app.
 *
 * Centralized so a key cannot drift between the place that reads it and the
 * place that invalidates it — a bug this codebase has already had once, when a
 * book-details query used `['bookDetails']` with no id and collided across
 * every book.
 */
export const queryKeys = {
  savedBooks: ['savedBooks'] as const,
  bookSearch: (searchStr: string) => ['bookSearch', searchStr] as const,
  bookDetails: (id: string) => ['bookDetails', id] as const
}
