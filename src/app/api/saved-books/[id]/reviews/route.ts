import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getOwnerKey } from '@/lib/owner'
import {
  insertReview,
  selectSavedBooks,
  upsertBookKeepingFavorite
} from '@/lib/saved-books'
import type { BookType } from '@/app/types'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

type ReviewPayload = {
  book: BookType
  review: { title: string; message: string; rating: number }
}

/**
 * Adds a review. The book is upserted first because a review can be written
 * for a book that was never favorited, and the foreign key requires the row.
 */
export async function POST(request: Request, { params }: RouteContext) {
  const ownerKey = await getOwnerKey()
  if (!ownerKey) {
    return NextResponse.json({ error: 'Missing owner' }, { status: 400 })
  }

  const { id } = await params
  const { book, review } = (await request.json()) as ReviewPayload

  if (!book?.volumeInfo) {
    return NextResponse.json({ error: 'Missing book data' }, { status: 400 })
  }
  if (!review?.title?.trim() || !review?.message?.trim()) {
    return NextResponse.json(
      { error: 'Review title and message are required' },
      { status: 400 }
    )
  }
  if (
    !Number.isInteger(review.rating) ||
    review.rating < 1 ||
    review.rating > 5
  ) {
    return NextResponse.json(
      { error: 'Rating must be between 1 and 5' },
      { status: 400 }
    )
  }

  const sql = getSql()
  await sql.transaction([
    upsertBookKeepingFavorite(sql, ownerKey, { ...book, id }),
    insertReview(sql, ownerKey, id, review)
  ])

  const savedBooks = await selectSavedBooks(sql, ownerKey)
  return NextResponse.json(savedBooks)
}
