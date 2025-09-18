import React from 'react'
import { AuthProvider } from '../src/context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import Welcome from './pages/Welcome'
import Pulse from './pages/Pulse'


function App() {
  return (
    <BrowserRouter> 
      <AuthProvider>
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/@me' element={<Pulse/>}/>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App