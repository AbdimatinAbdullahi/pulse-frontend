import React, { useState } from 'react'
import styles from '../styles/signup.module.css'
import { Eye, EyeOff, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signup() {

  const [userDetails, setUserDetails] = useState({
    fullname :"",
    email : "",
    password: "",
    confirmPassword: ""
  })
  const [passwordType, setPasswordType] = useState("password")
  const [confirmPasswordType, setConfirmPasswordType] = useState("password")



  const { authError, signup } = useAuth()
  const navigate = useNavigate()

  async function handleCreateAccount(){
    const result = await signup(userDetails)
    if(result.success){
      navigate("/login")
    }
  }

  return (
    <div className={styles.signupContainer}>

      <div className={styles.innerSignupContainer}>
        <h2>Welcome back to Pulse</h2>

            {authError != "" && (
              <div className={styles.authError}>
                <span> {authError} </span>
              </div>
            )}  

            <div className={styles.fullnameInput}>
              <label htmlFor="fullname">Fullname</label>
              <input 
                type="text" placeholder='Enter your fullname'
                value={userDetails.fullname}
                onChange={(e)=>setUserDetails({...userDetails, fullname: e.target.value})}
                />
            </div>

            <div className={styles.emailInput}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" placeholder='Enter your email'
                value={userDetails.email}
                onChange={(e)=>setUserDetails({...userDetails, email: e.target.value})}
                required
              />
            </div>

            <div className={styles.passwordInput}>
              <label htmlFor="password">Password</label>
                
                <div className={styles.passContainer} >
                  <input 
                    type={passwordType} placeholder='Create Password'
                    value={userDetails.password}
                    onChange={(e)=>setUserDetails({...userDetails, password: e.target.value})}
                    />
                  {passwordType === "password" ? <Eye size={30}  onClick={()=>setPasswordType("text")} /> : <EyeOff size={30} onClick={()=>setPasswordType("password")} /> }
                
                </div>
            </div>

            <div className={styles.confirmPasswordInput}>
              <label htmlFor="confirmPassword">Confirm Password</label>
                
                <div className={styles.conPassContainer}  >
                  <input 
                    type={confirmPasswordType} placeholder='Confirm Password'
                    value={userDetails.confirmPassword}
                    onChange={(e)=>setUserDetails({...userDetails, confirmPassword: e.target.value})}
                  />
                  {confirmPasswordType === "password" ? <Eye onClick={()=>setConfirmPasswordType("text")} size={30} /> : <EyeOff onClick={()=>setConfirmPasswordType("password")} size={30} /> }
                </div>
              
              </div>
            
            <div className={styles.signupButton}>
              <button onClick={handleCreateAccount} > Create Account </button>
            </div>

            <div className={styles.navButton}>
              <p> Already have an account <Link to="/login"> Login </Link> </p>
            </div>
  
        </div>
      </div>
  )
}

export default Signup