import Book from './book'
import { Box, Divider, Text } from '../common'
import type { BookType } from '@/app/types'
import BookSkeleton from './book-skeleton'

type OwnProps = {
  books: BookType[]
  isLoading?: boolean
  isMyReviews?: boolean
  error: Error | null
}

const BookList = ({ books, isLoading, isMyReviews, error }: OwnProps) => {
  if (isLoading) {
    return Array.from({ length: 10 }).map((i, idx) => (
      <BookSkeleton key={`${i}-${idx}`} />
    ))
  }

  if (error) {
    return (
      <Text variant="error">Oops! There is an error with your request.</Text>
    )
  }

  return (
    books.length > 0 &&
    books.map((book, idx) => (
      <Box key={`${book.id}-${idx}`}>
        {idx !== 0 && <Divider />}
        <Book book={book} isMyReviews={isMyReviews} />
      </Box>
    ))
  )
}

export default BookList
