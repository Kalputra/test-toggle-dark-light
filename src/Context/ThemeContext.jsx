import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(themeContext);
  return context;
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}