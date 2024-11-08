import { BookType, SavedBook } from "@/app/types";

export const useApi = () => {
  const apiKey = "AIzaSyDZxit5qyOmEAoxRG8W2r1Hi5B0X8eLoiU";

  const fetchBooks = async (searchStr: string) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchStr}&key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    console.log('data', data)
    return data.items || [];
  };

  const getAll = () => {
    const currentBooks = localStorage.getItem("savedBooks") ?? "{}";
    const parsedBooks = JSON.parse(currentBooks) ?? {};

    return parsedBooks as SavedBook;
  };

  const getBookById = (id: string | undefined) => {
    if (!id) return;
    const currentBooks = getAll();
    const currentBook = currentBooks[id];

    return currentBook as BookType;
  };

  const updateBook = async (book: BookType) => {
    const currentBooks = getAll();
    const { id, ...rest } = book;
    console.log("in here");
    const updatedBook = { ...currentBooks, [id]: { id, ...rest } };
    localStorage.setItem("savedBooks", JSON.stringify(updatedBook));
    return updatedBook;
  };

  return { fetchBooks, getAll, getBookById, updateBook };
};
