import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import SearchForm from "./search-form";
import { useBookContext } from "@/context/use-book-context";

const apiKey = 'AIzaSyDZxit5qyOmEAoxRG8W2r1Hi5B0X8eLoiU'

const SearchFormContainer = () => {

  const { setSearchedBooks } = useBookContext();
  const [searchStr, setSearchStr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStr(event.target.value);
    },
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchStr}&${apiKey}`;
    console.log("apiKey", { apiKey, url, env: process.env });
    try {
      console.log("query", searchStr);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      console.log("data", { data });
      setSearchedBooks(data.items || []);
    } catch (err) {
      setError(err as any);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchStr={searchStr}
      />
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </>
  );
};

export default SearchFormContainer;
