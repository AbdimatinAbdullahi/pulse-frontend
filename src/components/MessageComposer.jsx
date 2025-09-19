import React from 'react'
import style from '../styles/components/composer.module.css'
import { Plus, SendHorizonal, SmilePlus } from "lucide-react"


function MessageComposer() {

  return (
    
    <div className={style.composerContainer} >

      <textarea placeholder='Compose the message' />


      <div className={style.icons}>

        <SmilePlus className={style.icon} size={35} />

        <Plus className={style.icon} size={35}  />
        
        <SendHorizonal className={`${style.icon} ${style.sendHorizontal}`}  size={35} />
      
      </div>
    
    </div>
  )
}

export default MessageComposer