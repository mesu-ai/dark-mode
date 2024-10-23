# react-next-theme

**`react-next-theme`** is a simple and flexible theme switcher for React and Next.js applications, supporting both light and dark modes with seamless theme toggling. It also provides a solution for preventing flickering during page loads by automatically applying the user’s theme preference from `localStorage` or system settings.

## Features

- Seamless light/dark mode switching.
- Works with **React** and **Next.js** (both App Router and Page Router).
- Automatically applies the preferred theme on page load.
- Uses a lightweight theme script for fast initial theme application to avoid flickering.
- Theme preferences are persisted in `localStorage`.

## Installation

You can install `react-next-theme` via **npm** or **yarn**:

### Using npm:

```bash
npm install react-next-theme
```

### Using yarn:

```bash
yarn add react-next-theme
```

After installation, a script (`react-next-theme-script.js`) will be automatically copied to your **public** folder. This script applies the initial theme before React renders to avoid flickering.

## Usage

### 1. Next.js (App Router or Page Router)

#### **App Router (`app/layout.js`)**

To use `react-next-theme` in the **Next.js App Router**, follow these steps:

1. Import the theme script using the Next.js `<Script>` component in your **`app/layout.js`**:

```js
import Script from 'next/script';
import { ThemeProvider } from 'react-next-theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Load the theme script before React hydrates the page */}
        <Script src="/react-next-theme-script.js" strategy="beforeInteractive" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

2. Use the `ThemeProvider` to wrap your application components to enable theme toggling.

#### **Page Router (`pages/_document.js`)**

To use it in **Next.js Page Router**, include the theme script in **`pages/_document.js`**:

```js
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Load the theme script */}
        <Script src="/react-next-theme-script.js" strategy="beforeInteractive" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

You can then use the `ThemeProvider` in **`pages/_app.js`** to wrap your application:

```js
import { ThemeProvider } from 'react-next-theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

### 2. React (Create React App)

In **React projects**, you need to include the theme script in your **`public/index.html`** file:

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
    
    <!-- Load the theme script to apply the theme before the app renders -->
    <script src="%PUBLIC_URL%/react-next-theme-script.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Then, wrap your app with the `ThemeProvider` in **`src/index.js`**:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'react-next-theme';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
```

### 3. Toggling Theme in Your Application

The `useTheme` hook allows you to toggle between light and dark modes. Here’s an example of how to use it:

```js
import React from 'react';
import { useTheme } from 'react-next-theme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
}

export default ThemeToggle;
```

### 4. Customizing the Theme

The theme is applied using a `data-theme` attribute on the `<html>` element. You can define your own custom CSS styles for light and dark modes in your stylesheets:

```css
/* Default light theme */
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

### 5. How the Theme Script Works

The `react-next-theme-script.js` file is a small JavaScript file that runs before the app loads, ensuring that the theme is set early. It checks the `localStorage` for the user's theme preference or falls back to the system's preferred color scheme:

```js
(function () {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();
```

### 6. Example Usage

Here’s an example of how you can use `react-next-theme` in your Next.js or React app to create a smooth theme-switching experience without flickering:

1. Add the script to your project (Next.js or React).
2. Use the `ThemeProvider` to manage theme state.
3. Use the `useTheme` hook to toggle the theme.

## License

This project is licensed under the **MIT License**.

---