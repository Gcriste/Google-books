import { Button, Flex } from '../common'

type OwnProps = {
  rating: number
  handleRatingClick?: (selectedRating: number) => () => void
  disableCursorPointer?: boolean
}

const Rating = ({
  rating,
  handleRatingClick,
  disableCursorPointer
}: OwnProps) => {
  return (
    <Flex align="center" gap="gap-1">
      {[1, 2, 3, 4, 5].map(num => (
        <Button
          key={num}
          variant="ghost"
          size="none"
          disableCursorPointer={disableCursorPointer}
          className={`text-2xl ${
            num <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={handleRatingClick?.(num)}
        >
          ★
        </Button>
      ))}
    </Flex>
  )
}

export default Rating
