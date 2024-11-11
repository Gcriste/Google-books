import { Container } from '@/components/common'
import SavedBooksContainer from '@/components/saved-books-container'

const MyReviewsPage = () => {
  return (
    <Container title="My Reviews">
      <SavedBooksContainer isMyReviews />
    </Container>
  )
}

export default MyReviewsPage
