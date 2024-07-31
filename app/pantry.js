'use client'; // Ensure this file runs on the client side

import { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PantryForm() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingId, setEditingId] = useState(null); // To handle update
  const [pantryItems, setPantryItems] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (editingId !== null) {
      // Update existing item
      setPantryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingId
            ? { ...item, name: itemName, quantity: Number(quantity) }
            : item
        )
      );
    } else {
      // Add new item
      setPantryItems((prevItems) => [
        ...prevItems,
        { id: Date.now(), name: itemName, quantity: Number(quantity) },
      ]);
    }
    
    setItemName('');
    setQuantity('');
    setEditingId(null);
  };

  const handleEdit = (id, name, quantity) => {
    setItemName(name);
    setQuantity(quantity);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setPantryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/pantry.png)', // Path to your image
        backgroundSize: 'cover', // Cover the whole area
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
          bgcolor:'#f5f5dc',
          borderRadius: 1,
          boxShadow: 3,
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {editingId ? 'Update Item' : 'Add New Item'}
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
          {editingId ? 'Update Item' : 'Add Item'}
        </Button>

        <Paper sx={{ mt: 4, p: 2, width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Pantry Items
          </Typography>
          <List>
            {pantryItems.map(item => (
              <ListItem key={item.id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id, item.name, item.quantity)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
