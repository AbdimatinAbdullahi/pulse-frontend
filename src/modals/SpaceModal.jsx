import React from 'react'
import style from '../styles/modals/spacemodal.module.css'
import { X } from 'lucide-react'

function SpaceModal({ onClose }) {

  return (
    <div className={style.overLay} >
        <div className={style.spaceModalContainer}>

            <div className={style.headerBar}> 
              
              <h2> Space </h2>
              
              <div>spaceone.com</div>

              <div onClick={onClose} > Close </div>

            </div>        
        
        </div>
    </div>
  )
}

export default SpaceModal