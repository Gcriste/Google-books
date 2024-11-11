import { Button, Flex, Text } from './common'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { FormValues } from '@/app/types'

type OwnProps = {
  onSubmit: SubmitHandler<FormValues>
}

const SearchForm = ({ onSubmit }: OwnProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="gap-0" className="w-full">
        <input
          type="text"
          {...register('searchStr', { required: 'Search cannot be empty' })}
          placeholder="Search for books"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        <Button type="submit" variant="secondary" className="min-w-[150px]">
          Search
        </Button>
      </Flex>
      {errors.searchStr && (
        <Text variant="error">{errors.searchStr.message}</Text>
      )}
    </form>
  )
}

export default SearchForm
