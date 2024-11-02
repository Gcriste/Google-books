import Book from "./book";

type OwnProps = { books: Book[] };

const BookList = ({ books }: OwnProps) => {
  return (
    <div className="mt-4">
      {books.length > 0 && (
        <ul>
          {books.map((book) => (
            <Book book={book} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
