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
  
    return (
      <Box className="flex items-center justify-center space-x-2">
        <Button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          &lt;
        </Button>
  
        {/* Page Numbers */}
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-100"
            }`}
          >
            {page}
          </Button>
        ))}
  
        {/* Next Button */}
        <Button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          &gt;
        </Button>
      </Box>
    );
  };
  
  export default Pagination;