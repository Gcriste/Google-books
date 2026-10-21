import { Box, Button, Flex, Pagination, Text } from '../common'
import type { BookType, NewNote, Note } from '@/app/types'
import NoteForm from './note-form'
import NoteItem from './note-item'
import { useAddNote } from '@/hooks/use-saved-books'
import { useUser } from '@/hooks/use-user'
import { useCallback, useMemo, useState } from 'react'

type OwnProps = {
  book: BookType
  notes?: Note[]
  isMyNotes?: boolean
}

const NoteContainer = ({ book, notes, isMyNotes }: OwnProps) => {
  const { mutate: addNote, isPending, error } = useAddNote()
  const { isSignedIn } = useUser()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showNotes, setShowNotes] = useState<boolean | undefined>(isMyNotes)

  // Derived from the prop rather than held in state: the saved-books cache is
  // the source of truth, so a new note flows back down on its own.
  const noteList = useMemo(() => notes ?? [], [notes])

  const totalPages = Math.ceil(noteList.length / 5)
  const countPerPage = 5
  const currentNotesList = showNotes ? noteList : noteList.slice(0, 1)
  // Deleting the last note on a page can leave currentPage past the end.
  const activePage = Math.min(currentPage, Math.max(totalPages, 1))
  const slicedNoteList = currentNotesList.slice(
    (activePage - 1) * countPerPage,
    activePage * countPerPage
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleShowAllNotes = useCallback(() => {
    setShowNotes(prev => !prev)
  }, [])

  const handleAddNote = useCallback(
    (note: NewNote) => {
      addNote({ book, note })
    },
    [addNote, book]
  )

  if (!isSignedIn) return null

  return (
    <>
      <Flex direction="col" gap="gap-2" className={isMyNotes ? 'mt-8' : ''}>
        <Text variant="heading" size="xLarge">
          Notes
        </Text>
        <Flex
          direction="col"
          minHeight={currentNotesList.length > 5 ? '27em' : 'none'}
        >
          {slicedNoteList.length > 0 ? (
            slicedNoteList.map(note => (
              <Box key={note.id}>
                <NoteItem book={book} note={note} />
                {!showNotes && noteList.length > 1 && (
                  <Flex justify="end">
                    <Button
                      variant="ghost"
                      className="text-primary font-bold"
                      onClick={handleShowAllNotes}
                    >
                      Show all notes
                    </Button>
                  </Flex>
                )}
              </Box>
            ))
          ) : (
            <Text>No notes written yet</Text>
          )}
        </Flex>
        {currentNotesList.length > 5 && (
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Flex>
      <Flex className={isMyNotes ? 'mt-8' : ''}>
        <NoteForm onSubmitNote={handleAddNote} isPending={isPending} />
      </Flex>
      {error && <Text variant="error">{error.message}</Text>}
    </>
  )
}

export default NoteContainer
