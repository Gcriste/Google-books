import Book from "./book";
import { Box, Divider } from "../common";
import { BookType } from "@/app/types";

type OwnProps = { books: BookType[], isSearch?: boolean };

const BookList = ({ books, isSearch }: OwnProps) => {
  return (
    <Box>
      {books.length > 0 &&
        books.map((book,idx) => (
          <Box key={`${book.id}-${idx}`}>
            {idx !==0 &&<Divider />}
            <Book book={book}/>
          </Box>
        ))}
    </Box>
  );
};

export default BookList;
