"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "white" | "red";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "white",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("white");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("luda-theme") as Theme | null;
    if (stored === "white" || stored === "red") {
      setTheme(stored);
    }
  }, []);

  // Sync data-theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("luda-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "white" ? "red" : "white"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
