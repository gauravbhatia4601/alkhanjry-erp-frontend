interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const buttonBase = "inline-flex items-center justify-center h-9 min-w-[36px] px-3 text-sm rounded-lg border transition-colors";
  const activeStyle = "bg-brand-500 text-white border-brand-500";
  const inactiveStyle = "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800";
  const disabledStyle = "opacity-40 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBase} ${inactiveStyle} ${currentPage === 1 ? disabledStyle : ""}`}
      >
        Prev
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={`${page}-${index}`}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`${buttonBase} ${page === currentPage ? activeStyle : inactiveStyle} ${page === "..." ? disabledStyle : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBase} ${inactiveStyle} ${currentPage === totalPages ? disabledStyle : ""}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
