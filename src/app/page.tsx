"use client";
import { Container } from "@/components/common";
import BookList from "@/components/shared/book-list";
import { useApi } from "@/api";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FormValues } from "./types";
import SearchForm from "@/components/search/search-form";

const HomePage = () => {
  const { getBookById, searchBooks } = useApi();
  const [triggerQuery, setTriggerQuery] = useState<boolean>(false);
  const [searchStr, setSearchStr] = useState<string>("");

  const {
    data: searchedBooks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchedBooks"],
    queryFn: () => searchBooks(searchStr),
    enabled: triggerQuery && !!searchStr,
  });

  const handleSubmit = (data: FormValues) => {
    setSearchStr(data.searchStr);
    setTriggerQuery(true);
  };

  useEffect(() => {
    if (triggerQuery) {
      setTriggerQuery(false);
    }
  }, [triggerQuery]);

  const updatedBooks = (searchedBooks ?? []).map(
    (book) => getBookById(book.id) ?? book
  );

  return (
    <Container title="Book Search">
      <SearchForm
        onSubmit={handleSubmit}
      />
      <BookList books={updatedBooks} isLoading={isLoading} />
    </Container>
  );
};

export default HomePage;
