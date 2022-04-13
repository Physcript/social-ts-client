import React,{ useContext,useState } from "react"
import AuthContext from '../context/auth/context'
import CreatePostComponent from '../component/CreatePostComponent'
import AllPostComponent from '../component/AllPostComponent'
import request from '../module/request'
import socket from '../module/socket'

import { useNavigate } from 'react-router-dom'
export interface IHomePage {}

const HomePage: React.FC<IHomePage> = (props) => {
  const authContext = useContext(AuthContext)
  socket.emit('asd', { 'asd' : 's222'})
  

  const navigate = useNavigate()
  const { _id,firstName,lastName,avatar,uid,email,createdAt,updatedAt, address }  = authContext.userState.USER
  return (
    <div>
      Home
      <CreatePostComponent _id = { _id } firstName = { firstName } 
        lastName = { lastName }
        uid = { uid }
        avatar = { avatar }
        createdAt = { createdAt }
        updatedAt = { updatedAt }
        address = { address }
        email = { email }
      />
      <AllPostComponent />
      </div>

  )

}

export default HomePage
