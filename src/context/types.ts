import { Book } from "@/types";

export type BookState = {
  searchedBooks: Book[];
  setSearchedBooks: (books: Book[]) => void;
};
