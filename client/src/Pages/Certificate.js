import { Button, Card, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar';
import Footer from '../NavComponents/Footer';



import TextField from '@mui/material/TextField';
import { useUserAuth } from '../Authentication/UseAuthContext';

export const Certificate = () => {
  const { user } = useUserAuth();
  return (
    <>
        <DrawerAppBar/>
        <Toolbar/>
        {console.log(user)}
        <Container component="main" maxWidth="xs" sx={{height:'70vh'}}>
        <CssBaseline />
        <Card variant='outlined'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            height:'60%'
          }}
        >
          <Typography component="h1" variant="h5">
            Search For Your Certificate
          </Typography>




          <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography>Enter your Id Number:</Typography>
          <TextField
            margin='normal'
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Id number"
            fullWidth
            required
            autoFocus
          />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get
            </Button>
          </Box>      
        </Card>
        </Container>
        <Footer/>
    </>
  )
}
