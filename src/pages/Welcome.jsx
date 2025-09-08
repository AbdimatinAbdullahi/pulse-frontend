import React from 'react'
import stye from '../styles/welcome.module.css'
import { Link } from 'react-router'

function Welcome() {
  return (
    <div className={stye.WelcomeContainer} >
      <div className={stye.navButtons}>
        <Link to="/login" className={stye.navLinkLogin}> Login </Link>
        <Link to="/register" className={stye.navLinkRegister}> Create Account </Link>
      </div>
    </div>
  )
}

export default Welcome