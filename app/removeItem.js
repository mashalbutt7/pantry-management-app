'use client';

import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from './firebase';

export default function RemoveItemPage({ setCurrentPage }) {
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantryItems'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPantryItems(items);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const itemRef = doc(db, 'pantryItems', id);
    await deleteDoc(itemRef);
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
      <Paper sx={{ p: 2, width: '100%', maxWidth: 600, zIndex: 1 }}>
        <Typography variant="h6" gutterBottom>
          Pantry Items
        </Typography>
        <List>
          {pantryItems.map(item => (
            <ListItem key={item.id} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
