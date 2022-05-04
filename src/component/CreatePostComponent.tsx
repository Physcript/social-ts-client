
import React,{ useState } from 'react'
import IUser from '../interface/user'
import request from '../module/request'
import socket from '../module/socket'

export interface ICreatePostComponent extends IUser {} 

const CreatePostComponent = (props: ICreatePostComponent) =>{
  const [ userInput, setUserInput ] = useState<string>('')
  
  const bodyOptions = {
      body: userInput,
      uid: props.uid
    }
  const body = JSON.stringify(bodyOptions)
  
  const postHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const _request = request({ url: '/create', method: 'POST', body })   
    fetch(_request)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              console.log(res)
              socket.emit('refresh-post')
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
    <div style = {{ display: 'flex', flexDirection: 'column' }}>
      <textarea 
        placeholder = 'Description'
        onChange = { (e) => setUserInput(e.target.value) }
      />
      <section>
        <button 
          className = 'myButton'
          onClick = { postHandler } >Post</button>
      </section>
    </div>
  )
}

export default CreatePostComponent
