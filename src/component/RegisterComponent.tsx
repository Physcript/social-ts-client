import React, { useState,useContext } from 'react'
import request from '../module/request'

interface IRegisterComponent {}
interface IUserInput {
  firstName: string,
  lastName: string,
  address: string,
  email: string,
  password: string,
  confirmPassword: string
}
interface IError {
  Firstname?: string,
  Lastname?: string,
  Address?: string,
  Email?: string,
  Password?: string,
  ConfirmPassword?: string
}

const RegisterComponent: React.FC<IRegisterComponent> = ( props ) => {

  const [ loading,setLoading ] = useState<boolean>(false)
  const [ error,setError ] = useState([])
  const [ success,setSuccess ] = useState<string>('')
  
  const [ userInput,setUserInput ] = useState<IUserInput>({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value,name } = e.target
    setUserInput((val) => ({
      ...val,
      [name]: value
    }))
  }
  
  const registerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    const _request = request({ url: '/register', method: 'POST', body: JSON.stringify(userInput) }) 
    fetch(_request)
      .then((val) => {
        if(val.status === 200)
          {
            val.json().then((res) => {
              setError([])
              setSuccess('Account created') 
              setUserInput((val) => ({
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                password: '',
                confirmPassword: ''
              })) 
            })
          }
        else
          {
            val.json().then((res) => {
              let _error:any = []
              Object.entries(res.error).forEach(([key,value]) => {
                _error.push(value) 
              }) 
              setError(_error)
              setSuccess('')
            })
          }
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      {
          Object.keys(error).length >= 1
        ? 
        (
          <section style = {{ display: 'flex', flexDirection: 'column' }}>
            {
              error.map((err,index) => {
                return (
                  <label>{err}</label>
              )
              })
            }
          </section>
        ) 
        : 
        (
          <section>
            <label>{ success }</label>
          </section>
        )
      }
      <label>Register</label> 
      <div style = {{ width: '450px' }}>
        <section style = {{ display: 'flex' }}>
          <input
            style = {{ flex: '1' }}
            placeholder = 'Firstname'
            name = 'firstName'
            value = { userInput.firstName }
            onChange = { onChange }
          />
          <input
            style = {{ flex: '1' }}
            placeholder = 'Lastname'
            name = 'lastName'
            value = { userInput.lastName }
            onChange = { onChange }
          />
        </section>
        <section style = {{ display: 'flex', flexDirection: 'column' }}>
          <input 
            placeholder = 'Address'
            name = 'address'
            value = { userInput.address }
            onChange = { onChange }
          />
          <input 
            placeholder = 'Email'
            name = 'email'
            value = { userInput.email }
            onChange = { onChange }
          />
          <input
            placeholder = 'Password'
            name = 'password'
            value = { userInput.password }
            onChange = { onChange }
          />
          <input 
            placeholder = 'Confirm password' 
            name = 'confirmPassword'
            value = { userInput.confirmPassword }
            onChange = { onChange }
          />
        </section>
        <section>
          <button onClick = { registerHandler }>Register</button>
        </section> 
      </div>
    </div>
  ) 
}

export default RegisterComponent
