import Book from "./book";
import Box from "./box";
import Divider from "./divider";

type OwnProps = { books: Book[] };

const BookList = ({ books }: OwnProps) => {
  return (
    <div className="mt-4">
      {books.length > 0 &&
        books.map((book) => (
          <Box key ={book.id}>
            <Divider />
            <Book book={book} />
          </Box>
        ))}
    </div>
  );
};

export default BookList;
