import React, { useEffect, useState } from 'react'
import style from '../styles/components/meet.module.css'
import { CalendarCheck2, Link2, MousePointer2 } from 'lucide-react'
import Meeting from './Meeting'
import  { InstantMeetingContainer } from './ChatBar'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'
import { useSpace } from '../context/SpaceContext'


function Meet() {

  const { openModal } = useWorkspaceModal()
  const [ InstantMeetingModalOpen, setInstantMeetingModalOpen ] = useState(false)
  const { state } = useSpace()
  const { activespace  } = state
  const { TodaysMeetings, TomorrowsMeeting } = activespace

  useEffect(()=>{
    console.log("Todays meeting: ", TodaysMeetings)
    console.log("Tomorrows meeting: ", TomorrowsMeeting)
  }, [])

  return (
    <div className={style.meetContainer}>
      
      <div className={style.meetingItems}>
          <h3> Meet </h3>

          <div className={style.actionButton}>

            <div className={style.meetingButton} onClick={()=>setInstantMeetingModalOpen(!InstantMeetingModalOpen)} >
              <Link2 size={30} strokeWidth={2.5}/>
               <span>Create Instant Meeting Link</span>
            </div>


            <div className={style.meetingButton} onClick={()=>openModal("meeting")} >
              <CalendarCheck2 size={30} strokeWidth={2.5}  />
              <span>Schedule a meeting</span>
            </div>
            
            <div className={style.meetingButton} >
              <MousePointer2 size={30} strokeWidth={2.5} />
              <span>Join a meeting via Link</span>
            </div>

          { InstantMeetingModalOpen && <InstantMeetingContainer onClose={()=>setInstantMeetingModalOpen(false)} /> }

          </div>

      </div>

      <div className={style.todaysMeeting} >
          <h3> Todays Meetings </h3>

          <div className={style.meetings} >
            { TodaysMeetings.length > 0 ? TodaysMeetings.map((meeting)=>(
              <Meeting meeting={meeting} />
            )) : (
              <div> No meeting for today </div>
            ) }
          </div>

      </div>


      <div className={style.scheduledMeeting} > 
        <h3> Scheduled Meetings </h3>

          <div className={style.meetings} >
            { TomorrowsMeeting.length > 0 ? TomorrowsMeeting.map((meeting)=>(
              <Meeting meeting={meeting} />
            )) : (
              <div> No meeting available tomorrow </div>
            ) }
          </div>

      </div>

    </div>
  )
}

export default Meet