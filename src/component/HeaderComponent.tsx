import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/auth/context'
import IUser, { DUser } from '../interface/user'
import request from '../module/request'
import { useNavigate } from 'react-router-dom'

export interface IHeaderComponent {}

const HeaderComponent: React.FC<IHeaderComponent> = (props) => {
  const userContext = useContext(AuthContext)
  const navigate = useNavigate() 

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const url = '/logout'
    const method = 'POST'
    const body = JSON.stringify({
      "uid": userContext.userState.USER.uid
    })
    const _request = request({ url,method,body })
    
    fetch(_request)
      .then((val) => {
  
          if(val.status === 200)
            {
              val.json().then((res) => {
                localStorage.setItem('token', '')
                userContext.userDispatch({ TYPE: 'LOGOUT' , PAYLOAD: { } }) 
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

  const profileHandler = () => {
    navigate(`/user/${ userContext.userState.USER.uid }`) 
  }
  const loginHandler = () => {
    navigate('/login')     
  }
  const registerHandler = () => {
    navigate('/register')
  }

  return (
    
    <div className = 'contkainer'>
      <nav style = {{ 'display': 'flex', justifyContent: 'space-between' }}>
        <div>
          <label 
            onClick = { 
              () => navigate('/home')
            }
          >SocialLink</label>
        </div> 
        <div> 
          { userContext.userState.STATUS == true 
            ?
              (
                <div style = {{ 'display': 'flex', 'gap': '10px' }} >
                  <label onClick = { profileHandler }>{ userContext.userState.USER.firstName }</label>
                  <button onClick = { logoutHandler } >Logout</button>
                </div>
              )
            :
              (
                <div style = {{ display: 'flex','gap': '10px' }}>
                  <label onClick = { registerHandler }>Register</label>
                  <label onClick = { loginHandler }>Login</label>
                </div>
              )
          }
        </div>
      </nav>
    </div>
      
    
  )
}

export default HeaderComponent
