"use client";

import React, { useState } from "react";
import BookList from "../common/book-list";
import SearchFormContainer from "./search-form-container";
import { useBookContext } from "@/context/use-book-context";

const SearchBooksContainer: React.FC = () => {
  const { searchedBooks } = useBookContext();

  console.log('searchedBOoks', searchedBooks)
  return (
    <div className=" mx-auto mt-10">
      <SearchFormContainer />
      <BookList books={searchedBooks}/>
    </div>
  );
};

export default SearchBooksContainer;
