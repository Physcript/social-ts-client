import React, { useState,useContext } from 'react'
import  IUser  from '../interface/user'
import AuthContext from '../context/auth/context'
import SingleCommentComponent from './SingleCommentComponent'
import request from '../module/request'

export interface ICommentComponent {
  postId: string,
  showData: boolean
}

const CommentComponent: React.FC<ICommentComponent> = (props) => {
  const UserContext = useContext(AuthContext)
  const [ user,setUser ] = useState<IUser>(UserContext.userState.USER)
  const [ comment,setComment ] = useState<string>('')

  const commentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    const url = '/c/create'
    const method = 'POST'
    const body = JSON.stringify({ body: comment, postId: props.postId })
    const _request = request({ url,method,body })
    
    fetch(_request)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              console.log(res.message)
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
 
  return (
    <div>
      { props.showData ? (
      <div>
        <div style = {{ paddingLeft: '20px',display: 'flex', gap: '5px' }}>
          <img src = { user.avatar } style = {{ width: '25px', borderRadius: '20px' }}/> 
          <input type = 'text' 
            placeholder = 'Input Comment ...'
            name = 'comment'
            value = { comment }
            onChange = { (e) => setComment(e.target.value) }
          />
          <button onClick = { commentHandler }>Comment</button>
        </div>
        <div style = {{ paddingLeft: '20px' }}>
          <SingleCommentComponent postId = { props.postId }/>
        </div>
      </div>
      ): 
      (
        <div></div>
      )
      }

      
    </div>
  )
}

export default CommentComponent
