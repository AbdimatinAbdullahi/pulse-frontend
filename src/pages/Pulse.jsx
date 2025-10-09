import React, { useState } from 'react'

import SideBar from '../components/SideBar'
import Space from '../components/Space'
import style from '../styles/pulse.module.css'

import { useWorkspaceModal } from '../context/WorkspaceModalContext'
import UserModal from '../modals/UserModal'
import CreateSpace from '../modals/CreateSpace'
import DeleteSpace from '../modals/DeleteSpace'
import JoinMeeting from '../modals/JoinMeeting'

function Pulse() {

  const { action, closeModal } = useWorkspaceModal()
    
  return (
    <div className={style.pulseContainer} >
      <SideBar/>
      <Space/>

    { action === "user" && <UserModal onClose={closeModal} /> }
    { action === "create" && <CreateSpace onClose={closeModal} /> }
    { action === "deleteModal" && <DeleteSpace onClose={closeModal} /> }

    </div>
  )
}

export default Pulse