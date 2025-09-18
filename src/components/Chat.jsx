import React from 'react'
import style from '../styles/components/chat.module.css'

import ChatBar from './ChatBar'

function Chat() {
  return (
    <div className={style.chatContainer} >
      <ChatBar/>
    </div>
  )
}

export default Chat