import { useCallback } from 'react'
import Box from './box'
import Button from './button'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  const handlePageClick = useCallback(
    (page: number) => () => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page)
      }
    },
    [onPageChange, totalPages]
  )

  return (
    <Box className="flex items-center justify-center space-x-2">
      <Button
        onClick={handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
      >
        &lt;
      </Button>
      {pages.map(page => (
        <Button
          key={page}
          onClick={handlePageClick(page)}
          variant={page === currentPage ? 'primary' : 'outline'}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
      >
        &gt;
      </Button>
    </Box>
  )
}

export default Pagination
