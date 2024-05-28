import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
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

export default function SignUp() {
  const [userData, setUserData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : ""
});

let name, value;
const postUserData = (e) =>{
  name = e.target.name;
  value = e.target.value;
  setUserData({...userData, [name]:value})
}

  const [error, setError] = useState("");

  const { signUp } = useUserAuth();

  const navi = useNavigate();

  const postData = async (e)=>{
    e.preventDefault();
    const {firstName, lastName, email, password} = userData;
    const res = await fetch('https://final-year-project-b1ebf-default-rtdb.firebaseio.com/userData.json', {
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      }),
    });
    if (res) {
      setError("");
      try {
        await signUp(email,password);
        navi('/');
      } catch (err) {
        setError(err.message)
        console.log(err)
      }
    } else {
      alert("fill user data")
    }
  }

  const toggleswitch=()=>{
    navi('/adminsignup')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p:2,
          }}
        >
          <Button onClick={toggleswitch}><SwitchAccessShortcutAddIcon/><p>Switch to Admin SignUp</p></Button>

          <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {error && <Alert sx={{marginTop:2}} severity="error">{error}</Alert>}

          <form noValidate method='POST' autoComplete='off' sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={userData.firstName}
                  autoFocus
                  onChange={postUserData}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={postUserData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={userData.email}
                  onChange={postUserData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={userData.password}
                  onChange={postUserData}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={postData}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>                                
              </Grid>
            </Grid>
          </form>
        </Card>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}