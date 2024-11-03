import { Book } from "@/types";
import Card from "./card";
import Link from "next/link";
import { usePathname } from "next/navigation";

type OwnProps = {
  book: Book;
};

const Book = ({ book }: OwnProps) => {
  const pathname = usePathname();
  const {
    id,
    volumeInfo: { title, description, imageLinks, infoLink },
  } = book;

  return (
    <div id={id}>
      {imageLinks && (
        <img src={imageLinks.thumbnail} alt={title} className="mt-2" />
      )}
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
        <Link href={`${pathname}/detail/${id}`} className="mt-4 hover:blue-300 text-primary font-bold py-2 px-4 rounded">
          View more details
        </Link>
        <Link href={`${pathname}/reviews/${id}`} className="mt-4 hover:blue-300 text-primary font-bold py-2 px-4 rounded">
          Write a review
        </Link>
      </div>
    </div>
  );
};

export default Book;
