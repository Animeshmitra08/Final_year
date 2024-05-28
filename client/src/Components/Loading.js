import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Loading = () => {
  return (
    <>
        <Box sx={{display:"flex",height:"100vh", width:"100vw",justifyContent:"center",alignItems:"center"}}>
            <CircularProgress size={50}/>
        </Box>
    </>
  )
}

export default Loading