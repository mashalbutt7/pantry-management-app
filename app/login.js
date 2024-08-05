// app/login.js
'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { auth } from './firebase'; // Ensure this path is correct
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage({ onLoginSuccess, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/pantry.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper sx={{ p: 3, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Button onClick={() => setCurrentPage('sign-up')}>Sign Up</Button>
        </Typography>
      </Paper>
    </Box>
  );
}
