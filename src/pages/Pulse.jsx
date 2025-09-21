import React from 'react'

import SideBar from '../components/SideBar'
import Space from '../components/Space'
import MeetingModal from '../modals/MeetingModal'
import style from '../styles/pulse.module.css'

import { useWorkspaceModal } from '../context/WorkspaceModalContext'
import UserModal from '../modals/UserModal'

function Pulse() {
  const { action, closeModal } = useWorkspaceModal()
  return (
    <div className={style.pulseContainer} >
      <SideBar/>
      <Space/>

    { action === "user" && <UserModal onClose={closeModal} /> }

    </div>
  )
}

export default Pulse