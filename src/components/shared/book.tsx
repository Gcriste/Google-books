import { BookType } from "@/app/types";
import Link from "next/link";
import { Box, Button, Flex, Text } from "../common";
import { useCallback, useState } from "react";
import { useApi } from "@/api";
import ReviewContainer from "./review-container";
import { formatDate, formatPrice } from "@/helpers";
import BookSkeleton from "./book-skeleton";


type OwnProps = {
  book: BookType;
  isDetails?: boolean;
  isLoading?: boolean
  isMyReviews?: boolean
};

const Book = ({ book, isDetails, isLoading, isMyReviews }: OwnProps) => {
  const { updateBook } = useApi();
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    book.isFavorite
  );

  const {
    id,
    reviews,
    volumeInfo: {
      title,
      authors,
      subtitle,
      description,
      publisher,
      publishedDate,
      categories,
      imageLinks,
    },
    saleInfo: { buyLink, listPrice },
  } = book;

  const cleanDescription = description?.replace(/<[^>]*>/g, "");

  const handleClick = useCallback(
    (action: "add" | "remove") => () => {
      const isFavorite = action === "add";
      updateBook({ ...book, isFavorite });
      setIsFavorite((prev) => !prev);
    },
    []
  );



  if(isLoading) return <BookSkeleton isDetails={isDetails}/>

  return (
    <>
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
        <Flex direction="col" gap="gap-2">
          <Flex align="center">
            <Text variant="heading" size="xLarge">
              {title}
            </Text>
            {authors?.map((author, idx) => (
              <Text key={`${author}-${idx}`} variant="subheading" size="large">
                {author}
              </Text>
            ))}
          </Flex>
          <Text variant="subheading">{subtitle}</Text>
          {isDetails && (
            <Flex direction="col">
               <Text>{categories}</Text>
              <Text>
                Published by {publisher} on{" "}
                {formatDate(publishedDate)}
              </Text>
             
            </Flex>
          )}
          <Text>{cleanDescription}</Text>
        </Flex>
      </Flex>
      {isDetails && (buyLink || listPrice) && (
        <Flex direction="col" gap="gap-2">
          <Text variant="subheading" size="large">
            Sale info
          </Text>
          <Flex>
          <Text>{formatPrice(listPrice)}</Text>
            {buyLink && <Link href={buyLink}>Buy now</Link>}
          </Flex>
        </Flex>
      )}
      {(isDetails || isMyReviews)? (
        <ReviewContainer
          bookId={id}
          reviews={reviews}
          isMyReviews={isMyReviews}
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
