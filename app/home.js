'use client'; // Mark this file as a Client Component

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddItemPage from './addItem';
import UpdateItemPage from './updateItem';
import RemoveItemPage from './removeItem';
//import InventorySummaryPage from './inventorySummary'; // Ensure this file exists

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
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
            <Button variant="contained" color="primary" onClick={() => setCurrentPage('add-item')}>
              Add Item
            </Button>
            <Button variant="contained" color="primary" onClick={() => setCurrentPage('update-item')} sx={{ mt: 2 }}>
              Update Item
            </Button>
            <Button variant="contained" color="primary" onClick={() => setCurrentPage('remove-item')} sx={{ mt: 2 }}>
              Remove Item
            </Button>
            <Button variant="contained" color="primary" onClick={() => setCurrentPage('inventory-summary')} sx={{ mt: 2 }}>
              Inventory Summary
            </Button>
          </Box>
        );
      case 'add-item':
        return <AddItemPage />;
      case 'update-item':
        return <UpdateItemPage />;
      case 'remove-item':
        return <RemoveItemPage />;
    //  case 'inventory-summary':
        return <InventorySummaryPage />;
      default:
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
          </Box>
        );
    }
  };

  return (
    <main>
      {renderPage()}
    </main>
  );
}
