import React from 'react'
import stye from '../styles/home.module.css'
import { Link } from 'react-router'

function Home() {
  return (
    <div className={stye.homeContainer} >
      <div className={stye.navButtons}>
        <Link to="/login" className={stye.navLinkLogin}> Login </Link>
        <Link to="/register" className={stye.navLinkRegister}> Create Account </Link>
      </div>
    </div>
  )
}

export default Home