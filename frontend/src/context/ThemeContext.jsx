import { createContext, useContext, useEffect, useState } from "react";

import { DEFAULT_ACCENT } from "../utils/constants";
import { useDebounce } from "../hooks/useDebounce";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [accentColor, setAccentColor] = useState(
    localStorage.getItem("accent") || DEFAULT_ACCENT,
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const isLight = theme === "light";
  const debouncedValue = useDebounce(accentColor, 500);

  const handleAccentColor = (e) => setAccentColor(e.target.value);
  const handleThemeSwitch = (e) => setTheme(e.target.value);

  // Show/paint accent color to app on first render
  useEffect(() => {
    document
      .getElementById("root")
      .style.setProperty("--accent-color", accentColor);
  }, []);

  // On debounced value paint this value to app and saving it to localStorage
  useEffect(() => {
    if (debouncedValue) {
      document
        .getElementById("root")
        .style.setProperty("--accent-color", debouncedValue);
      localStorage.setItem("accent", debouncedValue);
    }
  }, [debouncedValue]);

  // Conditionally add/remove dark class and set to localStorage
  useEffect(() => {
    theme === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isLight,
        accentColor,
        setAccentColor,
        setTheme,
        handleAccentColor,
        handleThemeSwitch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeColors = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("ThemeContext was used outside of the ThemeProvider");

  return context;
};

export { ThemeProvider, useThemeColors };
