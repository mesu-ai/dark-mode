# react-next-theme

`react-next-theme` is a simple and flexible theme switcher for React and Next.js. It allows for seamless toggling between light and dark modes, supports user preferences, and stores the selected theme in local storage.

## Features

- **Automatic Theme Detection**: Detects system-level theme preferences (light/dark).
- **Persistent Theme**: Automatically saves and loads the user's preferred theme using `localStorage`.
- **Easy Integration**: Simple integration with React and Next.js projects.
- **CSS Variables**: Uses CSS variables for dynamic theming.

## Installation

You can install the `react-next-theme` package using npm or yarn:

```bash
npm install react-next-theme
```

or

```bash
yarn add react-next-theme
```

## Usage

### React

To use the package in a React application, follow these steps:

1. **Wrap Your App with `ThemeProvider`**

   In your main file (e.g., `src/main.jsx` or `src/index.js`), wrap your app in the `ThemeProvider` to provide theme context to the entire application.

   ```jsx
   // src/main.jsx
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';
   import './index.css'; // Import your global CSS
   import { ThemeProvider } from 'react-next-theme';

   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <ThemeProvider>
         <App />
       </ThemeProvider>
     </React.StrictMode>
   );
   ```

2. **Use `useTheme` to Toggle Theme**

   In your components, you can use the `useTheme` hook to toggle between light and dark modes:

   ```jsx
   // src/App.jsx
   import React from 'react';
   import { useTheme } from 'react-next-theme';

   const App = () => {
     const { theme, toggleTheme } = useTheme();

     return (
       <div>
         <h1>Current Theme: {theme}</h1>
         <button onClick={toggleTheme}>
           Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
         </button>
       </div>
     );
   };

   export default App;
   ```

3. **Add CSS for Themes**

   Add CSS for your light and dark themes in your global styles (`src/index.css`):

   ```css
   /* src/index.css */
   
   /* Default Light Theme */
   :root {
     --bg-color: #ffffff;
     --text-color: #213547;
     --link-color: #646cff;
     --link-hover-color: #747bff;
     --button-bg-color: #f9f9f9;
     --button-text-color: #213547;
   }

   body {
     background-color: var(--bg-color);
     color: var(--text-color);
   }

   [data-theme='dark'] {
     --bg-color: #242424;
     --text-color: rgba(255, 255, 255, 0.87);
     --link-color: #646cff;
     --link-hover-color: #535bf2;
     --button-bg-color: #1a1a1a;
     --button-text-color: #ffffff;
   }
   ```

### Next.js

`react-next-theme` works seamlessly with both the **App Router** and **Pages Router** in Next.js.

#### Next.js (App Router)

1. **Wrap Your App with `ThemeProvider`**

   In `app/layout.js` or `app/layout.tsx`, wrap your app with `ThemeProvider`:

   ```jsx
   // app/layout.js
   import './globals.css'; // Import global CSS
   import { ThemeProvider } from 'react-next-theme';

   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
           <ThemeProvider>{children}</ThemeProvider>
         </body>
       </html>
     );
   }
   ```

2. **Use `useTheme` to Toggle Theme**

   In any page or component, use the `useTheme` hook:

   ```jsx
   // app/page.js
   import { useTheme } from 'react-next-theme';

   export default function HomePage() {
     const { theme, toggleTheme } = useTheme();

     return (
       <div>
         <h1>Current Theme: {theme}</h1>
         <button onClick={toggleTheme}>
           Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
         </button>
       </div>
     );
   }
   ```

3. **Add Global CSS**

   Add your CSS for light and dark themes in `globals.css`:

   ```css
   /* styles/globals.css */
   
   :root {
     --bg-color: #ffffff;
     --text-color: #213547;
     --link-color: #646cff;
     --link-hover-color: #747bff;
     --button-bg-color: #f9f9f9;
     --button-text-color: #213547;
   }

   body {
     background-color: var(--bg-color);
     color: var(--text-color);
   }

   [data-theme='dark'] {
     --bg-color: #242424;
     --text-color: rgba(255, 255, 255, 0.87);
     --link-color: #646cff;
     --link-hover-color: #535bf2;
     --button-bg-color: #1a1a1a;
     --button-text-color: #ffffff;
   }
   ```

#### Next.js (Pages Router)

1. **Wrap Your App with `ThemeProvider`**

   In `pages/_app.js`, wrap your app with `ThemeProvider`:

   ```jsx
   // pages/_app.js
   import '../styles/globals.css';
   import { ThemeProvider } from 'react-next-theme';

   export default function MyApp({ Component, pageProps }) {
     return (
       <ThemeProvider>
         <Component {...pageProps} />
       </ThemeProvider>
     );
   }
   ```

2. **Use `useTheme` to Toggle Theme**

   In any page or component, use the `useTheme` hook:

   ```jsx
   // pages/index.js
   import { useTheme } from 'react-next-theme';

   export default function Home() {
     const { theme, toggleTheme } = useTheme();

     return (
       <div>
         <h1>Current Theme: {theme}</h1>
         <button onClick={toggleTheme}>
           Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
         </button>
       </div>
     );
   }
   ```

3. **Add Global CSS**

   Add your CSS in `globals.css`:

   ```css
   /* styles/globals.css */
   
   :root {
     --bg-color: #ffffff;
     --text-color: #213547;
     --link-color: #646cff;
     --link-hover-color: #747bff;
     --button-bg-color: #f9f9f9;
     --button-text-color: #213547;
   }

   body {
     background-color: var(--bg-color);
     color: var(--text-color);
   }

   [data-theme='dark'] {
     --bg-color: #242424;
     --text-color: rgba(255, 255, 255, 0.87);
     --link-color: #646cff;
     --link-hover-color: #535bf2;
     --button-bg-color: #1a1a1a;
     --button-text-color: #ffffff;
   }
   ```

## Local Storage Support

The `react-next-theme` package automatically stores the user's theme preference in `localStorage` and loads it on page reload. This ensures a consistent experience across sessions.

## System Preferences Detection

`react-next-theme` also detects the user's system-level theme preference (light or dark) using the `prefers-color-scheme` media query and applies it as the default theme if no preference is stored in `localStorage`.

---

## License

`react-next-theme` is licensed under the [MIT License](LICENSE).
```

