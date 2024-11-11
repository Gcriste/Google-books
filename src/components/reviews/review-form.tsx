'use client'
import { useCallback } from 'react'
import Rating from './rating'
import type { BookType, FormValues } from '@/app/types'
import { format } from 'date-fns/format'
import { Button, Flex, Text } from '../common'
import type { UseMutateFunction } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

type OwnProps = {
  book: BookType
  updateBookFromStorage: UseMutateFunction<
    {
      [x: string]: BookType
    },
    Error,
    BookType,
    unknown
  >
}

const ReviewForm = ({ book, updateBookFromStorage }: OwnProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      reviewText: '',
      rating: 0
    }
  })

  const rating = watch('rating')

  const handleRatingClick = useCallback(
    (selectedRating: number) => () => {
      setValue('rating', selectedRating, { shouldValidate: true })
    },
    [setValue]
  )

  const onSubmit = (data: FormValues) => {
    if (data.rating === 0) {
      setError('rating', {
        type: 'manual',
        message: 'Rating is required'
      })
      return
    }
    const { title, reviewText, rating } = data
    const formattedDate = format(new Date(), 'MMMM dd, yyyy')
    updateBookFromStorage({
      ...((book ?? {}) as BookType),
      [book.id]: book.id,
      reviews: [
        ...(book?.reviews ?? []),
        {
          id: crypto.randomUUID(),
          title,
          message: reviewText,
          rating,
          lastUpdated: formattedDate
        }
      ]
    })
    reset()
  }

  return (
    <Flex direction="col" gap="gap-2">
      <Text variant="subheading" size="large">
        Leave a Review
      </Text>

      <Rating rating={rating} handleRatingClick={handleRatingClick} />
      {errors?.rating && <Text variant="error">{errors?.rating.message}</Text>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500"
          placeholder="Review title"
        />
        {errors.title && <Text variant="error">{errors.title.message}</Text>}

        <textarea
          {...register('reviewText', { required: 'Review is required' })}
          placeholder="Review description"
          className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          rows={4}
        ></textarea>
        {errors.reviewText && (
          <Text variant="error">{errors.reviewText.message}</Text>
        )}
        <Flex>
          <Button type="submit" className="min-w-40">
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
export default ReviewForm
