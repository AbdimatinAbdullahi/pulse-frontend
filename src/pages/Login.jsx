import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function Login() {

  const [loginDetails, setLoginDetails] = useState({
    email : "",
    password: ""
  })
  const { login, authError } = useAuth()
  const navigate = useNavigate()


  async function handleLogin(){
    const result = await login(loginDetails)
    if(result.success){
      navigate("/@me")
    }
  }


  return (
    <div className={styles.loginContainer}>
      <div className={styles.innerLoginContainer}>
        <h2>Welcome back to Pulse</h2>

            {authError != "" && (
              <div className={styles.authError}>
                <span>{authError}</span>
              </div>
            )}

            <div className={styles.emailInput}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" placeholder='Enter your email'
                value={loginDetails.email}
                onChange={(e)=>setLoginDetails({...loginDetails, email: e.target.value})}
                />
            </div>

            <div className={styles.passwordInput}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" placeholder='Create Password'
                value={loginDetails.password} 
                onChange={(e)=>setLoginDetails({...loginDetails, password: e.target.value})}
              />
            </div>

            <div className={styles.loginButton} >
                <button onClick={handleLogin} >Login</button>
            </div>

            <div className={styles.navLinks}>
              <p>Dont have an account ? <Link to="/register"> Create Account </Link></p>
            </div>
            
        </div>
      </div>
  )
}

export default Login