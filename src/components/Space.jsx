import React, { useState } from 'react'
import style from '../styles/space.module.css'
import {  MessageCircleMore, Video, Settings } from 'lucide-react'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'

import Chat from './Chat'
import Meet from './Meet'
import MeetingModal from '../modals/MeetingModal'
import SpaceModal from '../modals/SpaceModal'

function Space() {

  const [activePage, setActivePage] = useState("chat")
    const { action, closeModal, openModal } = useWorkspaceModal()

  const handleTab =(activepage)=>{
    if(activepage === "" && activepage === activePage) return
    setActivePage(activepage)
  }

  return (
    <div className={style.spaceContainer}>
        <div className={style.navbar}>
            <MessageCircleMore size={45} className={style.icon}  onClick={()=> handleTab("chat")} />
            <Video size={45}  className={style.icon}   onClick={()=> handleTab("meet")} />
            <Settings className={style.icon} size={45} onClick={()=> openModal("space")} />
        </div>

      { activePage === "chat" && <Chat/> }
      { activePage === "meet" && <Meet/> }

      { action === "meeting" && <MeetingModal onClose={closeModal} /> }
      { action === "space" && <SpaceModal  onClose={closeModal} /> }

    </div>
  )
}

export default Space