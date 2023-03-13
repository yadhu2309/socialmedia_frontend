import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

export function PrivateRoute({children}) {
    let {user} =useContext(AuthContext)
 if(!user){
    return <Navigate to='/'/>
 }
  return (
    children
  )
}

export function ProtectedRoute({children}) {
  let {admin} =useContext(AuthContext)
if(!admin){
  return <Navigate to='/'/>
}
return (
  children
)
}

