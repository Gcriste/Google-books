"use client";

import React from "react";
import BookList from "./book-list";
import { Box, Text } from "../common";
import { useApi } from "@/api";

type OwnProps = {
  isFavorites?: boolean;
};

const SavedBooksContainer = ({ isFavorites }: OwnProps) => {
  const { getAll } = useApi();
  const currentBooks = getAll();
  const savedBooks = Object.values(currentBooks);
  const favoriteBooks = savedBooks.filter((book) => book.isFavorite);
  const booksWithReviews = savedBooks.filter((book) => !!book.reviews?.length);

  return (
    <Box>
      {favoriteBooks.length || booksWithReviews.length ? (
        <BookList books={isFavorites ? favoriteBooks : booksWithReviews} />
      ) : (
        <Text>
          {isFavorites ? "No favorites selected" : "No reviews written"}
        </Text>
      )}
    </Box>
  );
};

export default SavedBooksContainer;
