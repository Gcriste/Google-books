import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Book from "./shared/book";
import { Container } from "./common";
import { useApi } from "@/api";
import { BookType } from "@/app/types";
const apiKey = "AIzaSyDZxit5qyOmEAoxRG8W2r1Hi5B0X8eLoiU";

const DetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [book, setBook] = useState<BookType | undefined>(undefined);
  const { getBookById } = useApi();
  console.log("id", { id, apiKey });
  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        console.log("data", { data });
        setBook(data);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, apiKey]);

  const currentBook = getBookById(id as string) ?? book;

  console.log("review", currentBook)

  return (
    <Container title="Details">
      {currentBook && <Book book={currentBook} hasViewMore={false} />}
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </Container>
  );
};

export default DetailPage;
