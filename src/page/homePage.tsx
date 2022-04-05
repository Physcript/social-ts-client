import React,{ useContext,useState } from "react"
import AuthContext from '../context/auth/context'
import CreatePostComponent from '../component/CreatePostComponent'
import AllPostComponent from '../component/AllPostComponent'
import request from '../module/request'

import { useNavigate } from 'react-router-dom'
export interface IHomePage {}

const HomePage: React.FC<IHomePage> = (props) => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const { _id,firstName,lastName,avatar,uid,email,createdAt,updatedAt, address }  = authContext.userState.USER

  
  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const url = '/logout'
    const method = 'POST'
    const body = JSON.stringify({
      "uid": authContext.userState.USER.uid
    })
    const _request = request({ url,method,body })
    
    fetch(_request)
      .then((val) => {
  
          if(val.status === 200)
            {
              val.json().then((res) => {
                localStorage.setItem('token', '')
                authContext.userDispatch({ TYPE: 'LOGOUT' , PAYLOAD: { } }) 
                navigate('/')
              })
            }
          else
            {
              val.json().then((res) => {
                  console.log(res)
                })
            }
      })


    return
  }

  return (
    <div>
      <div>
        <button
          onClick = { logoutHandler }
        >Logout</button>
      </div>
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
