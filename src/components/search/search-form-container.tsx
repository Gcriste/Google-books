import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import SearchForm from "./search-form";
import { useBookContext } from "@/context/use-book-context";
import { useApi } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const SearchFormContainer = () => {
  const { fetchBooks } = useApi();
  const { setSearchedBooks } = useBookContext();
  const [searchStr, setSearchStr] = useState("");

  const {
    mutate,
    data: searchedBooks,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: fetchBooks,
    onSuccess: (data) => {
      setSearchedBooks(data);
    },
    onError: (err) => {
      console.error("Search error", err);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchStr(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(searchStr);
  };

  return (
    <>
      <SearchForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        searchStr={searchStr}
      />

      {isPending && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{(error as Error).message}</p>}

      {/* You can render searchedBooks here if needed */}
      {searchedBooks && searchedBooks.length > 0 && (
        <ul>
          {searchedBooks.map((book: any) => (
            <li key={book.id}>{book.volumeInfo.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchFormContainer;
