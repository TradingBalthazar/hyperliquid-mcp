#!/bin/bash

# Hyperliquid MCP Installation Script

set -e

echo "=== Hyperliquid MCP Installation ==="
echo "This script will install the Hyperliquid MCP package and all dependencies."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3 and try again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

# Create directories
echo "Creating directories..."
mkdir -p ~/.local/share/Roo-Code/MCP/hyperliquid-server/src
mkdir -p ~/.local/share/code-server/User/globalStorage/rooveterinaryinc.roo-cline/settings

# Install Python dependencies
echo "Installing Python dependencies..."
pip install hyperliquid-python-sdk

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Build the MCP server
echo "Building the MCP server..."
cd server
npm install
npm run build
cd ..

# Build the web dashboard
echo "Building the web dashboard..."
cd dashboard
npm install
npm run build
cd ..

# Configure the MCP server
echo "Configuring the MCP server..."
node scripts/configure-mcp.js

echo ""
echo "=== Installation Complete ==="
echo "To start the web dashboard, run: npm start"
echo "Then open your browser and navigate to: http://localhost:3000"
echo ""