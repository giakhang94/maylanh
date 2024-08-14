import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return clearTimeout(timeout);
  }, [value]);

  return debounce;
};
export default useDebounce;
