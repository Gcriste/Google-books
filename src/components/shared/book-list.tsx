import Book from "./book";
import { Box, Divider } from "../common";
import { BookType } from "@/app/types";
import { usePathname } from "next/navigation";

type OwnProps = { books: BookType[] };

const BookList = ({ books }: OwnProps) => {
  return (
    <div className="mt-4">
      {books.length > 0 &&
        books.map((book) => (
          <Box key={book.id}>
            <Divider />
            <Book book={book}/>
          </Box>
        ))}
    </div>
  );
};

export default BookList;
