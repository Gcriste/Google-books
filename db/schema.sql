-- Applied by hand in the Neon SQL Editor. Kept in git so the intended schema
-- lives in the repo rather than only in the deployed database.
--
-- If this is ever adopted into an ORM, `npx drizzle-kit pull --init` can
-- introspect the live database and generate a baseline from it.
--
-- Three tables, deliberately: `books` is a global cache of Google Books
-- metadata (one row per book, shared by every user), `favorites` is the
-- per-user relation where row existence IS the favorite, and `reviews` is
-- independent of both -- a book can be reviewed without ever being favorited.
-- An existing database gets here via db/migrations/003-normalize-books-favorites.sql.

create table if not exists books (
  book_id     text        primary key,
  volume_info jsonb       not null,
  sale_info   jsonb       not null default '{}'::jsonb,
  self_link   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists favorites (
  owner_key  text        not null,
  book_id    text        not null references books (book_id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (owner_key, book_id)
);

-- `on delete restrict` on both children, not cascade: a books row is only a
-- metadata cache, so nothing should be able to delete it out from under a
-- review. Reclaiming an unreferenced books row is the app's job, guarded.
create table if not exists reviews (
  id          uuid        primary key default gen_random_uuid(),
  owner_key   text        not null,
  book_id     text        not null references books (book_id) on delete restrict,
  title       text        not null,
  message     text        not null,
  rating      int         not null check (rating between 1 and 5),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists reviews_owner_book_idx on reviews (owner_key, book_id);

-- Support the `not exists` guards that reclaim an unreferenced books row.
create index if not exists favorites_book_idx on favorites (book_id);
create index if not exists reviews_book_idx on reviews (book_id);
