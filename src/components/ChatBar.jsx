import React, { useState } from 'react'
import style from '../styles/components/chatbar.module.css'
import { X } from 'lucide-react'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'

function ChatBar() {

  const [ InstanstMeetingModalOpen, setInstanstMeetingModalOpen ] = useState(false)
  const {  openModal } = useWorkspaceModal()

  return (
    <div className={style.chatbarContainer} >
        <h2> spaceone.com </h2>

        <div className={style.meetingButtons}>

          <button  onClick={()=>setInstanstMeetingModalOpen(!InstanstMeetingModalOpen)}> Instant Meeting </button>
              
          { InstanstMeetingModalOpen && <InstantMeetingContainer  onClose={()=>setInstanstMeetingModalOpen(false)} /> }

            <button onClick={()=>openModal("meeting")} > Schedule Meeting </button>
        
        </div>


    </div>
  )
}

// Should be position below the button

export function InstantMeetingContainer( { onClose } ){
  
  return (
    <div className={style.instantMeetingContainer} >
        

        <div className={style.title} > 

          <span> Give your meeting a title </span> 

          <X onClick={onClose} className={style.xloseIcon} size={30} />

        </div>  

        <input type="text" placeholder='Enter your meeting title' className={style.inputTittle} /> 

        <select className={style.joiners}>
          <option value="" disabled selected hidden >Who can Join?</option>  
          <option value="everyone">Everyone</option>  
          <option value="members">Members only</option>  
        </select> 

        <div className={style.createMeeting} > Create, Join and copy the link </div>

    </div>
  )

}

export default ChatBar