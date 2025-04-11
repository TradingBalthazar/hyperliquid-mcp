#!/bin/bash

# Hyperliquid MCP Installation and Run Script

set -e

echo "=== Hyperliquid MCP Installation and Run ==="
echo ""

# Check if repository is already cloned
if [ ! -d "hyperliquid-mcp" ]; then
  echo "Cloning repository..."
  git clone https://github.com/TradingBalthazar/hyperliquid-mcp.git
  cd hyperliquid-mcp
else
  echo "Repository already exists, using existing directory..."
  cd hyperliquid-mcp
fi

# Run the installation script
echo "Running installation script..."
chmod +x install.sh
./install.sh

# Start the application
echo "Starting the application..."
npm start

echo ""
echo "=== Installation and startup complete ==="
echo "The web dashboard should be open in your browser."
echo "If not, navigate to: http://localhost:3000"