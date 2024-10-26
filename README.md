# react-next-theme

`react-next-theme` is a simple and flexible theme switcher for React and Next.js applications, supporting light and dark modes. It provides a seamless solution for managing themes across your applications with automatic theme detection based on system preferences and local storage.

## Features

- Supports **light** and **dark** modes.
- Automatically respects system preferences for dark mode.
- Easy to integrate in **React** and **Next.js** applications (both **App Router** and **Pages Router**).
- Prevents the white flash on page load by applying the correct theme immediately.
- Customizable and extendable for your project needs.

## Installation

You can install the package via **npm** or **yarn**.

### Using npm

```bash
npm install react-next-theme
```

### Using yarn

```bash
yarn add react-next-theme
```

---

## Basic Setup

### 1. Add Theme-Specific CSS Variables

To ensure the theme is correctly applied to your application, include the following CSS in your global styles (`index.css` or `globals.css` depending on your setup):
you can change color as you want.

```css
:root {
  --background-color: white;
  --text-color: black;
}

html[data-theme='dark'] {
  --background-color: black;
  --text-color: white;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
```

This CSS sets the background and text colors based on the `data-theme` attribute applied to the `<html>` element.

---

## Usage in **React** (Create React App or Vite)

### 1. Inject Theme Initialization Script and Style

To prevent a white flash on page load, you need to inject a script that applies the correct theme before React mounts. Modify your **`public/index.html`** or **`index.html`** file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>

    <!-- Link to CSS file-->
    <link rel="stylesheet" href="%PUBLIC_URL%/index.css" />

    <!-- Insert the theme initialization script -->
    <script>
      (function() {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### 2. Use `ThemeProvider` in `src/index.js` or `src/main.js`

Wrap your app with the `ThemeProvider` to handle dynamic theme switching:

```js
// src/index.js or src/main.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'react-next-theme';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
```

### 3. Use the `useTheme` Hook in Your Components

you can change the button or modify as your need

```js
// src/App.js
import React from 'react';
import { useTheme } from 'react-next-theme';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</h1>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
}

export default App;
```

---

## Usage in **Next.js (Pages Router)**

### 1. Inject Theme Script in `_document.js`

To prevent the white flash, you need to inject the theme initialization script using Next.js' `_document.js` file:

```js
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
import { getThemeScript } from 'react-next-theme';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Inject the theme initialization script */}
        <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### 2. Wrap Your App with `ThemeProvider` in `_app.js`

```js
// pages/_app.js
import { ThemeProvider } from 'react-next-theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

### 3. Use `useTheme` Hook in Components

```js
// components/Header.js
import { useTheme } from 'react-next-theme';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </header>
  );
}

export default Header;
```

---

## Usage in **Next.js (App Router)**

### 1. Inject Theme Script in `layout.js`

For **Next.js 13** (App Router), modify the **`app/layout.js`** file to inject the theme initialization script:

```js
// app/layout.js
import { getThemeScript } from 'react-next-theme';

export const metadata = {
  title: 'My App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Inject the theme initialization script */}
        <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

### 2. Wrap the App with `ThemeProvider`

In **Next.js (App Router)**, wrap your entire app with the `ThemeProvider`:

```js
// app/layout.js
import { ThemeProvider } from 'react-next-theme';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
```

### 3. Use `useTheme` Hook in Components

```js
// components/Header.js
import { useTheme } from 'react-next-theme';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </header>
  );
}

export default Header;
```

---

## Using a Script File Instead of Inlining the Script

If you prefer to use an external script file, you can place the theme initialization script inside the **`public/`** folder and reference it using the `<Script>` component in Next.js:

### 1. Create `public/react-next-theme-script.js`:

```js
// public/react-next-theme-script.js
(function() {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
```

### 2. Reference It in `_document.js` or `layout.js`

```js
import Script from 'next/script';

<Script src="/react-next-theme-script.js" strategy="beforeInteractive" />
```

This will load the theme initialization script from the `public/` directory.

---

## License

MIT License

Feel free to modify or contribute to the project. Happy coding!

---
