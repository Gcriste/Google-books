'use client'
import { useCallback, useMemo, useState } from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { Box, Button, Flex, Text } from '../common'
import type { BookType, NewNote, Note } from '@/app/types'
import { useDeleteNote, useUpdateNote } from '@/hooks/use-saved-books'
import NoteForm from './note-form'

type Mode = 'view' | 'edit' | 'confirmDelete'

type OwnProps = {
  book: BookType
  note: Note
}

const ACTIONS_CLASS =
  'opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto max-sm:opacity-100 max-sm:pointer-events-auto'

const NoteItem = ({ book, note }: OwnProps) => {
  const [mode, setMode] = useState<Mode>('view')
  const {
    mutate: updateNote,
    isPending: isSaving,
    error: saveError
  } = useUpdateNote()
  const {
    mutate: deleteNote,
    isPending: isDeleting,
    error: deleteError
  } = useDeleteNote()

  const handleEdit = useCallback(() => setMode('edit'), [])
  const handleConfirmDelete = useCallback(() => setMode('confirmDelete'), [])
  const handleCancel = useCallback(() => setMode('view'), [])

  const handleSave = useCallback(
    (updated: NewNote) => {
      updateNote(
        { book, noteId: note.id, note: updated },
        { onSuccess: () => setMode('view') }
      )
    },
    [book, note.id, updateNote]
  )

  const handleDelete = useCallback(() => {
    deleteNote({ book, noteId: note.id })
  }, [book, deleteNote, note.id])

  const initialNote = useMemo<NewNote>(
    () => ({ title: note.title, message: note.message }),
    [note.title, note.message]
  )

  if (mode === 'edit') {
    return (
      <Box>
        <NoteForm
          initialNote={initialNote}
          onSubmitNote={handleSave}
          onCancel={handleCancel}
          isPending={isSaving}
        />
        {saveError && <Text variant="error">{saveError.message}</Text>}
      </Box>
    )
  }

  return (
    <Box>
      <Flex direction="col" gap="gap-1" className="group">
        <Flex align="center" gap="gap-20">
          <Flex align="center" gap="gap-2">
            <Text variant="heading" size="large">
              {note.title}
            </Text>
            <Text size="small">Last updated: {note.lastUpdated}</Text>
          </Flex>
          <Flex align="center" gap="gap-2">
            {mode === 'confirmDelete' ? (
              <Flex align="center" gap="gap-2" data-note-actions>
                <Text>Delete?</Text>
                <Button
                  variant="danger"
                  size="small"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Yes'}
                </Button>
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleCancel}
                  disabled={isDeleting}
                >
                  No
                </Button>
              </Flex>
            ) : (
              <Flex
                align="center"
                gap="gap-1"
                data-note-actions
                className={ACTIONS_CLASS}
              >
                <Button
                  variant="ghost"
                  size="none"
                  className="text-primary p-1"
                  aria-label="Edit note"
                  title="Edit note"
                  onClick={handleEdit}
                >
                  <FaPencilAlt className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="none"
                  className="text-danger p-1"
                  aria-label="Delete note"
                  title="Delete note"
                  onClick={handleConfirmDelete}
                >
                  <FaTrashAlt className="h-4 w-4" />
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex justify="between">
          <Text>{note.message}</Text>
        </Flex>
        {deleteError && <Text variant="error">{deleteError.message}</Text>}
      </Flex>
    </Box>
  )
}

export default NoteItem
