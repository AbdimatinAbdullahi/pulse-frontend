import React, { useState } from 'react'
import style from '../styles/components/history.module.css'


function History() {

  const [ historyMeetings, sethistoryMeetings] = useState([])

  return (
    <div className={style.historyContainer}>
        <h3> Past meetings </h3>
        {
          historyMeetings.length > 0 ? historyMeetings.map((meeting)=>(
            <div className={style.meeting}> 
              
            </div>
          )) : (
            <div className={style.noMeeting}>
                No meeting happened
            </div>
          )
        }
    </div>
  )
}

export default History