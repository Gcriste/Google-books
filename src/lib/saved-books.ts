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

/**
 * Reads every book an owner has a relationship with -- favorited, reviewed, or
 * both -- with its reviews nested and `isFavorite` derived from whether a
 * `favorites` row exists.
 *
 * Driven off `owned` rather than scanning `books`, because `books` is global:
 * it holds every book any user has ever saved, so filtering it after the fact
 * would mean reading the whole table on every request.
 */
export const selectSavedBooks = async (
  sql: Sql,
  ownerKey: string
): Promise<SavedBook> => {
  const rows = (await sql`
    with owned as (
      select book_id from favorites where owner_key = ${ownerKey}
      union
      select book_id from reviews where owner_key = ${ownerKey}
    )
    select
      b.book_id,
      (f.owner_key is not null) as is_favorite,
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
    from owned o
    join books b on b.book_id = o.book_id
    left join favorites f
      on f.book_id = o.book_id and f.owner_key = ${ownerKey}
    left join reviews r
      on r.book_id = o.book_id and r.owner_key = ${ownerKey}
    group by b.book_id, f.owner_key, b.volume_info, b.sale_info, b.self_link
  `) as SavedBookRow[]

  return rows.reduce<SavedBook>((acc, row) => {
    acc[row.book_id] = rowToBook(row)
    return acc
  }, {})
}

/**
 * Caches a book's metadata. Shared by every user, so it carries no owner and
 * no favorite state -- favoriting and reviewing are separate rows in separate
 * tables, and neither can disturb the other.
 *
 * Returns the lazy query rather than awaiting it so callers can compose it
 * into `sql.transaction([...])`.
 */
export const upsertBook = (sql: Sql, book: BookType) => sql`
  insert into books (book_id, volume_info, sale_info, self_link)
  values (
    ${book.id},
    ${JSON.stringify(book.volumeInfo ?? {})}::jsonb,
    ${JSON.stringify(book.saleInfo ?? {})}::jsonb,
    ${book.selfLink ?? null}
  )
  on conflict (book_id) do update set
    volume_info = excluded.volume_info,
    sale_info   = excluded.sale_info,
    self_link   = excluded.self_link,
    updated_at  = now()
`

/** Favorites a book. Idempotent, so double-clicking the button is harmless. */
export const insertFavorite = (
  sql: Sql,
  ownerKey: string,
  bookId: string
) => sql`
  insert into favorites (owner_key, book_id)
  values (${ownerKey}, ${bookId})
  on conflict (owner_key, book_id) do nothing
`

/** Unfavorites a book. Reviews live in their own table and are unaffected. */
export const deleteFavorite = (
  sql: Sql,
  ownerKey: string,
  bookId: string
) => sql`
  delete from favorites
  where owner_key = ${ownerKey} and book_id = ${bookId}
`

/**
 * Reclaims a cached book once no user favorites or reviews it, so `books`
 * stays bounded to rows something actually points at.
 *
 * Safe by construction: both FKs are `on delete restrict`, so if this guard
 * were ever wrong the delete would fail rather than take reviews with it. The
 * worst real outcome is dropping a cache row the client re-sends on the next
 * favorite.
 */
export const deleteBookIfUnreferenced = (sql: Sql, bookId: string) => sql`
  delete from books b
  where b.book_id = ${bookId}
    and not exists (select 1 from favorites f where f.book_id = b.book_id)
    and not exists (select 1 from reviews r where r.book_id = b.book_id)
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
