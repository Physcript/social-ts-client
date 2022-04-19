import React, { useState,useEffect, useContext } from 'react'
import request from '../module/request'
import { IPost } from '../interface/post'
import socket from '../module/socket'
import SinglePost from './SinglePost'
import AuthContext from '../context/auth/context'

interface IAllPostComponent {}
const AllPostComponent: React.FC<IAllPostComponent> = (props) => {
  const userContext = useContext(AuthContext)
  const [ post,setPost ] = useState<IPost[]>([])
  const url = '/post'
  const method = 'GET'
  
  const _request = request({url,method})

  useEffect(() => {
    
    fetch(_request)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              setPost(res.message.post)
            })
          }
        else
          {
            val.json().then((res) => {
              console.log(res)
            })
          }
      })
  socket.on('refresh-post', () => {
    fetch(_request) 
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              setPost(res.message.post)
            })
          }
        else
          {
            val.json().then((res) => {
                console.log(res)
            })
          }
      })  
  })
  
  }, [])

  return (
    <div>
      
      {
        post.map((post,index) => {
            return (
              <SinglePost key = { index } body = { post.body } avatar = { post.avatar }
                uid = { post.userUid } createdAt = { post.createdAt } updatedAt = { post.updatedAt }
                firstName = { post.firstName } lastName = { post.lastName } _id = { post._id }
                countLikes = { post.countLikes } userId = { userContext.userState.USER.uid } 
              /> 
            )
          }) 
        
      }

    </div>
  )
}
export default AllPostComponent



