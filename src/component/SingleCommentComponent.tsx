import React, { useState,useEffect } from 'react'
import request from '../module/request'

export interface ISingleCommentComponent {
  postId: string   
} 

const SingleCommentComponent: React.FC<ISingleCommentComponent> = (props) => {
  
  const [ comment,setComment ] = useState([])
  
  const url = '/c/get'
  const method = 'POST'
  const body = JSON.stringify({ postId: props.postId })

  const _request = request({ url,method,body })
  fetch(_request)
    .then((val) =>{
      
      if(val.status === 200)
        {
          val.json().then((res) => {
            setComment(res.message.comment)
          })   
        }
      else
        {
          val.json().then((res) => {
            console.log(res.message)
          })
        }
    })

  return (
    <div>
      {
        comment.map((com: any,index:any) => {
          return (
            <div className = 'boxes' key = {index} style = {{ display: 'flex',flexDirection: 'column' }}>
              <div>
              <img src = { com.usr.avatar } style = {{ width: '25px' }} />
              <label>{ com.usr.firstName } {com.usr.lastName}</label>
              </div>
              <label style = {{ marginLeft: '25px' }}>{ com.body }</label>
            </div>
          )
        })
      }
    </div>
  )
}

export default SingleCommentComponent
