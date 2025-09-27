import React from 'react'
import style from '../styles/sidebar.module.css'
import { Settings, UserPen } from 'lucide-react'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'
import { useSpace } from '../context/SpaceContext'

function SideBar() {

  const { openModal } = useWorkspaceModal()
  const { state, dispatch } = useSpace()
  const { spaces, activespace } = state

  const handleClickSpace = (space)=>{
    if(activespace.id = space.id) return
    dispatch({type: "SELECT_ACTIVE_SPACE", payload: space})
  }

  return (
    <div className={style.sidebarContainer} >
      
      <div className={style.header}>
          pulse.com
      </div>

      { spaces.length > 0 ? spaces.map((space)=>(
        
        <div className={style.spaces} key={space.Space.id} onClick={()=>handleClickSpace(space)} > 
          
          { activespace.Space.id == space.Space.id && <span className={style.activeSpace} ></span>}

          { space.Space.name} 

        </div>
      
      )) : (
        
        <div className={style.noS}> No space </div> 
      
      )}


      <div className={style.spaces} onClick={()=>openModal("create")} >
     
        Create space
      
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