import React, { useEffect } from 'react'
import style from '../styles/components/meetings.module.css'

function Meetings({ todaysMeeting, tomorrowsMeeting }) {

  useEffect(()=>{
      console.log("Todays meeting: ", todaysMeeting)
      console.log("Tomoroows meeting: ", tomorrowsMeeting)
  }, [])

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
                  <button className={style.createMeeting}> Create Todays Meeting </button>
                </div>
              )
            }
        </div>

      </div>

      <div className={style.tomorrowsMeeting}>
        <h2> Tomorrows Meeting </h2>
          <div  className={style.meetings}>
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
                  <button className={style.createMeeting}> Create Todays Meeting </button>
                </div>
              )
            }
          </div>
      </div>
    </div>
  )
}

export default Meetings