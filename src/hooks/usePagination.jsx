import { useMemo } from "react";

const usePagination = (data, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const visibleData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return { visibleData, totalPages };
}

export default usePagination;