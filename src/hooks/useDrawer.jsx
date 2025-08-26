import { useEffect, useState, useRef } from "react";

const useDrawer = (duration = 300) => {
  const [isMounted, setIsMounted] = useState(false);     // For rendering
  const [animation, setAnimation] = useState(true);      // "in" | "out" | null
  const timeoutRef = useRef(null);

  const openDrawer = () => {
    clearTimeout(timeoutRef.current);
    setIsMounted(true);         // Mount component
    setAnimation(true);         // Trigger fade/slide in
  };

  const closeDrawer = () => {
    setAnimation(false);        // Trigger fade/slide out
    timeoutRef.current = setTimeout(() => {
      setIsMounted(false);      // Unmount after animation
      setAnimation(null);       // Reset animation state
    }, duration);
  };

  const toggleDrawer = () => {
    if (isMounted) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // Cleanup on unmount
  }, []);

  return { isMounted, animation, openDrawer, closeDrawer, toggleDrawer };
};

export default useDrawer;
