import React, { useEffect } from 'react'
import style from '../styles/components/meeting.module.css'
import { Activity } from 'lucide-react'
import { BackendToNowTime } from '../utils/times'

import { useWorkspaceModal }  from '../context/WorkspaceModalContext'
import JoinMeeting from '../modals/JoinMeeting'

function Meeting({ meeting }) {

  useEffect(()=>{
    console.log( "Meeting details: ", meeting)

  }, [ meeting ])

  const time = BackendToNowTime(meeting?.start)

  const { handleOpenJoinMeeting, JoinMeetingModalOpen } = useWorkspaceModal()  

  return (
    <div className={style.meeting} >
        <div className={style.icon}>
          <Activity />
        </div>

        <h3> {meeting?.title} </h3>

        <div className={style.datesandwho}>

             <div className={style.date}> 

            {time}
            
            </div>
                
        </div>
                
        <div className={style.join} > 

          <div className={style.join2} onClick={handleOpenJoinMeeting} > Join </div>

          { meeting?.private === false && ( <div className={style.share} > Copy the link </div>) }

        </div>
  
    { JoinMeetingModalOpen && <JoinMeeting meeting={meeting}/> }

    </div>
  )
}

export default Meeting