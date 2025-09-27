import React, { useState } from "react";
import style from "../styles/modals/meeting.module.css";
import { times, tomorrowsDate } from '../utils/times'
import Spinner from '../components/Spinner'
import Toastify from '../modals/Toastify'
import {
  CalendarClock,
  Clock,
  Edit2,
  Presentation,
} from "lucide-react";

function MeetingModal({ onClose }) {


  // getting tomorows date from utils function

  const startTime = tomorrowsDate("Africa/Nairobi")
  // getting tomorows date for space timezone
  const [ meetingName, setMeetingName ] = useState("")
  const [ startDate, setStartDate ] = useState(startTime)
  const [ selectedHour, setSelectedHour ] = useState(times[0].value)
  const [ whoCanPresent, setWhoCanPresent ] = useState("me")
  
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState("")
  const [ duration, setDuration] = useState("")


  const {} = uses


  const handleCreateMeeting = async ()=>{
      setError("");
      if (!meetingName.trim()) {
        setError("Provide meeting name");
        return;
      }
      if (!whoCanPresent) {
        setError("Select who can present");
        return;
      }
      if (!duration) {
        setError("Enter meeting duration");
        return;
      }

      const dur = Number(duration);
      if (isNaN(dur) || dur <= 0) {
        setError("Duration must be a positive number");
        return;
      }
      if (dur >= 24) {
        setError("You can't meet for more than 24 hours");
        return;
      }

      setLoading(true)
      const durationHours = parseFloat(dur)

      const meetingStartTime = new Date(`${startDate}T${selectedHour}`)

      const localDate = new Date(meetingStartTime.toISOString())
      const endUTC = new Date(localDate.getTime() + durationHours * 60 * 60 * 1000)

      console.log("Meeting start Time", meetingStartTime)
      console.log("Local date start: ", localDate)
      console.log("Local date end: ", endUTC)

      const meetingEndUT = endUTC.toISOString()
      const meetingStart = localDate.toISOString()

      console.log("Equivalent time of the meeting start time in UTC: ", meetingStart)
      console.log("Equivalent time of the meeting end time in UTC: ", meetingEndUT)

      setTimeout(() => {
        setLoading(false)
      }, 500);

  }


  return (
    <div className={style.meetingOverlay}>
      <div className={style.meetingModalContainer}>
        <div className={style.meetnavBar}>
          <div className={style.section1}>
            <div className={style.CalendarClock}>
              <CalendarClock className={style.calenderIcon} size={30} />
            </div>

            <div> New Meeting </div>

            <span> Details </span>
          </div>

          <div className={style.section2}>
            <div onClick={onClose} className={style.close}>
              {" "}
              Close{" "}
            </div>
          </div>
        </div>

          { error !== "" && ( <Toastify type="error" onClose={()=>setError("")} message={error} /> ) }


        {/* Input name container */}
        <div className={style.inputContainer}>
          <div className={style.edit}>
            <Edit2 className={style.iconTwo} size={30} />
          </div>
          <input type="text" placeholder="Enter the meeting name" value={meetingName} onChange={(e)=>setMeetingName(e.target.value)} />
        </div>


        {/* Dates container */}
        <div className={style.dates}>
          <div className={style.clockIcon}>
            <Clock className={style.iconTwo} size={30} />
          </div>

          <div className={style.datesContainer}>

            <div className={style.startTime}  >
              <input type="date" value={startDate}  onChange={(e)=> setStartDate(e.target.value)} min={startTime} />
              <select className={style.hour} value={selectedHour} onChange={(e)=>setSelectedHour(e.target.value)}  >
                  { times.map((time)=>(
                    <option value={time.value}> {time.label} </option>
                  )) }
              </select>
            </div>

            <div className={style.endTime}>
              <input type="number" placeholder="Enter the duration in hours" min={0.5} max={24} value={duration} onChange={(e)=>setDuration(e.target.value)} />
            </div>

          </div>
        </div>

        <div className={style.presentContainer}>
          <Presentation />
          <select value={whoCanPresent} onChange={(e)=>setWhoCanPresent(e.target.value)} >
            <option value="" disabled selected hidden> Who can present? </option>
            <option value="everyone"> Everyone </option>
            <option value="me"> Me only </option>
          </select>
        </div>

        <div className={style.createMeeting} onClick={handleCreateMeeting} > { loading ? <Spinner/> : " Create Meeting"  } </div>

      </div>
    </div>
  );
}

export default MeetingModal;
