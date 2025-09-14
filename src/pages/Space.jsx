import React, { act, useEffect } from 'react'
import style from '../styles/space.module.css'
import { useState } from 'react'


import { useAuth } from '../context/AuthContext'
import Meetings from '../components/Meetings'
import Messages from '../components/Messages'
import Invoices from '../components/Invoices'
import History from '../components/History'
import General from '../components/General'
import { useSpaceContext } from '../context/SpaceContext'
import { X } from 'lucide-react'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'

function Space({ space }) {

  const { user } = useAuth()
  const { state } = useSpaceContext()
    const { closeModal } = useWorkspaceModal()
  const {  activespace } = state
  const { TodaysMeetings, TomorrowsMeeting  } = activespace;

  const [ activeTab, setActiveTab ] = useState("Meetings")

  const handleTabsClick = (tab)=>{
    if(tab == activeTab) return
    setActiveTab(tab)
  } 


  return (
    <div className={style.spaceContainer}>

      <div className={style.profileSection}>
          <h2> {user.fullname}, Welcome to {space.Space.name}</h2>
          <div className={style.profile}> {user.fullname.slice(0,2)} </div>
      </div>    

      <div className={style.buttonContainer}>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("Meetings")} > {activeTab == "Meetings" && <span className={style.activeTab} ></span> } Meetings </button>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("Chats")}  > {activeTab == "Chats" && <span className={style.activeTab} ></span> } Chats and Messages </button>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("AllMeetings")}> {activeTab == "History" && <span className={style.activeTab} ></span> } All Meetings </button>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("General")}> {activeTab == "General" && <span className={style.activeTab} ></span> } General </button>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("Invoices")}> {activeTab == "Invoices" && <span className={style.activeTab} ></span> } Invoices </button>
      </div>  
    
    <div className={style.activeT}>
      { activeTab === "Meetings" &&    <Meetings tomorrowsMeeting={TomorrowsMeeting} todaysMeeting={TodaysMeetings} status={activespace.Space.status} /> }
      { activeTab === "Chats"    &&    <Messages/>}
      { activeTab === "AllMeetings" && <History/>}
      { activeTab === "General"  &&    <General/>}
      { activeTab === "Invoices" &&   <Invoices/>}
    </div>


    </div>
  )
}

export default Space