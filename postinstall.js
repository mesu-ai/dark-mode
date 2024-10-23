// postinstall.js

const fs = require('fs');
const path = require('path');

// Source path: The themeScript.js file in the npm package
const scriptSrcPath = path.join(__dirname, 'scripts', 'themeScript.js');

// Destination path: The user's public directory
const publicDir = path.join(process.cwd(), 'public');
const publicScriptPath = path.join(publicDir, 'react-next-theme-script.js');

// Create the public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy the script to the public folder
fs.copyFileSync(scriptSrcPath, publicScriptPath);

console.log('themeScript.js copied to public/react-next-theme-script.js');
