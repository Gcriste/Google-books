'use client'

import BookList from './books/book-list'
import { Text } from './common'
import { useApi } from '@/api'
import { useQuery } from '@tanstack/react-query'

type OwnProps = {
  isMyReviews?: boolean
}

const SavedBooksContainer = ({ isMyReviews }: OwnProps) => {
  const { getAllFromDB } = useApi()
  const {
    data: currentBooks = {},
    isLoading,
    error
  } = useQuery({
    queryKey: ['savedBooks'],
    queryFn: getAllFromDB
  })

  const savedBooks = Object.values(currentBooks)
  const favoriteBooks = savedBooks.filter(book => book.isFavorite)
  const booksWithReviews = savedBooks.filter(book => !!book.reviews?.length)

  const favorites = {
    books: favoriteBooks,
    hasLength: favoriteBooks.length,
    emptyText: 'No favorites selected'
  }

  const reviews = {
    books: booksWithReviews,
    hasLength: booksWithReviews.length,
    emptyText: 'No reviews written'
  }

  const { hasLength, emptyText, books } = isMyReviews ? reviews : favorites
  return hasLength ? (
    <BookList
      books={books}
      isLoading={isLoading}
      isMyReviews={isMyReviews}
      error={error}
    />
  ) : (
    <Text>{emptyText}</Text>
  )
}

export default SavedBooksContainer
