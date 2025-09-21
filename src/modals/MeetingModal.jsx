import React from 'react'
import style from '../styles/modals/meeting.module.css'
import { CalendarClock, Clock, Edit2, Presentation, Repeat } from 'lucide-react'

function MeetingModal({ onClose }) {


  return (
    <div className={style.meetingOverlay} >
        <div className={style.meetingModalContainer}>
            
            <div className={style.meetnavBar}>
                
                <div className={style.section1}>
                    
                    <div className={style.CalendarClock} >

                        <CalendarClock className={style.calenderIcon} size={30}/>
                    
                    </div>

                    <div> New Meeting </div>

                    <span> Details </span>

                </div>
                
                <div className={style.section2}>
                    <div className={style.save} > Save </div>
                    <div onClick={onClose} className={style.close} > Close </div>
                </div>
            
            </div>

            <div className={style.inputContainer}>
                  <Edit2/>
                  <input type="text" />
            </div>

            
            <div className={style.dates}>
                <div className="clockIcon">
                        <Clock/>
                </div>

                <div className="datesContainer">

                    <div className="startTime">
                        <input type="date"  />
                        <input type="date.time" />
                    </div>

                    <div className="endTime">
                        <input type="date"  />
                        <input type="date.time" />
                    </div>

                </div>

                <div className={style.repeatContainer}>
                    <div>
                        <Repeat/>
                    </div>
                    <select>
                        <option value="" disabled selected> Repeat Cycle</option>
                        <option value="weekly" > Weekly </option>
                        <option value="Daily" > Daily </option>
                    </select>
                </div>

                <div className="presentContainer">
                    <Presentation/>
                    <select>
                        <option value="" disabled selected hidden > Who can present? </option>
                        <option value="everyone" > Everyone </option>
                        <option value="me only"> Me only </option>
                    </select>
                </div>

            </div>
        
        </div>
    </div>
  )
}

export default MeetingModal