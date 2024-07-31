import { Button, Typography, Paper, Box } from '@mui/material';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box
        sx={{
          bgcolor: 'background.default',
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/pantry.png)', // Correct path to the image
          backgroundSize: 'cover',  // Cover the whole area
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="h1" color="primary">
          Hello
        </Typography>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          This is a paper component.
        </Paper>
      </Box>
    </main>
  );
}
