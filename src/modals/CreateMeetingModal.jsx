import React, { useState } from 'react'
import style from '../styles/modals/createmeeting.module.css'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function CreateMeetingModal({onClose, Space}) {

    const { user } = useAuth()


    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [ meetingDetails, setMeetingDetails ] = useState({
        tittle: "",
        description: "",
        startTime: "",
        duration: "",
        spaceId: Space.Space.id,
        CreatorID: user.id,
    })



    const handleCreateMeeting = ({tittle, description, startTime, duration})=>{
        setError("")
        if(tittle == "" || description === "" || startTime == "" || duration === ""){
            setError("Provide all field marked with *")
            return
        }
        if(tittle.trim().length <= 20){
            setError("Tittle must be greator that 20 characters")
            return
        }

        if(description.trim().length <= 100){
            setError("Description must be greator that 100 characters")
            return
        }
    }

  return (
    <div className={style.modalOverlay}>
        <div className={style.meetingModalContainer}>
            <X onClick={onClose} className={style.closeIcon} />

                <h2> Create Meeting in {Space.Space.name} </h2>
                {error != "" && (
                    <div className={style.error} > 
                        {error}
                    </div>
                )}
                <input type="text" placeholder='*Enter the title of the meeting' onChange={(e)=>setMeetingDetails({...meetingDetails, tittle:e.target.value})} />
                <textarea placeholder='*Enter the description of the meeting' onChange={(e)=>setMeetingDetails({...meetingDetails, description:e.target.value})}  />
                <input type="date" placeholder='*Select the meeting date' min={new Date().toISOString().split("T")[0]} onChange={(e)=>setMeetingDetails({...meetingDetails, startTime:e.target.value})} />
                <input type="text" placeholder='*Enter meeting duration' onChange={(e)=>setMeetingDetails({...meetingDetails, duration:e.target.value})}  />
                <button onClick={() => handleCreateMeeting(meetingDetails)} > Create Meeting </button>
        </div>
    </div>
  )
}

export default CreateMeetingModal