import React, { useState,useEffect } from 'react'
import request from '../module/request'
import { IPost } from '../interface/post'

import SinglePost from './SinglePost'

interface IAllPostComponent {}
const AllPostComponent: React.FC<IAllPostComponent> = (props) => {

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

  }, [])

  return (
    <div>
      
      {
        post.map((post,index) => {
            return (
              <SinglePost key = { index } body = { post.body } avatar = { post.avatar }
                uid = { post.userUid } createdAt = { post.createdAt } updatedAt = { post.updatedAt }
                firstName = { post.firstName } lastName = { post.lastName }
              /> 
            )
          }) 
        
      }

    </div>
  )
}
export default AllPostComponent



