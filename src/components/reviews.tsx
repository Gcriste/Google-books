"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Rating from "./shared/rating";
import { useApi } from "@/api";
import { BookType } from "@/app/types";
import { format } from "date-fns/format";
import Book from "./shared/book";
const apiKey = "AIzaSyDZxit5qyOmEAoxRG8W2r1Hi5B0X8eLoiU";

const ReviewsPage = () => {
  const { id } = useParams();
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [book, setBook] = useState<BookType | undefined>(undefined);
  const { updateBook, getBookById } = useApi();

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

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (reviewText.trim() === "") {
      setError("Please enter a review.");
      return;
    }

    const formattedDate = format(new Date(), 'MMMM dd, yyyy')
    updateBook({
      ...(currentBook ?? {}) as BookType,
      id: id as string,
      reviews: [
        ...(currentBook?.reviews ?? []),
        { id: crypto.randomUUID(), title, message: reviewText, rating, lastUpdated: formattedDate },
      ],
    });
    setError("");
    setReviewText("");
    setRating(0);
  };

  console.log("currentBook", currentBook)

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      {currentBook && <Book book={currentBook} hasViewMore={false } />}
      <h2 className="text-xl font-semibold mb-2">Leave a Review</h2>

      {/* Rating Section */}
      <Rating rating={rating} handleRatingClick={handleRatingClick} />
      {/* Title */}
      <input
        placeholder="Write your title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Review Text Field */}
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
        rows={4}
      ></textarea>

      {/* Display Error if exists */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};
export default ReviewsPage;
