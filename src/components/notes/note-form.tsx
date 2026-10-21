'use client'
import { useCallback } from 'react'
import type { FormValues, NewNote } from '@/app/types'
import { Button, Flex, Text } from '../common'
import { useForm } from 'react-hook-form'

type OwnProps = {
  onAddNote: (note: NewNote) => void
  isPending?: boolean
}

const NoteForm = ({ onAddNote, isPending }: OwnProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      noteText: ''
    }
  })

  const onSubmit = useCallback(
    (data: FormValues) => {
      onAddNote({
        title: data.title,
        message: data.noteText
      })
      reset()
    },
    [onAddNote, reset]
  )

  return (
    <Flex direction="col" gap="gap-2">
      <Text variant="subheading" size="large">
        Add a Note
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500"
          placeholder="Note title"
        />
        {errors.title && <Text variant="error">{errors.title.message}</Text>}

        <textarea
          {...register('noteText', { required: 'Note is required' })}
          placeholder="Note description"
          className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          rows={4}
        ></textarea>
        {errors.noteText && (
          <Text variant="error">{errors.noteText.message}</Text>
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
export default NoteForm
