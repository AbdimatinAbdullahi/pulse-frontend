import React, { useState } from 'react'
import style from '../styles/space.module.css'
import { MessageCircleMore, Video } from 'lucide-react'

import Chat from './Chat'
import Meet from './Meet'

function Space() {

  const [activePage, setActivePage] = useState("chat")

  const handleTab =(activepage)=>{
    if(activepage === "" || activepage) return
    setActivePage(activepage)
  }

  return (
    <div className={style.spaceContainer}>
        <div className={style.navbar}>
            <div> <MessageCircleMore size={40} onClick={()=> handleTab("chat")} /> </div>
            <div> <Video size={40}onClick={()=> handleTab("chat")} /> </div>
        </div>

      { activePage === "chat" && <Chat/> }
      { activePage === "meet" && <Meet/> }

    <h1>Testing</h1>

    </div>
  )
}

export default Space