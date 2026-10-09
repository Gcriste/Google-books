-- Applied by hand in the Neon SQL Editor. Kept in git so the intended schema
-- lives in the repo rather than only in the deployed database.
--
-- If this is ever adopted into an ORM, `npx drizzle-kit pull --init` can
-- introspect the live database and generate a baseline from it.

create table if not exists saved_books (
  owner_key   text        not null,
  book_id     text        not null,
  is_favorite boolean     not null default false,
  volume_info jsonb       not null,
  sale_info   jsonb       not null default '{}'::jsonb,
  self_link   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (owner_key, book_id)
);

create table if not exists reviews (
  id          uuid        primary key default gen_random_uuid(),
  owner_key   text        not null,
  book_id     text        not null,
  title       text        not null,
  message     text        not null,
  rating      int         not null check (rating between 1 and 5),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  foreign key (owner_key, book_id)
    references saved_books (owner_key, book_id) on delete cascade
);

create index if not exists reviews_owner_book_idx on reviews (owner_key, book_id);
