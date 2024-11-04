import { BookType, SavedBook } from "@/app/types";

export const useApi = () => {
  const getAll = () => {
    const currentBooks = localStorage.getItem("savedBooks") ?? "{}";
    const parsedBooks = JSON.parse(currentBooks) ?? {};

    return parsedBooks as SavedBook;
  };

  const getBookById = (id: string | undefined) => {
    if(!id) return
    const currentBooks = getAll();
    const currentBook = currentBooks[id];

    return currentBook as BookType;
  };

  const updateBook = (book: BookType) => {
    const currentBooks = getAll();
    const { id, ...rest } = book;
    localStorage.setItem(
      "savedBooks",
      JSON.stringify({ ...currentBooks, [id]: { id, ...rest } })
    );
  };

  return { getAll, getBookById, updateBook };
};
