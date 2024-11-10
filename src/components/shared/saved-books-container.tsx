"use client";

import React, { useEffect } from "react";
import BookList from "./book-list";
import { Box, Text } from "../common";
import { useApi } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type OwnProps = {
  isFavorites?: boolean;
};

const SavedBooksContainer = ({ isFavorites }: OwnProps) => {
  const { getAll } = useApi();
  const { data: currentBooks = {}, isLoading } = useQuery({
    queryKey: ["savedBooks"],
    queryFn: getAll,
  });

  const savedBooks = Object.values(currentBooks);
  const favoriteBooks = savedBooks.filter((book) => book.isFavorite);
  const booksWithReviews = savedBooks.filter((book) => !!book.reviews?.length);

  console.log("booksWithReviews", { booksWithReviews });
  const favorites = {
    hasLength: favoriteBooks.length,
    emptyText: "No favorites selected",
  };

  const reviews = {
    hasLength: booksWithReviews.length,
    emptyText: "No reviews written",
  };

  const { hasLength, emptyText } = isFavorites ? favorites : reviews;
  return (
    <Box>
      {hasLength ? (
        <BookList
          books={isFavorites ? favoriteBooks : booksWithReviews}
          isLoading={isLoading}
        />
      ) : (
        <Text>{emptyText}</Text>
      )}
    </Box>
  );
};

export default SavedBooksContainer;
