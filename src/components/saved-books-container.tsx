import BookList from './books/book-list'
import { Text } from './common'
import type { BookType } from '@/app/types'

type OwnProps = {
  books: BookType[]
  isLoading?: boolean
  error: Error | null
  emptyText: string
  isMyReviews?: boolean
}

/**
 * Renders a list of saved books, or an empty message. Purely presentational —
 * the page decides which books these are.
 */
const SavedBooksContainer = ({
  books,
  isLoading,
  error,
  emptyText,
  isMyReviews
}: OwnProps) => {
  // Only claim the list is empty once we actually know it is. Falling through
  // while loading or erroring lets BookList show its skeletons or its message.
  if (!isLoading && !error && !books.length) return <Text>{emptyText}</Text>

  return (
    <BookList
      books={books}
      isLoading={isLoading}
      isMyReviews={isMyReviews}
      error={error}
    />
  )
}

export default SavedBooksContainer
