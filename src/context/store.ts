import { createContext } from "react";
import type { BookState } from "./types";

const initialState: BookState = {
  searchedBooks: [],
  setSearchedBooks: () => undefined,
};

export const BookStore = createContext<BookState>(initialState);
