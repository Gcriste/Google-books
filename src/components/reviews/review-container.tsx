import { Box, Button, Flex, Pagination, Text } from '../common'
import type { BookType, Review } from '@/app/types'
import Rating from './rating'
import ReviewForm from './review-form'
import { useMutation } from '@tanstack/react-query'
import { useApi } from '@/api'
import { useCallback, useState } from 'react'

type OwnProps = {
  book: BookType
  reviews?: Review[]
  isMyReviews?: boolean
}

const ReviewContainer = ({ book, reviews, isMyReviews }: OwnProps) => {
  const { updateBook } = useApi()
  const [reviewList, setReviewList] = useState<Review[]>(reviews || [])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showReviews, setShowReviews] = useState<boolean | undefined>(
    isMyReviews
  )

  const totalPages = Math.ceil(reviewList.length / 5)
  const countPerPage = 5
  const currentReviewsList = showReviews ? reviewList : reviewList.slice(0, 1)
  const slicedReivewList = currentReviewsList.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleShowAllReviews = useCallback(() => {
    setShowReviews(prev => !prev)
  }, [])

  const { mutate: updateBookFromStorage, isPending } = useMutation({
    mutationFn: updateBook,
    onSuccess: updatedBooks => {
      setReviewList(updatedBooks[book.id]?.reviews || [])
    }
  })

  return (
    <>
      <Flex direction="col" gap="gap-2">
        <Text variant="heading" size="xLarge">
          Reviews
        </Text>
        <Flex
          direction="col"
          minHeight={currentReviewsList.length > 5 ? '27em' : 'none'}
        >
          {slicedReivewList.length > 0 ? (
            slicedReivewList.map(
              ({ id, rating, title, lastUpdated, message }) => (
                <Box key={id}>
                  <Flex direction="col">
                    <Flex align="center" justify="between">
                      <Flex align="center">
                        <Rating
                          rating={Number(rating ?? '0')}
                          disableCursorPointer
                        />
                        <Text variant="heading">{title}</Text>
                      </Flex>
                      <Text>Last updated: {lastUpdated}</Text>
                    </Flex>
                    <Flex justify="between">
                      <Text>{message}</Text>
                    </Flex>
                  </Flex>
                  {!showReviews && reviewList.length > 1 && (
                    <Flex justify="end">
                      <Button
                        variant="ghost"
                        className="text-primary font-bold"
                        onClick={handleShowAllReviews}
                      >
                        Show all reviews
                      </Button>
                    </Flex>
                  )}
                </Box>
              )
            )
          ) : (
            <Text>No reviews written yet</Text>
          )}
        </Flex>
        {currentReviewsList.length > 5 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Flex>
      <ReviewForm book={book} updateBookFromStorage={updateBookFromStorage} />
    </>
  )
}

export default ReviewContainer
