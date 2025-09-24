import React from "react";
import style from "../styles/modals/meeting.module.css";
import {
  CalendarClock,
  Clock,
  Edit2,
  Presentation,
  Repeat,
} from "lucide-react";

function MeetingModal({ onClose }) {
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
            <div className={style.save}> Save </div>
            <div onClick={onClose} className={style.close}>
              {" "}
              Close{" "}
            </div>
          </div>
        </div>

        <div className={style.inputContainer}>
          <div className={style.edit}>
            <Edit2 className={style.iconTwo} size={30} />
          </div>

          <input type="text" placeholder="Enter the meeting name" />
        </div>

        <div className={style.dates}>
          <div className={style.clockIcon}>
            <Clock className={style.iconTwo} size={30} />
          </div>

          <div className={style.datesContainer}>

            <div className={style.startTime}>
              <input type="date" />
              <input type="date.time" className={style.hour}/>
            </div>

            <div className={style.endTime}>
              <input type="date" />
              <input type="date.time" className={style.hour} />
            </div>

          </div>
        </div>

        <div className={style.presentContainer}>
          <Presentation />
          <select>
            <option value="" disabled selected hidden> Who can present? </option>
            <option value="everyone"> Everyone </option>
            <option value="me only"> Me only </option>
          </select>
        </div>

        <div className={style.createMeeting}> Create Meeting </div>

      </div>
    </div>
  );
}

export default MeetingModal;
