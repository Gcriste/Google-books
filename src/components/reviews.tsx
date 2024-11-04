"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const ReviewsPage = () => {
  const { id } = useParams();
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [error, setError] = useState<string>("");

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
    const currentBooks = localStorage.getItem("savedBooks") ?? "{}";
    console.log("currentBooks", currentBooks);
    const parsed = JSON.parse(currentBooks) ?? {};
    const book = parsed[id as string];
    localStorage.setItem(
      "savedBooks",
      JSON.stringify({
        ...parsed,
        [id as string]: {
          ...book,
          reviews: [
            ...(book.reviews ?? []),
            { message: reviewText, rating, lastUpdated: new Date() },
          ],
        },
      })
    );
    setError("");
    setReviewText(""); // Reset the text field after submission
    setRating(0); // Reset the rating after submission
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Leave a Review</h2>

      {/* Rating Section */}
      <div className="flex items-center mb-4">
        <span className="mr-2 font-medium">Rating:</span>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`text-2xl ${
              num <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => handleRatingClick(num)}
          >
            ★
          </button>
        ))}
      </div>

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
