import React from 'react'
import { AuthProvider } from '../src/context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'


function App() {
  return (
    <BrowserRouter> 
      <AuthProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Signup/>}/>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App