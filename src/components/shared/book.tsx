import { BookType } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, Flex, Text } from "../common";
import { useCallback, useState } from "react";
import { useApi } from "@/api";
import Review from "./review";

type OwnProps = {
  book: BookType;
  hasViewMore?: boolean;
  hasWriteReview?: boolean
};

const Book = ({ book, hasViewMore = true, hasWriteReview = true }: OwnProps) => {
  const pathname = usePathname();
  const [currentBook, setCurrentBook] = useState<BookType>(book);
  const { updateBook, getAll } = useApi();

  const {
    id,
    isFavorite,
    reviews,
    volumeInfo: { title, description, imageLinks },
  } = currentBook;

  const handleClick = useCallback(
    (action: "add" | "remove") => () => {
      console.log("clicked", { currentBook, book });
      const isFavorite = action === "add";
      updateBook({...currentBook, isFavorite});
      setCurrentBook((prev) => ({ ...prev, isFavorite }));
    },
    []
  );

  return (
    <Box>
      <Flex justify="between">
        {imageLinks && <img src={imageLinks.thumbnail} alt={title} width="150em"/>}
        <Box>
          {isFavorite ? (
            <Button variant="danger" onClick={handleClick("remove")}>
              Remove from favorites
            </Button>
          ) : (
            <Button variant="primary" onClick={handleClick("add")}>
              Add to favorites
            </Button>
          )}
        </Box>
      </Flex>
      <Box>
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
        <Flex direction="col">
            {hasViewMore && (
              <Link
                href={`${pathname}/detail/${id}`}
                className="hover:blue-300 text-primary font-bold"
              >
                View more details
              </Link>
            )}
            {reviews?.length ? (
              <Review id={id} reviews={reviews} />
            ) : 
              !hasWriteReview ? null :<Link
                href={`${pathname}/reviews/${id}`}
                className="hover:blue-300 text-primary font-bold"
              >
                Write a review
              </Link>
            }
        </Flex>
      </Box>
    </Box>
  );
};

export default Book;
