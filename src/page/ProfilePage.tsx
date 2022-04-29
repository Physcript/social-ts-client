
import React, { useContext,useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth/context'
import IUser, { DUser } from '../interface/user'
import _request from '../module/request'

export interface IProfilePage {}

const ProfilePage: React.FC<IProfilePage> = (props) => {
  const userContext = useContext(AuthContext) 

  const [ profile,setProfile ] = useState<IUser>(DUser)
  const [ followerCount, setFollowerCount ] = useState<number>(0)
  const [ showFollow,setShowFollow ] = useState<boolean>(true)
  const [ textButton,setTextButton ] = useState<string>('Follow')


  const navigate = useNavigate()
  const { uid } = useParams()
  
  let url = '/search'
  let method = 'POST'
  let body = JSON.stringify({'uid' : uid})
  const request = _request({ url,method,body} )
  
  url = '/f/check'
  method = 'POST'
  body = JSON.stringify({'followUid': uid})
  const request2 = _request({url,method,body})

  
  const followHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let url = '/f/create'
    let method = 'POST'
    let body = JSON.stringify(({ 'followUid': uid  }))

    const request = _request({url,method,body})
    fetch(request)
      .then((val) => {
        val.json().then((res) => {
          if(res.message)
            {
              setTextButton('Followed')
            }
          if(res.message === false)
            {
              setTextButton('Follow')
            }
        })
      })

  }


 useEffect(() => {
  
  

  if(userContext.userState.USER.uid === uid)
    {
      setShowFollow(false)
    }
    fetch(request)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              setProfile(res.message.user)
              setFollowerCount(res.message.count)
            })
          }
        else
          {
            val.json().then((res) => {
              console.log(res)
            })
          }
      })


  fetch(request2)
    .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              console.log(res.message)
              if(res.message)
                {
                  setTextButton('Followed')
                }
              else
                {
                  setTextButton('Follow')
                }
            })
          }
        else
          {
            val.json().then((res) => {
              console.log(res.message)
            })
          }
    })
  
  },[])

  return (
    <div> 
      <section>
        <div style = {{ width: '200px' }}>
          <img src = { profile.avatar } style = {{ width: '100%' }}/>  
        </div>
        <div style = {{ display: 'flex', flexDirection: 'column' }}>
          <label>{ profile.firstName } { profile.lastName }</label>
          <label>Followers: { followerCount }</label>
        </div>
        <div>
          { showFollow ? (
            <button onClick = { followHandler }>{ textButton }</button>
          ): (<div></div>) 
          }
        </div>

      </section>
    </div> 
  )  
}

export default ProfilePage
