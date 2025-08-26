import { useLocation } from "react-router-dom";

const useShouldShowAddButton = () => {
  const { pathname } = useLocation();
  const validPaths = ["/admin/availability", "/admin/shift", "/admin/employee", "/admin/requirement"];

  return validPaths.includes(pathname);
};

export default useShouldShowAddButton;