import { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../utils/theme";

const ThemeContext = createContext();

const storedTheme = localStorage.getItem("themeMode") || "light";

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    storedTheme === "light" ? lightTheme : darkTheme
  );
  const [themeMode, setThemeMode] = useState(storedTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
