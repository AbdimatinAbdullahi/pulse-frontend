import React from 'react'
import style from '../styles/components/chatbar.module.css'
import { Settings } from 'lucide-react'

function ChatBar() {
  return (
    <div className={style.chatbarContainer} >
        <h2>Space One</h2>

        <div className={style.meetingButtons}>
            <button>Instant Meeting</button>
            <button>Schedule Meeting</button>
            <Settings className={style.icon} size={50} />
        </div>
    </div>
  )
}

export default ChatBar