import { Alert, TextField } from '@mui/material'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Authentication/UseAuthContext';
import CheckIcon from '@mui/icons-material/Check';

const ResetPass = () => {

    const [open, setOpen] = React.useState(true);
    const [email, setEmail] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const { resetPassword } = useUserAuth();

    const handleSubmit = () =>{
        // setOpen(false)
        try {
            resetPassword(email)
            setSuccess("A link has been sent to your email")
        } catch (err) {
            setError(err.messages);
        }
    }



  return (
    <>
        <Dialog 
        open={open}>
        <DialogTitle>Password Reset Email</DialogTitle>
        { success ? 
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {success}
            </Alert>
            :
            error ? 
            <Alert severity="error">{error}</Alert> : null
        }
        <DialogContent>
          <DialogContentText>
            Enter your email to reset Password. After submit a link will be send to your email.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{navigate("/login")}}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ResetPass