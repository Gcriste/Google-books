"use client";

import React from "react";
import BookList from "../common/book-list";
import { useBookContext } from "@/context/use-book-context";

const SavedBooksContainer: React.FC = () => {
  const { searchedBooks } = useBookContext();
  return (
    <div className=" mx-auto mt-10">
      <BookList books={searchedBooks}/>
    </div>
  );
};

export default SavedBooksContainer;
