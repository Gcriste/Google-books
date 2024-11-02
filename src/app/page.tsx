import BookContextProvider from "@/context/provider";
import SearchBooksContainer from "../components/searched-books/container";

const HomePage = () => {
  return (
    <BookContextProvider>
      <div>
        <h1 className="text-center text-2xl font-bold mt-10">
          Google Books Search
        </h1>
        <SearchBooksContainer />
      </div>
    </BookContextProvider>
  );
};

export default HomePage;
