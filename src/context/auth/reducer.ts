import { DUserContext, IAuthContext, IUserContext } from "../../interface/context/context"
import { IReducer } from "../../interface/context/reducer"
import IUser, { DUser } from "../../interface/user"

const reducer = (state: IUserContext, action: IReducer): IUserContext => {
  const USER: IUser = action.PAYLOAD.USER ?? DUser
  const TOKEN: string = action.PAYLOAD.TOKEN ?? ''

  switch(action.TYPE) {
    case 'LOGIN':
      return {
        USER,
        TOKEN,
        STATUS: true 
      }
    case 'LOGOUT': 
      return DUserContext
    default:
      return state
  }
}

export default reducer
