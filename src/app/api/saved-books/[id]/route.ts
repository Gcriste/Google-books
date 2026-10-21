import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getOwnerKey } from '@/lib/owner'
import {
  deleteBookIfUnreferenced,
  deleteFavorite,
  insertFavorite,
  selectSavedBooks,
  upsertBook
} from '@/lib/saved-books'
import type { BookType } from '@/app/types'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

/**
 * Caches the book and favorites it. Backs the "Add to favorites" button.
 *
 * Deliberately one-way: removal is DELETE's job, so an `isFavorite: false` in
 * the body is not honored here.
 */
export async function PUT(request: Request, { params }: RouteContext) {
  const ownerKey = await getOwnerKey()
  if (!ownerKey) {
    return NextResponse.json({ error: 'Missing owner' }, { status: 400 })
  }

  const { id } = await params
  const book = (await request.json()) as BookType

  if (!book?.volumeInfo) {
    return NextResponse.json({ error: 'Missing book data' }, { status: 400 })
  }

  const sql = getSql()
  await sql.transaction([
    upsertBook(sql, { ...book, id }),
    insertFavorite(sql, ownerKey, id)
  ])

  const savedBooks = await selectSavedBooks(sql, ownerKey)
  return NextResponse.json(savedBooks)
}

/**
 * Unfavorites a book, dropping the cached metadata too once nothing else
 * points at it. Takes no body -- the id in the path is all it needs.
 *
 * A book the owner has noted keeps its `books` row (the guard inside
 * `deleteBookIfUnreferenced` sees the note), so it stays on /my-notes
 * with its notes intact.
 */
export async function DELETE(_request: Request, { params }: RouteContext) {
  const ownerKey = await getOwnerKey()
  if (!ownerKey) {
    return NextResponse.json({ error: 'Missing owner' }, { status: 400 })
  }

  const { id } = await params

  const sql = getSql()
  await sql.transaction([
    deleteFavorite(sql, ownerKey, id),
    deleteBookIfUnreferenced(sql, id)
  ])

  const savedBooks = await selectSavedBooks(sql, ownerKey)
  return NextResponse.json(savedBooks)
}
