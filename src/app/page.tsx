"use client";
import { Container } from "@/components/common";
import BookContextProvider from "@/context/provider";
import SearchFormContainer from "@/components/search/search-form-container";
import BookList from "@/components/shared/book-list";
import { useBookContext } from "@/context/use-book-context";
import { useApi } from "@/api";

const HomePage = () => {
  const { searchedBooks } = useBookContext();
  const { getBookById } = useApi();

  const updatedBooks = searchedBooks.map((book) => getBookById(book.id) ?? book);
console.log('updatedBooks', updatedBooks)
  return (
    <Container title="Search">
      <SearchFormContainer />
      <BookList books={updatedBooks} />
    </Container>
  );
};

const HomePageContainer = () => {
  return (
    <BookContextProvider>
      <HomePage />
    </BookContextProvider>
  );
};

export default HomePageContainer;
