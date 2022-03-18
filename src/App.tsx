import React from 'react';
import routes from './route'
import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route,index) => {
            return (
              <Route key = { index } element = { <route.element /> } path = { route.path }/>
            )
          })
        } 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
