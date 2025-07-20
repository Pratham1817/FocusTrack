import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useThemeColors } from "./ThemeContext";
import { showToast } from "../utils/helpers";
import { useAudio } from "./AudioContext";

const PomoContext = createContext();

const PomoProvider = ({ children }) => {
  const { playAudio } = useAudio();
  const { isLight } = useThemeColors();

  const [minutes, setMinutes] = useState(() => {
    const storedMinutes = localStorage.getItem("minutes");
    return storedMinutes ? +storedMinutes : 25;
  });

  const [seconds, setSeconds] = useState(() => {
    const storedSeconds = localStorage.getItem("seconds");
    return storedSeconds ? +storedSeconds : 0;
  });

  const [pomoCount, setPomoCount] = useState(() => {
    const storedPomoCount = localStorage.getItem("pomoCount");
    return storedPomoCount ? +storedPomoCount : 0;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  const prevDayRef = useRef(currentDay);

  const handleStartTimer = () => setIsRunning(true);
  const handleStopTimer = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    setPomoCount(0);
    setIsFocus(true);
    showToast("Pomodoro resetted successfully!", "success", isLight);
  };

  useEffect(() => {
    let pomoTimer;
    if (isRunning) {
      pomoTimer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);

        // When seconds reach 0, check the minutes
        if (seconds === 0) {
          if (minutes === 0) {
            // If both minutes and seconds are 0, the timer has ended

            // Set the new timer based on whether it's a focus or break session
            setMinutes(!isFocus ? 25 : 5);
            setSeconds(0);
            setPomoCount((count) => count + 1);
            playAudio();
            setIsRunning(false);

            // Toggle between focus and break session
            setIsFocus((focus) => !focus);

            showToast("Pomodoro timer finished!", "success", isLight);
          } else {
            // This block will run if there are still minutes left but seconds are 0
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }
    return () => clearInterval(pomoTimer);
  }, [isRunning, minutes, seconds, isFocus, playAudio, isLight]);

  useEffect(() => {
    // Update the values of timer on localStorage when timer stops, just to prevent setting new states on local storage every time the timer runs
    if (!isRunning) {
      localStorage.setItem("minutes", minutes);
      localStorage.setItem("seconds", seconds);
      localStorage.setItem("pomoCount", pomoCount);
    }
  }, [minutes, seconds, pomoCount, isRunning]);

  // This effect ensures that the state is saved if the user tries to leave/refresh the page, making sure the latest state is preserved. Basically triggering the upper effect(where it sets the values to local storage)
  useEffect(() => {
    const handleBeforeUnload = () => setIsRunning(false);

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Checking if new day comes and update the current day with the new one
  useEffect(() => {
    const checkDayChange = setInterval(() => {
      const newDay = new Date().getDate();
      if (newDay !== currentDay) setCurrentDay(newDay);
    }, 1000 * 60); // Checking every minute

    return () => clearInterval(checkDayChange);
  }, [currentDay]);

  // Resetting pomodoro to it's initial state values when new day comes
  useEffect(() => {
    const isNewDay = prevDayRef.current !== currentDay;
    if (isNewDay) {
      setMinutes(25);
      setSeconds(0);
      setPomoCount(0);
      setIsFocus(true);
      setIsRunning(false);

      prevDayRef.current = currentDay;
    }
  }, [currentDay]);

  return (
    <PomoContext.Provider
      value={{
        pomoCount,
        isFocus,
        minutes,
        seconds,
        isRunning,
        handleReset,
        handleStartTimer,
        handleStopTimer,
      }}
    >
      {children}
    </PomoContext.Provider>
  );
};

const usePomodoro = () => {
  const context = useContext(PomoContext);

  if (context === undefined)
    throw new Error("Pomodoro's context must be used inside of PomoProvider");

  return context;
};

export { PomoProvider, usePomodoro };
