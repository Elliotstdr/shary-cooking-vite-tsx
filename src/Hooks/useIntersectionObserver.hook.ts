import { useState, useRef, useEffect, MutableRefObject } from "react";

export const useIntersectionObserver = (): [MutableRefObject<any>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        // eslint-disable-next-line
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return [targetRef, isVisible];
};
