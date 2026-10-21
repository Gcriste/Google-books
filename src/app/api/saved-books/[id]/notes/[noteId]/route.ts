import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getOwnerKey } from '@/lib/owner'
import {
  deleteBookIfUnreferenced,
  deleteNote,
  selectSavedBooks,
  updateNote
} from '@/lib/saved-books'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string; noteId: string }> }

type NotePayload = {
  note: { title: string; message: string }
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function PUT(request: Request, { params }: RouteContext) {
  const ownerKey = await getOwnerKey()
  if (!ownerKey) {
    return NextResponse.json({ error: 'Missing owner' }, { status: 400 })
  }

  const { id, noteId } = await params
  if (!UUID_PATTERN.test(noteId)) {
    return NextResponse.json({ error: 'Invalid note id' }, { status: 400 })
  }

  const { note } = (await request.json()) as NotePayload

  if (!note?.title?.trim() || !note?.message?.trim()) {
    return NextResponse.json(
      { error: 'Note title and message are required' },
      { status: 400 }
    )
  }

  const sql = getSql()
  await updateNote(sql, ownerKey, id, noteId, note)

  const savedBooks = await selectSavedBooks(sql, ownerKey)
  return NextResponse.json(savedBooks)
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const ownerKey = await getOwnerKey()
  if (!ownerKey) {
    return NextResponse.json({ error: 'Missing owner' }, { status: 400 })
  }

  const { id, noteId } = await params
  if (!UUID_PATTERN.test(noteId)) {
    return NextResponse.json({ error: 'Invalid note id' }, { status: 400 })
  }

  const sql = getSql()
  await sql.transaction([
    deleteNote(sql, ownerKey, id, noteId),
    deleteBookIfUnreferenced(sql, id)
  ])

  const savedBooks = await selectSavedBooks(sql, ownerKey)
  return NextResponse.json(savedBooks)
}
