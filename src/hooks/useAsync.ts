import { useState, useEffect } from "react";

type AsyncFn<T> = () => Promise<T>;

interface UseAsyncHook<T> {
  data: T | null;
  loading: boolean;
  error: string;
}

export const useAsync = <T>(asyncFn: AsyncFn<T>): UseAsyncHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await asyncFn();
        setData(result);
      } catch (err) {
        setError(<string>err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [asyncFn]);

  return { data, loading, error };
};
