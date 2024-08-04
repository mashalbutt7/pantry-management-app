
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { TextField, Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { db } from './firebase';

export default function SearchFilterPage() {
  const [pantryItems, setPantryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantryItems'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPantryItems(items);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: 'url(/pantry.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <TextField
        label="Search Items"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ mt: 4, maxWidth: 600 }}
      />
      <Paper sx={{ mt: 4, p: 2, width: '100%', maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Search Results
        </Typography>
        <List>
          {filteredItems.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
