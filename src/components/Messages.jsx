import React, { useState } from 'react'
import style from '../styles/components/messages.module.css'
import { Paperclip, SendHorizonal, SmileIcon } from 'lucide-react'

function Messages() {

  const [messages, setMessages] = useState([])

  return (
    <div className={style.messageContainer}>
        <div className={style.messagesHolderContainer}>
            {
              messages.length == 0 && (
                <div className={style.emptyMessage}> No body said something yet  </div>
              )
            } 
        </div>

        <div className={style.composerContainer}>
          <textarea  />
          <div className={style.actionIcons} >
            <SmileIcon className={style.iconComposer}/>
            <Paperclip className={style.iconComposer}/>
            <SendHorizonal className={style.iconComposer}/>
          </div>
        </div>

    </div>
  )
}

export default Messages