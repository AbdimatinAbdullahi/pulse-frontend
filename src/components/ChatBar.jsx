import React from 'react'
import style from '../styles/components/chatbar.module.css'
import { Settings } from 'lucide-react'

function ChatBar() {
  return (
    <div className={style.chatbarContainer} >
        <h2> spaceone.com </h2>

        <div className={style.meetingButtons}>
            <button>Instant Meeting</button>
            <button>Schedule Meeting</button>
        </div>
    </div>
  )
}

export default ChatBar