import React from 'react'
import style from '../styles/modals/spacemodal.module.css'
import { X } from 'lucide-react'

function SpaceModal({ onClose }) {
  return (
    <div className={style.overLay} >
        <div className={style.spaceModalContainer}>
            <X onClick={onClose} />    
        </div>
    </div>
  )
}

export default SpaceModal