import { useMemo } from "react";

const sortFunctions = {
  'Price: Low to High': (a, b) => a.price - b.price,
  'Price: High to Low': (a, b) => b.price - a.price,
  'Newest First': (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  'Oldest First': (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
};

const useSort = (data, sortOption) => {
  const sortedData = useMemo(() => {
    if (!sortOption || !sortFunctions[sortOption]) return data;
    return [...data].sort(sortFunctions[sortOption]);
  }, [data, sortOption]);

  return sortedData;
};

export default useSort;
