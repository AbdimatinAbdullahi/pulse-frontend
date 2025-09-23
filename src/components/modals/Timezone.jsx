import React from 'react'
import style from '../../styles/modals/timezone.module.css'
import { Hourglass } from 'lucide-react'

function Timezone() {
  return (
     <div className={style.timeZone}>
        
        <div className={style.icon}>
             <Hourglass/>
        </div>

        <div className={style.section2}>
            <h3>Time Zone</h3>
            <span> The current time zone is: Nairobi GMT +3 </span>
        </div>

        <select>
            <option value="" hidden selected> Select Time zone </option>
            <option value=""> Nairobi GMT +3 </option>
            <option value=""> Beiien GMT +12 </option>
            <option value=""> USA GMT -12 </option>
            <option value=""> Riyadh -3 </option>
        </select>

    </div>
  )
}

export default Timezone