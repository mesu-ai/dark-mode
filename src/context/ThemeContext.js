import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const themes = { light: 'light', dark: 'dark' }

const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('theme')) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light);
  });

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes?.light;
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;