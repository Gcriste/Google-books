"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useApi } from "@/api";
import { BookType } from "@/app/types";
import { Container } from "@/components/common";
import Book from "@/components/shared/book";
import { useQuery } from "@tanstack/react-query";
const apiKey = "AIzaSyDZxit5qyOmEAoxRG8W2r1Hi5B0X8eLoiU";

const DetailPage = () => {
  const { id } = useParams();
  const { getBookDetails, getBookById } = useApi();
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

  console.log("review", currentBook)

  return (
    <Container title="Book Details">
      {currentBook && <Book book={currentBook} isViewMore />}
      {isLoading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error.message}</p>}
    </Container>
  );
};

export default DetailPage;
