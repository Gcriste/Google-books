-- Adds firstName/lastName to the Better Auth user table.
-- Already applied to the live database; kept so an existing deployment can be
-- brought forward. A fresh database should use db/auth-schema.sql instead,
-- which already includes these columns.
--
-- NOTE: both are `not null` with no default, so this only applies cleanly to an
-- empty `user` table. On a populated one, add a default or backfill first --
-- better-auth's getMigrations() refuses this case with UnsafeMigrationError.

alter table "user" add column "firstName" text not null;

alter table "user" add column "lastName" text not null;
