



import React, { createContext } from 'react'

import { IAuthContext,DUserContext } from '../../interface/context/context'

const AuthContext = createContext<IAuthContext>({
  userState: DUserContext, 
  userDispatch: () => {}
})

export default AuthContext
export const AuthContextProvider = AuthContext.Provider
export const AuthContextConsumer = AuthContext.Consumer
