import { useEffect, useState } from "react";

export const useTime = () => {
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  useEffect(() => {
    const time = setInterval(() => {
      const date = new Date();
      setTime({
        hour: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(time);
  }, []);

  return { time };
};
