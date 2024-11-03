import Book from "./book";

type OwnProps = { books: Book[] };

const BookList = ({ books }: OwnProps) => {
  return (
    <div className="mt-4">
      {books.length > 0 && books.map((book) => <Book book={book} />)}
    </div>
  );
};

export default BookList;
