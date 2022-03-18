import LoginComponent from "../component/LoginComponent"


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
    <div>Register</div>
  )
}

export default lrPage
