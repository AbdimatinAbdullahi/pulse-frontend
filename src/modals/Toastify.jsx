import React from 'react'
import style from '../styles/modals/toastify.module.css'
import {X } from "lucide-react"

function Toastify({ message, type, onClose}) {
  return (
    <div className={`${style.toastifyContainer} ${type == "error" ? style.error : style.success} `} >
        <h4> { message } </h4> 
        <X onClick={onClose}  />  
    </div>
  )
}

export default Toastify