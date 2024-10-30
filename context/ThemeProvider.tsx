"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
  handleThemeChange: () => void; // Add this to the context
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Initialize mode based on `localStorage` or system preference
      return localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  // Define handleThemeChange
  const handleThemeChange = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
  };

  useEffect(() => {
    if (mode === 'system') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemPreference === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
    localStorage.theme = mode; // Store selected mode in `localStorage`
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
