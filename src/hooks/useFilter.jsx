import { useMemo } from "react";

const useFilter = (data, filters) => {
  // Map filter keys to logic
  const filterMap = {
    color: (itemValue, filterValue) => itemValue.some(color => color.toLowerCase() === filterValue.toLowerCase()),
    minPrice: (itemValue, filterValue) => filterValue != null && filterValue !== "" ? itemValue >= Number(filterValue) : true,
    maxPrice: (itemValue, filterValue) => filterValue != null && filterValue !== "" ? itemValue <= Number(filterValue) : true,
  };

  const filteredData = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) {
      return data;
    }

    return data.filter(item =>
      Object.entries(filters).every(([key, filterValue]) => {
        const fn = filterMap[key];
        if (!fn) return true;
        
        // Special case for minPrice/maxPrice:
        if (key === "minPrice" || key === "maxPrice") {
          return fn(item.price, Number(filterValue));
        }

        // Default case: use item[key]
        return fn(item[key], filterValue);
      })
    );
  }, [data, filters]);

  return filteredData;
}

export default useFilter;