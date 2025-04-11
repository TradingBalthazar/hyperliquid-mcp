import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  Snackbar,
  CircularProgress,
  Link
} from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [secretKey, setSecretKey] = useState('');
  const [accountAddress, setAccountAddress] = useState('');
  const [network, setNetwork] = useState('mainnet');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/authenticate', {
        secretKey,
        accountAddress,
        network
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(response.data.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Hyperliquid MCP Dashboard
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Authentication
          </Typography>
          
          <Typography variant="body1" paragraph>
            Enter your Hyperliquid credentials to configure the MCP server. Your private key will be stored locally and never sent to any external servers.
          </Typography>
          
          {success ? (
            <Box sx={{ mt: 3 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                Authentication successful! The MCP server has been configured.
              </Alert>
              <Typography variant="body1" paragraph>
                You can now use HL Coder to interact with the Hyperliquid exchange. Here are some examples:
              </Typography>
              <ul>
                <li>Get the current BTC price on Hyperliquid</li>
                <li>Place a limit order to buy 0.1 BTC at $50,000</li>
                <li>Check my open orders on Hyperliquid</li>
                <li>Update my leverage for ETH to 10x</li>
              </ul>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                label="Secret Key"
                type="password"
                fullWidth
                margin="normal"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                helperText="Your Hyperliquid private key for signing transactions"
              />
              
              <TextField
                label="Account Address (optional)"
                fullWidth
                margin="normal"
                value={accountAddress}
                onChange={(e) => setAccountAddress(e.target.value)}
                helperText="Your account address (if different from the wallet address)"
              />
              
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Network</Typography>
                <RadioGroup
                  row
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <FormControlLabel value="mainnet" control={<Radio />} label="Mainnet" />
                  <FormControlLabel value="testnet" control={<Radio />} label="Testnet" />
                </RadioGroup>
              </FormControl>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Authenticate'}
              </Button>
            </Box>
          )}
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Need help? Check out the{' '}
            <Link href="https://github.com/yourusername/hyperliquid-mcp" target="_blank" rel="noopener">
              GitHub repository
            </Link>
            {' '}for documentation.
          </Typography>
        </Box>
      </Box>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;