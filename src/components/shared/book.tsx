import { Book } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Flex, Text } from "../common";
import { useCallback, useState } from "react";
import { useApi } from "@/api";
import isEqual from "lodash/isEqual";

type OwnProps = {
  book: Book;
  hasViewMore?: boolean;
};

const Book = ({ book, hasViewMore = true }: OwnProps) => {
  const pathname = usePathname();
  const [currentBook, setCurrentBook] = useState<Book>(book)
  const {updateBook, getAll} = useApi()

  const {
    id,
    isFavorite,
    reviews,
    volumeInfo: { title, description, imageLinks },
  } = currentBook;



  const handleClick = useCallback(
    (action: "add" | "remove") => () => {
      console.log('clicked', { currentBook, book})
      const isFavorite = action === 'add'
      updateBook(currentBook, isFavorite)
      setCurrentBook(prev => ({...prev, isFavorite}))
    },
    []
  );


  return (
    <div id={id}>
      {imageLinks && (
        <img src={imageLinks.thumbnail} alt={title} className="mt-2" />
      )}
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
        <Flex justify="between" align="center">
          <Flex>
            {hasViewMore && (
              <Link
                href={`${pathname}/detail/${id}`}
                className="hover:blue-300 text-primary font-bold"
              >
                View more details
              </Link>
            )}
            {reviews?.length ? (
              <>
                <Text>{reviews[0].message}</Text>
                <Text>{reviews[0].rating}</Text>
                <Text>{reviews[0].lastUpdated}</Text>
                <Link
                  href={`${pathname}/reviews/${id}`}
                  className="hover:blue-300 text-primary font-bold"
                >
                  View all reviews
                </Link>
              </>
            ) : (
              <Link
                href={`${pathname}/reviews/${id}`}
                className="hover:blue-300 text-primary font-bold"
              >
                Write a review
              </Link>
            )}
          </Flex>
          <Flex>
            {isFavorite ? (
              <Button variant="danger" onClick={handleClick("remove")}>
                Remove from favorites
              </Button>
            ) : (
              <Button variant="primary" onClick={handleClick("add")}>
                Add to favorites
              </Button>
            )}
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default Book;
