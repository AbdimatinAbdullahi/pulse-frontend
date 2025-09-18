import React, { useState } from 'react'
import style from '../styles/space.module.css'
import { MessageCircleMore, Video } from 'lucide-react'

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
            <MessageCircleMore size={40} className={style.navIcons}  onClick={()=> handleTab("chat")} />
            <Video size={40}  className={style.navIcons}   onClick={()=> handleTab("meet")} />
        </div>

      { activePage === "chat" && <Chat/> }
      { activePage === "meet" && <Meet/> }
    </div>
  )
}

export default Space