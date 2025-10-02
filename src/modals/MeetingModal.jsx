import React, { useState, useRef, useEffect } from "react";
import style from "../styles/modals/meeting.module.css";
import { times, tomorrowsDate } from '../utils/times'
import Spinner from '../components/Spinner'
import Toastify from '../modals/Toastify'
import {
  CalendarClock,
  Clock,
  Edit2,
  Presentation,
  Users,
  Lock
} from "lucide-react";
import { useSpace } from "../context/SpaceContext";
import { PasscodeGenerator } from "../utils/PasscodeGenerator";

function MeetingModal({ onClose }) {

  const passcodeRef = useRef(null)

  useEffect(()=>{
    const passWord = PasscodeGenerator()
    setMeetingDetails((prev)=>({ ...prev, passCode: passWord }))
  }, [])
  


  // getting tomorows date from utils function

  const startTime = tomorrowsDate("Africa/Nairobi")
  
  // getting tomorows date for space timezone


  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const { handleCreateNewMeeting } = useSpace()

  const [meetingDetails, setMeetingDetails] = useState({
    meetingName: "",
    startDate: startTime,
    startHour: times[0].value,
    whoCanPresent: "me",
    whoCanJoin: "members",
    duration: "",
    passCode: ""
  })



  const handleOnChange = (event)=>{
    const { name, value} = event.target
    setMeetingDetails((prev)=> ({
      ...prev,
      [name] : value
    }))
  }

  const handleCreateMeeting = async ()=>{
    const { meetingName, whoCanPresent, whoCanJoin, duration, startDate, startHour, passCode} = meetingDetails
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
      if (dur >= 5) {
        setError("You can't meet for more than 5 hours");
        return;
      }

      setLoading(true)
      const durationHours = parseFloat(dur)

      // local time meetng is suppose to start
      const meetingStartTime = new Date(`${startDate}T${startHour}`)
      const localDate = new Date(meetingStartTime.toISOString())      
      const endUTC = new Date(localDate.getTime() + durationHours * 60 * 60 * 1000)
      const meetingEndUT = endUTC.toISOString()
      const meetingStart = meetingStartTime.toISOString()
      
      const result = await handleCreateNewMeeting({ meetingName, meetingStart, meetingEndUT, whoCanPresent, whoCanJoin, passCode })
      setLoading(false)
      if(result.success){
        onClose()
      } else {
        setError("Unable to create meeting")
      }
      

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
          <input type="text" placeholder="Enter the meeting name" value={meetingDetails.meetingName} name="meetingName"  onChange={(e)=>handleOnChange(e)} />
        </div>


        {/* Dates container */}
        <div className={style.dates}>
          <div className={style.clockIcon}>
            <Clock className={style.iconTwo} size={30} />
          </div>

          <div className={style.datesContainer}>

            <div className={style.startTime}  >
              <input type="date" value={meetingDetails.startDate} name="startDate" onChange={(e)=>handleOnChange(e)} />
              <select className={style.hour} value={meetingDetails.startHour} name="startHour" onChange={(e)=>handleOnChange(e)}  >
                  { times.map((time)=>(
                    <option value={time.value}> {time.label} </option>
                  )) }
              </select>
            </div>

            <div className={style.endTime}>
              <input type="number" placeholder="Enter the duration in hours" name="duration" min={0.5} max={24} value={meetingDetails.duration} onChange={(e)=>handleOnChange(e)} />
            </div>

          </div>
        </div>

        <div className={style.presentContainer}>
          <Presentation size={30} />
          <select value={meetingDetails.whoCanPresent} name="whoCanPresent" onChange={(e)=>handleOnChange(e)}>
            <option value="" disabled selected hidden> Who can present? </option>
            <option value="everyone"> Everyone </option>
            <option value="me"> Me only </option>
          </select>
        </div>

        <div className={style.presentContainer}>
          <Users size={30} />
          <select value={meetingDetails.whoCanJoin} name="whoCanJoin" onChange={(e)=>handleOnChange(e)} >
              <option value="" selected hidden disabled> Who can join? </option>
              <option value="everyone"> Everyone </option>
              <option value="members"> Members </option>
          </select>
        </div>

        
        <div className={style.passCodeContainer}>
            <Lock size={30}/>
            <input type="text" value={meetingDetails.passCode} ref={passcodeRef} />
        </div>

        <div className={style.warning}>
          <span> Copy and store the meeting passcode some where safe, in case the meeting is public, others will use that to join the meeting </span>
        </div>
    
        <div className={style.createMeeting} onClick={handleCreateMeeting} > { loading ? <Spinner/> : " Create Meeting"  } </div>

      </div>
    </div>
  );
}

export default MeetingModal;
