import React from 'react'
import style from '../styles/sidebar.module.css'
import { Settings, UserPen } from 'lucide-react'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'

function SideBar() {

  const { openModal } = useWorkspaceModal()

  return (
    <div className={style.sidebarContainer} >
      
      <div className={style.header}>
          pulse.com
      </div>

      <div className={style.spaces}>
        <span className={style.activeSpace}>  </span>
        Space One
      </div>

      <div className={style.spaces}>
        Space Two
      </div>


      <div className={style.profileDiv}>
        <div className={style.name} >
          <h4>Abdimatin Abdullahi</h4>
          <span> Available </span>
        </div>

        <div className={style.profileIcon} onClick={()=> openModal("user")} >
          <UserPen size={30} />
        </div>

      </div>
    
    </div>
  )
}

export default SideBar