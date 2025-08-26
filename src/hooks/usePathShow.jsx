import { useLocation } from "react-router-dom";

const usePathShow = (validPatterns) => {
  const { pathname } = useLocation();

  return validPatterns.some((pattern) => {
    // Convert pattern like "/admin/employee/[employeeId]/*" to a regex
    const regex = new RegExp(
      "^" +
        pattern
          .replace(/\//g, "\\/")              // Escape slashes
          .replace(/\[\w+\]/g, "[^/]+")        // Replace [param] with wildcard segment
          .replace(/\*/g, ".*") +              // Support trailing wildcards
        "$"
    );
    return regex.test(pathname);
  });
};

export default usePathShow;
