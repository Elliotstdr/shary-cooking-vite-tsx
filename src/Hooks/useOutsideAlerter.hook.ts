import { useEffect } from "react";

export const useOutsideAlerter = (ref: any, command: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        command();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }; // eslint-disable-next-line
  }, [ref]);
};