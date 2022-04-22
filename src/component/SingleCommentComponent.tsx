import React, { useState,useEffect } from 'react'
import request from '../module/request'

export interface ISingleCommentComponent {
  postId: string   
} 

const SingleCommentComponent: React.FC<ISingleCommentComponent> = (props) => {
  
  const [ comment,setComment ] = useState([])
  const [ size,setSize ] = useState<number>(0)
  let [ skip, setSkip ] = useState<number>(0)
  let [ showActive, setShowActive ] = useState<boolean>(true) 
  let [ fm, setFm ] = useState<boolean>(true)

  const url = '/c/get'
  const method = 'POST'
  const body = JSON.stringify({ postId: props.postId, _limit: 3, _skip: skip })

  const _request = request({ url,method,body })
  const showMoreHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
      e.preventDefault()
      setFm(true)
      if( size > skip)
        {
          setSkip( skip += 2 )
        }
      else
        {
          setSkip( skip -2 )
        }
      return
  }

  useEffect(() => {
    if( fm  )
    {
    fetch(_request)
      .then((val) =>{
        
        if(val.status === 200)
          {
            val.json().then((res) => {
              setComment(res.message.comment)
              setSize(res.message.size)
            })   
          }
        else
          {
            val.json().then((res) => {
              console.log(res.message)
            })
          }
      })
      .finally(() => {
        setFm(false) 
      })
    }

    },[showMoreHandler])

     

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
      {
        size > 3  ? (<label onClick = { showMoreHandler }>show more comment</label>) : (<div></div>)
      }
    </div>
  )
}

export default SingleCommentComponent
