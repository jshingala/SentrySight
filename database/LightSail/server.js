const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Determine the correct path to your build directory
const possiblePaths = [
  path.join(__dirname, '../../../dist'),
  path.join(__dirname, '../../dist'),
  path.join(__dirname, '../dist'),
  path.join(__dirname, '/dist'),
  path.join(__dirname, '../../../build'),
  path.join(__dirname, '../../build'),
  path.join(__dirname, '../build'),
  path.join(__dirname, '/build')
];

let buildPath = null;
for (const testPath of possiblePaths) {
  try {
    if (fs.existsSync(testPath) && fs.existsSync(path.join(testPath, 'index.html'))) {
      buildPath = testPath;
      break;
    }
  } catch (err) {
    console.error(`Error accessing path: ${testPath}`, err);
  }
}

if (!buildPath) {
  console.error('Could not find build directory with index.html!');
  console.log('Current directory:', __dirname);
  console.log('Searched in:', possiblePaths);
  console.log('Make sure the build directory exists and is accessible.');
} else {
  console.log(`Found build directory at: ${buildPath}`);
}

// Serve static files from the React app build directory
app.use(express.static(buildPath));

// Log requests for debugging
app.use((req, res, next) => {  
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file
app.get('*', (req, res) => {
  if (!buildPath) {
    return res.status(500).send('Server configuration error: Build directory not found');
  }
  
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

const port = 3692;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Serving files from: ${buildPath || 'UNKNOWN PATH'}`);
});
