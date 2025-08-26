import { useLocation } from "react-router-dom";

const usePathMatch = (prefix = '', { exact = false } = {}) => {
  const { pathname } = useLocation();
  return exact ? pathname === prefix : pathname.startsWith(prefix);
}
 
export default usePathMatch;