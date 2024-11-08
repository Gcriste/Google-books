"use client";

import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Rating from "./shared/rating";
import { useApi } from "@/api";
import { BookType, FormValues } from "@/app/types";
import { format } from "date-fns/format";
import Book from "./shared/book";
import { Box, Button, Flex, Text } from "./common";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type OwnProps = {
  updateBookFromStorage: UseMutateFunction<
    {
      [x: string]: BookType;
    },
    Error,
    BookType,
    unknown
  >;
};

const ReviewForm = ({ updateBookFromStorage }: OwnProps) => {
  const { id } = useParams();
  const { getBookDetails } = useApi();
  const { getBookById } = useApi();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      reviewText: "",
      rating: 0,
    },
  });

const rating = watch('rating')
  const {
    data: bookData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookDetails"],
    queryFn: () => getBookDetails(id as string),
    enabled: !!id,
  });

  const currentBook = getBookById(id as string) ?? bookData;

  const handleRatingClick = (selectedRating: number) => {
    setValue("rating", selectedRating);
  };

  const onSubmit = (data: FormValues) => {
    console.log('on submit runs')
    const {title, reviewText, rating} = data
    const formattedDate = format(new Date(), "MMMM dd, yyyy");
    updateBookFromStorage({
      ...((currentBook ?? {}) as BookType),
      id: id as string,
      reviews: [
        ...(currentBook?.reviews ?? []),
        {
          id: crypto.randomUUID(),
          title,
          message: reviewText,
          rating,
          lastUpdated: formattedDate,
        },
      ],
    });
    reset()
  };

  return (
    <Flex direction="col" gap="gap-2">
      <Text variant="heading" size="large">
        Leave a Review
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Rating rating={rating} handleRatingClick={handleRatingClick} />
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Write your title"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          {...register("reviewText", { required: "Review is required" })}
          placeholder="Write your review here..."
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          rows={4}
        ></textarea>
        {errors.reviewText && (
          <p className="text-red-500">{errors.reviewText.message}</p>
        )}

        {error && <p className="text-red-500 mb-2">{error.message}</p>}

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition duration-200"
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
};
export default ReviewForm;
