import { Container } from "@/components/common";
import SavedBooksContainer from "@/components/shared/saved-books-container";

const FavoritesPage = () => {
  return (
    <Container title="My Favorites">
      <SavedBooksContainer />
    </Container>
  );
};

export default FavoritesPage;
