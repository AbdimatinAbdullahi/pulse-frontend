import React, { useState } from 'react'
import style from '../styles/space.module.css'
import { MessageCircleMore, Video, Settings } from 'lucide-react'

import Chat from './Chat'
import Meet from './Meet'

function Space() {

  const [activePage, setActivePage] = useState("chat")

  const handleTab =(activepage)=>{
    if(activepage === "" && activepage === activePage) return
    setActivePage(activepage)
  }

  return (
    <div className={style.spaceContainer}>
        <div className={style.navbar}>
            <MessageCircleMore size={45} className={style.icon}  onClick={()=> handleTab("chat")} />
            <Video size={45}  className={style.icon}   onClick={()=> handleTab("meet")} />
            <Settings className={style.icon} size={45} />
        </div>

      { activePage === "chat" && <Chat/> }
      { activePage === "meet" && <Meet/> }
    </div>
  )
}

export default Space