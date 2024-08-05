'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { TextField, Button, Box, Typography, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { db } from './firebase';

const predefinedItems = [
  'Apples',
  'Bananas',
  'Bread',
  'Milk',
  'Eggs',
  'Cheese',
  'Rice',
  'Pasta',
  'Tomato Sauce',
  'Cereal'
];

const quantityTypes = [
  'Units',
  'Liters',
  'Kilograms',
  'Grams',
  'Cups'
];

export default function AddItemPage({ setCurrentPage }) {
  const [itemName, setItemName] = useState('');
  const [customItem, setCustomItem] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityType, setQuantityType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    // Basic validation
    if ((selectedItem === '' && customItem.trim() === '') || quantity <= 0 || quantityType === '') {
      setError('Please complete all fields.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'pantryItems'), {
        name: selectedItem || customItem,
        quantity: Number(quantity),
        quantityType: quantityType
      });
      setItemName('');
      setCustomItem('');
      setQuantity('');
      setQuantityType('');
      setSelectedItem('');
      setSuccess(true);
    } catch (error) {
      setError('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/pantry.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Button
        variant="outlined"
        onClick={() => setCurrentPage('home')}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      >
        Back
      </Button>
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
          zIndex: 1, // Ensure form is above background image
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Item
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" gutterBottom>
            Item added successfully!
          </Typography>
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel id="item-select-label"></InputLabel>
          <Select
            labelId="item-select-label"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            displayEmpty
            renderValue={(value) => value || 'Select an item'}
          >
            <MenuItem value="" disabled>Select an item</MenuItem>
            {predefinedItems.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedItem === '' && (
          <TextField
            label="Custom Item Name"
            variant="outlined"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        )}
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="quantity-type-label"></InputLabel>
          <Select
            labelId="quantity-type-label"
            value={quantityType}
            onChange={(e) => setQuantityType(e.target.value)}
            displayEmpty
            renderValue={(value) => value || 'Select quantity type'}
          >
            <MenuItem value="" disabled>Select quantity type</MenuItem>
            {quantityTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Item'}
        </Button>
      </Box>
    </Box>
  );
}
