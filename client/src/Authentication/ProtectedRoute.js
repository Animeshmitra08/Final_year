import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from './UseAuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useUserAuth();
    if(!user){
        return <Navigate to="/" replace/>;
    }
  return children
}

export default ProtectedRoute