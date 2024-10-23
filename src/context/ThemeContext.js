import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const themes = { light: 'light', dark: 'dark' }

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(()=>{
    if(typeof window !== 'undefined'){
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light);
    }
    return themes.light;
  });


  // const getInitialTheme = () => {
  //   const storedTheme = window.localStorage.getItem('theme');
  //   if (storedTheme) return storedTheme;

  //   const userPreferedScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   return userPreferedScheme ? themes.dark : themes.light;
  // }


  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes?.light;
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // if (typeof window !== "undefined") {
    //   const initialTheme = getInitialTheme();
    //   setTheme(initialTheme);
    //   document.documentElement.setAttribute('data-theme', initialTheme);
    //   localStorage.setItem('theme', initialTheme);
    // }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;