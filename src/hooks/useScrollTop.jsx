import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToTop(ref) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (ref?.current) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // optional
      });
    }
  }, [pathname, ref]);
}
