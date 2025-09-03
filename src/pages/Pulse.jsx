import React, { useState } from 'react'
import style from '../styles/pulse.module.css'


import MyHome from './MyHome'
import Space from './Space'

function Pulse() {

    const [ activeTab, setActiveTab ] = useState("Home")
    const [ CreateSpaceModal, setCreateSpaceModal ] = useState(false)
    const [ JoinSpaceModal, setJoinSpaceModal ] = useState(false)
    
    function handleActiveTab(tabName){
        if(tabName == activeTab){
            return
        }
        setActiveTab(tabName)
    }

  return (
    <div className={style.pulseContainer}>
        <div className={style.sidebarContainer}>
            
            {/* Header */}
            <div className={style.headerPulse}> Pulse: We meeting is simplified </div>

            <div onClick={()=>handleActiveTab("Home")} > Home </div>
            <div> Create Workspace </div>
            <div> Join Workspace</div>

        </div>
        {activeTab === "Home" && <MyHome/>}
        {activeTab === "Space" && <Space/>}

    </div>
  )
}

export default Pulse