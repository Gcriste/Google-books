import { Button, Flex } from './common'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormValues } from '@/app/types'

type OwnProps = {
  onSubmit: SubmitHandler<FormValues>
}

const SearchForm = ({ onSubmit }: OwnProps) => {
  const { register, handleSubmit } = useForm<FormValues>()
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center space-x-2"
    >
      <Flex gap="gap-0" className="w-full">
        <input
          type="text"
          {...register('searchStr')}
          placeholder="Search for books..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Button type="submit" variant="primary" className="min-w-[150px]">
          Search
        </Button>
      </Flex>
    </form>
  )
}

export default SearchForm
