#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const open = require('open');
const fs = require('fs');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the dashboard build directory
app.use(express.static(path.join(__dirname, 'dashboard', 'build')));

// Parse JSON request body
app.use(express.json());

// API routes
app.post('/api/authenticate', (req, res) => {
  const { secretKey, accountAddress, network } = req.body;
  
  if (!secretKey) {
    return res.status(400).json({ error: 'Secret key is required' });
  }
  
  // Save the credentials to the .env file
  const envContent = `HYPERLIQUID_SECRET_KEY=${secretKey}
HYPERLIQUID_ACCOUNT_ADDRESS=${accountAddress || ''}
HYPERLIQUID_NETWORK=${network || 'mainnet'}
`;
  
  fs.writeFileSync(path.join(__dirname, '.env'), envContent);
  
  // Configure the MCP server
  const configScript = spawn('node', [path.join(__dirname, 'scripts', 'configure-mcp.js')]);
  
  configScript.on('close', (code) => {
    if (code === 0) {
      res.json({ success: true, message: 'Authentication successful' });
    } else {
      res.status(500).json({ error: 'Failed to configure MCP server' });
    }
  });
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Opening web dashboard in your browser...');
  
  // Open the web dashboard in the default browser
  open(`http://localhost:${PORT}`);
});

// Start the MCP server
console.log('Starting Hyperliquid MCP server...');
const mcpServer = spawn('node', [path.join(__dirname, 'server', 'build', 'index.js')]);

mcpServer.stdout.on('data', (data) => {
  console.log(`MCP server: ${data}`);
});

mcpServer.stderr.on('data', (data) => {
  console.error(`MCP server error: ${data}`);
});

mcpServer.on('close', (code) => {
  console.log(`MCP server exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down...');
  mcpServer.kill();
  process.exit(0);
});