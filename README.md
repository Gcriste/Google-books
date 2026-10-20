# Google Books API Application
A simple web application built with Next.js and Tailwind CSS that allows users to search, view details, and save books using the Google Books API.

## Live Demo
You can view the live application here: [Google Books API App](https://google-books-hc1y-git-gec-sam-cd4a21-griffins-projects-375a85f9.vercel.app/)


## Features
- **Search Books**: Search for books using keywords, titles, or authors.
- **View Details**: View detailed information about each book, including the description, authors, and publishing details.
- **Save to Favorites**: Add books to a favorites list saved to local storage and view them later.
- **Write a Reivew**: Can write reviews that are saved to local storage.
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
needs the deltas in `db/migrations/` applied in order — currently
`001-user-first-last-name.sql` and `002-user-address.sql`. Run them in the Neon
SQL editor.
### 5. Run development server locally: 
npm run dev


## Techologies Used
Next.js, Tailwind CSS, Google Books API


## License
This project is open-source and available under the [MIT License](LICENSE).