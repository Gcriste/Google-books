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
};

const Book = ({
  book,
}: OwnProps) => {
  const pathname = usePathname();
  const splitPathname = pathname.split("/")[1]
  const { updateBook } = useApi();
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    book.isFavorite
  );
  const hasViewMore = !pathname.includes('detail')
  const hasViewAllReviews = !pathname.includes('review')

  const {
    id,
    reviews,
    volumeInfo: { title, description, imageLinks },
  } = book;

  const handleClick = useCallback(
    (action: "add" | "remove") => () => {
      console.log("clicked", { book });
      const isFavorite = action === "add";
      updateBook({ ...book, isFavorite });
      setIsFavorite((prev) => !prev);
    },
    []
  );

  console.log("book inside", { book });

  return (
    <Flex direction="col">
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
      <Flex direction="col">
        <Text variant="heading" size="large">
          {title}
        </Text>
        <Text>{description}</Text>
        <Flex direction="col">
          {hasViewMore && (
            <Link
              href={`/${splitPathname}/detail/${id}`}
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
              href={`/${splitPathname}/reviews/${id}`}
              className="hover:blue-300 text-primary font-bold"
            >
              Write a review
            </Link>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Book;
