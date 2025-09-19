import React from 'react'
import style from '../styles/components/chat.module.css'

import MessageComposer from './MessageComposer'
import MessageUI from './MessageUI'
import ChatBar from './ChatBar'

function Chat() {
  return (
    <div className={style.chatContainer} >
      <ChatBar/>
      <MessageUI/>
      <MessageComposer/>
    </div>
  )
}

export default Chat