import SearchBooksContainer from "@/components/search/container";
import Container from "@/components/common/containr";
import BookContextProvider from "@/context/provider";

const HomePage = () => {
  return (
    <BookContextProvider>
      <Container title="Search" subtitle="Search for a book">
        <SearchBooksContainer />
      </Container>
    </BookContextProvider>
  );
};

export default HomePage;
