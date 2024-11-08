import { BookType } from "@/app/types";
import Link from "next/link";
import { Box, Button, Flex, Text } from "../common";
import { useCallback, useState } from "react";
import { useApi } from "@/api";
import ReviewContainer from "./review-container";
import { UseMutateFunction } from "@tanstack/react-query";

type OwnProps = {
  book: BookType;
  isViewMore?: boolean;
  updateBookFromStorage?:  UseMutateFunction<{
    [x: string]: BookType ;
  }, Error, BookType, unknown>
};

const Book = ({ book, isViewMore, updateBookFromStorage }: OwnProps) => {
  const { updateBook } = useApi();
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    book.isFavorite
  );

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

  console.log("book inside", { book, isViewMore });

  return (
    <>
      <Flex direction="col" >
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
        <Flex direction="col" gap="gap-2">
          <Text variant="heading" size="large">
            {title}
          </Text>
          <Text>{description}</Text>
        </Flex>
      </Flex>
      {isViewMore ? (
        <ReviewContainer
          bookId={id}
          reviews={reviews}
          hasViewAllReviews={false}
          updateBookFromStorage={updateBookFromStorage}
        />
      ) : (
        <Link
          href={`/detail/${id}`}
          className="hover:blue-300 text-primary font-bold"
        >
          View more details
        </Link>
      )}
    </>
  );
};

export default Book;
