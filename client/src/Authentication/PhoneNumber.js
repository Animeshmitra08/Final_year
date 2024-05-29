import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import OtpInput from 'react-otp-input';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/firebase';


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




export default function PhoneNumber(){
    const [otp, setOtp] = useState("");
    const [phnNumber, setPhnNumber] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [alert, setAlert] = useState("");
    const [user, setUser] = useState(null);
    const [openOtp, setOpenOtp] = useState(false);

    const navi = useNavigate()

    const capchaVerify = ()=> {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignUp();
                  },
                  'expired-callback': () => {
                    
                  }
              });
        }
        
          
        
    }


    const onSignUp =(e)=>{
        e.preventDefault();
        setLoading(true);
        capchaVerify();

        const formatPhn = '+'+phnNumber;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, formatPhn, appVerifier)
        .then(async (confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setOpenOtp(true);
            setAlert("Otp send succeessfully")
        }).catch((error) => {
            setError(error.messages);
            setLoading(false)
        });
    }


    const otpVerify = (e)=>{
        e.preventDefault();
        setLoading(true);
        window.confirmationResult.confirm(otp).then(async (result) => {
            setUser(result.user);
            console.log(result);
            setLoading(false); 
            navi("/dashboard");
        }).catch((error) => {
            setError(error);
            setLoading(false)
        });
    }

  




  return (
    <>
    <ThemeProvider theme={theme}>
    {alert &&    
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
       {alert}
    </Alert>}

    {error && <Alert sx={{marginTop:2}} severity="error">{error}</Alert>}
        <div id='sign-in-button'></div>

        {user ? <div>Loged in.........</div>:
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {openOtp ?
        <Card variant='outlined'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Your OTP
          </Typography>


          <Box component="form" method='get' autoComplete='off'  noValidate sx={{ mt: 1 }}>            
            <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType='number'
            shouldAutoFocus
            renderSeparator={<span>-</span>}
            containerStyle="otp-Container"
            inputStyle="otp-input"
            renderInput={(props) => <input {...props} />}
            />            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={otpVerify}
              sx={{ mt: 3, mb: 2 , display:"flex", gap:"1em", justifyContent:"center", alignItems:"center"}}
            >
                {loading ? 
                <CircularProgress color='secondary' thickness={5} size="2em"/>:null}
             <span> Verify</span>
            </Button>            
          </Box>
        </Card>
        :
        <Card variant='outlined'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify your Phone Number
          </Typography>

          

          <Box component="form" onSubmit={onSignUp} method='get' autoComplete='off'  noValidate sx={{ mt: 1 }}>   

            <PhoneInput
            country={'in'}
            value={phnNumber}
            onChange={setPhnNumber}
            />         
                      
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , display:"flex", gap:"1em", justifyContent:"center", alignItems:"center"}}
            >
                {loading ? 
                <CircularProgress color='secondary' thickness={5} size="2em"/>:null}
             <span>Send Code Via SMS</span>
            </Button>            
          </Box>
        </Card>}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>}
    </ThemeProvider>
    </>
  )
}
