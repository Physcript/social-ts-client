import React,{ useContext,useEffect,useState } from "react"
import AuthContext from '../context/auth/context'
import CreatePostComponent from '../component/CreatePostComponent'
import AllPostComponent from '../component/AllPostComponent'
import request from '../module/request'
import socket from '../module/socket'

import { useNavigate } from 'react-router-dom'
import NotifComponent from "../component/NotifComponent"
export interface IHomePage {}

const HomePage: React.FC<IHomePage> = (props) => {
  const authContext = useContext(AuthContext)
  const [ showModal, setShowModal ] = useState<boolean>(false)
  const myUid = authContext.userState.USER.uid
  const navigate = useNavigate()
  const { _id,firstName,lastName,avatar,uid,email,createdAt,updatedAt, address }  = authContext.userState.USER
  
  useEffect(() => {
    
    socket.on('like-notif', (data) => {
      const _postId = (data.data.postId)
      const _uid = (data.data.uid)
      const uid = authContext.userState.USER.uid

      if(_uid == uid && ( myUid !== _uid ))
        {
          setShowModal(true)
          setTimeout(() =>{setShowModal(false)},3000)
        }
    })

  },[])

  return (
    <div className = 'container'>
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
      <NotifComponent show = { showModal } />
    </div>

  )

}

export default HomePage
