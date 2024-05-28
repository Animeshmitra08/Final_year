import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import Card from '@mui/material/Card';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import { useUserAuth } from './UseAuthContext';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to={"/"}>
          SkillSphere
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
  
const theme = createTheme();




export default function Login(){


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, googleSign } = useUserAuth();
  const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          await login(email,password);
          navigate('/dashboard');
        } catch (err) {
          setError(err.message);
          console.log(error)
        }
        
      };


      const handleGoogle = async (e) =>{
        e.preventDefault();
        try {
          await googleSign();
          navigate("/");
        } catch (err) {
          setError(err.messages)
        }
      }



const toggleswitch=()=>{
  navigate('/adminlogin')
}
const resetPass = (e) =>{
  e.preventDefault();
  navigate("/resetpassword");
}




  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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

          <Button onClick={toggleswitch}><SwitchAccessShortcutAddIcon/><p>Switch to Admin Login</p></Button>


          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Student Login
          </Typography>

          {error && <Alert sx={{marginTop:2}} severity="error">{error}</Alert>}

          <Box component="form" method='get' autoComplete='off' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link hrcomponent="button"
                  variant="body2"
                  onClick={resetPass}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/register'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Button onClick={handleGoogle}>
            Google
          </Button>
        </Card>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  )
}
