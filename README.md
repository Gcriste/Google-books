# Google Books API Application
A simple web application built with Next.js and Tailwind CSS that allows users to search, view details, and save books using the Google Books API.

## Live Demo
You can view the live application here: [Google Books API App](https://google-books-hc1y-git-gec-sam-cd4a21-griffins-projects-375a85f9.vercel.app/)


## Features
- **Search Books**: Search for books using keywords, titles, or authors.
- **View Details**: View detailed information about each book, including the description, authors, and publishing details.
- **Save to Favorites**: Add books to a favorites list saved to your account and view them later. Removing a favorite deletes it; a book you have reviewed is kept so the review survives.
- **Write a Reivew**: Can write reviews saved to your account, on any book — favorited or not.
- **Responsive Design**: Fully responsive UI using Tailwind CSS, optimized for both mobile and desktop devices.


## Setup & Installation
### 1. Clone the repository:
git clone https://github.com/Gcriste/Google-books.git
### 2. Install dependencies:
npm install or yarn
### 3. Set up environment variables:
```
GOOGLE_BOOKS_API_KEY=your-api-key-here
DATABASE_URL=            # Neon pooled connection string (host contains -pooler)
BETTER_AUTH_SECRET=      # any long random string
BETTER_AUTH_URL=         # e.g. http://localhost:3000
```
### 4. Apply the database schema:
A fresh database needs `db/schema.sql` and `db/auth-schema.sql`. An existing one
needs the deltas in `db/migrations/` applied in order. Run them in the Neon SQL
editor.

| Migration | What it does |
| --- | --- |
| `001-user-first-last-name.sql` | Adds `firstName`/`lastName` to the better-auth `user` table. |
| `002` | **Missing from this repo.** Earlier revisions of this README referenced a `002-user-address.sql`; the address columns it describes are already in `db/auth-schema.sql`, so a fresh database has them. Check `\d "user"` against a database before assuming it was applied. |
| `003-normalize-books-favorites.sql` | Splits `saved_books` into `books` + `favorites`. Read its header first — it is meant to be run in two passes, with a row-count check before the final `drop table`. |
### 5. Run development server locally: 
npm run dev


## Techologies Used
Next.js, Tailwind CSS, Google Books API


## License
This project is open-source and available under the [MIT License](LICENSE).