

import  IUser, { DUser }  from '../user'
import { IReducer } from './reducer'

export interface IUserContext {
  USER: IUser,
  TOKEN: string,
  STATUS: boolean
}

export interface IAuthContext {
  userState: IUserContext,
  userDispatch: React.Dispatch<IReducer>
}


export const DUserContext: IUserContext = {
  USER: DUser,
  TOKEN: '',
  STATUS: false
}

