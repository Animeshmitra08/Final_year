import React, {useEffect, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import { get, ref } from 'firebase/database';
import { database } from '../firebase/firebase';
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




export default function AdminLogin(props){

  const { adminUsersData } = useUserAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [adminUsers, setAdminUsers] = useState({
    useremail : "",
    password : ""
  })
  const [error, setError] = useState("");

  const navigate = useNavigate();

  let name, value;
  const handleChange = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setAdminUsers({...adminUsers, [name]:value})
  }



  const handleSubmit = async (event) => {
      event.preventDefault();   
      const {useremail, password} = adminUsers;
      adminUsersData && adminUsersData.map((data)=>{
        if (data.data.email === useremail) {
          if (data.data.password === password) {
            alert("email and password matched");
            navigate("/admindashboard");
            setIsLoggedIn(true);
          }else{
            alert("password dont matched")
          }
        }else{
          alert("email dont matched")
        }  
      });      
    };
    



const toggleswitch=()=>{
  navigate('/login')
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

          <Button onClick={toggleswitch}><SwitchAccessShortcutAddIcon/><p>Switch to Student Login</p></Button>


          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>

          {error && <Alert sx={{marginTop:2}} severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="useremail"
              label="Username or Email Address"
              name="useremail"
              type='text'
              value={adminUsers.useremail}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={adminUsers.password}
              onChange={handleChange}
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
                <Link href="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/adminsignup'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  )
}
