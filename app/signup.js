// signup.js
'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { auth, db } from './firebase'; // Ensure this path is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUpPage({ onSignUpSuccess, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); // Optional
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: displayName,
        createdAt: new Date(),
      });

      // Notify parent component of successful sign up
      onSignUpSuccess();
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
          Sign Up
        </Typography>
        <TextField
          label="Display Name" // Optional
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth
          margin="normal"
        />
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
        <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Button onClick={() => setCurrentPage('login')}>Login</Button>
        </Typography>
      </Paper>
    </Box>
  );
}
