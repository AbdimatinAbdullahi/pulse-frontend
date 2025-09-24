import React from 'react'
import { AuthProvider } from '../src/context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import Welcome from './pages/Welcome'
import Pulse from './pages/Pulse'
import { WorkspaceModalProvider } from './context/WorkspaceModalContext'
import { SpaceContextProvider } from './context/SpaceContext'


function App() {
  return (
    <BrowserRouter> 
      <AuthProvider>
        <WorkspaceModalProvider>
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/@me' element={
              <SpaceContextProvider>
                <Pulse/>
              </SpaceContextProvider>
            }/>
          </Routes>
        </WorkspaceModalProvider>
        
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App