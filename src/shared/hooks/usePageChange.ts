import { useCallback } from "react";

// Pagination details interface
interface PaginationDetails {
  current: number;
  pageSize: number;
  total: number;
  searchQuery?: string;
}

// Custom hook for handling page changes and search
export const usePageChange = (
  paginationDetails: PaginationDetails,
  setPaginationDetails: (details: any) => void
) => {
  // Handle table page change
  const handlePageChange = useCallback(
    (pagination: any, filters: any, sorter: any) => {
      setPaginationDetails({
        ...paginationDetails,
        current: pagination.current,
        pageSize: pagination.pageSize,
      });
    },
    [paginationDetails, setPaginationDetails]
  );

  // Handle page size change
  const handlePageSizeChange = useCallback(
    (value: string) => {
      const newPageSize = parseInt(value, 10);
      setPaginationDetails({
        ...paginationDetails,
        current: 1, // Reset to first page when changing page size
        pageSize: newPageSize,
      });
    },
    [paginationDetails, setPaginationDetails]
  );

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setPaginationDetails({
        ...paginationDetails,
        current: 1, // Reset to first page when searching
        searchQuery: value,
      });
    },
    [paginationDetails, setPaginationDetails]
  );

  // Handle card page change (for mobile views if needed)
  const handleCardPageChange = useCallback(
    (page: number) => {
      setPaginationDetails({
        ...paginationDetails,
        current: page,
      });
    },
    [paginationDetails, setPaginationDetails]
  );

  return {
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleCardPageChange,
  };
};

export default usePageChange;
