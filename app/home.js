// app/home.js
'use client';

import { Box, Typography, Button } from '@mui/material';

export default function HomePage({ setCurrentPage }) {
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
      <Typography variant="h3" color={'whitesmoke'} gutterBottom>
        Pantry Management Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setCurrentPage('add-item')}>
        Add Item
      </Button>
      <Button variant="contained" color="primary" onClick={() => setCurrentPage('update-item')} sx={{ mt: 2 }}>
        Update Item
      </Button>
      <Button variant="contained" color="primary" onClick={() => setCurrentPage('remove-item')} sx={{ mt: 2 }}>
        Remove Item
      </Button>
      <Button variant="contained" color="primary" onClick={() => setCurrentPage('search-filter-page')} sx={{ mt: 2 }}>
        Search Filter Page
      </Button>
    </Box>
  );
}
