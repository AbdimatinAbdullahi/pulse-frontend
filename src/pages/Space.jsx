import React, { act } from 'react'
import style from '../styles/space.module.css'
import { useState } from 'react'


import { useAuth } from '../context/AuthContext'
import Meetings from '../components/Meetings'
import Messages from '../components/Messages'
import Invoices from '../components/Invoices'
import History from '../components/History'
import General from '../components/General'

function Space({ space }) {

  const { user } = useAuth()

  const [ activeTab, setActiveTab ] = useState("Meetings")

  const handleTabsClick = (tab)=>{
    if(tab == activeTab) return
    setActiveTab(tab)
  } 

  return (
    <div className={style.spaceContainer} >

      <div className={style.profileSection}>
          <h2> {user.fullname}, Welcome to {space.name}</h2>
          <div className={style.profile}> {user.fullname.slice(0,2)} </div>
      </div>    

      <div className={style.buttonContainer}>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("Meetings")} > {activeTab == "Meetings" && <span className={style.activeTab} ></span> } Meetings </button>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("Chats")}  > {activeTab == "Chats" && <span className={style.activeTab} ></span> } Chats and Messages </button>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("History")}> {activeTab == "History" && <span className={style.activeTab} ></span> } History </button>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("General")}> {activeTab == "General" && <span className={style.activeTab} ></span> } General </button>
          <button className={style.tabsSelectors} onClick={()=>handleTabsClick("Invoices")}> {activeTab == "Invoices" && <span className={style.activeTab} ></span> } Invoices </button>
          {/* <button className={style.tabsSelectors}> Notifications </button> */}
      </div>  
    
    <div className={style.activeT}>
      { activeTab === "Meetings" && <Meetings/> }
      { activeTab === "Chats" &&    <Messages/> }
      { activeTab === "History" &&  <History/>}
      { activeTab === "General" &&  <General/>}
      { activeTab === "Invoices" &&  <Invoices/>}
    </div>


    </div>
  )
}

export default Space