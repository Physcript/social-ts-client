import LoginComponent from "../component/LoginComponent"
import RegisterComponent from "../component/RegisterComponent"


export interface ILRPage {} 

const lrPage = () => {

  const isLogin = window.location.pathname.includes('login')
  if(isLogin)
    {
      return (
        <LoginComponent />
      )
    }
  return (
    <RegisterComponent />
  )
  
}

export default lrPage
