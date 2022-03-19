
import React, { useState,useContext } from 'react'
import AuthContext from '../context/auth/context'
import  request  from '../module/request'

export interface ILogin {
  email: string,
  password: string
}

export interface ILogin {}

const LoginComponent = () => {

  const UserContext = useContext(AuthContext)

  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error,setError ] = useState<any>('')
  const [ loginInput, setLoginInput ] = useState<ILogin>({
    email: '',
    password: ''
  })

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>)=> {
    e.preventDefault()
    setLoading(true)

    const body = JSON.stringify(loginInput)
  
    const _request = request({ url: '/login', method: 'POST', body })
    
    fetch(_request)
      .then((val: any) => {
        if(val.status === 200)
          {
            val.json().then((res: any) => {
              const { user, token } = res.message
              UserContext.userDispatch({ TYPE: 'LOGIN', PAYLOAD: { USER: user, TOKEN: token } })
            })
          }
        else
          {
            val.json().then((res: any) => {
              console.log(res)
            })
          }
      })
      .catch((error: any) => {
        console.log(`Network error, ${error}`)
        setError(error)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value } = e.target
    setLoginInput((val) => ({
      ...val,
      [name]: value
    }))
  }

  return (
    <div>
      <div>
        <label>Login</label>
        <section>
          <input
            type = 'text'
            name = 'email'
            value = { loginInput.email}
            onChange = { onChange }
          />
          <input 
            type = 'password'
            name = 'password'
            value = { loginInput.password }
            onChange = { onChange }
          />
        </section>
        <section>
          <button onClick = { loginHandler }>Login</button>
        </section>
      </div>
    </div>
  )
}

export default LoginComponent
