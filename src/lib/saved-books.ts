import 'server-only'
import type { NeonQueryFunction } from '@neondatabase/serverless'
import { format } from 'date-fns/format'
import type {
  BookType,
  Review,
  SaleInfo,
  SavedBook,
  VolumeInfo
} from '@/app/types'

type Sql = NeonQueryFunction<false, false>

/**
 * `Review.lastUpdated` is a pre-formatted display string in the app's types.
 * The database stores a real timestamptz, so it is formatted on the way out
 * and parsed on the way in (import only).
 */
export const REVIEW_DATE_FORMAT = 'MMMM dd, yyyy'

type ReviewRow = {
  id: string
  title: string
  message: string
  rating: number
  updatedAt: string | null
}

type SavedBookRow = {
  book_id: string
  is_favorite: boolean
  volume_info: VolumeInfo
  sale_info: SaleInfo
  self_link: string | null
  reviews: ReviewRow[] | null
}

const toReview = ({
  id,
  title,
  message,
  rating,
  updatedAt
}: ReviewRow): Review => ({
  id,
  title,
  message,
  rating: Number(rating),
  lastUpdated: updatedAt ? format(new Date(updatedAt), REVIEW_DATE_FORMAT) : ''
})

/**
 * The single place where untyped driver rows become typed app objects. If a
 * column is renamed, this is the only function that needs to change.
 */
const rowToBook = (row: SavedBookRow): BookType => ({
  id: row.book_id,
  isFavorite: row.is_favorite,
  volumeInfo: row.volume_info,
  saleInfo: row.sale_info ?? {},
  selfLink: row.self_link ?? '',
  reviews: (row.reviews ?? []).map(toReview)
})

/** Reads every saved book for an owner, with its reviews nested. */
export const selectSavedBooks = async (
  sql: Sql,
  ownerKey: string
): Promise<SavedBook> => {
  const rows = (await sql`
    select
      b.book_id,
      b.is_favorite,
      b.volume_info,
      b.sale_info,
      b.self_link,
      coalesce(
        json_agg(
          json_build_object(
            'id', r.id,
            'title', r.title,
            'message', r.message,
            'rating', r.rating,
            'updatedAt', r.updated_at
          )
          order by r.created_at
        ) filter (where r.id is not null),
        '[]'
      ) as reviews
    from saved_books b
    left join reviews r
      on r.owner_key = b.owner_key and r.book_id = b.book_id
    where b.owner_key = ${ownerKey}
    group by b.book_id, b.is_favorite, b.volume_info, b.sale_info, b.self_link
  `) as SavedBookRow[]

  return rows.reduce<SavedBook>((acc, row) => {
    acc[row.book_id] = rowToBook(row)
    return acc
  }, {})
}

/**
 * Upserts a book and sets its favorite flag. For the favorite toggle, where
 * `isFavorite` is the whole point of the write.
 *
 * Returns the lazy query rather than awaiting it so callers can compose it
 * into `sql.transaction([...])`.
 */
export const upsertBookWithFavorite = (
  sql: Sql,
  ownerKey: string,
  book: BookType
) => sql`
  insert into saved_books
    (owner_key, book_id, is_favorite, volume_info, sale_info, self_link)
  values (
    ${ownerKey},
    ${book.id},
    ${book.isFavorite ?? false},
    ${JSON.stringify(book.volumeInfo ?? {})}::jsonb,
    ${JSON.stringify(book.saleInfo ?? {})}::jsonb,
    ${book.selfLink ?? null}
  )
  on conflict (owner_key, book_id) do update set
    is_favorite = excluded.is_favorite,
    volume_info = excluded.volume_info,
    sale_info   = excluded.sale_info,
    self_link   = excluded.self_link,
    updated_at  = now()
`

/**
 * Upserts a book while leaving an existing favorite flag alone.
 *
 * Used when writing a review: the client may hold a copy of the book fetched
 * from the Google Books API, which carries no `isFavorite`, and reviewing a
 * book must never silently un-favorite it.
 */
export const upsertBookKeepingFavorite = (
  sql: Sql,
  ownerKey: string,
  book: BookType
) => sql`
  insert into saved_books
    (owner_key, book_id, is_favorite, volume_info, sale_info, self_link)
  values (
    ${ownerKey},
    ${book.id},
    ${book.isFavorite ?? false},
    ${JSON.stringify(book.volumeInfo ?? {})}::jsonb,
    ${JSON.stringify(book.saleInfo ?? {})}::jsonb,
    ${book.selfLink ?? null}
  )
  on conflict (owner_key, book_id) do update set
    volume_info = excluded.volume_info,
    sale_info   = excluded.sale_info,
    self_link   = excluded.self_link,
    updated_at  = now()
`

export const insertReview = (
  sql: Sql,
  ownerKey: string,
  bookId: string,
  review: { title: string; message: string; rating: number }
) => sql`
  insert into reviews (owner_key, book_id, title, message, rating)
  values (${ownerKey}, ${bookId}, ${review.title}, ${review.message}, ${review.rating})
`
