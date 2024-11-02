import { Book } from "@/types";
import Card from "./card";

type OwnProps = {
  book: Book;
};

const Book = ({ book }: OwnProps) => {
  const {
    id,
    volumeInfo: { title, description, imageLinks, infoLink },
  } = book;

  return (
    <Card id={id} link={infoLink}>
      {imageLinks && (
        <img src={imageLinks.thumbnail} alt={title} className="mt-2" />
      )}
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View more details
        </button>
      </div>
    </Card>
  );
};

export default Book;
