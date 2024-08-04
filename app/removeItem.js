// components/RemoveItemPage.js
'use client';

import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from './firebase';

export default function RemoveItemPage() {
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/pantry.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper sx={{ mt: 4, p: 2, width: '100%', maxWidth: 600 }}>
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
