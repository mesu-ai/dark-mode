import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
    } else {
      const isPrefersDarkMode = window.matchMedia("prefers-color-scheme: dark").matches;
      if (isPrefersDarkMode) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  }, [])

  return {theme,setTheme}
};

export default useTheme;