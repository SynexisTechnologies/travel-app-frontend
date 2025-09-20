import React, { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../utils/theme";
import { ThemeContextType, ChildrenProps } from "@/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const storedTheme = localStorage.getItem("themeMode") || "light";

export const ThemeContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [theme, setTheme] = useState(
    storedTheme === "light" ? lightTheme : darkTheme
  );
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    storedTheme as "light" | "dark"
  );

  const toggleTheme = (): void => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
    setThemeMode((prevMode) => {
      const newMode: "light" | "dark" = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const value: ThemeContextType = {
    toggleTheme,
    theme,
    themeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
