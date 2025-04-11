# Hyperliquid MCP Server

This is the MCP server component of the Hyperliquid MCP package. It provides a Model Context Protocol (MCP) server that allows you to interact with the Hyperliquid exchange through MCP tools and resources.

## Installation

```
npm install
```

## Building

```
npm run build
```

## Configuration

The server requires the following environment variables:

- `HYPERLIQUID_SECRET_KEY`: Your Hyperliquid private key for signing transactions
- `HYPERLIQUID_ACCOUNT_ADDRESS` (optional): Your account address (if different from the wallet address)
- `HYPERLIQUID_NETWORK` (optional): The network to connect to (`mainnet` or `testnet`, default: `mainnet`)

These environment variables are automatically configured by the web dashboard when you authenticate.