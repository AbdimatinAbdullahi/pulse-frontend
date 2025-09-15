import React, { useEffect } from 'react'
import style from '../styles/components/meetings.module.css'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'

function isSameDay(date1, date2) {
  console.log("Meeting date", date1)
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}



function Meetings({ todaysMeeting, tomorrowsMeeting, status}) {

  const { openModal } = useWorkspaceModal()

  const handleOpenModal = ()=>{
    openModal("MEETING")
  }

  console.log(todaysMeeting)

  return (
    <div className={style.meetingContainer}>

      <div className={style.todaysMeeting}>
        <h2> Todays Meeting </h2>
        
        <div className={style.meetings}>
            {
              todaysMeeting.length > 0 ? (
                todaysMeeting.map((meeting)=>(
                  <div className={style.meeting}>
                    <h2>{meeting.title}</h2>
                    <span>
                      {meeting.description}
                    </span>
                    <div className={style.meetingD}>
                      <div> {new Date(meeting.date).toLocaleString("en-US", { day:"2-digit", month:"long", year:"2-digit"})} </div>
                     <button 
                        disabled={!isSameDay(new Date(meeting.date), new Date())}
                        style={{ cursor: !isSameDay(new Date(meeting.date), new Date()) ? "not-allowed" : "pointer" }}
                      >
                        Start Meeting
                      </button>

                    </div>
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
                    <h2>{meeting.title}</h2>
                    <span>
                      {meeting.description}
                    </span>
                    <div className={style.meetingD}>
                      <div> {new Date(meeting.date).toLocaleString("en-US", { day:"2-digit", month:"long", year:"2-digit"})} </div>
                     <button 
                        disabled={!isSameDay(new Date(meeting.date), new Date())}
                        style={{ cursor: !isSameDay(new Date(meeting.date), new Date()) ? "not-allowed" : "pointer" }}
                      >
                        Start Meeting
                      </button>

                    </div>
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