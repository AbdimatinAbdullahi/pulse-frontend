import React, { useEffect, useState } from 'react'
import style from '../styles/pulse.module.css' 


import { useAuth } from '../context/AuthContext'
import { useSpaceContext } from '../context/SpaceContext'

import CreateSpaceModal from '../modals/CreateSpaceModal'
import Space from './Space'

function Pulse() {

  const { user }  = useAuth()
  const { state, dispatch, FetchInitialSpacesAndItsData} = useSpaceContext()

  const { spaces, activespace } = state;

  const [ loading, setLoading ] = useState(false)
  const [ createWorkspaceModal, setcreateWorkspaceModal ] = useState(false)

  useEffect(()=>{
    if(!user.id) return
    async function fetchWorkspaces(){
      setLoading(true)
      console.log("User id: ", user.id)
      await FetchInitialSpacesAndItsData(user.id)
      setLoading(false)
    }
    fetchWorkspaces()
  }, [user])

  useEffect(()=>{
    console.log("Active space: ", activespace)
  }, [activespace])


  const handleSpaceClick = (space)=>{
    console.log("Clicked space", space)
    if(activespace.id == space.Space.id) return
    dispatch({type: "SELECT_ACTIVE_SPACE", payload: space})
  }


  return (
    <div className={style.pulseContainer} >
        <div className={style.sidebarContainer}>
            <div className={style.headerPulse}>
                Pulse: Where meeting happens
            </div>

          { loading ? (
              <div>Loading ...</div>
              ) : spaces.length > 0 ? (
                spaces.map((space) => (
                    <div key={space.Space.id} className={style.tabs} onClick={()=>handleSpaceClick(space)} > 
                      { activespace && activespace.id == space.Space.id && <span className={style.activeTab}></span>}
                      {space.Space?.name}
                    </div>
                ))
                
              ) : (
                <>
                  <div className={style.tabs}>Join Space</div>
                  <div className={style.tabs} onClick={() => setcreateWorkspaceModal(true)}> Create space</div>
                </>
              )}

            { !loading && (
              <>
                <div className={style.tabs} onClick={() => setcreateWorkspaceModal(true)}> Create space</div>
                <div className={style.tabs}> Join space </div>
              </>
            )}

        </div>

        <div className={style.spaceContainer}>
          {
             loading ? (
              <div> Loading ... </div> 
             ) : (
                activespace ? (
                  <Space space={activespace} />
                ) : (
                  <div> No active space </div>
                )
             )
          }
        </div>

        { createWorkspaceModal && <CreateSpaceModal onClose={()=>setcreateWorkspaceModal(false)} />}

    </div>
  )
}

export default Pulse