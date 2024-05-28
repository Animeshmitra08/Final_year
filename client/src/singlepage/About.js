import React from 'react'
import { Box, Toolbar } from '@mui/material'
import DrawerAppBar from '../NavComponents/DrawerAppBar'
import Footer from '../NavComponents/Footer'

const About = () => {
  return (
    <>
        <DrawerAppBar/>
        <Box sx={{p:2}}>
          <Toolbar/>
          <h1>About</h1>
        </Box>
        <Footer/>
    </>
  )
}

export default About