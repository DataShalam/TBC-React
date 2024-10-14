import { useEffect, useState } from "react";

export function useDebounce(value, delay = 1000) {
  const [deboucedValue, setDebauncedValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebauncedValue(value);
    }, delay());

    return () => clearTimeout(timeOut);
  }, [value]);
}
