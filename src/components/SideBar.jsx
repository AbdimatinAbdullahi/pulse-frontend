import React from 'react'
import style from '../styles/sidebar.module.css'

function SideBar() {

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
    
    </div>
  )
}

export default SideBar