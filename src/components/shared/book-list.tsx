import Book from "./book";
import { Box, Divider } from "../common";
import { BookType } from "@/app/types";

type OwnProps = { books: BookType[], isSearch?: boolean };

const BookList = ({ books, isSearch }: OwnProps) => {
  const keyStr = isSearch ? 'search' : 'favorites'
  return (
    <Box>
      {books.length > 0 &&
        books.map((book,idx) => (
          <Box key={`${keyStr}-${book.id}`}>
            {idx !==0 &&<Divider />}
            <Book book={book}/>
          </Box>
        ))}
    </Box>
  );
};

export default BookList;
