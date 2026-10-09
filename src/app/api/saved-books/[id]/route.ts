import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getOwnerKey } from '@/lib/owner'
import { selectSavedBooks, upsertBookWithFavorite } from '@/lib/saved-books'
import type { BookType } from '@/app/types'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

/** Upserts a book and its favorite flag. Backs the add/remove favorite button. */
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
  await upsertBookWithFavorite(sql, ownerKey, { ...book, id })

  const savedBooks = await selectSavedBooks(sql, ownerKey)
  return NextResponse.json(savedBooks)
}
