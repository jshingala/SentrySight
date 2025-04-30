const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan'); // For better logging
const helmet = require('helmet'); // For security
const compression = require('compression'); // For performance

const app = express();

// Environment configuration
const PORT = process.env.PORT || 3692;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Helper function to find the build directory
function findBuildDirectory() {
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
  
  for (const testPath of possiblePaths) {
    try {
      if (fs.existsSync(testPath) && fs.existsSync(path.join(testPath, 'index.html'))) {
        console.log(`Found build directory at: ${testPath}`);
        return testPath;
      }
    } catch (err) {
      console.error(`Error accessing path: ${testPath}`, err);
    }
  }
  
  console.error('Could not find build directory with index.html!');
  console.log('Current directory:', __dirname);
  console.log('Searched in:', possiblePaths);
  console.log('Make sure the build directory exists and is accessible.');
  return null;
}

// Find build directory
const buildPath = findBuildDirectory();
if (!buildPath) {
  throw new Error('Build directory not found. Please build the React app first.');
}

// Apply middlewares
// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for simplicity, enable in production with proper config
}));

// Compression for better performance
app.use(compression());

// Logging middleware
if (NODE_ENV === 'production') {
  app.use(morgan('combined')); // More detailed logs for production
} else {
  app.use(morgan('dev')); // Concise colored output for development
}

// Serve static files
app.use(express.static(buildPath, {
  maxAge: NODE_ENV === 'production' ? '1d' : 0 // Cache for 1 day in production
}));

// API routes can be added here
// app.use('/api', apiRoutes);

// Catchall handler for client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke on our end! Please try again later.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`Serving files from: ${buildPath}`);
});