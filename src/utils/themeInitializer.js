
// src/themeInitializer.js
(function() {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
  document.documentElement.setAttribute('data-theme', theme);
})();
