import { BookType } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, Flex, Text } from "../common";
import { useCallback, useState } from "react";
import { useApi } from "@/api";
import Review from "./review-list";
import ReviewList from "./review-list";

type OwnProps = {
  book: BookType;
  hasViewMore?: boolean;
  hasViewAllReviews?: boolean;
};

const Book = ({
  book,
  hasViewMore = true,
  hasViewAllReviews = false,
}: OwnProps) => {
  const pathname = usePathname().split("/")[1];
  const { updateBook, getBookById } = useApi();
  const [currentBook, setCurrentBook] = useState<BookType>(
    getBookById(book.id as string) ?? book
  );

  const {
    id,
    isFavorite,
    reviews,
    volumeInfo: { title, description, imageLinks },
  } = currentBook;

  const handleClick = useCallback(
    (action: "add" | "remove") => () => {
      console.log("clicked", { book, currentBook });
      const isFavorite = action === "add";
      updateBook({ ...currentBook, isFavorite });
      setCurrentBook((prev) => ({ ...prev, isFavorite }));
    },
    []
  );

  const isDetail = pathname.includes("/detail");
  const isReview = pathname.includes("/reviews");
  console.log("pathname", { pathname, isDetail, isReview });

  return (
    <Box>
      <Flex justify="between">
        {imageLinks && (
          <img src={imageLinks.thumbnail} alt={title} width="150em" />
        )}
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
              href={`/${pathname}/detail/${id}`}
              className="hover:blue-300 text-primary font-bold"
            >
              View more details
            </Link>
          )}
          {reviews?.length ? (
            <ReviewList
              bookId={id}
              reviews={reviews}
              hasViewAllReviews={hasViewAllReviews}
            />
          ) : (
            <Link
              href={`/${pathname}/reviews/${id}`}
              className="hover:blue-300 text-primary font-bold"
            >
              Write a review
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Book;
