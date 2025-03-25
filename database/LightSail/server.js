const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Point directly to your Vite build output
const buildPath = path.join('/home/bitnami/SentrySight/dist');

// Check if build directory exists
if (!fs.existsSync(buildPath)) {
  console.error(`Build directory not found at: ${buildPath}`);
  console.error('Please run "npm run build" in the SentrySight directory');
  process.exit(1); // Exit if no build directory
}

// Serve static files from the Vite build output
app.use(express.static(buildPath));

// Logging middleware
app.use((req, res, next) => {  
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// The "catchall" handler for client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found in build directory');
  }
});

// Use PORT environment variable or default to 3692
const PORT = process.env.PORT || 3692;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`The server is runninng on 44.243.81.44:${PORT}`);
});
