import { Book, SavedBook } from "@/app/types";

export const useApi = () => {
  const getAll = () => {
    const currentBooks = localStorage.getItem("savedBooks") ?? "{}";
    const parsedBooks = JSON.parse(currentBooks) ?? {};

    return parsedBooks as SavedBook;
  };

  const updateBook = (book: Book, isFavorite: boolean) => {
    const currentBooks = getAll();
    const { id, ...rest } = book;
    console.log("id", {id, ...rest, book})
    localStorage.setItem(
      "savedBooks",
      JSON.stringify({ ...currentBooks, [id]: { id, ...rest, isFavorite} })
    );
  };

  return { getAll, updateBook };
};
