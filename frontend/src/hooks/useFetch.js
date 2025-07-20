import { useEffect, useState } from "react";

export const useFetch = (url, baseCase = null) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      if (baseCase) return;

      try {
        setIsLoading(true);
        const res = await fetch(url);

        if (!res.ok)
          throw new Error("Something went wrong with fetching data...");

        const data = await res.json();
        setData(data);
      } catch (err) {
        setIsError(true);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, baseCase]);

  return { data, setData, isLoading, isError };
};
