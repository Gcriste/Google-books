/* eslint-disable @next/next/no-img-element */
import type { BookType } from '@/app/types'
import Link from 'next/link'
import { Box, Button, Flex, Text } from '../common'
import { useCallback } from 'react'
import { useUpdateBook } from '@/hooks/use-saved-books'
import ReviewContainer from '../reviews/review-container'
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

  const cleanDescription = description?.replace(/<[^>]*>/g, '') ?? ''
  const shortDescription =
    !isDetails && !isMyReviews && cleanDescription.length > 500
      ? `${cleanDescription?.slice(0, 500)}...view more`
      : cleanDescription

  // Favorite state is read straight off the cached book and updated
  // optimistically by the mutation, so it can never drift out of sync.
  const handleClick = useCallback(
    (action: 'add' | 'remove') => () => {
      updateBook({ ...book, isFavorite: action === 'add' })
    },
    [book, updateBook]
  )

  if (isLoading) return <BookSkeleton isDetails={isDetails} />

  return (
    <>
      <Flex direction="col">
        <Flex justify="between">
          {imageLinks && (
            <img src={imageLinks.thumbnail} alt={title} width="150em" />
          )}
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
