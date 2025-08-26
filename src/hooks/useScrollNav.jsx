import { useEffect, useRef, useState } from 'react';

const useScrollNav = (threshold = 50, scrollContainerRef ) => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const container = scrollContainerRef?.current || window;

    const handleScroll = () => {
      const currentScrollTop = container.scrollY;

      if (currentScrollTop < 0) return; // ignore negative scroll (some browsers)

      if (currentScrollTop > lastScrollTop.current) {
        // Scrolling down → hide navbar
        setIsVisible(false);
      } else if (currentScrollTop < lastScrollTop.current) {
        // Scrolling up → show navbar
        setIsVisible(true);
      }

      // At the very top → hide navbar
      if (currentScrollTop < threshold) {
        setIsVisible(false);
      }

      lastScrollTop.current = currentScrollTop;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef, threshold]);

  return isVisible;
};

export default useScrollNav;
