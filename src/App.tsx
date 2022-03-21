import React, { useReducer } from 'react';
import routes from './route'
import reducer from './context/auth/reducer';
import './App.css';

import { AuthContextProvider } from './context/auth/context';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { DUserContext } from './interface/context/context';
import ProtectedRoute from './component/ProtectedComponent';

function App() {
  

  const [ userState,userDispatch ] = useReducer(reducer, DUserContext)
  const UserContextValue = {
    userState,
    userDispatch
  }


  return (
    <AuthContextProvider value = { UserContextValue }>
    <BrowserRouter>
      <Routes>
        {
          routes.map((route,index) => {
            if(route.auth === true)
              {
                return (
                    <Route 
                      key = { index } 
                      element = {
                        <ProtectedRoute>
                         <route.element />
                        </ProtectedRoute>
                      } 
                      path = { route.path } 
                    />
                )
              }
            return (
              <Route key = { index } element = { <route.element /> } path = { route.path }/>
            )
          })
        } 
      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
