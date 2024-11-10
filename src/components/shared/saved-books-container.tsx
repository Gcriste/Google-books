'use client'

import BookList from './book-list'
import { Box, Text } from '../common'
import { useApi } from '@/api'
import { useQuery } from '@tanstack/react-query'

type OwnProps = {
  isMyReviews?: boolean
}

const SavedBooksContainer = ({ isMyReviews }: OwnProps) => {
  const { getAll } = useApi()
  const { data: currentBooks = {}, isLoading } = useQuery({
    queryKey: ['savedBooks'],
    queryFn: getAll
  })

  const savedBooks = Object.values(currentBooks)
  const favoriteBooks = savedBooks.filter(book => book.isFavorite)
  const booksWithReviews = savedBooks.filter(book => !!book.reviews?.length)

  const favorites = {
    hasLength: favoriteBooks.length,
    emptyText: 'No favorites selected'
  }

  const reviews = {
    hasLength: booksWithReviews.length,
    emptyText: 'No reviews written'
  }

  const { hasLength, emptyText } = isMyReviews ? reviews : favorites
  return (
    <Box>
      {hasLength ? (
        <BookList
          books={isMyReviews ? booksWithReviews : favoriteBooks}
          isLoading={isLoading}
          isMyReviews={isMyReviews}
        />
      ) : (
        <Text>{emptyText}</Text>
      )}
    </Box>
  )
}

export default SavedBooksContainer
