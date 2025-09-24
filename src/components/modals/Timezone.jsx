import React, { useState } from 'react'
import style from '../../styles/modals/timezone.module.css'
import { Hourglass } from 'lucide-react'

function Timezone() {


  const commonTimezones = [
  { label: "UTC", value: "Etc/UTC" },
  { label: "New York (US Eastern)", value: "America/New_York" },
  { label: "Los Angeles (US Pacific)", value: "America/Los_Angeles" },
  { label: "London (UK)", value: "Europe/London" },
  { label: "Berlin (Central Europe)", value: "Europe/Berlin" },
  { label: "Nairobi (East Africa)", value: "Africa/Nairobi" },
  { label: "Dubai (Gulf)", value: "Asia/Dubai" },
  { label: "Mumbai (India)", value: "Asia/Kolkata" },
  { label: "Singapore", value: "Asia/Singapore" },
  { label: "Tokyo (Japan)", value: "Asia/Tokyo" }
  ];

  const [selectedTimeZone, setSelectedTimeZone] = useState(null)




  return (
     <div className={style.timeZone}>
        
        <div className={style.icon}>
             <Hourglass/>
        </div>

        <div className={style.section2}>
            <h3>Time Zone</h3>
            <span> The current time zone is: Nairobi GMT +3 </span>
        </div>

        <select value={selectedTimeZone} onChange={(e)=>setSelectedTimeZone(e.target.value)}  >
            { commonTimezones.map((timezone)=>(
              <option value={timezone.value}> {timezone.label} </option>
            )) }
        </select>

    </div>
  )
}

export default Timezone