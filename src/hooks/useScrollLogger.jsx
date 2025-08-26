import { useEffect } from 'react';

const useScrollLogger = () => {
  useEffect(() => {
    const onScroll = () => {
      console.log('scrollY:', window.scrollY);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};

export default useScrollLogger;
