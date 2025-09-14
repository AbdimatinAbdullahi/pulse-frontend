import React, { useEffect } from 'react'
import style from '../styles/components/meetings.module.css'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'

function Meetings({ todaysMeeting, tomorrowsMeeting, status}) {

  const { openModal } = useWorkspaceModal()

  const handleOpenModal = ()=>{
    openModal("MEETING")
  }

  return (
    <div className={style.meetingContainer}>

      <div className={style.todaysMeeting}>
        <h2> Todays Meeting </h2>
        
        <div className={style.meetings}>
            {
              todaysMeeting.length > 0 ? (
                todaysMeeting.map((meeting)=>(
                  <div className={style.meeting}>
                    <h2>Meeting 1</h2>
                  </div>
                ))
              ) : (
                <div className={style.meetingsTw} >
                  <div className={style.noMeeting}> No meeting yet</div>
                  <button className={`${style.createMeeting}`} onClick={handleOpenModal} > Create Todays Meeting </button>
                </div>
              )
            }
        </div>

      </div>

      <div className={style.tomorrowsMeeting}>
        <h2> Tomorrows Meeting </h2>
          <div  className={style.meetings}>
            {
              tomorrowsMeeting.length > 0 ? (
                tomorrowsMeeting.map((meeting)=>(
                  <div className={style.meeting}>
                    <h2>Meeting 1</h2>
                  </div>
                ))
              ) : (
                <div className={style.meetingsTw} >
                  <div className={style.noMeeting}> No meeting yet</div>
                  <button className={`${style.createMeeting}`}  onClick={handleOpenModal}  > Create Todays Meeting </button>
                </div>
              )
            }
          </div>
      </div>
    </div>
  )
}

export default Meetings