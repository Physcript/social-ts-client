
import React, { useState,useEffect } from 'react'
import request from '../module/request'

export interface ISinglePost {
  _id: string
  body: string
  avatar: string
  firstName: string
  lastName: string
  uid: string
  createdAt: string
  updatedAt: string
}

const SinglePost: React.FC<ISinglePost> = (post) => {
  const [ likeCount, setLikeCount ] = useState<number>(0)
  
  const likeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    const url = '/like/comment'
    const method = 'POST'
    const body = JSON.stringify({
      uid: post.uid,
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

  useEffect(() => {
    console.log('effect')  
  },[])

  return (
    <div style = {{ margin: '10px 0', padding: '5px', border: '1px solid black', width: '50%' }}>
      <section style = {{ display: 'flex' }}>
        <img src = { post.avatar } style = {{ width: '25px' }} />
        <label><a href = { `/user/${post.uid}` }>{ post.firstName } { post.lastName }</a></label>
      </section>
      <section>
        { post.body }
      </section>
      <section>
        <label>{ likeCount }</label>
        <button onClick = { likeHandler }>Like</button>
        <button>Comment</button>
      </section>
  </div>
  )
}

export default SinglePost
