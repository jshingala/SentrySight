const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const possiblePaths = [
  path.join(__dirname, '../../../dist'),
  path.join(__dirname, '../../dist'),
  path.join(__dirname, '../dist'),
  path.join(__dirname, 'dist'),
  path.join(__dirname, '../../../build'),
  path.join(__dirname, '../../build'),
  path.join(__dirname, '../build'),
  path.join(__dirname, 'build')
];

let buildPath = null;
for (const testPath of possiblePaths) {
  try {
    if (fs.existsSync(testPath) && fs.existsSync(path.join(testPath, 'index.html'))) {
      buildPath = testPath;
      break;
    }
  } catch (err) {
    // Path doesn't exist, continue checking
  }
}

if (!buildPath) {
  console.error('Could not find build directory with index.html!');
  console.log('Current directory:', __dirname);
  console.log('Searched in:', possiblePaths);
  
  // Create a temporary directory to serve content from
  buildPath = path.join(__dirname, 'temp_static');
  try {
    if (!fs.existsSync(buildPath)) {
      fs.mkdirSync(buildPath);
    }
    // Create a basic index.html file
    fs.writeFileSync(
      path.join(buildPath, 'index.html'),
      '<html><body><h1>Server Running</h1><p>Build directory not found. Please build your frontend application.</p></body></html>'
    );
    console.log('Created temporary static directory at:', buildPath);
  } catch (err) {
    console.error('Failed to create temporary directory:', err);
    process.exit(1); // Exit with error
  }
}

// Serve static files from the React app build directory
app.use(express.static(buildPath));

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('*', (req, res) => {
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
  console.log(`Serving files from: ${buildPath}`);
});