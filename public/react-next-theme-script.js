!function(){const e=localStorage.getItem("theme");if(e)document.documentElement.setAttribute("data-theme",e);else{const e=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",e?"dark":"light")}}();