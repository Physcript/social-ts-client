import React,  { useContext }from 'react'
import AuthContext from '../context/auth/context'

import { Navigate } from 'react-router-dom'

export interface IProtectedRoute {}

const ProtectedRoute: React.FC<IProtectedRoute> = (props) => {
  const { children } = props
  const { STATUS } = useContext(AuthContext).userState  
  
  if( STATUS === false )
    {
      return <Navigate to = '/' />
    }

  return (
    <div>
      {
        children
      }
    </div>
  )
}


export default ProtectedRoute
