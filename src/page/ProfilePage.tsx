
import React, { useContext,useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import IUser, { DUser } from '../interface/user'
import _request from '../module/request'

export interface IProfilePage {}

const ProfilePage: React.FC<IProfilePage> = (props) => {
  const [ profile,setProfile ] = useState<IUser>(DUser)
  const navigate = useNavigate()
  const { uid } = useParams()
  const url = '/search'
  const method = 'POST'
  const body = JSON.stringify({'uid' : uid})
  const request = _request({ url,method,body} )
  useEffect(() => {
    
    fetch(request)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              setProfile(res.message.user)
            })
          }
        else
          {
            val.json().then((res) => {
              console.log(res)
            })
          }
      })
  
  
  },[])

  return (
    <div> 
      <div>
        <label>Test</label>
        <button
          onClick = { () => navigate('/') }
        >Home</button>
      </div>
      <section>
        <div style = {{ width: '200px' }}>
          <img src = { profile.avatar } style = {{ width: '100%' }}/>  
        </div>
        <div style = {{ display: 'flex', flexDirection: 'column' }}>
          <label>{ profile.firstName } { profile.lastName }</label>
          <label>Join at:</label>
        </div>
      </section>
    </div> 
  )  
}

export default ProfilePage
