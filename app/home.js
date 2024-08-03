// components/HomePage.js
'use client';

import { Box, Typography, Button } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(/pantry.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Pantry Management Dashboard
      </Typography>
      <Button variant="contained" color="primary" href="/add-item">
        Add Item
      </Button>
      <Button variant="contained" color="primary" href="/update-item" sx={{ mt: 2 }}>
        Update Item
      </Button>
      <Button variant="contained" color="primary" href="/remove-item" sx={{ mt: 2 }}>
        Remove Item
      </Button>
    </Box>
  );
}
