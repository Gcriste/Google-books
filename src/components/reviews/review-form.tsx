'use client'
import { useCallback } from 'react'
import Rating from './rating'
import type { FormValues, NewReview } from '@/app/types'
import { Button, Flex, Text } from '../common'
import { useForm } from 'react-hook-form'

type OwnProps = {
  onAddReview: (review: NewReview) => void
  isPending?: boolean
}

const ReviewForm = ({ onAddReview, isPending }: OwnProps) => {
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

  const onSubmit = useCallback(
    (data: FormValues) => {
      if (data.rating === 0) {
        setError('rating', {
          type: 'manual',
          message: 'Rating is required'
        })
        return
      }

      // The book, the review id and the timestamp are all the server's job now.
      onAddReview({
        title: data.title,
        message: data.reviewText,
        rating: data.rating
      })
      reset()
    },
    [onAddReview, reset, setError]
  )

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
          <Button type="submit" className="min-w-40" disabled={isPending}>
            {isPending ? 'Saving...' : 'Submit'}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
export default ReviewForm
