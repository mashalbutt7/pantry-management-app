'use client'; // Ensure this file runs on the client side

import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from './firebase'; // Ensure you have Firebase configuration

export default function PantryForm() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingId, setEditingId] = useState(null); // To handle update
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantryItems'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPantryItems(items);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId !== null) {
      // Update existing item
      const itemRef = doc(db, 'pantryItems', editingId);
      await updateDoc(itemRef, {
        name: itemName,
        quantity: Number(quantity),
      });
    } else {
      // Add new item
      await addDoc(collection(db, 'pantryItems'), {
        name: itemName,
        quantity: Number(quantity),
      });
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

  const handleDelete = async (id) => {
    const itemRef = doc(db, 'pantryItems', id);
    await deleteDoc(itemRef);
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
