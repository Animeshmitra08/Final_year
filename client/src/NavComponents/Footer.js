import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Grid } from '@mui/material';

function Copyright() {
    return (
      <Typography variant="body2">
        {'Copyright © '}
        <Link color="inherit" href="/">
          SkillSphere
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Footer = () => {
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#246e96',
          flexGrow:1
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          spacing={3}
          p={2}
        >
          <Grid item>
            <img className='im' src="images/pic4.jpg" alt="" />
            <Typography>SkillSphere</Typography>
          </Grid>
          <Grid sx={{display:'flex', flexDirection:'column'}}>
            <Typography variant='h5' component='div'>Contact Info</Typography>
            <b>Address</b>
            <p>Baigachi More</p>
            <b>Phone</b>
            <p>1234567895</p>
            <b>Email</b>
            <p>myapp@email.com</p>
          </Grid>
          <Grid>
            <Typography variant='h5' component='div'>Join Us</Typography>
            <FacebookIcon/>
            <LinkedInIcon/>
            <GitHubIcon/>
            <WhatsAppIcon/>
            <InstagramIcon/>
            <TwitterIcon/>            
          </Grid>        
        </Grid>
      </Box>


      <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        height:'2em',
        backgroundColor: '#07486b',
        color:'white',
      }}
      >
        <Copyright/>
      </Box>
    </Box>
    </>
  )
}

export default Footer