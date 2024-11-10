"use client"

import { useParams } from "next/navigation";

import { useApi } from "@/api";
import { Container } from "@/components/common";
import Book from "@/components/shared/book";
import { useQuery } from "@tanstack/react-query";

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
  const isRefetchBook = currentBook?.id !== id

  return (
    <Container title="Book Details">
      {currentBook && <Book book={currentBook} isDetails isLoading={isLoading || isRefetchBook}/>}
      {error && <p className="mt-4 text-red-500">{error.message}</p>}
    </Container>
  );
};

export default DetailPage;
