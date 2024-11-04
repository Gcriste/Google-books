import { Container } from "@/components/common";
import SavedBooksContainer from "@/components/shared/saved-books-container";

const Favorites = () => {
  return (
    <Container title="Favorites">
      <SavedBooksContainer isFavorites />
    </Container>
  );
};

export default Favorites;
