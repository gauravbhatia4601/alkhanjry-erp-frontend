import { useState, useEffect } from "react";

export default function useLoading(deps: unknown[] = [], delayMs = 600) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delayMs);
    return () => clearTimeout(timer);
  }, deps);

  return isLoading;
}
