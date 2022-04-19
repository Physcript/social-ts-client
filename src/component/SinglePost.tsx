
import React, { useState,useEffect } from 'react'
import request from '../module/request'
import { useNavigate } from 'react-router-dom'
import CommentComponent from './CommentComponent'

export interface ISinglePost {
  _id: string
  body: string
  avatar: string
  firstName: string
  lastName: string
  uid: string
  userId: string
  countLikes: number
  createdAt: string
  updatedAt: string
}

const SinglePost: React.FC<ISinglePost> = (post) => {
  const [ likeCount, setLikeCount ] = useState<number>(post.countLikes ?? 0)
  const [ show,setShow ] = useState<boolean>(false)

  const navigate = useNavigate() 
  const likeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    const url = '/like/comment'
    const method = 'POST'
    const body = JSON.stringify({
      uid: post.userId,
      postId: post._id
    })
    
    const _request = request({ url,method,body })
    fetch(_request)
      .then((val) => {
        if(val.status === 200) 
          {
            val.json().then((res) => {
              setLikeCount(res.message.count)
            })
          }
        else
          {
            val.json().then((res) => {
              console.log(res)
            })
          }
      })
  }

  const showHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(show === false)
      {
        setShow(true)
      }
    else
      {
        setShow(false)
      }
    return
  }


  useEffect(() => {
    console.log('effect')  
  },[])

  return (
    <div style = {{ margin: '10px 0', padding: '5px', border: '1px solid black', width: '50%' }}>
      <section style = {{ display: 'flex' }}>
        <img src = { post.avatar } style = {{ width: '25px' }} />
        <label onClick = { () => navigate(`/user/${post.uid}`) }><a href = '#'>{ post.firstName } { post.lastName }</a></label>
      </section>
      <section>
        { post.body }
      </section>
      <section>
        <label>{ likeCount }</label>
        <button onClick = { likeHandler }>Like</button>
        <button onClick = { showHandler }>Comment</button>
      </section>
      
      <CommentComponent postId = { post._id } showData = { show } />
  </div>
  )
}

export default SinglePost
