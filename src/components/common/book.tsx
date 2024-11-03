import { Book } from "@/app/types";
import Card from "./card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Flex from "./flex";
import Box from "./box";
import Button from "./button";

type OwnProps = {
  book: Book;
  hasViewMore?: boolean
};

const Book = ({ book, hasViewMore = true }: OwnProps) => {
  const pathname = usePathname();
  const {
    id,
    isFavorite,
    reviews,
    volumeInfo: { title, description, imageLinks },
  } = book;

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
            {hasViewMore && <Link
              href={`${pathname}/detail/${id}`}
              className="hover:blue-300 text-primary font-bold"
            >
              View more details
            </Link>}
            {reviews ? <Link
              href={`${pathname}/reviews/${id}`}
              className="hover:blue-300 text-primary font-bold"
            >
              View all review
            </Link> : <Link
              href={`${pathname}/reviews/${id}`}
              className="hover:blue-300 text-primary font-bold"
            >
              Write a review
            </Link>}
          </Flex>
          <Flex>
            {isFavorite ? (
              <Button variant="danger">Remove from favorites</Button>
            ) : (
              <Button variant="primary">Add to favorites</Button>
            )}
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default Book;
