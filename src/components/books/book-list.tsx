import Book from './book'
import { Box, Divider } from '../common'
import type { BookType } from '@/app/types'
import BookSkeleton from './book-skeleton'

type OwnProps = {
  books: BookType[]
  isLoading?: boolean
  isMyReviews?: boolean
}

const BookList = ({ books, isLoading, isMyReviews }: OwnProps) => {
  if (isLoading) {
    return Array.from({ length: 10 }).map((i, idx) => (
      <BookSkeleton key={`${i}-${idx}`} />
    ))
  }

  return (
    <Box>
      {books.length > 0 &&
        books.map((book, idx) => (
          <Box key={`${book.id}-${idx}`}>
            {idx !== 0 && <Divider />}
            <Book book={book} isMyReviews={isMyReviews} />
          </Box>
        ))}
    </Box>
  )
}

export default BookList
