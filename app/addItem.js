// components/AddItemPage.js
'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { db } from '../firebase';

export default function AddItemPage() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, 'pantryItems'), {
      name: itemName,
      quantity: Number(quantity),
    });
    setItemName('');
    setQuantity('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/pantry.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          bgcolor: '#f5f5dc',
          borderRadius: 1,
          boxShadow: 3,
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Item
        </Typography>
        <TextField
          label="Item Name"
          variant="outlined"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Item
        </Button>
      </Box>
    </Box>
  );
}
