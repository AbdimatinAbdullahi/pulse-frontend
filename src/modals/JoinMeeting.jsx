import React from 'react'
import { Hand, Headphones, Monitor, MonitorUp, Phone, Video } from 'lucide-react'
import style from '../styles/modals/join.module.css'
import { useAuth } from '../context/AuthContext'

function JoinMeeting({ meeting }) {

  const { user } = useAuth()

  return (
    <div className={style.joinOverLay} >
        <div className={style.joinModalContainer}>

          
          <div className={style.meetingActions}>
            
            <div className={style.raiseHand}> 
              
                <Hand size={30} /> 
              
            </div>  
            
            <div className={style.shareScreen}> 
              
                <MonitorUp size={30} /> 
              
            </div>  
            
            <div className={style.audioToggle}>
              <Headphones size={30} /> 
              
            </div>  
            
            <div className={style.videoToggle}> 
              
              <Video size={30} /> 
            
            </div>  


            <div className={style.cancelOrLeaveMeeting}> 
              
              <Phone size={30} /> 

              { meeting.host_id == user.id ? <span> End the meeting </span> : <span> Leave the meeting </span>}            
            
            </div> 

          </div>

        </div>
    </div>
  )
}

export default JoinMeeting