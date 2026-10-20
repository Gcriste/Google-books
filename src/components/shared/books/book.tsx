/* eslint-disable @next/next/no-img-element */
import type { BookType } from '@/app/types'
import Link from 'next/link'
import { Box, Button, Flex, Text } from '../../common'
import { useCallback, useState } from 'react'
import { useRemoveFavorite, useUpdateBook } from '@/hooks/use-saved-books'
import { useUser } from '@/hooks/use-user'
import ReviewContainer from '../../reviews/review-container'
import { formatDate, formatPrice } from '@/helpers'
import BookSkeleton from './book-skeleton'

type OwnProps = {
  book: BookType
  isLoading?: boolean
  isDetails?: boolean
  isMyReviews?: boolean
}

const Book = ({ book, isLoading, isDetails, isMyReviews }: OwnProps) => {
  const { mutate: updateBook } = useUpdateBook()
  const { mutate: removeFavorite } = useRemoveFavorite()
  const { isSignedIn } = useUser()
  const [isViewMore, setIsViewMore] = useState(false)

  const {
    id,
    isFavorite,
    reviews,
    volumeInfo: {
      title,
      authors,
      subtitle,
      description,
      publisher,
      publishedDate,
      categories,
      imageLinks
    },
    saleInfo: { buyLink, listPrice }
  } = book

  const handleViewMore = useCallback(() => {
    setIsViewMore(true)
  }, [])

  const cleanDescription = description?.replace(/<[^>]*>/g, '') ?? ''
  const shortDescription =
    !isViewMore &&
    !isDetails &&
    !isMyReviews &&
    cleanDescription.length > 500 ? (
      <>
        {cleanDescription?.slice(0, 500)}
        <button onClick={handleViewMore}>...view more</button>
      </>
    ) : (
      cleanDescription
    )

  // Favorite state is read straight off the cached book and updated
  // optimistically by the mutation, so it can never drift out of sync.
  //
  // Removing is a different operation, not the same write with a false flag:
  // a book with no reviews is deleted outright, so it leaves the cache
  // entirely rather than lingering as an unfavorited row.
  const handleClick = useCallback(
    (action: 'add' | 'remove') => () => {
      if (action === 'remove') return removeFavorite(book)

      updateBook({ ...book, isFavorite: true })
    },
    [book, removeFavorite, updateBook]
  )

  if (isLoading) return <BookSkeleton isDetails={isDetails} />

  return (
    <>
      <Flex direction="col">
        <Flex justify="between">
          {imageLinks && (
            <img src={imageLinks.thumbnail} alt={title} width="150em" />
          )}
          {isSignedIn && (
            <Box>
              {isFavorite ? (
                <Button variant="danger" onClick={handleClick('remove')}>
                  Remove from favorites
                </Button>
              ) : (
                <Button variant="primary" onClick={handleClick('add')}>
                  Add to favorites
                </Button>
              )}
            </Box>
          )}
        </Flex>
        <Flex direction="col" gap="gap-2">
          <Flex align="center">
            <Text variant="heading" size="xLarge">
              {title}
            </Text>
            {authors?.map((author, idx) => (
              <Text key={`${author}-${idx}`} variant="subheading" size="large">
                {author}
              </Text>
            ))}
          </Flex>
          <Text variant="subheading">{subtitle}</Text>
          {isDetails && (
            <Flex direction="col">
              <Text>Categories: {categories}</Text>
              <Text>
                Published by {publisher} on {formatDate(publishedDate)}
              </Text>
            </Flex>
          )}
          <Text>{shortDescription}</Text>
        </Flex>
      </Flex>
      {isDetails && (buyLink || listPrice) && (
        <Flex direction="col" gap="gap-2">
          <Text variant="subheading" size="large">
            Sale info
          </Text>
          <Flex>
            <Text>{formatPrice(listPrice)}</Text>
            {buyLink && <Link href={buyLink}>Buy now</Link>}
          </Flex>
        </Flex>
      )}
      {isDetails || isMyReviews ? (
        <ReviewContainer
          book={book}
          reviews={reviews}
          isMyReviews={isMyReviews}
        />
      ) : (
        <Link
          href={`/detail/${id}`}
          className="hover:blue-300 text-primary font-bold"
        >
          View more details
        </Link>
      )}
    </>
  )
}

export default Book
