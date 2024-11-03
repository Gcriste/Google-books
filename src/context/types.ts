import { Book } from "@/app/types";

export type BookState = {
  searchedBooks: Book[];
  setSearchedBooks: (books: Book[]) => void;
};
