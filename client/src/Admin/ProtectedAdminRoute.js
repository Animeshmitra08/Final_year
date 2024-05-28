import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedAdminRoute = () => {
  // let auth = {'token':true}
  // return(
  //   auth.token ? <Outlet/> : <Navigate to="/adminlogin"/>
  // )
}

export default ProtectedAdminRoute