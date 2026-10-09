import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getOwnerKey } from '@/lib/owner'
import { selectSavedBooks } from '@/lib/saved-books'

export const dynamic = 'force-dynamic'

/** Every saved book for this browser, keyed by book id. */
export async function GET() {
  const ownerKey = await getOwnerKey()
  if (!ownerKey) {
    return NextResponse.json({ error: 'Missing owner' }, { status: 400 })
  }

  const savedBooks = await selectSavedBooks(getSql(), ownerKey)
  return NextResponse.json(savedBooks)
}
