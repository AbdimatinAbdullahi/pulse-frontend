import React, { useEffect, useState } from 'react'
import style from '../styles/pulse.module.css'


import MyHome from './MyHome'
import Space from './Space'
import { useSpaceContext } from '../context/SpaceContext'
import CreateSpaceModal from '../modals/CreateSpaceModal'
import JoinspaceModal from '../modals/JoinspaceModal'

function Pulse() {
  const [activeTab, setActiveTab] = useState("Home")
  const [joinSpaceModalOpen, setJoinSpaceModalOpen] = useState(false)
  const [createSpaceModalOpen, setCreateSpaceModalOpen] = useState(false)

  const { dispatch, state, fetchMeetingsAndSpaces } = useSpaceContext()
  const { spaces = [], activespace } = state

    function handleActiveTab(tabName, space = null) {
    // prevent switching only if both tab *and* space are unchanged
    if (tabName === activeTab && (tabName !== "Space" || activespace?.id === space?.id)) {
        return
    }

    if (tabName === "Space" && space) {
        dispatch({ type: "SET_ACTIVE_SPACE", payload: space })
    } else {
        dispatch({ type: "SET_ACTIVE_SPACE", payload: null })
    }
    setActiveTab(tabName)
    }


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) fetchMeetingsAndSpaces(token)
  }, [])

  return (
    <div className={style.pulseContainer}>

      <div className={style.sidebarContainer}>
        <div className={style.headerPulse}>Pulse</div>

        <div onClick={() => handleActiveTab("Home")} className={style.tabs} >
            {!activespace && <span className={style.activeTab}></span>}
            Home
        </div>

        { spaces.length > 0 && spaces.map((space) => (
            <div
                key={space.id}
                onClick={() => {
                // call handler only if we actually change space
                if (activeTab !== "Space" || activespace?.id !== space.id) {
                    handleActiveTab("Space", space)
                }
                }} className={style.tabs}>
                {activespace?.id === space.id && <span className={style.activeTab}></span>}
                {space.name}
            </div>
        ))}

        <div onClick={() => setCreateSpaceModalOpen(true)} className={style.tabs} >Create Workspace</div>
        <div onClick={() => setJoinSpaceModalOpen(true)} className={style.tabs}>Join Workspace</div>
      </div>

      {activeTab === "Home" && <MyHome />}
      {activeTab === "Space" && <Space />}

      {createSpaceModalOpen && ( 
        <CreateSpaceModal onClose={()=> setCreateSpaceModalOpen(false)} />
      )}

      {joinSpaceModalOpen && (
        <JoinspaceModal onClose={()=> setJoinSpaceModalOpen(false)} />
      )}
    </div>
  )
}


export default Pulse