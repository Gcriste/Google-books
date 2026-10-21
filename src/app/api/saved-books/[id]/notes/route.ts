import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getOwnerKey } from '@/lib/owner'
import { insertNote, selectSavedBooks, upsertBook } from '@/lib/saved-books'
import type { BookType } from '@/app/types'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

type NotePayload = {
  book: BookType
  note: { title: string; message: string }
}

/**
 * Adds a note. The book is cached first because a note can be written for a
 * book nobody has saved yet, and the foreign key requires the row.
 */
export async function POST(request: Request, { params }: RouteContext) {
  const ownerKey = await getOwnerKey()
  if (!ownerKey) {
    return NextResponse.json({ error: 'Missing owner' }, { status: 400 })
  }

  const { id } = await params
  const { book, note } = (await request.json()) as NotePayload

  if (!book?.volumeInfo) {
    return NextResponse.json({ error: 'Missing book data' }, { status: 400 })
  }
  if (!note?.title?.trim() || !note?.message?.trim()) {
    return NextResponse.json(
      { error: 'Note title and message are required' },
      { status: 400 }
    )
  }

  const sql = getSql()
  await sql.transaction([
    upsertBook(sql, { ...book, id }),
    insertNote(sql, ownerKey, id, note)
  ])

  const savedBooks = await selectSavedBooks(sql, ownerKey)
  return NextResponse.json(savedBooks)
}
