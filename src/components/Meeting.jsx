import React from 'react'
import style from '../styles/components/meeting.module.css'
import { Activity } from 'lucide-react'

function Meeting() {
  return (
    <div className={style.meeting} >
        <div className={style.icon}>
          <Activity />
        </div>

        <h3> First Meeting </h3>

        <div className={style.datesandwho}>

             <div className={style.date}> 

                Created 30 days ago  
            
            </div>
                
        </div>
                
        <div className={style.join} > Join </div>
    
    </div>
  )
}

export default Meeting