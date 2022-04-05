
import React, { useState,useContext,useEffect } from 'react'
import AuthContext from '../context/auth/context'

import { useNavigate } from 'react-router-dom'
import request from '../module/request'

export interface IMainPage {}

const MainPage = () => {
  
  const UserContext = useContext(AuthContext)
  const navigate = useNavigate() 
  
  const [ loading,setLoading ] = useState<boolean>(false)
  const [ error,setError ] = useState<string>('')
  const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '')
   

  useEffect(() => {
   
    if( UserContext.userState.STATUS !== false )
      {
        navigate('/home')
      } 
   if( token !== '' )
    {
      const _request = request({url: '/auth', method: 'POST'})
      fetch(_request)
        .then((val) => {
          if(val.status === 200)
            {
              val.json().then((res) => {
                const token = localStorage.getItem('token') ?? ''
                const user = res.message.user
                UserContext.userDispatch({ TYPE: 'LOGIN' , PAYLOAD: { USER: user, TOKEN: token }}) 
                navigate('/home')
              })  
            }
          else
            {
              val.json().then((res) => {
                // delete token if failed or un authenticated
                localStorage.setItem('token','')
              })
            }
        })
    }
  },[])

  return (
    <div style = {{ display: 'flex', flexDirection: 'column', width: '150px' }}>
      Main page
      <button
        onClick = { () => navigate('/login') }
      >Login</button>
      <button
        onClick = { () => navigate('/register') }
      >Register</button>
    </div>
  )
}

export default MainPage
