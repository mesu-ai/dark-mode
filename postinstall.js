// postinstall.js (updated for ES module syntax)

import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Source path: The themeScript.js file in the npm package
const scriptSrcPath = join(__dirname, 'scripts', 'themeScript.js');

// Destination path: The user's public directory
const publicDir = join(process.cwd(), 'public');
const publicScriptPath = join(publicDir, 'react-next-theme-script.js');

// Create the public directory if it doesn't exist
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Copy the script to the public folder
copyFileSync(scriptSrcPath, publicScriptPath);

console.log('themeScript.js copied to public/react-next-theme-script.js');
