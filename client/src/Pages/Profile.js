import { Typography } from '@mui/material'
import React from 'react'
import { useUserAuth } from '../Authentication/UseAuthContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  const {user} = useUserAuth();
  return (
    <>
    <div>
      <Typography>Name: {!user.displayName ? user.email: user.displayName}</Typography>
      <Typography>Email: {user.email}</Typography>
      {user.photoURL === null ?
      <AccountCircleIcon/>
      :
      <img alt='profileimg' src={user.photoURL}/>
      }      
    </div>
    </>
  )
}

export default Profile