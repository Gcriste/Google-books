import Box from "./box";
import Button from "./button";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  
  const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
  }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    const handlePageClick = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };
  console.log('currentPage', currentPage)
    return (
      <Box className="flex items-center justify-center space-x-2">
        <Button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
       variant="outline"
        >
          &lt;
        </Button>
  
        {/* Page Numbers */}
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageClick(page)}
            variant={
              page === currentPage
                ? "primary"
                : "outline"
           }
          >
            {page}
          </Button>
        ))}
  
        {/* Next Button */}
        <Button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          &gt;
        </Button>
      </Box>
    );
  };
  
  export default Pagination;