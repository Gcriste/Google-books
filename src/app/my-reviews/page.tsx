import { Container } from "@/components/common";
import SavedBooksContainer from "@/components/shared/saved-books-container";

const MyReviewsPage = () => {
  return (
    <Container title="My Reviews">
      <SavedBooksContainer isMyReviews/>
    </Container>
  );
};

export default MyReviewsPage;
