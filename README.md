
---

# react-next-theme

`react-next-theme` is a lightweight, customizable theme switcher for React and Next.js applications, supporting light and dark modes. It detects system preferences, applies the theme instantly, and prevents a white flash on page load.

## Key Features

- **Light and Dark Mode Support**: Allows seamless theme switching.
- **System Preference Detection**: Automatically detects and applies the user’s system theme preference.
- **No White Flash on Load**: Instantly applies the theme for a smooth user experience.
- **Easy Setup**: Works seamlessly in React and Next.js (supports both Page and App Routers).

---

## Common Setup Instructions

1. **Install the Package**

   ```bash
   npm install react-next-theme
   ```

   or

   ```bash
   yarn add react-next-theme
   ```

2. **Create CSS for Theme Variables**

   Define theme colors in a CSS file. You can either create a `theme.css` file in the `public` folder or add these styles directly to `index.css` (React) or `globals.css` (Next.js).

   ```css
   /* Light and dark mode theme variables */
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

---

## React Setup (Create React App or Vite)

1. **Add Theme Script to `public/index.html`**

   To ensure the theme is applied before the app mounts, create a `theme-script.js` file in the `public` folder with the following code:

    ```js
    // public/theme-script.js
    (function() {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = storedTheme || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })();
    ```

   Then, link the script in `public/index.html`:

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React App</title>

        <!-- Link to theme initialization script -->
        <script src="%PUBLIC_URL%/theme-script.js"></script>

        <!-- Link to CSS file -->
        <link rel="stylesheet" href="%PUBLIC_URL%/theme.css" />
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
    ```

2. **Wrap Your App with `ThemeProvider` in `src/index.js`**

   Wrap your main app component with `ThemeProvider` to enable dynamic theme switching.

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

3. **Use the `useTheme` Hook in Components**

   Use the `useTheme` hook to toggle themes in any component. Here’s an example for a button in `App.js`:

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

## Next.js (Page Router) Setup

1. **Theme Initialization Script in `_document.js`**

   To apply the theme before Next.js renders the app, you can either use `getThemeScript` from `react-next-theme` or link a separate script file.

   - **Option A: Use `getThemeScript` directly**:

      ```js
      // pages/_document.js
      import { Html, Head, Main, NextScript } from 'next/document';
      import { getThemeScript } from 'react-next-theme';

      export default function Document() {
        return (
          <Html lang="en">
            <Head>
              <link rel="stylesheet" href="/theme.css" />
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

   - **Option B: Use an external script file**:

      1. Create `public/theme-script.js`:

          ```js
          // public/theme-script.js
          (function() {
            const storedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = storedTheme || (prefersDark ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
          })();
          ```

      2. Reference the script file in `_document.js`:

          ```js
          // pages/_document.js
          import { Html, Head, Main, NextScript } from 'next/document';
          import Script from 'next/script';

          export default function Document() {
            return (
              <Html lang="en">
                <Head>
                  <link rel="stylesheet" href="/theme.css" />
                </Head>
                <body>
                  <Script src="/theme-script.js" strategy="beforeInteractive" />
                  <Main />
                  <NextScript />
                </body>
              </Html>
            );
          }
          ```

2. **Wrap Your App with `ThemeProvider` in `_app.js`**

   Wrap the main component with `ThemeProvider` to handle theme switching:

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

---

## Next.js (App Router) Setup

1. **Theme Initialization in `app/layout.js`**

   In Next.js 13+ (App Router), you can initialize the theme by either using `getThemeScript` or an external script file.

   - **Option A: Use `getThemeScript` directly**:

      ```js
      // app/layout.js
      import { ThemeProvider, getThemeScript } from 'react-next-theme';

      export const metadata = {
        title: 'My App',
      };

      export default function RootLayout({ children }) {
        return (
          <html lang="en">
            <head>
              <link rel="stylesheet" href="/theme.css" />
              <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
            </head>
            <body>
              <ThemeProvider>{children}</ThemeProvider>
            </body>
          </html>
        );
      }
      ```

   - **Option B: Use an external script file**:

      1. Create `public/theme-script.js` as follows:

          ```js
          // public/theme-script.js
          (function() {
            const storedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = storedTheme || (prefersDark ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
          })();
          ```

      2. Reference the script file in `app/layout.js`:

          ```js
          // app/layout.js
          import { ThemeProvider } from 'react-next-theme';
          import Script from 'next/script';

          export const metadata = {
            title: 'My App',
          };

          export default function RootLayout({ children }) {
            return (
              <html lang="en">
                <head>
                  <link rel="stylesheet" href="/theme.css" />
                </head>
                <body>
                  <Script src="/theme-script.js" strategy="beforeInteractive" />
                  <ThemeProvider>{children}</ThemeProvider>
                </body>
              </html>
            );
          }
          ```

---

## Using the `useTheme` Hook to Toggle Themes

To toggle themes in components, use the `useTheme` hook.

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

## Recommendation
For simplicity and a clean setup, using getThemeScript is often the best choice, especially for projects where ease of integration and minimal file management are priorities. It’s also ideal for teams that prefer not to have extra files in public or are working on smaller projects.

However, for larger projects or production-level apps where caching and modularity are important, using public/theme-script.js can improve load times slightly and centralize your theme logic.

In summary:
Smaller projects or simpler setups → getThemeScript
Larger projects or production-focused apps → public/theme-script.js


### Using a Script File Instead of Inlining the Script

If you prefer to use an external script file, you can place the theme initialization script inside the **`public/`** folder and reference it using the `<Script>` component in Next.js:

### 1. Create `public/theme-script.js`:

```js
// public/theme-script.js
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

<Script src="/theme-script.js" strategy="beforeInteractive" />
```

This will load the theme initialization script from the `public/` directory.

---

## License

MIT License

Feel free to modify or contribute to the project. Happy coding!

---
