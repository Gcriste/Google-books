import Book from "./book";
import { Box, Divider } from "../common";
import { BookType } from "@/app/types";
import { usePathname } from "next/navigation";

type OwnProps = { books: BookType[] };

const BookList = ({ books }: OwnProps) => {
  const pathname = usePathname()
  const hasViewAllReviews = !pathname.includes('reviews')
  return (
    <div className="mt-4">
      {books.length > 0 &&
        books.map((book) => (
          <Box key={book.id}>
            <Divider />
            <Book book={book} hasViewAllReviews={hasViewAllReviews}/>
          </Box>
        ))}
    </div>
  );
};

export default BookList;
