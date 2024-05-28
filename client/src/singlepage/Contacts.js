import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DrawerAppBar from '../NavComponents/DrawerAppBar';
import { Box, Button, Card } from '@mui/material';
import Footer from '../NavComponents/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

export default function Contacts() {
  return (
    <>
    <DrawerAppBar/>
    <Box sx={{p:2}}>
      <ThemeProvider theme={theme}>
      <Container component="main" sx={{maxWidth:850}}>
        <CssBaseline />
        <Card variant='outlined'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2
          }}
        >
      <Typography component="h1" variant="h4" gutterBottom sx={{textDecoration: 'underline'}}>
        Contact Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
          />
        </Grid>
        
      
        <Grid item xs={12}>
          <TextField
            required
            id="message"
            name="message"
            label="message"
            fullWidth
            multiline
            maxRows={4}
            autoComplete="shipping address-level2"
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant='contained'>Submit</Button>
        </Grid>
      </Grid>
      </Card>
      </Container>
      </ThemeProvider>
      </Box>
      <Footer/>
    </>
  );
}